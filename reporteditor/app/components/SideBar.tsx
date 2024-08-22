'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSidebar } from '../context/SidebarContext';

const SideBar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I assist you today?' }]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user'); // Assuming user info is stored in local storage
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      setInput('');
      
      // Placeholder for bot response logic
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'This is a placeholder response.' }]);
      }, 500);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      {isSidebarOpen && (
        <motion.div 
          className="fixed top-32 right-0 h-full bg-white shadow-lg p-4 z-40"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <button
            onClick={toggleSidebar}
            className="text-red-500 absolute top-4 right-4"
          >
            Close
          </button>
          <div className="mt-10 space-y-4 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded">
              {messages.map((message, index) => (
                <div key={index} className={`my-2 p-2 rounded ${message.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-200'}`}>
                  <p className={`text-sm ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>{message.text}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="flex-1 p-2 border border-gray-300 rounded-l"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-black rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SideBar;
