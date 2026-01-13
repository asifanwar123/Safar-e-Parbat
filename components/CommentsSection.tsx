import React, { useState, useEffect } from 'react';
import { User, Send, MessageSquare, Clock, Star } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
  avatarColor: string;
  rating: number;
}

interface CommentsSectionProps {
  lang: Language;
}

const COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 
  'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 
  'bg-indigo-500', 'bg-teal-500'
];

const CommentsSection: React.FC<CommentsSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].commentsSection;
  const isUrdu = lang === 'ur';
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Load comments from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('safareparbat_comments');
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
        // Initial dummy data
        const initialComments = [
            { 
              id: 1, 
              name: 'Fatima Zahra', 
              text: 'Visited Hunza last summer with Safar-e-Parbat. The guides were extremely helpful!', 
              date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
              avatarColor: 'bg-pink-500',
              rating: 5
            },
            { 
              id: 2, 
              name: 'Michael Chen', 
              text: 'The Skardu trip was a dream come true. Highly recommended service.', 
              date: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
              avatarColor: 'bg-blue-500',
              rating: 4
            }
        ];
        setComments(initialComments);
        localStorage.setItem('safareparbat_comments', JSON.stringify(initialComments));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: name,
      text: text,
      date: new Date().toLocaleDateString(),
      avatarColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      rating: rating
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('safareparbat_comments', JSON.stringify(updatedComments));
    
    setName('');
    setText('');
    setRating(5);
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-brand-900 mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.title}
            </h2>
            <p className={`text-gray-500 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Comment Form */}
            <div className={`lg:col-span-1 bg-brand-50 p-6 md:p-8 rounded-2xl shadow-lg border border-brand-100 h-fit ${isUrdu ? 'lg:order-last' : ''}`}>
                <h3 className={`text-xl font-bold text-brand-800 mb-6 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                    <MessageSquare className="text-brand-500" />
                    {t.submitBtn}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            placeholder={t.namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition ${isUrdu ? 'text-right font-urdu' : ''}`}
                            required
                        />
                    </div>
                    
                    {/* Star Rating Input */}
                    <div className={`flex flex-col gap-2 ${isUrdu ? 'items-end' : 'items-start'}`}>
                        <span className={`text-sm text-gray-500 font-medium ${isUrdu ? 'font-urdu' : ''}`}>
                            {isUrdu ? 'درجہ بندی:' : 'Rating:'}
                        </span>
                        <div className={`flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star 
                                        size={24} 
                                        className={`${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <textarea 
                            rows={4}
                            placeholder={t.commentPlaceholder}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition resize-none ${isUrdu ? 'text-right font-urdu' : ''}`}
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full bg-brand-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-brand-700 transition flex items-center justify-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                    >
                        {t.submitBtn}
                        <Send size={18} />
                    </button>
                </form>
            </div>

            {/* Comments List */}
            <div className="lg:col-span-2">
                <div className={`flex items-center justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-xl font-bold text-gray-800 ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.recentComments} <span className="text-gray-400 font-normal text-base ml-2">({comments.length})</span>
                    </h3>
                </div>

                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                                <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${comment.avatarColor} text-white flex items-center justify-center font-bold text-lg shadow-sm`}>
                                    {comment.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-grow">
                                    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2 ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
                                        <div className="flex flex-col md:flex-row gap-2 items-baseline">
                                            <h4 className="font-bold text-gray-900 text-lg">{comment.name}</h4>
                                            {/* Display Stars in List */}
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={12} 
                                                        className={i < (comment.rating || 5) ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <span className={`text-xs text-gray-400 flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                            <Clock size={12} />
                                            {comment.date}
                                        </span>
                                    </div>
                                    <p className={`text-gray-600 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {comments.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            <p>No comments yet. Be the first to share your story!</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </section>
  );
};

export default CommentsSection;