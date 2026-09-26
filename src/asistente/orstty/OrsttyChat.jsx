import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Trash2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  Clock, 
  Ban, 
  EyeOff, 
  GraduationCap, 
  Calculator, 
  Bookmark, 
  FileText, 
  Dna, 
  Target,
  Radio,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  Zap,
  Flame,
  Brain,
  Video,
  Library,
  Trophy,
  Compass,
  Layers,
  Award,
  Flag,
  MessageSquare
} from 'lucide-react';
import { deactivateOrstty } from '../../lib/orsttySettings';
import { IOSModal } from '../../components/IOSModal';
import { VocationalTestModal } from '../../components/VocationalTestModal';
import { process as processWithEngine, getTool, getContext, clearContext } from './orstty-engine.js';
import { registerAllRastroTools } from './rastro-tools.js';
import { detectarApodo, getApodoResponse, getRecuperarNombreResponse, getApodo, setApodo } from './orstty-conversacion.js';
import { procesarIntencionAvanzada } from './orstty-avanzado.js';
import { executeUniversalSearch } from './orstty-search-indexer.js';
import { reasonAboutQuery } from './orstty-reasoning.js';
import { OrsttyAvatar, ORSTTY_STATES } from './OrsttyAvatar';
import { OrsttyMiniCard } from './OrsttyMiniCard';
import { InChatVideoModal, InChatPreviewModal } from './OrsttyModals';
import { useAuth } from '../../context/AuthContext';
import { usePomodoro } from '../../context/PomodoroContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  askOrsttyGemini, 
  PREU_SUBJECTS 
} from '../../services/orsttyGeminiService';

// Aseguramos que las herramientas estén registradas
registerAllRastroTools();

const QUICK_STARTERS = [
  { label: 'Test Vocacional UNSA', icon: Compass, query: 'Quiero hacer el test vocacional para saber qué carrera estudiar en la UNSA' },
  { label: 'Área Biomédicas (Biología)', icon: Dna, query: 'Quiero estudiar el área de Biomédicas, temario de Biología y Medicina' },
  { label: 'Área Ingenierías (Física/Álgebra)', icon: Zap, query: 'Quiero estudiar el área de Ingenierías, fórmulas de Física y Álgebra' },
  { label: 'Área Sociales (Humanidades)', icon: BookOpen, query: 'Quiero estudiar el área de Sociales, temario de Filosofía y Cívica' },
  { label: 'Simulador Oficial de Examen', icon: Trophy, query: 'Quiero abrir el simulador de examen cronometrado' },
  { label: 'Libros y Separatas PDF', icon: Library, query: 'Quiero ver el material compartido, compendios y tomos de CEPREUNSA' },
  { label: 'Pomodoro de 25 min', icon: Clock, query: 'Inicia un cronómetro pomodoro para estudiar' }
];

const INITIAL_MESSAGE = {
  id: 'welcome',
  sender: 'orstty',
  text: '¡Hola! Soy **ORSTTY**, tu tutor inteligente para el examen de admisión UNSA. ¿En qué área o tema nos enfocamos hoy? Puedo orientarte con teoría oficial, cursos en video o preguntas tipo examen.',
  suggestions: [
    'Test Vocacional UNSA',
    'Biomédicas (Biología)',
    'Ingenierías (Física)',
    'Sociales (Filosofía)',
    'Simulador de Examen'
  ],
  timestamp: Date.now()
};

const STORAGE_KEY = 'rastro_orstty_chat_history_v4';

