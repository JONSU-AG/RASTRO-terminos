# RASTRO · Bitácora técnica y mapa de cambios
> Última actualización: 2026-09-26 · v1.0.2 (versionCode 2)
> Si algo falla, busca aquí QUÉ se tocó y DÓNDE. Nunca guardar contraseñas en este archivo.

## 1. Mapa rápido del proyecto

| Parte | Carpeta/archivo | Notas |
|---|---|---|
| App Android (APK/AAB) | `android/` | Abrir ESTA carpeta en Android Studio, no la raíz |
| Código web | `src/` | React + Vite; se compila a `dist/` |
| Imágenes y PWA | `public/` | Icono único: `public/applogo.png` (logo RASTRO Preuniversitario) |
| Config Capacitor | `capacitor.config.ts` | appId `com.jonsuapps.rastro`, SDK 36 |
| Login Google nativo | `src/lib/googleAuth.js` + `android/.../MainActivity.java` | Scopes: email, profile, `drive.file` |
| Sesión/roles | `src/context/AuthContext.jsx` | Admin SOLO por correo verificado |
| Racha/XP | `src/context/GamificationContext.jsx` | Fechas LOCALES (no UTC), entrar cuenta como actividad |
| Notificaciones | `src/lib/notifications.js` + plugin `@capacitor/local-notifications` | Clave real: `rumbo_notifications_enabled` |
| Reglas nube | `firestore.rules`, `storage.rules` | Firestore DESPLEGADAS; Storage pendiente (sin activar) |
| Servidor IA | `server.ts` | Rate limit 30/min, mensajes máx 2000 chars |
| Ficha Play Store | `play-store/ficha.txt`, `icono-512.png`, `grafico-1024x500.png` | Textos listos para copiar |
| Logo nuevo (fuente) | `nuevo-logo/LOGOAPK.png` | Origen de applogo.png e íconos APK |

## 2. Datos y claves (identificadores públicos, NO contraseñas)

- Proyecto Firebase: `rumbo-jonsu` (`432336496806`)
- Paquete: `com.jonsuapps.rastro` · versionCode 2, versionName 1.0.1
- SHA-1 debug (esta PC): `28:7E:63:B9:A0:5F:83:A3:55:0D:73:A1:37:C2:2A:28:DE:10:73:80`
- SHA-1 firma Play (real, visto en Logcat): `29:C5:E8:91:44:3C:10:19:A3:C2:C0:85:A1:AD:BD:24:0D:AB:27:D9`
- Otros SHA registrados: `cf0d4556…`, `284498d3…` (release/carga)
- Web Client ID: `432336496806-7ctjor26otm03pcrm3tbg6qv0kve5ina.apps.googleusercontent.com` (en `.env`, NO subirlo)
- Keystore release: `Documents\rastro-release.jks`, alias `rastro` (contraseñas SOLO en papel del autor)
- Web: `https://rumbo-jonsu.web.app` (+ `/#/privacidad`, `/#/eliminar-cuenta`)
- Repo: `JONSU-AG/RASTRO-terminos`, tags `v1.0`, `v1.0.1`. No se sube: `.env`, `node_modules`, `dist/`, `android/app/release/`

## 3. Historial de cambios (qué se movió y dónde)

### 3.1 Login Google (error "no conecta" → funcionando)
- `MainActivity.java`: implementa `ModifiedMainActivityForSocialLoginPlugin` + reenvía `onActivityResult` (sin esto el plugin rechaza scopes).
- `.env`: creado con `VITE_GOOGLE_WEB_CLIENT_ID` (antes se compilaba vacío).
- `android/app/google-services.json`: instalado con los 4 clientes OAuth.
- Consola: SHAs debug + firma Play registrados; scopes email/profile/openid/`drive.file`; Drive API habilitada.
- Diagnóstico `[Diag]` agregado y luego ELIMINADO (`GoogleSignPromptModal.jsx`).
- ⚠️ Si vuelve a fallar en Play: Logcat filtro `GoogleProvider` muestra `signingSha1` real.

### 3.2 Login triple + invitados
- `AuthContext.jsx`: `loginGuest` (anónimo), `saveGuestProgressWithGoogle` (fusión auto o conflicto), `resolveGuestConflict`, `loginWithEmail`, `registerWithEmail`, `resetEmailPassword`, `isGuest`.
- `GoogleSignPromptModal.jsx`: botón invitado + prop `hideGuest`.
- `GuestSaveBanner.jsx` (nuevo): banner azul + diálogo de conflicto.
- `Auth.jsx`: correo promovido + recuperar contraseña.
- `AccessGate.jsx`: muro desactivado (`if (!user && false)`); botón invitado.
- Modelo: todo libre SALVO `/perfil` (`RequireAccount` en `App.jsx`), `/chats` y Subir (muro en `UploadModal` + tabs chat de `UserProfile`).
- Invitados: Drive-archivos bloqueado con aviso; enlaces sí permitidos.
- Requiere activar proveedor Email/Password en Firebase Console.

### 3.3 Nombre repetido tras actualizar
- `AuthContext.jsx`: memoria local `rastro_username_chosen[_uid]` (al elegir, al registrar, al cargar perfil, en fallback sin red).

### 3.4 Racha trabada
- `GamificationContext.jsx`: entrar cuenta como actividad (`advanceStreak` + efecto al abrir); fechas LOCALES (antes UTC rompía noches); widgets y recordatorio también en local.
- NOTA: el congelador (`streakFreeze`) nunca se descuenta: con 1+ la racha jamás se reinicia. Revisar si se quiere gastar.

### 3.5 Notificaciones
- Plugin `@capacitor/local-notifications`; rama nativa en `triggerSystemNotification` + permiso OS en `requestSystemNotificationPermission`.
- BUG REAL corregido: Ajustes escribía `rastro_notifications_enabled` y el motor leía `rumbo_notifications_enabled`. Ahora sincronizadas.
- `SettingsModal.jsx`: interruptor usa el motor real.

### 3.6 Carrusel + Biblioteca + moderación
- Carrusel: tope 10 + "Ver todos"; SOLO creador + usuarios 10+ aportes (fuentes solicitudes/destacados eliminadas de la vista pública).
- `siteSettings.js`: maestro `disableAllOficiales` + `setOficialesHiddenAll`; botón en Biblioteca.
- Moderación SOLO-OCULTAR: `handleDeleteGeneric` y `handleDeleteAllyCard` ya no borran (quedan otros `deleteDoc` de gestión: libros, solicitudes, notifs).
- Botón papelera de oficial reetiquetado "Ocultar para todos".

### 3.7 Imágenes e íconos
- Borradas: duplicados pwa-icon, fondos astro, QR, corage, mascotas sin uso, logos academia sueltos. Referencias rotas re-apuntadas (`LOGOR`→applogo, kelsen→aviso, fallbacks, mascotas).
- `public/applogo.png` = logo nuevo ÚNICO (PWA, favicon, notifs, avatares).
- Mipmaps regenerados desde el logo (5 densidades + round + foreground); fondo `#F2F2F7`; vectores plantilla eliminados.

