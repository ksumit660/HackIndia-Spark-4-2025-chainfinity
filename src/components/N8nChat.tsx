import React, { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

interface N8nChatProps {
  webhookUrl: string;
}

export const N8nChat: React.FC<N8nChatProps> = ({ webhookUrl }) => {
  useEffect(() => {
    createChat({
      webhookUrl,
      mode: 'inline',
      target: '#n8n-chat-container',
      showWelcomeScreen: false,
      initialMessages: [
        "📚 Hi! I'm your Document Intelligence Assistant. Ready to analyze your documents!"
      ],
      i18n: {
        en: {
          inputPlaceholder: 'Type your message here...',
          welcomeMessage: "📚 Hi! I'm your Document Intelligence Assistant. Ready to analyze your documents!"
        }
      },
      theme: {
        input: {
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#2d3748',
          '::placeholder': {
            color: '#4a5568',
            fontStyle: 'italic'
          }
        }
      },
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  }, [webhookUrl]);

  return <div id="n8n-chat-container" />;
};
