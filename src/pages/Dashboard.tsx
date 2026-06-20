import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({ first_name: '', last_name: '', email: '', phone_number: '', username: '' });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [schedulingRequestId, setSchedulingRequestId] = useState<number | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const verifiedRef = useRef(false);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/requests/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for payment verification callback
    const searchParams = new URLSearchParams(location.search);
    const verifyPaymentId = searchParams.get('verify_payment');
    if (verifyPaymentId && token && !verifiedRef.current) {
      verifiedRef.current = true;
      axios.post(`http://127.0.0.1:8000/api/payments/${verifyPaymentId}/verify/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.status === 'success') {
          toast.success('Оплата успешно завершена!');
          fetchRequests(); // refresh requests
        } else {
          toast.warning(`Статус оплаты: ${res.data.status}`);
        }
        // Clean up URL
        window.history.replaceState({}, document.title, '/dashboard');
      }).catch(err => {
        toast.error('Ошибка при проверке статуса оплаты');
      });
    }
  }, [location, token]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileData(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchRequests();
    fetchProfile();
  }, [navigate, token, userId]);

  const updateStatus = async (id: number, status: string, scheduledTime: Date | null = null) => {
    try {
      const payload: any = { status };
      if (scheduledTime) {
        payload.scheduled_time = scheduledTime.toISOString();
      }
      await axios.patch(`http://127.0.0.1:8000/api/requests/${id}/`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state
      setRequests((prev: any) => prev.map((req: any) => req.id === id ? { ...req, status, scheduled_time: payload.scheduled_time || req.scheduled_time } : req));
      
      if (status === 'canceled') {
        toast.info('Заявка на просмотр отменена');
      } else if (status === 'scheduled') {
        toast.success('Просмотр успешно назначен!');
      } else if (status === 'completed') {
        toast.success('Просмотр успешно завершен!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Ошибка при обновлении статуса');
    }
  };

  const handleScheduleSubmit = () => {
    if (schedulingRequestId && scheduledDate) {
      updateStatus(schedulingRequestId, 'scheduled', scheduledDate);
      setShowScheduleModal(false);
      setSchedulingRequestId(null);
      setScheduledDate(null);
    } else {
      toast.warning('Пожалуйста, выберите дату и время');
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:8000/api/users/${userId}/`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Профиль успешно обновлен!');
      setShowProfileModal(false);
    } catch (e) {
      toast.error('Ошибка при обновлении профиля');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      new: { label: 'Новая', color: 'var(--primary)', bg: 'rgba(37, 99, 235, 0.1)' },
      scheduled: { label: 'Назначен просмотр', color: 'var(--accent)', bg: 'rgba(245, 158, 11, 0.1)' },
      completed: { label: 'Завершена', color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.1)' },
      canceled: { label: 'Отменена', color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' }
    };
    const b = badges[status] || badges['new'];
    return (
      <span style={{ 
        display: 'inline-block', padding: '4px 12px', borderRadius: '20px', 
        fontSize: '0.75rem', fontWeight: 600, color: b.color, backgroundColor: b.bg 
      }}>
        {b.label}
      </span>
    );
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          {role === 'admin' ? 'Панель администратора' : role === 'realtor' ? 'Рабочий стол риелтора' : 'Личный кабинет'}
        </h1>
        {role === 'realtor' && (
          <Link to="/create-property" className="btn btn-primary">
            + Добавить объект
          </Link>
        )}
      </div>
      
      <div className="dashboard-content">
        <div className="card profile-card">
          <div className="profile-avatar">
            {profileData.first_name ? profileData.first_name[0].toUpperCase() : (profileData.username ? profileData.username[0].toUpperCase() : '👤')}
          </div>
          <h2 className="profile-name">
            {profileData.first_name || profileData.last_name ? `${profileData.first_name} ${profileData.last_name}` : profileData.username}
          </h2>
          <p className="profile-role">
            {role === 'realtor' ? 'Риелтор' : role === 'admin' ? 'Администратор' : 'Клиент'}
          </p>
          
          <div className="profile-details">
            <div>
              <span className="profile-label">Email</span>
              <strong>{profileData.email || 'Не указан'}</strong>
            </div>
            <div>
              <span className="profile-label">Телефон</span>
              <strong>{profileData.phone_number || 'Не указан'}</strong>
            </div>
          </div>
          
          <button onClick={() => setShowProfileModal(true)} className="btn btn-secondary edit-profile-btn">
            Редактировать профиль
          </button>
        </div>

        <div className="card requests-card">
          <h2 className="requests-title">
          {role === 'admin' ? 'Все заявки' : role === 'realtor' ? 'Заявки на ваши объекты' : 'Ваши заявки на просмотр'}
        </h2>
        
        {loading ? (
          <p>Загрузка...</p>
        ) : requests.length === 0 ? (
          <p className="empty-requests">У вас пока нет заявок.</p>
        ) : (
          <div className="requests-list">
            {requests.map((req: any) => (
              <div key={req.id} className="request-item">
                <div>
                  <h4 className="request-title">
                    <Link to={`/property/${req.property}`}>
                      {req.property_details?.title || `Объект #${req.property}`}
                    </Link>
                  </h4>
                  <p className="request-meta">
                    Дата создания: {new Date(req.created_at).toLocaleString('ru-RU')}
                  </p>
                  {req.scheduled_time && (
                    <p className="request-scheduled">
                      ⏰ {req.status === 'new' ? 'Желаемое время:' : 'Назначено на:'} {new Date(req.scheduled_time).toLocaleString('ru-RU')}
                    </p>
                  )}
                  {req.comment && (
                    <p className="request-comment">
                      <strong>Комментарий:</strong> {req.comment}
                    </p>
                  )}
                  {role !== 'client' && (
                    <p className="request-client">
                      Клиент: {req.user_details?.username} ({req.user_details?.email})
                    </p>
                  )}
                </div>
                <div className="request-actions">
                  {getStatusBadge(req.status)}
                  
                  {role !== 'client' && req.status === 'new' && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button onClick={() => {
                        setSchedulingRequestId(req.id);
                        setScheduledDate(req.scheduled_time ? new Date(req.scheduled_time) : null);
                        setShowScheduleModal(true);
                      }} className="btn btn-secondary action-btn">
                        {req.scheduled_time ? 'Изменить время' : 'Назначить просмотр'}
                      </button>
                      {req.scheduled_time && (
                        <button onClick={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            await axios.patch(`http://127.0.0.1:8000/api/requests/${req.id}/`, {
                              status: 'scheduled',
                              scheduled_time: req.scheduled_time
                            }, {
                              headers: { Authorization: `Bearer ${token}` }
                            });
                            toast.success('Время просмотра подтверждено!');
                            fetchRequests();
                          } catch(e) {
                            toast.error('Ошибка при подтверждении');
                          }
                        }} className="btn btn-primary action-btn">
                          Подтвердить время
                        </button>
                      )}
                    </div>
                  )}
                  {role !== 'client' && req.status === 'scheduled' && (
                    <button onClick={() => updateStatus(req.id, 'completed')} className="btn btn-primary action-btn">
                      Завершить
                    </button>
                  )}
                  {role === 'client' && req.status === 'completed' && !req.is_paid && (
                    <button onClick={async () => {
                      try {
                        const res = await axios.post(`http://127.0.0.1:8000/api/requests/${req.id}/create_payment/`, {}, {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        window.location.href = res.data.confirmation_url;
                      } catch (e: any) {
                        toast.error(e.response?.data?.error || 'Ошибка при создании платежа');
                      }
                    }} className="btn success-btn action-btn">
                      Оплатить объект
                    </button>
                  )}
                  {role === 'client' && req.status === 'completed' && req.is_paid && (
                    <span style={{color: 'var(--success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      ✓ Оплачено
                    </span>
                  )}
                  {(role === 'client' || role === 'admin') && (req.status === 'new' || req.status === 'scheduled') && (
                    <button onClick={() => updateStatus(req.id, 'canceled')} className="btn danger-btn">
                      Отменить просмотр
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {showProfileModal && (
        <div className="modal-overlay">
          <div className="card modal-card">
            <h2 className="modal-title">Редактирование профиля</h2>
            <form onSubmit={handleProfileSave}>
              <div className="input-group">
                <label>Имя пользователя</label>
                <input className="input-field" type="text" value={profileData.username} onChange={e => setProfileData({...profileData, username: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input className="input-field" type="email" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Телефон</label>
                <input className="input-field" type="text" value={profileData.phone_number} onChange={e => setProfileData({...profileData, phone_number: e.target.value})} />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowProfileModal(false)} className="btn btn-secondary">Отмена</button>
                <button type="submit" className="btn btn-primary">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="card modal-card">
            <h2 className="modal-title">Назначить просмотр</h2>
            <div className="input-group">
              <label className="calendar-label">Выберите дату и время</label>
              <Calendar 
                value={scheduledDate} 
                onChange={(e: any) => setScheduledDate(e.value)} 
                showTime 
                hourFormat="24"
                dateFormat="dd.mm.yy"
                minDate={new Date()}
                placeholder="дд.мм.гггг чч:мм"
                className="w-full"
                style={{ width: '100%' }}
                inputStyle={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
              />
            </div>
            <div className="modal-actions">
              <button type="button" onClick={() => { setShowScheduleModal(false); setSchedulingRequestId(null); }} className="btn btn-secondary">Отмена</button>
              <button onClick={handleScheduleSubmit} className="btn btn-primary">Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
