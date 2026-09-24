import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Flag, 
  ExternalLink, 
  Sparkles, 
  X, 
  AlertTriangle, 
  CheckCircle,
  HardDrive,
  Users,
  EyeOff,
  PenTool,
  Crown,
  Tv,
  FileCheck2,
  Mail,
  Scale,
  ShieldAlert,
  Award,
  BookOpen,
  UserCheck,
  Ban,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      num: '1',
      icon: CheckCircle,
      color: '#10B981',
      title: 'Aceptación de los Términos',
      content: 'Al acceder o usar la aplicación y plataforma RASTRO ("el Servicio") aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, no debes utilizar el Servicio. Si eres menor de edad, necesitas la autorización de tu padre, madre o tutor legal para usar RASTRO.'
    },
    {
      num: '2',
      icon: BookOpen,
      color: '#3B82F6',
      title: 'Naturaleza y Propósito del Servicio',
      content: 'RASTRO es una herramienta digital de apoyo académico: banco de preguntas, simulacros cronometrados, resúmenes teóricos y gamificación orientada a la preparación para exámenes de admisión universitaria. Es una plataforma independiente, sin afiliación oficial con la Universidad Nacional de San Agustín (UNSA), CEPREUNSA u otras instituciones, salvo que se indique expresamente. El contenido de exámenes pasados y el material de referencia se usa con fines estrictamente pedagógicos.'
    },
    {
      num: '3',
      icon: Users,
      color: '#8B5CF6',
      title: 'Registro y Cuentas de Usuario',
      content: 'Debes brindar información verídica y mantener en resguardo tus credenciales de acceso. Cada cuenta es personal e intransferible: está prohibido compartirla, venderla o usar bots y scrapers para extraer de forma masiva el banco de preguntas.'
    },
    {
      num: '4',
      icon: ShieldCheck,
      color: '#F59E0B',
      title: 'Propiedad Intelectual',
      content: 'La interfaz, el software, los algoritmos de simulación, la marca y los contenidos de RASTRO son propiedad de sus desarrolladores. El material aportado por la comunidad queda sujeto a moderación para respetar los derechos de autor vigentes. Se prohíbe su reproducción total o parcial con fines comerciales no autorizados.'
    },
    {
      num: '5',
      icon: Award,
      color: '#EC4899',
      title: 'Gamificación y Métricas',
      content: 'Puntuaciones, rankings, rachas de estudio y gemas se calculan mediante algoritmos internos para medir tu progreso y fomentar el hábito de estudio. Tu posición en el ranking es referencial: no garantiza un resultado equivalente en los procesos de admisión oficiales.'
    },
    {
      num: '6',
      icon: UserCheck,
      color: '#06B6D4',
      title: 'Conducta de la Comunidad',
      content: 'En chats y foros debes mantener un trato respetuoso. Está prohibido el acoso, la difusión de contenido ofensivo, el spam, la suplantación de identidad o cualquier uso ilícito de los espacios comunitarios.'
    },
    {
      num: '7',
      icon: Lock,
      color: '#10B981',
      title: 'Privacidad y Datos Personales',
      content: 'Recopilamos datos básicos —correo electrónico, nombre de perfil, estadísticas de progreso y respuestas en simulacros— únicamente para personalizar tu experiencia y guardar tu avance. No vendemos tus datos a terceros. El detalle completo está en nuestra Política de Privacidad.'
    },
    {
      num: '8',
      icon: Ban,
      color: '#EF4444',
      title: 'Suspensión y Terminación de Cuenta',
      content: 'Podemos suspender o cancelar cuentas que incumplan estos Términos, sin perjuicio de las acciones legales que correspondan.'
    },
    {
      num: '9',
      icon: AlertTriangle,
      color: '#F97316',
      title: 'Limitación de Responsabilidad',
      content: 'Nos esforzamos por mantener la máxima precisión en el banco de preguntas y las soluciones explicadas. No respondemos por fallas técnicas imprevistas, cortes de conectividad ajenos a la plataforma o interpretaciones erróneas del material. Puedes reportar cualquier errata desde el botón de reporte dentro de la app.'
    },
    {
      num: '10',
      icon: Scale,
      color: '#6366F1',
      title: 'Modificaciones de los Términos',
      content: 'Podemos actualizar estos Términos para adaptarnos a nuevas funcionalidades o cambios normativos. Te notificaremos los cambios relevantes dentro de la Plataforma.'
    },
    {
      num: '11',
      icon: Building2,
      color: '#64748B',
      title: 'Ley Aplicable',
      content: 'Estos Términos se rigen por las leyes de la República del Perú.'
    },
    {
      num: '12',
      icon: Mail,
      color: '#3B82F6',
      title: 'Contacto',
      content: '¿Dudas, sugerencias o consultas legales? Escríbenos a aguilar.jonsu@gmail.com o a través de la sección de soporte dentro de la app.'
    }
  ];

  return (
    <AnimatePresence>
      <div 
        className="ios-modal-backdrop" 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000150,
          padding: '16px',
          boxSizing: 'border-box'
        }}
      >
        <motion.div
          className="ios-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.93, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 25 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          style={{
            background: 'var(--card-bg)',
            border: '1.5px solid var(--card-border)',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '740px',
            maxHeight: 'min(90dvh, 760px)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 30px 70px rgba(0,0,0,0.45), 0 10px 24px rgba(0,0,0,0.25)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '22px 26px 18px',
            borderBottom: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(120, 120, 128, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(139, 92, 246, 0.16))',
                border: '1.5px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-color, #3B82F6)'
              }}>
                <FileText size={24} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  Términos y Condiciones de Uso
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  RASTRO • Última actualización: septiembre de 2026
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(120, 120, 128, 0.12)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.18s ease'
              }}
              title="Cerrar ventana"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Scrollable */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: 'var(--text-main)',
            WebkitOverflowScrolling: 'touch'
          }}>

            {/* Quick Index Pill List */}
            <div style={{
              padding: '14px 16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08))',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color, #3B82F6)' }}>
                Contenido del Documento
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {sections.map(s => (
                  <span 
                    key={s.num} 
                    style={{ 
                      fontSize: '0.74rem', 
                      background: 'rgba(120, 120, 128, 0.12)', 
                      padding: '3px 9px', 
                      borderRadius: '8px', 
                      fontWeight: 600,
                      color: 'var(--text-main)' 
                    }}
                  >
                    {s.num}. {s.title}
                  </span>
                ))}
              </div>
            </div>

            {/* 12 Sections */}
            {sections.map(s => {
              const IconComp = s.icon;
              return (
                <section 
                  key={s.num} 
                  style={{
                    background: 'rgba(120, 120, 128, 0.05)',
                    borderRadius: '18px',
                    padding: '16px 18px',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: `${s.color}20`,
                      color: s.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.82rem'
                    }}>
                      <IconComp size={16} />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {s.num}. {s.title}
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {s.content}
                  </p>
                </section>
              );
            })}

            {/* Enlace para leer políticas completas */}
            <div style={{ textAlign: 'center', padding: '10px 0 4px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
              <Link
                to="/politicas"
                onClick={onClose}
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--accent-color, #3B82F6)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Ver también: Política de Privacidad completa</span>
                <ExternalLink size={14} />
              </Link>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                © 2026 RASTRO. Todos los derechos reservados.
              </span>
            </div>

          </div>

          {/* Footer with Action Button */}
          <div style={{
            padding: '16px 26px 20px',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(120, 120, 128, 0.04)',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} style={{ color: '#3B82F6' }} />
              <span>Plataforma de autoestudio transparente y segura.</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              style={{
                padding: '12px 28px',
                borderRadius: '14px',
                border: 'none',
                background: 'var(--accent-color, #3B82F6)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(59, 130, 246, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle size={18} />
              <span>Aceptar y Continuar</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TermsModal;