### 3.8 Rendimiento y visual
- Temario precargado en idle (datos primero); flashcards cargan temario al abrir; chat topado a 40 mensajes; prewarm Aprender.
- Sin `backdrop-blur` en Settings/Tema/Pomodoro; sin rebote en Tema; `willChange` en tarjetas.
- Tema pre-pintado en `index.html` + fondo síncrono en `ThemeContext`; ventana/WebView `#F2F2F7`; sin `background-attachment: fixed`.
- Pomodoro: fila única, cabecera con iconos, sonidos en 1 columna, Probar ancho, steppers 34px, sin drop-shadow/remontaje por segundo.
- Botón atrás navega dentro (`@capacitor/app`); lecciones piden "¿ya te vas?" (pendiente: integrar botón sistema con ese diálogo).
- Paleta Tema en header móvil; WhatsApp flotante solo en Inicio; popups silenciados en rutas legales.
- Aviso IA bajo el chat; página `/eliminar-cuenta`; assetlinks + filtro App Links.

### 3.9 Seguridad
- Admin SOLO correo verificado (`ADMIN_EMAILS`): fuera claves maestras, formulario, flags `localStorage`/documento; registros nacen `estudiante`.
- `CommentsSection`: borrado solo admin verificado.
- `server.ts`: rate limit, JSON 1 MB, topes de mensaje.
- Manifest `allowBackup=false`.
- `firestore.rules` DESPLEGADAS (dueño-edita, privilegios solo autor, sistema solo autor, gamificación propia).
- `storage.rules` creada, SIN desplegar (Storage inactivo).

### 3.10 Android base
- `variables.gradle` SDK 36 (compile+target); `windowSoftInputMode=adjustResize`; `ACCESS_NETWORK_STATE`; `MainActivity singleTask`; widgets comentados (`TEMP-DISABLED-WIDGETS`); `package.json` build a `dist-server/` + scripts `cap:*`.

### 3.11 Pomodoro Pro y Audio Relajante
- `PomodoroModal.jsx`: Rediseño completo responsive. Separación en Vista 1 (reloj circular sin scroll, controles 3D directos al pulgar, tabs de foco/pausa, progreso del ciclo de 4 bloques, consejo de ORSTTY) y Vista 2 (panel de ajustes ⚙️ para duraciones, tonos relajantes y ciclo automático).
- `soundEffects.js`: Reemplazadas ondas estridentes (sawtooth/square) por síntesis armónica senoidal relajante a 432 Hz y 528 Hz (Campana Zen, Piano Cálido, Campanillas de Viento, Onda Alpha, Flauta de Bambú, Gotas de Manantial, Marimba Suave, Chime de Cristal). 100% gratuito vía Web Audio API sin descargas externas.
- `PomodoroContext.jsx`: Asignados tonos relajantes por defecto en cada modo.

### 3.12 Píldora Pomodoro Flotante Inteligente y Adaptación Total a Temas
- `PomodoroFloatingPill.jsx`: Implementado sistema dinámico de 3 estados estilo Dynamic Island:
  1. Estado 1 (Mini Píldora): Discreta, compacta (36px), punto pulsante de actividad y reloj en vivo.
  2. Estado 2 (Píldora Expandida): Al tocarla, despliega controles rápidos: modo actual, play/pausa, botón directo `+5m`, maximizar y contraer.
  3. Estado 3 (Modal Completo): Botón maximizar abre el temporizador extendido a 92vh.
- `PomodoroModal.jsx`: Altura optimizada a 92vh, presets rápidos de 1 toque (15m, 25m, 45m, 50m), métricas de estudio en vivo acumuladas hoy ("Hoy: XX min") y botón dinámico ("Iniciar Estudio" / "Iniciar Descanso").
- **Adaptabilidad a Temas 100%**: Todos los componentes usan variables CSS (`var(--card-bg)`, `var(--card-border)`, `var(--text-main)`, `var(--text-muted)`). Cero colores hex fijos oscuros/claros que interfieran con futuros temas (guinda, coraje, beige-carmesi, google-vibrant y nuevos que se agreguen).

### 3.13 Biblioteca: Sección Obras Literarias y Apuntes de Repaso
- `src/data/literaturaData.js`: Catálogo inicial con 8 obras clásicas (*Los ríos profundos*, *La ciudad y los perros*, *El mundo es ancho y ajeno*, *Crimen y castigo*, *Edipo Rey*, *La metamorfosis*, *Paco Yunque*, *Ollantay*). Sin emojis en títulos/textos (solo SVG Lucide), sin términos restringidos (sin "GoodNotes", "Fija", "Admisión", "UNSA").
- `src/lib/literaturaService.js`: Arquitectura híbrida costo $0 (datos base en JS + caché de 30 min en `localStorage` + colección Firestore `literatura_obras` para creaciones y ediciones del admin).
- `src/components/LiteraturaViewerModal.jsx`: Visor digital de lectura con pestañas `Resumen Detallado` y `Apunte de Repaso`, acordeón interactivo de preguntas clave, selector de tamaño de letra (`compacto`, `normal`, `grande`), copia rápida de síntesis y guardado en favoritos local.
- `src/components/LiteraturaEditModal.jsx`: Modal administrador en la app para crear o editar resúmenes de obras (capítulos, personajes, síntesis y preguntas) con guardado directo a Firestore.
- `src/pages/Biblioteca.jsx`: Pestaña dedicada `📖 Obras`, filtro por categorías (Peruana, Universal), tarjetas 3D con simulación de lomo de libro, sinopsis y visor modal.

### 3.14 Panel de Administración: Moderación de Preguntas y Gestor de Obras
- `src/pages/Admin.jsx`:
  - **Bandeja de Reportes**: Añadido sub-filtro `🎯 Preguntas y Flashcards` (`targetType === 'flashcard' | 'examen' | 'pregunta_rapida'`). Visualización completa del enunciado reportado, motivo específico del estudiante y explicación detallada para resolver el problema reportado.
  - **Pestaña `📖 Obras y Apuntes`**: Gestor completo para listar obras, buscar en tiempo real, ocultar/mostrar a los alumnos, editar con `LiteraturaEditModal` o añadir nuevas obras.
  - 100% compatible con todos los temas de color del usuario.

### 3.15 Widgets Android (Duolingo Style), App Shortcuts y Notificaciones

- **Widgets Reactivados y Rediseñados**:
  - Eliminado el comentario `TEMP-DISABLED-WIDGETS` en `AndroidManifest.xml` reactivando todos los AppWidgetProvider (`DailyStreakWidgetProvider`, `WeeklyStreakWidgetProvider`, `ExamCountdownWidgetProvider`, `PomodoroWidgetProvider`, `StreakWidgetProvider`).
  - **Corrección de Congelamiento**: En `WidgetHelper.java`, se reemplazó el `FLAG_ACTIVITY_CLEAR_TOP` (que destruía el WebView de Capacitor) por `context.getPackageManager().getLaunchIntentForPackage()` con `FLAG_ACTIVITY_NEW_TASK | FLAG_ACTIVITY_SINGLE_TOP`, y se conectó `onNewIntent` en `MainActivity.java`. Tocar el widget ahora restaura la app sin reiniciarla ni dejarla en blanco.
  - **Diseño Duolingo**:
    - `widget_daily_streak.xml`: Tarjeta dividida con número de racha grande, estado dinámico, botón de acción y mascota ORSTTY reactiva (`mascot_orstty_happy.png` si completó hoy vs `mascot_orstty_sad.png` si está en peligro).
    - `widget_weekly_streak.xml`: Fila de cápsulas con los 7 días (L M M J V S D), contador semanal y mascota.
    - `widget_exam_countdown.xml`: Tarjeta con días restantes, título generalizado "EXAMEN DE ADMISIÓN" y mascota ORSTTY estudiando.
    - `widget_pomodoro.xml`: Reloj central con estado de foco y mascota ARTYON.
