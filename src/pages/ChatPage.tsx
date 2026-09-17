import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../api';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [guestChats, setGuestChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const token = localStorage.getItem('token');
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  
  const location = useLocation();

  const fetchData = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/api/chats/`, { headers: { Authorization: `Bearer ${token}` }});
      setMessages(res.data.sort((a: any, b: any) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()));
      
      const gRes = await axios.get(`${API_BASE}/api/guest-chats/`, { headers: { Authorization: `Bearer ${token}` }});
      setGuestChats(gRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // Polling every 3s
    return () => clearInterval(interval);
  }, [token]);

  // Handle incoming start chat from property details
  useEffect(() => {
    if (location.state?.startChatWith && location.state?.propertyId) {
      const { startChatWith, propertyId } = location.state;
      setActiveChat(`${propertyId}_${startChatWith}`);
      window.history.replaceState({}, document.title)
    }
  }, [location]);

  if (!token) return <div className="container" style={{ padding: '4rem 0' }}>Пожалуйста, войдите в систему.</div>;
  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Загрузка...</div>;

  // Group messages
  const chatsMap = new Map<string, any>();
  
  if (activeChat && !activeChat.startsWith('guest_') && !messages.find(m => {
    const mSenderId = m.sender_details?.id;
    const mRecipientId = m.recipient_details?.id;
    return `${m.property}_${mSenderId === userId ? mRecipientId : mSenderId}` === activeChat;
  })) {
    const [propId, otherId] = activeChat.split('_');
    chatsMap.set(activeChat, {
      chatId: activeChat,
      type: 'property',
      propertyId: propId,
      otherUserId: otherId,
      otherUser: { username: 'Пользователь ' + otherId },
      messages: []
    });
  }

  messages.forEach(m => {
    const mSenderId = m.sender_details?.id;
    const mRecipientId = m.recipient_details?.id;
    
    const isSender = mSenderId === userId;
    const otherUser = isSender ? m.recipient_details : m.sender_details;
    const otherUserId = isSender ? mRecipientId : mSenderId;
    const propertyId = m.property;
    
    const chatId = `${propertyId}_${otherUserId}`;
    
    if (!chatsMap.has(chatId)) {
      chatsMap.set(chatId, {
        chatId,
        type: 'property',
        propertyId,
        otherUser,
        otherUserId,
        messages: []
      });
    }
    chatsMap.get(chatId).messages.push(m);
  });

  const chats = Array.from(chatsMap.values());
  let activeChatData = null;
  
  if (activeChat?.startsWith('guest_')) {
     const gChat = guestChats.find(c => 'guest_' + c.session_id === activeChat);
     if (gChat) {
        activeChatData = {
           chatId: 'guest_' + gChat.session_id,
           type: 'guest',
           sessionId: gChat.session_id,
           otherUser: { first_name: 'Гость ' + gChat.session_id.substring(0, 4) },
           messages: gChat.messages
        };
     }
  } else {
     activeChatData = activeChat ? chatsMap.get(activeChat) : null;
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChatData) return;
    try {
      if (activeChatData.type === 'guest') {
         await axios.post(`${API_BASE}/api/guest-messages/`, {
           session_id: activeChatData.sessionId,
           text: newMessage
         }, { headers: { Authorization: `Bearer ${token}` }});
      } else {
         await axios.post(`${API_BASE}/api/chats/`, {
           recipient: activeChatData.otherUserId,
           property: activeChatData.propertyId,
           message_text: newMessage
         }, { headers: { Authorization: `Bearer ${token}` }});
      }
      setNewMessage('');
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при отправке сообщения');
    }
  };

  return (
    <div className="container chat-container">
      <div className="card chat-sidebar">
        <h3 className="chat-sidebar-title">Диалоги</h3>
        {chats.length === 0 && guestChats.length === 0 ? <p style={{ color: 'var(--text-light)' }}>У вас пока нет активных диалогов</p> : null}
        
        {chats.map(c => (
          <div 
            key={c.chatId} 
            onClick={() => setActiveChat(c.chatId)}
            className={`chat-item ${activeChat === c.chatId ? 'active' : ''}`}
          >
            <div className="chat-item-name">{c.otherUser?.first_name || c.otherUser?.username}</div>
            <div className="chat-item-meta">Объект #{c.propertyId}</div>
          </div>
        ))}

        {guestChats.length > 0 && (
           <>
             <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1rem', color: 'var(--text-light)' }}>Чаты с сайта (Гости)</h4>
             {guestChats.map(c => (
               <div 
                 key={c.session_id} 
                 onClick={() => setActiveChat('guest_' + c.session_id)}
                 className={`chat-item ${activeChat === 'guest_' + c.session_id ? 'active' : ''}`}
               >
                 <div className="chat-item-name">Гость {c.session_id.substring(0, 4)}</div>
                 <div className="chat-item-meta">Сообщений: {c.messages?.length || 0}</div>
               </div>
             ))}
           </>
        )}
      </div>
      
      <div className="card chat-main">
        {activeChatData ? (
          <>
            <div className="chat-header">
              Чат с {activeChatData.otherUser?.first_name || activeChatData.otherUser?.username}
              {activeChatData.type === 'property' && ` (Объект #${activeChatData.propertyId})`}
            </div>
            <div className="chat-messages">
              {activeChatData.messages.length === 0 && <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>Нет сообщений. Напишите первым!</p>}
              {activeChatData.messages.map((m: any) => {
                let isMine = false;
                let text = '';
                
                if (activeChatData.type === 'guest') {
                   isMine = m.sender === 'staff';
                   text = m.text;
                } else {
                   isMine = m.sender_details?.id === userId;
                   text = m.message_text;
                }
                
                return (
                  <div key={m.id} className={`chat-message-container ${isMine ? 'mine' : 'theirs'}`}>
                    <div className="chat-message-bubble">
                      {text}
                    </div>
                    <div className="chat-message-time">
                      {new Date(m.sent_at).toLocaleTimeString('ru-RU')}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="chat-input-container">
              <input 
                type="text" 
                className="input" 
                value={newMessage} 
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Написать сообщение..." 
                style={{ flex: 1 }}
              />
              <button onClick={sendMessage} className="btn btn-primary">Отправить</button>
            </div>
          </>
        ) : (
          <div className="chat-empty">
            Выберите диалог слева
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
