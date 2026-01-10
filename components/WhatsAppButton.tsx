import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/923334737025" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} strokeWidth={2.5} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
        Chat with us
      </span>
      {/* Pulse effect ring */}
      <span className="absolute -inset-1 rounded-full border-2 border-green-500 opacity-75 animate-ping pointer-events-none"></span>
    </a>
  );
};

export default WhatsAppButton;