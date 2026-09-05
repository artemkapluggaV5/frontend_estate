import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { API_BASE } from '../api';

interface ViewingRequestModalProps {
  propertyId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ViewingRequestModal: React.FC<ViewingRequestModalProps> = ({ propertyId, isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !comment) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers: any = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/api/requests/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          property: propertyId,
          name,
          phone,
          email,
          comment
        }),
      });

      if (response.ok) {
        toast.success('Заявка на просмотр успешно отправлена!');
        setName('');
        setPhone('');
        setEmail('');
        setComment('');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const errData = await response.json();
        toast.error(errData?.detail || 'Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Error submitting viewing request:', error);
      toast.error('Произошла ошибка при отправке заявки');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="modal-overlay" style={{ zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)' }}>
      <div className="modal-content" style={{ width: '100%', maxWidth: '400px', background: 'var(--surface)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ background: 'var(--danger)', color: 'white', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, textTransform: 'uppercase' }}>ЗАПИСАТЬСЯ НА ПРОСМОТР</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Введите имя<span style={{color: 'var(--danger)'}}>*</span></label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
              className="form-control"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--background)', color: 'var(--text)' }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Телефон<span style={{color: 'var(--danger)'}}>*</span></label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ padding: '0.75rem', background: 'var(--border)', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🇷🇺</span>
              </div>
              <input 
                type="tel" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                required
                className="form-control"
                style={{ width: '100%', padding: '0.75rem', border: 'none', outline: 'none', background: 'var(--background)', color: 'var(--text)' }}
              />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Email<span style={{color: 'var(--danger)'}}>*</span></label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              className="form-control"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--background)', color: 'var(--text)' }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Дополнительная информация<span style={{color: 'var(--danger)'}}>*</span></label>
            <textarea 
              value={comment} 
              onChange={e => setComment(e.target.value)} 
              required
              rows={4}
              className="form-control"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--background)', color: 'var(--text)', resize: 'vertical' }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: 'var(--danger)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              fontSize: '1rem', 
              fontWeight: 600, 
              cursor: loading ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase'
            }}>
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
          
          <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.4 }}>
            Нажимая на кнопку «Отправить», Вы даете согласие на обработку персональных данных в соответствии с <a href="#" style={{color: 'var(--danger)'}}>Политикой конфиденциальности</a>
          </p>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ViewingRequestModal;
