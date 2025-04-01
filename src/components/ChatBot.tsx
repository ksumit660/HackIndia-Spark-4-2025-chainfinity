import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ChatBotProps {
  onClose: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message. Our support team will respond shortly.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] glass-effect rounded-xl flex flex-col overflow-hidden z-50">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
        <h3 className="text-white font-semibold">DocuAI Support</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`${
              msg.isBot 
                ? 'bg-white/10 text-white' 
                : 'bg-blue-500 text-white'
              } rounded-lg px-4 py-2 max-w-[80%]`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
