import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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
      await axios.post('http://127.0.0.1:8000/api/users/', {
        username,
        email,
        phone_number,
        password,
        role: 'client'
      });

      // Auto-login after successful registration
      const loginResponse = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      });
      localStorage.setItem('token', loginResponse.data.access);

      const userResponse = await axios.get('http://127.0.0.1:8000/api/users/', {
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
      if (error.response?.data?.username) {
        toast.error('Пользователь с таким именем уже существует.');
      } else {
        toast.error('Ошибка при регистрации. Проверьте введенные данные.');
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
