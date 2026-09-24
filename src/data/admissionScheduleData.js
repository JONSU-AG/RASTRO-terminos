// Cronograma Oficial de Admisión UNSA 2027
// Permite sincronización con Firestore (site_settings / admission_schedule) y edición desde el Panel de Administración

export const DEFAULT_ADMISSION_SCHEDULE = [
  {
    id: 'ceprunsa-1f-2027',
    name: 'EXAMEN CEPRUNSA I FASE',
    shortName: 'CEPRUNSA I Fase',
    badge: 'CEPREUNSA',
    color: '#3B82F6',
    status: 'programado',
    inscripcionesInicio: '2026-03-23',
    inscripcionesFin: '2026-04-17',
    inicioClases: '2026-04-27',
    evaluacionPrevia: '2026-06-21T08:00:00',
    evaluacionConocimientos: '2026-07-05T08:00:00',
    targetDate: '2026-07-05T08:00:00',
    description: 'Inscripciones: 23/03 al 17/04/2026 | Clases: 27/04/2026 | Previa: 21/06/2026 | Conocimientos: 05/07/2026',
    milestones: [
      { label: 'Inscripciones', date: '23/03/2026 al 17/04/2026' },
      { label: 'Inicio de Clases', date: '27/04/2026' },
      { label: 'Evaluación Previa', date: '21/06/2026' },
      { label: 'Evaluación de Conocimientos', date: '05/07/2026', highlight: true }
    ]
  },
  {
    id: 'ordinario-1f-2027',
    name: 'EXAMEN ORDINARIO I FASE',
    shortName: 'Ordinario I Fase',
    badge: 'ORDINARIO',
    color: '#10B981',
    status: 'programado',
    inscripcionesInicio: '2026-06-22',
    inscripcionesFin: '2026-07-17',
    inicioClases: null,
    evaluacionPrevia: '2026-08-02T08:00:00',
    evaluacionConocimientos: '2026-08-09T08:00:00',
    targetDate: '2026-08-09T08:00:00',
    description: 'Inscripciones: 22/06 al 17/07/2026 | Previa: 02/08/2026 | Conocimientos: 09/08/2026',
    milestones: [
      { label: 'Inscripciones', date: '22/06/2026 al 17/07/2026' },
      { label: 'Evaluación Previa', date: '02/08/2026' },
      { label: 'Evaluación de Conocimientos', date: '09/08/2026', highlight: true }
    ]
  },
  {
    id: 'ceprunsa-quintos-2027',
    name: 'EXAMEN CEPRUNSA CICLO QUINTOS',
    shortName: 'CEPRUNSA Ciclo Quintos',
    badge: 'QUINTOS',
    color: '#8B5CF6',
    status: 'programado',
    inscripcionesInicio: '2026-07-27',
    inscripcionesFin: '2026-08-14',
    inicioClases: '2026-08-24',
    evaluacionPrevia: '2026-10-18T08:00:00',
    evaluacionConocimientos: '2026-11-01T08:00:00',
    targetDate: '2026-11-01T08:00:00',
    description: 'Inscripciones: 27/07 al 14/08/2026 | Clases: 24/08/2026 | Previa: 18/10/2026 | Conocimientos: 01/11/2026',
    milestones: [
      { label: 'Inscripciones', date: '27/07/2026 al 14/08/2026' },
      { label: 'Inicio de Clases', date: '24/08/2026' },
      { label: 'Evaluación Previa', date: '18/10/2026' },
      { label: 'Evaluación de Conocimientos', date: '01/11/2026', highlight: true }
    ]
  },
  {
    id: 'ceprunsa-2f-2027',
    name: 'EXAMEN CEPRUNSA II FASE',
    shortName: 'CEPRUNSA II Fase',
    badge: 'CEPREUNSA',
    color: '#EC4899',
    status: 'programado',
    inscripcionesInicio: '2026-10-12',
    inscripcionesFin: '2026-11-06',
    inicioClases: '2026-11-16',
    evaluacionPrevia: '2027-01-10T08:00:00',
    evaluacionConocimientos: '2027-01-24T08:00:00',
    targetDate: '2027-01-24T08:00:00',
    description: 'Inscripciones: 12/10 al 06/11/2026 | Clases: 16/11/2026 | Previa: 10/01/2027 | Conocimientos: 24/01/2027',
    milestones: [
      { label: 'Inscripciones', date: '12/10/2026 al 06/11/2026' },
      { label: 'Inicio de Clases', date: '16/11/2026' },
      { label: 'Evaluación Previa', date: '10/01/2027' },
      { label: 'Evaluación de Conocimientos', date: '24/01/2027', highlight: true }
    ]
  },
  {
    id: 'extraordinario-2027',
    name: 'EXAMEN EXTRAORDINARIO',
    shortName: 'Extraordinario',
    badge: 'EXTRAORDINARIO',
    color: '#F59E0B',
    status: 'programado',
    inscripcionesInicio: '2027-01-04',
    inscripcionesFin: '2027-01-27',
    inicioClases: '2027-02-01',
    evaluacionPrevia: '2027-02-14T08:00:00',
    evaluacionAptitudes: '2027-02-21T08:00:00',
    asignacionVacantes: '2027-02-23',
    targetDate: '2027-02-21T08:00:00',
    description: 'Inscripciones: 04/01 al 27/01/2027 | Clases: 01/02/2027 | Previa: 14/02/2027 | Aptitudes: 21/02/2027 | Vacantes: 23/02/2027',
    milestones: [
      { label: 'Inscripciones', date: '04/01/2027 al 27/01/2027' },
      { label: 'Inicio de Clases', date: '01/02/2027' },
      { label: 'Evaluación Previa', date: '14/02/2027' },
      { label: 'Evaluación de Aptitudes Académicas', date: '21/02/2027', highlight: true },
      { label: 'Asignación de Vacantes', date: '23/02/2027' }
    ]
  },
  {
    id: 'ordinario-2f-2027',
    name: 'EXAMEN ORDINARIO II FASE',
    shortName: 'Ordinario II Fase',
    badge: 'ORDINARIO',
    color: '#06B6D4',
    status: 'programado',
    inscripcionesInicio: '2027-02-01',
    inscripcionesFin: '2027-02-26',
    inicioClases: null,
    evaluacionPrevia: '2027-03-07T08:00:00',
    evaluacionConocimientos: '2027-03-14T08:00:00',
    targetDate: '2027-03-14T08:00:00',
    description: 'Inscripciones: 01/02 al 26/02/2027 | Previa: 07/03/2027 | Conocimientos: 14/03/2027',
    milestones: [
      { label: 'Inscripciones', date: '01/02/2027 al 26/02/2027' },
      { label: 'Evaluación Previa', date: '07/03/2027' },
      { label: 'Evaluación de Conocimientos', date: '14/03/2027', highlight: true }
    ]
  },
  {
    id: 'ordinario-filiales-2027',
    name: 'EXAMEN ORDINARIO FILIALES',
    shortName: 'Ordinario Filiales',
    badge: 'FILIALES',
    color: '#14B8A6',
    status: 'programado',
    inscripcionesInicio: '2027-03-01',
    inscripcionesFin: '2027-03-16',
    inicioClases: null,
    evaluacionConocimientos: '2027-03-20T08:00:00',
    targetDate: '2027-03-20T08:00:00',
    description: 'Inscripciones: 01/03 al 16/03/2027 | Conocimientos (Mollendo, Camaná y El Pedregal): 20/03/2027',
    note: 'Solo considera evaluación de conocimientos',
    milestones: [
      { label: 'Inscripciones', date: '01/03/2027 al 16/03/2027' },
      { label: 'Evaluación de Conocimientos (Mollendo, Camaná y El Pedregal)', date: '20/03/2027', highlight: true }
    ]
  }
];
