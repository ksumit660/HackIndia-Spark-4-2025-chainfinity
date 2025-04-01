import React from 'react';
import { VideoBackground } from '../components/VideoBackground';
import { Search, FileText, Cloud, Database, Bot, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Services: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full">
      <VideoBackground />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          <header className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Our Services
            </h1>
            <p className="text-xl text-blue-200">
              Comprehensive Document Management Solutions
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="glass-effect rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6">
              Transform your document management experience with DocuAI
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="glass-effect px-8 py-3 rounded-lg text-lg button-3d bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 inline-flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}> = ({ icon, title, description, features }) => (
  <div className="glass-effect rounded-xl p-6 space-y-4">
    <div className="flex items-center gap-3">
      <div className="text-blue-400">{icon}</div>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
    <p className="text-gray-300">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const services = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Smart Search",
    description: "Advanced document search and retrieval powered by AI",
    features: [
      "Natural language search queries",
      "Content-based recommendations",
      "Real-time search results",
      "Multi-format support"
    ]
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Document Processing",
    description: "Automated document analysis and data extraction",
    features: [
    "Document classification",
      "Key information extraction",
      "Format conversion"
    ]
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Integration",
    description: "Seamless cloud storage and synchronization",
    features: [
      "Multi-cloud support",
      "Automatic backups",
      "Version control",
      "Secure sharing"
    ]
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Data Analytics",
    description: "In-depth document analytics and insights",
    features: [
      "Usage patterns",
      "Content analytics",
      "Performance metrics",
      "Custom reports"
    ]
  }
];
