import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const token = localStorage.getItem('token');
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  
  const location = useLocation();

  const fetchMessages = async () => {
    if (!token) return;
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/chats/', { headers: { Authorization: `Bearer ${token}` }});
      setMessages(res.data.sort((a: any, b: any) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling every 3s
    return () => clearInterval(interval);
  }, [token]);

  // Handle incoming start chat from property details
  useEffect(() => {
    if (location.state?.startChatWith && location.state?.propertyId) {
      const { startChatWith, propertyId } = location.state;
      setActiveChat(`${propertyId}_${startChatWith}`);
      // Clear state so it doesn't stuck
      window.history.replaceState({}, document.title)
    }
  }, [location]);

  if (!token) return <div className="container" style={{ padding: '4rem 0' }}>Пожалуйста, войдите в систему.</div>;
  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Загрузка...</div>;

  // Group messages
  const chatsMap = new Map<string, any>();
  
  // If we came from PropertyDetails but haven't sent a message yet, we need to initialize the chat block
  if (activeChat && !messages.find(m => {
    const mSenderId = m.sender_details?.id;
    const mRecipientId = m.recipient_details?.id;
    return `${m.property}_${mSenderId === userId ? mRecipientId : mSenderId}` === activeChat;
  })) {
    const [propId, otherId] = activeChat.split('_');
    chatsMap.set(activeChat, {
      chatId: activeChat,
      propertyId: propId,
      otherUserId: otherId,
      otherUser: { username: 'Пользователь ' + otherId }, // placeholder until first message
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
        propertyId,
        otherUser,
        otherUserId,
        messages: []
      });
    }
    chatsMap.get(chatId).messages.push(m);
  });

  const chats = Array.from(chatsMap.values());
  const activeChatData = activeChat ? chatsMap.get(activeChat) : null;

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChatData) return;
    try {
      await axios.post('http://127.0.0.1:8000/api/chats/', {
        recipient: activeChatData.otherUserId,
        property: activeChatData.propertyId,
        message_text: newMessage
      }, { headers: { Authorization: `Bearer ${token}` }});
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при отправке сообщения');
    }
  };

  return (
    <div className="container chat-container">
      <div className="card chat-sidebar">
        <h3 className="chat-sidebar-title">Диалоги</h3>
        {chats.length === 0 ? <p style={{ color: 'var(--text-light)' }}>У вас пока нет активных диалогов</p> : chats.map(c => (
          <div 
            key={c.chatId} 
            onClick={() => setActiveChat(c.chatId)}
            className={`chat-item ${activeChat === c.chatId ? 'active' : ''}`}
          >
            <div className="chat-item-name">{c.otherUser?.first_name || c.otherUser?.username}</div>
            <div className="chat-item-meta">Объект #{c.propertyId}</div>
          </div>
        ))}
      </div>
      
      <div className="card chat-main">
        {activeChatData ? (
          <>
            <div className="chat-header">
              Чат с {activeChatData.otherUser?.first_name || activeChatData.otherUser?.username} (Объект #{activeChatData.propertyId})
            </div>
            <div className="chat-messages">
              {activeChatData.messages.length === 0 && <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>Нет сообщений. Напишите первым!</p>}
              {activeChatData.messages.map((m: any) => {
                const isMine = m.sender_details?.id === userId;
                return (
                  <div key={m.id} className={`chat-message-container ${isMine ? 'mine' : 'theirs'}`}>
                    <div className="chat-message-bubble">
                      {m.message_text}
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
