import React, { createContext, useContext, useState } from 'react';
import { Paciente } from '../models/paciente';

const CoordenadorContext = createContext<{paciente:Paciente|null, setPaciente?:any}>({paciente: null});

export const CoordenadorProvider = ({ children }) => {
  const [paciente, setPaciente ] = useState<Paciente|null>(null);
  // ============================================
  return (
    <CoordenadorContext.Provider value={{ paciente, setPaciente }}>
      {children}
    </CoordenadorContext.Provider>
  );
};
// ===============================
export const useCoordenadorContext = () => useContext(CoordenadorContext);