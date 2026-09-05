import React from 'react';
import ContactForm from '../components/ContactForm';

const Contacts: React.FC = () => {
  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
          Свяжитесь с нами
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
          Мы всегда на связи и готовы помочь вам с любыми вопросами по недвижимости.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            document.getElementById('contact-form-block')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
        >
          Написать нам
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="pi pi-map-marker text-primary"></i> Наш офис
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Краснодарский край, ул. Курортный проспект, д. 100<br />
            Бизнес-центр "Южный", офис 404
          </p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="pi pi-phone text-primary"></i> Телефоны
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            +7 (951) 717-73-24
          </p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="pi pi-envelope text-primary"></i> Email
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            info@yughouse.ru
          </p>
        </div>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contacts;
