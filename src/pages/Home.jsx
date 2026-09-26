import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Library, 
  Cpu, 
  Info, 
  FileText, 
  UploadCloud, 
  HardDrive, 
  Link as LinkIcon, 
  Sparkles,
  User,
  Shield,
  CheckCircle,
  Share2,
  ArrowRight,
  Loader2,
  MessageCircle,
  ExternalLink,
  Check,
  Folder,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  X,
  ChevronRight,
  Layers,
  Lock,
  Zap,
  Target,
  Trophy,
  Flame,
  Edit3,
  Eye,
  Smartphone,
  Video,
  Crown,
  MessageSquare,
  Compass,
  Calculator,
  Binary
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { StudyWidgetsHub } from '../components/StudyWidgetsHub';
import { AliadosCarousel, WhatsAppIconSVG, TikTokIconSVG } from '../components/AliadosCarousel';
import { useGamification } from '../context/GamificationContext';
import { LiveUserAvatar } from '../components/LiveUserAvatar';
import { DualMascotDuo, DynamicMascot } from '../components/Mascots';
import { UploadModal } from '../components/UploadModal';
import { SuccessModal } from '../components/SuccessModal';
import { VocationalTestModal } from '../components/VocationalTestModal';
import { db, storage } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, setDoc, increment, query, where, getDocs } from 'firebase/firestore';
import { useAuth, isAuthorOfFirebase } from '../context/AuthContext';
import { uploadFileToUserDrive, getDriveFileId } from '../lib/storageHelper';

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const Home = () => {
  const { user, userData, isAdmin, ensureDriveToken } = useAuth();
  const { streak: gamificationStreak } = useGamification();
  const profileDisplayName = useMemo(() => {
    // 1. Datos del documento Firestore
    const rawUserData = userData?.displayName || userData?.name || userData?.username;
    if (typeof rawUserData === 'string' && rawUserData.trim().length > 0) {
      const clean = rawUserData.trim();
      if (clean !== 'Estudiante RASTRO' && clean !== 'Estudiante RUMBO') return clean;
    }

    // 2. Datos de Firebase Auth
    const rawAuth = user?.displayName;
    if (typeof rawAuth === 'string' && rawAuth.trim().length > 0) {
      const clean = rawAuth.trim();
      if (clean !== 'Estudiante RASTRO' && clean !== 'Estudiante RUMBO') return clean;
    }

    // 3. Memoria local o sesión previa
    try {
      const prefName = sessionStorage.getItem('rastro_preferred_username') || localStorage.getItem('rastro_preferred_username');
      if (prefName && prefName.trim().length > 0) return prefName.trim();

      if (user?.uid) {
        const storedUid = localStorage.getItem(`rastro_username_${user.uid}`) || localStorage.getItem(`rastro_username_chosen_${user.uid}`);
        if (storedUid && storedUid.trim().length > 0) return storedUid.trim();
      }

      const storedAlly = localStorage.getItem('rumbo_ally_card');
      if (storedAlly) {
        const parsed = JSON.parse(storedAlly);
        if (parsed?.name && typeof parsed.name === 'string' && parsed.name.trim().length > 0) {
          return parsed.name.trim();
        }
      }

      const generalName = localStorage.getItem('rastro_user_name') || localStorage.getItem('rumbo_user_name') || localStorage.getItem('rastro_username_chosen');
      if (generalName && generalName.trim().length > 0) return generalName.trim();
    } catch {}

    // 4. Prefijo del correo si existe
    if (user?.email && typeof user.email === 'string') {
      const emailPrefix = user.email.split('@')[0].trim();
      if (emailPrefix) return emailPrefix;
    }

    // 5. Fallback seguro garantizado (nunca vacío)
    const fallback = (userData?.displayName && userData.displayName.trim()) || (user?.displayName && user.displayName.trim()) || 'Estudiante';
    return fallback.replace(/\s+(RASTRO|RUMBO)$/i, '').trim() || 'Estudiante';
  }, [userData, user]);

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successContent, setSuccessContent] = useState({ title: '', message: '' });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isVocationalModalOpen, setIsVocationalModalOpen] = useState(false);

  // Tabs: 'material' (Subida de Material) | 'aliado' (Ser Aliado)
  const [formTab, setFormTab] = useState('material');

  // Material Form State (del index anterior, enriquecido y fiel)
  const [matTitle, setMatTitle] = useState('');
  const [matCategory, setMatCategory] = useState('tomos'); // 'tomos' | 'practicas' | 'examenes' | 'resumenes'
  const [isHomeCategoryOpen, setIsHomeCategoryOpen] = useState(false);
  const homeCategoryRef = React.useRef(null);

  const CATEGORIES_HOME = [
    { id: 'tomos', label: 'Tomos y Materiales', icon: BookOpen },
    { id: 'practicas', label: 'Prácticas y Bancos', icon: FileText },
    { id: 'examenes', label: 'Exámenes Pasados', icon: CheckCircle2 },
    { id: 'resumenes', label: 'Resúmenes y Apuntes', icon: Sparkles },
    { id: 'variado', label: 'Variado / Otros', icon: Layers }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (homeCategoryRef.current && !homeCategoryRef.current.contains(e.target)) {
        setIsHomeCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [matAuthor, setMatAuthor] = useState('');
  const [matSourceMode, setMatSourceMode] = useState('link'); // 'link' | 'file'
  const [matUrl, setMatUrl] = useState('');
  const [matFile, setMatFile] = useState(null);
  const [matDesc, setMatDesc] = useState('');
  const [matLoading, setMatLoading] = useState(false);
  const [matProgress, setMatProgress] = useState(0);
  const [isMatConfirmOpen, setIsMatConfirmOpen] = useState(false);

  // Aliado Form State
  const [allyName, setAllyName] = useState(userData?.displayName || user?.displayName || '');
  const [allyWhatsapp, setAllyWhatsapp] = useState('');
  const [allyTiktok, setAllyTiktok] = useState('');
  const [allyPhone, setAllyPhone] = useState('');
  const [allySubject, setAllySubject] = useState('');
  const [allyDesc, setAllyDesc] = useState('');
  const [allyLoading, setAllyLoading] = useState(false);
  const [savedAllyCard, setSavedAllyCard] = useState(() => {
    try {
      const saved = localStorage.getItem('rumbo_ally_card');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [userUploads, setUserUploads] = useState(() => {
    try {
      const saved = localStorage.getItem('rumbo_user_uploads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('rumbo_user_uploads', JSON.stringify(userUploads));
  }, [userUploads]);

  // Dynamic motto animation: Metas clave para la preparación universitaria con colores vibrantes
  const MOTTO_PHRASES = [
    { text: 'Tu Vacante Directa', color: '#007AFF', bg: 'rgba(0, 122, 255, 0.12)', border: 'rgba(0, 122, 255, 0.3)' },
    { text: 'Tu Ingreso Universitario', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
    { text: 'Máximo Puntaje', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
    { text: 'Tu Carrera Soñada', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.3)' },
    { text: 'Tu Futuro Cachimbo', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)' }
  ];
  const [mottoIndex, setMottoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMottoIndex((prev) => (prev + 1) % MOTTO_PHRASES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [MOTTO_PHRASES.length]);

  // Load user's saved Ally card from their Google/Firestore user account
  useEffect(() => {
    if (!user?.uid) return;
    const fetchUserAccountAlly = async () => {
      try {
        const userRef = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const u = snap.data();
          if (u.displayName && !allyName) setAllyName(u.displayName);
          if (u.whatsappChannel) setAllyWhatsapp(u.whatsappChannel);
          if (u.tiktokUrl) setAllyTiktok(u.tiktokUrl);
          if (u.phone) setAllyPhone(u.phone);
          if (u.specialty || u.subject) setAllySubject(u.specialty || u.subject);
          if (u.allyDesc || u.desc) setAllyDesc(u.allyDesc || u.desc);
          if (u.allyCard) setSavedAllyCard(u.allyCard);
        }
      } catch (e) {
        console.warn("User account ally fetch notice:", e);
      }
    };
    fetchUserAccountAlly();
  }, [user?.uid]);

  // Handlers
  const requestMaterialConfirmation = (e) => {
    e.preventDefault();
    if (!matTitle.trim()) {
      alert('Por favor completa el nombre del material.');
      return;
    }
    if (!matUrl.trim()) {
      alert('Por favor ingresa el enlace de Google Drive.');
      return;
    }
    setIsMatConfirmOpen(true);
  };

  const executeMaterialUpload = async () => {
    setIsMatConfirmOpen(false);
    setMatLoading(true);
    setMatProgress(15);

    try {
      let finalUrl = matUrl.trim();
      let fileMeta = null;
      let driveFileId = null;
      let driveFolderId = null;

      if (matSourceMode === 'file' && matFile) {
        if (!user) throw new Error('Debes iniciar sesión con Google para subir a tu Drive');
        setMatProgress(25);
        fileMeta = {
          name: matFile.name,
          size: formatFileSize(matFile.size),
          mimeType: matFile.type
        };
        const token = await ensureDriveToken();
        const res = await uploadFileToUserDrive(matFile, token, (progress) => {
          setMatProgress(progress);
        });
        finalUrl = res.driveUrl;
        driveFileId = res.fileId;
        driveFolderId = res.folderId;
      } else if (finalUrl) {
        const idFromLink = getDriveFileId(finalUrl);
        if (idFromLink) driveFileId = idFromLink;
      }

      setMatProgress(95);

      const categoriaLabel = matCategory === 'tomos' 
        ? 'Tomos y Materiales' 
        : (matCategory === 'practicas' 
          ? 'Prácticas' 
          : (matCategory === 'examenes' 
            ? 'Exámenes Pasados' 
            : (matCategory === 'variado' 
              ? 'Variado' 
              : 'Resúmenes y Apuntes')));

      const newUpload = {
        title: matTitle.trim(),
        author: matAuthor.trim() || profileDisplayName,
        category: matCategory,
        categoriaLabel: categoriaLabel,
        url: finalUrl,
        desc: matDesc.trim(),
        sourceMode: matSourceMode,
        fileMeta: fileMeta,
        ownerId: user?.uid || 'anonimo',
        ownerEmail: user?.email || '',
        ownerName: user?.displayName || profileDisplayName,
        driveFileId: driveFileId || getDriveFileId(finalUrl) || null,
        driveFolderId: driveFolderId || null,
        driveUrl: finalUrl,
        type: matSourceMode === 'file' 
          ? (matFile?.type?.includes('pdf') ? 'pdf' : (matFile?.type?.includes('image') ? 'imagen' : 'archivo')) 
          : 'drive',
        status: 'aprobado',
        reportsCount: 0,
        enRevision: false,
        oculto: false,
        uploadedBy: {
          uid: user ? user.uid : 'anonimo',
          name: user ? (user.displayName || user.email) : 'Usuario RASTRO',
          email: user?.email || '',
          photoURL: user?.photoURL || null
        },
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'uploads'), newUpload);
      setMatProgress(100);

      // Increment user counter
      if (user?.uid) {
        try {
          const userRef = doc(db, 'usuarios', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const newCount = (userSnap.data().uploadCount || 0) + 1;
            await updateDoc(userRef, {
              uploadCount: increment(1),
              isAlly: newCount >= 10 ? true : (userSnap.data().isAlly || false)
            });
          }
        } catch (e) {
          console.warn("User counter update:", e);
        }
      }

      setUserUploads([{
        title: matTitle.trim(),
        author: matAuthor.trim(),
        category: matCategory,
        driveUrl: finalUrl,
        desc: matDesc.trim()
      }, ...userUploads]);

      setMatTitle('');
      setMatAuthor('');
      setMatUrl('');
      setMatFile(null);
      setMatDesc('');

      setTimeout(() => {
        setMatLoading(false);
        setSuccessContent({
          title: '¡Aporte Publicado con Éxito!',
          message: 'Tu material ha sido subido a la biblioteca comunitaria de RASTRO con su respectiva confirmación y créditos.'
        });
        setIsSuccessOpen(true);
      }, 400);

    } catch (err) {
      console.warn("Save fallback locally:", err);
      setUserUploads([{
        title: matTitle.trim(),
        author: matAuthor.trim(),
        category: matCategory,
        driveUrl: matUrl.trim(),
        desc: matDesc.trim()
      }, ...userUploads]);
      setMatLoading(false);
      setSuccessContent({
        title: '¡Aporte Guardado!',
        message: 'Tu material ha sido registrado con éxito.'
      });
      setIsSuccessOpen(true);
    }
  };

  const handleEditPersonalAllyCard = () => {
    if (!savedAllyCard) return;
    setAllyName(savedAllyCard.name || '');
    setAllyWhatsapp(savedAllyCard.whatsappChannel || '');
    setAllyTiktok(savedAllyCard.tiktokUrl || '');
    setAllyPhone(savedAllyCard.phone || '');
    setAllySubject(savedAllyCard.subject || '');
    setAllyDesc(savedAllyCard.desc || '');
    setFormTab('aliado');
    const element = document.getElementById('home-forms-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAllySubmit = async (e) => {
    e.preventDefault();
    if (!allyName.trim() || !allyWhatsapp.trim()) {
      alert('Por favor ingresa tu nombre y tu canal de WhatsApp.');
      return;
    }

    const isUserAdmin = Boolean(isAdmin || isAuthorOfFirebase(user?.email) || user?.email?.includes('aguilar.jonsu'));

    let currentUploadCount = userUploads.length;
    if (user?.uid) {
      try {
        const userRef = doc(db, 'usuarios', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          currentUploadCount = Math.max(userSnap.data().uploadCount || 0, userUploads.length);
        }
      } catch (errSnap) {
        console.warn("User snap error:", errSnap);
      }
    }

    const isApproved = isUserAdmin || currentUploadCount >= 10;

    // Si NO es Admin/Creador y NO cumple con los 10 aportes, se notifica y NO se bloquea la UI en estado de carga
    if (!isUserAdmin && currentUploadCount < 10) {
      setSuccessContent({
        title: 'Aún no cumples la meta de +10 Aportes',
        message: `Actualmente cuentas con ${currentUploadCount} de 10 materiales compartidos. Para activar y publicar tu Tarjeta de Aliado RASTRO en el carrusel principal, necesitas haber aportado al menos 10 materiales a la comunidad. ¡Sigue compartiendo contenido en la pestaña "Subir Material"!`
      });
      setIsSuccessOpen(true);
      return;
    }

    setAllyLoading(true);

    try {
      const allyData = {
        name: allyName.trim(),
        whatsappChannel: allyWhatsapp.trim(),
        tiktokUrl: allyTiktok.trim(),
        phone: allyPhone.trim(),
        subject: allySubject.trim(),
        desc: allyDesc.trim(),
        uid: user?.uid || 'admin-creator',
        email: user?.email || 'aguilar.jonsu@gmail.com',
        uploadCount: isUserAdmin ? 99 : currentUploadCount,
        status: 'aprobado',
        isCreator: isUserAdmin,
        updatedAt: serverTimestamp()
      };

      try {
        const solQuery = query(collection(db, 'solicitudes_aliados'), where('uid', '==', user?.uid || 'admin-creator'));
        const solSnap = await getDocs(solQuery);
        if (!solSnap.empty) {
          solSnap.docs.forEach(async (d) => {
            await updateDoc(doc(db, 'solicitudes_aliados', d.id), allyData);
          });
        } else {
          await addDoc(collection(db, 'solicitudes_aliados'), { ...allyData, createdAt: serverTimestamp() });
        }
      } catch (eAdd) {
        console.warn("Firestore add/update warning:", eAdd);
      }

      if (user?.uid) {
        try {
          const userRef = doc(db, 'usuarios', user.uid);
          await setDoc(userRef, {
            displayName: allyName.trim(),
            whatsappChannel: allyWhatsapp.trim(),
            tiktokUrl: allyTiktok.trim(),
            phone: allyPhone.trim(),
            allyDesc: allyDesc.trim(),
            specialty: allySubject.trim(),
            isAlly: true
          }, { merge: true });
        } catch (eSet) {
          console.warn("Firestore setDoc warning:", eSet);
        }
      }

      const cardData = {
        name: allyName.trim(),
        whatsappChannel: allyWhatsapp.trim(),
        tiktokUrl: allyTiktok.trim(),
        phone: allyPhone.trim(),
        subject: allySubject.trim(),
        desc: allyDesc.trim(),
        isApproved: true,
        uploadCount: isUserAdmin ? 99 : currentUploadCount
      };
      setSavedAllyCard(cardData);
      localStorage.setItem('rumbo_ally_card', JSON.stringify(cardData));

      setAllyLoading(false);

      setSuccessContent({
        title: isUserAdmin ? '¡Perfil de Creador / Aliado Guardado!' : '¡Tarjeta de Aliado Activada!',
        message: isUserAdmin 
          ? 'Como Creador & Administrador de RASTRO, tu perfil de Aliado se ha activado inmediatamente con máxima prioridad en el carrusel de la página.'
          : `¡Felicitaciones! Cumples con la meta de +10 aportes comunitarios (${currentUploadCount} materiales compartidos). Tu tarjeta de Aliado RASTRO ya está activa y visible públicamente en el carrusel.`
      });
      setIsSuccessOpen(true);

    } catch (err) {
      console.warn("Ally registration catch:", err);
      const cardData = {
        name: allyName.trim(),
        whatsappChannel: allyWhatsapp.trim(),
        tiktokUrl: allyTiktok.trim(),
        phone: allyPhone.trim(),
        subject: allySubject.trim(),
        desc: allyDesc.trim(),
        isApproved: true,
        uploadCount: 99
      };
      setSavedAllyCard(cardData);
      localStorage.setItem('rumbo_ally_card', JSON.stringify(cardData));
      setAllyLoading(false);
      setSuccessContent({
        title: '¡Perfil de Creador Activado!',
        message: 'Tu tarjeta de Creador / Aliado RASTRO ha sido guardada y activada con éxito.'
      });
      setIsSuccessOpen(true);
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      <header className="hero-section" style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', boxSizing: 'border-box' }}>
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '980px', margin: '0 auto' }}
        >
          {/* Home Hub Estilo iOS + Google Minimalista */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Cabecera Minimalista: Saludo y Estado */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 4px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-color, #007AFF)',
                    background: 'rgba(0, 122, 255, 0.1)',
                    border: '1px solid rgba(0, 122, 255, 0.25)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Especial para Universidades Nacionales
                  </span>

                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary, #64748B)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span>Meta:</span>
                  </span>
                  
                  {/* Píldora de palabra rotativa con color vibrante y animación suave */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={mottoIndex}
                      initial={{ opacity: 0, y: 5, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.94 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 900,
                        color: MOTTO_PHRASES[mottoIndex].color,
                        background: MOTTO_PHRASES[mottoIndex].bg,
                        border: `1px solid ${MOTTO_PHRASES[mottoIndex].border}`,
                        boxShadow: `0 2px 8px ${MOTTO_PHRASES[mottoIndex].color}22`
                      }}
                    >
                      {MOTTO_PHRASES[mottoIndex].text}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  <DualMascotDuo size={46} orsttyMood="feliz" artyonMood="contento" />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h1 style={{
                      margin: 0,
                      lineHeight: 1.15,
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere'
                    }}>
                      <span style={{
                        display: 'block',
                        fontSize: 'clamp(0.82rem, 2.2vw, 0.94rem)',
                        fontWeight: 600,
                        color: 'var(--text-secondary, #64748B)',
                        letterSpacing: '0.01em',
                        marginBottom: '2px'
                      }}>
                        Hola,
                      </span>
                      <span style={{
                        display: 'block',
                        fontSize: 'clamp(1.22rem, 4vw, 1.7rem)',
                        fontWeight: 900,
                        color: 'var(--text-main, #0F172A)',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.2
                      }}>
                        {profileDisplayName}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>

              {/* Racha / Progreso estilo Widget iOS */}
              <Link
                to="/simulador"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  color: '#F59E0B',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}
              >
                <Flame size={14} fill="#F59E0B" />
                <span>{gamificationStreak || 1} días activos</span>
              </Link>
            </div>

            {/* Banner de Acción Principal: Continuar Preparación (Estilo iOS Fitness) */}
            <div style={{
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
              borderRadius: '20px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056B3 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0, 122, 255, 0.28)'
                }}>
                  <Target size={18} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                    Ruta de Preparación Activa
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Temarios oficiales y bancos de preguntas clasificados
                  </p>
                </div>
              </div>

              <Link
                to="/aprender"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: 'var(--accent-color, #007AFF)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  flexShrink: 0,
                  boxShadow: '0 3px 10px rgba(0, 122, 255, 0.25)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span>Estudiar</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Baldosas de Herramientas Clave (Google Tiles / iOS Control Center Style) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
              gap: '10px'
            }}>
              {/* 0. OBRAS LITERARIAS (TEMARIO COMPLETO) */}
              <motion.div whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                <Link
                  to="/biblioteca?tab=obras"
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '1.5px solid rgba(234, 88, 12, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 10px rgba(234, 88, 12, 0.06)',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '11px',
                    background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.15) 0%, rgba(194, 65, 12, 0.22) 100%)',
                    color: '#EA580C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                      Obras Literarias
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#EA580C', fontWeight: 700, marginTop: '2px' }}>
                      Resúmenes Detallados
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 1. TEST VOCACIONAL */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setIsVocationalModalOpen(true)}
                style={{
                  padding: '14px',
                  borderRadius: '18px',
                  background: 'var(--card-bg, #FFFFFF)',
                  border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '11px',
                  background: 'rgba(13, 148, 136, 0.12)',
                  color: '#0D9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Compass size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                    Test Vocacional
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Tu Carrera Ideal
                  </div>
                </div>
              </motion.button>

              {/* 2. FÓRMULAS & TRUQUITOS PRE-U */}
              <motion.div whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                <Link
                  to="/formulario"
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '11px',
                    background: 'rgba(168, 85, 247, 0.12)',
                    color: '#A855F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Calculator size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                      Fórmulas & Trucos
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Cara A & B Pre-U
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 3. APRENDER */}
              <motion.div whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                <Link
                  to="/aprender"
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '11px',
                    background: 'rgba(0, 122, 255, 0.12)',
                    color: '#007AFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                      Aprender
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Rutas & Fichas
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 4. CURSOS */}
              <motion.div whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                <Link
                  to="/cursos"
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '11px',
                    background: 'rgba(139, 92, 246, 0.12)',
                    color: '#8B5CF6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                      Cursos
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Temarios & Módulos
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 5. BIBLIOTECA */}
              <motion.div whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                <Link
                  to="/biblioteca"
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '11px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Library size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                      Biblioteca
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Obras & Libros
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 6. SIMULADOR */}
              <motion.div whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                <Link
                  to="/simulador"
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '11px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    color: '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Trophy size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                      Simulador
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Examen & Ranking
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Recomendación de Comunidad: Canal Oficial de WhatsApp */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, rgba(18, 140, 126, 0.08) 100%)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                borderRadius: '18px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)'
                }}>
                  <WhatsAppIconSVG size={22} color="#FFFFFF" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.66rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#059669',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      Recomendado
                    </span>
                    <h3 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                      Comunidad Preuniversitaria
                    </h3>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                    Material diario, avisos de simulacros y fijas de admisión al instante.
                  </p>
                </div>
              </div>

              <a
                href="https://whatsapp.com/channel/0029VbDFAEu7YScyVZBNul0X"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  flexShrink: 0,
                  boxShadow: '0 3px 10px rgba(37, 211, 102, 0.28)'
                }}
              >
                <span>Unirme</span>
                <ArrowRight size={13} />
              </a>
            </motion.div>

            {/* Sello Discreto de Libre Acceso (Estilo Google Settings / Apple Capsule) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px',
              borderRadius: '14px',
              background: 'rgba(120, 120, 128, 0.06)',
              border: '1px solid var(--card-border, rgba(120, 120, 128, 0.12))',
              fontSize: '0.74rem',
              color: 'var(--text-secondary)',
              flexWrap: 'wrap',
              gap: '8px',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#10B981" />
                <span>Plataforma Académica Libre • Sin fines de lucro</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/chats" style={{ color: 'var(--accent-color, #007AFF)', fontWeight: 700, textDecoration: 'none' }}>
                  Chats
                </Link>
                <span style={{ opacity: 0.35 }}>•</span>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('rumbo_open_terms'))}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: 'inherit'
                  }}
                >
                  Términos
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Widgets de Estudio: Contador Oficial de Examen + Racha de Estudio */}
      <StudyWidgetsHub />

      {/* Carrusel de Tarjetas de Aliados RASTRO (Movibles) */}
      <AliadosCarousel />

      {/* Sección del Formulario: Ser Aliado / Creador */}
      <section id="home-forms-section" style={{ padding: '20px 16px 40px', maxWidth: '980px', margin: '0 auto', boxSizing: 'border-box' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--card-border, rgba(120, 120, 128, 0.16))',
            borderRadius: '22px',
            padding: 'clamp(18px, 4vw, 28px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxSizing: 'border-box'
          }}
        >
          {/* CONTENIDO: SER ALIADO / CREADOR (CON VISTA PREVIA PRIVADA DE SU TARJETA DEBAJO) */}
          <form onSubmit={handleAllySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles color="#FF9500" size={22} /> Tarjeta de Aliado / Creador RASTRO
                  </h3>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: (isAdmin || isAuthorOfFirebase(user?.email)) ? 'rgba(255, 149, 0, 0.15)' : 'rgba(52, 199, 89, 0.15)',
                    color: (isAdmin || isAuthorOfFirebase(user?.email)) ? '#FF9500' : '#34C759',
                    border: (isAdmin || isAuthorOfFirebase(user?.email)) ? '1px solid rgba(255, 149, 0, 0.3)' : '1px solid rgba(52, 199, 89, 0.3)'
                  }}>
                    {(isAdmin || isAuthorOfFirebase(user?.email)) ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Crown size={12} />
                        <span>Creador / Admin</span>
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Layers size={12} />
                        <span>{userUploads.length}/10 Aportes</span>
                      </span>
                    )}
                  </span>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  Configura tu tarjeta pública. Se guardará vinculada a tu cuenta de Google para que puedas editarla cuando quieras.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Nombre o Seudónimo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre público o canal"
                    value={allyName}
                    onChange={(e) => setAllyName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid var(--card-border)',
                      background: 'rgba(120, 120, 128, 0.08)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Materia o Especialidad
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Álgebra, Biología, Filosofía"
                    value={allySubject}
                    onChange={(e) => setAllySubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid var(--card-border)',
                      background: 'rgba(120, 120, 128, 0.08)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Enlace de Canal / Grupo de WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://chat.whatsapp.com/..."
                    value={allyWhatsapp}
                    onChange={(e) => setAllyWhatsapp(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid var(--card-border)',
                      background: 'rgba(120, 120, 128, 0.08)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Canal de TikTok o Red Social
                  </label>
                  <input
                    type="text"
                    placeholder="https://tiktok.com/@tu_usuario"
                    value={allyTiktok}
                    onChange={(e) => setAllyTiktok(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid var(--card-border)',
                      background: 'rgba(120, 120, 128, 0.08)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Mensaje o Descripción de tu Tarjeta
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Te invito a unirte a mi canal donde comparto resoluciones paso a paso y tips para el examen."
                  value={allyDesc}
                  onChange={(e) => setAllyDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid var(--card-border)',
                    background: 'rgba(120, 120, 128, 0.08)',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* 🌟 VISTA PREVIA PRIVADA DE TU TARJETA (Solo el propio usuario puede verla y editarla en vivo) */}
              <div style={{
                marginTop: '10px',
                paddingTop: '20px',
                borderTop: '1.5px dashed var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 149, 0, 0.12)',
                  border: '1px solid rgba(255, 149, 0, 0.3)',
                  color: '#FF9500',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}>
                  <Eye size={14} />
                  <span>Vista Previa en Vivo · Solo tú puedes ver y editar tu tarjeta</span>
                </div>

                {/* Tarjeta Renderizada en Vivo */}
                <div
                  className="glass-card"
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    borderRadius: '26px',
                    padding: '22px 20px',
                    background: 'var(--card-bg)',
                    border: '1.5px solid rgba(255, 149, 0, 0.35)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    boxShadow: '0 10px 30px rgba(255, 149, 0, 0.15)',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <LiveUserAvatar
                      uid={user?.uid || 'preview-user'}
                      fallbackName={allyName || profileDisplayName}
                      fallbackPhoto={user?.photoURL || './applogo.png'}
                      size={52}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: '0.98rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                          lineHeight: 1.25,
                          wordBreak: 'break-word'
                        }}>
                          {allyName || profileDisplayName}
                        </h4>
                        <CheckCircle2 size={16} style={{ color: '#34C759', flexShrink: 0 }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: 'rgba(168, 85, 247, 0.15)',
                          color: '#A855F7',
                          fontSize: '0.72rem',
                          fontWeight: 800
                        }}>
                          {(isAdmin || isAuthorOfFirebase(user?.email)) ? '👑 Creador RASTRO' : '⭐ Aliado RASTRO'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Especialidad */}
                  <div style={{
                    background: 'rgba(120, 120, 128, 0.08)',
                    borderRadius: '14px',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>📍</span>
                    <span>{allySubject || 'Especialidad / Materia'}</span>
                  </div>

                  {/* Descripción */}
                  <p style={{
                    margin: 0,
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.45,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    "{allyDesc || 'Comparte material educativo gratuito y tips preuniversitarios.'}"
                  </p>

                  {/* Botones de acción */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.85rem'
                      }}
                    >
                      <WhatsAppIconSVG size={17} /> Canal de WhatsApp ↗
                    </div>

                    {allyTiktok && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '8px 10px',
                          borderRadius: '12px',
                          background: '#000000',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.78rem'
                        }}
                      >
                        <TikTokIconSVG size={15} /> TikTok ↗
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botón Guardar Aliado */}
              <button
                type="submit"
                disabled={allyLoading}
                style={{
                  padding: '14px 24px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #FF9500 0%, #FF2D55 100%)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  cursor: allyLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(255, 149, 0, 0.4)',
                  transition: 'all 0.2s ease',
                  opacity: allyLoading ? 0.7 : 1
                }}
              >
                {allyLoading ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    <span>Guardando en tu cuenta de Google...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Guardar y Activar Tarjeta de Aliado RASTRO</span>
                  </>
                )}
              </button>
            </form>
        </motion.div>
      </section>

      {/* Modal de Confirmación para Subida de Material */}
      {isMatConfirmOpen && (
        <div
          className="ios-modal-backdrop"
          onClick={() => setIsMatConfirmOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 1000150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 15 }}
            className="glass-card"
            style={{
              background: 'var(--card-bg)',
              border: '1.5px solid var(--card-border)',
              borderRadius: '26px',
              padding: '28px 24px',
              maxWidth: '420px',
              width: '100%',
              maxHeight: 'min(90dvh, 520px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(0, 122, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--accent-color)'
            }}>
              <UploadCloud size={28} />
            </div>

            <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)' }}>
              ¿Publicar este material?
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Estás a punto de subir <strong>"{matTitle}"</strong> a la comunidad RASTRO. Quedará visible para todos los estudiantes.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsMatConfirmOpen(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '14px',
                  border: '1.5px solid var(--card-border)',
                  background: 'rgba(120, 120, 128, 0.1)',
                  color: 'var(--text-main)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={executeMaterialUpload}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'var(--accent-color, #007AFF)',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 122, 255, 0.4)'
                }}
              >
                Sí, Publicar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de Subida de respaldo */}
      <UploadModal
        isOpen={isUploadModalOpen}
        initialSourceMode="file"
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={() => {
          setIsUploadModalOpen(false);
        }}
      />

      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        title={successContent.title} 
        message={successContent.message} 
      />

      {/* Modal del Test Vocacional */}
      <VocationalTestModal
        isOpen={isVocationalModalOpen}
        onClose={() => setIsVocationalModalOpen(false)}
      />
    </div>
  );
};

export default Home;
