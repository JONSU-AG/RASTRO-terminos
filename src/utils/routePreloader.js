// Preloader de módulos y rutas RASTRO para navegación ultra veloz (0 ms delay)

const routeImports = {
  home: () => import('../pages/Home'),
  aprender: () => import('../pages/Aprender'),
  cursos: () => import('../pages/Cursos'),
  academyDetail: () => import('../pages/AcademyDetail'),
  biblioteca: () => import('../pages/Biblioteca'),
  simulador: () => import('../pages/Simulador'),
  auth: () => import('../pages/Auth'),
  admin: () => import('../pages/Admin'),
  userProfile: () => import('../pages/UserProfile'),
  chats: () => import('../pages/Chats'),
  orstty: () => import('../pages/OrsttyPage'),
  formulario: () => import('../pages/FormularioPage'),
  politicas: () => import('../pages/PoliticasPage'),
  eliminarCuenta: () => import('../pages/EliminarCuenta')
};

const loadedCache = new Set();

export const prefetchRouteByPath = (path) => {
  if (!path) return;
  const p = path.toLowerCase();
  
  let key = null;
  if (p === '/') key = 'home';
  else if (p.startsWith('/aprender')) key = 'aprender';
  else if (p.startsWith('/cursos')) key = 'cursos';
  else if (p.startsWith('/simulador')) key = 'simulador';
  else if (p.startsWith('/biblioteca')) key = 'biblioteca';
  else if (p.startsWith('/chats')) key = 'chats';
  else if (p.startsWith('/orstty')) key = 'orstty';
  else if (p.startsWith('/perfil') || p.startsWith('/usuario')) key = 'userProfile';
  else if (p.startsWith('/formulario')) key = 'formulario';
  else if (p.startsWith('/politicas') || p.startsWith('/privacidad') || p.startsWith('/privacy') || p.startsWith('/terminos')) key = 'politicas';
  else if (p.startsWith('/eliminar-cuenta') || p.startsWith('/delete-account')) key = 'eliminarCuenta';
  else if (p.startsWith('/admin')) key = 'admin';
  else if (p.startsWith('/auth')) key = 'auth';

  if (key && routeImports[key] && !loadedCache.has(key)) {
    loadedCache.add(key);
    routeImports[key]().catch(() => {
      loadedCache.delete(key);
    });
  }
};

export const preloadAllMainRoutes = () => {
  const mainKeys = ['home', 'aprender', 'cursos', 'simulador', 'biblioteca', 'chats', 'userProfile', 'formulario', 'orstty'];
  
  const runPreload = () => {
    mainKeys.forEach((key, index) => {
      setTimeout(() => {
        if (!loadedCache.has(key) && routeImports[key]) {
          loadedCache.add(key);
          routeImports[key]().catch(() => loadedCache.delete(key));
        }
      }, index * 100);
    });
  };

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(runPreload, { timeout: 2000 });
  } else {
    setTimeout(runPreload, 300);
  }
};

export { routeImports };
