import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    axios.get('http://127.0.0.1:8000/api/favorites/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setFavorites(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [token]);

  if (!token) return <div className="container favorites-container">Пожалуйста, войдите в систему.</div>;
  if (loading) return <div className="container favorites-container">Загрузка...</div>;

  return (
    <div className="container favorites-container">
      <h1 className="favorites-title">Мое Избранное</h1>
      {favorites.length === 0 ? (
        <p>У вас пока нет избранных объектов.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav: any) => (
            <div key={fav.id} className="favorite-item">
              <PropertyCard property={fav.property_details} />
              <button 
                onClick={async () => {
                  try {
                    await axios.delete(`http://127.0.0.1:8000/api/favorites/${fav.id}/`, {
                      headers: { Authorization: `Bearer ${token}` }
                    });
                    setFavorites(favorites.filter((f: any) => f.id !== fav.id));
                    window.dispatchEvent(new Event('favoritesUpdated'));
                    toast.info('Объект удален из избранного');
                  } catch (e) {
                    toast.error('Ошибка при удалении');
                  }
                }}
                className="remove-favorite-btn"
                title="Удалить из избранного"
              >
                <i className="pi pi-times"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
