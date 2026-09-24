// src/components/MiRachaModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Award, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { useNavigate } from 'react-router-dom';
import { DuolingoFlameIcon } from './DuolingoFlameIcon';

export function MiRachaModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { streak, streakFreeze, xp, level, currentLevelProgress, completedLessons } = useGamification();

  if (!isOpen) return null;

  const currentStreak = streak || 1;
  const freezeCount = streakFreeze !== undefined ? streakFreeze : 1;
  const completedCount = Object.keys(completedLessons || {}).length;

  // Calculate next protected streak milestone (multiples of 3 days)
  const currentCycleProgress = currentStreak % 3;
  const daysToNextProtection = currentCycleProgress === 0 ? 3 : 3 - currentCycleProgress;
  const totalProtectionsEarned = Math.floor(currentStreak / 3);
  const nextMilestoneDay = (Math.floor(currentStreak / 3) + 1) * 3;

  // Generate 7-day mini calendar representing the current week
  const daysOfWeek = [
    { label: 'Lun', dayNum: 1 },
    { label: 'Mar', dayNum: 2 },
    { label: 'Mié', dayNum: 3 },
    { label: 'Jue', dayNum: 4 },
    { label: 'Vie', dayNum: 5 },
    { label: 'Sáb', dayNum: 6 },
    { label: 'Dom', dayNum: 7 }
  ];

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  // 3-Day Protection Cycle Milestones for the calendar view
  // Shows a 9-day cycle tracker centered around the user's progress
  const cycleBase = Math.floor((Math.max(1, currentStreak) - 1) / 3) * 3;
  const cycleDays = [
    { day: cycleBase + 1, isMilestone: false },
    { day: cycleBase + 2, isMilestone: false },
    { day: cycleBase + 3, isMilestone: true },
    { day: cycleBase + 4, isMilestone: false },
    { day: cycleBase + 5, isMilestone: false },
    { day: cycleBase + 6, isMilestone: true }
  ];

  const handleGoStudy = () => {
    onClose();
    navigate('/aprender');
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000200,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 0,
          paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '520px',
            maxHeight: '92vh',
            background: 'var(--card-bg, #FFFFFF)',
            color: 'var(--text-main, #0F172A)',
            borderTopLeftRadius: '28px',
            borderTopRightRadius: '28px',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Mobile Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '4px', background: 'rgba(120, 120, 128, 0.3)' }} />
          </div>

          {/* Modal Header */}
          <div
            style={{
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DuolingoFlameIcon size={22} active={true} animated={true} />
              <span style={{ fontSize: '0.86rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F97316' }}>
                Calendario de Racha
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(120, 120, 128, 0.15)',
                color: 'var(--text-main, #0F172A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: '0 20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {/* Animated Duolingo Style Vector Flame */}
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 100%)',
                border: '2px solid #FDBA74',
                boxShadow: '0 8px 30px rgba(249, 115, 22, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                position: 'relative'
              }}
            >
              <DuolingoFlameIcon size={68} active={true} animated={true} />
            </div>

            {/* Title & Streak days */}
            <h2 style={{ margin: '0 0 4px', fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)' }}>
              {currentStreak} {currentStreak === 1 ? 'Día de Racha' : 'Días de Racha'}
            </h2>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '340px' }}>
              ¡Cada día de estudio activo alimenta tu constancia y protege tu avance hacia el ingreso!
            </p>

            {/* 3-Day Protected Streak Banner */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                border: '1.5px solid rgba(2, 132, 199, 0.25)',
                borderRadius: '16px',
                padding: '12px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
                boxSizing: 'border-box'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(2, 132, 199, 0.15)',
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284C7',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0284C7' }}>
                  Racha Protegida cada 3 días
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {daysToNextProtection === 3 
                    ? '¡Día de protección alcanzado! Tienes tu racha blindada.'
                    : `Estudia ${daysToNextProtection} ${daysToNextProtection === 1 ? 'día más' : 'días más'} para desbloquear tu siguiente congelador (Día ${nextMilestoneDay}).`}
                </div>
              </div>
            </div>

            {/* Streak Calendar: 3-Day Cycle Tracker */}
            <div
              style={{
                width: '100%',
                background: 'rgba(120, 120, 128, 0.05)',
                border: '1px solid var(--card-border)',
                borderRadius: '18px',
                padding: '16px',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} /> Calendario de Racha y Protección
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284C7', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <ShieldCheck size={12} /> Hito cada 3 días
                </span>
              </div>

              {/* Cycle nodes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                {cycleDays.map((item) => {
                  const isDone = item.day <= currentStreak;
                  const isCurrent = item.day === currentStreak;
                  const isNextMilestone = item.isMilestone && !isDone && item.day === nextMilestoneDay;

                  return (
                    <div
                      key={item.day}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isCurrent ? '#F97316' : item.isMilestone ? '#0284C7' : 'var(--text-secondary)' }}>
                        Día {item.day}
                      </span>
                      <div
                        style={{
                          width: '100%',
                          height: '46px',
                          borderRadius: '12px',
                          background: item.isMilestone && isDone
                            ? 'linear-gradient(180deg, #0284C7 0%, #0369A1 100%)'
                            : item.isMilestone
                            ? 'rgba(2, 132, 199, 0.12)'
                            : isCurrent 
                            ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)'
                            : isDone
                            ? 'rgba(249, 115, 22, 0.15)'
                            : 'rgba(120, 120, 128, 0.08)',
                          border: item.isMilestone
                            ? `2px solid ${isDone ? '#0284C7' : '#38BDF8'}`
                            : isCurrent 
                            ? '2px solid #C2410C'
                            : isDone
                            ? '1.5px solid rgba(249, 115, 22, 0.3)'
                            : '1px solid var(--card-border)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isCurrent || (item.isMilestone && isDone) ? '#FFFFFF' : isDone ? '#EA580C' : 'var(--text-secondary)',
                          position: 'relative'
                        }}
                      >
                        {item.isMilestone ? (
                          <ShieldCheck size={18} />
                        ) : isDone ? (
                          <Flame size={16} fill={isCurrent ? '#FFFFFF' : '#F97316'} />
                        ) : (
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, opacity: 0.4 }}>-</span>
                        )}
                      </div>
                      {item.isMilestone && (
                        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: isDone ? '#059669' : '#0284C7' }}>
                          {isDone ? 'Protegido' : 'Escudo'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Streak Freeze & Stats Cards */}
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
              {/* Freeze Protection */}
              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1.5px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: '16px',
                  padding: '12px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284C7',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#0284C7' }}>
                    {freezeCount} {freezeCount === 1 ? 'Congelador' : 'Congeladores'}
                  </div>
                  <div style={{ fontSize: '0.70rem', color: 'var(--text-secondary)' }}>
                    Racha protegida
                  </div>
                </div>
              </div>

              {/* Total XP / Stats */}
              <div
                style={{
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1.5px solid rgba(168, 85, 247, 0.25)',
                  borderRadius: '16px',
                  padding: '12px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(168, 85, 247, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9333EA',
                    flexShrink: 0
                  }}
                >
                  <Zap size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#9333EA' }}>
                    {xp || 0} XP
                  </div>
                  <div style={{ fontSize: '0.70rem', color: 'var(--text-secondary)' }}>
                    Nivel {level || 1}
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational message */}
            <div
              style={{
                width: '100%',
                background: 'rgba(249, 115, 22, 0.08)',
                borderRadius: '14px',
                padding: '12px 14px',
                marginBottom: '18px',
                borderLeft: '4px solid #F97316',
                textAlign: 'left',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.45,
                boxSizing: 'border-box'
              }}
            >
              <strong style={{ color: '#EA580C', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                <Sparkles size={14} /> Constancia Preuniversitaria:
              </strong>
              Estudiar 10 minutos al día mantiene tu racha viva. Al completar ciclos de 3 días consecutivos ganas un congelador automático para no perder tu progreso.
            </div>

            {/* Call to action button */}
            <button
              type="button"
              onClick={handleGoStudy}
              className="duo-btn-3d"
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(249, 115, 22, 0.35)'
              }}
            >
              <Sparkles size={18} /> Continuar Estudiando Hoy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