- **App Shortcuts (Menú al mantener pulsado el icono)**:
  - Definido `shortcuts.xml` en `res/xml/` vinculado a `MainActivity`.
  - Atajos persuasivos: *"¿Nos dejas? 🥺 (¡Estudia 5 min! No te rindas)"*, *"Salva tu racha 🔥"*, *"Modo Foco 🍅"* y *"Simulacro 🎯"*.
- **Notificaciones Nativas y Recordatorios Diarios**:
  - En `notifications.js`, se priorizó el chequeo de app nativa (`isNativeApp()`) para que el permiso del navegador en el WebView no bloquee las notificaciones locales de Capacitor.
  - Añadido `scheduleDailyStudyReminder` programado para las 8:00 PM con mensajes estilo Duolingo y tono motivador sin atar exclusivamente a una universidad específica.
  - En `DeviceNotificationsListener.jsx`, se sincroniza el recordatorio automático y la racha al iniciar sesión.

### 3.16 Rediseño Visual de Inicio, Barra Móvil, WhatsApp Flotante, OrsttyChat y Enrutamiento Funcional de Tarjetas ORSTTY (Sin Emojis)

- **Eliminación Total de Emojis en la UI (Directiva del Usuario)**:
  - Los emojis quedan estrictamente restringidos a notificaciones del sistema. Toda la interfaz de usuario (tarjetas, botones de acción, atajos, encabezados y modales) utiliza exclusivamente iconos vectoriales SVG de alta definición (`lucide-react`).
  - Se implementó un sanitizador regex en tiempo de ejecución en `OrsttyChat.jsx` para purgar cualquier emoji residual en botones (`card.ctaLabel`, `act.label`).

- **Rediseño Visual de Inicio (`Home.jsx`)**:
  - **Hero Limpio y Personalizado**: Se eliminaron la imagen redundante gigante `astrologo.png` y las píldoras duplicadas de "Estudia Gratis". Ahora muestra un saludo personal del estudiante (`¡Hola, {profileDisplayName}!`) con subtítulo motivador.
  - **Tarjeta de Alta Prioridad ("Ruta de Preparación Activa")**: Tarjeta destacada con progreso rápido y botón de acción directo "Continuar en Aprender" con icono SVG `Compass`.
  - **Cuadrícula de Navegación Rápida (4 Pilares)**:
    1. *Aprender* (`BookOpen`, gradiente esmeralda): Rutas temáticas y teoría oficial.
    2. *Cursos* (`Video`, gradiente azul): Clases y videoteca.
    3. *Biblioteca* (`Library`, gradiente morado): Separatas, apuntes y bancos PDF.
    4. *Simulador* (`Trophy`, gradiente ámbar): Exámenes cronometrados.
  - **Sello Oficial de Protección & Anti-Reventa**: Banner blindado con icono `ShieldCheck` que declara la política de derechos de autor y protección de material contra comercialización sin permiso, con botón directo a la sección de Chats (`/chats`) para que los alumnos puedan contactar autores y solicitar permisos de compartir.
  - **Modales de Inicio Limpios**: `CourseFlashcardsModal` y `RankingSimulacroModal` actualizados con insignias SVG `Layers` y `Crown`, sustituyendo emojis.

- **Barra Superior Móvil Compacta (`LiquidNavbar.jsx`)**:
  - Los 5 botones con texto que saturaban la pantalla en móviles se convirtieron en botones circulares de vidrio (36x36px) con icono SVG puro:
    1. *ORSTTY* (`Sparkles` dorado)
    2. *Chats* (`MessageSquare` azul)
    3. *Avisos* (`Bell` + badge de conteo)
    4. *Pomodoro* (`Clock` + pulso verde de sesión activa)
    5. *Tema* (`Palette`)
  - Aumenta la visibilidad y despeja el viewport en Android.

- **Alineación de Botón Flotante de WhatsApp (`FloatingWhatsApp.jsx`)**:
  - Reposicionado dinámicamente con `bottom: calc(94px + env(safe-area-inset-bottom, 0px))` y `right: 16px`, con efecto glassmorphism. Nunca más tapa las tarjetas de contenido ni choca con la barra de navegación inferior.

- **Control de Acceso en Cabecera ORSTTY (`OrsttyPage.jsx`)**:
  - El botón administrativo `[ Desactivar Botón ]` ahora está condicionado a `isAdmin === true`. Los estudiantes estándar disfrutan de una barra limpia con botón de retorno e insignia de estado "ORSTTY Tutor Activo".

- **Rediseño de Espacio y Botones en ORSTTY Chat (`OrsttyChat.jsx`)**:
  - **Cabecera Unificada**: Se fusionaron las dos barras de herramientas apiladas en una sola tira horizontal compacta, recuperando más de 80px de pantalla para la conversación.
  - **Prevención de Desbordamiento**: Los botones de acción de las tarjetas de IA ahora tienen `flexWrap: wrap` con espaciado flexible, eliminando el recorte de texto en pantallas pequeñas.
  - **Reemplazo de Emojis por SVG**:
    - Chips temáticos y starters convertidos a SVG (`Dna`, `Zap`, `Calculator`, `Brain`, `Scale`, `BookOpen`).
    - Test Vocacional con icono `Compass`.
    - Cursos con `Video`, Chats con `MessageSquare`.

- **Enrutamiento Inteligente de Tarjetas ORSTTY (`orsttyGeminiService.js` y `server.ts`)**:
  - Conexión funcional profunda a los recursos reales de la app:
    1. **Chats / Permiso de compartir**: Detecta consultas sobre derechos, autores o compartir material y entrega la tarjeta `CHATS` con ruta directa a `/chats`.
    2. **Apuntes vs Teoría Oficial (Doble Enrutamiento)**: Si el usuario busca apuntes o separatas, la tarjeta ofrece la `Biblioteca` (`/biblioteca`) y un botón secundario directo a `Aprender` (`/aprender/${subjId}`) explicando que si la comunidad aún no ha subido el PDF exacto, la teoría oficial de CEPREUNSA está disponible inmediatamente.
    3. **Áreas & Materias (Biomédicas, Ingenierías, Sociales)**: Muestra tarjeta `SUBJECT_PATH` con acciones para Fichas, Temas y Curso sin emojis en etiquetas.
    4. **Pomodoro, Simulador y Test Vocacional**: Enrutamiento directo a modales y páginas correspondientes.

### 3.17 Corrección Crítica: Pantalla Blanca y Colapso al Minimizar Pomodoro

