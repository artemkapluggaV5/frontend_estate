import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomDropdown from '../components/CustomDropdown';
import { API_BASE } from '../api';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/reviews/`);
      setReviews(res.data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (error) {
      toast.error('Ошибка при загрузке отзывов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.warning('Пожалуйста, войдите в систему.');

    try {
      const res = await axios.post(`${API_BASE}/api/reviews/`, {
        rating: newReviewRating,
        comment: newReviewComment
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
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

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>Загрузка...</div>;

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>Отзывы. Мы рады улучшить работу нашей компании.</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Просто напишите!</p>
      </div>

      {isAuthenticated && role !== 'realtor' ? (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Оставить отзыв</h2>
          <form onSubmit={handleReviewSubmit}>
            <div className="input-group">
              <label>Ваша оценка:</label>
              <CustomDropdown
                value={newReviewRating}
                onChange={value => setNewReviewRating(Number(value))}
                options={[
                  { label: 'Отлично (5)', value: 5 },
                  { label: 'Хорошо (4)', value: 4 },
                  { label: 'Нормально (3)', value: 3 },
                  { label: 'Плохо (2)', value: 2 },
                  { label: 'Ужасно (1)', value: 1 },
                ]}
                optionLabel="label"
                optionValue="value"
              />
            </div>
            <div className="input-group">
              <label>Ваш отзыв:</label>
              <textarea
                className="input-field"
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Расскажите о своем опыте..."
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Опубликовать отзыв</button>
          </form>
        </div>
      ) : isAuthenticated && role === 'realtor' ? (
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-light)' }}>
          Риелторы не могут оставлять отзывы о компании.
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-light)' }}>
          Пожалуйста, войдите в систему, чтобы оставить отзыв.
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {reviews.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Пока нет отзывов. Будьте первыми!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {reviews.map(r => (
              <div key={r.id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{r.user_details?.username}</strong>
                  <span style={{ display: 'flex', gap: '0.25rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={i < r.rating ? "pi pi-star-fill" : "pi pi-star"} style={{ color: i < r.rating ? "var(--accent)" : "var(--border)" }}></i>
                    ))}
                  </span>
                </div>
                <p style={{ color: 'var(--text)', lineHeight: 1.6, marginBottom: '1rem' }}>{r.comment}</p>
                <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
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

export default ReviewsPage;
