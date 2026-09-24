/**
 * University Configuration
 * Manages the specific parameters, branding, and exam structures for different universities.
 */

export const universities = {
  UNSA: {
    id: 'UNSA',
    name: 'Universidad Nacional de San Agustín',
    shortName: 'UNSA',
    examTypes: ['CEPREUNSA', 'Ordinario', 'Extraordinario'],
    primaryColor: '#800000', // Example maroon color
    defaultProfile: 'CEPREUNSA',
    phases: ['Fase 1', 'Fase 2', 'Fase 3']
  },
  UNMSM: {
    id: 'UNMSM',
    name: 'Universidad Nacional Mayor de San Marcos',
    shortName: 'UNMSM',
    examTypes: ['Ordinario', 'Centro Preuniversitario'],
    primaryColor: '#003366', // Example blue
    defaultProfile: 'Ordinario',
    areas: ['A', 'B', 'C', 'D', 'E']
  },
  UNI: {
    id: 'UNI',
    name: 'Universidad Nacional de Ingeniería',
    shortName: 'UNI',
    examTypes: ['Ordinario', 'CEPREUNI'],
    primaryColor: '#800000',
    defaultProfile: 'Ordinario',
    examFormat: '3 days'
  },
  UNAP: {
    id: 'UNAP',
    name: 'Universidad Nacional de la Amazonía Peruana',
    shortName: 'UNAP',
    examTypes: ['Ordinario', 'CEPREUNAP'],
    primaryColor: '#006600',
    defaultProfile: 'Ordinario'
  },
  UNSCH: {
    id: 'UNSCH',
    name: 'Universidad Nacional de San Cristóbal de Huamanga',
    shortName: 'UNSCH',
    examTypes: ['Ordinario', 'CEPREUNSCH'],
    primaryColor: '#990000',
    defaultProfile: 'Ordinario'
  }
};

export const getUniversityConfig = (uniId) => {
  return universities[uniId] || universities.UNSA;
};

// Hook or context wrapper could be added later for global state
