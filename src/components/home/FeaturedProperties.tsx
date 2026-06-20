import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../PropertyCard';
import { useNavigate } from 'react-router-dom';

const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/properties/');
        // take first 3 properties for the main page
        setProperties(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured properties", error);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Купить квартиру в Белореченске</h2>
        <button 
          className="btn btn-secondary" 
          style={{ background: 'var(--secondary)', color: 'white', borderRadius: '50px', padding: '0.75rem 1.5rem', fontWeight: 600 }}
          onClick={() => navigate('/catalog')}
        >
          Открыть все предложения
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Загрузка объектов...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {properties.map((prop: any) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;