- **Diagnóstico del Error (Root Cause)**:
  - Al presionar el botón "Minimizar" en el modal de Pomodoro, la aplicación completa se desmontaba dejando la pantalla 100% en blanco.
  - **Causa 1 (Violación Fatal de las Reglas de Hooks de React)**: En `PomodoroFloatingPill.jsx`, existía un retorno condicional prematuro `if (isOpen || (!isRunning && !isMinimized)) return null;` en la línea 35, y MÁS ABAJO en la línea 58 se ejecutaba un `useEffect(...)`.
    - Al inicio o con el modal abierto, React ejecutaba 4 hooks y retornaba `null`.
    - Al tocar "Minimizar", `isMinimized` cambiaba a `true`, la condición dejaba de cumplirse y React alcanzaba el `useEffect`, ejecutando un 5to hook.
    - React arrojaba de inmediato la excepción fatal: `Error: Rendered more hooks than during the previous render`.
  - **Causa 2 (Falta de Aislamiento en el Árbol Principal)**: En `App.jsx`, `<PomodoroFloatingPill />` y `<PomodoroModal />` estaban montados fuera de `<ErrorBoundary>`. Cualquier excepción en sus ciclos de render causaba el colapso total de la aplicación.
  - **Causa 3 (Unmount Abrupto en Modal)**: En `PomodoroModal.jsx`, la línea `if (!isModalOpen) return null;` cortaba la ejecución antes de `<AnimatePresence>`, provocando choques de desmontaje en Framer Motion y cancelando animaciones de salida.

- **Solución Implementada**:
  1. **Orden Incondicional de Hooks en `PomodoroFloatingPill.jsx`**: Se reordenaron todos los hooks (`usePomodoro`, `useTheme`, `useState`, `useRef`, `useEffect`) para ejecutarse estrictamente al inicio de la función en cada render. Se reemplazó el early return por renderizado condicional controlado dentro de `<AnimatePresence>`: `{shouldShow && (<motion.div key="pomodoro-floating-pill" ...>)}`.
  2. **Botón de Detención/Cierre en la Píldora Expandida**: Se añadió un botón `X` de detención directa (`closeAndStop()`) para que el usuario pueda descartar el Pomodoro flotante cuando lo desee.
  3. **Control Seguro de Eventos en `PomodoroModal.jsx`**: Los botones de minimizar y cerrar ahora usan `e?.stopPropagation?.()` evitando que el click burbujee hacia el backdrop o desencadene eventos secundarios no deseados. Se envolvió el modal en `{isModalOpen && (<div ...>)}` dentro de `<AnimatePresence>`.
  4. **Blindaje con ErrorBoundary en `App.jsx`**: Se encapsularon `<PomodoroFloatingPill />` y `<PomodoroModal />` dentro de un `<ErrorBoundary>` dedicado, garantizando que jamás un error de temporizador pueda poner la pantalla en blanco.

### 3.18 Rediseño Nativo y Descongestión de ORSTTY (Full-Screen, Barra Única y Limpieza Visual)
- **Problema Reportado ("Se ve feo y aglomerado")**:
  - En la vista móvil, ORSTTY presentaba una jerarquía visual congestionada:
    1. *Cajas anidadas*: `OrsttyPage.jsx` tenía `.orstty-backdrop` y `.orstty-page-wrapper` con bordes gruesos y márgenes oscuros, y dentro `OrsttyChat.jsx` tenía otro contenedor con bordes, radios y sombras, luciendo como una página web metida dentro de otra.
    2. *Doble encabezado*: Había un encabezado superior en la página (`< Volver` + `• ORSTTY Activo`) y un segundo encabezado debajo dentro del chat (`Avatar` + `ORSTTY Gemini AI` + `Tutor Oficial` + `Voz` + papelera).
    3. *Tira secundaria clavada*: Una barra horizontal fija permanente debajo del header con 4 botones (`Aprender`, `Cursos`, `Biblioteca`, `Simulador`) y chips de materias que restaba valioso espacio vertical.
    4. *Cartelera invasiva en mensaje inicial*: `INITIAL_MESSAGE` forzaba una tarjeta gigante ("Test Vocacional Oficial UNSA") más 5 botones apilados verticalmente a lo ancho, consumiendo el 100% de la pantalla móvil al abrir.
    5. *Botones pesados en burbujas*: Cada respuesta bot incluía botones toscos de texto con bordes para `Reportar` y `Escuchar`.
- **Solución Implementada**:
  1. **Pantalla Completa Nativa (`OrsttyPage.jsx`)**: Se eliminaron los envoltorios anidados y se implementó `.orstty-native-page` ocupando el 100% del viewport (`100vw`, `100dvh`), con integración en safe-areas y sin márgenes grises en móvil.
  2. **Barra de Aplicación Unificada de 56px (`OrsttyChat.jsx`)**: Se consolidó en un solo header nativo:
     - Izquierda: Botón volver circular, avatar de ORSTTY (36px) con punto indicador de estado en línea, nombre en degradado púrpura, insignia "Tutor IA" y subtítulo de orientación.
     - Derecha: Interruptor de modo voz, botón circular para limpiar conversación y botón de administración (si aplica).
  3. **Eliminación de la Tira Secundaria Invasiva**: Se retiró la barra fija de navegación que saturaba el encabezado del chat.
  4. **Mensaje de Bienvenida Limpio y Dinámico**: Se eliminó la tarjeta gigante no solicitada del mensaje de bienvenida. La tarjeta de origen (`originCard`) ahora se genera únicamente cuando el usuario pregunta o solicita una materia o test. Se actualizó la clave de almacenamiento a `rastro_orstty_chat_history_v4` para limpiar historiales pesados antiguos en `sessionStorage`.
  5. **Carrusel Horizontal de Sugerencias**: Los chips de sugerencias ahora se desplazan horizontalmente de forma suave (`overflowX: auto`, `whiteSpace: nowrap`, `scrollbarWidth: none`), ocupando solo una línea en lugar de apilar 5 filas de botones.
  6. **Micro-acciones Discretas en Burbujas**: Botones de reporte de IA (cumplimiento Google Play) y lectura de voz transformados en micro-iconos limpios y elegantes sin marcos toscos.
  7. **Barra de Entrada Estilo Cápsula Flotante**: Rediseñada con radio de 28px, micrófono circular, campo estilizado, botón de envío con elevación suave y aviso de IA sutil respetando el área segura inferior.
  8. **Zero Emojis**: Cumplimiento estricto de la regla de diseño usando exclusivamente íconos SVG de `lucide-react`.

### 3.19 Pomodoro Magnético Nativo, Test Vocacional en Inicio y Búnker de Fórmulas/Truquitos

- **Píldora Flotante de Pomodoro con Fijación Magnética (`PomodoroFloatingPill.jsx`)**:
  1. *Problema resuelto*: El arrastre libre con `bottom/right` fijos provocaba que la píldora quedara varada sobre textos o botones al azar y que su expansión provocara saltos visuales erráticos. Al soltar el dedo tras arrastrar se abría o cerraba involuntariamente.
  2. *Fijación magnética tipo Screen Recorder PIP*: Se implementó atracción magnética automática a los bordes laterales (`dockSide: 'left' | 'right'`) mediante `useAnimation()` y física de resortes (`spring`, `stiffness: 420`, `damping: 32`).
  3. *Límites verticales seguros*: Acotada entre `minY = 72px` y `maxY = screenH - 92px`, protegiendo el notch/status bar y la barra de navegación inferior.
  4. *Expansión armónica*: Al acoplarse a la derecha, la píldora se despliega hacia la izquierda; al acoplarse a la izquierda se despliega hacia la derecha, manteniéndose siempre dentro de la pantalla.
  5. *Discriminación de arrastre vs toque*: Umbral de arrastre de 6px que previene clics accidentales al terminar de desplazar la burbuja.

