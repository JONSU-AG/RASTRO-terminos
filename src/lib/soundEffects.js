// Motor de Efectos de Sonido Web Audio API para RASTRO Pomodoro
// 24 opciones gratuitas, sin dependencias externas, con duración máxima de 2 a 4 segundos.

class SoundEngine {
  constructor() {
    this.audioCtx = null;
  }

  getAudioContext() {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  play(soundId) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const sound = SOUND_CATALOG.find(s => s.id === soundId) || SOUND_CATALOG[0];
      if (sound && typeof sound.playFn === 'function') {
        sound.playFn(ctx);
      }
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  }
}

export const soundEngine = new SoundEngine();

export const SOUND_CATALOG = [
  {
    id: 'campana_zen',
    name: 'Campana Zen (528 Hz)',
    category: 'Relajantes',
    duration: '3.2s',
    icon: 'bell',
    description: 'Cuenco tibetano armónico con frecuencia relajante y resonancia pura',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      [528, 1056, 1584].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.2 / (i + 1), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 3.2);
      });
    }
  },
  {
    id: 'acordes_piano',
    name: 'Piano Cálido',
    category: 'Relajantes',
    duration: '3.4s',
    icon: 'piano',
    description: 'Cadencia armónica mayor dulce y envolvente',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 698.46, 880.00]
      ];
      chords.forEach((chord, step) => {
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + step * 0.4);
          gain.gain.setValueAtTime(0.01, t + step * 0.4);
          gain.gain.linearRampToValueAtTime(0.14 / (idx + 1), t + step * 0.4 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + step * 0.4 + 2.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t + step * 0.4);
          osc.stop(t + step * 0.4 + 2.2);
        });
      });
    }
  },
  {
    id: 'campanillas_viento',
    name: 'Campanillas de Viento',
    category: 'Relajantes',
    duration: '3.5s',
    icon: 'wind',
    description: 'Chimes suaves mecidos por una brisa pacífica',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      [1318.51, 1567.98, 1760.00, 2093.00, 2637.02].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.16);
        gain.gain.setValueAtTime(0.12, t + idx * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.16 + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.16);
        osc.stop(t + idx * 0.16 + 1.8);
      });
    }
  },
  {
    id: 'onda_relajante',
    name: 'Onda Alpha (432 Hz)',
    category: 'Relajantes',
    duration: '3.5s',
    icon: 'wave',
    description: 'Tono puro a 432 Hz que despeja la mente y reduce el estrés',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      [432, 864].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.2 / (i + 1), t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 3.4);
      });
    }
  },
  {
    id: 'flauta_melodica',
    name: 'Flauta de Bambú',
    category: 'Relajantes',
    duration: '3.0s',
    icon: 'flute',
    description: 'Melodía suave de viento con armónicos aterciopelados',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.22);
        gain.gain.setValueAtTime(0.01, t + idx * 0.22);
        gain.gain.linearRampToValueAtTime(0.15, t + idx * 0.22 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.22 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.22);
        osc.stop(t + idx * 0.22 + 1.2);
      });
    }
  },
  {
    id: 'gota_espacial',
    name: 'Gotas de Manantial',
    category: 'Relajantes',
    duration: '2.5s',
    icon: 'drop',
    description: 'Gotas suaves de agua cristalina y refrescante',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      [0, 0.25, 0.5].forEach((delay, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880 + i * 220, t + delay);
        osc.frequency.exponentialRampToValueAtTime(1400 + i * 200, t + delay + 0.08);
        gain.gain.setValueAtTime(0.2, t + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.8);
      });
    }
  },
  {
    id: 'marimba_tropical',
    name: 'Marimba Suave',
    category: 'Relajantes',
    duration: '2.6s',
    icon: 'wood',
    description: 'Golpes cálidos de percusión de madera melodiosa',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.14);
        gain.gain.setValueAtTime(0.18, t + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.14 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.14);
        osc.stop(t + idx * 0.14 + 0.7);
      });
    }
  },
  {
    id: 'chime_notificacion',
    name: 'Chime de Cristal',
    category: 'Relajantes',
    duration: '2.2s',
    icon: 'gem',
    description: 'Doble campana sutil y agradable para cerrar la sesión',
    playFn: (ctx) => {
      const t = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, t);
      gain1.gain.setValueAtTime(0.18, t);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(t);
      osc1.stop(t + 1.2);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, t + 0.16);
      gain2.gain.setValueAtTime(0.18, t + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t + 0.16);
      osc2.stop(t + 1.8);
    }
  }
];
