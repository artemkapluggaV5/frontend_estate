import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../api';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-toastify';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`${API_BASE}/api/favorites/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setFavorites(res.data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    } else {
      const localFavs = JSON.parse(localStorage.getItem('guestFavorites') || '[]');
      if (localFavs.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      Promise.all(localFavs.map((id: number) => axios.get(`${API_BASE}/api/properties/${id}/`)))
        .then(responses => {
          const mapped = responses.map((res: any) => ({
            id: res.data.id, 
            property_details: res.data
          }));
          // @ts-ignore
          setFavorites(mapped);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isAuthenticated, token]);

  const handleRemove = async (favId: number) => {
    if (isAuthenticated) {
      try {
        await axios.delete(`${API_BASE}/api/favorites/${favId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(favorites.filter((f: any) => f.id !== favId));
        window.dispatchEvent(new Event('favoritesUpdated'));
        toast.info('Объект удален из избранного');
      } catch (e) {
        toast.error('Ошибка при удалении');
      }
    } else {
      let localFavs = JSON.parse(localStorage.getItem('guestFavorites') || '[]');
      localFavs = localFavs.filter((id: number) => id !== favId);
      localStorage.setItem('guestFavorites', JSON.stringify(localFavs));
      setFavorites(favorites.filter((f: any) => f.id !== favId));
      window.dispatchEvent(new Event('favoritesUpdated'));
      toast.info('Объект удален из избранного');
    }
  };

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
                onClick={() => handleRemove(fav.id)}
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
