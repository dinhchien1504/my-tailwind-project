// MyContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type MyContextType = {
  sharedVar: boolean;
  setSharedVar: (value: boolean) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [sharedVar, setSharedVar] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{ sharedVar, setSharedVar }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within a MyProvider');
  return context;
};
