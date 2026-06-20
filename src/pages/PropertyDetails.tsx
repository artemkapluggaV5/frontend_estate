import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ViewingRequestForm from '../components/ViewingRequestForm';
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
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}/`, { headers });
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();

    axios.get(`http://127.0.0.1:8000/api/reviews/`)
      .then(res => setReviews(res.data.filter((r: any) => r.property === parseInt(id || '0'))))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && property) {
      axios.get('http://127.0.0.1:8000/api/favorites/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(res => {
          const fav = res.data.find((f: any) => f.property === property.id);
          if (fav) setFavoriteId(fav.id);
        })
        .catch(err => console.error(err));
    }
  }, [isAuthenticated, property]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) return toast.warning('Пожалуйста, войдите в систему.');
    try {
      if (favoriteId) {
        await axios.delete(`http://127.0.0.1:8000/api/favorites/${favoriteId}/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setFavoriteId(null);
        toast.info('Удалено из избранного');
      } else {
        const res = await axios.post('http://127.0.0.1:8000/api/favorites/', { property: property.id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setFavoriteId(res.data.id);
        toast.success('Добавлено в избранное! ❤️');
      }
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Ошибка при обновлении избранного');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.warning('Пожалуйста, войдите в систему.');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/reviews/', {
        property: property.id,
        rating: newReviewRating,
        comment: newReviewComment
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Fetch user details for the new review if not present
      const reviewWithUser = {
        ...res.data,
        user_details: res.data.user_details || { username: localStorage.getItem('username') || 'Вы' }
      };
      setReviews([reviewWithUser, ...reviews]);
      setNewReviewComment('');
      setNewReviewRating(5);
      toast.success('Отзыв успешно добавлен!');
    } catch (error: any) {
      if (error.response?.data) {
        const errMessage = Array.isArray(error.response.data) ? error.response.data[0] : (error.response.data.non_field_errors?.[0] || Object.values(error.response.data)[0]);
        toast.error(typeof errMessage === 'string' ? errMessage : 'Вы не можете оставить отзыв.');
      } else {
        toast.error('Ошибка при добавлении отзыва');
      }
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
              {isAuthenticated && (
                <button
                  onClick={handleToggleFavorite}
                  className="favorite-btn"
                  style={{
                    color: favoriteId ? 'var(--danger)' : 'var(--text-light)'
                  }}
                  title={favoriteId ? "Удалить из избранного" : "Добавить в избранное"}
                >
                  {favoriteId ? '❤️' : '🤍'}
                </button>
              )}
            </div>
            <p className="agent-info">
              Риелтор: {property.agent_details ? `${property.agent_details.user_details?.first_name || property.agent_details.user_details?.username}` : 'Не назначен'}
            </p>
            {isAuthenticated && property.agent_details && (
              <button onClick={startChat} className="btn btn-secondary chat-btn">
                💬 Написать риелтору
              </button>
            )}
          </div>
          {property.is_booked ? (
            <div className="card" style={{ padding: '2rem', marginTop: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '1rem' }}>КУПЛЕНО</h3>
              <p style={{ color: 'var(--text-light)' }}>К сожалению, этот объект уже куплен другим клиентом.</p>
            </div>
          ) : property.has_user_requested ? (
            <div className="card" style={{ padding: '2rem', marginTop: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>Вы уже записались</h3>
              <p style={{ color: 'var(--text-light)' }}>Ваша заявка в обработке. Отслеживайте её статус в личном кабинете.</p>
            </div>
          ) : (
            <ViewingRequestForm propertyId={property.id} onSuccess={() => setProperty({ ...property, has_user_requested: true })} />
          )}
        </div>
      </div>

      <div className="card reviews-section">
        <h2 className="reviews-title">Отзывы</h2>
        <div className="reviews-warning">
          Внимание: возможность оставлять отзывы доступна только клиентам, оплатившим объект.
        </div>

        {isAuthenticated && (
          <form onSubmit={handleReviewSubmit} className="review-form" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            <div className="input-group">
              <label>Ваша оценка:</label>
              <select
                className="input-field"
                value={newReviewRating}
                onChange={e => setNewReviewRating(Number(e.target.value))}
                style={{ maxWidth: '150px' }}
              >
                <option value={5}>★★★★★ (5)</option>
                <option value={4}>★★★★☆ (4)</option>
                <option value={3}>★★★☆☆ (3)</option>
                <option value={2}>★★☆☆☆ (2)</option>
                <option value={1}>★☆☆☆☆ (1)</option>
              </select>
            </div>
            <div className="input-group">
              <label>Текст отзыва:</label>
              <textarea
                className="input-field"
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Поделитесь своими впечатлениями..."
                rows={3}
              />
            </div>
            <button type="submit" className="btn btn-primary">Оставить отзыв</button>
          </form>
        )}
        {reviews.length === 0 ? (
          <p className="empty-reviews">Пока нет отзывов об этом объекте.</p>
        ) : (
          <div className="reviews-list">
            {reviews.map(r => (
              <div key={r.id} className="review-item">
                <div className="review-header">
                  <strong>{r.user_details?.username}</strong>
                  <span className="review-rating">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p>{r.comment}</p>
                <div className="review-date">
                  {new Date(r.created_at).toLocaleDateString('ru-RU')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
