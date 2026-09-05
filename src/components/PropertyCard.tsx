import React from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const mainPhoto = property.photos?.find((p: any) => p.is_main)?.image_path || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
        <img 
          src={mainPhoto} 
          alt={property.title} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', top: '10px', right: '10px',
          background: property.is_booked ? 'var(--danger)' : 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600
        }}>
          {property.is_booked ? 'КУПЛЕНО' : property.category_details?.name}
        </div>
        {property.is_booked && (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ background: 'var(--danger)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '1px', transform: 'rotate(-5deg)' }}>
              ПРОДАНО
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>
          {property.title}
        </h3>
        <p style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          {parseFloat(property.price).toLocaleString('ru-RU')} ₽
        </p>
        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1rem', flexGrow: 1 }}>
          {property.address} • {property.area} м²
        </p>
        <Link to={`/property/${property.id}`} className="btn btn-primary" style={{ width: '100%' }}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
