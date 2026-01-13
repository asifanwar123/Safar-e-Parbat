
import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Clock, Star, Loader2, AlertCircle, ArrowDown } from 'lucide-react';
import { CONTENT, JSONBIN_BIN_ID } from '../constants';
import { Language, Comment } from '../types';
import { useData } from '../context/DataContext';

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
  
  // Use Context
  const { comments, addComment } = useData();
  
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const prevCommentsLength = useRef(comments.length);
  const commentsListRef = useRef<HTMLDivElement>(null);

  // Check for new comments (polling handled by Context, we just react to prop change)
  useEffect(() => {
    if (comments.length > prevCommentsLength.current && prevCommentsLength.current !== 0) {
        setShowNotification(true);
    }
    prevCommentsLength.current = comments.length;
  }, [comments]);

  const handleScrollToComments = () => {
    commentsListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setShowNotification(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setIsSubmitting(true);

    const newComment: Comment = {
      id: Date.now(),
      name: name,
      text: text,
      date: new Date().toLocaleDateString(),
      avatarColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      rating: rating
    };

    await addComment(newComment);
    
    setName('');
    setText('');
    setRating(5);
    setIsSubmitting(false);
  };

  // Cast to string to prevent TS error about comparison with literal type
  const isConfigured = (JSONBIN_BIN_ID as string) !== "REPLACE_WITH_YOUR_BIN_ID";

  return (
    <section className="py-12 md:py-20 bg-white relative">
      {/* New Comments Notification */}
      {showNotification && (
        <button 
            onClick={handleScrollToComments}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-brand-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce hover:bg-brand-700 transition-colors cursor-pointer border-2 border-white ring-2 ring-brand-200"
        >
            <MessageSquare size={20} fill="currentColor" className="text-white" />
            <span className="font-bold whitespace-nowrap">New Comments</span>
            <ArrowDown size={20} />
        </button>
      )}

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
                
                {!isConfigured && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-xs">
                    <p className="font-bold flex items-center gap-1"><AlertCircle size={14}/> Setup Required</p>
                    <p>Go to Admin Portal &gt; Settings to create your Bin ID.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            placeholder={t.namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition disabled:opacity-50 ${isUrdu ? 'text-right font-urdu' : ''}`}
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
                                    disabled={isSubmitting}
                                    className="focus:outline-none transition-transform hover:scale-110 disabled:cursor-not-allowed"
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
                            disabled={isSubmitting}
                            className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition resize-none disabled:opacity-50 ${isUrdu ? 'text-right font-urdu' : ''}`}
                            required
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full bg-brand-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-brand-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                    >
                        {isSubmitting ? (
                          <>Processing...</>
                        ) : (
                          <>
                            {t.submitBtn}
                            <Send size={18} />
                          </>
                        )}
                    </button>
                </form>
            </div>

            {/* Comments List */}
            <div className="lg:col-span-2" ref={commentsListRef}>
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
