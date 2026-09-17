import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const About: React.FC = () => {
  return (
    <>
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        background: `url('https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center 20%/cover no-repeat`,
        color: 'white',
        marginTop: '-2rem' // compensate for page-container padding if needed, or just let it sit
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.2) 100%)',
          zIndex: 1
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 1rem', width: '100%', textAlign: 'left' }}>
          <div style={{ maxWidth: '700px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1 }}>
              О компании <br/>и её основателе
            </h1>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.85)' }}>
              Юг-Хаус — ваш надёжный партнёр в покупке и строительстве жилья. Мы объединяем опыт, современные технологии и ответственность, чтобы ваш путь к новому дому был лёгким и приятным.
            </p>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
              Александр Калайджян — основатель компании "Юг-Хаус". Эксперт в области ипотеки и загородной недвижимости.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1rem' }}>

        {/* Video Section */}
        <div style={{ marginBottom: '6rem', position: 'relative' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            aspectRatio: '16/9',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
            cursor: 'pointer',
            background: `url('https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center 30%/cover no-repeat`
          }}
          className="video-placeholder"
          >
            <div style={{
               position: 'absolute',
               top: 0, left: 0, right: 0, bottom: 0,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: 'rgba(0,0,0,0.15)',
               transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.15)'}
            >
               <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2.5rem',
                  paddingLeft: '0.4rem', 
                  backdropFilter: 'blur(5px)',
                  border: '2px solid rgba(255,255,255,0.7)',
                  transition: 'transform 0.2s ease, background-color 0.2s ease'
               }}
               onMouseEnter={e => {
                 e.currentTarget.style.transform = 'scale(1.1)';
                 e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.8)'; // Primary blue on hover
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.transform = 'scale(1)';
                 e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
               }}
               >
                  <i className="pi pi-play"></i>
               </div>
            </div>
          </div>
        </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius)', background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}><i className="pi pi-home"></i></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>Огромный выбор</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
            Мы предлагаем тысячи проверенных объектов: от уютных студий до роскошных вилл на побережье.
          </p>
        </div>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius)', background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}><i className="pi pi-shield"></i></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>Безопасность сделок</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
            Полное юридическое сопровождение на каждом этапе. Ваши деньги и документы в полной безопасности.
          </p>
        </div>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius)', background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}><i className="pi pi-star-fill"></i></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>Опытные эксперты</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
            Наши риелторы — настоящие профессионалы, которые знают рынок изнутри и подберут лучшее предложение для вас.
          </p>
        </div>
      </div>

      {/* Certificates Section */}
      <div style={{ marginBottom: '6rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>
            Официальные документы государственного образца.
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            Обеспечиваем регулярное обучение и непрерывное повышение квалификации сотрудников.
          </p>
        </div>
        
        <Carousel 
          className="certificates-carousel"
          value={[
            { id: 1, title: 'Сертификат ТКБ', bg: '#f8f9fa', color: '#005baa', border: 'none' },
            { id: 2, title: 'Сертификат МКБ', bg: 'linear-gradient(135deg, #ff416c, #ff4b2b)', color: '#fff', border: 'none' },
            { id: 3, title: 'Сертификат АТБ', bg: '#fff', color: '#ff6600', border: '4px solid #ff6600' },
            { id: 4, title: 'Сертификат Сбер', bg: '#f8f9fa', color: '#21a038', border: 'none' },
            { id: 5, title: 'Сертификат ВТБ', bg: '#002882', color: '#fff', border: 'none' },
          ]} 
          numVisible={3} 
          numScroll={1} 
          circular 
          autoplayInterval={3000}
          responsiveOptions={[
            { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
            { breakpoint: '768px', numVisible: 2, numScroll: 1 },
            { breakpoint: '560px', numVisible: 1, numScroll: 1 }
          ]}
          itemTemplate={(cert) => (
            <div style={{ padding: '0 1rem' }}>
              <div style={{
                background: cert.bg,
                border: cert.border,
                borderRadius: '16px',
                height: '420px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: cert.color,
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', zIndex: 2 }}>Сертификат</h3>
                <p style={{ fontSize: '1.1rem', zIndex: 2, opacity: 0.9 }}>{cert.title}</p>
                <p style={{ fontSize: '0.9rem', zIndex: 2, marginTop: '2rem', opacity: 0.8 }}>Александр Калайджян</p>
                {/* Note for developer: Replace this div with an <img src="..." /> when real images are available */}
              </div>
            </div>
          )}
        />
      </div>

      {/* Photo Gallery Section */}
      <div style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)' }}>
             Галерея
          </h2>
        </div>

        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="custom-about-gallery-grid"
        >
          {/* Gallery Item 1 - Large */}
          <a 
            href="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            className="gallery-item-large"
            style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'block' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Счастливые клиенты" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>

          {/* Gallery Item 2 */}
          <a 
            href="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'block' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Передача ключей" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>

          {/* Gallery Item 3 - Tall */}
          <a 
            href="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            className="gallery-item-tall"
            style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'block' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Просмотр объекта" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>

          {/* Gallery Item 4 - with +10 overlay */}
          <a 
            href="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'block', position: 'relative' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Подписание договора" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 700,
              backdropFilter: 'blur(2px)',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
            >
              +10
            </div>
          </a>

          {/* Hidden items for the rest of the gallery */}
          <a href="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" style={{ display: 'none' }}>
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Галерея" />
          </a>
          <a href="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" style={{ display: 'none' }}>
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Галерея" />
          </a>
        </LightGallery>
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
    </>
  );
};

export default About;