- **Test Vocacional Oficial UNSA al Inicio (`Home.jsx` y `VocationalTestModal.jsx`)**:
  1. *Ubicación prioritaria en Inicio*: Se agregó una tarjeta destacada de alto impacto visual ("Test Vocacional Oficial UNSA 2026") en `Home.jsx` con botón directo "Realizar Test Vocacional" que abre el modal al instante.
  2. *Acceso rápido en cuadrícula*: Se incluyó botón de acceso al Test Vocacional en el hub de accesos directos de Inicio.
  3. *Adaptación responsive fluida*: En `VocationalTestModal.jsx`, se corrigieron los anchos de columnas de opciones y resultados a `minmax(min(100%, 250px), 1fr)`, eliminando desbordes en pantallas móviles estrechas (360px), integrando paddings fluidos `clamp()` y reemplazando caracteres planos por íconos SVG `<X />`.

- **Botón y Búnker de Fórmulas & Mnemotecnias Pre-U (Truquitos)**:
  1. *Visibilidad en Inicio*: Tarjeta destacada en `Home.jsx` para el Formulario Maestro y el Búnker de Mnemotecnias (Cara A y B) con link directo a `/formulario`.
  2. *Header móvil superior*: Botón con ícono de calculadora añadido en `LiquidNavbar.jsx` (al lado de Pomodoro y temas) para acceso a 1 tap desde cualquier pantalla.
  3. *Menú Más*: Enlace directo con diseño búnker en el popover desplegable.
  4. *Página de Cursos*: Botón de acceso a "Fórmulas & Truquitos Pre-U" en la cabecera de herramientas de `Cursos.jsx`.

- **Transparencia en Cursos (Sin falsas promesas de videoclases)**:
  1. *Ajuste en `Home.jsx`*: Se cambió la etiqueta "Videoclases" por "Temarios & Módulos" en el acceso directo a Cursos.
  2. *Ajuste en `Cursos.jsx`*: Se actualizó la descripción para clarificar con transparencia que actualmente se ofrecen rutas de niveles temáticos, fichas y materiales clasificados por materia, y que las videoclases se van incorporando progresivamente conforme los docentes suban contenido.

### 3.20 Rediseño Estético: "Medio iOS con Google" (La Versatilidad de iOS y lo Minimalista de Google)

- **Problema Reportado ("No me gusta ese estilo, se ve muy IA; mi estilo es medio iOS con Google: la versatilidad de iOS y lo minimalista de Google")**:
  - La pantalla principal (`Home.jsx`) sufría de patrones visuales típicos de plantillas generadas por IA:
    1. *Cajas anidadas sobrecargadas*: Un contenedor principal con borde y gradiente que envolvía otra tarjeta azul con radios diferentes, que a su vez contenía cuatro botones en cuadrícula, más otra tarjeta gigante debajo para advertencias legales.
    2. *Manchas difusas de fondo (Aura/Mesh Gradients)*: Múltiples `radial-gradient` en `body` que teñían el fondo de morado, verde y azul difuminado, creando ruido visual.
    3. *Textos legales y disclaimers kilométricos*: Tarjeta completa de advertencia ("Plataforma Académica de Libre Acceso", "Prohibido Lucrar", párrafos explicativos extensos) dominando la mitad inferior de la pantalla principal.
    4. *Banners ruidosos*: Etiquetas innecesarias como "✨ PORTAL PREUNIVERSITARIO RASTRO", signos de admiración gigantes y textos en mayúsculas estridentes.

- **Solución Implementada**:
  1. **Superficie de Sistema Limpia y Plana (Minimalismo Google)**:
     - En `src/styles/ios-glass.css`, se eliminaron todos los `radial-gradient` difusos del `body` en todos los temas (`[data-theme] body { background-image: none }`), proporcionando un fondo sobrio, plano y descansado a la vista.
  2. **Saludo Sobrio y Directo (Estilo Apple Glance / Google Pixel)**:
     - Cabecera plana de un solo nivel: saludo limpio "Hola, [Nombre]" con micro-etiqueta "Admisión UNSA 2026 – 2027" y chip de racha activo estilo iOS ("🔥 X días activos").
  3. **Widget Esbelto de Actividad (Versatilidad iOS)**:
     - Widget horizontal de una sola capa con radio continuo squircle de 20px, icono de objetivo en contenedor azul suave y botón compacto de acción inmediata `Estudiar →` hacia `/aprender`.
  4. **Baldosas Táctiles Material You / Control Center de iOS (Google Quick Tiles)**:
     - Cuadrícula de 6 baldosas de acceso directo e inmediato:
       * **Test Vocacional**: Contenedor Menta pastel (`#E0F2F1`, icono `#00796B`) → Abre `VocationalTestModal` al instante.
       * **Fórmulas & Trucos**: Contenedor Lavanda pastel (`#F3E8FD`, icono `#7E22CE`) → Enlace directo al Búnker y Formulario Pre-U.
       * **Aprender**: Contenedor Azul Google pastel (`#E8F0FE`, icono `#1A73E8`) → Temarios y Fichas interactivas.
       * **Simulador**: Contenedor Ámbar Google pastel (`#FEF7E0`, icono `#D97706`) → Examen cronometrado con ranking.
       * **Biblioteca**: Contenedor Verde Google pastel (`#E6F4EA`, icono `#16A34A`) → Obras y compendios oficiales.
       * **Cursos**: Contenedor Índigo pastel (`#EDE7F6`, icono `#6366F1`) → Módulos de materias por nivel.
     - Cada baldosa cuenta con micro-rebote háptico táctil (`whileTap={{ scale: 0.96 }}`) y tipografía limpia sin prosa de relleno.
  5. **Micro-Sello Legal Discreto (Estilo Apple Settings / Google Privacy)**:
     - Se sustituyó el bloque legal gigante por una cápsula ultra sutil a pie de página: "Plataforma Académica Libre • Sin fines de lucro" con accesos directos a "Chats" y "Términos".
  6. **Compilación y Sincronización Nativa**:
     - Se ejecutó `npm run build` con salida exitosa (código 0).
     - Se sincronizaron los nuevos activos con Capacitor Android mediante `npx cap sync android`.

### 3.21 Reingeniería del Test Vocacional Psicométrico UNSA, Limpieza de Formulario y Experiencia de Usuario

