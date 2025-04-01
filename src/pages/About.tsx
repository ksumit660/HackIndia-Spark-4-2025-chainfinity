import React from 'react';
import { VideoBackground } from '../components/VideoBackground';
import { Bot, FileText, Brain, Lock, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen w-full">
      <VideoBackground />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              About DocuAI
            </h1>
            <p className="text-xl text-blue-200">Transforming Document Intelligence</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="text-blue-400 w-6 h-6" />
                <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300">
                To revolutionize document management by leveraging cutting-edge AI technology,
                making information retrieval and analysis effortless and intelligent.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-blue-400 w-6 h-6" />
                <h2 className="text-2xl font-semibold text-white">Technology</h2>
              </div>
              <p className="text-gray-300">
                Powered by advanced machine learning algorithms and natural language processing,
                delivering state-of-the-art document understanding capabilities.
              </p>
            </div>
          </div>

          <section className="glass-effect rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Zap className="text-blue-400" />
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<FileText />}
                title="Smart Processing"
                description="AI-powered document analysis and understanding"
              />
              <FeatureCard 
                icon={<Brain />}
                title="Intelligent Insights"
                description="Advanced data extraction and summarization"
              />
              <FeatureCard 
                icon={<Lock />}
                title="Secure & Private"
                description="Enterprise-grade security for your documents"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="text-blue-400 mb-2">{icon}</div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);
