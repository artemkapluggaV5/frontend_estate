import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // Basic auth mock for UI
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role') || 'guest';
  const username = localStorage.getItem('username');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchFavorites = () => {
      if (isAuthenticated) {
        fetch('http://127.0.0.1:8000/api/favorites/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => setFavoritesCount(data.length || 0))
        .catch(err => console.error(err));
      }
    };
    
    const fetchUnread = () => {
      if (isAuthenticated) {
        fetch('http://127.0.0.1:8000/api/notifications/', {
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
    <header style={{
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(8px)',
      background: 'rgba(var(--surface-rgb), 0.8)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
          Юг-Хаус
        </Link>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <i className="pi pi-times"></i> : <i className="pi pi-bars"></i>}
        </button>
        <nav className="desktop-nav" style={{ flexGrow: 1, marginLeft: '2rem' }}>
          <Link to="/" style={{ fontWeight: 500 }}>Главная</Link>
          <Link to="/catalog" style={{ fontWeight: 500 }}>Каталог</Link>
          <Link to="/about" style={{ fontWeight: 500 }}>О компании</Link>
          <Link to="/contacts" style={{ fontWeight: 500 }}>Контакты</Link>
          
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {isAuthenticated ? (
              <>
                <Link to="/chat" style={{ fontSize: '1.25rem', textDecoration: 'none' }} title="Чат"><i className="pi pi-comments text-primary"></i></Link>
                <Link to="/favorites" style={{ fontSize: '1.25rem', textDecoration: 'none', position: 'relative' }} title="Избранное">
                  <i className="pi pi-heart-fill" style={{ color: 'var(--danger)' }}></i>
                  {favoritesCount > 0 && (
                    <span style={{
                      position: 'absolute', top: '-8px', right: '-12px',
                      background: 'var(--danger)', color: 'white', borderRadius: '50%',
                      width: '18px', height: '18px', fontSize: '0.7rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                    }}>
                      {favoritesCount}
                    </span>
                  )}
                </Link>
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
                    <i className="pi pi-user"></i> <span>{username}</span>
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
        </nav>
      </div>
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500 }}>Главная</Link>
        <Link to="/catalog" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500 }}>Каталог</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500 }}>О компании</Link>
        <Link to="/contacts" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500 }}>Контакты</Link>
        {isAuthenticated && (
          <>
            <Link to="/chat" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--text)' }}><i className="pi pi-comments" style={{marginRight: '8px'}}></i>Чат</Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--danger)' }}>
              <i className="pi pi-heart" style={{marginRight: '8px'}}></i>Избранное ({favoritesCount})
            </Link>
            <Link to="/notifications" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--text)' }}>
              <i className="pi pi-bell" style={{marginRight: '8px'}}></i>Уведомления {unreadCount > 0 && `(${unreadCount})`}
            </Link>
          </>
        )}
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500 }}>
              {role === 'admin' ? 'Панель администратора' : role === 'realtor' ? 'Рабочий стол' : 'Личный кабинет'}
            </Link>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn btn-secondary" style={{ width: '100%' }}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>Войти</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Зарегистрироваться</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