- **Test Vocacional de Nivel Universitario (`VocationalTestModal.jsx`)**:
  - *Problema*: La pantalla de resultados previa únicamente mostraba barras de porcentaje simples y un botón de cierre, sin valor orientativo real.
  - *Solución*: Se rediseñó el resultado transformándolo en un **Informe Psicométrico Vocacional Oficial UNSA**:
    1. **Arquetipo Vocacional**: Título y descripción detallada del perfil cognitivo según el área de mayor compatibilidad (Ingenierías, Biomédicas o Sociales).
    2. **Podio de Honor de Carreras UNSA**: Top 3 carreras específicas recomendadas con medallas distintivas (Oro, Plata, Bronce), porcentaje de afinidad vocacional y puntajes referenciales históricos de corte en admisión UNSA.
    3. **Diagnóstico de Aptitudes Vocacionales**: 4 competencias cognitivas evaluadas (Razonamiento Lógico, Pensamiento Espacial, Capacidad Analítica, Proyección Vocacional) con niveles cualitativos (`Sobresaliente` y `Avanzado`).
    4. **Plan Estratégico de Asignaturas**: Lista de materias prioritarias del prospecto CEPREUNSA que el postulante debe priorizar para maximizar su puntaje.
    5. **Acción Directa**: Botón principal "Empezar mi Ruta para esta Carrera en RASTRO", que guarda la carrera objetivo en el perfil y redirige automáticamente al temario en `/aprender`.

- **Reordenamiento y Despeje de Formulario & Mnemotecnias (`FormularioPage.jsx`)**:
  - *Problema*: Desorden visual, botones amontonados y exceso de textos largos e introducciones innecesarias.
  - *Solución*:
    1. Cabecera limpia y compacta con botón `< Volver` directo (`navigate(-1)`), selector de temas y conteo total de fórmulas.
    2. *Segmented Control* estilo iOS/Material You de 2 posiciones para alternar entre `Cara A: Fórmulas Exactas` y `Cara B: Bóveda Mnemotecnias`.
    3. Buscador Google-like simplificado con botón de limpieza inmediata.
    4. Pestañas de modo de visualización (`Pizarra Detallada`, `Ficha de Bolsillo`, `Guardadas`) y selector segmentado de nivel (`Todos`, `Básicas`, `Aplicadas`, `Atajos Pre-U`), eliminando texto explicativo de relleno.

- **Fijación Estricta de Bordes en Pomodoro Flotante (`PomodoroFloatingPill.jsx`)**:
  - *Problema*: Al minimizar la app o el temporizador, la píldora se desplazaba fuera de los límites de la pantalla a zonas inaccesibles.
  - *Solución*:
    1. Anclaje lateral exclusivo (`dockSide: left | right`) fijado a `8px` del borde de la pantalla.
    2. Restricción de arrastre a eje Y (`drag="y"`) con abrazaderas numéricas que garantizan que nunca se oculte tras la barra de estado superior ni la barra de navegación inferior (`minY = 76`, `maxY = window.innerHeight - 140`).
    3. Botón táctil para conmutar de lateral de pantalla con 1 toque.

- **Corrección de Solicitud Repetida de Nombre de Usuario (`AuthContext.jsx`)**:
  - *Problema*: El modal de ingreso de nombre de usuario aparecía repetidamente tras cada inicio de sesión con Google.
  - *Solución*: Se reforzó la verificación de `needsUsername` considerando el `displayName` de Firebase/Google y el registro en `localStorage` (`rastro_username_chosen*`), evitando abrir el formulario si ya existe un nombre asignado. El usuario conserva la posibilidad de editarlo cuando desee en su Perfil.

- **Reorientación de la Frase Motivacional Dinámica (`Home.jsx`)**:
  - Se reutilizó el efecto dinámico de cambio de palabras en un chip de objetivo académico destacado: `Objetivo UNSA: [Tu Vacante Directa / Tu Ingreso a la UNSA / Cómputo General / ...]`, con animación suave entre términos.

- **Micro-Tooltips Táctiles en Iconos Superiores (`LiquidNavbar.jsx`)**:
  - *Problema*: Los usuarios nuevos no sabían qué hacían los iconos SVG de la barra superior al carecer de etiquetas de texto.
  - *Solución*: Se implementó un sistema de micro-tooltips instantáneos (`triggerTooltip`) que muestra una píldora explicativa animada al tocar o pasar el cursor sobre los botones de Orstty, Chats, Notificaciones, Pomodoro, Fórmulas y Temas.

### 3.22 Reorganización de Cursos (Playlists de YouTube vs Aprender) y Desvinculación Institucional Universal (Cero "UNSA" / Cero "Perú")
- **Desvinculación Institucional Universal**:
  - Se eliminó toda mención institucional obligatoria a la "UNSA", "CEPREUNSA" o al país "Perú" de la interfaz visible en `Home.jsx`, `Cursos.jsx`, `VocationalTestModal.jsx`, `UserProfile.jsx` y `orsttyGeminiService.js`.
  - La aplicación ahora es universalmente adaptable para cualquier postulante y universidad (`"Meta de Admisión"`, `"Ingreso Universitario"`, `"Test Vocacional Universitario Oficial"`, `"Historia Nacional y Universal"`, `"Estudiante Universitario"`, `"Cachimbo Ingresante"`, `"Simulador de Admisión"`).
- **Legalidad Confirmada de Indexación de YouTube**:
  - Embeber videos y playlists públicas a través del reproductor oficial IFrame (`youtube.com/embed/...`) es **100% legal** según las Condiciones de Servicio de YouTube (Secciones 4 y 5: Licencia y Permisos de Inserción).
  - Cada visualización computa visitas, tiempo de reproducción, estadísticas de retención y anuncios para el canal original del docente, respetando los derechos de autor sin alojar ni descargar archivos protegidos.
- **Reorganización de la Sección Cursos (`Cursos.jsx`)**:
  - Se implementó un **Control Segmentado (Segmented Control)** estilo iOS / Material You en la cabecera de `Cursos.jsx` con dos pestañas de navegación:
    1. **Pestaña 1: "Playlists & Clases YouTube"**:
       - Catálogo curado oficial de materias completas (`src/data/youtubePlaylistsData.js`): Física, Química, Álgebra, Geometría, Trigonometría, Aritmética, Biología, Razonamiento Matemático, Razonamiento Verbal, Historia Nacional y Universal, Filosofía y Psicología.
       - Cada tarjeta detalla el canal de YouTube, docente, cantidad de lecciones del ciclo, temas clave y botón directo para reproducir la clase o abrirla en YouTube.
       - Modal reproductor embebido oficial IFrame (`src/components/YouTubePlayerModal.jsx`) con aspect ratio 16:9, selector de capítulos/lecciones y créditos al creador.
       - Acceso para que la comunidad y docentes compartan sus propios cursos y playlists.
    2. **Pestaña 2: "Rutas Temáticas & Aprender"**:
       - Conexión directa a los 15 Mundos de Aprendizaje por Niveles interactivos de la sección `/aprender`.
       - Acceso directo a Fichas de Estudio (Flashcards) por materia.
       - Tarjeta destacada del **Formulario Preuniversitario** (KaTeX con fórmulas, despejes y calculadora).
       - Grilla de cursos dinámicos creados por la comunidad académica.

