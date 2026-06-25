import React from 'react';

const Contacts: React.FC = () => {
  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
          Свяжитесь с нами
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
          Мы всегда на связи и готовы помочь вам с любыми вопросами по недвижимости.
        </p>
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
            г. Белореченск, ул. Курортный проспект, д. 100<br />
            Бизнес-центр "Южный", офис 404
          </p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="pi pi-phone text-primary"></i> Телефоны
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            <strong>Отдел продаж:</strong> +7 (800) 555-35-35<br />
            <strong>Поддержка:</strong> +7 (999) 123-45-67
          </p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="pi pi-envelope text-primary"></i> Email
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            <strong>Общие вопросы:</strong> info@yughouse.ru<br />
            <strong>Для партнеров:</strong> partners@yughouse.ru
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
