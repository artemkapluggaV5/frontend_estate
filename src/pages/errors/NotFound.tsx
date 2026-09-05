import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
      textAlign: 'center',
      padding: '0 20px'
    }}>
      <h1 style={{ fontSize: '100px', color: 'var(--primary)', margin: '0' }}>404</h1>
      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Упс! Страница не найдена</h2>
      <p style={{ color: '#666', maxWidth: '500px', marginBottom: '30px' }}>
        Кажется, вы перешли по неверной ссылке или страница была удалена. 
        Не переживайте, вы можете вернуться в каталог и найти дом своей мечты!
      </p>
      <Link to="/" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '16px' }}>
        На главную страницу
      </Link>
    </div>
  );
};

export default NotFound;
