import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
          О компании Юг-Хаус
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto' }}>
          Ваш надежный партнер на рынке недвижимости с 2010 года. Мы помогаем найти идеальное жилье и выгодно инвестировать в недвижимость на Юге.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius)', background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏡</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>Огромный выбор</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
            Мы предлагаем тысячи проверенных объектов: от уютных студий до роскошных вилл на побережье.
          </p>
        </div>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius)', background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>Безопасность сделок</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
            Полное юридическое сопровождение на каждом этапе. Ваши деньги и документы в полной безопасности.
          </p>
        </div>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius)', background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>Опытные эксперты</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
            Наши риелторы — настоящие профессионалы, которые знают рынок изнутри и подберут лучшее предложение для вас.
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--secondary-rgb), 0.1))' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text)' }}>Готовы найти дом своей мечты?</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
          Перейдите в наш каталог и начните поиск прямо сейчас.
        </p>
        <Link to="/catalog" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
};

export default About;
