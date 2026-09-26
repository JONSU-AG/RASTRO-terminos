# 📋 PLAN FINAL v4 — RASTRO
> Última actualización: 2026-09-25 22:12

---

## ESTADO DE EJECUCIÓN

| # | Tarea | Estado |
|---|-------|--------|
| 0 | Cache SW: actualizar sin pedir borrar caché | ✅ Hecho |
| 1 | Saludo "Hola," + nombre separados | ✅ Hecho |
| 2 | Pomodoro: semi-oculta, sin SVG, drag 1:1 | ✅ Hecho |
| 3 | Badges automáticos eliminados | ✅ Hecho |
| 4 | Videos: solo YouTube, aislar el resto | ✅ Hecho |
| 5 | Racha: una sola, inter-materias | ✅ Hecho |
| 6 | Cursos de letras: sin fórmulas | ✅ Hecho |
| 7 | Notificaciones inteligentes | ✅ Hecho |
| 8 | Obras: resúmenes del temario completo | ✅ Hecho |

---

---

# 🆕 TAREA 0 — Cache SW: nueva versión sin pedir "borrar caché"

## El problema
Cuando se instala una nueva versión de la app, aparece un aviso diciendo que el usuario debe borrar caché manualmente. Esto ocurre porque:

1. **`sw.js` manual**: tiene `CACHE_NAME = 'rumbo-app-cache-v1'` — versión fija, nunca cambia
2. **`VitePWA`** con `registerType: "autoUpdate"` debería manejarlo solo, pero hay dos SW en conflicto:
   - El `/public/sw.js` manual (versión fija `v1`)
   - El SW generado por Workbox/VitePWA automáticamente
3. El SW manual en `/public/sw.js` cachea assets de build anteriores. Al actualizar, el browser sirve assets viejos (SVG, JS chunks) desde caché mientras el nuevo SW espera → pantalla en blanco o assets mezclados → app pide "borrar caché"

## Solución

### Paso 1: Eliminar conflicto — el SW manual deja de cachear assets
El `/public/sw.js` solo debe manejar notificaciones, NO cachear nada. Workbox lo maneja:

```js
// public/sw.js — NUEVO: solo notificaciones, sin caché de assets
// El caché de assets es manejado automáticamente por el SW de Workbox (VitePWA)

self.addEventListener('notificationclick', (event) => {
  // ... (mantener notificaciones push)
});
```

### Paso 2: vite.config.ts — forzar actualización silenciosa
```ts
VitePWA({
  registerType: "autoUpdate",
  manifest: false,
  workbox: {
    maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,
    cleanupOutdatedCaches: true,        // limpia versiones viejas
    skipWaiting: true,                  // activa nueva versión sin esperar
    clientsClaim: true,                 // toma control inmediato
    navigateFallbackDenylist: [/^\/__/],
    runtimeCaching: [
      { urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i, handler: 'NetworkOnly' },
      { urlPattern: /^https:\/\/.*\.googleapis\.com\/.*/i, handler: 'NetworkOnly' },
    ],
  },
})
```

### Paso 3: main.jsx — auto-recarga limpia
```js
registerSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (r) setInterval(() => r.update(), 30 * 60 * 1000);
  },
  onNeedRefresh() {
    // Aplica nueva versión de manera transparente
  },
});
```

**Resultado:** Al subir una nueva versión, Workbox purga los viejos assets y monta la nueva versión sin exigir al usuario borrar caché.

---

---

# ✅ TAREA 1 — Saludo (HECHO)
`Home.jsx` — "Hola," tenue + nombre real del usuario en negrilla, separados visualmente.

---

---

# ✅ TAREA 2 — Pomodoro (HECHO)
`PomodoroFloatingPill.jsx`:
- `dragElastic={0}` → drag 1:1, sin saltos ni teletransporte.
- Compacto: solo `MM:SS` en monospace, sin iconos SVG, sin punto pulsante.
- Semi-oculta: `-22px` cuando compacta (medio cuerpo dentro del lateral).
- Límites: navbar top `64px`, navbar bottom `window.innerHeight - 80`.

---

---

# ✅ TAREA 3 — Badges automáticos (HECHO)
- `UserProfile.jsx`: eliminados badges automáticos "👑 ADMINISTRADOR" y "🌟 ALIADO OFICIAL". Solo queda el badge personalizado escrito manualmente y la advertencia de moderación privada.
- `AuthContext.jsx`: limpieza automática de `isAdmin:true` en Firestore para cualquier usuario que no sea el creador de Firebase.

