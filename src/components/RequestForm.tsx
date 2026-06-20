import React, { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';

// Типизация входных параметров (пропсов) компонента
interface RequestFormProps {
    propertyId: number;
}

const RequestForm: React.FC<RequestFormProps> = ({ propertyId }) => {
    const [comment, setComment] = useState<string>('');
    const [scheduledTime, setScheduledTime] = useState<Date | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/requests/', {
            property: propertyId,
            comment: comment,
            scheduled_time: scheduledTime ? scheduledTime.toISOString() : null
        }).then(() => {
            toast.success('Заявка успешно отправлена!');
            setComment('');
            setScheduledTime(null);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="request-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4>Оставить заявку на просмотр</h4>
            <div className="input-group" style={{ marginBottom: 0 }}>
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
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментарий риелтору..."
                required
                rows={4}
                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontFamily: 'inherit' }}
            />
            <button type="submit">Отправить заявку</button>
        </form>
    );
};

export default RequestForm;