### 3.23 Desconexión de Videos Privados de Firebase y Uso Exclusivo de Canales Públicos de YouTube
- **Motivo y Cumplimiento de Derechos de Autor**:
  - Los videos y cursos previamente asociados a servidores y bases de datos privadas no cuentan con autorización formal de los creadores.
  - Para blindar legalmente el proyecto y evitar cualquier riesgo ante Google Play Store, se implementó la desconexión total de videos y academias privadas mediante `VERSION_CONFIG.disconnectFirebaseVideos = true` en `src/config/appVersionConfig.js`.
- **Desconexión Técnica Segura (Sin Borrado de Datos)**:
  - En `Cursos.jsx`, se anularon las suscripciones en tiempo real a las colecciones de Firestore `cursos` y `academias`, retornando listas vacías en la vista pública.
  - En `AcademyDetail.jsx`, se bloqueó la carga y suscripción de datos privados y se desplegó una pantalla informativa elegante ("Contenido en Trámite de Autorización") que orienta al estudiante hacia los cursos y videoclases públicas de YouTube.
  - La base de datos original permanece intacta en Firestore para ser reactivada en el futuro cuando se obtengan las licencias y permisos correspondientes.
- **Canales Públicos Curados (`src/data/youtubePlaylistsData.js`)**:
  - Se configuró la estructura modular de videoclases y ciclos 100% públicos de YouTube destacando canales reconocidos como **Física Pre** y **Física con Carlitos**, junto a materias universales (Química, Álgebra, Biología, Razonamiento Matemático, Razonamiento Verbal, Historia y Filosofía).
  - Toda la tarjeta de curso es interactiva con animación táctil `whileTap`, modal oficial IFrame con soporte para tecla Escape y bloqueo de desplazamiento de fondo.

### 3.24 Vista Previa Visual Viva (`android:previewLayout`) en Selector de Widgets Android 12+
- **Mejora de Experiencia de Usuario Nativa (Estilo Google / Duolingo)**:
  - Se configuró el atributo `android:previewLayout` en los 6 metadatos XML de AppWidget (`android/app/src/main/res/xml/widget_*_info.xml`):
    - `widget_daily_streak_info.xml` (`@layout/widget_daily_streak`)
    - `widget_weekly_streak_info.xml` (`@layout/widget_weekly_streak`)
    - `widget_mini_streak_info.xml` (`@layout/widget_mini_streak`)
    - `widget_pomodoro_info.xml` (`@layout/widget_pomodoro`)
    - `widget_study_reminder_info.xml` (`@layout/widget_study_reminder`)
    - `widget_exam_countdown_info.xml` (`@layout/widget_exam_countdown`)
  - En Android 12 y versiones superiores, el selector de widgets del launcher renderiza directamente la vista previa visual real con sus tipografías, mascotas y colores, eliminando las vistas previas vacías o genéricas.

### 3.25 Sistema nuevo Videos YouTube por cuenta (aislado, arranque vacío, privado por defecto)
- **Aislamiento**: colección nueva `rastro_yt_playlists`. NO lee `cursos`, `academias`, `youtubePlaylistsData.js` (vacío) ni `localStorage rastro_custom_youtube_playlists`. Briceño/Esparta/Kelsen siguen ocultos por `VERSION_CONFIG.disconnect*`. Bloque antiguo en `Cursos.jsx` sigue en `{false && ...}`.
- **Archivos**: `src/lib/userPlaylistsService.js` (nuevo, CRUD + `toPlayerCourse`), `src/components/AddPlaylistModal.jsx` (nuevo, URL/ID + validación), `src/utils/videoValidation.js` (extendido: shorts, `extractPlaylistId`, `parseYouTubeInput`), `src/pages/Cursos.jsx` (sección visible `Videos YouTube` con tabs Mías/Compartidas/Oficial + `YouTubePlayerModal` reutilizado + muro cuenta `hideGuest`).
- **Privacidad**: nace `isShared:false` (solo dueño). Botón `Compartir/Compartida` conmuta público. `Oficial` vacío hasta que el admin marque `isCurated:true` desde la app. Arranque con cero videos, solo CTA Agregar.
- **Fix colateral**: `allYtPlaylists` referenciaba `YOUTUBE_COURSES_CATALOG` sin import (ReferenceError en runtime). Cambiado a `[...customPlaylists]` aislado.
- **Reglas**: `firestore.rules` con bloque `rastro_yt_playlists` PROPUESTO sin desplegar (crear solo dueño con `isShared/isCurated/isHidden:false`; leer público solo si `isShared && !isHidden`; update/delete dueño o autor). Requiere `firebase deploy --only firestore:rules` con permiso explícito. Sin eso, la escritura falla y la lectura compartida no sale.
- **Build**: `npm run build` OK (16.39s) + `npx cap sync android` OK.

### 3.26 Fix crash Aprender (`DuolingoFlameIcon is not defined`)
- **Causa**: `src/pages/Aprender.jsx:812` usaba `<DuolingoFlameIcon>` sin import (solo `MiRachaModal` y `StudyWidgetsHub` lo importaban). Rompía toda la pestaña Aprender con pantalla "Algo salió mal".
- **Fix**: agregado `import { DuolingoFlameIcon } from '../components/DuolingoFlameIcon'` (1 línea, sin tocar diseño ni accesos).
- **Build**: `npm run build` OK (13.60s) + `npx cap sync android` OK.

### 3.27 Textos de notificaciones en lenguaje de app
- `NotificationsModal.jsx`: "Pop-ups en el Teléfono (Android)" → "Notificaciones"; subtextos a "Permite avisos de clases y simulacros." / "Activas: recibirás avisos de clases y simulacros."
- `SettingsModal.jsx`: "Alertas en el Teléfono (Pop-ups)" → "Notificaciones".
- Solo textos, sin tocar flujos ni permisos. Build + `cap sync` OK.

### 3.28 Recordatorios por hora Lima sin alarma + menú ⋯ móvil sin Pomodoro/Fórmulas
- `src/lib/notifications.js`: `scheduleDailyStudyReminder` reescrita. Fuera los 3 `schedule:{at}` exactos (8:30/16:30/20:30 del dispositivo) que invocaban el permiso de "alarmas" de Android. Ahora calcula hora de `America/Lima` con `Intl` (no del dispositivo) y muestra 1 aviso inmediato por ventana (mañana 7-11, tarde 15-19, noche 19-24, flag diario `rastro_lima_reminder_*`). Condición: sin alarma exacta no hay avisos con app cerrada, solo al abrirla.
- `src/components/LiquidNavbar.jsx`: menú ⋯ en móvil (`isMobileNav`) ya no muestra "Fórmulas & Truquitos Pre-U" ni "Temporizador Pomodoro". Siguen en escritorio y por sus accesos (icono superior, Cursos, Inicio). Sin tocar accesos.
- Build + `cap sync` OK.

### 3.29 Ventanita inicial de mascotas pidiendo notificaciones
- `src/components/NotifWelcomeModal.jsx` (nuevo): ORSTTY (`waving`) + ARTYON (`happy`) vía `ORSTTY_EMOTIONS`/`ARTYON_EMOTIONS` (`resolveMascotAsset`, archivos verificados en `public/assets/mascots/`). Texto "¿Nos permites enviarte notificaciones?", botones "Sí, permitir" (pide permiso + 1 aviso) y "No quiero". Sale 1 sola vez al inicio (flag `rastro_notif_welcome_seen`), no bloquea login.
- `src/App.jsx`: montado junto a `DeviceNotificationsListener`.
- Build + `cap sync` OK.

