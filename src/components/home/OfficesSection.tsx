import React from 'react';

const OfficesSection: React.FC = () => {
  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Наш офис в Белореченске</h2>
      <div className="card" style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>Центральный офис Юг-Хаус</h3>
          <p style={{ fontSize: '1.125rem', color: 'var(--text)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📍 ул. Ленина 10, Белореченск
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-light)' }}>
            <p><strong>Режим работы:</strong><br/> Пн-Пт: 09:00 - 19:00<br/> Сб-Вс: 10:00 - 16:00</p>
            <p><strong>Телефон:</strong><br/> +7 (999) 123-45-67</p>
            <p><strong>Email:</strong><br/> info@yug-house.ru</p>
          </div>
        </div>
        <div style={{ flex: '1 1 400px', minHeight: '350px', position: 'relative' }}>
           <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Офис Юг-Хаус" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
           />
        </div>
      </div>
    </section>
  );
};

export default OfficesSection;
