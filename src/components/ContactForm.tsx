import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../api';
import { toast } from 'react-toastify';
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_BASE}/api/contact-requests/`, formData);
      toast.success('Сообщение успешно отправлено!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Произошла ошибка при отправке сообщения.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-section" id="contact-form-block">
      <div className="contact-form-header">
        <h2>Написать нам</h2>
        <p>Если у вас появились вопросы, напишите нам!</p>
      </div>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-top">
          <div className="contact-form-left">
            <input 
              type="text" 
              placeholder="Ваше имя*" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="E-mail*" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <div className="phone-input-wrapper">
              <span className="flag">🇷🇺</span>
              <input 
                type="tel" 
                placeholder="Телефон" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          
          <div className="contact-form-right">
            <textarea 
              placeholder="Ваше сообщение" 
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
        </div>
        
        <div className="contact-form-footer">
          <button type="submit" disabled={loading} className="btn btn-primary submit-btn">
            {loading ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ СООБЩЕНИЕ'}
          </button>
          <p className="privacy-policy">
            Нажимая на кнопку «Отправить сообщение», Вы даете согласие на обработку персональных данных в соответствии с <a href="#">Политикой конфиденциальности</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
