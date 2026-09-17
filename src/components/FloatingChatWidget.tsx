import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE } from '../api';
import './FloatingChatWidget.css';

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sid = localStorage.getItem('guest_session_id');
    if (!sid) {
      sid = 'guest_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('guest_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  const fetchMessages = async () => {
    if (!sessionId || !isOpen) return;
    try {
      const res = await axios.get(`${API_BASE}/api/guest-messages/?session_id=${sessionId}`);
      setMessages(res.data);
      scrollToBottom();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || !sessionId) return;
    try {
      await axios.post(`${API_BASE}/api/guest-messages/`, {
        session_id: sessionId,
        text: text
      });
      setNewMessage('');
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div 
      className="floating-chat-container" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isOpen && (
        <div className="floating-chat-modal card">
          <div className="floating-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="pi pi-comments" style={{ fontSize: '1.2rem' }}></i>
              <span style={{ fontWeight: 600 }}>Мы онлайн, задавайте вопросы!</span>
            </div>
            <button className="floating-chat-close" onClick={() => setIsOpen(false)}>
              <i className="pi pi-times"></i>
            </button>
          </div>
          <div className="floating-chat-messages">
            {messages.length === 0 && (
              <div className="chat-message-container theirs">
                <div className="chat-message-bubble" style={{ background: 'var(--border)' }}>Здравствуйте! Чем можем помочь?</div>
              </div>
            )}
            {messages.map((m: any) => (
              <div key={m.id} className={`chat-message-container ${m.sender === 'client' ? 'mine' : 'theirs'}`}>
                <div className="chat-message-bubble" style={m.sender !== 'client' ? { background: 'var(--border)' } : {}}>{m.text}</div>
                <div className="chat-message-time">{new Date(m.sent_at).toLocaleTimeString('ru-RU')}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="floating-chat-quick-replies">
             <button onClick={() => sendMessage('Здравствуйте')}>Здравствуйте</button>
             <button onClick={() => sendMessage('Подскажите, пожалуйста')}>Подскажите, пожалуйста</button>
          </div>
          <div className="floating-chat-input-container">
            <input 
              type="text" 
              placeholder="Введите сообщение..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)}
            />
            <button onClick={() => sendMessage(newMessage)}>
              <i className="pi pi-send"></i>
            </button>
          </div>
        </div>
      )}

      {!isOpen && isHovered && (
        <div className="floating-chat-menu">
          <a href="#" className="floating-chat-menu-item max-btn" title="Напиши нам в MAX">
            <i className="pi pi-telegram"></i> <span>Напиши нам в MAX</span>
          </a>
          <a href="#" className="floating-chat-menu-item whatsapp-btn" title="Напишите нам!">
            <i className="pi pi-whatsapp"></i> <span>Напишите нам!</span>
          </a>
          <button className="floating-chat-menu-item chat-btn" onClick={() => setIsOpen(true)} title="Напишите нам!">
            <i className="pi pi-comments"></i> <span>Напишите нам!</span>
          </button>
        </div>
      )}

      {!isOpen && (
        <button className="floating-chat-main-btn" onClick={() => setIsOpen(true)}>
          <i className="pi pi-comments" style={{ fontSize: '1.8rem' }}></i>
        </button>
      )}
    </div>
  );
};

export default FloatingChatWidget;
