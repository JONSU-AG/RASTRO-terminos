/**
 * src/lib/streakNotifications.js
 * 
 * Banco de más de 30 notificaciones inteligentes y contextuales de racha.
 * Adapta el mensaje dinámicamente según el nombre del estudiante, su racha actual y la hora.
 * Nunca menciona universidades específicas, orientándose al ingreso y la constancia preuniversitaria.
 */

export const NOTIFICATION_TEMPLATES = {
  // 1. En riesgo (Tarde/Noche si aún no ha estudiado hoy) - 10 mensajes
  AT_RISK: [
    (name, s) => ({
      title: `🔥 ¡${name ? name + ', salva' : 'Salva'} tu racha de ${s} ${s === 1 ? 'día' : 'días'}!`,
      body: `Faltan pocas horas para que termine el día. Solo 3 minutos de práctica mantendrán tu fuego encendido.`
    }),
    (name, s) => ({
      title: `⏳ Que no se apague tu racha, ${name || 'futuro cachimbo'}`,
      body: `Llevas ${s} ${s === 1 ? 'día consecutivo' : 'días consecutivos'}. Resuelve una lección rápida antes de dormir.`
    }),
    (name, s) => ({
      title: `⚡ La disciplina vence al cansancio`,
      body: `${name ? name + ', tus' : 'Tus'} ${s} ${s === 1 ? 'día de esfuerzo merecen' : 'días de esfuerzo merecen'} continuar. ¡Entra y asegura tu día!`
    }),
    (name, s) => ({
      title: `🎯 Tu vacante se forja con constancia`,
      body: `Una sola lección te separa de mantener tus ${s} ${s === 1 ? 'día' : 'días'} de racha. ¡Hazlo hoy!`
    }),
    (name, s) => ({
      title: `🦉 Repaso express nocturno`,
      body: `${name || 'Estudiante'}, 5 preguntas rápidas bastan para salvar tu racha de ${s} ${s === 1 ? 'día' : 'días'}.`
    }),
    (name, s) => ({
      title: `🔥 ¡Protege tus ${s} días de estudio!`,
      body: `El examen premia a los que no se rinden ningún día. Asegura tu progreso de hoy.`
    }),
    (name, s) => ({
      title: `💪 Un pequeño esfuerzo hoy, un gran resultado mañana`,
      body: `${name ? name + ', no' : 'No'} dejes caer tu racha de ${s} ${s === 1 ? 'día' : 'días'}. ¡Tú puedes!`
    }),
    (name, s) => ({
      title: `⏰ Última llamada del día`,
      body: `Mantén tu constancia invicta. Resuelve un reto y duerme con la satisfacción del deber cumplido.`
    }),
    (name, s) => ({
      title: `🛡️ Escudo de racha activo`,
      body: `Entra a RASTRO y confirma tus ${s} ${s === 1 ? 'día' : 'días'} de preparación continua.`
    }),
    (name, s) => ({
      title: `🌟 Cada día cuenta para tu ingreso`,
      body: `Son solo unos minutos. Defiende tu racha y sigue sumando puntos de ventaja.`
    })
  ],

  // 2. Hitos alcanzados (7, 14, 21, 30, 60, 100 días) - 8 mensajes
  MILESTONES: [
    (name, s) => ({
      title: `🎉 ¡Imparable! ${s} días de racha`,
      body: `¡Felicitaciones ${name || 'estudiante'}! Tu nivel de compromiso te acerca cada vez más al cuadro de mérito.`
    }),
    (name, s) => ({
      title: `🏆 ¡Nuevo Hito Alcanzado!`,
      body: `¡${s} días seguidos estudiando! Estás demostrando la madera de la que están hechos los ingresantes.`
    }),
    (name, s) => ({
      title: `⭐ Nivel de concentración leyenda`,
      body: `${s} días ininterrumpidos. ¡Comparte tu logro y sigue marcando la diferencia!`
    }),
    (name, s) => ({
      title: `🚀 ${s} días construyendo tu futuro`,
      body: `La constancia es la mejor estrategia preuniversitaria. ¡Sigue así, ${name || 'campeón'}!`
    }),
    (name, s) => ({
      title: `🔥 Racha ardiente: ${s} días`,
      body: `Tu constancia es un ejemplo. Ningún tema es imposible cuando estudias a diario.`
    }),
    (name, s) => ({
      title: `💎 Hábitos de acero: ${s} días`,
      body: `Estudiar a diario ya es parte de ti. El examen de admisión está cada vez más cerca de ser tuyo.`
    }),
    (name, s) => ({
      title: `🥇 Excelencia preuniversitaria`,
      body: `${s} días consecutivos sin fallar. ¡Gran trabajo ${name ? name : ''}!`
    }),
    (name, s) => ({
      title: `✨ ${s} días invicto`,
      body: `Cada día sumas conocimiento clave para el examen. ¡Vamos por más!`
    })
  ],

  // 3. Inicio o reactivación de racha (Día 0 o 1) - 8 mensajes
  START: [
    (name) => ({
      title: `🚀 ¡Inicia tu racha hoy!`,
      body: `${name ? 'Hola ' + name + ', hoy' : 'Hoy'} es el día perfecto para empezar tu racha hacia la universidad.`
    }),
    (name) => ({
      title: `📚 Tu vacante empieza con una pregunta`,
      body: `Resuelve 3 preguntas rápidas y enciende tu racha de estudio en RASTRO.`
    }),
    (name) => ({
      title: `🌱 El primer paso es el más importante`,
      body: `No necesitas horas interminables: 5 minutos de enfoque hoy encenderán tu racha.`
    }),
    (name) => ({
      title: `💡 Reto del día listo`,
      body: `${name ? name + ', un' : 'Un'} nuevo tema te espera para comenzar a sumar puntos de admisión.`
    }),
    (name) => ({
      title: `🔥 Enciende tu llama de estudio`,
      body: `La preparación constante es el secreto del éxito. ¡Inicia tu racha hoy!`
    }),
    (name) => ({
      title: `📖 Una lección al día`,
      body: `Paso a paso, tema por tema. Empieza tu conteo diario y mide tu avance.`
    }),
    (name) => ({
      title: `🎯 Enfoque total para hoy`,
      body: `Dedícale 5 minutos a tu materia favorita y asegura tu primera insignia de racha.`
    }),
    (name) => ({
      title: `✨ Bienvenido de vuelta`,
      body: `${name ? name + ', tu' : 'Tu'} camino de aprendizaje está listo. ¡Enciende tu racha hoy!`
    })
  ],

  // 4. Regreso tras ausencia (2 o más días sin actividad) - 6 mensajes
  COMEBACK: [
    (name) => ({
      title: `👋 ¡Te extrañamos, ${name || 'estudiante'}!`,
      body: `Lo importante no es haber pausado, sino levantarse. ¡Retoma tu preparación hoy!`
    }),
    (name) => ({
      title: `⚡ Es hora de reiniciar con más fuerza`,
      body: `Tu meta universitaria sigue esperándote. Entra y reactiva tu ritmo de estudio.`
    }),
    (name) => ({
      title: `🎯 Hoy es un nuevo comienzo`,
      body: `${name ? name + ', no' : 'No'} te desanimes. Una lección hoy es el primer paso de tu mejor racha.`
    }),
    (name) => ({
      title: `💪 Tu meta vale cada intento`,
      body: `Vuelve al camino de aprendizaje. El temario te espera con resúmenes listos para ti.`
    }),
    (name) => ({
      title: `🔥 Reactiva tu motor de estudio`,
      body: `Basta con 3 minutos para volver a tomar el ritmo. ¡Estamos contigo!`
    }),
    (name) => ({
      title: `🌟 Nunca es tarde para retomar`,
      body: `Cada pregunta que resuelves hoy cuenta para tu examen. ¡Vamos de nuevo!`
    })
  ]
};

