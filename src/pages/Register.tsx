import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../api';
import { toast } from 'react-toastify';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/users/`, {
        username,
        email,
        phone_number,
        password,
        role: 'client'
      });

      // Auto-login after successful registration
      const loginResponse = await axios.post(`${API_BASE}/api/token/`, {
        username,
        password
      });
      localStorage.setItem('token', loginResponse.data.access);

      const userResponse = await axios.get(`${API_BASE}/api/users/`, {
        headers: { Authorization: `Bearer ${loginResponse.data.access}` }
      });
      const currentUser = userResponse.data.find((u: any) => u.username === username);
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
        if (errors.username) {
          toast.error(errors.username[0]);
        }
        if (errors.password) {
          toast.error(errors.password[0]);
        }
        if (errors.email) {
          toast.error(errors.email[0]);
        }
        if (errors.phone_number) {
          toast.error(errors.phone_number[0]);
        }
        if (!errors.username && !errors.password && !errors.email && !errors.phone_number) {
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
            <label>Имя пользователя</label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={4}
              maxLength={30}
              pattern="^[a-zA-Z0-9_]+$"
              title="Только латинские буквы, цифры и подчеркивание (без пробелов)"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
