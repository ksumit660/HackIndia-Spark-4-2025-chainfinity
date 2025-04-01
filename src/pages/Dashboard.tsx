/**
 * Dashboard Page Component
 * Main interface for authenticated users
 * Features:
 * - Welcome header with user info
 * - Document search interface
 * - File upload capability
 * - Animated background effects
 */
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase';
import { Send, Upload, HardDrive, Cloud, Download, Terminal } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { VideoBackground } from '../components/VideoBackground';
import { N8nChat } from '../components/N8nChat';
import { loadGoogleDriveAPI, pickFile } from '../utils/googleDrive';
import { processDocumentWithN8n } from '../utils/n8nProcessing';
import { ProcessedDataPopup } from '../components/ProcessedDataPopup';

// Animation configuration
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const PROCESSING_COMMANDS = {
  'summarize': {
    description: 'Generate a concise summary',
    method: 'summarize',
    params: { maxLength: 500 }
  },
  'extract': {
    description: 'Extract text and structure',
    method: 'extract-text',
    params: {}
  },
  'analyze': {
    description: 'Deep content analysis',
    method: 'analyze',
    params: {}
  },
  'translate': {
    description: 'Translate content',
    method: 'translate',
    params: { language: 'es' }
  },
  'qa': {
    description: 'Ask questions about the document',
    method: 'qa',
    params: { question: '' }
  }
} as const;

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export const Dashboard: React.FC = () => {
  /**
   * Component state and refs
   */
  const user = auth.currentUser;
  const videoRef = useRef<HTMLVideoElement>(null);
  const color = useMotionValue(COLORS_TOP[0]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingCommand, setProcessingCommand] = useState('');
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processResult, setProcessResult] = useState<any>(null);
  const [processingMethod, setProcessingMethod] = useState<keyof typeof PROCESSING_COMMANDS>('summarize');
  const [questionInput, setQuestionInput] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Update the webhook URL for document processing
  const N8N_DOCUMENT_WEBHOOK = "https://shubhrajgupta.app.n8n.cloud/webhook/document-processor";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Setup color animation
   */
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  /**
   * Configure video playback
   */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3; // Slows the video to half speed
    }
  }, []);

  useEffect(() => {
    loadGoogleDriveAPI()
      .then(() => setIsGoogleReady(true))
      .catch(console.error);
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    try {
      setShowHeader(false);
      setMessages(prev => [...prev, { text: inputText, isUser: true }]);
      setInputText('');
      setIsTyping(true);

      // TODO: Add your new chatbot model integration here
      // Placeholder response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "This is a placeholder response. Add your chatbot integration here.", 
          isUser: false 
        }]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting. Please try again.", 
        isUser: false 
      }]);
      setIsTyping(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setShowProcessing(true); // Show processing section after file upload
    // For now, just log the file and store it locally
    console.log('Selected file:', file);
    // You can also create a local URL to preview the file
    const fileUrl = URL.createObjectURL(file);
    console.log('File URL:', fileUrl);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleProcessCommand = async () => {
    if (!selectedFile) return;
    
    try {
      setIsProcessing(true);
      const command = PROCESSING_COMMANDS[processingMethod];
      let params = { ...command.params };
      
      if (processingMethod === 'qa' && questionInput) {
        params.question = questionInput;
      }
  
      const result = await processDocumentWithN8n(
        selectedFile,
        command.method,
        N8N_DOCUMENT_WEBHOOK,
        params
      );
  
      // Set the result and open popup immediately
      setProcessResult(result);
      setIsPopupOpen(true);
      
    } catch (error) {
      console.error('Processing Error:', error);
      alert('Processing failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleDriveClick = async () => {
    if (!isGoogleReady) {
      alert('Google Drive API is still loading. Please wait.');
      return;
    }

    try {
      const result = await pickFile();
      if (result) {
        // Create a File object from the blob
        const driveFile = new File(
          [result.blob], 
          result.name, 
          { type: result.mimeType }
        );
        handleFileSelect(driveFile);
      }
    } catch (error) {
      console.error('Google Drive Error:', error);
      alert('Failed to load file from Google Drive. Please try again.');
    }
  };

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <VideoBackground />
      <div className="w-full max-w-7xl flex flex-col flex-1 relative z-10">
        <header className="flex items-center py-8 px-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome, {user?.displayName || user?.email?.split('@')[0]}
          </h1>
        </header>

        <main className="flex-1 flex flex-col items-center justify-between gap-8 px-4">
          {showHeader && (
            <div className="w-full max-w-2xl space-y-7">
              <div className="text-left space-y-12">
                <div>
                  <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-3d">
                    DocuAI.com
                  </h1>
                  <p className="text-2xl font-medium text-blue-200">
                    Smart Document Search & Retrieval
                  </p>
                </div>

                {/* New Upload Section with increased spacing */}
                <div className="mt-12 p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
                  <h2 className="text-xl font-semibold text-white mb-4">Upload Documents</h2>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-4 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10 flex flex-col items-center gap-2"
                    >
                      <HardDrive className="w-6 h-6 text-blue-400" />
                      <span className="text-sm text-white">Computer</span>
                    </button>
                    <button 
                      onClick={handleGoogleDriveClick}
                      className="p-4 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10 flex flex-col items-center gap-2"
                      disabled={!isGoogleReady}
                    >
                      <Cloud className={`w-6 h-6 ${isGoogleReady ? 'text-blue-400' : 'text-gray-400'}`} />
                      <span className="text-sm text-white">Google Drive</span>
                    </button>
                    <div 
                      className={`p-4 rounded-lg backdrop-blur-sm ${isDragging ? 'bg-white/20' : 'bg-white/5'} hover:bg-white/10 transition-all border border-white/10 border-dashed flex flex-col items-center gap-2`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-6 h-6 text-blue-400" />
                      <span className="text-sm text-white">Drag & Drop</span>
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-4 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10 flex flex-col items-center gap-2"
                    >
                      <Download className="w-6 h-6 text-blue-400" />
                      <span className="text-sm text-white">URL Import</span>
                    </button>
                  </div>
                  {selectedFile && (
                    <>
                      <p className="mt-4 text-sm text-white">
                        Selected file: {selectedFile.name}
                      </p>
                      
                      {showProcessing && (
                        <div className="mt-6 space-y-4">
                          <div className="flex flex-col gap-4">
                            <select
                              value={processingMethod}
                              onChange={(e) => setProcessingMethod(e.target.value as keyof typeof PROCESSING_COMMANDS)}
                              className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white"
                            >
                              {Object.entries(PROCESSING_COMMANDS).map(([key, value]) => (
                                <option key={key} value={key} className="bg-gray-800">
                                  {value.description}
                                </option>
                              ))}
                            </select>

                            {processingMethod === 'qa' && (
                              <input
                                type="text"
                                value={questionInput}
                                onChange={(e) => setQuestionInput(e.target.value)}
                                placeholder="Enter your question about the document"
                                className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white"
                              />
                            )}

                            <button
                              onClick={handleProcessCommand}
                              disabled={isProcessing}
                              className={`px-4 py-2 rounded-md ${
                                isProcessing 
                                  ? 'bg-gray-500 cursor-not-allowed' 
                                  : 'bg-blue-500 hover:bg-blue-600'
                              } transition-colors text-white text-sm`}
                            >
                              {isProcessing ? 'Processing...' : 'Process'}
                            </button>
                          </div>
                          <p className="text-xs text-white/60">
                            Available commands: summarize, extract tables, analyze, find keywords
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  <p className="mt-4 text-xs text-white/60 text-center">
                    Supported formats: PDF, DOCX, TXT, CSV (Max size: 10MB)
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="w-full max-w-2xl flex-1">
            <N8nChat webhookUrl="https://shubhrajgupta.app.n8n.cloud/webhook/5b248f88-f77d-46b8-913d-185bdccb2f69/chat" />
          </div>
        </main>
      </div>
      <ProcessedDataPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={processResult}
      />
    </div>
  );
};
