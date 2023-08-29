import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
type CompanyDataContextType = {
  companyData: unknown;
  updateCompanyData: (data: unknown) => void;
};

// Create the context
const CompanyDataContext = createContext<CompanyDataContextType | undefined>(undefined);

export const useCompanyDataContext = () => {
  const context = useContext(CompanyDataContext);
  if (!context) {
    throw new Error('useCompanyDataContext must be used within a CompanyDataProvider');
  }
  return context;
};

// Create the context provider component
type CompanyDataProviderProps = {
  children: ReactNode;
};

export const CompanyDataProvider = ({ children }: CompanyDataProviderProps) => {
  const [companyData, setCompanyData] = useState<unknown | null>(null); // Replace 'any' with the actual type of company data

  const updateCompanyData = (data: unknown) => {
    setCompanyData(data);
  };

  const contextValue: CompanyDataContextType = {
    companyData,
    updateCompanyData,
  };

  return (
    <CompanyDataContext.Provider value={contextValue}>
      {children}
    </CompanyDataContext.Provider>
  );
};
