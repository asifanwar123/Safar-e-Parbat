
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { JSONBIN_API_KEY, JSONBIN_BIN_ID, GALLERY_IMAGES, PACKAGES, INITIAL_HISTORY } from '../constants';
import { Trash2, Plus, Lock, X, Users, Settings, Database, Copy, Check, Save, Edit, Globe, Clock, Smartphone, MapPin, Activity, RefreshCw, Cloud, HardDrive } from 'lucide-react';
import { TourPackage, TravelHistoryItem, CloudData } from '../types';

const Admin: React.FC = () => {
  // Initialize auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('admin_session') === 'true';
  });
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'comments' | 'packages' | 'history' | 'visitors' | 'settings'>('comments');
  
  // Use Context Data
  const { packages, deletePackage, addPackage, updatePackage, history, addHistory, updateHistory, deleteHistory, comments, deleteComment, visitorLogs, refreshData, saveStatus, isLoading } = useData();

  // Forms State
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  
  // Editing State
  const [editPkgId, setEditPkgId] = useState<string | null>(null);
  const [editHistoryId, setEditHistoryId] = useState<string | null>(null);

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

  // Settings State
  const [apiKey, setApiKey] = useState(JSONBIN_API_KEY);
  const [generatedBinId, setGeneratedBinId] = useState('');
  const [isCreatingBin, setIsCreatingBin] = useState(false);

  // Statistics Calculation
  const last24hLogs = visitorLogs.filter(log => {
      const logTime = parseInt(log.id);
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      return logTime > oneDayAgo;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'true');
    } else {
      alert('Invalid Password');
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('admin_session');
  };

  // --- SETTINGS LOGIC ---
  const handleCreateBin = async () => {
    if(!apiKey || apiKey === "REPLACE_WITH_YOUR_API_KEY") {
        alert("Please enter a valid Jsonbin API Key first.");
        return;
    }

    setIsCreatingBin(true);
    
    // Initial Data Payload
    const initialData: CloudData = {
        packages: PACKAGES,
        history: INITIAL_HISTORY,
        comments: [],
        visitorLogs: []
    };

    try {
        const response = await fetch('https://api.jsonbin.io/v3/b', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey,
                'X-Bin-Name': 'Safar-e-Parbat DB'
            },
            body: JSON.stringify(initialData)
        });

        if(response.ok) {
            const data = await response.json();
            setGeneratedBinId(data.metadata.id);
        } else {
            alert("Failed to create bin. Check API Key.");
        }
    } catch(err) {
        console.error(err);
        alert("Error connecting to Jsonbin.");
    } finally {
        setIsCreatingBin(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // --- PACKAGES LOGIC ---
  const handleSavePackage = async (e: React.FormEvent) => {
      e.preventDefault();
      const pkg: TourPackage = {
          id: editPkgId || Date.now().toString(),
          titleEn: newPkg.titleEn || 'New Package',
          titleUr: newPkg.titleUr || 'نیا پیکیج',
          locationEn: newPkg.locationEn || '',
          locationUr: newPkg.locationUr || '',
          price: newPkg.price || '',
          durationEn: newPkg.durationEn || '',
          durationUr: newPkg.durationUr || '',
          image: newPkg.image || '',
          rating: newPkg.rating || 5,
          descriptionEn: newPkg.descriptionEn || '',
          descriptionUr: newPkg.descriptionUr || '',
          itineraryEn: typeof newPkg.itineraryEn === 'string' ? (newPkg.itineraryEn as string).split('\n') : (newPkg.itineraryEn || []),
          itineraryUr: typeof newPkg.itineraryUr === 'string' ? (newPkg.itineraryUr as string).split('\n') : (newPkg.itineraryUr || []),
          inclusionsEn: typeof newPkg.inclusionsEn === 'string' ? (newPkg.inclusionsEn as string).split('\n') : (newPkg.inclusionsEn || []),
          inclusionsUr: typeof newPkg.inclusionsUr === 'string' ? (newPkg.inclusionsUr as string).split('\n') : (newPkg.inclusionsUr || []),
          dates: newPkg.dates || ''
      };

      if (editPkgId) {
          await updatePackage(pkg);
      } else {
          await addPackage(pkg);
      }
      
      closePackageForm();
  };

  const startEditPackage = (pkg: TourPackage) => {
      setEditPkgId(pkg.id);
      setNewPkg({
          ...pkg,
          itineraryEn: pkg.itineraryEn.join('\n') as any,
          itineraryUr: pkg.itineraryUr.join('\n') as any,
          inclusionsEn: pkg.inclusionsEn.join('\n') as any,
          inclusionsUr: pkg.inclusionsUr.join('\n') as any,
      });
      setShowPackageForm(true);
  };

  const closePackageForm = () => {
      setShowPackageForm(false);
      setEditPkgId(null);
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

  const removeVisitor = (index: number) => {
      setNewHistory(prev => ({
          ...prev,
          visitors: prev.visitors?.filter((_, i) => i !== index)
      }));
  };

  const handleSaveHistory = async (e: React.FormEvent) => {
      e.preventDefault();
      const item: TravelHistoryItem = {
          id: editHistoryId || Date.now().toString(),
          title: newHistory.title || '',
          date: newHistory.date || '',
          location: newHistory.location || '',
          description: newHistory.description || '',
          images: newHistory.images || [],
          visitors: newHistory.visitors || []
      };

      if (editHistoryId) {
          await updateHistory(item);
      } else {
          await addHistory(item);
      }
      
      closeHistoryForm();
  };

  const startEditHistory = (item: TravelHistoryItem) => {
      setEditHistoryId(item.id);
      setNewHistory(item);
      setShowHistoryForm(true);
  };

  const closeHistoryForm = () => {
      setShowHistoryForm(false);
      setEditHistoryId(null);
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

  // Get status icon and color
  const getStatusDisplay = () => {
      switch(saveStatus) {
          case 'saving': return <span className="text-yellow-600 flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100"><RefreshCw size={14} className="animate-spin" /> Saving...</span>;
          case 'saved': return <span className="text-green-600 flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full border border-green-100"><Check size={14} /> Saved (Cloud)</span>;
          case 'saved-local': return <span className="text-orange-600 flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><HardDrive size={14} /> Saved (Local Only)</span>;
          case 'error': return <span className="text-red-600 flex items-center gap-1 bg-red-50 px-3 py-1 rounded-full border border-red-100"><X size={14} /> Save Failed</span>;
          default: return <span className="text-gray-500 flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-200"><Cloud size={14} /> Ready</span>;
      }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <div>
                    {getStatusDisplay()}
                </div>
            </div>
            
            <div className="flex gap-4 items-center">
                 {/* Cast to string to avoid TS error about unintentional comparison with literal types */}
                 {(JSONBIN_BIN_ID as string) === "REPLACE_WITH_YOUR_BIN_ID" && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                        <Lock size={14} /> Cloud DB Not Configured
                    </span>
                 )}
                
                <button 
                    onClick={refreshData} 
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 font-semibold disabled:opacity-50"
                >
                    <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    {isLoading ? 'Syncing...' : 'Refresh Data'}
                </button>

                <button onClick={handleLogout} className="text-red-600 font-bold hover:underline">Logout</button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-8 overflow-x-auto pb-2">
            {[
                {id: 'comments', label: 'Comments'}, 
                {id: 'packages', label: 'Packages'}, 
                {id: 'history', label: 'History'},
                {id: 'visitors', label: 'Visitors', icon: <Globe size={18} />},
                {id: 'settings', label: 'Settings', icon: <Settings size={18}/>}
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 md:px-6 py-2 rounded-full font-bold capitalize whitespace-nowrap transition flex items-center gap-2 ${activeTab === tab.id ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                    {tab.icon} {tab.label}
                </button>
            ))}
        </div>

        {/* --- VISITORS TAB --- */}
        {activeTab === 'visitors' && (
            <div className="space-y-6">
                
                {/* Stats Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
                    <div>
                        <h3 className="text-blue-100 font-medium mb-1 flex items-center gap-2">
                            <Activity size={18} /> Visitors (Last 24h)
                        </h3>
                        <p className="text-4xl font-bold">{last24hLogs.length}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                        <Globe size={32} />
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Last 20 Visitors</h3>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full animate-pulse">Live Updates</span>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-3 font-semibold">Location</th>
                                    <th className="px-6 py-3 font-semibold">Time</th>
                                    <th className="px-6 py-3 font-semibold">Device Info</th>
                                    <th className="px-6 py-3 font-semibold">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visitorLogs.length > 0 ? (
                                    visitorLogs.slice(0, 20).map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-900 font-medium">
                                                    <MapPin size={16} className="text-brand-500" />
                                                    {log.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">{log.date}</span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Clock size={12} /> {log.time}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Smartphone size={16} className="text-gray-400" />
                                                    <span className="font-semibold">{log.device}</span>
                                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{log.browser}</span>
                                                </div>
                                            </td>
                                             <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                                {log.ip}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                            No visitor logs yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Database className="text-brand-600" /> Database Configuration
                    </h2>
                    <p className="text-gray-600 mb-6">
                        To save your website data (Packages, History, Comments) permanently, you need a <strong>Bin ID</strong> from Jsonbin.io.
                        Currently, data is being saved to <strong>{saveStatus === 'saved' ? 'Cloud & Local' : 'LocalStorage Only'}</strong>.
                    </p>
                </div>

                {/* Step 1 */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-lg mb-3">Step 1: Enter API Key</h3>
                    <p className="text-sm text-gray-500 mb-4">Get your Master Key from <a href="https://jsonbin.io/app/api-keys" target="_blank" className="text-blue-600 hover:underline">Jsonbin.io API Keys</a>.</p>
                    <input 
                        type="text" 
                        value={apiKey} 
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="e.g. $2a$10$..." 
                        className="w-full border p-3 rounded-lg font-mono text-sm"
                    />
                </div>

                {/* Step 2 */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-lg mb-3">Step 2: Create Database Bin</h3>
                    <p className="text-sm text-gray-500 mb-4">This will create a new storage container for your website data.</p>
                    <button 
                        onClick={handleCreateBin} 
                        disabled={isCreatingBin}
                        className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {isCreatingBin ? 'Creating...' : 'Create Database Bin'}
                    </button>
                </div>

                {/* Step 3 */}
                {generatedBinId && (
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200 animate-fade-in-up">
                        <h3 className="font-bold text-lg mb-3 text-green-800 flex items-center gap-2">
                            <Check className="bg-green-200 rounded-full p-1" /> Bin Created Successfully!
                        </h3>
                        <p className="text-sm text-green-700 mb-4">
                            Copy this ID and replace <code>JSONBIN_BIN_ID</code> in your <code>src/constants.ts</code> file.
                        </p>
                        
                        <div className="flex gap-2">
                            <code className="flex-grow bg-white border border-green-200 p-3 rounded-lg font-mono text-green-900 font-bold">
                                {generatedBinId}
                            </code>
                            <button onClick={() => copyToClipboard(generatedBinId)} className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700">
                                <Copy size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* --- COMMENTS TAB --- */}
        {activeTab === 'comments' && (
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-bold">Manage Comments ({comments.length})</h2>
                </div>
                <div className="space-y-4">
                    {comments.map(c => (
                        <div key={c.id} className="border p-4 rounded-lg flex justify-between items-start hover:bg-gray-50">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold">{c.name}</span>
                                    <span className="text-xs text-gray-400">{c.date}</span>
                                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 rounded-full">★ {c.rating}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{c.text}</p>
                            </div>
                            <button onClick={() => {if(window.confirm('Delete?')) deleteComment(c.id)}} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {comments.length === 0 && <p className="text-gray-400 text-center py-4">No comments yet.</p>}
                </div>
            </div>
        )}

        {/* --- PACKAGES TAB --- */}
        {activeTab === 'packages' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Current Packages ({packages.length})</h2>
                    <button onClick={() => setShowPackageForm(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-brand-700">
                        <Plus size={18} /> Add Package
                    </button>
                </div>

                {showPackageForm && (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-brand-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">{editPkgId ? 'Edit Package' : 'Add New Package'}</h3>
                            <button onClick={closePackageForm} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSavePackage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                            <textarea placeholder="Itinerary (One item per line)" className="border p-2 rounded md:col-span-2" rows={4} value={typeof newPkg.itineraryEn === 'string' ? newPkg.itineraryEn : (newPkg.itineraryEn as string[] | undefined)?.join('\n')} onChange={e => setNewPkg({...newPkg, itineraryEn: e.target.value as any})} />
                            <textarea placeholder="Inclusions (One item per line)" className="border p-2 rounded md:col-span-2" rows={4} value={typeof newPkg.inclusionsEn === 'string' ? newPkg.inclusionsEn : (newPkg.inclusionsEn as string[] | undefined)?.join('\n')} onChange={e => setNewPkg({...newPkg, inclusionsEn: e.target.value as any})} />

                            <div className="md:col-span-2 flex gap-2 justify-end">
                                <button type="button" onClick={closePackageForm} className="px-4 py-2 text-gray-600">Cancel</button>
                                <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold">
                                    {editPkgId ? 'Update Package' : 'Save Package'}
                                </button>
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
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => startEditPackage(pkg)} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => {if(window.confirm('Delete?')) deletePackage(pkg.id)}} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- HISTORY TAB --- */}
        {activeTab === 'history' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Travel History ({history.length})</h2>
                    <button onClick={() => setShowHistoryForm(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-brand-700">
                        <Plus size={18} /> Add History
                    </button>
                </div>

                {showHistoryForm && (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-brand-100">
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="font-bold text-lg">{editHistoryId ? 'Edit Travel Event' : 'Add Travel Event'}</h3>
                             <button onClick={closeHistoryForm} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSaveHistory} className="space-y-4">
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
                                        <div key={idx} className="bg-white border px-3 py-1 rounded-full text-sm flex items-center gap-2 group">
                                            <span>{v.name} <span className="text-gray-400">({v.details})</span></span>
                                            <button type="button" onClick={() => removeVisitor(idx)} className="text-red-500 opacity-50 group-hover:opacity-100"><X size={14}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={closeHistoryForm} className="px-4 py-2 text-gray-600">Cancel</button>
                                <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold">
                                    {editHistoryId ? 'Update History' : 'Save History'}
                                </button>
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
                             <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => startEditHistory(item)} className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition">
                                    <Edit size={20} />
                                </button>
                                <button onClick={() => {if(window.confirm('Delete?')) deleteHistory(item.id)}} className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition">
                                    <Trash2 size={20} />
                                </button>
                             </div>
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