---

---

# TAREA 4 — Videos: solo YouTube público (sin borrar nada)

**Archivos:** `AcademyDetail.jsx`, `src/utils/videoValidation.js`

### Modelo de gestión
- **Videos permitidos:** Únicamente enlaces públicos directos de YouTube.
- **Videos locales / Firebase Storage:** Aislados visualmente, NO eliminados. Se muestra tarjeta de *"Video no disponible por el momento"*.
- **Reporte de caídos:** Botón para que el usuario reporte videos caídos o listas con error hacia el panel de admin.

---

---

# TAREA 5 — Racha: una sola, cualquier lección del día cuenta

**Archivo:** `GamificationContext.jsx`

### Regla
- Una sola racha (`streak`).
- Si `lastActiveDate !== hoy`, al completar cualquier lección (sea cual sea el curso), la racha avanza +1.
- No existe distinción entre racha diaria vs racha de estudio.

---

---

# TAREA 6 — Cursos de letras: sin fórmulas

**Archivos:** `LessonEngine.jsx`, `learningPathData.js`

- Cursos de letras: Literatura, Filosofía, Lenguaje, Historia, Cívica, Geografía, Psicología.
- Se oculta todo bloque de `formula_data` o componentes de fórmulas matemáticas.
- Su contenido se redacta en prosa explicativa limpia.

---

---

# TAREA 7 — Notificaciones inteligentes de racha

**Archivos:** `src/lib/streakNotifications.js`, `DeviceNotificationsListener.jsx`

- Banco de 30+ mensajes por tipo usando el nombre del usuario y su racha.
- Se activan a las 8:00 PM si no ha estudiado, en hitos de racha (7, 14, 30 días) y al retornar tras ausencia.

---

---

# TAREA 8 — Obras: resúmenes preuniversitarios del temario COMPLETO

## Estructura de cada obra
```
90% → LA OBRA en detalle (Argumento narrativo completo)
  - Argumento completo y detallado (sin omitir nada clave)
  - Estructura de la obra (partes, libros, actos)
  - Temas desarrollados a profundidad
  - Recursos y estilo literario

10% → RESUMEN DE REPASO (Sección final separada)
  - Personajes principales con rol y psicología
  - Datos clave (género, especie, corriente)
  - Preguntas tipo examen de admisión
```

## Reglas absolutas
- ❌ Cero mención de nombres de universidades o academias por nombre.
- ❌ Cero mención a "fragmentos evaluados" (si la obra tiene 2 partes como Don Quijote, se resumen ambas completas).
- ❌ No hacer sinopsis cortas de 5 líneas: el resumen detallado es la obra en detalle (10–20 pantallas de lectura ágil).
- ❌ Biografía del autor en apartado separado, no mezclada en el argumento.
- ✅ Lista basada en el temario general completo.

---

## 📁 ARCHIVOS AFECTADOS

| Archivo | Tarea |
|---------|-------|
| [`public/sw.js`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/public/sw.js) | 0 |
| [`vite.config.ts`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/vite.config.ts) | 0 |
| [`src/main.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/main.jsx) | 0 |
| [`src/pages/Home.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/pages/Home.jsx) | 1 ✅ |
| [`src/components/PomodoroFloatingPill.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/components/PomodoroFloatingPill.jsx) | 2 ✅ |
| [`src/pages/UserProfile.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/pages/UserProfile.jsx) | 3 ✅ |
| [`src/context/AuthContext.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/context/AuthContext.jsx) | 3 ✅ |
| [`src/pages/AcademyDetail.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/pages/AcademyDetail.jsx) | 4 |
| `src/utils/videoValidation.js` *(nuevo)* | 4 |
| [`src/context/GamificationContext.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/context/GamificationContext.jsx) | 5 |
| [`src/components/aprender/LessonEngine.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/components/aprender/LessonEngine.jsx) | 6 |
| [`src/data/learningPathData.js`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/data/learningPathData.js) | 6, 8 |
| `src/lib/streakNotifications.js` *(nuevo)* | 7 |
| [`src/components/DeviceNotificationsListener.jsx`](file:///C:/Users/Usuario/Downloads/rumbo%20(5)/src/components/DeviceNotificationsListener.jsx) | 7 |
