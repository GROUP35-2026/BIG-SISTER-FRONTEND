import React, { useState, useEffect } from 'react';
import bgImage from './IMAGE.PNG';
import signBgImage from './SIGN.jpg';

// ── Default dashboard cards (used until the backend config loads) ───────────
const DEFAULT_DASHBOARD_CARDS = [
  { id: 'aibot',      icon: 'chat',        title: 'Ask AI Health Bot', description: 'Get instant, private answers to your health questions', bgColor: '#CCFBF1', textColor: '#0D9488', descColor: '#115E59', targetView: 'aibot',      order: 0 },
  { id: 'support',    icon: 'handshake',   title: 'Get Support',       description: 'Access sanitary pads, school fees, food, and more',       bgColor: '#DBEAFE', textColor: '#2563EB', descColor: '#1E40AF', targetView: 'support',    order: 1 },
  { id: 'counsellor', icon: 'stethoscope', title: 'Talk to Counsellor',description: 'Book a session or chat live with a professional',        bgColor: '#F3E8FF', textColor: '#9333EA', descColor: '#6B21A8', targetView: 'counsellor', order: 2 },
  { id: 'skills',     icon: 'cap',         title: 'Learn Skills',      description: 'Watch videos, earn certificates, find opportunities',     bgColor: '#FEF3C7', textColor: '#D97706', descColor: '#92400E', targetView: 'skills',     order: 3 },
  { id: 'emergency',  icon: 'alert',       title: 'Emergency Help',    description: 'Find nearby clinics and emergency contacts',              bgColor: '#FEE2E2', textColor: '#DC2626', descColor: '#991B1B', targetView: 'emergency',  order: 4 },
  { id: 'track',      icon: 'chart',       title: 'Track Health',      description: 'Monitor your cycle, symptoms, and health trends',         bgColor: '#FCE7F3', textColor: '#DB2777', descColor: '#9D174D', targetView: 'track',      order: 5 },
  { id: 'topics',     icon: 'book',        title: 'Explore Topics',    description: 'Learn about your body, health, and safe decisions',       bgColor: '#E0F2FE', textColor: '#0284C7', descColor: '#075985', targetView: 'topics',     order: 6 },
];

const DASHBOARD_ICON_OPTIONS = ['chat','handshake','stethoscope','cap','alert','chart','book','droplet','heart','pin','users','badge','lightbulb','shield','lock','sparkle','home','clock','play','crown','globe','mail'];
const DASHBOARD_TARGET_VIEWS = ['dashboard','aibot','support','counsellor','skills','emergency','track','topics'];

// ── Icon set (replaces emoji glyphs with clean line icons) ──────────────────
function Icon({ name, size = 18, color = 'currentColor', style }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  switch (name) {
    case 'chat':        return <svg {...common}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
    case 'handshake':    return <svg {...common}><path d="M11 17l-3.5-3.5a2 2 0 0 1 0-2.8l3-3a2 2 0 0 1 2.8 0L14 8.4"/><path d="M13 15l1.6 1.6a2 2 0 0 0 2.8 0l.1-.1a2 2 0 0 0 0-2.8L15 11.2"/><path d="M2 12l4-4 3 3-4 4-3-3z"/><path d="M22 12l-4-4-3 3 4 4 3-3z"/></svg>;
    case 'stethoscope':  return <svg {...common}><path d="M4.5 3v6a4.5 4.5 0 0 0 9 0V3"/><path d="M9 15.5a5.5 5.5 0 0 0 5.5 5.5 5.5 5.5 0 0 0 5.5-5.5v-2"/><circle cx="20" cy="10.5" r="2"/></svg>;
    case 'cap':          return <svg {...common}><path d="M12 4 2 9l10 5 10-5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></svg>;
    case 'alert':        return <svg {...common}><path d="M12 9v4"/><circle cx="12" cy="16.5" r="0.5" fill={color}/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>;
    case 'chart':        return <svg {...common}><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>;
    case 'book':         return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
    case 'droplet':      return <svg {...common}><path d="M12 2.5s6.5 7 6.5 12A6.5 6.5 0 0 1 5.5 14.5C5.5 9.5 12 2.5 12 2.5z"/></svg>;
    case 'heart':        return <svg {...common}><path d="M20.8 8.6c0-3-2.2-5.1-5-5.1-1.7 0-3.2.9-4.1 2.3C10.8 4.4 9.3 3.5 7.6 3.5c-2.8 0-5 2.1-5 5.1 0 5.4 8.6 10.4 9.4 10.9.8-.5 9.4-5.5 9.4-10.9z"/></svg>;
    case 'pin':          return <svg {...common}><path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>;
    case 'users':        return <svg {...common}><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="8.5" r="2.6"/><path d="M15 13.2A6.5 6.5 0 0 1 21.5 20"/></svg>;
    case 'badge':        return <svg {...common}><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.8 7 21l5-2.5 5 2.5-1.5-7.2"/></svg>;
    case 'lightbulb':    return <svg {...common}><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.7v.5h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3z"/></svg>;
    case 'shield':       return <svg {...common}><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'lock':         return <svg {...common}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/></svg>;
    case 'mail':         return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 6.5L20.5 6"/></svg>;
    case 'trash':        return <svg {...common}><path d="M4 7h16"/><path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"/><path d="M6 7l1 13.5A1.5 1.5 0 0 0 8.5 22h7a1.5 1.5 0 0 0 1.5-1.5L18 7"/></svg>;
    case 'pencil':       return <svg {...common}><path d="M14.5 4.5 19.5 9.5 8 21H3v-5z"/></svg>;
    case 'calendar':     return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>;
    case 'bell':         return <svg {...common}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
    case 'download':     return <svg {...common}><path d="M12 3v13"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/></svg>;
    case 'bookmark':     return <svg {...common}><path d="M6 3.5h12v18l-6-4-6 4z"/></svg>;
    case 'settings':     return <svg {...common}><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10c.2.6.7 1.1 1.5 1.1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'logout':       return <svg {...common}><path d="M15 3h3.5A1.5 1.5 0 0 1 20 4.5v15a1.5 1.5 0 0 1-1.5 1.5H15"/><path d="M9 8l-4 4 4 4"/><path d="M5 12h12"/></svg>;
    case 'profile':      return <svg {...common}><circle cx="12" cy="8" r="3.7"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>;
    case 'gown':         return <svg {...common}><path d="M9 3h6l1 4-2 1 2 3-2 10H8L6 11l2-3-2-1z"/></svg>;
    case 'check':        return <svg {...common}><path d="M20 6 9 17l-5-5"/></svg>;
    case 'clipboard':    return <svg {...common}><rect x="6" y="4" width="12" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3" rx="1"/><path d="M9 11h6"/><path d="M9 15h6"/></svg>;
    case 'arrow-left':   return <svg {...common}><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>;
    case 'crown':        return <svg {...common}><path d="M4 8l3.5 3L12 5l4.5 6L20 8v9H4V8z"/></svg>;
    case 'globe':        return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/></svg>;
    case 'info':         return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="8" r="0.6" fill={color}/></svg>;
    case 'x':            return <svg {...common}><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>;
    case 'send':         return <svg {...common}><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>;
    case 'phone':        return <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>;
    case 'target':       return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill={color}/></svg>;
    case 'sparkle':      return <svg {...common}><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.9 4.9l2.8 2.8"/><path d="M16.3 16.3l2.8 2.8"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.9 19.1l2.8-2.8"/><path d="M16.3 7.7l2.8-2.8"/></svg>;
    case 'home':         return <svg {...common}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>;
    case 'clock':        return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>;
    case 'play':         return <svg {...common}><path d="M8 5.5v13l11-6.5-11-6.5z" fill={color} stroke="none"/></svg>;
    default:             return null;
  }
}

// ── Brand Logo (clickable, replaces the "Big Sister" text wordmark) ──────────
function BrandLogo({ onClick }) {
  return (
    <svg
      onClick={onClick}
      height="44"
      viewBox="190 10 300 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label="Big Sister home"
    >
      <defs>
        <linearGradient id="pill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FF6EB4' }} />
          <stop offset="55%" style={{ stopColor: '#C040A0' }} />
          <stop offset="100%" style={{ stopColor: '#5B0FA8' }} />
        </linearGradient>
      </defs>
      <rect x="190" y="10" width="300" height="80" rx="20" fill="url(#pill)" />
      <text x="214" y="78" fontFamily="'Arial Black',sans-serif" fontWeight="900" fontSize="68" fill="rgba(255,255,255,0.95)" letterSpacing="-2">B</text>
      <text x="248" y="84" fontFamily="'Arial Black',sans-serif" fontWeight="900" fontSize="68" fill="rgba(255,255,255,0.78)" letterSpacing="-2">S</text>
      <line x1="302" y1="22" x2="302" y2="78" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" />
      <text x="318" y="48" fontFamily="'Arial Black',sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">Big Sister</text>
      <text x="320" y="68" fontFamily="'Poppins','Arial',sans-serif" fontWeight="500" fontSize="11" fill="rgba(255,255,255,0.78)" letterSpacing="3">FOR EVERY GIRL</text>
    </svg>
  );
}

// ── Compact sidebar wordmark (small pink pill "BS" + label) ─────────────────
function SidebarBrand({ onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '18px 20px' }}>
      <div style={{
        width: '42px', height: '42px', borderRadius: '13px',
        background: 'linear-gradient(135deg, #FF6EB4 0%, #C040A0 55%, #5B0FA8 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        boxShadow: '0 4px 10px rgba(144,35,240,0.25)'
      }}>
        <span style={{ fontFamily: "'Arial Black',sans-serif", fontWeight: 900, fontSize: '15px', color: '#FFFFFF', letterSpacing: '-0.5px' }}>BS</span>
      </div>
      <div>
        <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1 }}>Big Sister</div>
        <div style={{ fontSize: '9px', fontWeight: 700, color: '#B45AC9', letterSpacing: '1.2px', marginTop: '2px' }}>FOR EVERY GIRL</div>
      </div>
    </div>
  );
}

// ── Toast Notification Component ─────────────────────────────────────────────
function Toast({ message, type = 'success', onClose, showLoader = false, duration = 4000 }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining === 0) { clearInterval(interval); onClose(); }
    }, 30);
    return () => clearInterval(interval);
  }, [duration, onClose]);

  const colors = {
    success: { bg: '#FFFFFF', border: '#16A34A', accent: '#16A34A', icon: 'check', iconBg: '#DCFCE7', text: '#15803D' },
    error:   { bg: '#FFFFFF', border: '#DC2626', accent: '#DC2626', icon: 'x', iconBg: '#FEE2E2', text: '#DC2626' },
    info:    { bg: '#FFFFFF', border: '#9023F0', accent: '#9023F0', icon: 'info', iconBg: '#F3E8FF', text: '#7C3AED' },
  };
  const c = colors[type];

  return (
    <div style={{
      position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
      backgroundColor: c.bg, borderRadius: '16px', width: '320px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: `1.5px solid ${c.border}`,
      overflow: 'hidden', animation: 'slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)'
    }}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
      <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.accent, flexShrink: 0 }}><Icon name={c.icon} size={16} color={c.accent} /></div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: '#1A1A1A', lineHeight: '1.3' }}>{message}</p>
          {showLoader && <p style={{ margin: '3px 0 0 0', fontSize: '11.5px', color: '#888888', fontWeight: '500' }}>Signing you in automatically…</p>}
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#BBBBBB', padding: 0, lineHeight: 1, flexShrink: 0 }}><Icon name="x" size={14} color="#BBBBBB" /></button>
      </div>
      {showLoader && (
        <div style={{ height: '3px', backgroundColor: '#F0F0F0' }}>
          <div style={{ height: '100%', width: `${progress}%`, backgroundColor: c.accent, transition: 'width 30ms linear', borderRadius: '0 2px 2px 0' }} />
        </div>
      )}
    </div>
  );
}

