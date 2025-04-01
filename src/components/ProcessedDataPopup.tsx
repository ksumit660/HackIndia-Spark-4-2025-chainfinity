import React from 'react';
import { X, Download, Save } from 'lucide-react';

interface ProcessedDataPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const ProcessedDataPopup: React.FC<ProcessedDataPopupProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    // Convert data to PDF format and download
    // You might want to use a library like jsPDF here
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'processed-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveData = () => {
    // Save data to local storage or your backend
    localStorage.setItem('processedData', JSON.stringify(data));
    alert('Data saved successfully!');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[80vh] m-4 p-6 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Processing Results</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleDownloadPDF}
                className="p-2 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2 text-white"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
              <button 
                onClick={handleSaveData}
                className="p-2 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2 text-white"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm">Save</span>
              </button>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[60vh] space-y-4">
            <div className="rounded-lg bg-white/5 p-4 border border-white/10">
              <pre className="text-sm text-white/90 whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
