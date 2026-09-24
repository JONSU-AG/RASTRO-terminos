import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Atom, BookOpen, Layers, Beaker, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ELEMENTS_DATA = [
  // Periodo 1
  { num: 1, symbol: 'H', name: 'Hidrógeno', mass: '1.008', group: 1, period: 1, block: 's', category: 'No metal', valencias: ['+1', '-1'], color: '#EC4899' },
  { num: 2, symbol: 'He', name: 'Helio', mass: '4.003', group: 18, period: 1, block: 's', category: 'Gas noble', valencias: ['0'], color: '#8B5CF6' },
  // Periodo 2
  { num: 3, symbol: 'Li', name: 'Litio', mass: '6.94', group: 1, period: 2, block: 's', category: 'Alcalino', valencias: ['+1'], color: '#EF4444' },
  { num: 4, symbol: 'Be', name: 'Berilio', mass: '9.012', group: 2, period: 2, block: 's', category: 'Alcalinotérreo', valencias: ['+2'], color: '#F97316' },
  { num: 5, symbol: 'B', name: 'Boro', mass: '10.81', group: 13, period: 2, block: 'p', category: 'Metaloide', valencias: ['+3'], color: '#EAB308' },
  { num: 6, symbol: 'C', name: 'Carbono', mass: '12.011', group: 14, period: 2, block: 'p', category: 'No metal', valencias: ['+2', '+4', '-4'], color: '#EC4899' },
  { num: 7, symbol: 'N', name: 'Nitrógeno', mass: '14.007', group: 15, period: 2, block: 'p', category: 'No metal', valencias: ['+1', '+2', '+3', '+4', '+5', '-3'], color: '#EC4899' },
  { num: 8, symbol: 'O', name: 'Oxígeno', mass: '15.999', group: 16, period: 2, block: 'p', category: 'No metal', valencias: ['-2', '-1'], color: '#EC4899' },
  { num: 9, symbol: 'F', name: 'Flúor', mass: '18.998', group: 17, period: 2, block: 'p', category: 'Halógeno', valencias: ['-1'], color: '#06B6D4' },
  { num: 10, symbol: 'Ne', name: 'Neón', mass: '20.180', group: 18, period: 2, block: 'p', category: 'Gas noble', valencias: ['0'], color: '#8B5CF6' },
  // Periodo 3
  { num: 11, symbol: 'Na', name: 'Sodio', mass: '22.990', group: 1, period: 3, block: 's', category: 'Alcalino', valencias: ['+1'], color: '#EF4444' },
  { num: 12, symbol: 'Mg', name: 'Magnesio', mass: '24.305', group: 2, period: 3, block: 's', category: 'Alcalinotérreo', valencias: ['+2'], color: '#F97316' },
  { num: 13, symbol: 'Al', name: 'Aluminio', mass: '26.982', group: 13, period: 3, block: 'p', category: 'Metales del bloque p', valencias: ['+3'], color: '#10B981' },
  { num: 14, symbol: 'Si', name: 'Silicio', mass: '28.085', group: 14, period: 3, block: 'p', category: 'Metaloide', valencias: ['+4', '-4'], color: '#EAB308' },
  { num: 15, symbol: 'P', name: 'Fósforo', mass: '30.974', group: 15, period: 3, block: 'p', category: 'No metal', valencias: ['+3', '+5', '-3'], color: '#EC4899' },
  { num: 16, symbol: 'S', name: 'Azufre', mass: '32.06', group: 16, period: 3, block: 'p', category: 'No metal', valencias: ['+2', '+4', '+6', '-2'], color: '#EC4899' },
  { num: 17, symbol: 'Cl', name: 'Cloro', mass: '35.45', group: 17, period: 3, block: 'p', category: 'Halógeno', valencias: ['+1', '+3', '+5', '+7', '-1'], color: '#06B6D4' },
  { num: 18, symbol: 'Ar', name: 'Argón', mass: '39.95', group: 18, period: 3, block: 'p', category: 'Gas noble', valencias: ['0'], color: '#8B5CF6' },
  // Periodo 4
  { num: 19, symbol: 'K', name: 'Potasio', mass: '39.098', group: 1, period: 4, block: 's', category: 'Alcalino', valencias: ['+1'], color: '#EF4444' },
  { num: 20, symbol: 'Ca', name: 'Calcio', mass: '40.078', group: 2, period: 4, block: 's', category: 'Alcalinotérreo', valencias: ['+2'], color: '#F97316' },
  { num: 21, symbol: 'Sc', name: 'Escandio', mass: '44.956', group: 3, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+3'], color: '#3B82F6' },
  { num: 22, symbol: 'Ti', name: 'Titanio', mass: '47.867', group: 4, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3', '+4'], color: '#3B82F6' },
  { num: 23, symbol: 'V', name: 'Vanadio', mass: '50.942', group: 5, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3', '+4', '+5'], color: '#3B82F6' },
  { num: 24, symbol: 'Cr', name: 'Cromo', mass: '51.996', group: 6, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3', '+6'], color: '#3B82F6' },
  { num: 25, symbol: 'Mn', name: 'Manganeso', mass: '54.938', group: 7, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3', '+4', '+6', '+7'], color: '#3B82F6' },
  { num: 26, symbol: 'Fe', name: 'Hierro', mass: '55.845', group: 8, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3'], color: '#3B82F6' },
  { num: 27, symbol: 'Co', name: 'Cobalto', mass: '58.933', group: 9, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3'], color: '#3B82F6' },
  { num: 28, symbol: 'Ni', name: 'Níquel', mass: '58.693', group: 10, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3'], color: '#3B82F6' },
  { num: 29, symbol: 'Cu', name: 'Cobre', mass: '63.546', group: 11, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+1', '+2'], color: '#3B82F6' },
  { num: 30, symbol: 'Zn', name: 'Cinc', mass: '65.38', group: 12, period: 4, block: 'd', category: 'Metal de transición', valencias: ['+2'], color: '#3B82F6' },
  { num: 31, symbol: 'Ga', name: 'Galio', mass: '69.723', group: 13, period: 4, block: 'p', category: 'Metales del bloque p', valencias: ['+3'], color: '#10B981' },
  { num: 32, symbol: 'Ge', name: 'Germanio', mass: '72.630', group: 14, period: 4, block: 'p', category: 'Metaloide', valencias: ['+2', '+4'], color: '#EAB308' },
  { num: 33, symbol: 'As', name: 'Arsénico', mass: '74.922', group: 15, period: 4, block: 'p', category: 'Metaloide', valencias: ['+3', '+5', '-3'], color: '#EAB308' },
  { num: 34, symbol: 'Se', name: 'Selenio', mass: '78.971', group: 16, period: 4, block: 'p', category: 'No metal', valencias: ['+2', '+4', '+6', '-2'], color: '#EC4899' },
  { num: 35, symbol: 'Br', name: 'Bromo', mass: '79.904', group: 17, period: 4, block: 'p', category: 'Halógeno', valencias: ['+1', '+3', '+5', '+7', '-1'], color: '#06B6D4' },
  { num: 36, symbol: 'Kr', name: 'Kriptón', mass: '83.798', group: 18, period: 4, block: 'p', category: 'Gas noble', valencias: ['0'], color: '#8B5CF6' },
  // Periodo 5 & 6 (Selección Clave Exámenes de Admisión)
  { num: 37, symbol: 'Rb', name: 'Rubidio', mass: '85.468', group: 1, period: 5, block: 's', category: 'Alcalino', valencias: ['+1'], color: '#EF4444' },
  { num: 38, symbol: 'Sr', name: 'Estroncio', mass: '87.62', group: 2, period: 5, block: 's', category: 'Alcalinotérreo', valencias: ['+2'], color: '#F97316' },
  { num: 47, symbol: 'Ag', name: 'Plata', mass: '107.87', group: 11, period: 5, block: 'd', category: 'Metal de transición', valencias: ['+1'], color: '#3B82F6' },
  { num: 48, symbol: 'Cd', name: 'Cadmio', mass: '112.41', group: 12, period: 5, block: 'd', category: 'Metal de transición', valencias: ['+2'], color: '#3B82F6' },
  { num: 50, symbol: 'Sn', name: 'Estaño', mass: '118.71', group: 14, period: 5, block: 'p', category: 'Metales del bloque p', valencias: ['+2', '+4'], color: '#10B981' },
  { num: 51, symbol: 'Sb', name: 'Antimonio', mass: '121.76', group: 15, period: 5, block: 'p', category: 'Metaloide', valencias: ['+3', '+5'], color: '#EAB308' },
  { num: 53, symbol: 'I', name: 'Yodo', mass: '126.90', group: 17, period: 5, block: 'p', category: 'Halógeno', valencias: ['+1', '+3', '+5', '+7', '-1'], color: '#06B6D4' },
  { num: 54, symbol: 'Xe', name: 'Xenón', mass: '131.29', group: 18, period: 5, block: 'p', category: 'Gas noble', valencias: ['0'], color: '#8B5CF6' },
  { num: 55, symbol: 'Cs', name: 'Cesio', mass: '132.91', group: 1, period: 6, block: 's', category: 'Alcalino', valencias: ['+1'], color: '#EF4444' },
  { num: 56, symbol: 'Ba', name: 'Bario', mass: '137.33', group: 2, period: 6, block: 's', category: 'Alcalinotérreo', valencias: ['+2'], color: '#F97316' },
  { num: 74, symbol: 'W', name: 'Wolframio (Tungsteno)', mass: '183.84', group: 6, period: 6, block: 'd', category: 'Metal de transición', valencias: ['+2', '+3', '+4', '+5', '+6'], color: '#3B82F6' },
  { num: 78, symbol: 'Pt', name: 'Platino', mass: '195.08', group: 10, period: 6, block: 'd', category: 'Metal de transición', valencias: ['+2', '+4'], color: '#3B82F6' },
  { num: 79, symbol: 'Au', name: 'Oro', mass: '196.97', group: 11, period: 6, block: 'd', category: 'Metal de transición', valencias: ['+1', '+3'], color: '#3B82F6' },
  { num: 80, symbol: 'Hg', name: 'Mercurio', mass: '200.59', group: 12, period: 6, block: 'd', category: 'Metal de transición', valencias: ['+1', '+2'], color: '#3B82F6' },
  { num: 82, symbol: 'Pb', name: 'Plomo', mass: '207.2', group: 14, period: 6, block: 'p', category: 'Metales del bloque p', valencias: ['+2', '+4'], color: '#10B981' },
  { num: 83, symbol: 'Bi', name: 'Bismuto', mass: '208.98', group: 15, period: 6, block: 'p', category: 'Metales del bloque p', valencias: ['+3', '+5'], color: '#10B981' }
];

const CATEGORIES = [
  'Todos',
  'Alcalino',
  'Alcalinotérreo',
  'Metal de transición',
  'Metaloide',
  'Metales del bloque p',
  'No metal',
  'Halógeno',
  'Gas noble'
];

export function PeriodicTableModal({ isOpen = true, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState(ELEMENTS_DATA[0]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [mobileTab, setMobileTab] = useState('grid'); // 'grid' | 'detail'

  const filteredElements = useMemo(() => {
    return ELEMENTS_DATA.filter(el => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        el.name.toLowerCase().includes(q) || 
        el.symbol.toLowerCase().includes(q) ||
        el.num.toString() === q;
      const matchesCat = selectedCategory === 'Todos' || el.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectElement = (el) => {
    setSelectedElement(el);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileTab('detail');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        overflow: 'hidden'
      }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: '92vh',
          maxHeight: '850px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--card-border, rgba(16, 185, 129, 0.3))',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.55)',
          color: 'var(--text-main, #0F172A)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Responsivo con Gradiente Esmeralda */}
        <div 
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #059669 0%, #0D9488 50%, #047857 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Atom size={22} color="#FFFFFF" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 900, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Tabla Periódica & Valencias CEPREUNSA
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#D1FAE5', fontWeight: 500, opacity: 0.9 }}>
                Estados de oxidación, masas y nomenclatura oficial
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div 
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--card-border, rgba(0,0,0,0.08))',
            backgroundColor: 'var(--bg-main, #F8FAFC)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          {/* Input de Búsqueda */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px', flex: '1 1 200px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#059669', opacity: 0.8 }} />
            <input 
              type="text"
              placeholder="Buscar (ej. Fe, Au, Oxígeno, 26)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '34px',
                paddingRight: '28px',
                paddingTop: '8px',
                paddingBottom: '8px',
                fontSize: '0.8rem',
                borderRadius: '12px',
                border: '1px solid var(--card-border, rgba(0,0,0,0.15))',
                backgroundColor: 'var(--card-bg, #FFFFFF)',
                color: 'var(--text-main, #0F172A)',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Chips de Categorías */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '2px 0', maxWidth: '100%', alignItems: 'center' }}>
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    border: isActive ? 'none' : '1px solid var(--card-border, rgba(0,0,0,0.12))',
                    backgroundColor: isActive ? '#059669' : 'var(--card-bg, #FFFFFF)',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary, #64748B)'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pestañas de control en móvil (< 768px) */}
        <div 
          className="md:hidden"
          style={{ 
            display: 'flex', 
            borderBottom: '1px solid var(--card-border, rgba(0,0,0,0.08))',
            flexShrink: 0
          }}
        >
          <button
            type="button"
            onClick={() => setMobileTab('grid')}
            style={{
              flex: 1,
              padding: '10px 8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: 'none',
              borderBottom: mobileTab === 'grid' ? '2px solid #059669' : '2px solid transparent',
              color: mobileTab === 'grid' ? '#059669' : 'var(--text-secondary, #94A3B8)',
              backgroundColor: mobileTab === 'grid' ? 'rgba(5, 150, 105, 0.08)' : 'transparent',
              cursor: 'pointer'
            }}
          >
            <Layers size={14} /> Elementos ({filteredElements.length})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('detail')}
            style={{
              flex: 1,
              padding: '10px 8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: 'none',
              borderBottom: mobileTab === 'detail' ? '2px solid #059669' : '2px solid transparent',
              color: mobileTab === 'detail' ? '#059669' : 'var(--text-secondary, #94A3B8)',
              backgroundColor: mobileTab === 'detail' ? 'rgba(5, 150, 105, 0.08)' : 'transparent',
              cursor: 'pointer'
            }}
          >
            <Beaker size={14} /> Ficha: {selectedElement.symbol} ({selectedElement.name})
          </button>
        </div>

        {/* Cuerpo Principal */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          
          {/* Columna Izquierda: Grid de Elementos */}
          <div 
            style={{
              flex: '1 1 58%',
              padding: '14px',
              overflowY: 'auto',
              minHeight: 0,
              display: (mobileTab === 'detail' && typeof window !== 'undefined' && window.innerWidth < 768) ? 'none' : 'flex',
              flexDirection: 'column'
            }}
          >
            {filteredElements.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', color: '#94A3B8' }}>
                <Search size={36} style={{ marginBottom: '8px', opacity: 0.4 }} />
                <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>No se encontraron elementos</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
                  style={{ marginTop: '8px', fontSize: '0.75rem', color: '#059669', fontWeight: 800, background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: '8px' }}>
                {filteredElements.map(el => {
                  const isSelected = selectedElement.num === el.num;
                  return (
                    <button
                      key={el.num}
                      type="button"
                      onClick={() => handleSelectElement(el)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '12px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        border: isSelected ? '2px solid #059669' : '1px solid var(--card-border, rgba(0,0,0,0.08))',
                        backgroundColor: isSelected ? 'rgba(5, 150, 105, 0.12)' : 'var(--card-bg, #FFFFFF)',
                        minHeight: '76px',
                        boxShadow: isSelected ? '0 4px 12px rgba(5, 150, 105, 0.18)' : '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      {/* Top row: Z & Group */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary, #64748B)' }}>
                        <span style={{ fontWeight: 800 }}>{el.num}</span>
                        <span style={{ fontSize: '0.58rem', padding: '1px 3px', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.05)', fontWeight: 800 }}>
                          G{el.group}
                        </span>
                      </div>

                      {/* Middle: Symbol & Name */}
                      <div style={{ margin: '4px 0' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, display: 'block', lineHeight: 1, color: el.color || '#059669' }}>
                          {el.symbol}
                        </span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-main, #0F172A)', marginTop: '2px' }}>
                          {el.name}
                        </span>
                      </div>

                      {/* Bottom: Mass & Valences */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.62rem', paddingTop: '4px', borderTop: '1px solid rgba(0,0,0,0.06)', width: '100%' }}>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: 0.8, fontFamily: 'monospace', color: 'var(--text-secondary, #64748B)' }}>
                          {el.mass}
                        </span>
                        <span style={{ fontWeight: 900, fontFamily: 'monospace', color: '#059669' }}>
                          {el.valencias[0]}{el.valencias.length > 1 ? `…` : ''}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Columna Derecha: Ficha Detallada & Valencias CEPREUNSA */}
          <div 
            style={{
              flex: '1 1 42%',
              borderLeft: '1px solid var(--card-border, rgba(0,0,0,0.08))',
              padding: '16px',
              overflowY: 'auto',
              minHeight: 0,
              display: (mobileTab === 'grid' && typeof window !== 'undefined' && window.innerWidth < 768) ? 'none' : 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-main, #F8FAFC)'
            }}
          >
            {selectedElement && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Header de la Ficha */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span 
                    style={{
                      padding: '4px 10px',
                      borderRadius: '99px',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      backgroundColor: `${selectedElement.color}20`,
                      color: selectedElement.color,
                      border: `1px solid ${selectedElement.color}40`
                    }}
                  >
                    {selectedElement.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 800, color: 'var(--text-secondary, #64748B)' }}>
                    Z = {selectedElement.num} (Periodo {selectedElement.period})
                  </span>
                </div>

                {/* Gran Bloque del Elemento */}
                <div 
                  style={{
                    padding: '20px',
                    borderRadius: '18px',
                    textAlign: 'center',
                    border: '1px solid var(--card-border, rgba(0,0,0,0.1))',
                    backgroundColor: 'var(--card-bg, #FFFFFF)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <span style={{ fontSize: '3rem', fontWeight: 900, display: 'block', lineHeight: 1, color: selectedElement.color || '#059669' }}>
                    {selectedElement.symbol}
                  </span>
                  <h3 style={{ margin: '6px 0 2px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main, #0F172A)' }}>
                    {selectedElement.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary, #64748B)' }}>
                    Masa Atómica: <strong style={{ color: 'var(--text-main, #0F172A)', fontFamily: 'monospace' }}>{selectedElement.mass} u</strong>
                  </p>
                </div>

                {/* Coordenadas en la Tabla */}
                <div 
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1px solid var(--card-border, rgba(0,0,0,0.08))',
                    backgroundColor: 'var(--card-bg, #FFFFFF)'
                  }}
                >
                  <span style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', display: 'block', marginBottom: '8px', color: 'var(--text-secondary, #64748B)' }}>
                    Ubicación en la Tabla
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', fontSize: '0.75rem' }}>
                    <div style={{ padding: '8px 4px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.04)' }}>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600 }}>Grupo</span>
                      <strong style={{ fontSize: '0.85rem', fontWeight: 900 }}>{selectedElement.group}</strong>
                    </div>
                    <div style={{ padding: '8px 4px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.04)' }}>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600 }}>Periodo</span>
                      <strong style={{ fontSize: '0.85rem', fontWeight: 900 }}>{selectedElement.period}</strong>
                    </div>
                    <div style={{ padding: '8px 4px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.04)' }}>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600 }}>Bloque</span>
                      <strong style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase' }}>{selectedElement.block}</strong>
                    </div>
                  </div>
                </div>

                {/* Valencias y Estados de Oxidación (E.O.) CEPREUNSA */}
                <div 
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    border: '2px solid rgba(5, 150, 105, 0.25)',
                    backgroundColor: 'rgba(5, 150, 105, 0.05)'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', display: 'block', marginBottom: '8px', color: 'var(--text-secondary, #64748B)' }}>
                    Valencias & Estados de Oxidación (E.O.)
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedElement.valencias.map((v, i) => (
                      <span 
                        key={i}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '10px',
                          fontFamily: 'monospace',
                          fontWeight: 900,
                          fontSize: '0.88rem',
                          backgroundColor: '#059669',
                          color: '#FFFFFF'
                        }}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: '0.7rem', lineHeight: 1.4, color: 'var(--text-secondary, #64748B)' }}>
                    <em>Nomenclatura CEPREUNSA:</em> Clásica (oso/ico, hipo-oso, per-ico), Stock (I, II, III...) y Sistemática IUPAC (mono, di, tri, tetra...).
                  </p>
                </div>

              </div>
            )}

            {/* Guía Rápida Inferior */}
            <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} color="#059669" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-secondary, #64748B)', lineHeight: 1.3 }}>
                Datos alineados al prospecto oficial de admisión ordinario y CEPREUNSA.
              </span>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div 
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--card-border, rgba(0,0,0,0.08))',
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexShrink: 0
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #64748B)' }}>
            Química General & Inorgánica • Temario Oficial 2027
          </span>
          <button 
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 20px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#FFFFFF',
              backgroundColor: '#0F172A',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Cerrar
          </button>
        </div>

      </motion.div>
    </div>
  );
}

export default PeriodicTableModal;
