import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE } from '../api';
import CallRequestModal from './CallRequestModal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // Basic auth mock for UI
  const isAuthenticated = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    const fetchFavorites = () => {
      if (isAuthenticated) {
        fetch(`${API_BASE}/api/favorites/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => setFavoritesCount(data.length || 0))
        .catch(err => console.error(err));
      } else {
        const localFavs = JSON.parse(localStorage.getItem('guestFavorites') || '[]');
        setFavoritesCount(localFavs.length);
      }
    };
    
    const fetchUnread = () => {
      if (isAuthenticated) {
        fetch(`${API_BASE}/api/notifications/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => {
          const unread = data.filter((n: any) => !n.is_read);
          
          // If we have more unread notifications than before, show a toast!
          if (unreadCount !== 0 && unread.length > unreadCount) {
            toast.info('У вас новое уведомление!', { icon: <i className="pi pi-bell"></i> });
          }
          
          setUnreadCount(unread.length);
        })
        .catch(err => console.error(err));
      }
    };
    
    fetchFavorites();
    fetchUnread();
    
    window.addEventListener('favoritesUpdated', fetchFavorites);
    window.addEventListener('notificationsRead', fetchUnread);
    const interval = setInterval(fetchUnread, 30000); // Poll every 30s
    
    return () => {
      window.removeEventListener('favoritesUpdated', fetchFavorites);
      window.removeEventListener('notificationsRead', fetchUnread);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    toast.info('Вы успешно вышли из системы');
    navigate('/login');
  };

  return (
    <>
      <header className="navbar-top">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          <Link to="/" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.5px' }}>
            Юг-Хаус
          </Link>
          
          <div className="navbar-top-contacts" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingRight: '2rem', borderRight: '1px solid var(--border)' }}>
              <i className="pi pi-phone" style={{ fontSize: '1.2rem', color: 'var(--primary)' }}></i>
              <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text)' }}>+7 (951) 717-73-24</span>
              <button 
                onClick={() => setIsCallModalOpen(true)}
                style={{ 
                  background: 'var(--danger)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  width: '36px', 
                  height: '36px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer' 
                }}
                title="Заказать звонок"
              >
                <i className="pi pi-phone"></i>
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem' }}>
              {isAuthenticated ? (
                <>
                  <Link to="/chat" style={{ fontSize: '1.25rem', textDecoration: 'none' }} title="Чат"><i className="pi pi-comments text-primary"></i></Link>
                  <Link to="/notifications" style={{ fontSize: '1.25rem', textDecoration: 'none', position: 'relative' }} title="Уведомления">
                    <i className="pi pi-bell text-text-light"></i>
                    {unreadCount > 0 && (
                      <span style={{
                        position: 'absolute', top: '-8px', right: '-12px',
                        background: 'var(--danger)', color: 'white', borderRadius: '50%',
                        width: '18px', height: '18px', fontSize: '0.7rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                      }}>
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}>
                    <Link to="/dashboard" style={{ fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} title="Личный кабинет">
                      <i className="pi pi-user"></i> <span>{username || 'Профиль'}</span>
                    </Link>
                    <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }} title="Выйти"><i className="pi pi-sign-out"></i> Выйти</button>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Войти</Link>
                  <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Регистрация</Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Actions Container */}
          <div className="mobile-actions">
            <button onClick={() => setIsCallModalOpen(true)} style={{ background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '4px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="pi pi-phone"></i>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {menuOpen ? <i className="pi pi-times"></i> : <i className="pi pi-bars"></i>}
            </button>
          </div>
        </div>
      </header>

      <div className="navbar-bottom" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <nav className="desktop-nav">
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/mortgage">Ипотека</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/about">О компании</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
          
          <div className="desktop-nav">
            <Link to="/favorites" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className={favoritesCount > 0 ? "pi pi-heart-fill" : "pi pi-heart"} style={favoritesCount > 0 ? { color: 'var(--danger)' } : {}}></i> ИЗБРАННОЕ {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
          </div>
        </div>
      </div>
      <div className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}></div>
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        
        <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          Главная <i className="pi pi-angle-right"></i>
        </Link>
        <Link to="/catalog" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          Каталог <i className="pi pi-angle-right"></i>
        </Link>
        <Link to="/mortgage" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          Ипотека <i className="pi pi-angle-right"></i>
        </Link>
        <Link to="/reviews" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          Отзывы <i className="pi pi-angle-right"></i>
        </Link>
        <Link to="/about" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          О компании <i className="pi pi-angle-right"></i>
        </Link>
        <Link to="/contacts" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          Контакты <i className="pi pi-angle-right"></i>
        </Link>

        <div className="mobile-nav-shaded">
          {isAuthenticated && (
            <Link to="/chat" onClick={() => setMenuOpen(false)} className="mobile-nav-action" style={{ color: 'var(--text)' }}>
              <i className="pi pi-comments"></i> Чат
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link to="/favorites" onClick={() => setMenuOpen(false)} className="mobile-nav-action">
                <i className="pi pi-heart"></i> Избранное {favoritesCount > 0 && `(${favoritesCount})`}
              </Link>
              <Link to="/notifications" onClick={() => setMenuOpen(false)} className="mobile-nav-action" style={{ color: 'var(--text)' }}>
                <i className="pi pi-bell"></i> Уведомления {unreadCount > 0 && `(${unreadCount})`}
              </Link>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="mobile-nav-action" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                <i className="pi pi-user"></i> {username || 'Личный кабинет'}
              </Link>
              <div onClick={() => { handleLogout(); setMenuOpen(false); }} className="mobile-nav-action" style={{ color: 'var(--text)', cursor: 'pointer' }}>
                <i className="pi pi-sign-out"></i> Выйти
              </div>
            </>
          ) : (
            <>
              <Link to="/favorites" onClick={() => setMenuOpen(false)} className="mobile-nav-action">
                <i className="pi pi-heart"></i> Избранное {favoritesCount > 0 && `(${favoritesCount})`}
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="mobile-nav-action" style={{ color: 'var(--primary)' }}>
                <i className="pi pi-user"></i> Войти
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="mobile-nav-action" style={{ color: 'var(--text)' }}>
                <i className="pi pi-user-plus"></i> Зарегистрироваться
              </Link>
            </>
          )}
        </div>
      </nav>

      <CallRequestModal 
        isOpen={isCallModalOpen} 
        onClose={() => setIsCallModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
