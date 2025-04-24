// MyContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type MyContextType = {
  sharedVar: "morning" | "afternoon" | "evening" ;
  setSharedVar: (value: "morning" | "afternoon" | "evening" ) => void;

  city: string;
  setCity: (value: string) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [sharedVar, setSharedVar] = useState<"morning" | "afternoon" | "evening" >("morning");
  const [city, setCity] = useState<string>("Thành phố Hồ Chí Minh");

  return (
    <MyContext.Provider  value={{ sharedVar, setSharedVar, city, setCity }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within a MyProvider');
  return context;
};
