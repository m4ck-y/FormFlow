import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo para el contexto
interface UserContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

// Crear el contexto con un valor inicial de null
const UsernameContext = createContext<UserContextType | null>(null);

// Proveedor del contexto
export function UserNameProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string>("");

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

// Hook para usar el contexto en los componentes
export function useUsername() {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserNameProvider');
  }
  return context;
}