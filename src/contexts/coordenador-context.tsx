import React, { createContext, useContext, useState } from 'react';
import { Paciente } from '../models/paciente';
import { Sessao } from '../models/sessao';

const CoordenadorContext = createContext<{paciente:Paciente|null, setPaciente?:any, sessao:Sessao|null, setSessao?:any}>({paciente: null, sessao: null});

export const CoordenadorProvider = ({ children }) => {
  const [ paciente, setPaciente ] = useState<Paciente|null>(null);
  const [ sessao, setSessao ] = useState<Sessao|null>(null);
  // ============================================
  return (
    <CoordenadorContext.Provider value={{ paciente, setPaciente, sessao, setSessao }}>
      {children}
    </CoordenadorContext.Provider>
  );
};
// ===============================
export const useCoordenadorContext = () => useContext(CoordenadorContext);