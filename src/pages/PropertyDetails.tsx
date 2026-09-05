import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../api';
import { toast } from 'react-toastify';
import ViewingRequestModal from '../components/ViewingRequestModal';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import './PropertyDetails.css';

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${API_BASE}/api/properties/${id}/`, { headers });
        setProperty(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          try {
            // Если токен протух, пробуем без него
            const retryResponse = await axios.get(`${API_BASE}/api/properties/${id}/`);
            setProperty(retryResponse.data);
          } catch (retryError) {
            console.error('Error fetching property without token:', retryError);
          }
        } else {
          console.error('Error fetching property:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && property) {
      axios.get(`${API_BASE}/api/favorites/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(res => {
          const fav = res.data.find((f: any) => f.property === property.id);
          if (fav) setFavoriteId(fav.id);
        })
        .catch(err => console.error(err));
    } else if (!isAuthenticated && property) {
      const localFavs = JSON.parse(localStorage.getItem('guestFavorites') || '[]');
      if (localFavs.includes(property.id)) {
        setFavoriteId(-1); // dummy ID for guest
      }
    }
  }, [isAuthenticated, property]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      let localFavs = JSON.parse(localStorage.getItem('guestFavorites') || '[]');
      if (favoriteId === -1) {
        localFavs = localFavs.filter((id: number) => id !== property.id);
        setFavoriteId(null);
        toast.info('Удалено из избранного');
      } else {
        localFavs.push(property.id);
        setFavoriteId(-1);
        toast.success('Добавлено в избранное!', { icon: <i className="pi pi-heart-fill" style={{ color: 'var(--danger)' }}></i> });
      }
      localStorage.setItem('guestFavorites', JSON.stringify(localFavs));
      window.dispatchEvent(new Event('favoritesUpdated'));
      return;
    }

    try {
      if (favoriteId) {
        await axios.delete(`${API_BASE}/api/favorites/${favoriteId}/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setFavoriteId(null);
        toast.info('Удалено из избранного');
      } else {
        const res = await axios.post(`${API_BASE}/api/favorites/`, { property: property.id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setFavoriteId(res.data.id);
        toast.success('Добавлено в избранное!', { icon: <i className="pi pi-heart-fill" style={{ color: 'var(--danger)' }}></i> });
      }
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Ошибка при обновлении избранного');
    }
  };

  
  const startChat = () => {
    if (!isAuthenticated) return toast.warning('Пожалуйста, войдите в систему.');
    if (!property.agent_details?.user_details?.id) return toast.error('Риелтор не назначен');
    navigate('/chat', { state: { startChatWith: property.agent_details.user_details.id, propertyId: property.id } });
  };

  if (loading) return <div className="container details-center-state">Загрузка...</div>;
  if (!property) return <div className="container details-center-state">Объект не найден</div>;

  const photos = property.photos && property.photos.length > 0
    ? property.photos.sort((a: any, b: any) => (b.is_main ? 1 : 0) - (a.is_main ? 1 : 0))
    : [{ id: 'placeholder', image_path: 'https://via.placeholder.com/800x600?text=No+Image' }];

  return (
    <div className="container">
      <div className="details-grid">
        <div>
          <div className="gallery-container">
            <LightGallery
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              elementClassNames="gallery-grid"
            >
              {photos.map((photo: any, index: number) => (
                <a key={photo.id} href={photo.image_path} data-src={photo.image_path} className={index === 0 ? "main-image-link" : "thumb-link"}>
                  <img alt={property.title} src={photo.image_path} />
                </a>
              ))}
            </LightGallery>
          </div>
          <h1 className="property-title">{property.title}</h1>
          <p className="property-meta">
            {property.address} • {property.area} м² • {property.category_details?.name}
          </p>

          <h3 className="section-title">Описание</h3>
          <p className="property-description">{property.description}</p>

          <h3 className="section-title">Удобства</h3>
          <div className="amenities-list">
            {property.amenities?.map((amenity: any) => (
              <span key={amenity.id} className="amenity-badge">
                {amenity.name}
              </span>
            ))}
          </div>
        </div>

        <div className="sidebar-container">
          <div className="card price-card">
            <div className="price-header">
              <h2 className="price-value">
                {parseFloat(property.price).toLocaleString('ru-RU')} ₽
              </h2>
              {role !== 'realtor' && (
                <button
                  onClick={handleToggleFavorite}
                  className="favorite-btn"
                  style={{
                    color: favoriteId ? 'var(--danger)' : 'var(--text-light)'
                  }}
                  title={favoriteId ? "Удалить из избранного" : "Добавить в избранное"}
                >
                  {favoriteId ? <i className="pi pi-heart-fill"></i> : <i className="pi pi-heart"></i>}
                </button>
              )}
            </div>
            <p className="agent-info">
              Риелтор: {property.agent_details ? `${property.agent_details.user_details?.first_name || property.agent_details.user_details?.username}` : 'Не назначен'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setIsViewingModalOpen(true)} 
                className="btn btn-primary" 
                style={{ flex: 1, minWidth: '200px' }}
              >
                Записаться на просмотр
              </button>
              {isAuthenticated && property.agent_details && role !== 'realtor' && (
                <button onClick={startChat} className="btn btn-secondary chat-btn" style={{ flex: 1, minWidth: '200px' }}>
                  <i className="pi pi-comments" style={{ marginRight: '8px' }}></i> Написать риелтору
                </button>
              )}
            </div>
          </div>
          {role === 'realtor' ? (
            <div className="card status-card" style={{ marginTop: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '0.5rem' }}>Режим риелтора</h3>
              <p style={{ color: 'var(--text-light)' }}>Действия покупателя недоступны.</p>
            </div>
          ) : property.is_booked ? (
            <div className="card status-card" style={{ marginTop: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '1rem' }}>КУПЛЕНО</h3>
              <p style={{ color: 'var(--text-light)' }}>К сожалению, этот объект уже куплен другим клиентом.</p>
            </div>
          ) : property.has_user_requested ? (
            <div className="card status-card" style={{ marginTop: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>Вы уже записались</h3>
              <p style={{ color: 'var(--text-light)' }}>Ваша заявка в обработке. Отслеживайте её статус в личном кабинете.</p>
            </div>
          ) : null}
        </div>
      </div>
      
      <ViewingRequestModal 
        isOpen={isViewingModalOpen} 
        onClose={() => setIsViewingModalOpen(false)} 
        propertyId={property.id} 
        onSuccess={() => setProperty({ ...property, has_user_requested: true })}
      />
    </div>
  );
};

export default PropertyDetails;
