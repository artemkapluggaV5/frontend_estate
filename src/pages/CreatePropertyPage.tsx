import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomMultiSelect from '../components/CustomMultiSelect';
import CustomDropdown from '../components/CustomDropdown';
import './CreatePropertyPage.css';

const CreatePropertyPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    area: '',
    address: '',
    category: ''
  });
  const [photoUrls, setPhotoUrls] = useState(['']);
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => setCategories(res.data))
      .catch(console.error);
    axios.get('http://127.0.0.1:8000/api/amenities/')
      .then(res => setAmenities(res.data))
      .catch(console.error);
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) return toast.warning('Выберите категорию');
    
    try {
      // 1. Create property
      const res = await axios.post('http://127.0.0.1:8000/api/properties/', {
        ...formData,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        amenities: selectedAmenities
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const propertyId = res.data.id;
      
      // 2. Add photos
      for (let i = 0; i < photoUrls.length; i++) {
        if (photoUrls[i].trim() !== '') {
          await axios.post('http://127.0.0.1:8000/api/photos/', {
            property: propertyId,
            image_path: photoUrls[i].trim(),
            is_main: i === 0 // First photo is main
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }
      
      toast.success('Объект успешно добавлен!');
      navigate('/catalog');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при добавлении объекта');
    }
  };

  return (
    <div className="container create-property-page">
      <h1 className="page-title">Добавление нового объекта</h1>
      
      <div className="card form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Категория *</label>
              <CustomDropdown
                value={formData.category}
                onChange={value => setFormData({...formData, category: value})}
                options={categories}
                optionLabel="name"
                optionValue="id"
                placeholder="Выберите категорию"
              />
            </div>
            <div className="input-group">
              <label>Заголовок *</label>
              <input type="text" className="input-field" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Цена (₽) *</label>
              <input type="number" step="0.01" className="input-field" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Площадь (м²) *</label>
              <input type="number" step="0.1" className="input-field" required value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
            </div>
          </div>
          
          <div className="input-group form-group">
            <label>Адрес *</label>
            <input type="text" className="input-field" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>

          <div className="input-group form-group">
            <label className="form-label">Удобства</label>
            <CustomMultiSelect 
              value={selectedAmenities} 
              options={amenities} 
              onChange={(value) => setSelectedAmenities(value)} 
              optionLabel="name" 
              optionValue="id"
              placeholder="Выберите удобства (кондиционер, Wi-Fi...)" 
            />
          </div>
          
          <div className="input-group form-group">
            <label>Описание *</label>
            <textarea className="input-field" rows={5} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className="photos-section">
            <h3 className="section-title">Фотографии (ссылки)</h3>
            <p className="section-subtitle">Вставьте прямые ссылки на изображения (первая ссылка будет главным фото)</p>
            {photoUrls.map((url, i) => (
              <div key={i} className="photo-row">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="https://example.com/image.jpg"
                  value={url}
                  onChange={e => {
                    const newUrls = [...photoUrls];
                    newUrls[i] = e.target.value;
                    setPhotoUrls(newUrls);
                  }}
                />
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setPhotoUrls(photoUrls.filter((_, idx) => idx !== i));
                }}>Удалить</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary add-photo-btn" onClick={() => setPhotoUrls([...photoUrls, ''])}>+ Добавить еще фото</button>
          </div>
          
          <button type="submit" className="btn btn-primary submit-btn">Создать объект</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePropertyPage;
