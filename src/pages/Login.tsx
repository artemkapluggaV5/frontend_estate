import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      });
      localStorage.setItem('token', response.data.access);
      
      // Fetch user info to get role and id
      const userResponse = await axios.get('http://127.0.0.1:8000/api/users/', {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });
      // We need to find the user from the list matching username (since /api/users/ returns list)
      const currentUser = userResponse.data.find((u: any) => u.username === username);
      if (currentUser) {
        localStorage.setItem('role', currentUser.role);
        localStorage.setItem('userId', currentUser.id);
        localStorage.setItem('username', currentUser.username);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Login error', error);
      toast.error('Неверные учетные данные');
    }
  };

  return (
    <div className="container auth-container">
      <div className="card auth-card">
        <h2 className="auth-title">Вход в систему</h2>
        <form onSubmit={handleLogin}>
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
            Войти
          </button>
        </form>
        <p className="auth-demo-text">
          Доступ для демонстрации:<br/>
          client1 / clientpass<br/>
          realtor1 / realtorpass<br/>
          admin / adminpass
        </p>
        <p className="auth-footer-text">
          Нет аккаунта? <Link to="/register" className="auth-link">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
