import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import CustomDropdown from '../components/CustomDropdown';
import Pagination from '../components/Pagination';
import './CatalogPage.css';

const CatalogPage: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const paginatedProperties = properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            <CustomDropdown
              value={category}
              options={[
                { label: 'Все', value: 'all' },
                { label: 'Квартира', value: 'Квартира' },
                { label: 'Дом', value: 'Дом' }
              ]}
              onChange={value => setCategory(value)}
              optionLabel="label"
              optionValue="value"
              placeholder="Все"
            />
          </div>
          <div className="input-group">
            <label className="filter-label">Цена до (₽)</label>
            <CustomDropdown
              value={maxPrice}
              options={[
                { label: 'Любая', value: null },
                { label: 'До 3 000 000 ₽', value: 3000000 },
                { label: 'До 5 000 000 ₽', value: 5000000 },
                { label: 'До 10 000 000 ₽', value: 10000000 },
                { label: 'До 20 000 000 ₽', value: 20000000 },
                { label: 'До 50 000 000 ₽', value: 50000000 }
              ]}
              onChange={value => setMaxPrice(value)}
              optionLabel="label"
              optionValue="value"
              placeholder="Любая"
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
              {paginatedProperties.map((prop: any) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
          {properties.length > 0 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;