## 4. Si falla algo, mira aquí

| Síntoma | Revisar |
|---|---|
| Login Google en Play | Logcat `GoogleProvider` → `signingSha1` vs lista §2; `webClientId` compilado en `dist` |
| Login Google en debug | `.env`, `google-services.json`, SHA debug |
| Notificaciones no llegan/activan | `notifications.js` estado + permiso OS + claves §3.5 |
| Racha no sube | `GamificationContext advanceStreak`, fecha local, doc `gamificacion/rastro_progress` |
| Pide nombre de nuevo | flags `rastro_username_chosen*` en localStorage |
| Carrusel con gente de más | fuentes en `AliadosCarousel loadAllies` |
| Contenido borrado por error | Debe ser ocultar: `handleDeleteGeneric`, `handleDeleteAllyCard` |
| Pantalla blanca al abrir | `index.html` pre-pintado, `ThemeContext`, `styles.xml` |
| Pantalla blanca al minimizar Pomodoro | `PomodoroFloatingPill` hooks incondicionales, `AnimatePresence` y `ErrorBoundary` en App (§3.17) |
| ORSTTY visualmente saturado o doble header | `OrsttyPage` full-screen, `OrsttyChat` header unificado y carrusel chips (§3.18) |
| Permisos denegados Firestore | `firestore.rules` + consola (último deploy reglas) |
| IA sin respuesta | `server.ts`, `GEMINI_API_KEY`, rate limit |

## 5. Pendientes (no olvidar)

- Testers + 14 días + informe previo; capturas de ficha; SHA Play ya registrado (revisar si cambia llave).
- Activar proveedor Email/Password en consola.
- Storage: activar y desplegar `storage.rules` cuando se use.
- [LISTO] Widgets: reactivados, corregido bug de toque WebView, diseño Duolingo con mascotas oficiales y shortcuts en launcher.
- Lección: botón atrás del sistema → diálogo "¿ya te vas?".
- ORSTTY/Pomodoro como páginas integradas (investigado, sin construir).
- R8 y AGP 9: descartados por ahora.
- `deleteDoc` restantes de gestión (libros, solicitudes, notifs): decidir si pasan a ocultar.
- Revisar consumo de `streakFreeze` infinito (§3.4).

## 6. APK y publicación Play (cómo generar cada versión)

- El APK/AAB se genera en Android Studio: abrir carpeta `android/` → Build → Generate Signed Bundle/APK → **Android App Bundle** → keystore `Documents\rastro-release.jks` (alias `rastro`) → variante **release**.
- Sale en `android/app/release/` (NO se sube a GitHub).
- Cada subida exige `versionCode` mayor (`android/app/build.gradle`); `versionName` es el texto visible.
- Las 3 llaves y sus SHA-1:
  - Debug (PC, Run): `28:7E:63:...:10:73:80`
  - Carga/Upload (`.jks` propio, solo para subir): ver huellas en §2 (cf0d / 2844)
  - Firma Play (la que instalan testers/usuarios): `29:C5:E8:91:...:AB:27:D9` ← la que vale para login
- Tras subir a pista cerrada: copiar SHA-1 de Play (Firma de apps) a Firebase si cambia; testers reinstalan desde Play.
- Web y APK van separados: el APK lleva copia congelada de `dist/` del día del `cap:sync`. Siempre `npm run build` + `cap:sync` ANTES de generar el AAB.

## 7. Addendum v1.0.1 → v1.0.2 (post-seguridad)

- **Login triple**: correo promovido a primera clase + recuperar contraseña (`Auth.jsx`, wrappers en `AuthContext`); invitado (`loginGuest`, `GuestSaveBanner.jsx`, fusión auto o diálogo de conflicto `resolveGuestConflict`); Drive bloqueado para invitados con aviso (`ensureDriveToken`, `UploadModal`).
- **Accesos**: libre todo SALVO `/perfil` (`RequireAccount` en `App.jsx`), `/chats` y Subir (muro `GoogleSignPromptModal hideGuest` en `UploadModal` + tabs chat de `UserProfile`). Muro `AccessGate` desactivado (`if (!user && false)`); navbar cursos libre.
- **Notificaciones nativas**: plugin `@capacitor/local-notifications`; rama nativa en `triggerSystemNotification` + permiso OS; BUG corregido (Ajustes escribía otra clave que el motor).
- **Racha**: cuenta al abrir la app + fechas LOCALES (era UTC); widgets y recordatorio en local.
- **Username**: memoria local `rastro_username_chosen[_uid]` (no lo repide tras actualizar).
- **Carrusel**: tope 10 + "Ver todos"; vista pública SOLO creador + 10+ aportes (fuentes solicitudes/destacados fuera).
- **Biblioteca**: maestro `disableAllOficiales`; moderación SOLO-OCULTAR (`handleDeleteGeneric`, `handleDeleteAllyCard`); papelera reetiquetada.
- **Imágenes**: borradas sin uso; `LOGOR`→applogo; kelsen→aviso; mascotas remapeadas (feliz/pensativo).
- **Icono único**: `public/applogo.png` = logo RASTRO Preuniversitario (PWA, favicon, notifs, avatares); `rastro-pwa-icon*.png` ELIMINADOS y referencias a applogo; mipmaps regenerados; `play-store/` regenerado.
- **UI/perf**: tema pre-pintado + fondo síncrono; ventana/WebView `#F2F2F7`; sin blur en Settings/Tema/Pomodoro; Tema sin rebote; `willChange`; sin `background-attachment: fixed`; flashcards lazy + prewarm datos-primero; chat topado 40; Pomodoro (botón atrás navega; layout 1 columna; header iconos; steppers 34px); paleta Tema en header móvil; WhatsApp flotante solo Inicio; popups fuera de rutas legales; aviso IA; `/eliminar-cuenta`; assetlinks + filtro App Links.
- **Reglas (fix post-deploy)**: `gamificacion` propia + `system_config` pública.
- **Play**: AAB v1 subido (versionCode 1); login Play verificado por Logcat; SHA firma `29:C5:E8:91:...:AB:27:D9` registrado (el `CF:0D` era otra llave).
- **Git**: tags `v1.0`, `v1.0.1`, `v1.0.2`. REGLA: no push sin permiso explícito.
- **Errores de refactors externos corregidos**: `isUserAdmin` (redefinido seguro en `UserProfile`), `Compass` (import en `MnemotecniasVaultView`), `isListening` (stub fijo en `OrsttyChat`); examen `CICLO ESCOLARES`→`CEPREQUINTOS` (`StudyWidgetsHub`).
- **DECISIÓN VIDEOS (importante)**: los videos actuales (Firebase: videos de academias; local: arrays como `youtubePlaylistsData.js`) NO se usan: quedan intactos y AISLADOS. El sistema futuro será de playlists PÚBLICAS de YouTube agregadas por admin y usuarios, guardadas por cuenta. Lo curado por el autor irá a Firebase o local, PERO AÚN NO (solo plan, sin implementar ni contenido inicial).
