import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text)' }}>ООО "Юг-Хаус"</h3>
          <p style={{ color: 'var(--text-light)', marginTop: '0.5rem', marginBottom: '1rem' }}>Ваш надежный партнер в сфере недвижимости</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/about" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>О нас</a>
            <a href="/contacts" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Контакты</a>
          </div>
        </div>
        <div style={{ textAlign: 'right', color: 'var(--text-light)' }}>
          <p>© {new Date().getFullYear()} Юг-Хаус. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
