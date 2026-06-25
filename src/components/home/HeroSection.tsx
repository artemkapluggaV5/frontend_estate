import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section style={{
      position: 'relative',
      height: '600px',
      marginBottom: '4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 2
      }}></div>

      <div style={{ position: 'relative', zIndex: 3, maxWidth: '800px', padding: '0 2rem' }}>
        <h1 className="hero-title">
          Инвестируйте в недвижимость Белореченска <br/> с Юг-Хаус
        </h1>
        <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '2rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.5px' }}>
          ЮГ-ХАУС – СПЕЦИАЛИСТ № 1 НА РЫНКЕ ЖИЛОЙ И КОММЕРЧЕСКОЙ НЕДВИЖИМОСТИ В БЕЛОРЕЧЕНСКЕ
        </p>
        <button 
          className="btn btn-primary" 
          style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
          onClick={() => navigate('/catalog')}
        >
          Оставить заявку
        </button>
      </div>


    </section>
  );
};

export default HeroSection;
