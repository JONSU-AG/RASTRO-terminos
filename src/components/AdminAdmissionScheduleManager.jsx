import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Edit3, Save, RefreshCw, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { DEFAULT_ADMISSION_SCHEDULE } from '../data/admissionScheduleData';
import { subscribeToSiteSettings, saveSiteSettings, getCachedSiteSettings } from '../lib/siteSettings';
import { ConfirmModal } from './ConfirmModal';

export const AdminAdmissionScheduleManager = ({ onNotice }) => {
  const [schedule, setSchedule] = useState(() => {
    const cached = getCachedSiteSettings();
    return (Array.isArray(cached.admissionSchedule) && cached.admissionSchedule.length > 0)
      ? cached.admissionSchedule
      : DEFAULT_ADMISSION_SCHEDULE;
  });

  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    const unsub = subscribeToSiteSettings((settings) => {
      if (settings?.admissionSchedule && Array.isArray(settings.admissionSchedule) && settings.admissionSchedule.length > 0) {
        setSchedule(settings.admissionSchedule);
      }
    });
    return () => unsub();
  }, []);

  const handleSaveAll = async (newSchedule) => {
    setIsSaving(true);
    try {
      await saveSiteSettings({ admissionSchedule: newSchedule });
      setSchedule(newSchedule);
      if (onNotice) onNotice('Cronograma Guardado', 'El cronograma de admisión y el reloj han sido actualizados.');
    } catch (err) {
      if (onNotice) onNotice('Error al Guardar', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNewExam = () => {
    const newExam = {
      id: `custom-exam-${Date.now()}`,
      name: 'NUEVO PROCESO DE ADMISIÓN',
      shortName: 'Nuevo Proceso',
      badge: 'UNSA',
      color: '#6366F1',
      status: 'programado',
      inscripcionesInicio: '2026-06-01',
      inscripcionesFin: '2026-06-30',
      inicioClases: '',
      evaluacionPrevia: '2026-07-15T08:00:00',
      evaluacionConocimientos: '2026-07-20T08:00:00',
      targetDate: '2026-07-15T08:00:00',
      description: 'Evaluación de Admisión UNSA'
    };
    const updated = [...schedule, newExam];
    setSchedule(updated);
    setEditingItem(newExam);
  };

  const handleUpdateItem = (updated) => {
    const newList = schedule.map(item => item.id === updated.id ? updated : item);
    setSchedule(newList);
    setEditingItem(null);
    handleSaveAll(newList);
  };

  const handleDeleteItem = (id, name) => {
    setConfirmModal({
      isOpen: true,
      title: "¿Eliminar Examen del Cronograma?",
      message: `¿Estás seguro de eliminar "${name}" del cronograma y reloj de admisión?`,
      confirmText: "Sí, Eliminar",
      variant: "danger",
      onConfirm: async () => {
        const newList = schedule.filter(item => item.id !== id);
        setSchedule(newList);
        await handleSaveAll(newList);
      }
    });
  };

  const handleResetToOfficialDefault = () => {
    setConfirmModal({
      isOpen: true,
      title: "¿Restablecer Cronograma Oficial 2026-2027?",
      message: "Esto restaurará todas las fechas oficiales de CEPREUNSA I y II Fase, Ordinario I y II Fase, Ciclo Quintos, Extraordinario y Filiales proporcionadas por la universidad.",
      confirmText: "Restablecer Oficial",
      variant: "primary",
      onConfirm: async () => {
        await handleSaveAll(DEFAULT_ADMISSION_SCHEDULE);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-wrap items-center justify-between gap-4 border border-blue-800/50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="text-blue-400 w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-black">Cronograma de Admisión UNSA 2026 - 2027</h2>
          </div>
          <p className="text-sm text-blue-200">
            Administra las fechas oficiales de exámenes, inscripciones y fases evaluativas. Se actualiza en tiempo real en la cuenta regresiva.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleResetToOfficialDefault}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-md"
          >
            <RefreshCw size={14} /> Restaurar Oficial 2026-2027
          </button>
          <button
            type="button"
            onClick={handleAddNewExam}
            className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-blue-500/30"
          >
            <Plus size={16} /> Añadir Examen
          </button>
        </div>
      </div>

      {/* Lista de Procesos */}
      <div className="grid grid-cols-1 gap-4">
        {schedule.map((item, index) => {
          const isEditing = editingItem?.id === item.id;

          if (isEditing) {
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl border-2 border-blue-500 shadow-xl bg-white dark:bg-slate-900 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-base font-black text-blue-600 dark:text-blue-400">
                    Editando: {editingItem.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="text-xs font-bold text-gray-500 hover:text-gray-700"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Nombre Completo:</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Nombre Corto:</label>
                    <input
                      type="text"
                      value={editingItem.shortName || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, shortName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Etiqueta Badge:</label>
                    <input
                      type="text"
                      value={editingItem.badge || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Inscripciones Inicio:</label>
                    <input
                      type="text"
                      value={editingItem.inscripcionesInicio || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, inscripcionesInicio: e.target.value })}
                      placeholder="DD/MM/AAAA o YYYY-MM-DD"
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Inscripciones Fin:</label>
                    <input
                      type="text"
                      value={editingItem.inscripcionesFin || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, inscripcionesFin: e.target.value })}
                      placeholder="DD/MM/AAAA o YYYY-MM-DD"
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Inicio de Clases (opcional):</label>
                    <input
                      type="text"
                      value={editingItem.inicioClases || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, inicioClases: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Evaluación Previa (Fecha ISO):</label>
                    <input
                      type="text"
                      value={editingItem.evaluacionPrevia || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, evaluacionPrevia: e.target.value, targetDate: e.target.value })}
                      placeholder="2026-06-21T08:00:00"
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-mono text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Evaluación de Conocimientos (Fecha ISO):</label>
                    <input
                      type="text"
                      value={editingItem.evaluacionConocimientos || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, evaluacionConocimientos: e.target.value })}
                      placeholder="2026-07-05T08:00:00"
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-mono text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Eval. Aptitudes Académicas (Fecha ISO):</label>
                    <input
                      type="text"
                      value={editingItem.evaluacionAptitudes || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, evaluacionAptitudes: e.target.value })}
                      placeholder="2027-02-21T08:00:00"
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-mono text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Asignación de Vacantes:</label>
                    <input
                      type="text"
                      value={editingItem.asignacionVacantes || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, asignacionVacantes: e.target.value })}
                      placeholder="2027-02-23"
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Nota / Observación Especial:</label>
                    <input
                      type="text"
                      value={editingItem.note || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, note: e.target.value })}
                      placeholder="ej. Solo considera la evaluación de conocimientos"
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Color de Acento:</label>
                    <input
                      type="color"
                      value={editingItem.color || '#3B82F6'}
                      onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                      className="w-full h-10 p-1 rounded-xl border border-gray-300 dark:border-gray-700 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateItem(editingItem)}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md flex items-center gap-1.5"
                  >
                    <Save size={14} /> Guardar Cambios
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id || index}
              className="p-5 rounded-2xl border transition-all bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md"
              style={{
                borderColor: item.color ? `${item.color}40` : 'rgba(0, 122, 255, 0.2)'
              }}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-lg text-[0.68rem] font-black text-white shadow-sm"
                    style={{ background: item.color || '#3B82F6' }}
                  >
                    {item.badge || 'PROCESO'}
                  </span>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  {item.inscripcionesInicio && (
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Inscripciones: </span>
                      {item.inscripcionesInicio} al {item.inscripcionesFin || 'Final'}
                    </div>
                  )}
                  {item.inicioClases && (
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Inicio Clases: </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{item.inicioClases}</span>
                    </div>
                  )}
                  {item.evaluacionPrevia && (
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Eval. Previa: </span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {new Date(item.evaluacionPrevia).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                  {item.evaluacionConocimientos && (
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Eval. Conocimientos: </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {new Date(item.evaluacionConocimientos).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                  {item.evaluacionAptitudes && (
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Eval. Aptitudes: </span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {new Date(item.evaluacionAptitudes).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                  {item.asignacionVacantes && (
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Vacantes: </span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{item.asignacionVacantes}</span>
                    </div>
                  )}
                  {item.note && (
                    <div className="col-span-full text-[11px] text-teal-600 dark:text-teal-400 font-semibold italic">
                      ℹ️ {item.note}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingItem(item)}
                  className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Edit3 size={14} /> Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id, item.name)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all"
                  title="Eliminar del cronograma"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText="Cancelar"
        variant={confirmModal.variant}
      />
    </div>
  );
};
