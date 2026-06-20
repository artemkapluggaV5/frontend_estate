import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';

interface ViewingRequestFormProps {
  propertyId: number;
  onSuccess?: () => void;
}

const ViewingRequestForm: React.FC<ViewingRequestFormProps> = ({ propertyId, onSuccess }) => {
  const [comment, setComment] = useState('');
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      toast.warning('Пожалуйста, войдите в систему, чтобы оставить заявку на просмотр.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/requests/', {
        property: propertyId,
        comment: comment,
        scheduled_time: scheduledTime ? scheduledTime.toISOString() : null
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Заявка на просмотр успешно отправлена!');
      setComment('');
      setScheduledTime(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Произошла ошибка при отправке заявки.');
      console.error('Ошибка при отправке заявки:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '2rem', marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Записаться на просмотр</h3>
      <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Оставьте комментарий к заявке, и наш агент свяжется с вами.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Желаемая дата и время (необязательно)</label>
          <Calendar 
            value={scheduledTime} 
            onChange={(e: any) => setScheduledTime(e.value)} 
            showTime 
            hourFormat="24"
            dateFormat="dd.mm.yy"
            minDate={new Date()}
            placeholder="Выберите желаемое время"
            className="w-full"
            inputStyle={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
          />
        </div>
        
        <div className="input-group">
          <label>Комментарий</label>
          <textarea 
            className="input-field" 
            rows={4}
            placeholder="Например, удобное время для звонка или просмотра..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ resize: 'vertical' }}
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {loading ? 'Отправка...' : 'Записаться на просмотр'}
        </button>
      </form>
    </div>
  );
};

export default ViewingRequestForm;