/**
 * Obtiene la notificación adecuada según el estado del estudiante
 */
export const getSmartStreakNotification = ({ name = '', streak = 0, lastActiveDate = null }) => {
  const cleanName = (name && typeof name === 'string') 
    ? name.trim().split(' ')[0] 
    : '';

  const today = (() => {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  })();

  const daySeed = new Date().getDate();

  // Si tiene racha y es un hito especial (múltiplos de 7 o redondos)
  const isMilestone = streak > 0 && (streak % 7 === 0 || streak === 10 || streak === 30 || streak === 50 || streak === 100);
  if (isMilestone && lastActiveDate === today) {
    const fn = NOTIFICATION_TEMPLATES.MILESTONES[daySeed % NOTIFICATION_TEMPLATES.MILESTONES.length];
    return fn(cleanName, streak);
  }

  // Si no ha estudiado hoy y tiene racha en riesgo
  if (streak > 0 && lastActiveDate !== today) {
    const fn = NOTIFICATION_TEMPLATES.AT_RISK[(daySeed + streak) % NOTIFICATION_TEMPLATES.AT_RISK.length];
    return fn(cleanName, streak);
  }

  // Si estuvo ausente varios días
  if (lastActiveDate) {
    const diffDays = Math.round((new Date(today) - new Date(lastActiveDate)) / (1000 * 60 * 60 * 24));
    if (diffDays >= 2) {
      const fn = NOTIFICATION_TEMPLATES.COMEBACK[daySeed % NOTIFICATION_TEMPLATES.COMEBACK.length];
      return fn(cleanName, streak);
    }
  }

  // Inicio de racha
  const fn = NOTIFICATION_TEMPLATES.START[daySeed % NOTIFICATION_TEMPLATES.START.length];
  return fn(cleanName, streak);
};
