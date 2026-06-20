import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationsPage.css';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    axios.get('http://127.0.0.1:8000/api/notifications/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      // Sort by newest first
      const sorted = res.data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setNotifications(sorted);
      setLoading(false);
      
      // Mark as read
      const unread = sorted.filter((n: any) => !n.is_read);
      unread.forEach((n: any) => {
        axios.patch(`http://127.0.0.1:8000/api/notifications/${n.id}/`, { is_read: true }, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => console.error(err));
      });
      if (unread.length > 0) {
        window.dispatchEvent(new Event('notificationsRead'));
      }
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [token]);

  if (!token) return <div className="container notifications-container">Пожалуйста, войдите в систему.</div>;
  if (loading) return <div className="container notifications-container">Загрузка...</div>;

  return (
    <div className="container notifications-container">
      <h1 className="notifications-title">Уведомления</h1>
      {notifications.length === 0 ? (
        <p>У вас нет новых уведомлений.</p>
      ) : (
        <div className="notifications-list">
          {notifications.map((notif: any) => (
            <div key={notif.id} className={`notification-item ${notif.is_read ? 'read' : 'unread'}`}>
              <h4 className="notification-title">
                {notif.title}
                {!notif.is_read && <span className="notification-new-badge">Новое</span>}
              </h4>
              <p className="notification-content">{notif.content}</p>
              <p className="notification-date">
                {new Date(notif.created_at).toLocaleString('ru-RU')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
