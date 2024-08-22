'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  toggleUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleUser = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, toggleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};