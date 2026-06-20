import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedHighlight: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section style={{ marginBottom: '5rem', background: 'var(--surface)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 50%', minHeight: '400px', position: 'relative' }}>
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Новостройка в Белореченске" 
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      
      <div style={{ flex: '1 1 50%', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3 }}>
          Новостройка в Белореченске: 5 минутах от центрального парка и набережной
        </h2>
        
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', color: 'var(--text-light)', lineHeight: 1.8 }}>
          <li>- 160 квартир от 3 500 000 руб.</li>
          <li>- отделка под ключ</li>
          <li>- закрытый благоустроенный двор</li>
        </ul>
        
        <p style={{ marginBottom: '2rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
          Идеальные планировочные решения под любой бюджет для комфортной городской жизни. Широкий выбор квартир от 36 до 150 м² с балконами, лоджиями и террасами под аренду и личное пользование.
        </p>
        
        <div>
          <button 
            className="btn btn-primary" 
            style={{ borderRadius: '50px', padding: '0.75rem 2rem', fontWeight: 600 }}
            onClick={() => navigate('/catalog')}
          >
            Подробнее
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHighlight;
