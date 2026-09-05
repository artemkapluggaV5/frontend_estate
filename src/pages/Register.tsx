import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../api';
import { toast } from 'react-toastify';
import './Register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/users/`, {
        username: email,
        email,
        phone_number,
        password,
        role: 'client'
      });

      // Auto-login after successful registration
      const loginResponse = await axios.post(`${API_BASE}/api/token/`, {
        username: email,
        password
      });
      localStorage.setItem('token', loginResponse.data.access);

      const userResponse = await axios.get(`${API_BASE}/api/users/`, {
        headers: { Authorization: `Bearer ${loginResponse.data.access}` }
      });
      const currentUser = userResponse.data.find((u: any) => u.email === email);
      if (currentUser) {
        localStorage.setItem('role', currentUser.role);
        localStorage.setItem('userId', currentUser.id);
        localStorage.setItem('username', currentUser.username);
      }

      toast.success('Регистрация прошла успешно!');
      navigate('/');
    } catch (error: any) {
      console.error('Register error', error);
      if (error.response?.data) {
        const errors = error.response.data;
        if (errors.password) {
          toast.error(errors.password[0]);
        }
        if (errors.email) {
          toast.error(errors.email[0]);
        }
        if (errors.phone_number) {
          toast.error(errors.phone_number[0]);
        }
        if (!errors.password && !errors.email && !errors.phone_number) {
          toast.error('Ошибка при регистрации. Проверьте введенные данные.');
        }
      } else {
        toast.error('Ошибка при регистрации. Проверьте соединения с сервером.');
      }
    }
  };

  return (
    <div className="container auth-container">
      <div className="card auth-card">
        <h2 className="auth-title">Регистрация</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              required
            />
          </div>
          <div className="input-group">
            <label>Телефон</label>
            <input
              type="text"
              className="input-field"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="^(\+7|8)\d{10}$"
              title="Введите российский номер телефона, начиная с +7 или 8 (например, +79991234567)"
              placeholder="+7 (___) ___-__-__"
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Придумайте пароль"
              required
              minLength={8}
            />
          </div>
          <div className="input-group">
            <label>Подтвердите пароль</label>
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              required
              minLength={8}
            />
          </div>
          <button type="submit" className="btn btn-primary auth-btn">
            Зарегистрироваться
          </button>
        </form>
        <p className="auth-footer-text">
          Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
