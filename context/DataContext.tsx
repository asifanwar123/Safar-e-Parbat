
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TourPackage, TravelHistoryItem, Comment, CloudData, VisitorLog } from '../types';
import { PACKAGES, INITIAL_HISTORY, JSONBIN_BIN_ID, JSONBIN_API_KEY } from '../constants';

interface DataContextType {
  packages: TourPackage[];
  history: TravelHistoryItem[];
  comments: Comment[];
  visitorLogs: VisitorLog[];
  isLoading: boolean;
  
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

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TourPackage[]>(PACKAGES);
  const [history, setHistory] = useState<TravelHistoryItem[]>(INITIAL_HISTORY);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cast to string to prevent TS error about comparison with literal types
  const isConfigured = (JSONBIN_BIN_ID as string) !== "REPLACE_WITH_YOUR_BIN_ID" && (JSONBIN_API_KEY as string) !== "REPLACE_WITH_YOUR_API_KEY";

  // Load Data from Cloud
  const fetchData = async () => {
    if (!isConfigured) return;
    
    // Don't set loading on poll/refresh to avoid UI flicker, only initial could be handled if needed
    // But here we might want to know if it's syncing
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: { 'X-Master-Key': JSONBIN_API_KEY }
      });
      
      if (response.ok) {
        const data = await response.json();
        const record = data.record;

        // Check if it's the new structure (CloudData) or legacy (Array of comments)
        if (Array.isArray(record)) {
             // Legacy mode: It's just comments
             setComments(record);
             // Keep packages/history as defaults
        } else if (record.packages || record.history) {
             // New CloudData structure
             if (record.packages) setPackages(record.packages);
             if (record.history) setHistory(record.history);
             if (record.comments) setComments(record.comments);
             if (record.visitorLogs) setVisitorLogs(record.visitorLogs);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Initial Load & Poll
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s for new comments/updates
    return () => clearInterval(interval);
  }, []);

  // Helper to save everything to cloud
  const saveToCloud = async (newData: CloudData) => {
    if (!isConfigured) {
       // If not configured, just update local state (already done in handlers)
       return;
    }

    try {
      await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(newData)
      });
    } catch (error) {
      console.error("Failed to save to cloud:", error);
      // Silent fail in production often better than alerting on every auto-save
    }
  };

  const addPackage = async (pkg: TourPackage) => {
    const newPackages = [pkg, ...packages];
    setPackages(newPackages);
    await saveToCloud({ packages: newPackages, history, comments, visitorLogs });
  };

  const updatePackage = async (updatedPkg: TourPackage) => {
    const newPackages = packages.map(p => p.id === updatedPkg.id ? updatedPkg : p);
    setPackages(newPackages);
    await saveToCloud({ packages: newPackages, history, comments, visitorLogs });
  };

  const deletePackage = async (id: string) => {
    const newPackages = packages.filter(p => p.id !== id);
    setPackages(newPackages);
    await saveToCloud({ packages: newPackages, history, comments, visitorLogs });
  };

  const addHistory = async (item: TravelHistoryItem) => {
    const newHistory = [item, ...history];
    setHistory(newHistory);
    await saveToCloud({ packages, history: newHistory, comments, visitorLogs });
  };

  const updateHistory = async (updatedItem: TravelHistoryItem) => {
    const newHistory = history.map(h => h.id === updatedItem.id ? updatedItem : h);
    setHistory(newHistory);
    await saveToCloud({ packages, history: newHistory, comments, visitorLogs });
  };

  const deleteHistory = async (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    await saveToCloud({ packages, history: newHistory, comments, visitorLogs });
  };

  const addComment = async (comment: Comment) => {
    const newComments = [comment, ...comments];
    setComments(newComments);
    await saveToCloud({ packages, history, comments: newComments, visitorLogs });
  };

  const deleteComment = async (id: number) => {
    const newComments = comments.filter(c => c.id !== id);
    setComments(newComments);
    await saveToCloud({ packages, history, comments: newComments, visitorLogs });
  };

  const logVisitor = async (log: VisitorLog) => {
     // Prevent adding if it's the exact same IP as the most recent one (simple debounce)
     if (visitorLogs.length > 0 && visitorLogs[0].ip === log.ip) {
        // Just update local state to avoid flicker but don't save duplicates
        return; 
     }

     const newLogs = [log, ...visitorLogs].slice(0, 100); // Keep last 100 to allow for better 24h stats
     setVisitorLogs(newLogs);
     await saveToCloud({ packages, history, comments, visitorLogs: newLogs });
  };

  return (
    <DataContext.Provider value={{
      packages,
      history,
      comments,
      visitorLogs,
      isLoading,
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
