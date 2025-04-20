import React, {useEffect, useState, useRef} from 'react';
import '../style/model.css'
import { useNavigate } from 'react-router-dom';

const Grok = () => {
     const [messages, setMessages] = useState([]);
      const [inputMessage, setInputMessage] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [chatHistory, setChatHistory] = useState([]);
      const [chats, setChats] = useState([])
      const [allchats, setAllchats] = useState([])
    
      const messagesEndRef = useRef(null);
    
      const rout = useNavigate()
    
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;
    
        try {
          // Добавляем сообщение пользователя
          const userMessage = {
            content: inputMessage,
            isUser: true
          };
          
          setMessages(prev => [...prev, userMessage]);
          setInputMessage('');
          setIsLoading(true);
    
          const res = await fetch('http://127.0.0.1:5000/api/grok', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({msg: inputMessage})
          })
    
          const response = await res.json()
    
          // Обрабатываем ответ
          const aiMessage = {
            content: response['data'] || 'Не удалось получить ответ',
            isUser: false
          };
    
          setMessages(prev => [...prev, aiMessage]);
    
          if(messages.length === 0) {
            setChatHistory(prev => [...prev, {
              id: Date.now(),
              title: inputMessage.substring(0, 20) + '...'
            }]);
          }
          setChats(prev => [...prev, {
            id: chatHistory.id,
            user: userMessage,
            ai: aiMessage
          }])
        } catch (error) {
          console.error('Ошибка запроса:', error);
          
          const errorMessage = {
            content: error.response?.data?.message 
              || error.message 
              || 'Произошла ошибка',
            isUser: false
          };
          
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
        }
      }
    
      const handleBack = () => {
        rout(-1)
        setMessages([]);
      };
    
      return (
        <div className="app-container">
          <div className="sidebar">
            <div className="sidebar-header">
              <button className="new-chat-btn">+ Новый чат</button>
            </div>
            <div className="chat-history">
              {chatHistory.map(chat => (
                <div key={chat.id} className="chat-item">
                  <span>🗨</span>
                  <p>{chat.title}</p>
                </div>
              ))}
            </div>
          </div>
    
          <div className="main-chat">
            <div className="chat-header">
              <button onClick={handleBack} className="back-btn">
                ← Назад
              </button>
              <h1>Grok</h1>
            </div>
    
            <div className="messages-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.isUser ? 'user' : 'ai'}`}
                >
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message ai loading">
                  <div className="message-content">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
    
            <form onSubmit={handleSubmit} className="input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Введите сообщение..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>
                ⚡
              </button>
            </form>
          </div>
        </div>
    );
};

export default Grok;