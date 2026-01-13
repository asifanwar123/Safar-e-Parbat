import React from 'react';
import { Lock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminButton: React.FC = () => {
  return (
    <Link
      to="/admin"
      className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40 bg-gray-800 hover:bg-brand-600 text-white p-3 rounded-l-xl shadow-2xl transition-all duration-300 hover:pr-6 flex items-center gap-2 group border-y border-l border-white/20"
      title="Admin Portal"
    >
      <div className="relative">
        <Settings size={20} className="animate-spin-slow" />
        <Lock size={12} className="absolute -bottom-1 -right-1 bg-brand-500 rounded-full p-0.5" />
      </div>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold text-sm">
        Admin Portal
      </span>
    </Link>
  );
};

export default AdminButton;