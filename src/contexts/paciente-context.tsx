import React, { createContext, useContext, useState } from 'react';
import { Paciente } from '../models/paciente';

const PacienteContext = createContext<{ usuario:Paciente|null, setUsuario?:any }>({usuario: null});

export const PacienteProvider = ({ children }) => {
  const [ usuario, setUsuario ] = useState<Paciente|null>(null);
  // ============================================
  return (
    <PacienteContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </PacienteContext.Provider>
  );
};
// ===============================
export const usePacienteContext = () => useContext(PacienteContext);