
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TourPackage, TravelHistoryItem, Comment } from '../types';
import { PACKAGES, INITIAL_HISTORY } from '../constants';

interface DataContextType {
  packages: TourPackage[];
  history: TravelHistoryItem[];
  comments: Comment[]; // We manage local state of comments here too for admin view
  addPackage: (pkg: TourPackage) => void;
  deletePackage: (id: string) => void;
  addHistory: (item: TravelHistoryItem) => void;
  deleteHistory: (id: string) => void;
  setComments: (comments: Comment[]) => void; // Used by CommentsSection or Admin to sync
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [history, setHistory] = useState<TravelHistoryItem[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Initialize Data
  useEffect(() => {
    // Packages
    const storedPackages = localStorage.getItem('safareparbat_packages');
    if (storedPackages) {
      setPackages(JSON.parse(storedPackages));
    } else {
      setPackages(PACKAGES); // Seed from constants
      localStorage.setItem('safareparbat_packages', JSON.stringify(PACKAGES));
    }

    // History
    const storedHistory = localStorage.getItem('safareparbat_history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    } else {
      setHistory(INITIAL_HISTORY); // Seed
      localStorage.setItem('safareparbat_history', JSON.stringify(INITIAL_HISTORY));
    }
  }, []);

  const addPackage = (pkg: TourPackage) => {
    const updated = [pkg, ...packages];
    setPackages(updated);
    localStorage.setItem('safareparbat_packages', JSON.stringify(updated));
  };

  const deletePackage = (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    localStorage.setItem('safareparbat_packages', JSON.stringify(updated));
  };

  const addHistory = (item: TravelHistoryItem) => {
    const updated = [item, ...history];
    setHistory(updated);
    localStorage.setItem('safareparbat_history', JSON.stringify(updated));
  };

  const deleteHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('safareparbat_history', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider value={{
      packages,
      history,
      comments,
      addPackage,
      deletePackage,
      addHistory,
      deleteHistory,
      setComments
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
