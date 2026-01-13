
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TourPackage, TravelHistoryItem, Comment, CloudData, VisitorLog } from '../types';
import { PACKAGES, INITIAL_HISTORY, JSONBIN_BIN_ID, JSONBIN_API_KEY } from '../constants';

interface DataContextType {
  packages: TourPackage[];
  history: TravelHistoryItem[];
  comments: Comment[];
  visitorLogs: VisitorLog[];
  isLoading: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'saved-local' | 'error';
  
  // Actions
  addPackage: (pkg: TourPackage) => Promise<void>;
  updatePackage: (pkg: TourPackage) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  addHistory: (item: TravelHistoryItem) => Promise<void>;
  updateHistory: (item: TravelHistoryItem) => Promise<void>;
  deleteHistory: (id: string) => Promise<void>;
  addComment: (comment: Comment) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  logVisitor: (log: VisitorLog) => Promise<void>;
  
  // Utility
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'safar_data_v1';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TourPackage[]>(PACKAGES);
  const [history, setHistory] = useState<TravelHistoryItem[]>(INITIAL_HISTORY);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'saved-local' | 'error'>('idle');

  // Cast to string to prevent TS error about comparison with literal types
  const isConfigured = (JSONBIN_BIN_ID as string) !== "REPLACE_WITH_YOUR_BIN_ID" && (JSONBIN_API_KEY as string) !== "REPLACE_WITH_YOUR_API_KEY";

  // Load Data (Hybrid: Cloud -> Local -> Default)
  const fetchData = async () => {
    setIsLoading(true);
    let loaded = false;

    // 1. Try Cloud First (if configured)
    if (isConfigured) {
      try {
        // Add timestamp to prevent caching
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest?t=${Date.now()}`, {
          headers: { 
              'X-Master-Key': JSONBIN_API_KEY,
              'Cache-Control': 'no-cache'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const record = data.record;
          updateState(record);
          
          // Sync Cloud data to LocalStorage for backup
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(record));
          loaded = true;
        } else {
            console.warn("Cloud fetch failed, falling back to local storage.");
        }
      } catch (error) {
        console.error("Failed to fetch data from cloud:", error);
      }
    }

    // 2. Fallback to LocalStorage if Cloud failed or not configured
    if (!loaded) {
        const local = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (local) {
            try {
                const parsed = JSON.parse(local);
                updateState(parsed);
                console.log("Loaded data from LocalStorage");
            } catch (e) {
                console.error("Failed to parse local storage", e);
            }
        }
    }
    
    setIsLoading(false);
  };

  const updateState = (record: any) => {
      // Handle legacy structure (array of comments) vs new structure (CloudData)
      if (Array.isArray(record)) {
           setComments(record);
      } else {
           if (record.packages) setPackages(record.packages);
           if (record.history) setHistory(record.history);
           if (record.comments) setComments(record.comments);
           if (record.visitorLogs) setVisitorLogs(record.visitorLogs);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper to save everything
  const saveData = async (newData: CloudData) => {
    setSaveStatus('saving');
    
    // 1. Always Save to LocalStorage (Instant)
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
        console.error("Local storage save failed (quota exceeded?)", e);
    }

    // 2. Try Save to Cloud
    if (!isConfigured) {
       setSaveStatus('saved-local');
       setTimeout(() => setSaveStatus('idle'), 2000);
       return;
    }

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(newData)
      });
      
      if(response.ok) {
          setSaveStatus('saved');
      } else {
          console.error("Cloud save failed:", await response.text());
          setSaveStatus('saved-local'); // Fallback status
      }
    } catch (error) {
      console.error("Failed to save to cloud:", error);
      setSaveStatus('saved-local'); // Fallback status
    } finally {
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const addPackage = async (pkg: TourPackage) => {
    const newPackages = [pkg, ...packages];
    setPackages(newPackages);
    await saveData({ packages: newPackages, history, comments, visitorLogs });
  };

  const updatePackage = async (updatedPkg: TourPackage) => {
    const newPackages = packages.map(p => p.id === updatedPkg.id ? updatedPkg : p);
    setPackages(newPackages);
    await saveData({ packages: newPackages, history, comments, visitorLogs });
  };

  const deletePackage = async (id: string) => {
    const newPackages = packages.filter(p => p.id !== id);
    setPackages(newPackages);
    await saveData({ packages: newPackages, history, comments, visitorLogs });
  };

  const addHistory = async (item: TravelHistoryItem) => {
    const newHistory = [item, ...history];
    setHistory(newHistory);
    await saveData({ packages, history: newHistory, comments, visitorLogs });
  };

  const updateHistory = async (updatedItem: TravelHistoryItem) => {
    const newHistory = history.map(h => h.id === updatedItem.id ? updatedItem : h);
    setHistory(newHistory);
    await saveData({ packages, history: newHistory, comments, visitorLogs });
  };

  const deleteHistory = async (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    await saveData({ packages, history: newHistory, comments, visitorLogs });
  };

  const addComment = async (comment: Comment) => {
    const newComments = [comment, ...comments];
    setComments(newComments);
    await saveData({ packages, history, comments: newComments, visitorLogs });
  };

  const deleteComment = async (id: number) => {
    const newComments = comments.filter(c => c.id !== id);
    setComments(newComments);
    await saveData({ packages, history, comments: newComments, visitorLogs });
  };

  const logVisitor = async (log: VisitorLog) => {
     if (visitorLogs.length > 0 && visitorLogs[0].ip === log.ip) {
        return; 
     }
     const newLogs = [log, ...visitorLogs].slice(0, 100);
     setVisitorLogs(newLogs);
     // Don't await visitor logs to prevent UI lag
     saveData({ packages, history, comments, visitorLogs: newLogs });
  };

  return (
    <DataContext.Provider value={{
      packages,
      history,
      comments,
      visitorLogs,
      isLoading,
      saveStatus,
      addPackage,
      updatePackage,
      deletePackage,
      addHistory,
      updateHistory,
      deleteHistory,
      addComment,
      deleteComment,
      logVisitor,
      refreshData: fetchData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
