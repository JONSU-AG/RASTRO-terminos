import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Mail, 
  Trash2, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  HardDrive,
  EyeOff,
  UserCheck,
  Server,
  Send,
  Sparkles,
  Cloud,
  BookOpen,
  MessageSquare,
  Scale,
  Smartphone,
  CheckCircle2,
  Clock,
  Flag,
  PenTool,
  ShieldAlert,
  Ban,
  FileCheck2,
  Crown,
  Tv
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export const PoliticasPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la pestaña inicial según la URL (/politicas, /privacidad, /terminos o hash)
  const getInitialTab = () => {
    const path = location.pathname.toLowerCase();
    const hash = (location.hash || '').replace('#', '').toLowerCase();
    if (hash === 'terminos' || path.includes('terminos')) return 'terminos';
    if (hash === 'autoria' || hash === 'cursos' || hash === 'aprender') return 'autoria';
    if (hash === 'ia' || hash === 'orstty') return 'ia';
    if (hash === 'deslinde' || hash === 'legal') return 'deslinde';
    if (hash === 'eliminar' || hash === 'borrar') return 'eliminar';
    return 'privacidad';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteSubmitted, setDeleteSubmitted] = useState(false);

  useEffect(() => {
    const tab = getInitialTab();
    setActiveTab(tab);
  }, [location.pathname, location.hash]);

  const handleSubmitDeletion = (e) => {
    e.preventDefault();
    if (!deleteEmail.trim()) return;
    
    // Generar mailto con datos prellenados
    const subject = encodeURIComponent("Solicitud de Eliminación de Cuenta y Datos - RASTRO");
    const body = encodeURIComponent(`Hola equipo de RASTRO,\n\nSolicito formalmente la eliminación definitiva de mi cuenta de usuario y todos mis datos personales asociados a la aplicación RASTRO (com.jonsuapps.rastro).\n\nCorreo registrado: ${deleteEmail.trim()}\nMotivo (opcional): ${deleteReason.trim() || 'No especificado'}\n\nEntiendo que esta acción es permanente e irreversible.`);
    
    window.location.href = `mailto:aguilar.jonsu@gmail.com?subject=${subject}&body=${body}`;
    setDeleteSubmitted(true);
  };

  const TABS = [
    { id: 'privacidad', label: 'Privacidad y Datos', icon: ShieldCheck, color: '#3B82F6' },
    { id: 'terminos', label: 'Términos y Moderación UGC', icon: FileText, color: '#10B981' },
    { id: 'autoria', label: 'Cursos, Aprender y CEPREUNSA', icon: PenTool, color: '#8B5CF6' },
    { id: 'ia', label: 'Políticas de IA (ORSTTY)', icon: Sparkles, color: '#EC4899' },
    { id: 'deslinde', label: 'Deslinde Legal & DMCA', icon: Scale, color: '#F59E0B' },
    { id: 'eliminar', label: 'Eliminar Cuenta', icon: Trash2, color: '#EF4444' }
  ];

  return (
    <div className="page-container" style={{ maxWidth: '940px', margin: '0 auto', padding: '28px 20px 120px' }}>
      {/* Barra Superior con Botón Volver */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          className="ios-glass-card"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '16px',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            color: 'var(--text-main)',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={16} /> Volver a RASTRO
        </button>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Términos Generales y Condiciones de Uso
        </span>
      </div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="ios-glass-card"
        style={{
          padding: '36px 24px',
          borderRadius: '28px',
          background: 'var(--card-bg)',
          border: '1.5px solid var(--card-border)',
          marginBottom: '24px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
          border: '1.5px solid rgba(59, 130, 246, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-color, #3B82F6)',
          marginBottom: '14px'
        }}>
          <ShieldCheck size={36} />
        </div>
        
        <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '99px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
          Marco Legal y Condiciones del Servicio
        </div>

        <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          Términos, Privacidad y Condiciones de Uso
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Condiciones generales de servicio, tratamiento de información, exención de responsabilidad y normativas operativas aplicables a la plataforma <strong>RASTRO</strong>.
        </p>
        
        <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          <span style={{ padding: '3px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)' }}>
            Aplicación: <strong>RASTRO (com.jonsuapps.rastro)</strong>
          </span>
          <span style={{ padding: '3px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)' }}>
            Titularidad: <strong>Equipo RASTRO</strong>
          </span>
          <span style={{ padding: '3px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)' }}>
            Contacto Oficial: <strong>aguilar.jonsu@gmail.com</strong>
          </span>
        </div>
      </motion.div>

      {/* Selector de Pestañas Interactivo */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '20px',
        scrollbarWidth: 'none'
      }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.history.replaceState(null, '', `#${tab.id}`);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '16px',
                border: isActive ? `1.5px solid ${tab.color}` : '1px solid var(--card-border)',
                background: isActive ? `${tab.color}15` : 'var(--card-bg)',
                color: isActive ? tab.color : 'var(--text-secondary)',
                fontSize: '0.84rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <Icon size={16} color={isActive ? tab.color : 'currentColor'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido según Pestaña Activa */}
      <AnimatePresence mode="wait">
        
        {/* =========================================================
            PESTAÑA 1: POLÍTICAS DE PRIVACIDAD Y SEGURIDAD DE DATOS
           ========================================================= */}
        {activeTab === 'privacidad' && (
          <motion.div
            key="privacidad"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* 1. Responsable del Tratamiento */}
            <div className="ios-glass-card" style={{ padding: '26px', borderRadius: '24px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6' }}>
                  <Lock size={20} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  1. Responsable y Ámbito del Tratamiento
                </h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                La operación de la plataforma móvil y web <strong>RASTRO</strong> está a cargo del <strong>Equipo de RASTRO</strong> (contacto: <em>aguilar.jonsu@gmail.com</em>).
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Esta política establece el tratamiento de la información técnica y de usuario indispensable para la autenticación, sincronización del avance de estudio, funcionamiento de herramientas pedagógicas y seguridad del entorno digital.
              </p>
            </div>

            {/* 2. Información Tratada */}
            <div className="ios-glass-card" style={{ padding: '26px', borderRadius: '24px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981' }}>
                  <Server size={20} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  2. Información del Usuario y Seguridad
                </h2>
              </div>
              
              <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.7, margin: '0 0 16px' }}>
                <li><strong>Autenticación y Perfil:</strong> Nombre de usuario, dirección de correo electrónico y foto de perfil provenientes de los proveedores de inicio de sesión o registro para habilitar la sesión del estudiante en la plataforma.</li>
                <li><strong>Progreso Académico:</strong> Registro de actividades, resultados de práctica y métricas de estudio asociadas a la cuenta del usuario para personalizar su experiencia.</li>
                <li><strong>Preferencias del Dispositivo:</strong> Configuraciones locales del dispositivo empleadas para soporte de widgets, preferencias de interfaz y notificaciones locales.</li>
              </ul>

              <div style={{ padding: '14px 18px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <strong style={{ color: '#EF4444', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <EyeOff size={16} /> Principio de Minimización:
                </strong>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  RASTRO no solicita ni recopila datos sensibles, contactos personales, ubicación geográfica precisa en segundo plano ni información financiera sensible fuera de las pasarelas oficiales.
                </p>
              </div>
            </div>

            {/* 3. Servicios Externos de Almacenamiento */}
            <div className="ios-glass-card" style={{ padding: '26px', borderRadius: '24px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6' }}>
                  <Cloud size={20} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  3. Integraciones de Almacenamiento y Servicios Externos
                </h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                Cuando los usuarios deciden vincular servicios de almacenamiento externo (como Google Drive u otros proveedores en la nube) para respaldar o compartir sus materiales de estudio:
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                <li><strong>Gestión Delimitada:</strong> La aplicación únicamente gestiona los enlaces o archivos vinculados por la propia aplicación para fines académicos. RASTRO no inspecciona ni manipula archivos privados ajenos a las actividades formativas de la plataforma.</li>
                <li><strong>Control del Usuario:</strong> El usuario conserva el control sobre sus archivos en su respectivo proveedor de almacenamiento en la nube, pudiendo revocar accesos o cancelar enlaces en cualquier momento.</li>
              </ul>
            </div>

            {/* 4. Seguridad Técnica y Protección */}
            <div className="ios-glass-card" style={{ padding: '26px', borderRadius: '24px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(52, 199, 89, 0.12)', color: '#34C759' }}>
                  <CheckCircle2 size={20} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  4. Seguridad Técnica y Confidencialidad
                </h2>
              </div>
              <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                <li><strong>Cero Venta de Datos:</strong> RASTRO no vende ni comercializa bases de datos personales a terceros intermediarios.</li>
                <li><strong>Infraestructura Segura:</strong> Las transmisiones se realizan mediante protocolos de comunicación cifrada (TLS/HTTPS) y la información se almacena en proveedores de infraestructura tecnológica en la nube.</li>
                <li><strong>Uso Educativo:</strong> La plataforma está diseñada para postulantes y estudiantes con fines de autoestudio y formación académica.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* ========================================================================
            PESTAÑA 2: TÉRMINOS Y CONDICIONES GENERALES DE USO (12 SECCIONES)
           ======================================================================== */}
        {activeTab === 'terminos' && (
          <motion.div
            key="terminos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Header / Intro */}
            <div className="ios-glass-card" style={{ padding: '24px 26px', borderRadius: '24px', border: '1.5px solid rgba(59, 130, 246, 0.3)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ padding: '10px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6' }}>
                  <FileText size={22} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>
                    Términos y Condiciones de Uso
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Última actualización: septiembre de 2026
                  </span>
                </div>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                A continuación se detallan los 12 puntos que rigen el uso de la plataforma académica RASTRO.
              </p>
            </div>

            {/* 1. Aceptación */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981' }}>
                  <CheckCircle size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  1. ✅ Aceptación de los Términos
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Al acceder o usar la aplicación y plataforma RASTRO ("el Servicio") aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, no debes utilizar el Servicio. Si eres menor de edad, necesitas la autorización de tu padre, madre o tutor legal para usar RASTRO.
              </p>
            </div>

            {/* 2. Naturaleza del Servicio */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6' }}>
                  <BookOpen size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  2. 🎯 Naturaleza y Propósito del Servicio
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                RASTRO es una herramienta digital de apoyo académico: banco de preguntas, simulacros cronometrados, resúmenes teóricos y gamificación orientada a la preparación para exámenes de admisión universitaria. Es una plataforma independiente, sin afiliación oficial con la Universidad Nacional de San Agustín (UNSA), CEPREUNSA u otras instituciones, salvo que se indique expresamente. El contenido de exámenes pasados y el material de referencia se usa con fines estrictamente pedagógicos.
              </p>
            </div>

            {/* 3. Cuentas */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.12)', color: '#8B5CF6' }}>
                  <UserCheck size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  3. 👤 Registro y Cuentas de Usuario
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Debes brindar información verídica y mantener en resguardo tus credenciales de acceso. Cada cuenta es personal e intransferible: está prohibido compartirla, venderla o usar bots y scrapers para extraer de forma masiva el banco de preguntas.
              </p>
            </div>

            {/* 4. Propiedad Intelectual */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B' }}>
                  <ShieldCheck size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  4. 🛡️ Propiedad Intelectual
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                La interfaz, el software, los algoritmos de simulación, la marca y los contenidos de RASTRO son propiedad de sus desarrolladores. El material aportado por la comunidad queda sujeto a moderación para respetar los derechos de autor vigentes. Se prohíbe su reproducción total o parcial con fines comerciales no autorizados.
              </p>
            </div>

            {/* 5. Gamificación */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', color: '#EC4899' }}>
                  <Crown size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  5. 📊 Gamificación y Métricas
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Puntuaciones, rankings, rachas de estudio y gemas se calculan mediante algoritmos internos para medir tu progreso y fomentar el hábito de estudio. Tu posición en el ranking es referencial: no garantiza un resultado equivalente en los procesos de admisión oficiales.
              </p>
            </div>

            {/* 6. Conducta */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4' }}>
                  <MessageSquare size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  6. 🤝 Conducta de la Comunidad
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                En chats y foros debes mantener un trato respetuoso. Está prohibido el acoso, la difusión de contenido ofensivo, el spam, la suplantación de identidad o cualquier uso ilícito de los espacios comunitarios.
              </p>
            </div>

            {/* 7. Privacidad */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981' }}>
                  <Lock size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  7. 🔒 Privacidad y Datos Personales
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Recopilamos datos básicos —correo electrónico, nombre de perfil, estadísticas de progreso y respuestas en simulacros— únicamente para personalizar tu experiencia y guardar tu avance. No vendemos tus datos a terceros. El detalle completo está en nuestra pestaña de <button onClick={() => setActiveTab('privacidad')} style={{ background: 'none', border: 'none', color: '#3B82F6', fontWeight: 700, cursor: 'pointer', padding: 0 }}>Política de Privacidad</button>.
              </p>
            </div>

            {/* 8. Suspensión */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444' }}>
                  <Ban size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  8. 🚫 Suspensión y Terminación de Cuenta
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Podemos suspender o cancelar cuentas que incumplan estos Términos, sin perjuicio de las acciones legales que correspondan.
              </p>
            </div>

            {/* 9. Limitación */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.12)', color: '#F97316' }}>
                  <AlertTriangle size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  9. ⚖️ Limitación de Responsabilidad
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Nos esforzamos por mantener la máxima precisión en el banco de preguntas y las soluciones explicadas. No respondemos por fallas técnicas imprevistas, cortes de conectividad ajenos a la plataforma o interpretaciones erróneas del material. Puedes reportar cualquier errata desde el botón de reporte dentro de la app.
              </p>
            </div>

            {/* 10. Modificaciones */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.12)', color: '#6366F1' }}>
                  <Scale size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  10. 🔄 Modificaciones de los Términos
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Podemos actualizar estos Términos para adaptarnos a nuevas funcionalidades o cambios normativos. Te notificaremos los cambios relevantes dentro de la Plataforma.
              </p>
            </div>

            {/* 11. Ley Aplicable */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(100, 116, 139, 0.12)', color: '#64748B' }}>
                  <FileCheck2 size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  11. 🏛️ Ley Aplicable
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Estos Términos se rigen por las leyes de la República del Perú.
              </p>
            </div>

            {/* 12. Contacto */}
            <div className="ios-glass-card" style={{ padding: '20px 24px', borderRadius: '20px', border: '1.5px solid rgba(59, 130, 246, 0.35)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6' }}>
                  <Mail size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  12. 📧 Contacto
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                ¿Dudas, sugerencias o consultas legales? Escríbenos a <strong>aguilar.jonsu@gmail.com</strong> o a través de la sección de soporte dentro de la app.
              </p>
            </div>
          </motion.div>
        )}

        {/* ========================================================================
            PESTAÑA 3: ORIGEN Y RECOPILACIÓN FORMATIVA DE "CURSOS" Y "APRENDER"
           ======================================================================== */}
        {activeTab === 'autoria' && (
          <motion.div
            key="autoria"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className="ios-glass-card" style={{ padding: '30px', borderRadius: '26px', border: '1.5px solid rgba(139, 92, 246, 0.4)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ padding: '10px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.14)', color: '#8B5CF6' }}>
                  <PenTool size={22} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)' }}>
                    Origen, Recopilación y Metodología: "Cursos" y "Aprender"
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: '#8B5CF6', fontWeight: 700 }}>
                    Bancos de Preguntas CEPREUNSA, Sistematización Didáctica y Material de Consulta
                  </span>
                </div>
              </div>

              <div style={{ padding: '18px 20px', borderRadius: '18px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.25)', marginBottom: '18px' }}>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.65, fontWeight: 600 }}>
                  Los contenidos pedagógicos, bancos de preguntas y fichas de estudio de las secciones <strong>"Cursos"</strong> y <strong>"Aprender"</strong> corresponden a una <strong>recopilación, digitalización y organización técnica realizada por el Equipo de RASTRO</strong> a partir de los bancos oficiales de preguntas y temarios de preparación preuniversitaria de <strong>CEPREUNSA</strong>, complementados con resúmenes, esquemas didácticos e información formativa adicional de libre consulta para el autoestudio de los postulantes.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '14px 18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--card-border)' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '6px' }}>
                    1. Bancos de Preguntas de Exámenes y Prospectos CEPREUNSA
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Las preguntas de entrenamiento y simulacros provienen de la recopilación de prácticas y evaluaciones de ciclos pasados de CEPREUNSA y exámenes de admisión, estructuradas de forma interactiva para permitir la autoevaluación cronometrada del postulante.
                  </p>
                </div>

                <div style={{ padding: '14px 18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--card-border)' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '6px' }}>
                    2. Información Adicional, Resúmenes y Tarjetas de Repaso (Flashcards)
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    La teoría de soporte, fórmulas clave, conceptos esenciales y fichas nemotécnicas fueron organizadas y sintetizadas didácticamente para reforzar los temas clave de las áreas biomédicas, ingenierías y sociales.
                  </p>
                </div>

                <div style={{ padding: '14px 18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--card-border)' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '6px' }}>
                    3. Finalidad Formativa y Solidaria
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    La plataforma actúa como una herramienta pedagógica que clasifica y dinamiza la información académica para democratizar la preparación preuniversitaria, sin fines desleales y con pleno reconocimiento del origen formativo de los exámenes de admisión.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            PESTAÑA 4: POLÍTICAS DE IA (ORSTTY) - GOOGLE PLAY COMPLIANCE
           ========================================================= */}
        {activeTab === 'ia' && (
          <motion.div
            key="ia"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className="ios-glass-card" style={{ padding: '26px', borderRadius: '24px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.12)', color: '#EC4899' }}>
                  <Sparkles size={20} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Políticas de Inteligencia Artificial Generativa y Tutor ORSTTY
                </h2>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 14px' }}>
                En cumplimiento de las <strong>Políticas de Desarrolladores de Google Play para Apps con IA Generativa</strong>:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '16px', borderRadius: '18px', background: 'rgba(236, 72, 153, 0.06)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                  <strong style={{ color: '#EC4899', fontSize: '0.92rem', display: 'block', marginBottom: '6px' }}>
                    1. Enfoque Exclusivamente Académico y Orientador
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    ORSTTY responde dudas teóricas de asignaturas del prospecto universitario y guía en el Test Vocacional. Su prompt de sistema bloquea explícitamente contenido violento, sexual, discriminatorio o actividades peligrosas.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '18px', background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <strong style={{ color: '#EF4444', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Flag size={16} /> 2. Botón de Denuncia Integrado en Cada Respuesta ("Reportar IA")
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Cada mensaje emitido por ORSTTY cuenta con un botón directo de reporte (bandera). El usuario puede notificar con un toque cualquier respuesta errónea o inadecuada para la revisión y calibración continua de los filtros del tutor.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '18px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <strong style={{ color: '#10B981', fontSize: '0.92rem', display: 'block', marginBottom: '6px' }}>
                    3. Guía de Apoyo Complementaria
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Las respuestas de la IA son resúmenes orientativos y no sustituyen las claves oficiales de la comisión de admisión universitaria.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            PESTAÑA 5: DESLINDE LEGAL Y DERECHOS DE AUTOR (DMCA)
           ========================================================= */}
        {activeTab === 'deslinde' && (
          <motion.div
            key="deslinde"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className="ios-glass-card" style={{ padding: '26px', borderRadius: '24px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B' }}>
                  <AlertTriangle size={20} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Deslinde Institucional y Procedimiento de Retiro
                </h2>
              </div>

              <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.7, margin: '0 0 16px' }}>
                <li><strong>Independencia Institucional:</strong> RASTRO es una iniciativa estudiantil y tecnológica autónoma. <strong>No guarda vínculo oficial, patrocinio, afiliación ni convenio institucional con la Universidad Nacional de San Agustín de Arequipa (UNSA), CEPREUNSA ni academias privadas</strong>.</li>
                <li><strong>Citas Nominativas y Fines Formativos:</strong> La mención de áreas (Biomédicas, Ingenierías y Sociales), carreras y prospectos se realiza con fines informativos y pedagógicos para ayudar a la orientación del estudiante.</li>
              </ul>

              <div style={{ padding: '18px', borderRadius: '18px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                <strong style={{ color: '#F59E0B', fontSize: '0.94rem', display: 'block', marginBottom: '6px' }}>
                  Procedimiento de Retiro de Enlaces y Atención de Reclamos (Notice and Takedown)
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.55 }}>
                  Si un titular legítimo de derechos, institución o usuario identifica un material o enlace que requiera su retiro o desvinculación, puede remitir su solicitud directamente a:
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', background: 'var(--card-bg)', padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                  <Mail size={15} color="#F59E0B" /> aguilar.jonsu@gmail.com
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '10px 0 0', lineHeight: 1.5 }}>
                  Toda solicitud debidamente motivada es atendida con prioridad para la desvinculación inmediata del material.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            PESTAÑA 6: ELIMINACIÓN DE CUENTA Y DATOS (GOOGLE PLAY)
           ========================================================= */}
        {activeTab === 'eliminar' && (
          <motion.div
            key="eliminar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className="ios-glass-card" style={{ padding: '26px', borderRadius: '24px', border: '1.5px solid rgba(239, 68, 68, 0.35)', background: 'var(--card-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444' }}>
                  <Trash2 size={20} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Eliminación Definitiva de Cuenta y Datos Personales
                </h2>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px' }}>
                Conforme a la política de Google Play Store sobre <em>"Eliminación de cuentas de usuario"</em>, RASTRO ofrece dos métodos directos para la supresión permanente:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', borderRadius: '18px', background: 'rgba(120, 120, 128, 0.06)', border: '1px solid var(--card-border)' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '6px' }}>
                    Método 1: En la App Móvil
                  </strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Ingresa a tu <strong>Perfil</strong> ➔ Selecciona <strong>Ajustes</strong> ➔ Pulsa <strong>"Eliminar Cuenta"</strong>. Al confirmar, tu usuario, notas y progreso asociado se eliminarán de los registros de la plataforma.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '18px', background: 'rgba(120, 120, 128, 0.06)', border: '1px solid var(--card-border)' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '6px' }}>
                    Método 2: Vía Web o Correo Electrónico
                  </strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Completa el formulario inferior o escribe a <strong>aguilar.jonsu@gmail.com</strong> indicando el correo registrado en la aplicación. Tu solicitud será atendida y procesada oportunamente.
                  </p>
                </div>
              </div>

              {/* Formulario Web de Solicitud de Baja */}
              <form onSubmit={handleSubmitDeletion} style={{ padding: '20px', borderRadius: '18px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Formulario Web de Solicitud de Supresión de Datos
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="email"
                    required
                    placeholder="Ingresa tu correo registrado (ej: usuario@gmail.com)"
                    value={deleteEmail}
                    onChange={(e) => setDeleteEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      background: 'var(--card-bg)',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Motivo de la solicitud (opcional)"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      background: 'var(--card-bg)',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      borderRadius: '14px',
                      border: 'none',
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Send size={16} /> Enviar Solicitud de Supresión de Cuenta
                  </button>

                  {deleteSubmitted && (
                    <div style={{ fontSize: '0.84rem', color: '#10B981', fontWeight: 700, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={16} /> Solicitud enviada a aguilar.jonsu@gmail.com. Será atendida a la brevedad posible.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Tarjeta de Contacto y Soporte Oficial (Siempre visible al final) */}
      <div className="ios-glass-card" style={{ marginTop: '28px', padding: '26px', borderRadius: '24px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-color, #3B82F6)', marginBottom: '10px' }}>
          <Mail size={24} />
        </div>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Canal Oficial de Atención y Delegado de Privacidad
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 16px', maxWidth: '560px', marginInline: 'auto', lineHeight: 1.55 }}>
          Para ejercer derechos ARCO, dudas sobre la moderación de contenidos o consultas técnicas sobre RASTRO:
        </p>
        <a
          href="mailto:aguilar.jonsu@gmail.com"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '16px',
            background: 'var(--accent-color, #3B82F6)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.92rem',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)'
          }}
        >
          <Mail size={16} /> aguilar.jonsu@gmail.com
        </a>
      </div>

    </div>
  );
};

export default PoliticasPage;
