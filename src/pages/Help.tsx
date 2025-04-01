import React, { useState } from 'react';
import { VideoBackground } from '../components/VideoBackground';
import { HelpCircle, Mail, MessageSquare, Phone, Plus, Minus } from 'lucide-react';

export const Help: React.FC = () => {
  return (
    <div className="min-h-screen w-full">
      <VideoBackground />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Help Center
            </h1>
            <p className="text-xl text-blue-200">
              Get the support you need
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            <ContactCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Live Chat"
              description="Chat with our support team"
              action="Start Chat"
            />
            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Support"
              description="support@docuai.com"
              action="Send Email"
            />
            <ContactCard
              icon={<Phone className="w-6 h-6" />}
              title="Phone"
              description="1-800-DOCUAI"
              action="Call Now"
            />
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FaqItem key={index} {...faq} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ContactCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}> = ({ icon, title, description, action }) => (
  <div className="glass-effect rounded-xl p-6 text-center">
    <div className="text-blue-400 mb-4">{icon}</div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
      {action}
    </button>
  </div>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-effect rounded-xl">
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-blue-400" />
        ) : (
          <Plus className="w-5 h-5 text-blue-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const faqs = [
  {
    question: "How do I get started with DocuAI?",
    answer: "Sign up for a free account, upload your first document, and start exploring our AI-powered features. Our quick start guide will walk you through the basics."
  },
  {
    question: "What file formats are supported?",
    answer: "We support PDF, DOCX, TXT, RTF, and most common document formats. Our AI can process text, tables, and even handwritten content."
  },
  {
    question: "Is my data secure?",
    answer: "Yes! We use enterprise-grade encryption and follow strict security protocols. Your documents are encrypted both in transit and at rest."
  },
  {
    question: "Can I integrate DocuAI with other tools?",
    answer: "Yes, we offer APIs and integrations with popular platforms like Google Drive, Dropbox, and Microsoft Office."
  }
];
