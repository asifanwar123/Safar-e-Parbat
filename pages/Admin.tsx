
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { JSONBIN_BIN_ID, JSONBIN_API_KEY, GALLERY_IMAGES } from '../constants';
import { Trash2, Plus, Edit2, Lock, Save, X, Image as ImageIcon, Users } from 'lucide-react';
import { TourPackage, TravelHistoryItem, Comment } from '../types';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'comments' | 'packages' | 'history'>('comments');
  const { packages, deletePackage, addPackage, history, addHistory, deleteHistory } = useData();

  // Comments State (fetched separately here to allow delete)
  const [adminComments, setAdminComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Forms State
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  
  // New Package State
  const [newPkg, setNewPkg] = useState<Partial<TourPackage>>({
    image: GALLERY_IMAGES[0],
    rating: 5,
    inclusionsEn: [],
    inclusionsUr: [],
    itineraryEn: [],
    itineraryUr: []
  });

  // New History State
  const [newHistory, setNewHistory] = useState<Partial<TravelHistoryItem>>({
      images: [GALLERY_IMAGES[0]],
      visitors: []
  });
  const [visitorInput, setVisitorInput] = useState({ name: '', details: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password
      setIsAuthenticated(true);
      fetchComments();
    } else {
      alert('Invalid Password');
    }
  };

  // --- COMMENTS LOGIC ---
  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
          headers: { 'X-Master-Key': JSONBIN_API_KEY }
      });
      const data = await response.json();
      setAdminComments(Array.isArray(data.record) ? data.record : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!window.confirm("Are you sure?")) return;
    const updated = adminComments.filter(c => c.id !== id);
    setAdminComments(updated);
    // Sync to Cloud
    await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY
      },
      body: JSON.stringify(updated)
    });
  };

  // --- PACKAGES LOGIC ---
  const handleAddPackage = (e: React.FormEvent) => {
      e.preventDefault();
      const pkg: TourPackage = {
          id: Date.now().toString(),
          titleEn: newPkg.titleEn || 'New Package',
          titleUr: newPkg.titleUr || 'نیا پیکیج',
          locationEn: newPkg.locationEn || '',
          locationUr: newPkg.locationUr || '',
          price: newPkg.price || '',
          durationEn: newPkg.durationEn || '',
          durationUr: newPkg.durationUr || '',
          image: newPkg.image || '',
          rating: 5,
          descriptionEn: newPkg.descriptionEn || '',
          descriptionUr: newPkg.descriptionUr || '',
          itineraryEn: (newPkg.itineraryEn as any)?.split('\n') || [],
          itineraryUr: (newPkg.itineraryUr as any)?.split('\n') || [],
          inclusionsEn: (newPkg.inclusionsEn as any)?.split('\n') || [],
          inclusionsUr: (newPkg.inclusionsUr as any)?.split('\n') || [],
          dates: newPkg.dates || ''
      };
      addPackage(pkg);
      setShowPackageForm(false);
      setNewPkg({});
  };

  // --- HISTORY LOGIC ---
  const handleAddVisitor = () => {
      if(visitorInput.name) {
          setNewHistory(prev => ({
              ...prev,
              visitors: [...(prev.visitors || []), { ...visitorInput }]
          }));
          setVisitorInput({ name: '', details: '' });
      }
  };

  const handleAddHistory = (e: React.FormEvent) => {
      e.preventDefault();
      const item: TravelHistoryItem = {
          id: Date.now().toString(),
          title: newHistory.title || '',
          date: newHistory.date || '',
          location: newHistory.location || '',
          description: newHistory.description || '',
          images: newHistory.images || [],
          visitors: newHistory.visitors || []
      };
      addHistory(item);
      setShowHistoryForm(false);
      setNewHistory({ images: [GALLERY_IMAGES[0]], visitors: [] });
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-100 p-4 rounded-full">
              <Lock className="text-brand-600" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Portal</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:ring-2 focus:ring-brand-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={() => setIsAuthenticated(false)} className="text-red-600 font-bold hover:underline">Logout</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {['comments', 'packages', 'history'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2 rounded-full font-bold capitalize whitespace-nowrap transition ${activeTab === tab ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                    {tab === 'history' ? 'Travel History' : tab}
                </button>
            ))}
        </div>

        {/* --- COMMENTS TAB --- */}
        {activeTab === 'comments' && (
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-bold">Manage Comments</h2>
                    <button onClick={fetchComments} className="text-brand-600 text-sm font-bold">Refresh</button>
                </div>
                {loadingComments ? <p>Loading...</p> : (
                    <div className="space-y-4">
                        {adminComments.map(c => (
                            <div key={c.id} className="border p-4 rounded-lg flex justify-between items-start hover:bg-gray-50">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold">{c.name}</span>
                                        <span className="text-xs text-gray-400">{c.date}</span>
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 rounded-full">★ {c.rating}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{c.text}</p>
                                </div>
                                <button onClick={() => handleDeleteComment(c.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {/* --- PACKAGES TAB --- */}
        {activeTab === 'packages' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Current Packages</h2>
                    <button onClick={() => setShowPackageForm(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-brand-700">
                        <Plus size={18} /> Add Package
                    </button>
                </div>

                {showPackageForm && (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-brand-100">
                        <h3 className="font-bold text-lg mb-4">Add New Package</h3>
                        <form onSubmit={handleAddPackage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required placeholder="Title (English)" className="border p-2 rounded" value={newPkg.titleEn} onChange={e => setNewPkg({...newPkg, titleEn: e.target.value})} />
                            <input required placeholder="Title (Urdu)" className="border p-2 rounded text-right" value={newPkg.titleUr} onChange={e => setNewPkg({...newPkg, titleUr: e.target.value})} />
                            
                            <input required placeholder="Location (English)" className="border p-2 rounded" value={newPkg.locationEn} onChange={e => setNewPkg({...newPkg, locationEn: e.target.value})} />
                            <input required placeholder="Location (Urdu)" className="border p-2 rounded text-right" value={newPkg.locationUr} onChange={e => setNewPkg({...newPkg, locationUr: e.target.value})} />
                            
                            <input required placeholder="Price (e.g., PKR 50,000)" className="border p-2 rounded" value={newPkg.price} onChange={e => setNewPkg({...newPkg, price: e.target.value})} />
                            <input required placeholder="Duration (e.g., 5 Days)" className="border p-2 rounded" value={newPkg.durationEn} onChange={e => setNewPkg({...newPkg, durationEn: e.target.value})} />
                            <input required placeholder="Duration Urdu" className="border p-2 rounded text-right" value={newPkg.durationUr} onChange={e => setNewPkg({...newPkg, durationUr: e.target.value})} />
                            
                            <input placeholder="Date/Availability (e.g. Every Monday)" className="border p-2 rounded" value={newPkg.dates} onChange={e => setNewPkg({...newPkg, dates: e.target.value})} />
                            
                            <div className="md:col-span-2">
                                <input required placeholder="Image URL" className="border p-2 rounded w-full" value={newPkg.image} onChange={e => setNewPkg({...newPkg, image: e.target.value})} />
                                <p className="text-xs text-gray-400 mt-1">Paste a URL from the web.</p>
                            </div>

                            <textarea required placeholder="Description (English)" className="border p-2 rounded md:col-span-2" rows={3} value={newPkg.descriptionEn} onChange={e => setNewPkg({...newPkg, descriptionEn: e.target.value})} />
                            <textarea required placeholder="Description (Urdu)" className="border p-2 rounded md:col-span-2 text-right" rows={3} value={newPkg.descriptionUr} onChange={e => setNewPkg({...newPkg, descriptionUr: e.target.value})} />

                            <textarea placeholder="Itinerary (One item per line)" className="border p-2 rounded md:col-span-2" rows={4} onChange={e => setNewPkg({...newPkg, itineraryEn: e.target.value as any})} />
                            <textarea placeholder="Inclusions (One item per line)" className="border p-2 rounded md:col-span-2" rows={4} onChange={e => setNewPkg({...newPkg, inclusionsEn: e.target.value as any})} />

                            <div className="md:col-span-2 flex gap-2 justify-end">
                                <button type="button" onClick={() => setShowPackageForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold">Save Package</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map(pkg => (
                        <div key={pkg.id} className="bg-white border rounded-xl overflow-hidden shadow-sm relative group">
                            <img src={pkg.image} className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold">{pkg.titleEn}</h3>
                                <p className="text-sm text-gray-500">{pkg.price} • {pkg.durationEn}</p>
                                <p className="text-xs text-brand-600 font-bold mt-1">{pkg.dates}</p>
                            </div>
                            <button onClick={() => {if(window.confirm('Delete?')) deletePackage(pkg.id)}} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- HISTORY TAB --- */}
        {activeTab === 'history' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Travel History</h2>
                    <button onClick={() => setShowHistoryForm(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-brand-700">
                        <Plus size={18} /> Add History
                    </button>
                </div>

                {showHistoryForm && (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-brand-100">
                        <h3 className="font-bold text-lg mb-4">Add Travel Event</h3>
                        <form onSubmit={handleAddHistory} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required placeholder="Trip Title (e.g., Winter Tour 2024)" className="border p-2 rounded" value={newHistory.title} onChange={e => setNewHistory({...newHistory, title: e.target.value})} />
                                <input required placeholder="Date (e.g., Dec 2023)" className="border p-2 rounded" value={newHistory.date} onChange={e => setNewHistory({...newHistory, date: e.target.value})} />
                                <input required placeholder="Location" className="border p-2 rounded" value={newHistory.location} onChange={e => setNewHistory({...newHistory, location: e.target.value})} />
                                <input required placeholder="Main Image URL" className="border p-2 rounded" value={newHistory.images?.[0]} onChange={e => setNewHistory({...newHistory, images: [e.target.value]})} />
                            </div>
                            <textarea required placeholder="Description of the trip..." className="border p-2 rounded w-full" rows={3} value={newHistory.description} onChange={e => setNewHistory({...newHistory, description: e.target.value})} />
                            
                            {/* Visitor Adder */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-bold text-sm mb-2">Add Visitors</h4>
                                <div className="flex gap-2 mb-2">
                                    <input placeholder="Visitor Name" className="border p-2 rounded flex-1" value={visitorInput.name} onChange={e => setVisitorInput({...visitorInput, name: e.target.value})} />
                                    <input placeholder="Details (e.g. City)" className="border p-2 rounded flex-1" value={visitorInput.details} onChange={e => setVisitorInput({...visitorInput, details: e.target.value})} />
                                    <button type="button" onClick={handleAddVisitor} className="bg-black text-white px-4 rounded font-bold">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {newHistory.visitors?.map((v, idx) => (
                                        <span key={idx} className="bg-white border px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                            {v.name} <span className="text-gray-400">({v.details})</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setShowHistoryForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold">Save History</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="space-y-4">
                    {history.map(item => (
                        <div key={item.id} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 relative group">
                             <img src={item.images[0]} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                             <div className="flex-grow">
                                 <div className="flex justify-between items-start">
                                     <h3 className="font-bold text-xl">{item.title}</h3>
                                     <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{item.date}</span>
                                 </div>
                                 <p className="text-brand-600 text-sm mb-2">{item.location}</p>
                                 <p className="text-gray-600 mb-4">{item.description}</p>
                                 <div className="flex items-center gap-2 text-sm text-gray-500">
                                     <Users size={16} /> {item.visitors.length} Visitors
                                 </div>
                             </div>
                             <button onClick={() => {if(window.confirm('Delete?')) deleteHistory(item.id)}} className="absolute top-4 right-4 bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition">
                                <Trash2 size={20} />
                             </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
