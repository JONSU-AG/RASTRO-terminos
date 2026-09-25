import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { triggerSystemNotification, getNotificationStatus } from '../lib/notifications';

export const DeviceNotificationsListener = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const notifiedIdsRef = useRef(new Set());
  const initialLoadTimeRef = useRef(Date.now());

  // 1. Escuchar mensajes del Service Worker cuando el usuario toca la notificación en el panel de Android
  useEffect(() => {
    const handleSwMessage = (event) => {
      if (event.data && event.data.type === 'NOTIFICATION_NAVIGATE') {
        const rawUrl = event.data.rawUrl || event.data.url || '/aprender';
        try {
          // Extraer la ruta limpia para HashRouter (ejemplo: '/aprender' desde '#/aprender' o 'https://domain.com/RUMBO/#/aprender')
          let cleanRoute = rawUrl;
          if (cleanRoute.includes('#')) {
            cleanRoute = cleanRoute.substring(cleanRoute.indexOf('#') + 1);
          }
          if (cleanRoute.startsWith('/#')) {
            cleanRoute = cleanRoute.replace('/#', '');
          }
          if (!cleanRoute.startsWith('/')) {
            cleanRoute = '/' + cleanRoute;
          }

          if (rawUrl.includes('openAvisos=true')) {
            window.dispatchEvent(new CustomEvent('rastro-open-notificaciones'));
          } else {
            navigate(cleanRoute);
          }
        } catch (e) {
          console.warn('Error handling SW message navigation:', e);
          navigate('/aprender');
        }
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleSwMessage);
    }

    return () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleSwMessage);
      }
    };
  }, [navigate]);

  // 2. Escuchar notificaciones en Firestore para enviarlas al panel del dispositivo Android
  useEffect(() => {
    if (!user?.uid) return;

    let isFirstUserSnapshot = true;
    let isFirstAllSnapshot = true;

    // Función para extraer el texto real del mensaje sin prefijos redundantes
    const extractNotificationContent = (data) => {
      const sender = data.senderName || 'Estudiante';
      let title = '🎓 RASTRO';
      let body = '';
      let targetUrl = '/';

      // Extrae texto real si viene formateado con comillas o prefijos conocidos
      const cleanQuotedText = (raw) => {
        if (!raw || typeof raw !== 'string') return '';
        const match = raw.match(/:\s*["“](.+)["”]$/);
        if (match && match[1]?.trim()) {
          return match[1].trim();
        }
        return raw
          .replace(/^te envió un mensaje privado:\s*/i, '')
          .replace(/^te envió un mensaje:\s*/i, '')
          .replace(/^publicó en tu muro:\s*/i, '')
          .replace(/^publicó en su muro:\s*/i, '')
          .replace(/^comentó en tu publicación:\s*/i, '')
          .replace(/^comentó en tu material:\s*/i, '')
          .replace(/^comentó:\s*/i, '')
          .replace(/^["“]|["”]$/g, '')
          .trim();
      };

      const rawText = data.text || data.content || '';
      const messageClean = cleanQuotedText(data.message);
      const actualText = rawText || messageClean || data.message || '';

      switch (data.type) {
        case 'chat':
        case 'mensaje':
        case 'direct_message': {
          title = `💬 ${sender}`;
          body = actualText || (data.imageUrl ? '📷 Te envió una foto' : 'Te envió un nuevo mensaje');
          targetUrl = `/chats?with=${data.senderUid || ''}`;
          break;
        }

        case 'nuevo_material':
        case 'material': {
          title = `📚 ${sender} subió material`;
          const docTitle = data.postTitle || data.title || actualText;
          body = docTitle ? `"${docTitle}"` : 'Nuevo material de estudio disponible';
          targetUrl = data.targetPath || `/biblioteca?materialId=${data.materialId || data.postId || ''}`;
          break;
        }

        case 'wall_post':
        case 'post': {
          title = `📝 ${sender} en el Muro`;
          body = actualText ? `"${actualText}"` : 'Compartió una nueva publicación en el muro';
          const targetProfile = data.profileUid || data.senderUid || user?.uid || '';
          targetUrl = data.targetPath || `/usuario/${targetProfile}?tab=muro${data.postId ? `&postId=${data.postId}` : ''}`;
          break;
        }

        case 'comment': {
          title = `💬 Comentario de ${sender}`;
          body = actualText ? `"${actualText}"` : 'Comentó en tu publicación';
          const wallProfile = data.profileUid || user?.uid || '';
          targetUrl = data.targetPath || `/usuario/${wallProfile}?tab=muro${data.postId ? `&postId=${data.postId}` : ''}`;
          break;
        }

        case 'reaction': {
          title = `❤️ Reacción de ${sender}`;
          body = data.message || `Reaccionó a tu publicación ${data.postTitle ? `"${data.postTitle}"` : ''}`;
          const wallProfile = data.profileUid || user?.uid || '';
          targetUrl = data.targetPath || `/usuario/${wallProfile}?tab=muro${data.postId ? `&postId=${data.postId}` : ''}`;
          break;
        }

        case 'follow': {
          title = `👤 ${sender}`;
          body = `${sender} comenzó a seguirte en Rumbo`;
          targetUrl = data.targetPath || `/usuario/${data.senderUid || ''}`;
          break;
        }

        case 'admin_broadcast':
        case 'aviso': {
          title = `📢 ${data.title || 'Aviso Oficial RUMBO'}`;
          body = actualText || data.body || 'Nuevo comunicado para la comunidad estudiantil';
          targetUrl = '/?openAvisos=true';
          break;
        }

        case 'admin_warning': {
          title = `⚠️ ${data.title || 'Aviso de Moderación'}`;
          body = actualText || data.body || 'Has recibido una notificación de moderación';
          targetUrl = '/';
          break;
        }

        default: {
          title = data.title || `🎓 ${sender || 'RUMBO'}`;
          body = actualText || data.body || data.message || 'Tienes una nueva notificación';
          targetUrl = data.targetPath || '/';
          break;
        }
      }

      return { title, body, targetUrl };
    };

    const processDoc = (docSnap) => {
      const data = docSnap.data();
      const id = docSnap.id;

      if (!data) return;
      if (notifiedIdsRef.current.has(id)) return;

      // Si ya está leída, no alertar
      if (data.read) return;

      const notifTime = data.createdAt?.toMillis 
        ? data.createdAt.toMillis() 
        : (typeof data.timestamp === 'number' ? data.timestamp : 0);

      // Descartar solo si tiene fecha explícita y es anterior a cuando se inició la app
      if (notifTime > 0 && notifTime < initialLoadTimeRef.current - 15000) {
        notifiedIdsRef.current.add(id);
        return;
      }

      // Marcar como procesada para no duplicar alertas
      notifiedIdsRef.current.add(id);

      // Extraer título, cuerpo exacto del mensaje y enlace de destino
      const { title, body, targetUrl } = extractNotificationContent(data);

      triggerSystemNotification({
        title,
        body,
        icon: data.senderPhoto || '/assets/rastro-pwa-icon-192.png',
        data: { url: targetUrl, notifId: id },
        tag: `rastro-notif-${id}`
      });
    };

    // Consultas a Firestore
    const qUser = query(
      collection(db, 'notificaciones'),
      where('recipientUid', '==', user.uid),
      where('read', '==', false)
    );

    const qAll = query(
      collection(db, 'notificaciones'),
      where('recipientUid', '==', 'all')
    );

    const unsubUser = onSnapshot(qUser, (snap) => {
      if (isFirstUserSnapshot) {
        snap.docs.forEach((d) => notifiedIdsRef.current.add(d.id));
        isFirstUserSnapshot = false;
        return;
      }
      snap.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          processDoc(change.doc);
        }
      });
    }, (err) => console.warn('User notif listener error:', err));

    const unsubAll = onSnapshot(qAll, (snap) => {
      if (isFirstAllSnapshot) {
        snap.docs.forEach((d) => notifiedIdsRef.current.add(d.id));
        isFirstAllSnapshot = false;
        return;
      }
      snap.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          processDoc(change.doc);
        }
      });
    }, (err) => console.warn('Broadcast notif listener error:', err));

    return () => {
      unsubUser();
      unsubAll();
    };
  }, [user?.uid]);

  // 3. Verificación automática de recordatorio de racha y estudio diario
  useEffect(() => {
    if (!user?.uid) return;

    const timer = setTimeout(() => {
      const status = getNotificationStatus();
      if (!status.isEnabled) return;

      const todayStr = (() => { const d = new Date(); const m = String(d.getMonth() + 1).padStart(2, '0'); const day = String(d.getDate()).padStart(2, '0'); return `${d.getFullYear()}-${m}-${day}`; })();
      const lastStreakCheck = localStorage.getItem(`rastro_last_streak_check_${user.uid}`);

      if (lastStreakCheck !== todayStr && status.streakReminder) {
        localStorage.setItem(`rastro_last_streak_check_${user.uid}`, todayStr);

        let streak = 0;
        let lastActiveDate = null;

        // Intentar leer el estado de gamificación local
        const possibleKeys = ['rastro_gamification_v1', `rumbo_gamification_${user.uid}`];
        for (const key of possibleKeys) {
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (typeof parsed.streak === 'number') streak = parsed.streak;
              if (parsed.lastActiveDate) lastActiveDate = parsed.lastActiveDate;
              break;
            } catch (e) {
              console.warn('Error reading gamification storage:', e);
            }
          }
        }

        // Si el usuario ya practicó hoy, no interrumpirlo con el aviso
        if (lastActiveDate === todayStr) return;

        let title = '';
        let body = '';

        const dayOfMonth = new Date().getDate();

        if (streak > 0) {
          const streakMessages = [
            `No necesitas estar motivado para comenzar, eso es disciplina. ¡Protege tu racha de ${streak} ${streak === 1 ? 'día' : 'días'} hoy! 🔥`,
            `La motivación te hace empezar, pero la disciplina te da el ingreso. ¡Tus ${streak} ${streak === 1 ? 'día' : 'días'} de constancia valen la pena! 💪`,
            `El éxito no es suerte, es disciplina diaria. Resuelve 1 lección hoy y mantén tus ${streak} ${streak === 1 ? 'día' : 'días'} intactos. ✨`,
            `¡Que no se apague tu fuego! La disciplina se construye día a día en RASTRO. Protege tus ${streak} ${streak === 1 ? 'día' : 'días'} consecutivos. 🚀`
          ];
          const chosenMsg = streakMessages[(dayOfMonth + streak) % streakMessages.length];
          title = `🔥 ¡Protege tu Racha de ${streak} ${streak === 1 ? 'Día' : 'Días'}!`;
          body = chosenMsg;
        } else {
          const noStreakMessages = [
            `No necesitas estar motivado para comenzar, eso es disciplina. ¡Resuelve tu primera lección hoy y enciende tu racha! 🔥`,
            `La motivación es el chispazo, pero la disciplina enciende el motor. ¡Empieza tu racha de estudio en RASTRO hoy! 🚀`,
            `Tu ingreso a la universidad se construye con la pregunta que resuelves hoy. ¡Inicia tu racha de constancia! 💪`,
            `El mejor momento para empezar fue ayer, el segundo mejor momento es AHORA. ¡Comienza tu racha de estudio! ✨`
          ];
          const chosenMsg = noStreakMessages[dayOfMonth % noStreakMessages.length];
          title = `🚀 ¡Empieza tu Racha de Estudio Hoy!`;
          body = chosenMsg;
        }

        triggerSystemNotification({
          title,
          body,
          icon: 'assets/rastro-pwa-icon-192.png',
          data: { url: '/aprender' },
          tag: `rastro-streak-reminder-${todayStr}`
        });
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [user?.uid]);

  return null;
};
