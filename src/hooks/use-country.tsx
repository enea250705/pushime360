import React, { createContext, useContext, useState, useEffect } from 'react';

type Country = 'albania' | 'kosovo';

interface CountryContextType {
  country: Country;
  setCountry: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children, initialCountry = 'albania' }: { children: React.ReactNode, initialCountry?: Country }) => {
  const [country, setCountry] = useState<Country>(initialCountry);

  useEffect(() => {
    setCountry(initialCountry);
  }, [initialCountry]);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