// ── Confirm Dialog Component (for Admin Tasks) ──────────────────────────────
function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#241b35', borderRadius: '16px', padding: '30px', width: '400px', maxWidth: '90%', border: '1px solid #444' }}>
        <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>{title}</h3>
        <p style={{ color: '#b0b0b0', margin: '0 0 20px 0', fontSize: '14px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '8px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid #555', color: '#bbb', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #9333ea, #e91e63)', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Dashboard Component ────────────────────────────────────────────────
function AdminDashboard({ currentAdminView, setCurrentAdminView, onLogout, token, backendUrl, showToast }) {
  const [stats, setStats] = useState({ totalUsers: 0, activeSessions: 0, supportRequests: 0, healthTipsLive: 0 });
  const [activity, setActivity] = useState([]);
  const [content, setContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmingTask, setConfirmingTask] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [contentForm, setContentForm] = useState({ title: '', category: 'Health Tips', status: 'Draft', body: '' });
  const [appearanceForm, setAppearanceForm] = useState({
    primary: '#9333ea', accent: '#ec4899', background: '#f8f0ff',
    appName: 'Big Sister', tagline: 'FOR EVERY GIRL', welcomeBanner: 'Welcome back',
    dashboardCards: DEFAULT_DASHBOARD_CARDS
  });

  const authHeaders = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  // Fetch Admin Data
  const fetchData = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/admin/overview`, { headers: authHeaders });
      const data = await res.json(); 
      if (data.success) { setStats(data.stats); setActivity(data.activity); }
      
      const resContent = await fetch(`${backendUrl}/api/admin/content`, { headers: authHeaders });
      const cData = await resContent.json(); 
      if (cData.success) setContent(cData.content);

      const resUsers = await fetch(`${backendUrl}/api/admin/users`, { headers: authHeaders });
      const uData = await resUsers.json(); 
      if (uData.success) setUsers(uData.users);

      const resLogs = await fetch(`${backendUrl}/api/admin/logs`, { headers: authHeaders });
      const lData = await resLogs.json(); 
      if (lData.success) setLogs(lData.logs);

      const resApp = await fetch(`${backendUrl}/api/admin/appearance`, { headers: authHeaders });
      const aData = await resApp.json(); 
      if (aData.success) {
        setAppearanceForm(prev => ({
          ...prev,
          ...aData.settings,
          dashboardCards: (aData.settings.dashboardCards && aData.settings.dashboardCards.length > 0)
            ? aData.settings.dashboardCards
            : DEFAULT_DASHBOARD_CARDS
        }));
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => { if (token) fetchData(); }, [token, backendUrl, currentAdminView]);

  // ── Admin Handlers ──────────────────────────────────────────────────────────
  const handleSaveContent = async () => {
    if (!contentForm.title.trim()) return showToast('Title is required.', 'error');
    try {
      if (editingContent) {
        await fetch(`${backendUrl}/api/admin/content/${editingContent.id}`, { method: 'PUT', headers: authHeaders, body: JSON.stringify(contentForm) });
        showToast('Content updated!', 'success');
      } else {
        await fetch(`${backendUrl}/api/admin/content`, { method: 'POST', headers: authHeaders, body: JSON.stringify(contentForm) });
        showToast('Content published!', 'success');
      }
      setShowContentModal(false); setEditingContent(null); setContentForm({ title: '', category: 'Health Tips', status: 'Draft', body: '' });
      fetchData();
    } catch (e) { showToast('Error saving content.', 'error'); }
  };

  const handleDeleteContent = async (id) => {
    if (!window.confirm('Delete this content?')) return;
    try { await fetch(`${backendUrl}/api/admin/content/${id}`, { method: 'DELETE', headers: authHeaders }); fetchData(); showToast('Content deleted.', 'success'); } catch (e) { showToast('Error deleting.', 'error'); }
  };

  const handleUpdateUserStatus = async (userId, status) => {
    try {
      await fetch(`${backendUrl}/api/admin/users/${userId}/status`, { method: 'PUT', headers: authHeaders, body: JSON.stringify({ status }) });
      fetchData(); showToast(`User ${status} successfully.`, 'success');
    } catch (e) { showToast('Error updating user.', 'error'); }
  };

  const handleSaveAppearance = async () => {
    try {
      await fetch(`${backendUrl}/api/admin/appearance`, { method: 'PUT', headers: authHeaders, body: JSON.stringify(appearanceForm) });
      showToast('Appearance saved!', 'success');
    } catch (e) { showToast('Error saving appearance.', 'error'); }
  };

  const runTask = async (taskName) => {
    try {
      await fetch(`${backendUrl}/api/admin/maintenance/${taskName}`, { method: 'POST', headers: authHeaders });
      setConfirmingTask(null); showToast(`${taskName} executed successfully!`, 'success'); fetchData();
    } catch (e) { showToast(`Error running ${taskName}`, 'error'); }
  };

  // ── Dashboard Card Editor Handlers ──────────────────────────────────────────
  const addDashboardCard = () => {
    setAppearanceForm(f => ({
      ...f,
      dashboardCards: [...f.dashboardCards, {
        id: `card-${Date.now()}`, icon: 'sparkle', title: 'New Feature',
        description: 'Description here', bgColor: '#F3E8FF', textColor: '#9333EA',
        descColor: '#6B21A8', targetView: 'dashboard', order: f.dashboardCards.length
      }]
    }));
  };

  const updateDashboardCard = (id, field, value) => {
    setAppearanceForm(f => ({
      ...f,
      dashboardCards: f.dashboardCards.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const removeDashboardCard = (id) => {
    setAppearanceForm(f => ({
      ...f,
      dashboardCards: f.dashboardCards.filter(c => c.id !== id).map((c, i) => ({ ...c, order: i }))
    }));
  };

  const moveDashboardCard = (id, dir) => {
    setAppearanceForm(f => {
      const cards = [...f.dashboardCards];
      const idx = cards.findIndex(c => c.id === id);
      const swapWith = dir === 'up' ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= cards.length) return f;
      [cards[idx], cards[swapWith]] = [cards[swapWith], cards[idx]];
      return { ...f, dashboardCards: cards.map((c, i) => ({ ...c, order: i })) };
    });
  };

  // ── Render Admin Views ─────────────────────────────────────────────────────
  const renderContent = () => {
    switch(currentAdminView) {
      case 'overview':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontSize: '14px', marginBottom: '6px' }}><Icon name="users" size={16} color="#ccc" /> <span style={{ color: '#34d399', fontSize: '12px' }}>+12%</span></div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{stats.totalUsers}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Total Users</div>
              </div>
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontSize: '14px', marginBottom: '6px' }}><Icon name="chart" size={16} color="#ccc" /> <span style={{ color: '#f472b6', fontSize: '12px' }}>+5%</span></div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{stats.activeSessions}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Active Sessions</div>
              </div>
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontSize: '14px', marginBottom: '6px' }}><Icon name="alert" size={16} color="#ccc" /> <span style={{ color: '#fbbf24', fontSize: '12px' }}>+23%</span></div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{stats.supportRequests}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Support Requests</div>
              </div>
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontSize: '14px', marginBottom: '6px' }}><Icon name="heart" size={16} color="#ccc" /> <span style={{ color: '#34d399', fontSize: '12px' }}>+8%</span></div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{stats.healthTipsLive}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Health Tips Live</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>
              <div style={{ flex: 2, background: '#2c223c', borderRadius: '14px', padding: '20px', overflowY: 'auto' }}>
                <h4 style={{ color: '#fff', margin: '0 0 15px 0' }}>Recent Activity</h4>
                {activity.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #3d3052' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? '#d8b4fe' : '#34d399' }}></span>
                    <div style={{ flex: 1, color: '#e2e8f0', fontSize: '13px' }}><span style={{ color: '#d8b4fe', fontWeight: 'bold' }}>{a.category || 'System'}</span> · {a.action}</div>
                    <div style={{ color: '#64748b', fontSize: '11px' }}>{new Date(a.created_at).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, background: '#2c223c', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#fff', margin: '0 0 15px 0' }}>Feature Health</h4>
                {['AI Health Bot', 'Get Support', 'Talk to Counsellor', 'Learn Skills'].map((f, i) => (
                  <div key={i} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#ccc', marginBottom: '4px' }}>
                      <span>{f}</span>
                      <span style={{ color: i === 2 ? '#fbbf24' : '#34d399' }}>{i === 2 ? 'Degraded' : 'Operational'}</span>
                    </div>
                    <div style={{ height: '6px', background: '#1e162b', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: i === 2 ? '60%' : '100%', height: '100%', background: i === 2 ? '#f59e0b' : '#10b981', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <input type="text" placeholder="Search..." style={{ flex: 1, padding: '10px 16px', borderRadius: '20px', border: 'none', background: '#2c223c', color: '#fff' }} />
              <button onClick={() => { setEditingContent(null); setContentForm({ title: '', category: 'Health Tips', status: 'Draft', body: '' }); setShowContentModal(true); }} style={{ padding: '10px 24px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, #e91e63, #9333ea)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>+ Add New</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {content.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', background: '#2c223c', borderRadius: '12px', padding: '16px', marginBottom: '10px' }}>
                  <div style={{ flex: 1, color: '#fff' }}>{c.title}</div>
                  <span style={{ padding: '4px 12px', borderRadius: '12px', background: '#a78bfa', fontSize: '11px', marginRight: '12px' }}>{c.category}</span>
                  <span style={{ padding: '4px 12px', borderRadius: '12px', background: c.status === 'Live' ? '#34d399' : '#fbbf24', fontSize: '11px', marginRight: '12px' }}>{c.status}</span>
                  <div style={{ color: '#64748b', fontSize: '12px', marginRight: '20px' }}>{new Date(c.created_at).toISOString().slice(0,10)}</div>
                  <span onClick={() => { setEditingContent(c); setContentForm({ title: c.title, category: c.category, status: c.status, body: c.body }); setShowContentModal(true); }} style={{ cursor: 'pointer', color: '#94a3b8', marginRight: '10px', display: 'inline-flex' }}><Icon name="pencil" size={15} color="#94a3b8" /></span>
                  <span onClick={() => handleDeleteContent(c.id)} style={{ cursor: 'pointer', color: '#94a3b8', display: 'inline-flex' }}><Icon name="trash" size={15} color="#94a3b8" /></span>
                </div>
              ))}
            </div>
            {showContentModal && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#2c223c', padding: '30px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                  <h3 style={{ color: '#fff', margin: '0 0 20px 0' }}>{editingContent ? 'Edit Content' : 'Create Content'}</h3>
                  <input type="text" placeholder="Title" value={contentForm.title} onChange={e => setContentForm({...contentForm, title: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: 'none', background: '#1e162b', color: '#fff' }} />
                  <select value={contentForm.category} onChange={e => setContentForm({...contentForm, category: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: 'none', background: '#1e162b', color: '#fff' }}><option>Health Tips</option><option>Learn Skills</option><option>Explore Topics</option></select>
                  <select value={contentForm.status} onChange={e => setContentForm({...contentForm, status: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: 'none', background: '#1e162b', color: '#fff' }}><option>Draft</option><option>Live</option></select>
                  <textarea placeholder="Body content..." value={contentForm.body} onChange={e => setContentForm({...contentForm, body: e.target.value})} rows="5" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: 'none', background: '#1e162b', color: '#fff', resize: 'vertical' }} />
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setShowContentModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#3d3052', color: '#ccc', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleSaveContent} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #9333ea, #e91e63)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'users':
        return (
          <div style={{ display: 'flex', height: '100%', gap: '20px' }}>
            <div style={{ flex: 1.5, overflowY: 'auto' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <input type="text" placeholder="Search by name or region..." style={{ flex: 1, padding: '10px 16px', borderRadius: '20px', border: 'none', background: '#2c223c', color: '#fff' }} />
              </div>
              {users.map(u => (
                <div key={u.id} onClick={() => setSelectedUser(u)} style={{ display: 'flex', alignItems: 'center', background: selectedUser?.id === u.id ? '#3d3052' : '#2c223c', borderRadius: '12px', padding: '12px 16px', marginBottom: '8px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', marginRight: '12px' }}>{u.full_name?.charAt(0)}</div>
                  <div style={{ flex: 1, color: '#fff' }}>{u.full_name}</div>
                  <div style={{ flex: 1, color: '#888' }}>{new Date(u.created_at).toISOString().slice(0,10)}</div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, background: '#2c223c', borderRadius: '14px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {selectedUser ? (
                <div style={{ textAlign: 'center', color: '#fff' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px' }}>{selectedUser.full_name?.charAt(0)}</div>
                  <h3>{selectedUser.full_name}</h3>
                  <p style={{ color: '#888', margin: '5px 0 20px' }}>{selectedUser.email}</p>
                  <button onClick={() => handleUpdateUserStatus(selectedUser.id, 'Flagged')} style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', background: '#fbbf24', color: '#000', fontWeight: 'bold', marginRight: '8px', cursor: 'pointer' }}>Flag</button>
                  <button onClick={() => handleUpdateUserStatus(selectedUser.id, 'Suspended')} style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Suspend</button>
                  <button onClick={() => handleUpdateUserStatus(selectedUser.id, 'Active')} style={{ marginTop: '10px', padding: '8px 20px', borderRadius: '20px', border: 'none', background: '#34d399', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>Reactivate</button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}><Icon name="profile" size={44} color="#64748b" /></div>
                  <p>Select a user to view details</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'staff':
        return (
          <div style={{ display: 'flex', height: '100%', gap: '20px' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <h4 style={{ color: '#fff', margin: '0 0 15px 0' }}>Staff Roster</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {['Dr. Lydia Ouma', 'Nurse Sarah Kato', 'Ruth Namukasa', 'James Okello'].map((s, i) => (
                  <div key={i} style={{ background: '#2c223c', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{s.charAt(0)}</div>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>{s}</div>
                        <div style={{ color: '#888', fontSize: '11px' }}>Counsellor</div>
                      </div>
                      <span style={{ marginLeft: 'auto', width: '10px', height: '10px', borderRadius: '50%', background: i === 2 ? '#64748b' : '#34d399' }}></span>
                    </div>
                    <button onClick={() => showToast(`Message sent to ${s}!`, 'success')} style={{ width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid #444', background: 'transparent', color: '#ccc', cursor: 'pointer' }}>{i===2 ? 'Notify' : 'Message'}</button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, background: '#2c223c', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><h4 style={{ color: '#fff', margin: 0 }}>Emergency Queue</h4><span style={{ padding: '2px 10px', borderRadius: '12px', background: '#ef4444', color: '#fff', fontSize: '12px' }}>3 Active</span></div>
              <div style={{ background: '#1e162b', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: '#fff' }}>Grace M.</div><div style={{ color: '#ef4444', fontSize: '12px' }}>High</div></div>
                <div style={{ color: '#888', fontSize: '12px' }}>Medical Emergency · Entebbe</div>
              </div>
              <div style={{ flex: 1, background: '#1e162b', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column' }}>
                <h5 style={{ color: '#ccc', margin: '0 0 10px 0' }}>Live Chat — Grace M.</h5>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <div style={{ background: '#2c223c', padding: '10px', borderRadius: '12px', marginBottom: '8px', alignSelf: 'flex-start', maxWidth: '80%' }}><span style={{ color: '#fff', fontSize: '13px' }}>I'm in pain, please help</span></div>
                  <div style={{ background: 'linear-gradient(135deg, #9333ea, #e91e63)', padding: '10px', borderRadius: '12px', marginBottom: '8px', alignSelf: 'flex-end', maxWidth: '80%' }}><span style={{ color: '#fff', fontSize: '13px' }}>Hi Grace, I'm here. Can you describe what's happening?</span></div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#2c223c', color: '#fff' }} />
                  <button onClick={() => showToast('Message sent to Grace M.', 'success')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #9333ea, #e91e63)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div style={{ display: 'flex', height: '100%', gap: '20px' }}>
            <div style={{ flex: 1.5, overflowY: 'auto' }}>
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', margin: '0 0 15px 0' }}>App Text</h4>
                <div style={{ marginBottom: '12px' }}><label style={{ color: '#888', fontSize: '12px', display: 'block' }}>App Name</label><input type="text" value={appearanceForm.appName} onChange={e => setAppearanceForm({...appearanceForm, appName: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#1e162b', color: '#fff' }} /></div>
                <div style={{ marginBottom: '12px' }}><label style={{ color: '#888', fontSize: '12px', display: 'block' }}>Tagline</label><input type="text" value={appearanceForm.tagline} onChange={e => setAppearanceForm({...appearanceForm, tagline: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#1e162b', color: '#fff' }} /></div>
                <div><label style={{ color: '#888', fontSize: '12px', display: 'block' }}>Welcome Banner</label><input type="text" value={appearanceForm.welcomeBanner} onChange={e => setAppearanceForm({...appearanceForm, welcomeBanner: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#1e162b', color: '#fff' }} /></div>
              </div>

              {/* ── Dashboard Cards Editor ── */}
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ color: '#fff', margin: 0 }}>Dashboard Cards</h4>
                  <button onClick={addDashboardCard} style={{ padding: '6px 16px', borderRadius: '16px', border: 'none', background: 'linear-gradient(135deg, #9333ea, #e91e63)', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>+ Add Card</button>
                </div>
                {appearanceForm.dashboardCards.length === 0 && (
                  <p style={{ color: '#888', fontSize: '12.5px', textAlign: 'center', padding: '20px 0' }}>No cards yet. Click "Add Card" to create one.</p>
                )}
                {appearanceForm.dashboardCards.map((card, i) => (
                  <div key={card.id} style={{ background: '#1e162b', borderRadius: '12px', padding: '14px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input value={card.title} onChange={e => updateDashboardCard(card.id, 'title', e.target.value)} placeholder="Title" style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: '#2c223c', color: '#fff', fontSize: '12px' }} />
                      <select value={card.icon} onChange={e => updateDashboardCard(card.id, 'icon', e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: 'none', background: '#2c223c', color: '#fff', fontSize: '12px' }}>
                        {DASHBOARD_ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                      </select>
                    </div>
                    <input value={card.description} onChange={e => updateDashboardCard(card.id, 'description', e.target.value)} placeholder="Description" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: 'none', background: '#2c223c', color: '#fff', fontSize: '12px', marginBottom: '8px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <label style={{ color: '#888', fontSize: '11px' }}>BG</label>
                      <input type="color" value={card.bgColor} onChange={e => updateDashboardCard(card.id, 'bgColor', e.target.value)} style={{ width: '28px', height: '24px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                      <label style={{ color: '#888', fontSize: '11px' }}>Text</label>
                      <input type="color" value={card.textColor} onChange={e => updateDashboardCard(card.id, 'textColor', e.target.value)} style={{ width: '28px', height: '24px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                      <label style={{ color: '#888', fontSize: '11px' }}>Desc</label>
                      <input type="color" value={card.descColor} onChange={e => updateDashboardCard(card.id, 'descColor', e.target.value)} style={{ width: '28px', height: '24px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                      <select value={card.targetView} onChange={e => updateDashboardCard(card.id, 'targetView', e.target.value)} style={{ padding: '6px', borderRadius: '6px', border: 'none', background: '#2c223c', color: '#fff', fontSize: '11px' }}>
                        {DASHBOARD_TARGET_VIEWS.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                        <button onClick={() => moveDashboardCard(card.id, 'up')} disabled={i === 0} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #444', background: 'transparent', color: '#ccc', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.4 : 1 }}>↑</button>
                        <button onClick={() => moveDashboardCard(card.id, 'down')} disabled={i === appearanceForm.dashboardCards.length - 1} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #444', background: 'transparent', color: '#ccc', cursor: i === appearanceForm.dashboardCards.length - 1 ? 'not-allowed' : 'pointer', opacity: i === appearanceForm.dashboardCards.length - 1 ? 0.4 : 1 }}>↓</button>
                        <button onClick={() => removeDashboardCard(card.id)} style={{ padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#7f1d1d', color: '#fff', cursor: 'pointer' }}>✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleSaveAppearance} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #9333ea, #e91e63)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save & Publish Changes</button>
            </div>
            <div style={{ flex: 1, background: '#2c223c', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ color: '#fff', margin: '0 0 20px 0', alignSelf: 'flex-start' }}>Live Preview</h4>
              <div style={{ width: '100%', background: '#fff', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px', boxSizing: 'border-box' }}>
                <div style={{ color: appearanceForm.primary, fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>{appearanceForm.appName}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>{appearanceForm.tagline}</div>
                <div style={{ marginTop: '20px', padding: '10px 20px', background: `linear-gradient(135deg, ${appearanceForm.primary}, ${appearanceForm.accent})`, color: '#fff', borderRadius: '20px' }}>{appearanceForm.welcomeBanner}</div>
              </div>
              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', boxSizing: 'border-box' }}>
                {appearanceForm.dashboardCards.map(card => (
                  <div key={card.id} style={{ backgroundColor: card.bgColor, borderRadius: '10px', padding: '10px', boxSizing: 'border-box' }}>
                    <Icon name={card.icon} size={14} color={card.textColor} />
                    <div style={{ fontSize: '10.5px', fontWeight: '700', color: card.textColor, marginTop: '4px' }}>{card.title}</div>
                    <div style={{ fontSize: '9px', color: card.descColor, marginTop: '2px', lineHeight: '1.3' }}>{card.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'maintenance':
        return (
          <div style={{ display: 'flex', height: '100%', gap: '20px' }}>
            <div style={{ flex: 1.5, overflowY: 'auto' }}>
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h4 style={{ color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><Icon name="settings" size={16} color="#fff" /> Maintenance Mode</h4><div style={{ color: '#888', fontSize: '12px' }}>App is live. Enable to take it offline for maintenance.</div></div>
                <button onClick={() => showToast('Maintenance mode toggled!', 'info')} style={{ padding: '8px 20px', borderRadius: '12px', border: '1px solid #444', background: 'transparent', color: '#fff', cursor: 'pointer' }}>Enable</button>
              </div>
              <div style={{ background: '#2c223c', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', margin: '0 0 15px 0' }}>System Tasks</h4>
                {['Database Backup', 'Cache Clear', 'AI Model Sync', 'Security Audit Scan'].map((task, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #3d3052' }}>
                    <div style={{ color: '#fff', fontSize: '14px' }}>{task}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ color: '#64748b', fontSize: '12px', background: '#1e162b', padding: '2px 8px', borderRadius: '10px' }}>Idle</span>
                      <button onClick={() => setConfirmingTask(task)} style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #9333ea, #e91e63)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Run</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, background: '#2c223c', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ color: '#fff', margin: '0 0 20px 0' }}>Database Metrics</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '14px', marginBottom: '10px' }}><span>Total Records</span><span style={{ color: '#fff' }}>48,219</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '14px', marginBottom: '10px' }}><span>DB Size</span><span style={{ color: '#fff' }}>2.3 GB</span></div>
            </div>
          </div>
        );
      case 'logs':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto', background: '#2c223c', borderRadius: '14px', padding: '20px' }}>
              {logs.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '12px 0', borderBottom: '1px solid #3d3052' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: i % 2 === 0 ? '#d8b4fe' : '#34d399', marginTop: '6px' }}></span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>{a.category || 'System'}</span>
                      <span style={{ padding: '2px 8px', borderRadius: '10px', background: a.category === 'Users' ? '#fcd34d' : '#9333ea', color: '#000', fontSize: '10px', fontWeight: 'bold' }}>{a.category}</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '2px' }}>{a.action}</div>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>{new Date(a.created_at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default: return <div style={{ color: '#fff' }}>Select a menu item</div>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#150b21', color: '#fff', fontFamily: "'Segoe UI', sans-serif", overflow: 'hidden' }}>
      <ConfirmDialog 
        isOpen={!!confirmingTask}
        title="Confirm Action"
        message={`Are you sure you want to run "${confirmingTask}"?`}
        onConfirm={() => runTask(confirmingTask)}
        onCancel={() => setConfirmingTask(null)}
      />
      
      {/* Left Sidebar */}
      <aside style={{ width: '220px', background: '#1a1227', height: '100%', borderRight: '1px solid #2a1f3d', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #9333ea, #e91e63)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>BS</div>
          <div><div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>Big Sister</div><div style={{ color: '#888', fontSize: '10px' }}>FOR EVERY GIRL</div></div>
        </div>
        <div style={{ padding: '0 16px', fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>ADMIN MENU</div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
          {[
            { key: 'overview', label: 'Overview', icon: 'chart' },
            { key: 'content', label: 'Content Management', icon: 'pencil' },
            { key: 'users', label: 'User Management', icon: 'profile' },
            { key: 'staff', label: 'Support Staff', icon: 'chat' },
            { key: 'appearance', label: 'App Appearance', icon: 'lightbulb' },
            { key: 'maintenance', label: 'Backend Maintenance', icon: 'settings' },
            { key: 'logs', label: 'Activity Log', icon: 'clipboard' },
          ].map(item => (
            <div 
              key={item.key} 
              onClick={() => setCurrentAdminView(item.key)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', 
                borderRadius: '10px', cursor: 'pointer', 
                background: currentAdminView === item.key ? 'linear-gradient(90deg, #3a1f55, transparent)' : 'transparent',
                marginBottom: '4px' 
              }}
            >
              <Icon name={item.icon} size={16} color={currentAdminView === item.key ? '#d8b4fe' : '#94a3b8'} />
              <span style={{ color: currentAdminView === item.key ? '#d8b4fe' : '#94a3b8', fontSize: '13px' }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div onClick={onLogout} style={{ padding: '16px 20px', borderTop: '1px solid #2a1f3d', color: '#64748b', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon name="logout" size={14} color="#64748b" /> Logout</div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <header style={{ height: '64px', background: '#1a1227', borderBottom: '1px solid #2a1f3d', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>ADMIN CONSOLE</span>
            <span style={{ color: '#34d399', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }}></span> System Online</span>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>AD</div>
        </header>
        <div style={{ flex: 1, overflow: 'hidden', padding: '24px' }}>
          <h2 style={{ margin: '0 0 6px 0', color: '#fff' }}>
            {currentAdminView.charAt(0).toUpperCase() + currentAdminView.slice(1)}
          </h2>
          <div style={{ height: 'calc(100% - 70px)' }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Terms & Conditions View ────────────────────────────────────────────────────
function TermsView({ onBack }) {
  return (
    <div style={{ display: 'flex', flex: 1, backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${signBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', width: '100%', maxWidth: '500px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', padding: '28px', boxSizing: 'border-box', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexShrink: 0 }}>
          <button onClick={onBack} style={{ background: '#F3E8FF', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', color: '#9023F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="arrow-left" size={15} color="#9023F0" /></button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#9023F0' }}>Terms & Conditions</h2>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }} className="no-scrollbar">
          {[
            { title: '1. Privacy & Confidentiality', body: 'All personal information you share on Big Sister is strictly confidential. We never share your identity, health data, or usage history with third parties, schools, parents, or government bodies without your explicit consent.' },
            { title: '2. Who Can Use Big Sister', body: 'Big Sister is designed for teenage girls and young women aged 12–24 in Uganda. By registering, you confirm that you are within this age range or have the support of a trusted guardian.' },
            { title: '3. Health Information Disclaimer', body: 'Content on this platform is for educational purposes and does not replace professional medical advice. Always consult a qualified health worker for personal medical decisions.' },
            { title: '4. Support Request Use', body: 'Support requests (for pads, school fees, food, or mental health) are reviewed by our partner organisations. We do not guarantee provision of all requested support, but we will always work to connect you with available resources.' },
            { title: '5. Counsellor Sessions', body: 'Counsellor sessions are confidential. Counsellors are bound by professional ethics and will only break confidentiality if there is immediate risk to your life or safety.' },
            { title: '6. Respectful Use', body: 'You agree to use this platform respectfully and honestly. Misuse, false information, or attempts to harm others on the platform may result in account suspension.' },
            { title: '7. Data Storage', body: 'Your data is stored securely on servers managed by Uganda Christian University. You have the right to request deletion of your account and all associated data at any time by contacting us.' },
            { title: '8. Updates to These Terms', body: 'We may update these terms as the platform grows. You will be notified of significant changes when you next log in.' },
          ].map(section => (
            <div key={section.title} style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '13px', fontWeight: '800', color: '#1A1A1A' }}>{section.title}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#555555', lineHeight: '1.55', textAlign: 'justify' }}>{section.body}</p>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #EAEAEA', paddingTop: '12px', marginTop: '8px' }}>
            <p style={{ margin: 0, fontSize: '11.5px', color: '#888888', textAlign: 'center' }}>Last updated June 2026 · Big Sister, Uganda Christian University</p>
          </div>
        </div>
        <button onClick={onBack} style={{ marginTop: '18px', background: 'linear-gradient(135deg, #D81B9E 0%, #9023F0 100%)', color: '#FFFFFF', border: 'none', borderRadius: '22px', padding: '12px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 }}>
          Back to Registration
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN APPLICATION - ONLY ONE EXPORT DEFAULT BELOW!
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [currentView, setCurrentView]         = useState('landing');
  const [currentAdminView, setCurrentAdminView] = useState('overview');
  const [showPassword, setShowPassword]       = useState(false);
  const [language]                            = useState('English');
  const [showGooglePopup, setShowGooglePopup] = useState(false);
  const [agreeToTerms, setAgreeToTerms]       = useState(false);

  // Toast state
  const [toast, setToast] = useState(null); // { message, type, showLoader }

  const showToast = (message, type = 'success', showLoader = false, duration = 4000) => {
    setToast({ message, type, showLoader, duration });
  };

  // Auth form fields
  const [authEmail, setAuthEmail]                   = useState('');
  const [authPassword, setAuthPassword]             = useState('');
  const [regFullName, setRegFullName]               = useState('');
  const [regEmail, setRegEmail]                     = useState('');
  const [regPassword, setRegPassword]               = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Logged-in user + JWT token
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken]     = useState(null);

  const BACKEND_URL = 'http://localhost:5000';

  // ── Admin-editable dashboard cards (fetched from backend) ────────────────
  const [dashboardCards, setDashboardCards] = useState(DEFAULT_DASHBOARD_CARDS);

  // ── Counsellor feature state ─────────────────────────────────────────────
  const [counsellorView, setCounsellorView]         = useState('list');
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedTime, setSelectedTime]             = useState(null);
  const [sessionNote, setSessionNote]               = useState('');
  const [stayAnonymous, setStayAnonymous]           = useState(false);
  const [editingSessionId, setEditingSessionId]     = useState(null);
  const [confirmDeleteId, setConfirmDeleteId]       = useState(null);
  const [chatMessages, setChatMessages]             = useState([]);
  const [bookedSessions, setBookedSessions]         = useState([]);

  // ── Get Support feature state ─────────────────────────────────────────────
  const [supportView, setSupportView]               = useState('list');   // 'list' | 'detail' | 'myrequests'
  const [selectedSupport, setSelectedSupport]       = useState(null);
  const [supportFirstName, setSupportFirstName]     = useState('');
  const [supportSchoolName, setSupportSchoolName]   = useState('');
  const [supportRequests, setSupportRequests]       = useState([]);
  const [confirmDeleteSupportId, setConfirmDeleteSupportId] = useState(null);
  const [submittingSupport, setSubmittingSupport]   = useState(false);

// ── My Profile feature state ───────────────────────────────────────────────
  const [profileNewEmail, setProfileNewEmail]       = useState('');
  const [updatingEmail, setUpdatingEmail]           = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [deletingAccount, setDeletingAccount]       = useState(false);
  const [profileSection, setProfileSection]         = useState('info'); // which settings menu item is active
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: 'Female',
    location: '',
    healthGoal: 'Better overall well-being',
    cycleLength: '28 days',
    periodLength: '5 days',
  });
  const [profilePhoto, setProfilePhoto] = useState(null); // data URL preview
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileForm(f => ({
        ...f,
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
      }));
      setProfileNewEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const updateProfileField = (field, value) => setProfileForm(f => ({ ...f, [field]: value }));

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    setSavingProfile(true);
    try {
      // Reuses the existing email-update endpoint; extend backend later for the other fields.
      if (profileForm.email !== currentUser?.email) {
        await handleUpdateEmail({ preventDefault: () => {} });
      } else {
        showToast('Profile updated.', 'success');
      }
    } finally {
      setSavingProfile(false);
    }
  };

  // ── AI Health Bot feature state ────────────────────────────────────────────
  const [aiBotMessages, setAiBotMessages] = useState([
    { from: 'bot', text: "Hi! I'm your Big Sister AI Health Bot. Ask me anything about your body, health, or puberty. Your conversation is completely private." }
  ]);
  const [aiBotInput, setAiBotInput] = useState('');

  // ── Learn Skills feature state ─────────────────────────────────────────────
  const [skillsView, setSkillsView]         = useState('list');   // 'list' | 'detail'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses]               = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // ── Track Health feature state ─────────────────────────────────────────────
  const [trackHealthTab, setTrackHealthTab] = useState('calendar');
  const [loggedSymptoms, setLoggedSymptoms] = useState([]);

  // ── Emergency Help feature state ───────────────────────────────────────────
  const [openCrisisTopic, setOpenCrisisTopic] = useState(null);

  // ── Explore Topics feature state ───────────────────────────────────────────
  const [selectedTopic, setSelectedTopic] = useState(null);

  const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];

  const counsellors = [
    { id: 'grace',  name: 'Auntie Grace Namukasa', role: 'Community Health Educator',    bio: 'Community health champion helping girls understand their bodies, stay healthy, and stay in school.', tags: ['Period Health', 'Nutrition', 'Self-Care'], avatar: 'gown',     color: '#E61B9B', availability: { type: 'available' } },
    { id: 'joseph', name: 'Mr. Joseph Ssemanda',   role: 'School & Youth Counsellor',    bio: 'Youth-focused counsellor specialising in school pressures, family challenges, and trauma support.',   tags: ['School Stress', 'Family Issues', 'Abuse Support'], avatar: 'profile', color: '#3B82F6', availability: { type: 'next', label: 'Next: Tomorrow, 9:00 AM' } },
    { id: 'sarah',  name: 'Dr. Sarah Nakato',      role: 'Adolescent Health Specialist', bio: 'Licensed physician offering confidential guidance on reproductive health and adolescent wellness.',   tags: ['Reproductive Health', 'Medical Advice', 'Confidential'], avatar: 'stethoscope', color: '#9023F0', availability: { type: 'available' } }
  ];

  const supportCategories = [
    {
      id: 'pads',
      icon: 'droplet',
      label: 'Sanitary Pads',
      subtitle: 'Free pads for girls in need',
      color: '#E61B9B',
      gradient: 'linear-gradient(135deg, #E61B9B 0%, #FF6B9D 100%)',
      includes: ['Free monthly supply for enrolled girls', 'Available at school collection points', 'Reusable cloth pad option available', 'Delivered discreetly to your school'],
      eligibility: 'Open to all enrolled girls',
    },
    {
      id: 'fees',
      icon: 'book',
      label: 'School Fees Support',
      subtitle: 'Financial aid & scholarships',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
      includes: ['Emergency school fees assistance', 'Scholarship applications for bright students', 'Stationery and uniform support', 'Partner NGOs cover full or partial fees'],
      eligibility: 'Girls at risk of dropping out',
    },
    {
      id: 'food',
      icon: 'heart',
      label: 'Food & Nutrition',
      subtitle: 'Meals and nutritional support',
      color: '#16A34A',
      gradient: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)',
      includes: ['School lunch programme access', 'Nutrition education sessions', 'Iron supplements for anaemia', 'Referrals to food banks if needed'],
      eligibility: 'Students facing food insecurity',
    },
    {
      id: 'mental',
      icon: 'chat',
      label: 'Mental Health Support',
      subtitle: 'Emotional & psychological help',
      color: '#9023F0',
      gradient: 'linear-gradient(135deg, #9023F0 0%, #C026D3 100%)',
      includes: ['Free counselling sessions', 'Safe space support groups', 'Trauma-informed care available', 'Anonymous support options'],
      eligibility: 'Any girl who needs emotional support',
    },
  ];

  // ── AI Health Bot data ───────────────────────────────────────────────────────
  const aiBotQuickQuestions = [
    { q: 'Signs my period is coming?', a: "A few common signs your period may be coming soon include mild cramps, bloating, breast tenderness, mood changes, and lower back ache. These usually start 1–5 days before your period begins. Everyone's body is a little different, so it helps to notice your own patterns over a few cycles." },
    { q: 'Is cramping normal?', a: "Yes, mild to moderate cramping during your period is very normal — it's caused by your uterus contracting. A warm compress, gentle stretching, and staying hydrated can help. If cramps are so severe they stop you from going about your day, it's worth talking to a health worker or counsellor." },
    { q: 'What is puberty?', a: "Puberty is the time when your body grows and changes from a child's body into an adult's body. It usually starts between ages 8–13 and includes things like breast development, your first period, growth spurts, and new emotions. It's a completely normal part of growing up." },
    { q: 'How to prevent infections?', a: "Change your pad or cloth every 4–6 hours, wash your hands before and after, wear cotton underwear, and keep the area clean and dry. Avoid scented soaps, as they can upset your body's natural balance." },
    { q: 'Why am I moody before period?', a: "Hormone levels shift in the days before your period, which can affect your mood — this is often called PMS. Feeling more sensitive, irritable, or teary is common. Gentle exercise, enough sleep, and talking to someone you trust can help you feel steadier." },
    { q: 'How to handle stress?', a: "Try deep breathing, talking to someone you trust, taking short breaks, and getting enough sleep. Writing down what's on your mind can also help. If stress feels like too much to carry alone, our counsellors are here for you." },
  ];

  // ── Emergency Help data ──────────────────────────────────────────────────────
  const emergencyContacts = [
    { name: 'Police Emergency',           number: '999 / 112',      hours: '24/7',               icon: 'phone',       color: '#2563EB' },
    { name: 'Uganda Red Cross Ambulance', number: '0800-113-116',   hours: '24/7',               icon: 'heart',       color: '#DC2626' },
    { name: 'MIFUMI GBV Hotline',         number: '0800-198-028',   hours: '24/7 · Free call',   icon: 'shield',      color: '#9333EA' },
    { name: 'Uganda Child Helpline',      number: '116',            hours: '24/7 · Free call',   icon: 'users',       color: '#DB2777' },
    { name: 'Marie Stopes Uganda',        number: '0800-112-244',   hours: 'Mon–Sat 8am–5pm',    icon: 'stethoscope', color: '#16A34A' },
  ];

  const crisisTopics = [
    { id: 'abuse',     label: 'Sexual Abuse / Assault',   icon: 'shield', content: "You are not to blame. Get to a safe place if you can, and reach out to the MIFUMI GBV Hotline or Police Emergency line above. If you're able to, seek medical care as soon as possible. A counsellor on this app can also support you confidentially." },
    { id: 'pregnancy', label: 'Pregnancy Concerns',       icon: 'heart',  content: "If you think you might be pregnant or are worried about a pregnancy, you're not alone and there is support available. Marie Stopes Uganda can offer confidential medical advice, and our counsellors are here to talk through your options and feelings." },
    { id: 'unsafe',    label: 'Feeling Unsafe at Home',   icon: 'home',   content: "If you ever feel unsafe at home, try to identify a trusted adult or neighbour you can go to. The Uganda Child Helpline (116) is free and confidential, and can help connect you with support and, if needed, a safe place to stay." },
    { id: 'mental',    label: 'Mental Health Crisis',     icon: 'chat',   content: "If you're struggling to cope or having a hard time emotionally, please reach out right away — you deserve support. Talk to a trusted adult, call the MIFUMI or Child Helpline above, or open a chat with one of our counsellors." },
  ];

  // ── Explore Topics data ──────────────────────────────────────────────────────
  const exploreTopics = [
    { id: 'menstruation', label: 'Menstruation',           subtitle: 'Understanding your cycle',   time: '5 min', articles: 3, icon: 'droplet',   gradient: 'linear-gradient(135deg, #E61B9B 0%, #FF6B9D 100%)', body: "Your menstrual cycle is a natural process where your body prepares for a potential pregnancy each month, and sheds the uterine lining if pregnancy doesn't happen — this is your period. A typical cycle lasts around 21–35 days, and periods usually last 3–7 days. Tracking your cycle can help you predict your period, notice patterns in your mood and energy, and spot anything unusual worth mentioning to a health worker." },
    { id: 'puberty',      label: 'Puberty & Body Changes', subtitle: 'Your body is growing',        time: '6 min', articles: 2, icon: 'sparkle',    gradient: 'linear-gradient(135deg, #9023F0 0%, #C026D3 100%)', body: "Puberty is your body's natural transition from childhood to adulthood, usually starting between ages 8 and 13. You may notice breast development, body hair, growth spurts, your first period, and new emotions. These changes happen at different times and speeds for everyone — there's no single 'right' timeline, and it's completely normal to have questions." },
    { id: 'sexed',        label: 'Sex Education',          subtitle: 'Know your rights & facts',    time: '7 min', articles: 3, icon: 'book',       gradient: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)', body: "Understanding your body and your rights helps you make informed, confident decisions. This includes knowing how reproduction works, what consent means, how to protect yourself from infections and unintended pregnancy, and where to get accurate, judgement-free information. You always have the right to ask questions and get honest answers." },
    { id: 'relationships',label: 'Relationships',          subtitle: 'Healthy love & friendships',  time: '5 min', articles: 2, icon: 'heart',      gradient: 'linear-gradient(135deg, #DB2777 0%, #F472B6 100%)', body: "Healthy relationships, whether with friends, family, or partners, are built on respect, trust, and honest communication. It's important to recognise the difference between healthy support and controlling or disrespectful behaviour. You deserve relationships that make you feel safe, valued, and free to be yourself." },
    { id: 'stories',      label: 'Real Stories',           subtitle: 'From girls like you',         time: '4 min', articles: 2, icon: 'chat',       gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)', body: "Hearing from other girls who've faced similar challenges — from navigating school pressure to managing their first period — can remind you that you're not alone. These shared stories are anonymised and collected from girls across Uganda who wanted to help others feel understood." },
    { id: 'mentalwellness',label: 'Mental Wellness',       subtitle: 'Your mind matters too',       time: '5 min', articles: 2, icon: 'lightbulb', gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)', body: "Taking care of your mental health is just as important as taking care of your body. Feelings of stress, sadness, or worry are normal, but if they start affecting your daily life, it helps to talk to someone you trust. Simple habits like enough sleep, movement, and honest conversations can make a real difference." },
  ];

  const themeColors = {
    magenta:    '#D81B9E',
    purple:     '#9023F0',
    gradientBg: 'linear-gradient(135deg, #D81B9E 0%, #9023F0 100%)',
    textDark:   '#1A1A1A',
    textMuted:  '#666666'
  };

  const authHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // ══════════════════════════════════════════════════════════════════════════
  // DASHBOARD CONFIG (admin-editable cards)
  // ══════════════════════════════════════════════════════════════════════════
  const fetchDashboardConfig = async (token) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard-config`, { headers: authHeaders(token) });
      const data = await res.json();
      if (data.success && Array.isArray(data.cards) && data.cards.length > 0) {
        setDashboardCards([...data.cards].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      }
    } catch (e) { console.error('Dashboard config fetch error:', e); }
  };

  const navigateToDashboardCard = (card) => {
    if (card.targetView === 'support') { openSupportHub(); setCurrentView('support'); }
    else if (card.targetView === 'counsellor') { openCounsellorHub(); setCurrentView('counsellor'); }
    else if (card.targetView === 'skills') { openSkillsHub(); setCurrentView('skills'); }
    else setCurrentView(card.targetView);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // AI HEALTH BOT HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const handleAiBotSend = (customText) => {
    const text = (customText || aiBotInput).trim();
    if (!text) return;
    const preset = aiBotQuickQuestions.find(item => item.q === text);
    const userMsg = { from: 'user', text };
    const botReply = {
      from: 'bot',
      text: preset
        ? preset.a
        : "Thanks for sharing that. While I can't replace a doctor, this is a completely normal thing to wonder about. For anything specific to your body, it's always best to also check with a health worker or one of our counsellors. Is there anything else you'd like to ask?"
    };
    setAiBotMessages(prev => [...prev, userMsg, botReply]);
    setAiBotInput('');
  };

  // ══════════════════════════════════════════════════════════════════════════
  // COUNSELLOR HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const openCounsellorHub = () => {
    setCounsellorView('list'); setSelectedCounsellor(null); setSelectedTime(null);
    setSessionNote(''); setStayAnonymous(false); setEditingSessionId(null);
  };

  const handleChatNow = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setChatMessages([{ from: 'system', text: `Starting chat with ${counsellor.name}. They will respond as soon as possible.` }]);
    setCounsellorView('chat');
  };

  const handleBookSessionClick = (counsellor) => {
    setSelectedCounsellor(counsellor); setSelectedTime(null); setSessionNote('');
    setStayAnonymous(false); setEditingSessionId(null); setCounsellorView('booking');
  };

  const fetchBookedSessions = async (token) => {
    try {
      const res  = await fetch(`${BACKEND_URL}/api/sessions`, { headers: authHeaders(token) });
      const data = await res.json();
      if (data.success) setBookedSessions(data.sessions);
    } catch (err) { console.error('Fetch sessions error:', err); }
  };

  const handleConfirmBooking = async () => {
    if (!selectedTime) return;
    try {
      if (editingSessionId) {
        const res  = await fetch(`${BACKEND_URL}/api/sessions/${editingSessionId}`, { method: 'PUT', headers: authHeaders(authToken), body: JSON.stringify({ time: selectedTime, note: sessionNote, anonymous: stayAnonymous }) });
        const data = await res.json();
        if (!data.success) { showToast(`Could not update: ${data.message}`, 'error'); return; }
        setBookedSessions(prev => prev.map(s => s.id === editingSessionId ? data.session : s));
      } else {
        const res  = await fetch(`${BACKEND_URL}/api/sessions`, { method: 'POST', headers: authHeaders(authToken), body: JSON.stringify({ counsellorId: selectedCounsellor.id, counsellorName: selectedCounsellor.name, counsellorRole: selectedCounsellor.role, counsellorColor: selectedCounsellor.color, counsellorAvatar: selectedCounsellor.avatar, time: selectedTime, note: sessionNote, anonymous: stayAnonymous }) });
        const data = await res.json();
        if (!data.success) { showToast(`Could not book: ${data.message}`, 'error'); return; }
        setBookedSessions(prev => [...prev, data.session]);
      }
      setEditingSessionId(null); setCounsellorView('confirmation');
    } catch (err) { console.error('Booking error:', err); showToast('Could not connect to the server.', 'error'); }
  };

  const handleEditSession = (session) => {
    const match = counsellors.find(c => c.id === session.counsellorId) || { id: session.counsellorId, name: session.counsellorName, role: session.counsellorRole, color: session.counsellorColor, avatar: session.counsellorAvatar };
    setSelectedCounsellor(match); setSelectedTime(session.time); setSessionNote(session.note || '');
    setStayAnonymous(session.anonymous || false); setEditingSessionId(session.id); setCounsellorView('booking');
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const res  = await fetch(`${BACKEND_URL}/api/sessions/${sessionId}`, { method: 'DELETE', headers: authHeaders(authToken) });
      const data = await res.json();
      if (!data.success) { showToast(`Could not delete: ${data.message}`, 'error'); return; }
      setBookedSessions(prev => prev.filter(s => s.id !== sessionId));
      setConfirmDeleteId(null);
      showToast('Session cancelled successfully.', 'success');
    } catch (err) { console.error('Delete error:', err); showToast('Could not connect to the server.', 'error'); }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SUPPORT HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const fetchSupportRequests = async (token) => {
    try {
      const res  = await fetch(`${BACKEND_URL}/api/support-requests`, { headers: authHeaders(token) });
      const data = await res.json();
      if (data.success) setSupportRequests(data.requests);
    } catch (err) { console.error('Fetch support requests error:', err); }
  };

  const handleSubmitSupportRequest = async () => {
    if (!supportFirstName.trim() || !supportSchoolName.trim()) {
      showToast('Please fill in your name and school.', 'error'); return;
    }
    setSubmittingSupport(true);
    try {
      const res  = await fetch(`${BACKEND_URL}/api/support-requests`, {
        method: 'POST', headers: authHeaders(authToken),
        body: JSON.stringify({ category: selectedSupport.id, categoryLabel: selectedSupport.label, firstName: supportFirstName, schoolName: supportSchoolName })
      });
      const data = await res.json();
      if (!data.success) { showToast(`Could not submit: ${data.message}`, 'error'); return; }
      setSupportRequests(prev => [...prev, data.request]);
      setSupportFirstName(''); setSupportSchoolName('');
      showToast('Request submitted! We\'ll be in touch soon.', 'success');
      setSupportView('list');
    } catch (err) { console.error('Support request error:', err); showToast('Could not connect to the server.', 'error'); }
    finally { setSubmittingSupport(false); }
  };

  const handleDeleteSupportRequest = async (requestId) => {
    try {
      const res  = await fetch(`${BACKEND_URL}/api/support-requests/${requestId}`, { method: 'DELETE', headers: authHeaders(authToken) });
      const data = await res.json();
      if (!data.success) { showToast(`Could not delete: ${data.message}`, 'error'); return; }
      setSupportRequests(prev => prev.filter(r => r.id !== requestId));
      setConfirmDeleteSupportId(null);
      showToast('Request removed.', 'success');
    } catch (err) { console.error('Delete support request error:', err); showToast('Could not connect to the server.', 'error'); }
  };

  const openSupportHub = () => {
    setSupportView('list'); setSelectedSupport(null);
    setSupportFirstName(''); setSupportSchoolName('');
    setConfirmDeleteSupportId(null);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // LEARN SKILLS HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const fetchCourses = async (token) => {
    setCoursesLoading(true);
    try {
      const headers = token ? authHeaders(token) : { 'Content-Type': 'application/json' };
      const res  = await fetch(`${BACKEND_URL}/api/courses`, { headers });
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (err) { console.error('Fetch courses error:', err); }
    finally { setCoursesLoading(false); }
  };

  const openSkillsHub = () => {
    setSkillsView('list'); setSelectedCourse(null);
    fetchCourses(authToken);
  };

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    setSkillsView('detail');
  };

  const handleEnrollOrContinue = async (course) => {
    if (!authToken) { showToast('Please sign in to start this course.', 'error'); return; }
    const lessons = course.lessonsCount || 4;
    const step = Math.max(1, Math.round(100 / lessons));
    const wasEnrolled = (course.percentComplete || 0) > 0;
    const nextPercent = Math.min(100, (course.percentComplete || 0) + step);
    try {
      const res  = await fetch(`${BACKEND_URL}/api/courses/${course.id}/progress`, {
        method: 'PUT', headers: authHeaders(authToken), body: JSON.stringify({ percentComplete: nextPercent })
      });
      const data = await res.json();
      if (!data.success) { showToast('Could not update your progress.', 'error'); return; }
      const updatedCourse = { ...course, percentComplete: nextPercent, completed: nextPercent >= 100 };
      setCourses(prev => prev.map(c => c.id === course.id ? updatedCourse : c));
      setSelectedCourse(updatedCourse);
      if (nextPercent >= 100) showToast(`Course completed! 🎉 You finished "${course.title}"`, 'success');
      else if (wasEnrolled) showToast('Progress saved!', 'success');
      else showToast(`Enrolled in "${course.title}"! Lesson 1 complete.`, 'success');
    } catch (err) { console.error('Course progress error:', err); showToast('Could not connect to the server.', 'error'); }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PROFILE HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const openProfile = () => {
    setProfileNewEmail(currentUser?.email || '');
    setConfirmDeleteAccount(false);
    setCurrentView('profile');
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!profileNewEmail.trim()) { showToast('Please enter an email address.', 'error'); return; }
    setUpdatingEmail(true);
    try {
      const res  = await fetch(`${BACKEND_URL}/api/users/me`, { method: 'PUT', headers: authHeaders(authToken), body: JSON.stringify({ email: profileNewEmail }) });
      const data = await res.json();
      if (!data.success) { showToast(`Could not update: ${data.message}`, 'error'); return; }
      setCurrentUser(data.user);
      showToast('Email updated successfully.', 'success');
    } catch (err) { console.error('Update email error:', err); showToast('Could not connect to the server.', 'error'); }
    finally { setUpdatingEmail(false); }
  };

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      const res  = await fetch(`${BACKEND_URL}/api/users/me`, { method: 'DELETE', headers: authHeaders(authToken) });
      const data = await res.json();
      if (!data.success) { showToast(`Could not delete account: ${data.message}`, 'error'); setDeletingAccount(false); return; }
      localStorage.removeItem('bigsister_token');
      setCurrentUser(null); setAuthToken(null);
      setBookedSessions([]); setSupportRequests([]);
      setConfirmDeleteAccount(false);
      setCurrentView('landing');
      showToast('Your account has been deleted.', 'success');
    } catch (err) {
      console.error('Delete account error:', err);
      showToast('Could not connect to the server.', 'error');
    } finally { setDeletingAccount(false); }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // AUTH HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) { showToast('Passwords do not match.', 'error'); return; }
    if (!agreeToTerms) { showToast('Please accept the Terms & Conditions to continue.', 'error'); return; }
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName: regFullName, email: regEmail, password: regPassword, agreeToTerms }) });
      const data = await res.json();
      if (data.success) {
        const savedEmail    = regEmail;
        const savedPassword = regPassword;
        setRegFullName(''); setRegEmail(''); setRegPassword(''); setRegConfirmPassword(''); setAgreeToTerms(false);
        showToast('Account created! Signing you in…', 'success', true, 4000);
        setTimeout(async () => {
          try {
            const r2   = await fetch(`${BACKEND_URL}/api/auth/signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: savedEmail, password: savedPassword }) });
            const d2   = await r2.json();
            if (d2.success) {
              localStorage.setItem('bigsister_token', d2.token);
              setAuthToken(d2.token); setCurrentUser(d2.user);
              await fetchBookedSessions(d2.token);
              await fetchSupportRequests(d2.token);
              await fetchCourses(d2.token);
              await fetchDashboardConfig(d2.token);
              // Route based on role
              if (d2.user.role === 'admin') {
                setCurrentView('admin');
              } else {
                setCurrentView('dashboard');
              }
            } else { setCurrentView('signin'); }
          } catch { setCurrentView('signin'); }
        }, 4000);
      } else { showToast(`Registration failed: ${data.message}`, 'error'); }
    } catch (err) { console.error('Signup error:', err); showToast('Could not connect to the server.', 'error'); }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: authEmail, password: authPassword }) });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('bigsister_token', data.token);
        setAuthToken(data.token); setCurrentUser(data.user);
        setAuthEmail(''); setAuthPassword('');
        await fetchBookedSessions(data.token);
        await fetchSupportRequests(data.token);
        await fetchCourses(data.token);
        await fetchDashboardConfig(data.token);
        showToast(`Welcome back, ${data.user.fullName?.split(' ')[0] || 'there'}`, 'success');
        
        // Route based on user role
        if (data.user.role === 'admin') {
          setCurrentView('admin');
        } else {
          setCurrentView('dashboard');
        }
      } else { showToast(`Login failed: ${data.message}`, 'error'); }
    } catch (err) { console.error('Signin error:', err); showToast('Could not connect to the server.', 'error'); }
  };

  const handleGoogleAccountSelect = async (account) => {
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/google-sync`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: account.email, name: account.name }) });
      const data = await res.json();
      if (data.success) {
        setShowGooglePopup(false);
        localStorage.setItem('bigsister_token', data.token);
        setAuthToken(data.token); setCurrentUser(data.user);
        await fetchBookedSessions(data.token);
        await fetchSupportRequests(data.token);
        await fetchCourses(data.token);
        await fetchDashboardConfig(data.token);
        showToast(`Welcome, ${data.user.fullName?.split(' ')[0] || 'there'}`, 'success');
        
        // Route based on user role
        if (data.user.role === 'admin') {
          setCurrentView('admin');
        } else {
          setCurrentView('dashboard');
        }
      } else { showToast(`Google sign-in failed: ${data.message}`, 'error'); }
    } catch (err) { console.error('Google sync error:', err); showToast('Error signing in with Google.', 'error'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('bigsister_token');
    setCurrentUser(null); setAuthToken(null);
    setBookedSessions([]); setSupportRequests([]);
    setCurrentView('landing');
    showToast('You have successfully logged out.', 'success', false, 2000);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SIDEBAR NAVIGATION (logged-in layout)
  // ══════════════════════════════════════════════════════════════════════════
  const primaryNavItems = [
    { key: 'dashboard',  icon: 'chart',       label: 'Home',                onClick: () => setCurrentView('dashboard') },
    { key: 'aibot',      icon: 'chat',        label: 'Ask AI Health Bot',   onClick: () => { setCurrentView('aibot'); } },
    { key: 'support',    icon: 'handshake',   label: 'Get Support',         onClick: () => { openSupportHub(); setCurrentView('support'); } },
    { key: 'counsellor', icon: 'stethoscope', label: 'Talk to Counsellor', onClick: () => { openCounsellorHub(); setCurrentView('counsellor'); } },
    { key: 'skills',     icon: 'cap',         label: 'Learn Skills',        onClick: () => { openSkillsHub(); setCurrentView('skills'); } },
    { key: 'emergency',  icon: 'alert',       label: 'Emergency Help',      onClick: () => { setCurrentView('emergency'); } },
    { key: 'track',      icon: 'chart',       label: 'Track Health',        onClick: () => { setCurrentView('track'); } },
    { key: 'topics',     icon: 'book',        label: 'Explore Topics',      onClick: () => { setCurrentView('topics'); } },
  ];

  const resourceNavItems = [
    { key: 'saved',     icon: 'bookmark', label: 'Saved',      onClick: () => showToast('Saved items coming soon!', 'info') },
    { key: 'downloads', icon: 'download', label: 'Downloads',  onClick: () => showToast('Downloads coming soon!', 'info') },
  ];


  const accountNavItems = [
    { key: 'profile',  icon: 'profile',  label: 'My Profile', onClick: openProfile },
    { key: 'logout',   icon: 'logout',   label: 'Logout',     onClick: handleLogout }
  ];

  const isNavItemActive = (key) => {
    if (key === 'dashboard') return currentView === 'dashboard';
    if (key === 'support') return currentView === 'support';
    if (key === 'counsellor') return currentView === 'counsellor';
    if (key === 'profile') return currentView === 'profile';
    if (key === 'aibot') return currentView === 'aibot';
    if (key === 'skills') return currentView === 'skills';
    if (key === 'emergency') return currentView === 'emergency';
    if (key === 'track') return currentView === 'track';
    if (key === 'topics') return currentView === 'topics';
    return false;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // STYLES
  // ══════════════════════════════════════════════════════════════════════════
  const styles = {
    container: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#FFF8FD', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'hidden', margin: 0, padding: 0 },

    appShell:    { display: 'flex', width: '100%', flex: 1, minHeight: 0, boxSizing: 'border-box', overflow: 'hidden' },
    mainColumn:  { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, height: '100%', boxSizing: 'border-box', overflow: 'hidden' },

    sidebar:            { width: '256px', minWidth: '256px', height: '100%', backgroundColor: '#FFFFFF', borderRight: '1px solid #F0E4F7', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: 'auto' },
    sidebarNavScroll:    { flex: 1, padding: '4px 14px 10px 14px', boxSizing: 'border-box' },
    sidebarSectionLabel: { fontSize: '10.5px', fontWeight: '800', color: '#B98FD1', textTransform: 'uppercase', letterSpacing: '1px', margin: '18px 10px 8px 10px' },
    sidebarNavItem:      { display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 12px', borderRadius: '12px', fontSize: '13.5px', fontWeight: '600', color: '#5B5B5B', cursor: 'pointer', marginBottom: '2px', transition: 'background-color 0.15s, color 0.15s' },
    sidebarNavItemActive:{ backgroundColor: '#F3E8FF', color: '#9023F0', fontWeight: '800' },
    sidebarNavIcon:      { width: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    sidebarDivider:      { height: '1px', backgroundColor: '#F0E4F7', margin: '10px 10px' },
    sidebarBottomCard:   { margin: '10px 14px 16px 14px', backgroundColor: '#FDEBF5', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '10px', boxSizing: 'border-box' },
    sidebarBottomIcon:   { flexShrink: 0, display: 'flex', alignItems: 'center' },
    sidebarBottomTitle:  { fontSize: '12.5px', fontWeight: '800', color: '#C0288E', margin: 0 },
    sidebarBottomDesc:   { fontSize: '11px', color: '#B36FA0', margin: '2px 0 0 0', fontWeight: '500', lineHeight: '1.35' },

    navbar: { width: '100%', height: '64px', backgroundColor: '#FFFFFF', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', borderBottom: '1px solid #EAEAEA', zIndex: 50, flexShrink: 0 },
    navBrandGroup:   { display: 'flex', alignItems: 'center', gap: '30px' },
    navBrandText:    { fontSize: '24px', fontWeight: '800', color: themeColors.magenta, cursor: 'pointer' },
    navLinkItem:     { fontSize: '14px', fontWeight: '600', color: '#A155B9', textDecoration: 'none', cursor: 'pointer', marginRight: '20px' },
    navAuthButtons:  { display: 'flex', alignItems: 'center', gap: '12px' },
    navLoginBtn:     { background: '#FFFFFF', color: themeColors.purple, border: `1.5px solid ${themeColors.purple}`, borderRadius: '20px', padding: '6px 20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
    navRegisterBtn:  { background: themeColors.gradientBg, color: '#FFFFFF', border: 'none', borderRadius: '20px', padding: '7px 22px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
    userProfileTag:  { fontSize: '13px', fontWeight: '600', color: themeColors.textDark, marginRight: '8px' },
    contentBody:     { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, width: '100%', boxSizing: 'border-box', overflow: 'hidden' },

    landingMainContainer: { display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#FFFFFF' },
    landingHeroSection:   { display: 'flex', width: '100%', flex: '1.2', backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 22%, rgba(255,255,255,0.72) 42%, rgba(255,255,255,0.25) 62%, rgba(0,0,0,0.1) 100%), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 60px', boxSizing: 'border-box', position: 'relative' },
    landingHeroLeft:      { width: '100%', maxWidth: '550px', textAlign: 'left', zIndex: 2 },
    landingHeroTag:       { fontSize: '11px', fontWeight: '800', color: themeColors.magenta, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' },
    landingHeroTitle:     { fontSize: '38px', fontWeight: '800', color: themeColors.textDark, lineHeight: '1.15', margin: '0 0 12px 0' },
    landingHeroDesc:      { fontSize: '14.5px', color: '#1A1A1A', lineHeight: '1.65', marginBottom: '20px', fontWeight: '600', textAlign: 'justify', textShadow: '0 1px 4px rgba(255,255,255,0.9), 0 0 12px rgba(255,255,255,0.6)' },
    landingHeroBtnGroup:  { display: 'flex', gap: '14px' },
    landingGridSection:   { padding: '20px 60px', flex: '0.8', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', backgroundColor: '#FDF8FF', borderTop: '1px solid #F5E6FA' },
    landingInfoCard:      { backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '20px', flex: '1', height: '85%', minWidth: '260px', maxWidth: '360px', boxSizing: 'border-box', border: '1px solid #EFE0F5', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' },
    landingCardIcon:      { marginBottom: '10px', display: 'flex' },
    landingCardTitle:     { fontSize: '15px', fontWeight: '700', color: themeColors.textDark, marginBottom: '6px' },
    landingCardDesc:      { fontSize: '12.5px', color: themeColors.textMuted, lineHeight: '1.5', margin: 0, textAlign: 'justify' },

    authCardWrapper: { display: 'flex', flex: 1, backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${signBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', boxSizing: 'border-box' },
    authMainCard:    { backgroundColor: '#FFFFFF', borderRadius: '24px', width: '100%', maxWidth: '375px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', boxSizing: 'border-box', padding: '24px', textAlign: 'center', overflow: 'hidden' },
    authCardTitle:   { fontSize: '20px', fontWeight: '700', color: themeColors.textDark, margin: '0 0 16px 0', letterSpacing: '-0.3px' },
    authSubmitBtn:   { background: themeColors.gradientBg, color: '#FFFFFF', border: 'none', borderRadius: '25px', padding: '11px 24px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginTop: '6px', marginBottom: '10px' },
    inputGroup:      { marginBottom: '10px', textAlign: 'left', position: 'relative' },
    inputLabel:      { display: 'block', fontSize: '11px', fontWeight: '700', color: '#A0A0A0', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    inputField:      { width: '100%', padding: '10px 14px', borderRadius: '10px', border: 'none', backgroundColor: '#F4F5F7', fontSize: '13px', color: '#333333', boxSizing: 'border-box', outline: 'none' },
    privacyFooterText: { fontSize: '11px', color: '#8A8A8A', marginTop: '12px', textAlign: 'center', fontWeight: '400', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
    overlay:  { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
    popupBox: { backgroundColor: '#FFFFFF', borderRadius: '16px', width: '90%', maxWidth: '360px', padding: '24px', boxShadow: '0px 8px 24px rgba(0,0,0,0.3)', textAlign: 'left', boxSizing: 'border-box' },

    dashboardWrapper:      { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box' },
    dashboardWelcomeBar:   { width: '100%', backgroundColor: '#C51FA0', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', color: '#FFFFFF', flexShrink: 0 },
    dashboardWelcomeText:  { fontSize: '16px', fontWeight: '700', letterSpacing: '-0.2px' },
    dashboardMainView:     { padding: '16px 32px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', width: '100%', flex: 1, minHeight: 0 },
    tipOfTheDayCard:       { width: '100%', backgroundColor: '#FA539B', borderRadius: '14px', padding: '10px 18px', color: '#FFFFFF', boxSizing: 'border-box', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 15px rgba(250,83,155,0.15)', flexShrink: 0 },
    tipTitle:              { fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', opacity: 0.9, marginBottom: '2px' },
    tipBody:               { fontSize: '13px', fontWeight: '500', margin: 0, lineHeight: '1.3' },
    featuresGridContainer: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%', boxSizing: 'border-box', paddingBottom: '14px', flexShrink: 0 },
    featureCard:  { borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'left', boxSizing: 'border-box', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', minHeight: '110px' },
    featureIcon:  { marginBottom: '8px', display: 'flex' },
    featureTitle: { fontSize: '14px', fontWeight: '700', marginBottom: '4px' },
    featureDesc:  { fontSize: '11.5px', lineHeight: '1.35', margin: 0, fontWeight: '500' },

    quickAccessSection:   { width: '100%', boxSizing: 'border-box', flex: 1, minHeight: 0 },
    quickAccessTitle:     { fontSize: '14px', fontWeight: '800', color: themeColors.purple, margin: '0 0 10px 0' },
    quickAccessRow:        { display: 'flex', gap: '12px', flexWrap: 'wrap' },
    quickAccessPill:       { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFFFF', border: '1px solid #F0E4F7', borderRadius: '14px', padding: '11px 16px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', cursor: 'pointer', fontSize: '12.5px', fontWeight: '700', color: '#333333', flex: '1 1 180px', minWidth: '180px', transition: 'transform 0.15s, box-shadow 0.15s' },
    quickAccessIconWrap:   (bg) => ({ width: '30px', height: '30px', borderRadius: '9px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }),

    counsellorWrapper:        { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FBF2FC' },
    counsellorHeaderBar:      { display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 32px', boxSizing: 'border-box' },
    counsellorBackBtn:        { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: themeColors.purple, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', flexShrink: 0 },
    counsellorHeaderTitle:    { fontSize: '20px', fontWeight: '800', color: themeColors.purple, margin: 0 },
    counsellorHeaderSubtitle: { fontSize: '12.5px', color: '#A56BC4', margin: 0, fontWeight: '500' },
    mySessionsLink:           { marginLeft: 'auto', fontSize: '13px', fontWeight: '700', color: themeColors.purple, cursor: 'pointer', backgroundColor: '#F3E8FF', padding: '8px 16px', borderRadius: '18px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' },
    counsellorListBody:       { padding: '0 32px 32px 32px', display: 'flex', flexDirection: 'column', gap: '18px', boxSizing: 'border-box' },
    counsellorCard:           { backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '20px', boxSizing: 'border-box', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' },
    counsellorCardTopRow:     { display: 'flex', alignItems: 'flex-start', gap: '14px' },
    counsellorAvatarCircle:   { width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    counsellorInfoBlock:      { flex: 1, minWidth: 0 },
    counsellorName:           { fontSize: '15.5px', fontWeight: '800', color: themeColors.textDark, margin: 0 },
    counsellorRole:           { fontSize: '12.5px', color: '#888888', margin: '2px 0 8px 0', fontWeight: '600' },
    counsellorBio:            { fontSize: '12.5px', color: '#555555', lineHeight: '1.45', margin: '0 0 10px 0', textAlign: 'justify' },
    counsellorTagsRow:        { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' },
    counsellorTag:            { fontSize: '11.5px', fontWeight: '700', color: themeColors.purple, backgroundColor: '#F3E8FF', padding: '4px 10px', borderRadius: '12px' },
    availabilityBadgeAvailable: { fontSize: '11.5px', fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', padding: '5px 12px', borderRadius: '14px', whiteSpace: 'nowrap', flexShrink: 0 },
    availabilityBadgeNext:      { fontSize: '11.5px', fontWeight: '700', color: '#666666', backgroundColor: '#F1F1F1', padding: '5px 12px', borderRadius: '14px', whiteSpace: 'nowrap', flexShrink: 0 },
    counsellorActionRow:    { display: 'flex', gap: '12px' },
    chatNowBtn:             { flex: 1, backgroundColor: themeColors.purple, color: '#FFFFFF', border: 'none', borderRadius: '22px', padding: '11px 16px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
    bookSessionBtn:         { flex: 1, backgroundColor: '#FFFFFF', color: themeColors.purple, border: `1.5px solid ${themeColors.purple}`, borderRadius: '22px', padding: '11px 16px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
    groupSessionCard:       { background: 'linear-gradient(135deg, #C026D3 0%, #9023F0 100%)', borderRadius: '18px', padding: '20px', color: '#FFFFFF', boxSizing: 'border-box' },
    groupSessionTitleRow:   { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '15px', fontWeight: '800' },
    groupSessionDesc:       { fontSize: '12.5px', opacity: 0.92, lineHeight: '1.4', margin: '0 0 16px 0', textAlign: 'justify' },
    joinGroupBtn:           { width: '100%', backgroundColor: 'rgba(255,255,255,0.22)', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: '22px', padding: '11px 16px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer' },

    chatBody:           { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 32px', boxSizing: 'border-box', textAlign: 'center' },
    chatAvatarLarge:    { width: '90px', height: '90px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' },
    chatCounsellorName: { fontSize: '17px', fontWeight: '800', color: themeColors.purple, margin: '0 0 2px 0' },
    chatCounsellorRole: { fontSize: '13px', color: '#A56BC4', margin: '0 0 24px 0', fontWeight: '600' },
    chatSystemBubble:   { backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '18px 22px', maxWidth: '420px', fontSize: '13.5px', color: '#444444', lineHeight: '1.5', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', marginBottom: '24px', textAlign: 'justify' },

    bookingBody:             { padding: '0 32px 32px 32px', display: 'flex', flexDirection: 'column', gap: '18px', boxSizing: 'border-box' },
    bookingCounsellorBanner: { borderRadius: '18px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', color: '#FFFFFF' },
    bookingAvatarCircle:     { width: '46px', height: '46px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    bookingPanel:            { backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '20px', boxSizing: 'border-box', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' },
    bookingPanelLabel:       { fontSize: '13px', fontWeight: '700', color: themeColors.textDark, marginBottom: '12px' },
    timeSlotGrid:            { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' },
    timeSlotBtn:             { padding: '12px 10px', borderRadius: '14px', border: '1.5px solid #EAEAEA', backgroundColor: '#FAFAFA', fontSize: '13px', fontWeight: '700', color: '#555555', cursor: 'pointer', textAlign: 'center' },
    timeSlotBtnSelected:     { backgroundColor: themeColors.purple, borderColor: themeColors.purple, color: '#FFFFFF' },
    noteTextarea:            { width: '100%', minHeight: '70px', borderRadius: '14px', border: 'none', backgroundColor: '#F4F5F7', padding: '14px', fontSize: '13px', color: '#333333', boxSizing: 'border-box', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
    anonymousRow:            { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' },
    anonymousLabelTitle:     { fontSize: '13.5px', fontWeight: '700', color: themeColors.textDark, margin: 0 },
    anonymousLabelDesc:      { fontSize: '12px', color: '#888888', margin: '2px 0 0 0' },
    toggleSwitchTrack: (on) => ({ width: '44px', height: '26px', borderRadius: '14px', backgroundColor: on ? themeColors.purple : '#E0E0E0', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s', flexShrink: 0 }),
    toggleSwitchKnob:  (on) => ({ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFFFFF', position: 'absolute', top: '3px', left: on ? '21px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }),
    confirmBookingBtn: (ok) => ({ width: '100%', backgroundColor: ok ? themeColors.purple : '#EADCF5', color: ok ? '#FFFFFF' : '#B89DC9', border: 'none', borderRadius: '24px', padding: '14px', fontSize: '14.5px', fontWeight: '800', cursor: ok ? 'pointer' : 'not-allowed' }),

    confirmationBody:         { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', boxSizing: 'border-box', textAlign: 'center' },
    confirmationCard:         { backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '40px 32px', maxWidth: '420px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', boxSizing: 'border-box' },
    confirmationCheckCircle:  { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' },
    confirmationTitle:        { fontSize: '21px', fontWeight: '800', color: themeColors.textDark, margin: '0 0 14px 0' },
    confirmationWithText:     { fontSize: '14px', color: '#555555', margin: '0 0 4px 0', fontWeight: '600' },
    confirmationTimeText:     { fontSize: '17px', color: themeColors.purple, fontWeight: '800', margin: '0 0 16px 0' },
    confirmationReminderText: { fontSize: '12.5px', color: '#999999', margin: '0 0 26px 0' },
    backToCounsellorsBtn:     { width: '100%', backgroundColor: themeColors.purple, color: '#FFFFFF', border: 'none', borderRadius: '24px', padding: '13px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' },

    mySessionsEmptyState: { textAlign: 'center', padding: '60px 32px', color: '#999999' },
    sessionCard:          { backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '18px 20px', boxSizing: 'border-box', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' },
    sessionCardTopRow:    { display: 'flex', alignItems: 'center', gap: '12px' },
    sessionCardAvatar:    { width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    sessionCardName:      { fontSize: '14.5px', fontWeight: '800', color: themeColors.textDark, margin: 0 },
    sessionCardRole:      { fontSize: '12px', color: '#888888', margin: '1px 0 0 0', fontWeight: '600' },
    sessionTimeBadge:     { marginLeft: 'auto', fontSize: '12px', fontWeight: '700', color: themeColors.purple, backgroundColor: '#F3E8FF', padding: '6px 12px', borderRadius: '14px', whiteSpace: 'nowrap' },
    sessionNoteText:      { fontSize: '12.5px', color: '#666666', backgroundColor: '#FAFAFA', padding: '10px 12px', borderRadius: '10px', margin: 0, lineHeight: '1.4', textAlign: 'justify' },
    sessionAnonTag:       { fontSize: '11px', fontWeight: '700', color: '#888888', backgroundColor: '#F1F1F1', padding: '3px 9px', borderRadius: '10px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px' },
    sessionActionRow:     { display: 'flex', gap: '10px' },
    sessionEditBtn:       { flex: 1, backgroundColor: '#F3E8FF', color: themeColors.purple, border: 'none', borderRadius: '18px', padding: '9px 14px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
    sessionDeleteBtn:     { flex: 1, backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '18px', padding: '9px 14px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
    deleteConfirmRow:     { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', backgroundColor: '#FEF2F2', borderRadius: '14px', padding: '12px 14px' },
    deleteConfirmText:    { fontSize: '12px', color: '#991B1B', fontWeight: '600', margin: 0 },
    deleteConfirmActions: { display: 'flex', gap: '8px', flexShrink: 0 },
    deleteConfirmYesBtn:  { backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '12px', padding: '7px 12px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' },
    deleteConfirmNoBtn:   { backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '7px 12px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' },

    supportWrapper:        { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#EEF2FF' },
    supportHeaderBar:      { display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 32px', boxSizing: 'border-box' },
    supportBackBtn:        { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#3B82F6', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', flexShrink: 0 },
    supportHeaderTitle:    { fontSize: '20px', fontWeight: '800', color: '#3B82F6', margin: 0 },
    supportHeaderSubtitle: { fontSize: '12.5px', color: '#6366F1', margin: 0, fontWeight: '500' },
    supportListBody:       { padding: '0 32px 32px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', boxSizing: 'border-box' },
    supportCard:           { backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '22px', boxSizing: 'border-box', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'transform 0.15s, box-shadow 0.15s' },
    supportCardIcon:       { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    supportCardTitle:      { fontSize: '15px', fontWeight: '800', color: '#1A1A1A', margin: 0 },
    supportCardSubtitle:   { fontSize: '12px', color: '#888888', margin: 0, fontWeight: '500' },
    supportLearnMore:      { fontSize: '12.5px', fontWeight: '700', color: '#3B82F6', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' },
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SIDEBAR RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderSidebar = () => (
    <aside style={styles.sidebar} className="no-scrollbar">
      <SidebarBrand onClick={() => setCurrentView('dashboard')} />
      <div style={styles.sidebarNavScroll}>
        {primaryNavItems.map(item => (
          <div
            key={item.key}
            style={{ ...styles.sidebarNavItem, ...(isNavItemActive(item.key) ? styles.sidebarNavItemActive : {}) }}
            onClick={item.onClick}
            onMouseEnter={e => { if (!isNavItemActive(item.key)) e.currentTarget.style.backgroundColor = '#FBF2FC'; }}
            onMouseLeave={e => { if (!isNavItemActive(item.key)) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <span style={styles.sidebarNavIcon}><Icon name={item.icon} size={16} color={isNavItemActive(item.key) ? '#9023F0' : '#5B5B5B'} /></span>
            <span>{item.label}</span>
          </div>
        ))}

        

        <div style={styles.sidebarSectionLabel}>Account</div>
        {accountNavItems.map(item => (
          <div
            key={item.key}
            style={{ ...styles.sidebarNavItem, ...(isNavItemActive(item.key) ? styles.sidebarNavItemActive : {}) }}
            onClick={item.onClick}
            onMouseEnter={e => { if (!isNavItemActive(item.key)) e.currentTarget.style.backgroundColor = '#FBF2FC'; }}
            onMouseLeave={e => { if (!isNavItemActive(item.key)) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <span style={styles.sidebarNavIcon}><Icon name={item.icon} size={16} color={isNavItemActive(item.key) ? '#9023F0' : '#5B5B5B'} /></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={styles.sidebarBottomCard}>
        <span style={styles.sidebarBottomIcon}><Icon name="badge" size={20} color="#C0288E" /></span>
        <div>
          <p style={styles.sidebarBottomTitle}>You're doing great</p>
          <p style={styles.sidebarBottomDesc}>Take a moment for yourself today.</p>
        </div>
      </div>
    </aside>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SUPPORT FEATURE RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderSupportFeature = () => {
    const cat = selectedSupport;

    const handleSupportBack = () => {
      if (supportView === 'list') setCurrentView('dashboard');
      else if (supportView === 'detail' || supportView === 'myrequests') { setSupportView('list'); setSelectedSupport(null); }
    };

    return (
      <div style={styles.supportWrapper} className="no-scrollbar">
        <div style={styles.supportHeaderBar}>
          <button style={styles.supportBackBtn} onClick={handleSupportBack}><Icon name="arrow-left" size={15} color="#3B82F6" /></button>
          <div>
            <h2 style={styles.supportHeaderTitle}>{supportView === 'detail' && cat ? cat.label : 'Get Support'}</h2>
            <p style={styles.supportHeaderSubtitle}>{supportView === 'detail' && cat ? cat.subtitle : 'Free resources for girls in Uganda'}</p>
          </div>
          {supportView === 'list' && (
            <span style={{ ...styles.mySessionsLink, color: '#3B82F6', backgroundColor: '#EEF2FF' }} onClick={() => setSupportView('myrequests')}>
              <Icon name="clipboard" size={14} color="#3B82F6" /> My Requests {supportRequests.length > 0 ? `(${supportRequests.length})` : ''}
            </span>
          )}
        </div>

        {supportView === 'list' && (
          <div style={styles.supportListBody}>
            {supportCategories.map(cat => (
              <div key={cat.id} style={styles.supportCard} onClick={() => { setSelectedSupport(cat); setSupportView('detail'); }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.04)'; }}>
                <div style={{ ...styles.supportCardIcon, backgroundColor: `${cat.color}18` }}><Icon name={cat.icon} size={22} color={cat.color} /></div>
                <div>
                  <p style={styles.supportCardTitle}>{cat.label}</p>
                  <p style={styles.supportCardSubtitle}>{cat.subtitle}</p>
                </div>
                <div style={{ ...styles.supportLearnMore, color: cat.color }}>Learn more →</div>
              </div>
            ))}
          </div>
        )}

        {supportView === 'detail' && cat && (
          <div style={{ padding: '0 32px 32px 32px', display: 'flex', flexDirection: 'column', gap: '18px', boxSizing: 'border-box' }}>
            <div style={{ borderRadius: '18px', background: cat.gradient, padding: '28px 24px', color: '#FFFFFF' }}>
              <div style={{ marginBottom: '10px' }}><Icon name={cat.icon} size={30} color="#FFFFFF" /></div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '800' }}>{cat.label}</h3>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>{cat.subtitle}</p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '20px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
              <p style={{ margin: '0 0 14px 0', fontSize: '13px', fontWeight: '800', color: cat.color }}>What's included:</p>
              {cat.includes.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < cat.includes.length - 1 ? '10px' : 0 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${cat.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="check" size={10} color={cat.color} />
                  </div>
                  <span style={{ fontSize: '13px', color: '#444444', fontWeight: '500' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '16px 20px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '11px', fontWeight: '700', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Eligibility</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1A1A1A' }}>{cat.eligibility}</p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '20px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
              <p style={{ margin: '0 0 14px 0', fontSize: '13.5px', fontWeight: '800', color: '#1A1A1A' }}>Request this support:</p>
              <input type="text" placeholder="Your first name" value={supportFirstName} onChange={e => setSupportFirstName(e.target.value)} style={{ ...styles.inputField, marginBottom: '10px', display: 'block' }} />
              <input type="text" placeholder="Your school name" value={supportSchoolName} onChange={e => setSupportSchoolName(e.target.value)} style={{ ...styles.inputField, marginBottom: '16px', display: 'block' }} />
              <button
                onClick={handleSubmitSupportRequest}
                disabled={submittingSupport}
                style={{ width: '100%', background: submittingSupport ? '#CCCCCC' : cat.gradient, color: '#FFFFFF', border: 'none', borderRadius: '22px', padding: '13px', fontSize: '14px', fontWeight: '800', cursor: submittingSupport ? 'not-allowed' : 'pointer' }}
              >
                {submittingSupport ? 'Submitting…' : 'Submit Request'}
              </button>
            </div>
          </div>
        )}

        {supportView === 'myrequests' && (
          <div style={{ padding: '0 32px 32px 32px', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
            {supportRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 32px', color: '#999999' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}><Icon name="clipboard" size={30} color="#999999" /></div>
                <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>No requests submitted yet</p>
                <p style={{ fontSize: '12.5px', marginTop: '6px' }}>Submit a support request to see it here.</p>
              </div>
            ) : (
              supportRequests.map(req => {
                const catInfo = supportCategories.find(c => c.id === req.category) || supportCategories[0];
                return (
                  <div key={req.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '18px 20px', boxSizing: 'border-box', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: `${catInfo.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={catInfo.icon} size={18} color={catInfo.color} /></div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#1A1A1A' }}>{req.categoryLabel || catInfo.label}</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#888888', fontWeight: '500' }}>{req.firstName} · {req.schoolName}</p>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', padding: '4px 10px', borderRadius: '10px' }}>Submitted</span>
                    </div>
                    {confirmDeleteSupportId === req.id ? (
                      <div style={styles.deleteConfirmRow}>
                        <p style={styles.deleteConfirmText}>Remove this request?</p>
                        <div style={styles.deleteConfirmActions}>
                          <button style={styles.deleteConfirmYesBtn} onClick={() => handleDeleteSupportRequest(req.id)}>Remove</button>
                          <button style={styles.deleteConfirmNoBtn} onClick={() => setConfirmDeleteSupportId(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button style={{ ...styles.sessionDeleteBtn, flex: 'none' }} onClick={() => setConfirmDeleteSupportId(req.id)}><Icon name="trash" size={13} color="#DC2626" /> Remove request</button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // COUNSELLOR FEATURE RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderCounsellorFeature = () => {
    const handleBack = () => {
      if (counsellorView === 'list') setCurrentView('dashboard');
      else setCounsellorView('list');
    };

    return (
      <div style={styles.counsellorWrapper} className="no-scrollbar">
        <div style={styles.counsellorHeaderBar}>
          <button style={styles.counsellorBackBtn} onClick={handleBack}><Icon name="arrow-left" size={15} color="#9023F0" /></button>
          <div>
            <h2 style={styles.counsellorHeaderTitle}>Talk to a Counsellor</h2>
            <p style={styles.counsellorHeaderSubtitle}>Safe, confidential support</p>
          </div>
          {counsellorView === 'list' && (
            <span style={styles.mySessionsLink} onClick={() => setCounsellorView('mysessions')}>
              <Icon name="calendar" size={14} color="#9023F0" /> My Sessions {bookedSessions.length > 0 ? `(${bookedSessions.length})` : ''}
            </span>
          )}
        </div>

        {counsellorView === 'list' && (
          <div style={styles.counsellorListBody}>
            {counsellors.map(c => (
              <div key={c.id} style={styles.counsellorCard}>
                <div style={styles.counsellorCardTopRow}>
                  <div style={{ ...styles.counsellorAvatarCircle, backgroundColor: `${c.color}22` }}><Icon name={c.avatar} size={22} color={c.color} /></div>
                  <div style={styles.counsellorInfoBlock}>
                    <h3 style={styles.counsellorName}>{c.name}</h3>
                    <p style={styles.counsellorRole}>{c.role}</p>
                  </div>
                  {c.availability.type === 'available' ? <span style={styles.availabilityBadgeAvailable}>Available Now</span> : <span style={styles.availabilityBadgeNext}>{c.availability.label}</span>}
                </div>
                <p style={styles.counsellorBio}>{c.bio}</p>
                <div style={styles.counsellorTagsRow}>
                  {c.tags.map(tag => <span key={tag} style={styles.counsellorTag}>{tag}</span>)}
                </div>
                <div style={styles.counsellorActionRow}>
                  <button style={styles.chatNowBtn} onClick={() => handleChatNow(c)}><Icon name="chat" size={14} color="#FFFFFF" /> Chat Now</button>
                  <button style={styles.bookSessionBtn} onClick={() => handleBookSessionClick(c)}><Icon name="calendar" size={14} color={themeColors.purple} /> Book Session</button>
                </div>
              </div>
            ))}
            <div style={styles.groupSessionCard}>
              <div style={styles.groupSessionTitleRow}><Icon name="users" size={18} color="#FFFFFF" /> Weekly Group Sessions</div>
              <p style={styles.groupSessionDesc}>Join other girls in a safe, guided group discussion. Topics change weekly.</p>
              <button style={styles.joinGroupBtn} onClick={() => showToast("Joining this week's group session…", 'info')}>Join Group Session</button>
            </div>
          </div>
        )}

        {counsellorView === 'chat' && selectedCounsellor && (
          <div style={styles.chatBody}>
            <div style={{ ...styles.chatAvatarLarge, backgroundColor: `${selectedCounsellor.color}22` }}><Icon name={selectedCounsellor.avatar} size={40} color={selectedCounsellor.color} /></div>
            <h3 style={styles.chatCounsellorName}>{selectedCounsellor.name}</h3>
            <p style={styles.chatCounsellorRole}>{selectedCounsellor.role}</p>
            {chatMessages.map((msg, i) => <div key={i} style={styles.chatSystemBubble}>{msg.text}</div>)}
            <button style={{ ...styles.bookSessionBtn, maxWidth: '280px' }} onClick={() => handleBookSessionClick(selectedCounsellor)}><Icon name="calendar" size={14} color={themeColors.purple} /> Book a session instead</button>
          </div>
        )}

        {counsellorView === 'booking' && selectedCounsellor && (
          <div style={styles.bookingBody}>
            <div style={{ ...styles.bookingCounsellorBanner, backgroundColor: selectedCounsellor.color }}>
              <div style={styles.bookingAvatarCircle}><Icon name={selectedCounsellor.avatar} size={20} color="#FFFFFF" /></div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>{selectedCounsellor.name}</h3>
                <p style={{ fontSize: '12.5px', margin: '2px 0 0 0', opacity: 0.9, fontWeight: '600' }}>{selectedCounsellor.role}</p>
              </div>
            </div>
            <div style={styles.bookingPanel}>
              <div style={styles.bookingPanelLabel}>Choose a time:</div>
              <div style={styles.timeSlotGrid}>
                {TIME_SLOTS.map(slot => (
                  <button key={slot} style={{ ...styles.timeSlotBtn, ...(selectedTime === slot ? styles.timeSlotBtnSelected : {}) }} onClick={() => setSelectedTime(slot)}>{slot}</button>
                ))}
              </div>
            </div>
            <div style={styles.bookingPanel}>
              <textarea style={styles.noteTextarea} placeholder="Briefly describe what you'd like to discuss (optional)" value={sessionNote} onChange={e => setSessionNote(e.target.value)} />
            </div>
            <div style={styles.bookingPanel}>
              <div style={styles.anonymousRow}>
                <div>
                  <p style={styles.anonymousLabelTitle}>Stay anonymous</p>
                  <p style={styles.anonymousLabelDesc}>Your name won't be shared with the counsellor</p>
                </div>
                <div style={styles.toggleSwitchTrack(stayAnonymous)} onClick={() => setStayAnonymous(!stayAnonymous)}>
                  <div style={styles.toggleSwitchKnob(stayAnonymous)} />
                </div>
              </div>
            </div>
            <button style={styles.confirmBookingBtn(!!selectedTime)} disabled={!selectedTime} onClick={handleConfirmBooking}>
              {editingSessionId ? 'Save Changes' : 'Confirm Booking'}
            </button>
          </div>
        )}

        {counsellorView === 'confirmation' && selectedCounsellor && (
          <div style={styles.confirmationBody}>
            <div style={styles.confirmationCard}>
              <div style={styles.confirmationCheckCircle}><Icon name="check" size={26} color="#16A34A" /></div>
              <h3 style={styles.confirmationTitle}>{editingSessionId ? 'Session Updated!' : 'Session Booked!'}</h3>
              <p style={styles.confirmationWithText}>With {selectedCounsellor.name}</p>
              <p style={styles.confirmationTimeText}>{selectedTime}</p>
              <p style={styles.confirmationReminderText}>You'll receive a reminder before your session.</p>
              <button style={styles.backToCounsellorsBtn} onClick={() => { setEditingSessionId(null); setCounsellorView('list'); }}>Back to counsellors</button>
            </div>
          </div>
        )}

        {counsellorView === 'mysessions' && (
          <div style={styles.bookingBody}>
            {bookedSessions.length === 0 ? (
              <div style={styles.mySessionsEmptyState}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}><Icon name="calendar" size={30} color="#999999" /></div>
                <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>No sessions booked yet</p>
                <p style={{ fontSize: '12.5px', marginTop: '6px' }}>Book a session with a counsellor to see it here.</p>
              </div>
            ) : (
              bookedSessions.map(session => (
                <div key={session.id} style={styles.sessionCard}>
                  <div style={styles.sessionCardTopRow}>
                    <div style={{ ...styles.sessionCardAvatar, backgroundColor: `${session.counsellorColor}22` }}><Icon name={session.counsellorAvatar} size={18} color={session.counsellorColor} /></div>
                    <div>
                      <p style={styles.sessionCardName}>{session.counsellorName}</p>
                      <p style={styles.sessionCardRole}>{session.counsellorRole}</p>
                    </div>
                    <span style={styles.sessionTimeBadge}>{session.time}</span>
                  </div>
                  {session.note && <p style={styles.sessionNoteText}>"{session.note}"</p>}
                  {session.anonymous && <span style={styles.sessionAnonTag}><Icon name="lock" size={11} color="#888888" /> Anonymous</span>}
                  {confirmDeleteId === session.id ? (
                    <div style={styles.deleteConfirmRow}>
                      <p style={styles.deleteConfirmText}>Cancel this session?</p>
                      <div style={styles.deleteConfirmActions}>
                        <button style={styles.deleteConfirmYesBtn} onClick={() => handleDeleteSession(session.id)}>Cancel Session</button>
                        <button style={styles.deleteConfirmNoBtn} onClick={() => setConfirmDeleteId(null)}>Keep</button>
                      </div>
                    </div>
                  ) : (
                    <div style={styles.sessionActionRow}>
                      <button style={styles.sessionEditBtn} onClick={() => handleEditSession(session)}><Icon name="pencil" size={13} color={themeColors.purple} /> Edit</button>
                      <button style={styles.sessionDeleteBtn} onClick={() => setConfirmDeleteId(session.id)}><Icon name="trash" size={13} color="#DC2626" /> Cancel</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

// ══════════════════════════════════════════════════════════════════════════
  // MY PROFILE FEATURE RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderProfileFeature = () => {
    if (!currentUser) return null;

    const settingsMenu = [
      { key: 'info',          icon: 'profile',   title: 'Profile Information', desc: 'Update your personal details and how others see you.' },
      { key: 'notifications', icon: 'bell',      title: 'Notifications',       desc: 'Manage your alerts and reminders' },
      { key: 'privacy',       icon: 'lock',      title: 'Privacy & Security',  desc: 'Control your privacy settings' },
      { key: 'appearance',    icon: 'lightbulb', title: 'Appearance',          desc: 'Customize app appearance' },
      { key: 'language',      icon: 'globe',     title: 'Language',            desc: 'Choose your preferred language' },
      { key: 'export',        icon: 'download',  title: 'Data & Export',       desc: 'Download or export your data' },
      { key: 'delete',        icon: 'trash',     title: 'Delete Account',      desc: 'Permanently delete your account' },
    ];

    const avatarSrc = profilePhoto || null;
    const cardStyle = { backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #F0E4F7', boxShadow: '0 2px 10px rgba(144,35,240,0.05)', boxSizing: 'border-box' };

    return (
      <div style={{ width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FAF7FC' }} className="no-scrollbar">

        {/* Header banner */}
        <div style={{ background: themeColors.gradientBg, padding: '28px 40px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.3px' }}>My Profile</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>
              View and manage your profile information and account settings
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 40px 60px 40px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 300px 1fr', gap: '20px', alignItems: 'start' }}>

            {/* ── Left: Avatar summary card ── */}
            <div style={{ ...cardStyle, padding: '28px 22px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ position: 'relative', marginBottom: '14px' }}>
                  <div style={{
                    width: '92px', height: '92px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F3E8FF 0%, #FDEBF5 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                    fontSize: '30px', fontWeight: '800', color: themeColors.purple,
                    border: '3px solid #FFFFFF', boxShadow: '0 4px 14px rgba(144,35,240,0.15)'
                  }}>
                    {avatarSrc
                      ? <img src={avatarSrc} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : (currentUser.fullName?.charAt(0)?.toUpperCase() || '?')}
                  </div>
                  <label htmlFor="profile-photo-input-card" style={{ position: 'absolute', bottom: '2px', right: '2px', width: '26px', height: '26px', borderRadius: '50%', background: themeColors.gradientBg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                    <Icon name="pencil" size={11} color="#FFFFFF" />
                  </label>
                  <input id="profile-photo-input-card" type="file" accept="image/png,image/jpeg" onChange={handleProfilePhotoChange} style={{ display: 'none' }} />
                </div>
                <h3 style={{ margin: '2px 0 3px 0', fontSize: '16px', fontWeight: '800', color: '#1A1A1A' }}>{profileForm.fullName || 'Your Name'}</h3>
                <span style={{ fontSize: '12px', color: themeColors.purple, fontWeight: '600' }}>{profileForm.email}</span>
              </div>

              <div style={{ borderTop: '1px solid #F3EAFA', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { icon: 'calendar', label: 'Date of Birth', value: profileForm.dob || 'Not set' },
                  { icon: 'pin',      label: 'Location',      value: profileForm.location || 'Not set' },
                  { icon: 'profile',  label: 'Gender',        value: profileForm.gender },
                  { icon: 'droplet',  label: 'Cycle Length',  value: profileForm.cycleLength },
                  { icon: 'heart',    label: 'Health Goal',   value: profileForm.healthGoal },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '9px', backgroundColor: '#F8F1FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={row.icon} size={13} color={themeColors.purple} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '10.5px', color: '#A899AF', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{row.label}</div>
                      <div style={{ fontSize: '13px', color: '#2A2A2A', fontWeight: '700', marginTop: '1px' }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setProfileSection('info')}
                style={{ width: '100%', marginTop: '22px', background: themeColors.gradientBg, color: '#FFFFFF', border: 'none', borderRadius: '20px', padding: '11px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 3px 10px rgba(144,35,240,0.2)' }}
              >
                Edit Profile
              </button>
            </div>

            {/* ── Middle: Settings menu ── */}
            <div style={{ ...cardStyle, padding: '10px', display: 'flex', flexDirection: 'column', gap: '2px', height: 'fit-content' }}>
              {settingsMenu.map((item, idx) => {
                const active = profileSection === item.key;
                const isDanger = item.key === 'delete';
                return (
                  <div key={item.key}>
                    <div
                      onClick={() => setProfileSection(item.key)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '13px 14px', borderRadius: '12px', cursor: 'pointer',
                        backgroundColor: active ? '#FBEEFB' : 'transparent',
                        transition: 'background-color 0.15s',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#FBF7FD'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <div style={{ width: '30px', height: '30px', borderRadius: '9px', backgroundColor: isDanger ? '#FEF2F2' : (active ? '#F3E1F7' : '#F6F6F8'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon name={item.icon} size={14} color={isDanger ? '#DC2626' : (active ? themeColors.magenta : '#8B8B93')} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '12.5px', fontWeight: '700', color: isDanger ? '#DC2626' : (active ? themeColors.magenta : '#333333') }}>{item.title}</div>
                        <div style={{ fontSize: '11px', color: '#9C9CA5', marginTop: '1px', lineHeight: '1.3' }}>{item.desc}</div>
                      </div>
                    </div>
                    {idx < settingsMenu.length - 1 && <div style={{ height: '1px', backgroundColor: '#F5EFFA', margin: '2px 14px' }} />}
                  </div>
                );
              })}
            </div>

            {/* ── Right: Editable panel ── */}
            <div style={{ ...cardStyle, padding: '28px 32px', minHeight: '460px' }}>

              {profileSection === 'delete' ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="trash" size={15} color="#DC2626" />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#DC2626', margin: 0 }}>Delete Account</h3>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#888888', margin: '0 0 20px 0', lineHeight: '1.6' }}>
                    Deleting your account permanently removes your profile, booked counsellor sessions, and support requests. This action cannot be undone.
                  </p>
                  {confirmDeleteAccount ? (
                    <div style={styles.deleteConfirmRow}>
                      <p style={styles.deleteConfirmText}>Permanently delete your account?</p>
                      <div style={styles.deleteConfirmActions}>
                        <button style={styles.deleteConfirmYesBtn} onClick={handleDeleteAccount} disabled={deletingAccount}>
                          {deletingAccount ? 'Deleting…' : 'Yes, Delete'}
                        </button>
                        <button style={styles.deleteConfirmNoBtn} onClick={() => setConfirmDeleteAccount(false)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      style={{ backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '22px', padding: '11px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      onClick={() => setConfirmDeleteAccount(true)}
                    >
                      <Icon name="trash" size={13} color="#DC2626" /> Delete My Account
                    </button>
                  )}
                </div>
              ) : profileSection !== 'info' ? (
                <div style={{ textAlign: 'center', padding: '80px 10px', color: '#B9AFC4' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                    <Icon name={settingsMenu.find(m => m.key === profileSection)?.icon} size={30} color="#D9CCE6" />
                  </div>
                  <p style={{ fontSize: '13px', fontWeight: '600', margin: 0 }}>
                    {settingsMenu.find(m => m.key === profileSection)?.title} settings coming soon
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: themeColors.magenta, margin: '0 0 3px 0' }}>Profile Information</h3>
                  <p style={{ fontSize: '12px', color: '#999999', margin: '0 0 24px 0' }}>Update your personal details and how others see you.</p>

                  <form onSubmit={handleSaveProfile}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                      <div>
                        <label style={styles.inputLabel}>Full Name</label>
                        <input type="text" style={styles.inputField} value={profileForm.fullName} onChange={e => updateProfileField('fullName', e.target.value)} />
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Email Address</label>
                        <input type="email" style={styles.inputField} value={profileForm.email} onChange={e => { updateProfileField('email', e.target.value); setProfileNewEmail(e.target.value); }} />
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Date of Birth</label>
                        <input type="date" style={styles.inputField} value={profileForm.dob} onChange={e => updateProfileField('dob', e.target.value)} />
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Gender</label>
                        <select style={styles.inputField} value={profileForm.gender} onChange={e => updateProfileField('gender', e.target.value)}>
                          <option>Female</option>
                          <option>Male</option>
                          <option>Prefer not to say</option>
                        </select>
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Location</label>
                        <input type="text" placeholder="City, Country" style={styles.inputField} value={profileForm.location} onChange={e => updateProfileField('location', e.target.value)} />
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Health Goal</label>
                        <select style={styles.inputField} value={profileForm.healthGoal} onChange={e => updateProfileField('healthGoal', e.target.value)}>
                          <option>Better overall well-being</option>
                          <option>Track my cycle</option>
                          <option>Manage symptoms</option>
                          <option>Learn about my body</option>
                        </select>
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Cycle Length (Average)</label>
                        <select style={styles.inputField} value={profileForm.cycleLength} onChange={e => updateProfileField('cycleLength', e.target.value)}>
                          {['21 days','24 days','26 days','28 days','30 days','32 days','35 days'].map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Period Length (Average)</label>
                        <select style={styles.inputField} value={profileForm.periodLength} onChange={e => updateProfileField('periodLength', e.target.value)}>
                          {['3 days','4 days','5 days','6 days','7 days'].map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px', paddingTop: '18px', borderTop: '1px solid #F3EAFA' }}>
                      <label style={styles.inputLabel}>Profile Photo</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#F3E8FF', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: themeColors.purple, flexShrink: 0, border: '2px solid #FFFFFF', boxShadow: '0 2px 8px rgba(144,35,240,0.12)' }}>
                          {avatarSrc ? <img src={avatarSrc} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (profileForm.fullName?.charAt(0)?.toUpperCase() || '?')}
                        </div>
                        <div>
                          <div style={{ fontSize: '11.5px', color: '#999999', marginBottom: '6px' }}>JPG or PNG. Max size 2MB.</div>
                          <label htmlFor="profile-photo-input-form" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#F3E8FF', color: themeColors.purple, borderRadius: '16px', padding: '7px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                            <Icon name="download" size={12} color={themeColors.purple} /> Change Photo
                          </label>
                          <input id="profile-photo-input-form" type="file" accept="image/png,image/jpeg" onChange={handleProfilePhotoChange} style={{ display: 'none' }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" disabled={savingProfile} style={{ background: themeColors.gradientBg, color: '#FFFFFF', border: 'none', borderRadius: '22px', padding: '12px 28px', fontSize: '13.5px', fontWeight: '700', cursor: savingProfile ? 'default' : 'pointer', opacity: savingProfile ? 0.7 : 1, boxShadow: '0 3px 10px rgba(144,35,240,0.2)' }}>
                        {savingProfile ? 'Saving…' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // AI HEALTH BOT FEATURE RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderAIBotFeature = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden', boxSizing: 'border-box', backgroundColor: '#F0FDFA' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0, boxSizing: 'border-box' }}>
        <button onClick={() => setCurrentView('dashboard')} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFFFFF', flexShrink: 0 }}><Icon name="arrow-left" size={15} color="#FFFFFF" /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="sparkle" size={17} color="#FFFFFF" />
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>AI Health Bot</h2>
          </div>
          <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '600' }}>Always available · Always private</p>
        </div>
        <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#0D9488', backgroundColor: '#FFFFFF', padding: '5px 14px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}><Icon name="lock" size={11} color="#0D9488" /> Private</span>
      </div>

      <div style={{ padding: '16px 32px 0 32px', display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0, boxSizing: 'border-box' }}>
        {aiBotQuickQuestions.map(item => (
          <span key={item.q} onClick={() => handleAiBotSend(item.q)} style={{ fontSize: '12.5px', fontWeight: '700', color: '#0D9488', backgroundColor: '#FFFFFF', border: '1.5px solid #99F6E4', borderRadius: '18px', padding: '8px 16px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{item.q}</span>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }} className="no-scrollbar">
        {aiBotMessages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexDirection: msg.from === 'user' ? 'row-reverse' : 'row' }}>
            {msg.from === 'bot' && <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="sparkle" size={14} color="#FFFFFF" /></div>}
            <div style={{ maxWidth: '65%', backgroundColor: msg.from === 'user' ? '#0D9488' : '#FFFFFF', color: msg.from === 'user' ? '#FFFFFF' : '#333333', borderRadius: '16px', padding: '12px 16px', fontSize: '13.5px', lineHeight: '1.5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'justify' }}>{msg.text}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 32px', flexShrink: 0, backgroundColor: '#F0FDFA', borderTop: '1px solid #CCFBF1', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Ask your health question..." value={aiBotInput} onChange={e => setAiBotInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleAiBotSend(); }} style={{ flex: 1, padding: '12px 18px', borderRadius: '24px', border: '1.5px solid #99F6E4', backgroundColor: '#FFFFFF', fontSize: '13px', color: '#333333', outline: 'none', boxSizing: 'border-box' }} />
          <button onClick={() => handleAiBotSend()} style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#0D9488', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><Icon name="send" size={17} color="#FFFFFF" /></button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#0D9488', fontWeight: '600', margin: '10px 0 0 0' }}>Not a replacement for professional medical advice</p>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // LEARN SKILLS FEATURE RENDERER (backend-connected: list view + detail view)
  // ══════════════════════════════════════════════════════════════════════════
  const renderSkillsFeature = () => {

    // ── COURSE DETAIL VIEW ─────────────────────────────────────────────────
    if (skillsView === 'detail' && selectedCourse) {
      const c = selectedCourse;
      const points = (c.learningPoints && c.learningPoints.length) ? c.learningPoints : ['Course content coming soon'];
      const isEnrolled = (c.percentComplete || 0) > 0;
      const isCompleted = c.completed || c.percentComplete >= 100;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FFFBEB' }} className="no-scrollbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 32px', boxSizing: 'border-box' }}>
            <button onClick={() => { setSkillsView('list'); setSelectedCourse(null); }} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: c.color, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', flexShrink: 0 }}><Icon name="arrow-left" size={15} color={c.color} /></button>
            <h2 style={{ fontSize: '19px', fontWeight: '800', color: c.color, margin: 0 }}>{c.title}</h2>
          </div>

          <div style={{ padding: '0 32px 32px 32px', boxSizing: 'border-box' }}>
            <div style={{ borderRadius: '18px', backgroundColor: c.color, backgroundImage: 'radial-gradient(circle at top left, rgba(255,255,255,0.28), transparent 60%)', padding: '26px 24px', color: '#FFFFFF', marginBottom: '18px', boxSizing: 'border-box' }}>
              <div style={{ fontSize: '34px', marginBottom: '10px', lineHeight: 1 }}>{c.icon}</div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '21px', fontWeight: '800' }}>{c.title}</h3>
              <p style={{ margin: '0 0 14px 0', fontSize: '13px', opacity: 0.92, lineHeight: '1.5' }}>{c.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12.5px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.95 }}><Icon name="clock" size={14} color="#FFFFFF" /> {c.durationWeeks} weeks</span>
                <span style={{ fontSize: '12.5px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.95 }}><Icon name="play" size={13} color="#FFFFFF" /> {c.lessonsCount} lessons</span>
                <span style={{ fontSize: '12.5px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.95 }}><Icon name="badge" size={14} color="#FFFFFF" /> Certificate Included</span>
              </div>
            </div>

            {isEnrolled && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px 20px', marginBottom: '18px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#1A1A1A' }}>Your Progress</span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: c.color }}>{c.percentComplete}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#F0F0F0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.percentComplete}%`, height: '100%', backgroundColor: c.color, borderRadius: '5px', transition: 'width 0.3s' }} />
                </div>
              </div>
            )}

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', marginBottom: '20px', boxSizing: 'border-box' }}>
              <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', fontWeight: '800', color: '#1A1A1A' }}>What you will learn:</p>
              {points.map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < points.length - 1 ? '14px' : 0 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: c.color, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: '13.5px', color: '#444444', fontWeight: '500' }}>{pt}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleEnrollOrContinue(c)}
              disabled={isCompleted}
              style={{ width: '100%', backgroundColor: isCompleted ? '#16A34A' : c.color, color: '#FFFFFF', border: 'none', borderRadius: '22px', padding: '14px', fontSize: '14.5px', fontWeight: '800', cursor: isCompleted ? 'default' : 'pointer' }}
            >
              {isCompleted ? 'Course Completed ✓' : isEnrolled ? 'Continue' : 'Enroll for Free'}
            </button>
          </div>
        </div>
      );
    }

    // ── COURSE LIST VIEW ────────────────────────────────────────────────────
    const continueCourse = courses.find(c => c.percentComplete > 0 && c.percentComplete < 100);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FFFBEB' }} className="no-scrollbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 32px', boxSizing: 'border-box' }}>
          <button onClick={() => setCurrentView('dashboard')} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#D97706', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', flexShrink: 0 }}><Icon name="arrow-left" size={15} color="#D97706" /></button>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#D97706', margin: 0 }}>Learn Skills</h2>
            <p style={{ fontSize: '12.5px', color: '#B45309', margin: 0, fontWeight: '500' }}>Free courses · Earn certificates</p>
          </div>
        </div>

        <div style={{ padding: '0 32px', boxSizing: 'border-box' }}>
          {coursesLoading && (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#B45309', fontSize: '13px', fontWeight: '600' }}>Loading courses…</div>
          )}

          {!coursesLoading && continueCourse && (
            <div style={{ background: `linear-gradient(135deg, ${continueCourse.color} 0%, ${continueCourse.color}CC 100%)`, borderRadius: '18px', padding: '18px 22px', marginBottom: '20px', color: '#FFFFFF', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '14px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', opacity: 0.9 }}>Continue learning</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '800' }}>{continueCourse.title}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', opacity: 0.9 }}>{continueCourse.percentComplete}% complete</p>
                </div>
                <button onClick={() => handleOpenCourse(continueCourse)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: '20px', padding: '9px 20px', color: '#FFFFFF', fontWeight: '700', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Continue →</button>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${continueCourse.percentComplete}%`, height: '100%', backgroundColor: '#FFFFFF', borderRadius: '4px' }} />
              </div>
            </div>
          )}

          {!coursesLoading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
              {courses.map(course => (
                <div key={course.id} onClick={() => handleOpenCourse(course)} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '18px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', cursor: 'pointer', boxSizing: 'border-box' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '13px', backgroundColor: `${course.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>{course.icon}</div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14.5px', fontWeight: '800', color: '#1A1A1A' }}>{course.title}</h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#888888', lineHeight: '1.4' }}>{course.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#999999', display: 'flex', alignItems: 'center', gap: '5px' }}><Icon name="clock" size={12} color="#999999" /> {course.durationWeeks} weeks</span>
                    <Icon name="badge" size={15} color={course.color} />
                  </div>
                  {course.percentComplete > 0 && (
                    <div style={{ height: '5px', backgroundColor: '#F0F0F0', borderRadius: '4px', overflow: 'hidden', marginTop: '10px' }}>
                      <div style={{ width: `${course.percentComplete}%`, height: '100%', backgroundColor: course.color, borderRadius: '4px' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!coursesLoading && courses.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#B45309' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}><Icon name="cap" size={30} color="#B45309" /></div>
              <p style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>No courses available yet</p>
              <p style={{ fontSize: '12.5px', marginTop: '6px' }}>Check back soon for new skills courses.</p>
            </div>
          )}

          <div style={{ backgroundColor: '#FEF3C7', borderRadius: '16px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Icon name="badge" size={20} color="#D97706" />
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#92400E' }}>Earn a Certificate</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#92400E', fontWeight: '500' }}>Complete any course to earn a recognised skills certificate you can use for jobs.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK HEALTH FEATURE RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderTrackHealthFeature = () => {
    const weekDays = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    const juneStartOffset = 1; // June 1, 2026 falls on a Monday
    const juneCalendarCells = [...Array(juneStartOffset).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)];
    const getDayStyle = (day) => {
      if (day === null) return { background: 'transparent' };
      if (day >= 1 && day <= 5) return { background: '#E61B9B', color: '#FFFFFF', fontWeight: '800' };
      if (day === 6) return { background: '#FBD5EC', color: '#C0288E', fontWeight: '700' };
      if (day === 12 || day === 13) return { background: '#DDD6FE', color: '#6D28D9', fontWeight: '700' };
      return { background: '#FAFAFA', color: '#444444', fontWeight: '600' };
    };
    const symptomsList = ['Cramps', 'Headache', 'Bloating', 'Mood swings', 'Fatigue', 'Backache', 'Acne', 'Tender breasts'];
    const toggleSymptom = (s) => setLoggedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FFF5FA' }} className="no-scrollbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 32px', boxSizing: 'border-box' }}>
          <button onClick={() => setCurrentView('dashboard')} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#DB2777', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', flexShrink: 0 }}><Icon name="arrow-left" size={15} color="#DB2777" /></button>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#DB2777', margin: 0 }}>Track Health</h2>
            <p style={{ fontSize: '12.5px', color: '#C0288E', margin: 0, fontWeight: '500' }}>Cycle & symptom tracker</p>
          </div>
          <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#DB2777', backgroundColor: '#FCE7F3', padding: '5px 14px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}><Icon name="lock" size={11} color="#DB2777" /> Private</span>
        </div>

        <div style={{ padding: '0 32px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', marginBottom: '18px', overflow: 'hidden' }}>
            {[{ label: 'Cycle Day', value: '17' }, { label: 'Next Period', value: '12 days' }, { label: 'Avg Cycle', value: '28d' }].map((s, i) => (
              <div key={s.label} style={{ flex: 1, padding: '16px', textAlign: 'center', borderRight: i < 2 ? '1px solid #F5E6F0' : 'none' }}>
                <p style={{ margin: 0, fontSize: '11.5px', color: '#999999', fontWeight: '600' }}>{s.label}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '22px', color: '#DB2777', fontWeight: '800' }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '5px', marginBottom: '18px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
            {[{ key: 'calendar', label: 'Calendar' }, { key: 'symptoms', label: 'Symptoms' }, { key: 'insights', label: 'Insights' }].map(tab => (
              <div key={tab.key} onClick={() => setTrackHealthTab(tab.key)} style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: '16px', cursor: 'pointer', fontSize: '13.5px', fontWeight: '700', backgroundColor: trackHealthTab === tab.key ? '#DB2777' : 'transparent', color: trackHealthTab === tab.key ? '#FFFFFF' : '#888888' }}>{tab.label}</div>
            ))}
          </div>

          {trackHealthTab === 'calendar' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '20px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', marginBottom: '24px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ cursor: 'pointer', color: '#DB2777', display: 'flex' }}><Icon name="arrow-left" size={15} color="#DB2777" /></span>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1A1A1A' }}>June 2026</h3>
                <span style={{ cursor: 'pointer', color: '#DB2777', transform: 'rotate(180deg)', display: 'flex' }}><Icon name="arrow-left" size={15} color="#DB2777" /></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '8px' }}>
                {weekDays.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '11.5px', fontWeight: '700', color: '#DB2777' }}>{d}</div>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {juneCalendarCells.map((day, i) => (
                  <div key={i} style={{ aspectRatio: '1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', ...getDayStyle(day) }}>{day || ''}</div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '18px', marginTop: '18px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', color: '#888888', display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E61B9B', display: 'inline-block' }} /> Period</span>
                <span style={{ fontSize: '11.5px', color: '#888888', display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#DDD6FE', display: 'inline-block' }} /> Fertile window</span>
              </div>
            </div>
          )}

          {trackHealthTab === 'symptoms' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '20px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', marginBottom: '24px', boxSizing: 'border-box' }}>
              <p style={{ margin: '0 0 14px 0', fontSize: '13.5px', fontWeight: '800', color: '#1A1A1A' }}>How are you feeling today?</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {symptomsList.map(s => (
                  <span key={s} onClick={() => toggleSymptom(s)} style={{ fontSize: '12.5px', fontWeight: '700', padding: '9px 16px', borderRadius: '18px', cursor: 'pointer', backgroundColor: loggedSymptoms.includes(s) ? '#DB2777' : '#FDF2F8', color: loggedSymptoms.includes(s) ? '#FFFFFF' : '#DB2777', border: `1.5px solid ${loggedSymptoms.includes(s) ? '#DB2777' : '#FBCFE8'}` }}>{s}</span>
                ))}
              </div>
              <button onClick={() => showToast(loggedSymptoms.length ? 'Symptoms logged for today.' : 'Select at least one symptom to log.', loggedSymptoms.length ? 'success' : 'error')} style={{ width: '100%', marginTop: '18px', backgroundColor: '#DB2777', color: '#FFFFFF', border: 'none', borderRadius: '22px', padding: '12px', fontSize: '13.5px', fontWeight: '800', cursor: 'pointer' }}>Save Today's Log</button>
            </div>
          )}

          {trackHealthTab === 'insights' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '20px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', marginBottom: '24px', boxSizing: 'border-box' }}>
              <p style={{ margin: '0 0 14px 0', fontSize: '13.5px', fontWeight: '800', color: '#1A1A1A' }}>Your cycle insights</p>
              {[{ label: 'Cycle length has stayed consistent for 3 months', color: '#16A34A' }, { label: 'Cramps were logged most on Day 1–2', color: '#DB2777' }, { label: 'Mood dips are common 2 days before your period', color: '#9333EA' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F5F5F5' : 'none' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#444444', fontWeight: '500' }}>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // EMERGENCY HELP FEATURE RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderEmergencyFeature = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FFF5F5' }} className="no-scrollbar">
      <div style={{ background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0, boxSizing: 'border-box' }}>
        <button onClick={() => setCurrentView('dashboard')} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.22)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFFFFF', flexShrink: 0 }}><Icon name="arrow-left" size={15} color="#FFFFFF" /></button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="alert" size={18} color="#FFFFFF" />
            <h2 style={{ margin: 0, fontSize: '19px', fontWeight: '800', color: '#FFFFFF' }}>Emergency Help</h2>
          </div>
          <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>You are not alone. Help is here.</p>
        </div>
      </div>

      <div style={{ padding: '20px 32px', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '14px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <Icon name="alert" size={16} color="#DC2626" />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#991B1B' }}>In a life-threatening emergency, always call 999 or 112 first.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
          <a href="tel:999" style={{ textDecoration: 'none', backgroundColor: '#DC2626', borderRadius: '16px', padding: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', boxSizing: 'border-box' }}>
            <Icon name="phone" size={20} color="#FFFFFF" />
            <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#FFFFFF' }}>Call Now</span>
            <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.85)', fontWeight: '600' }}>999/112</span>
          </a>
          <div onClick={() => showToast('Finding clinics near you…', 'info')} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', boxSizing: 'border-box' }}>
            <Icon name="pin" size={20} color="#DC2626" />
            <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#1A1A1A' }}>Find Nearest Clinic</span>
          </div>
          <div onClick={() => { openCounsellorHub(); setCurrentView('counsellor'); handleChatNow(counsellors[1]); }} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', boxSizing: 'border-box' }}>
            <Icon name="chat" size={20} color="#DC2626" />
            <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#1A1A1A' }}>Crisis Chat</span>
          </div>
        </div>

        <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 12px 0' }}>Emergency Contacts</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {emergencyContacts.map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px 18px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', boxSizing: 'border-box' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={c.icon} size={17} color={c.color} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#1A1A1A' }}>{c.name}</p>
                <p style={{ margin: '1px 0 0 0', fontSize: '15px', fontWeight: '800', color: c.color }}>{c.number}</p>
                <p style={{ margin: '1px 0 0 0', fontSize: '11.5px', color: '#999999', fontWeight: '600' }}>{c.hours}</p>
              </div>
              <a href={`tel:${c.number.replace(/[^\d]/g, '')}`} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, textDecoration: 'none', flexShrink: 0 }}><Icon name="phone" size={16} color={c.color} /></a>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#DC2626', margin: '0 0 12px 0' }}>What To Do In A Crisis</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {crisisTopics.map(topic => (
            <div key={topic.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
              <div onClick={() => setOpenCrisisTopic(openCrisisTopic === topic.id ? null : topic.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', cursor: 'pointer' }}>
                <Icon name={topic.icon} size={16} color="#DC2626" />
                <span style={{ flex: 1, fontSize: '13.5px', fontWeight: '700', color: '#1A1A1A' }}>{topic.label}</span>
                <span style={{ display: 'flex', transform: openCrisisTopic === topic.id ? 'rotate(90deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}><Icon name="arrow-left" size={13} color="#999999" /></span>
              </div>
              {openCrisisTopic === topic.id && (
                <div style={{ padding: '0 18px 16px 18px' }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#555555', lineHeight: '1.55', textAlign: 'justify' }}>{topic.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // EXPLORE TOPICS FEATURE RENDERER
  // ══════════════════════════════════════════════════════════════════════════
  const renderTopicsFeature = () => {
    if (selectedTopic) {
      const t = selectedTopic;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FAF5FF' }} className="no-scrollbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 32px', boxSizing: 'border-box' }}>
            <button onClick={() => setSelectedTopic(null)} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: themeColors.purple, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', flexShrink: 0 }}><Icon name="arrow-left" size={15} color={themeColors.purple} /></button>
            <h2 style={{ fontSize: '19px', fontWeight: '800', color: themeColors.purple, margin: 0 }}>{t.label}</h2>
          </div>
          <div style={{ padding: '0 32px 32px 32px', boxSizing: 'border-box' }}>
            <div style={{ borderRadius: '18px', background: t.gradient, padding: '28px 24px', color: '#FFFFFF', marginBottom: '18px' }}>
              <Icon name={t.icon} size={28} color="#FFFFFF" />
              <h3 style={{ margin: '10px 0 4px 0', fontSize: '19px', fontWeight: '800' }}>{t.label}</h3>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>{t.subtitle}</p>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#444444', lineHeight: '1.65', textAlign: 'justify' }}>{t.body}</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#FAF5FF' }} className="no-scrollbar">
        <div style={{ padding: '20px 32px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setCurrentView('dashboard')} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: themeColors.purple, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', flexShrink: 0 }}><Icon name="arrow-left" size={15} color={themeColors.purple} /></button>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: themeColors.purple, margin: 0 }}>Explore Topics</h2>
            <p style={{ fontSize: '12.5px', color: '#A56BC4', margin: 0, fontWeight: '500' }}>Learn · Grow · Be informed</p>
          </div>
        </div>
        <div style={{ padding: '0 32px 32px 32px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px', boxSizing: 'border-box' }}>
          {exploreTopics.map(t => (
            <div key={t.id} onClick={() => setSelectedTopic(t)} style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
              <div style={{ background: t.gradient, padding: '22px 20px', position: 'relative', minHeight: '70px', display: 'flex', alignItems: 'flex-start', boxSizing: 'border-box' }}>
                <Icon name={t.icon} size={24} color="#FFFFFF" />
                <span style={{ position: 'absolute', top: '14px', right: '16px', fontSize: '11px', fontWeight: '700', color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.25)', padding: '3px 10px', borderRadius: '10px' }}>{t.time}</span>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '14.5px', fontWeight: '800', color: '#1A1A1A' }}>{t.label}</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#888888', fontWeight: '500' }}>{t.subtitle}</p>
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: themeColors.purple, display: 'flex', alignItems: 'center', gap: '5px' }}><Icon name="book" size={12} color={themeColors.purple} /> {t.articles} articles</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ══════════════════════════════════════════════════════════════════════════
  const mainColumnContent = (
    <>
      <header style={styles.navbar}>
        <div style={styles.navBrandGroup}>
          {currentUser ? (
            <nav>
              <span style={styles.navLinkItem} onClick={() => setCurrentView('dashboard')}>Home</span>
              <span style={styles.navLinkItem} onClick={() => setCurrentView('about')}>About</span>
            </nav>
          ) : (
            <>
              <BrandLogo onClick={() => setCurrentView('landing')} />
              <nav>
                <span style={styles.navLinkItem} onClick={() => setCurrentView('landing')}>Home</span>
                <span style={styles.navLinkItem} onClick={() => setCurrentView('about')}>About</span>
              </nav>
            </>
          )}
        </div>
        <div style={styles.navAuthButtons}>
          {currentUser ? (
            <>
              <span style={styles.userProfileTag}>Hi, {currentUser.fullName || 'User'}</span>
              <button style={styles.navLoginBtn} onClick={openProfile}>My Profile</button>
              <button style={styles.navLoginBtn} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button style={styles.navLoginBtn} onClick={() => setCurrentView('signin')}>Sign In</button>
              <button style={styles.navRegisterBtn} onClick={() => setCurrentView('signup')}>Sign Up</button>
            </>
          )}
        </div>
      </header>

      <div style={styles.contentBody}>

        {/* LANDING */}
        {currentView === 'landing' && (
          <div style={styles.landingMainContainer}>
            <section style={styles.landingHeroSection}>
              <div style={styles.landingHeroLeft}>
                <div style={styles.landingHeroTag}>Free · Private · For Girls in Uganda</div>
                <h1 style={styles.landingHeroTitle}>You deserve answers,<br/>support, and someone<br/>in your corner.</h1>
                <p style={styles.landingHeroDesc}>Big Sister is a safe, free platform for teenage girls in Uganda. Get confidential health information, connect with a counsellor, access sanitary pads and school support — all in one private place.</p>
                {!currentUser && (
                  <div style={styles.landingHeroBtnGroup}>
                    <button style={styles.navRegisterBtn} onClick={() => setCurrentView('signup')}>Join for Free</button>
                    <button style={styles.navLoginBtn} onClick={() => setCurrentView('signin')}>Sign In</button>
                  </div>
                )}
              </div>
            </section>
            <section style={styles.landingGridSection}>
              <div style={styles.landingInfoCard}>
                <div style={styles.landingCardIcon}><Icon name="shield" size={22} color={themeColors.purple} /></div>
                <h4 style={styles.landingCardTitle}>Your Privacy, Always!</h4>
                <p style={styles.landingCardDesc}>Everything you do here stays between you and Big Sister. No names shared, no data sold — ever.</p>
              </div>
              <div style={styles.landingInfoCard}>
                <div style={styles.landingCardIcon}><Icon name="handshake" size={22} color={themeColors.purple} /></div>
                <h4 style={styles.landingCardTitle}>Real Support, Not Just Advice</h4>
                <p style={styles.landingCardDesc}>Request sanitary pads, school fees help, meals, and mental health support from partners who actually provide them.</p>
              </div>
              <div style={styles.landingInfoCard}>
                <div style={styles.landingCardIcon}><Icon name="stethoscope" size={22} color={themeColors.purple} /></div>
                <h4 style={styles.landingCardTitle}>Talk to Someone Who Understands It</h4>
                <p style={styles.landingCardDesc}>Book a private session with a counsellor who understands the pressures girls in Uganda face every day.</p>
              </div>
            </section>
          </div>
        )}

        {/* SIGN IN */}
        {currentView === 'signin' && (
          <div style={styles.authCardWrapper}>
            <div style={styles.authMainCard}>
              <h2 style={styles.authCardTitle}>Welcome back</h2>
              <button type="button" onClick={() => setShowGooglePopup(true)} style={{ width: '100%', padding: '9px', backgroundColor: '#FFFFFF', border: '1.5px solid #EAEAEA', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#444444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginBottom: '10px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.65-5.17 3.65-8.58z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.38-2.31V6.54H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.46l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"/></svg>
                Continue with Google
              </button>
              <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', color: '#D0D0D0', fontSize: '11px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#EAEAEA' }}></div>
                <span style={{ padding: '0 8px' }}>or</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#EAEAEA' }}></div>
              </div>
              <form onSubmit={handleSignInSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Email</label>
                  <input type="email" placeholder="you@example.com" style={styles.inputField} value={authEmail} onChange={e => setAuthEmail(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Password</label>
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" style={styles.inputField} value={authPassword} onChange={e => setAuthPassword(e.target.value)} required />
                  <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', bottom: '9px', cursor: 'pointer', color: '#888888', display: 'flex', alignItems: 'center' }}><Icon name={showPassword ? 'shield' : 'lock'} size={14} color="#888888" /></span>
                </div>
                <button type="submit" style={styles.authSubmitBtn}>Sign In</button>
              </form>
              <div style={{ fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ color: themeColors.purple, fontWeight: '600', cursor: 'pointer' }} onClick={() => setCurrentView('forgot')}>Forgot password?</span>
                <div style={{ color: '#555555' }}>No account? <span style={{ color: themeColors.purple, fontWeight: '700', cursor: 'pointer' }} onClick={() => setCurrentView('signup')}>Join for free</span></div>
              </div>
              <div style={styles.privacyFooterText}><Icon name="lock" size={12} color="#8A8A8A" /> Your data is kept private and secure</div>
            </div>
          </div>
        )}

        {/* SIGN UP */}
        {currentView === 'signup' && (
          <div style={styles.authCardWrapper}>
            <div style={styles.authMainCard}>
              <h2 style={styles.authCardTitle}>Create your account</h2>
              <form onSubmit={handleSignUpSubmit}>
                <div style={styles.inputGroup}><label style={styles.inputLabel}>Full Name</label><input type="text" placeholder="Enter your full name" style={styles.inputField} value={regFullName} onChange={e => setRegFullName(e.target.value)} required /></div>
                <div style={styles.inputGroup}><label style={styles.inputLabel}>Email</label><input type="email" placeholder="you@example.com" style={styles.inputField} value={regEmail} onChange={e => setRegEmail(e.target.value)} required /></div>
                <div style={styles.inputGroup}><label style={styles.inputLabel}>Password</label><input type="password" placeholder="Create a strong password" style={styles.inputField} value={regPassword} onChange={e => setRegPassword(e.target.value)} required /></div>
                <div style={styles.inputGroup}><label style={styles.inputLabel}>Confirm Password</label><input type="password" placeholder="Confirm your password" style={styles.inputField} value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} required /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left', margin: '10px 0 8px 2px' }}>
                  <input type="checkbox" id="terms" checked={agreeToTerms} onChange={e => setAgreeToTerms(e.target.checked)} style={{ cursor: 'pointer', width: '14px', height: '14px', accentColor: themeColors.purple }} />
                  <label htmlFor="terms" style={{ fontSize: '11.5px', color: '#555555', cursor: 'pointer', userSelect: 'none' }}>
                    I accept the{' '}
                    <span
                      style={{ color: themeColors.purple, fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={(e) => { e.preventDefault(); setCurrentView('terms'); }}
                    >
                      Terms & Conditions
                    </span>
                  </label>
                </div>
                <button type="submit" style={styles.authSubmitBtn}>Create Account</button>
              </form>
              <div style={{ fontSize: '12.5px', color: '#555555', marginTop: '8px' }}>Already have an account? <span style={{ color: themeColors.purple, fontWeight: '700', cursor: 'pointer' }} onClick={() => setCurrentView('signin')}>Sign in</span></div>
              <div style={styles.privacyFooterText}><Icon name="lock" size={12} color="#8A8A8A" /> Your data is kept private and secure</div>
            </div>
          </div>
        )}

        {/* TERMS & CONDITIONS */}
        {currentView === 'terms' && <TermsView onBack={() => setCurrentView('signup')} />}

        {/* FORGOT PASSWORD */}
        {currentView === 'forgot' && (
          <div style={styles.authCardWrapper}>
            <div style={styles.authMainCard}>
              <h2 style={styles.authCardTitle}>Reset your password</h2>
              <p style={{ fontSize: '12.5px', color: '#666666', margin: '0 0 16px 0', lineHeight: '1.4', textAlign: 'justify' }}>Enter your email address and we'll send you a link to reset your password.</p>
              <form onSubmit={e => { e.preventDefault(); showToast('Reset link sent — check your inbox.', 'success'); }}>
                <div style={styles.inputGroup}><label style={styles.inputLabel}>Email Address</label><input type="email" placeholder="you@example.com" style={styles.inputField} required /></div>
                <button type="submit" style={styles.authSubmitBtn}>Send Reset Link</button>
              </form>
              <div style={{ fontSize: '12.5px', color: '#555555' }}>Remembered it? <span style={{ color: themeColors.purple, fontWeight: '700', cursor: 'pointer' }} onClick={() => setCurrentView('signin')}>Sign in</span></div>
              <div style={styles.privacyFooterText}><Icon name="lock" size={12} color="#8A8A8A" /> Your data is kept private and secure</div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {currentView === 'about' && (
          <div style={styles.authCardWrapper}>
            <div style={{ ...styles.authMainCard, maxWidth: '480px', textAlign: 'left' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: themeColors.purple, margin: '0 0 12px 0' }}>About Big Sister</h2>
              <h4 style={{ color: '#1A1A1A', margin: '8px 0 2px 0', fontSize: '14px' }}>The Platform</h4>
              <p style={{ color: '#555555', fontSize: '12.5px', lineHeight: '1.4', margin: '0 0 8px 0', textAlign: 'justify' }}>Big Sister is a free, private platform that gives teenage girls in Uganda access to reproductive health information, professional counselling, and tangible support like sanitary pads, school fees, and food assistance.</p>
              <h4 style={{ color: '#1A1A1A', margin: '8px 0 2px 0', fontSize: '14px' }}>Our Core Mission</h4>
              <p style={{ color: '#555555', fontSize: '12.5px', lineHeight: '1.4', margin: '0 0 8px 0', textAlign: 'justify' }}>To reduce teenage pregnancy rates in Uganda by giving every girl easy, private access to health education, counselling, and the economic support she needs to stay in school and make safe decisions.</p>
              <h4 style={{ color: '#1A1A1A', margin: '8px 0 2px 0', fontSize: '14px' }}>Development Team</h4>
              <p style={{ color: '#555555', fontSize: '12.5px', lineHeight: '1.4', margin: '0 0 12px 0', textAlign: 'justify' }}>Built by Computing students at Uganda Christian University, reviewed by Mr. Kisomose Tony.</p>
              <div style={{ borderTop: '1px solid #EAEAEA', paddingTop: '10px', marginTop: '12px', fontSize: '12.5px' }}>
                <a
                  href="mailto:info@bigsister.ucu.ac.ug"
                  style={{ color: themeColors.purple, fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Icon name="mail" size={14} color={themeColors.purple} /> info@bigsister.ucu.ac.ug
                </a>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {currentView === 'dashboard' && (
          <div style={styles.dashboardWrapper} className="no-scrollbar">
            <div style={styles.dashboardWelcomeBar}>
              <div style={styles.dashboardWelcomeText}>Welcome back, {currentUser?.fullName?.split(' ')[0] || 'there'}</div>
            </div>
            <div style={styles.dashboardMainView}>
              <div style={styles.tipOfTheDayCard}>
                <Icon name="lightbulb" size={20} color="#FFFFFF" />
                <div>
                  <div style={styles.tipTitle}>Health Tip of the Day</div>
                  <p style={styles.tipBody}>{language === 'English' ? "Stay hydrated! Drinking enough water helps regulate your menstrual cycle and reduces cramps." : "Nywa amazzi agamala! Okunywa amazzi amangi kukuuyamba okutereeza n'okukendeeza obulumi bw'omukyala."}</p>
                </div>
              </div>

              {/* ── Dashboard feature cards — now fully admin-editable ── */}
              <div style={styles.featuresGridContainer}>
                {dashboardCards.map(card => (
                  <div
                    key={card.id}
                    style={{ ...styles.featureCard, backgroundColor: card.bgColor }}
                    onClick={() => navigateToDashboardCard(card)}
                  >
                    <span style={styles.featureIcon}><Icon name={card.icon} size={20} color={card.textColor} /></span>
                    <h3 style={{ ...styles.featureTitle, color: card.textColor }}>{card.title}</h3>
                    <p style={{ ...styles.featureDesc, color: card.descColor }}>{card.description}</p>
                  </div>
                ))}
              </div>

              <div style={styles.quickAccessSection}>
                <h3 style={styles.quickAccessTitle}>Quick Access</h3>
                <div style={styles.quickAccessRow}>
                  {[
                    { icon: 'badge', label: 'My Certificates', bg: '#FEF3C7', color: '#D97706', onClick: () => { openSkillsHub(); setCurrentView('skills'); } }
                  ].map(item => (
                    <div
                      key={item.label}
                      style={styles.quickAccessPill}
                      onClick={item.onClick}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.07)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.02)'; }}
                    >
                      <div style={styles.quickAccessIconWrap(item.bg)}><Icon name={item.icon} size={15} color={item.color} /></div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COUNSELLOR */}
        {currentView === 'counsellor' && renderCounsellorFeature()}

        {/* GET SUPPORT */}
        {currentView === 'support' && renderSupportFeature()}

        {/* MY PROFILE */}
        {currentView === 'profile' && renderProfileFeature()}

        {/* AI HEALTH BOT */}
        {currentView === 'aibot' && renderAIBotFeature()}

        {/* LEARN SKILLS */}
        {currentView === 'skills' && renderSkillsFeature()}

        {/* TRACK HEALTH */}
        {currentView === 'track' && renderTrackHealthFeature()}

        {/* EMERGENCY HELP */}
        {currentView === 'emergency' && renderEmergencyFeature()}

        {/* EXPLORE TOPICS */}
        {currentView === 'topics' && renderTopicsFeature()}
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          showLoader={toast.showLoader}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}

      {/* Conditional Routing: Admin vs Public/User */}
      {currentView === 'admin' ? (
        <AdminDashboard 
          currentAdminView={currentAdminView} 
          setCurrentAdminView={setCurrentAdminView} 
          onLogout={handleLogout}
          token={authToken}
          backendUrl={BACKEND_URL}
          showToast={showToast}
        />
      ) : (
        <div style={styles.appShell}>
          {currentUser && renderSidebar()}
          <div style={styles.mainColumn}>
            {mainColumnContent}
          </div>
        </div>
      )}

      
    </div>
  );
}