export function OrsttyChat({ 
  onClose = null,
  onBack = null,
  isAdmin = false,
  onOpenDeactivate = null,
  isDrawer = false,
  className = '' 
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, isLight } = useTheme();
  const pomodoroContext = usePomodoro();

  // Estado del motor (avatar)
  const [engineState, setEngineState] = useState(ORSTTY_STATES.IDLE);
  
  // Apodo personalizado
  const [apodoActual, setApodoActual] = useState(() => getApodo());
  
  // Historial de mensajes
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [INITIAL_MESSAGE];
  });

  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  // Voz por micrófono retirada del chat: bandera fija en falso (no renderiza bloques de voz)
  const [isListening] = useState(false);
  const [activeContext, setActiveContext] = useState(() => getContext());
  
  // Selector rápido de Materias
  const [showSubjectDrawer, setShowSubjectDrawer] = useState(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState(null);

  // Modales interactivos dentro del chat
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activePreviewModal, setActivePreviewModal] = useState(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [showVocationalModal, setShowVocationalModal] = useState(false);

  // Estado de respuestas a quizzes dentro del chat
  const [quizAnswers, setQuizAnswers] = useState({});

  // Expansión de resultados ("Mostrar más")
  const [expandedResults, setExpandedResults] = useState({});

  // Mecanismo de Denuncia y Reporte de IA (Cumplimiento Políticas Google Play Generative AI)
  const [reportedMsgIds, setReportedMsgIds] = useState(() => new Set());
  const [reportFeedback, setReportFeedback] = useState(null);

  const handleReportAiMessage = (msgId) => {
    setReportedMsgIds(prev => new Set(prev).add(msgId));
    setReportFeedback('Respuesta reportada para revisión de seguridad. ¡Gracias por tu reporte!');
    setTimeout(() => setReportFeedback(null), 4000);
  };

  const messagesContainerRef = useRef(null);
  const chatBottomRef = useRef(null);
  const inputRef = useRef(null);

  // Guardar en sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Tope de mensajes renderizados: los chats largos no traban el celular.
  // Se muestran los últimos 40 con botón para cargar anteriores.
  const [visibleMsgCount, setVisibleMsgCount] = useState(40);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isProcessing]);

  // Ejecución de acciones sugeridas por el Asistente
  const handleExecuteAction = (action) => {
    if (!action) return;

    if (action.type === 'VOCATIONAL_TEST' || action.target === 'VOCATIONAL_TEST') {
      setShowVocationalModal(true);
      return;
    }

    if (action.type === 'NAVIGATE' && action.target) {
      if (onClose) onClose();
      navigate(action.target);
    } else if (action.type === 'POMODORO') {
      if (pomodoroContext && typeof pomodoroContext.openModal === 'function') {
        pomodoroContext.openModal();
      }
    } else if (action.type === 'SUBJECT' && action.subjectId) {
      if (onClose) onClose();
      navigate('/aprender');
    }
  };

  // Enviar mensaje al cerebro de ORSTTY (Google Gemini + Tools)
  const handleSendMessage = async (textToSend) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputVal).trim();
    if (!text || isProcessing) return;

    setInputVal('');
    const userMsgId = `user-${Date.now()}`;
    const newMsg = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMsg]);
    setIsProcessing(true);
    setEngineState(ORSTTY_STATES.THINKING);

    try {
      // 0. Comprobar comandos de apodo
      const apodoInfo = detectarApodo(text);
      if (apodoInfo) {
        let responseText;
        if (apodoInfo.esApodo) {
          setApodo(apodoInfo.apodo);
          setApodoActual(apodoInfo.apodo);
          responseText = getApodoResponse(apodoInfo.apodo);
        } else if (apodoInfo.esRecuperar) {
          setApodoActual('ORSTTY');
          responseText = getRecuperarNombreResponse();
        }

        const botMsgId = `orstty-${Date.now()}`;
        setMessages(prev => [...prev, {
          id: botMsgId,
          sender: 'orstty',
          text: responseText,
          intent: 'conversacion',
          suggestions: ['Explicar un tema', 'Simulador de examen', 'Poner Pomodoro'],
          timestamp: Date.now()
        }]);
        setEngineState(ORSTTY_STATES.HAPPY);
        return;
      }

      // 1. Intenciones especiales locales (horarios, creador, etc.)
      const respuestaAvanzada = procesarIntencionAvanzada(text);
      if (respuestaAvanzada) {
        const botMsgId = `orstty-${Date.now()}`;
        setMessages(prev => [...prev, {
          id: botMsgId,
          sender: 'orstty',
          text: respuestaAvanzada,
          intent: 'conversacion',
          suggestions: ['Ver temario de Aprender', 'Simulador de examen', 'Repasar fórmulas'],
          timestamp: Date.now()
        }]);
        setEngineState(ORSTTY_STATES.HAPPY);
        return;
      }

      // 2. Consulta al Asistente Inteligente Gemini
      setEngineState(ORSTTY_STATES.SEARCHING);
      
      const geminiResult = await askOrsttyGemini(text, messages, {
        subject: selectedSubjectFilter?.name || activeContext?.materia,
        week: activeContext?.semana
      });

      // 3. Revisar si además hay recursos o videos en la base de datos de RASTRO
      let localItems = [];
      try {
        const universalDirect = await executeUniversalSearch({ query: text }, activeContext);
        if (universalDirect && Array.isArray(universalDirect.items)) {
          localItems = universalDirect.items.slice(0, 3);
        }
      } catch {}

      const botMsgId = `orstty-${Date.now()}`;
      const finalActions = Array.isArray(geminiResult.actions) && geminiResult.actions.length > 0
        ? geminiResult.actions
        : (geminiResult.action ? [geminiResult.action] : []);

      const botMsg = {
        id: botMsgId,
        sender: 'orstty',
        text: geminiResult.text,
        speechSummary: geminiResult.speechSummary,
        items: localItems,
        suggestions: geminiResult.suggestions || ['Explicar tema', 'Simulador', 'Ver temario'],
        originCard: geminiResult.originCard || null,
        actions: finalActions,
        action: finalActions[0] || null,
        quizQuestion: geminiResult.quizQuestion || null,
        isGemini: geminiResult.isGemini,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
      setEngineState(localItems.length > 0 || geminiResult.isGemini ? ORSTTY_STATES.FOUND : ORSTTY_STATES.HAPPY);

      // Volver a IDLE después de unos segundos
      setTimeout(() => {
        setEngineState(prev => (prev === ORSTTY_STATES.FOUND || prev === ORSTTY_STATES.HAPPY ? ORSTTY_STATES.IDLE : prev));
      }, 4500);

    } catch (err) {
      console.error('Error in ORSTTY chat processing:', err);
      setEngineState(ORSTTY_STATES.ERROR);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'orstty',
          text: 'Comprendo tu consulta sobre el temario. Puedes explorar los cursos directamente en la pestaña **Aprender** o en el **Simulador**.',
          suggestions: ['Ir a Aprender', 'Simulador de examen', 'Ver biblioteca'],
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearChat = () => {
    clearContext();
    setMessages([INITIAL_MESSAGE]);
    setEngineState(ORSTTY_STATES.IDLE);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div 
      className={`orstty-chat-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isDrawer ? '86vh' : '100%',
        maxHeight: isDrawer ? '86vh' : '100%',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        background: isLight ? '#FFFFFF' : 'var(--bg-main, #0B0F19)',
        color: isLight ? '#0F172A' : 'var(--text-main, #F8FAFC)',
        borderRadius: isDrawer ? '24px 24px 0 0' : 0,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header Nativo Unificado (56px) */}
      <div 
        style={{
          padding: '8px 12px',
          background: isLight ? '#FFFFFF' : 'var(--card-bg, #0F172A)',
          borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexShrink: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
          {/* Botón Volver */}
          {(onBack || onClose) && (
            <button
              type="button"
              onClick={onBack || onClose}
              title="Volver"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.12)',
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.05)',
                color: isLight ? '#1E293B' : '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
            >
              <ArrowLeft size={18} />
            </button>
          )}

          {/* Avatar con indicador de presencia */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <OrsttyAvatar state={engineState} size={36} showBadge={false} />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#10B981',
                border: isLight ? '2px solid #FFFFFF' : '2px solid #0F172A'
              }}
            />
          </div>

          {/* Identidad de ORSTTY */}
          <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ 
                fontWeight: 900, 
                fontSize: '0.98rem', 
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
              }}>
                {apodoActual}
              </span>
              <span style={{ 
                fontSize: '0.62rem', 
                fontWeight: 800, 
                padding: '1px 6px', 
                borderRadius: '99px',
                background: isLight ? '#EDE9FE' : 'rgba(124, 58, 237, 0.25)',
                color: isLight ? '#6D28D9' : '#C4B5FD',
                flexShrink: 0
              }}>
                Tutor IA
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: isLight ? '#64748B' : 'var(--text-secondary, #94A3B8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Orientación y temario oficial UNSA
            </div>
          </div>
        </div>

        {/* Acciones del Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>

          {/* Botón Limpiar Chat */}
          <button
            type="button"
            onClick={handleClearChat}
            title="Limpiar conversación"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
              color: isLight ? '#475569' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Trash2 size={14} />
          </button>

          {/* Botón Admin Desactivar */}
          {isAdmin && onOpenDeactivate && (
            <button
              type="button"
              onClick={onOpenDeactivate}
              title="Desactivar asistente temporalmente"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <EyeOff size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Contenedor de Mensajes del Chat */}
      <div 
        ref={messagesContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      >
        {messages.length > visibleMsgCount && (
          <button
            onClick={() => setVisibleMsgCount((c) => c + 40)}
            style={{ alignSelf: 'center', padding: '8px 18px', borderRadius: '12px', border: '1.5px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-main)', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', marginBottom: '4px' }}
          >
            Ver mensajes anteriores ({messages.length - visibleMsgCount} más)
          </button>
        )}
        {messages.slice(-visibleMsgCount).map((msg) => {
          const isOrstty = msg.sender === 'orstty';

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOrstty ? 'flex-start' : 'flex-end',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                  maxWidth: isOrstty ? '100%' : '90%',
                  width: isOrstty ? '100%' : 'auto',
                  flexDirection: isOrstty ? 'row' : 'row-reverse',
                  boxSizing: 'border-box'
                }}
              >
                {/* Avatar */}
                {isOrstty ? (
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>
                    <OrsttyAvatar state={ORSTTY_STATES.IDLE} size={28} showBadge={false} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    {user?.username ? user.username.charAt(0).toUpperCase() : 'Tú'}
                  </div>
                )}

                {/* Burbuja de Texto Principal */}
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: isOrstty ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                    background: isOrstty
                      ? (isLight ? '#F8FAFC' : 'var(--card-bg, rgba(30, 41, 59, 0.85))')
                      : 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
                    color: isOrstty ? (isLight ? '#0F172A' : 'var(--text-main, #F8FAFC)') : '#FFFFFF',
                    border: isOrstty ? (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)') : 'none',
                    fontSize: '0.86rem',
                    lineHeight: 1.5,
                    boxShadow: isOrstty ? '0 1px 4px rgba(0, 0, 0, 0.06)' : '0 2px 10px rgba(124, 58, 237, 0.25)',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    boxSizing: 'border-box',
                    flex: isOrstty ? 1 : 'none',
                    minWidth: 0,
                    maxWidth: isOrstty ? '100%' : '88%'
                  }}
                >
                  <div style={{ whiteSpace: 'pre-line', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    {msg.text}
                  </div>

                  {/* Micro-acciones de reporte para la respuesta */}
                  {isOrstty && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      {/* Botón de reporte de contenido de IA (Google Play Generative AI Policy) */}
                      <button
                        type="button"
                        onClick={() => handleReportAiMessage(msg.id)}
                        title={reportedMsgIds.has(msg.id) ? 'Respuesta reportada para revisión' : 'Reportar respuesta inadecuada'}
                        aria-label="Reportar respuesta"
                        style={{
                          background: reportedMsgIds.has(msg.id) ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                          border: 'none',
                          color: reportedMsgIds.has(msg.id) ? '#EF4444' : (isLight ? '#94A3B8' : 'rgba(255, 255, 255, 0.35)'),
                          borderRadius: '6px',
                          padding: '3px 5px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '0.66rem'
                        }}
                      >
                        <Flag size={11} />
                        {reportedMsgIds.has(msg.id) && <span>Reportado</span>}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Tarjeta Especial de Origen / Reenvío al Contenido Directo */}
              {isOrstty && msg.originCard && (
                (() => {
                  const card = msg.originCard;
                  const isSubject = card.type === 'SUBJECT_PATH' || card.subjectId || card.subjectName;
                  const isVocational = card.type === 'VOCATIONAL_TEST' || card.target === 'VOCATIONAL_TEST';
                  const isSimulator = card.type === 'SIMULATOR' || card.target === '/simulador';
                  const isLibrary = card.type === 'LIBRARY' || card.target === '/biblioteca';
                  const isPomodoro = card.type === 'POMODORO' || card.target === 'POMODORO';
                  const isChats = card.type === 'CHATS' || card.target === '/chats';
                  const isCursos = card.type === 'COURSE_VIDEOS' || card.target === '/cursos';

                  // Estilo auténtico de tarjeta de curso de la app (Aprender.jsx)
                  if (isSubject) {
                    const cardBg = card.badgeColor 
                      ? `linear-gradient(135deg, ${card.badgeColor} 0%, ${card.badgeColor}EE 100%)`
                      : 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)';

                    return (
                      <div
                        style={{
                          marginTop: '10px',
                          width: '100%',
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                          borderRadius: '18px',
                          padding: '14px 16px',
                          background: cardBg,
                          border: '1.5px solid rgba(255, 255, 255, 0.45)',
                          borderBottom: '4px solid rgba(0, 0, 0, 0.28)',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                          color: '#FFFFFF',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Brillo radial ambiental de fondo */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                            pointerEvents: 'none'
                          }}
                        />

                        {/* Fila Superior: Título de Materia y Badge de Temas */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                            {(() => {
                              const sid = (card.subjectId || '').toLowerCase();
                              if (sid.includes('bio') || sid.includes('med') || sid.includes('anat')) return <Dna size={20} color="#FFFFFF" />;
                              if (sid.includes('fis') || sid.includes('qui')) return <Zap size={20} color="#FFFFFF" />;
                              if (sid.includes('mat') || sid.includes('alg') || sid.includes('rm')) return <Calculator size={20} color="#FFFFFF" />;
                              if (sid.includes('filo') || sid.includes('psic')) return <Brain size={20} color="#FFFFFF" />;
                              if (sid.includes('civic') || sid.includes('derech')) return <Scale size={20} color="#FFFFFF" />;
                              return <BookOpen size={20} color="#FFFFFF" />;
                            })()}
                            <h3
                              style={{
                                fontSize: '1.2rem',
                                fontWeight: 900,
                                margin: 0,
                                color: '#FFFFFF',
                                letterSpacing: '-0.02em',
                                textShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {card.subjectName || card.title}
                            </h3>
                          </div>

                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: 'rgba(255, 255, 255, 0.22)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              borderRadius: '10px',
                              padding: '3px 8px',
                              color: '#FFFFFF',
                              fontWeight: 900,
                              fontSize: '0.72rem',
                              flexShrink: 0
                            }}
                          >
                            <BookOpen size={11} />
                            <span>{card.topicsCount || '43 temas'}</span>
                          </div>
                        </div>

                        {/* Descripción concisa del curso */}
                        {card.description && (
                          <div
                            style={{
                              fontSize: '0.76rem',
                              color: 'rgba(255, 255, 255, 0.95)',
                              lineHeight: 1.45,
                              marginBottom: '12px',
                              textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)'
                            }}
                          >
                            {card.description}
                          </div>
                        )}

                        {/* 3 Botones 3D de Acción Rápida (Fichas, Temas, Ir al Curso) */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '6px',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          {/* Botón Fichas */}
                          <button
                            type="button"
                            onClick={() => {
                              if (onClose) onClose();
                              navigate(card.target || `/aprender/${card.subjectId || 'biologia'}`);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              padding: '8px 6px',
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.2)',
                              border: '1.5px solid rgba(255, 255, 255, 0.45)',
                              borderBottom: '3px solid rgba(0, 0, 0, 0.25)',
                              color: '#FFFFFF',
                              fontWeight: 900,
                              fontSize: '0.74rem',
                              cursor: 'pointer',
                              boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <Zap size={13} fill="#FDE047" color="#FDE047" />
                            <span>Fichas</span>
                          </button>

                          {/* Botón Temas */}
                          <button
                            type="button"
                            onClick={() => {
                              if (onClose) onClose();
                              navigate(card.target || `/aprender/${card.subjectId || 'biologia'}`);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              padding: '8px 6px',
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.2)',
                              border: '1.5px solid rgba(255, 255, 255, 0.45)',
                              borderBottom: '3px solid rgba(0, 0, 0, 0.25)',
                              color: '#FFFFFF',
                              fontWeight: 900,
                              fontSize: '0.74rem',
                              cursor: 'pointer',
                              boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <FileText size={13} />
                            <span>Temas</span>
                          </button>

                          {/* Botón Ir al Curso */}
                          <button
                            type="button"
                            onClick={() => {
                              if (onClose) onClose();
                              navigate(card.target || `/aprender/${card.subjectId || 'biologia'}`);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              padding: '8px 6px',
                              borderRadius: '12px',
                              background: '#FFFFFF',
                              border: '1.5px solid #FFFFFF',
                              borderBottom: '3px solid rgba(0, 0, 0, 0.22)',
                              color: card.badgeColor || '#EA580C',
                              fontWeight: 900,
                              fontSize: '0.74rem',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <BookOpen size={13} />
                            <span>Ir al curso</span>
                          </button>
                        </div>
                      </div>
                    );
                  }

                  // Estilo para Test Vocacional
                  if (isVocational) {
                    return (
                      <div
                        style={{
                          marginTop: '10px',
                          width: '100%',
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                          borderRadius: '18px',
                          padding: '14px 16px',
                          background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
                          border: '1.5px solid rgba(255, 255, 255, 0.45)',
                          borderBottom: '4px solid rgba(0, 0, 0, 0.28)',
                          boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
                          color: '#FFFFFF',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Compass size={20} color="#FFFFFF" />
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: 0, color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.35)' }}>
                              Test Vocacional Oficial UNSA
                            </h3>
                          </div>
                          <div
                            style={{
                              background: 'rgba(255, 255, 255, 0.22)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              borderRadius: '10px',
                              padding: '3px 8px',
                              color: '#FFFFFF',
                              fontWeight: 900,
                              fontSize: '0.72rem'
                            }}
                          >
                            UNSA 2026
                          </div>
                        </div>

                        <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.45, marginBottom: '12px' }}>
                          {card.description || 'Diagnóstico de 20 preguntas ponderadas para identificar tu vocación en Biomédicas, Ingenierías y Sociales.'}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setShowVocationalModal(true);
                          }}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            background: '#FFFFFF',
                            border: '1.5px solid #FFFFFF',
                            borderBottom: '3px solid rgba(0, 0, 0, 0.25)',
                            color: '#7C3AED',
                            fontWeight: 900,
                            fontSize: '0.84rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Sparkles size={16} color="#7C3AED" />
                          <span>Iniciar Test Vocacional Ahora</span>
                          <ArrowRight size={15} color="#7C3AED" />
                        </button>
                      </div>
                    );
                  }

                  // Estilo genérico de tarjeta de acción
                  return (
                    <div
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        borderRadius: '18px',
                        padding: '14px 16px',
                        background: card.badgeColor 
                          ? `linear-gradient(135deg, ${card.badgeColor} 0%, ${card.badgeColor}EE 100%)`
                          : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        border: '1.5px solid rgba(255, 255, 255, 0.45)',
                        borderBottom: '4px solid rgba(0, 0, 0, 0.28)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                        color: '#FFFFFF',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {isSimulator ? <Trophy size={18} /> : isLibrary ? <Library size={18} /> : isPomodoro ? <Clock size={18} /> : isCursos ? <Video size={18} /> : isChats ? <MessageSquare size={18} /> : <BookOpen size={18} />}
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: 0, color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.35)' }}>
                            {card.title}
                          </h3>
                        </div>
                        <div
                          style={{
                            background: 'rgba(255, 255, 255, 0.22)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: '10px',
                            padding: '3px 8px',
                            color: '#FFFFFF',
                            fontWeight: 900,
                            fontSize: '0.72rem'
                          }}
                        >
                          {card.badge || 'Acceso Directo'}
                        </div>
                      </div>

                      {card.description && (
                        <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.45, marginBottom: '12px' }}>
                          {card.description}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (isPomodoro) {
                            if (pomodoroContext?.openModal) pomodoroContext.openModal();
                          } else if (card.target) {
                            if (onClose) onClose();
                            navigate(card.target);
                          }
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          background: '#FFFFFF',
                          border: '1.5px solid #FFFFFF',
                          borderBottom: '3px solid rgba(0, 0, 0, 0.25)',
                          color: card.badgeColor || '#1D4ED8',
                          fontWeight: 900,
                          fontSize: '0.84rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Sparkles size={16} />
                        <span>{card.ctaLabel ? card.ctaLabel.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim() : 'Acceder al Origen'}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  );
                })()
              )}

              {/* Tarjetas de Redirección y Acciones Rápidas Complementarias */}
              {isOrstty && Array.isArray(msg.actions) && msg.actions.length > 0 && (!msg.originCard || msg.actions.length > 1) && (
                <div 
                  style={{ 
                    marginTop: '8px', 
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', fontWeight: 800, color: '#A78BFA', textTransform: 'uppercase' }}>
                    <Compass size={12} />
                    <span>Otras opciones disponibles</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px', width: '100%', boxSizing: 'border-box' }}>
                    {msg.actions.map((act, actIdx) => {
                      const isVocational = act.type === 'VOCATIONAL_TEST' || act.target === 'VOCATIONAL_TEST';
                      const isAprender = act.target?.includes('/aprender');
                      const isCursos = act.target?.includes('/cursos');
                      const isBiblio = act.target?.includes('/biblioteca');
                      const isSimulador = act.target?.includes('/simulador');

                      let bgGrad = 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(99, 102, 241, 0.15))';
                      let borderColor = 'rgba(124, 58, 237, 0.4)';
                      let textColor = '#DDD6FE';
                      let ActIcon = Zap;

                      if (isVocational) {
                        bgGrad = 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.2))';
                        borderColor = 'rgba(168, 85, 247, 0.5)';
                        textColor = '#F5D0FE';
                        ActIcon = Compass;
                      } else if (isAprender) {
                        bgGrad = 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(147, 51, 234, 0.15))';
                        borderColor = 'rgba(168, 85, 247, 0.45)';
                        textColor = '#E9D5FF';
                        ActIcon = BookOpen;
                      } else if (isCursos) {
                        bgGrad = 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(14, 165, 233, 0.15))';
                        borderColor = 'rgba(56, 189, 248, 0.45)';
                        textColor = '#BAE6FD';
                        ActIcon = Video;
                      } else if (isBiblio) {
                        bgGrad = 'linear-gradient(135deg, rgba(52, 211, 153, 0.25), rgba(16, 185, 129, 0.15))';
                        borderColor = 'rgba(52, 211, 153, 0.45)';
                        textColor = '#A7F3D0';
                        ActIcon = Library;
                      } else if (isSimulador) {
                        bgGrad = 'linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.15))';
                        borderColor = 'rgba(251, 191, 36, 0.45)';
                        textColor = '#FDE68A';
                        ActIcon = Trophy;
                      }

                      return (
                        <button
                          key={actIdx}
                          type="button"
                          onClick={() => handleExecuteAction(act)}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '10px',
                            background: isLight ? '#FFFFFF' : bgGrad,
                            border: isLight ? '1.5px solid #CBD5E1' : `1.5px solid ${borderColor}`,
                            color: isLight ? '#0F172A' : textColor,
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.15s ease',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 800, fontSize: '0.78rem' }}>
                              <ActIcon size={13} />
                              <span>{act.label ? act.label.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim() : 'Abrir sección'}</span>
                            </div>
                            <ArrowRight size={12} style={{ opacity: 0.8, flexShrink: 0 }} />
                          </div>
                          {act.description && (
                            <div style={{ fontSize: '0.68rem', color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.85)', lineHeight: 1.25 }}>
                              {act.description}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tarjeta de Pregunta Quiz Interactiva (si Gemini generó una) */}
              {isOrstty && msg.quizQuestion && (
                <div 
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    padding: '12px',
                    borderRadius: '14px',
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1.5px solid rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <HelpCircle size={14} color="#A78BFA" />
                    <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#A78BFA', textTransform: 'uppercase' }}>
                      Prueba Rápida UNSA
                    </span>
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '0.82rem', fontWeight: 700, color: '#F8FAFC' }}>
                    {msg.quizQuestion.question}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {(msg.quizQuestion.options || []).map((opt, optIdx) => {
                      const hasAnswered = quizAnswers[msg.id] !== undefined;
                      const isSelected = quizAnswers[msg.id] === optIdx;
                      const isCorrect = optIdx === msg.quizQuestion.correctIndex;

                      let btnBg = 'rgba(255, 255, 255, 0.06)';
                      let btnBorder = '1px solid rgba(255, 255, 255, 0.12)';
                      let btnColor = '#F1F5F9';

                      if (hasAnswered) {
                        if (isCorrect) {
                          btnBg = 'rgba(16, 185, 129, 0.25)';
                          btnBorder = '1.5px solid #10B981';
                          btnColor = '#34D399';
                        } else if (isSelected) {
                          btnBg = 'rgba(239, 68, 68, 0.25)';
                          btnBorder = '1.5px solid #EF4444';
                          btnColor = '#F87171';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => {
                            setQuizAnswers(prev => ({ ...prev, [msg.id]: optIdx }));
                          }}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '10px',
                            background: btnBg,
                            border: btnBorder,
                            color: btnColor,
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            textAlign: 'left',
                            cursor: hasAnswered ? 'default' : 'pointer',
                            transition: 'all 0.15s ease',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          {String.fromCharCode(65 + optIdx)}) {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswers[msg.id] !== undefined && (
                    <div style={{ 
                      marginTop: '8px', 
                      padding: '8px', 
                      borderRadius: '8px', 
                      background: 'rgba(124, 58, 237, 0.12)', 
                      fontSize: '0.72rem', 
                      color: '#DDD6FE' 
                    }}>
                      <strong>Explicación:</strong> {msg.quizQuestion.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Botones de Sugerencias de Seguimiento en Carrusel Horizontal */}
              {isOrstty && Array.isArray(msg.suggestions) && msg.suggestions.length > 0 && (
                <div
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    gap: '6px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch',
                    paddingBottom: '2px'
                  }}
                >
                  {msg.suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleSendMessage(sug)}
                      disabled={isProcessing}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '99px',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(139, 92, 246, 0.35)',
                        background: isLight ? '#EDE9FE' : 'rgba(124, 58, 237, 0.15)',
                        color: isLight ? '#6D28D9' : '#DDD6FE',
                        fontSize: '0.74rem',
                        fontWeight: 750,
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Indicador de estado "Pensando" o "Escuchando por voz" */}
        {isListening && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px', width: '100%', boxSizing: 'border-box' }}>
            <OrsttyAvatar state={ORSTTY_STATES.THINKING} size={28} showBadge={false} />
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '16px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1.5px solid #EF4444',
                fontSize: '0.78rem',
                color: '#F87171',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Radio size={14} className="animate-pulse" />
              <span>{voiceTranscript ? `"${voiceTranscript}"` : 'Escuchando... Háblale a ORSTTY'}</span>
            </div>
          </div>
        )}

        {isProcessing && !isListening && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px', width: '100%', boxSizing: 'border-box' }}>
            <OrsttyAvatar state={engineState} size={28} showBadge={false} />
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '16px',
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontSize: '0.78rem',
                color: '#C4B5FD',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>ORSTTY está pensando con Gemini...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} style={{ height: '1px' }} />
      </div>

      {/* Sugerencias Rápidas Iniciales (solo si no hay mensajes o no tienen sugerencias internas) */}
      {(messages.length === 0 || (messages.length === 1 && (!messages[0]?.suggestions || messages[0].suggestions.length === 0))) && (
        <div
          style={{
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            borderTop: '1px solid rgba(124, 58, 237, 0.15)',
            scrollbarWidth: 'none',
            flexShrink: 0,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {QUICK_STARTERS.map((qs, qIdx) => {
            const StarterIcon = qs.icon;
            return (
              <button
                key={qIdx}
                type="button"
                onClick={() => handleSendMessage(qs.query || qs.label)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '10px',
                  background: 'rgba(124, 58, 237, 0.12)',
                  border: '1px solid rgba(124, 58, 237, 0.25)',
                  color: '#DDD6FE',
                  fontSize: '0.73rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {StarterIcon && <StarterIcon size={12} color="#A78BFA" />}
                <span>{qs.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Notificación de feedback de reporte de IA (Google Play Generative AI Policy) */}
      {reportFeedback && (
        <div style={{
          padding: '6px 12px',
          background: 'rgba(239, 68, 68, 0.15)',
          borderTop: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#F87171',
          fontSize: '0.72rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <CheckCircle2 size={13} color="#EF4444" />
          <span>{reportFeedback}</span>
        </div>
      )}

      {/* Barra de Entrada / Formulario Estilo Cápsula */}
      <div
        style={{
          padding: '8px 12px max(8px, env(safe-area-inset-bottom))',
          background: isLight ? '#FFFFFF' : 'var(--bg-main, #0B0F19)',
          borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
          flexShrink: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 6px 4px 12px',
            borderRadius: '28px',
            background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(124, 58, 237, 0.25)',
            boxSizing: 'border-box'
          }}
        >
          {/* Input de texto */}
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Pregunta a ${apodoActual}...`}
            disabled={isProcessing}
            style={{
              flex: 1,
              minWidth: 0,
              padding: '8px 4px',
              border: 'none',
              background: 'transparent',
              color: isLight ? '#0F172A' : 'var(--text-main, #F8FAFC)',
              fontSize: '0.86rem',
              outline: 'none'
            }}
          />

          {/* Botón Enviar */}
          <button
            type="submit"
            disabled={!inputVal.trim() || isProcessing}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: 'none',
              background: inputVal.trim() && !isProcessing
                ? 'linear-gradient(135deg, #7C3AED, #9333EA)'
                : (isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)'),
              color: inputVal.trim() && !isProcessing ? '#FFFFFF' : (isLight ? '#94A3B8' : 'rgba(255, 255, 255, 0.3)'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputVal.trim() && !isProcessing ? 'pointer' : 'default',
              flexShrink: 0,
              boxShadow: inputVal.trim() && !isProcessing ? '0 2px 8px rgba(124, 58, 237, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Send size={15} />
          </button>
        </form>

        {/* Disclaimer discreto */}
        <p style={{ margin: '5px 0 0', fontSize: '0.62rem', color: isLight ? '#94A3B8' : 'rgba(255, 255, 255, 0.45)', textAlign: 'center' }}>
          ORSTTY es una IA y puede tener imprecisiones. Verifica datos clave en tu material oficial.
        </p>
      </div>

      {/* Modal interactivo del Test Vocacional Oficial UNSA */}
      <VocationalTestModal 
        isOpen={showVocationalModal} 
        onClose={() => setShowVocationalModal(false)} 
      />
    </div>
  );
}
