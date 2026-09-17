import React from 'react';

const team = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    role: 'Основатель и Генеральный директор',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Более 15 лет опыта в недвижимости. Создал Юг-Хаус с целью сделать рынок прозрачным и понятным.',
    email: 'ceo@yug-house.ru'
  },
  {
    id: 2,
    name: 'Елена Васильева',
    role: 'Руководитель отдела продаж',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Знает каждый квадратный метр в городе. Помогла более 500 семьям найти идеальный дом.',
    email: 'e.vasilieva@yug-house.ru'
  },
  {
    id: 3,
    name: 'Михаил Волков',
    role: 'Главный юрист',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Обеспечивает 100% юридическую чистоту каждой сделки. Защищает интересы клиентов как свои.',
    email: 'm.volkov@yug-house.ru'
  },
  {
    id: 4,
    name: 'Анна Новикова',
    role: 'Ипотечный брокер',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Помогает получить одобрение по ипотеке даже в самых сложных случаях. Знает все подводные камни.',
    email: 'a.novikova@yug-house.ru'
  }
];

const TeamPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
          Наша команда
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto' }}>
          Познакомьтесь с экспертами, которые делают всё возможное, чтобы ваша сделка прошла идеально.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {team.map(member => (
          <div key={member.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
            <div style={{ height: '350px', width: '100%' }}>
              <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
                {member.name}
              </h3>
              <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>{member.role}</p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                {member.description}
              </p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
                <i className="pi pi-envelope text-primary"></i> <span>{member.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
