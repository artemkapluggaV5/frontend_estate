import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { Dropdown } from 'primereact/dropdown';
import './CatalogPage.css';

const CatalogPage: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all' && category !== '') {
        params.append('category', category);
      }
      if (maxPrice !== null && maxPrice !== undefined && maxPrice > 0) {
        params.append('max_price', maxPrice.toString());
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/properties/?${params.toString()}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="container">
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Каталог недвижимости</h1>
          <p className="catalog-subtitle">Найдите идеальное жилье в Юг-Хаус</p>
        </div>
      </div>

      <div className="catalog-content">
        <aside className="catalog-sidebar">
          <h3 className="sidebar-title">Фильтры</h3>
          <div className="input-group filter-group">
            <label className="filter-label">Тип недвижимости</label>
            <Dropdown 
              value={category} 
              options={[
                { label: 'Все', value: 'all' },
                { label: 'Квартира', value: 'Квартира' },
                { label: 'Дом', value: 'Дом' }
              ]} 
              onChange={e => setCategory(e.value)} 
              placeholder="Все" 
              className="custom-dropdown w-full"
            />
          </div>
          <div className="input-group">
            <label className="filter-label">Цена до (₽)</label>
            <Dropdown 
              value={maxPrice} 
              options={[
                { label: 'Любая', value: null },
                { label: 'До 3 000 000 ₽', value: 3000000 },
                { label: 'До 5 000 000 ₽', value: 5000000 },
                { label: 'До 10 000 000 ₽', value: 10000000 },
                { label: 'До 20 000 000 ₽', value: 20000000 },
                { label: 'До 50 000 000 ₽', value: 50000000 }
              ]}
              onChange={e => setMaxPrice(e.value)} 
              placeholder="Любая" 
              className="custom-dropdown w-full"
            />
          </div>
          <button className="btn btn-primary apply-btn" onClick={fetchProperties}>Применить</button>
        </aside>

        <div>
          {loading ? (
            <div className="center-state">Загрузка...</div>
          ) : properties.length === 0 ? (
            <div className="empty-state">Объекты не найдены</div>
          ) : (
            <div className="property-grid">
              {properties.map((prop: any) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;