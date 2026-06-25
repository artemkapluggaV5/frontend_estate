import React from 'react';

const FeaturedCategories: React.FC = () => {
  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Купить недвижимость в Белореченске</h2>
      <div className="categories-grid">
        <div className="category-card-1" style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Новостройки" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--secondary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', fontWeight: 600 }}>Новостройки</div>
        </div>
        
        <div className="category-card-2" style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Вторичное жилье" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--secondary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', fontWeight: 600 }}>Вторичка</div>
        </div>

        <div className="category-card-3" style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Коммерческая" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--secondary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', fontWeight: 600 }}>Коммерция</div>
        </div>

        <div className="category-card-4" style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Дома и коттеджи" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--secondary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', fontWeight: 600 }}>Дома</div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
