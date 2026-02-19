import { useState, useEffect } from "react";

// ── PALETA GTA ──────────────────────────────────────────────
const C = {
  orange: "#f7921d",
  blue:   "#00aeef",
  yellow: "#facd01",
  green:  "#60bb46",
  dark:   "#0d1117",
  darker: "#080c10",
  card:   "#111820",
  border: "#1e2c3a",
  text:   "#e8f4fd",
  muted:  "#6b8fa8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;900&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${C.darker};
    color: ${C.text};
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.dark}; }
  ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 3px; }

  .login-bg {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${C.darker};
    position: relative;
    overflow: hidden;
  }

  .login-bg::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, ${C.blue}18 0%, transparent 70%);
    top: -150px; left: -150px;
    border-radius: 50%;
    pointer-events: none;
  }

  .login-bg::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, ${C.orange}14 0%, transparent 70%);
    bottom: -100px; right: -100px;
    border-radius: 50%;
    pointer-events: none;
  }

  .login-card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 48px 40px;
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 60px rgba(0,174,239,0.08), 0 24px 48px rgba(0,0,0,0.5);
    animation: fadeUp 0.5s ease;
  }

  @keyframes fadeUp {
    from { opacity:0; transform: translateY(24px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .brand-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
    justify-content: center;
  }

  .brand-logo {
    width: 48px; height: 48px;
    border-radius: 10px;
    background: linear-gradient(135deg, ${C.orange}, ${C.yellow});
    display: flex; align-items: center; justify-content: center;
    font-family: 'Exo 2', sans-serif;
    font-weight: 900;
    font-size: 20px;
    color: #fff;
    letter-spacing: -1px;
    overflow: hidden;
  }

  .brand-logo img {
    width: 100%; height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .brand-name {
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: ${C.text};
  }

  .brand-name span { color: ${C.blue}; }

  .login-title {
    font-family: 'Exo 2', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: ${C.muted};
    text-align: center;
    margin-bottom: 32px;
    letter-spacing: 0.5px;
  }

  .field { margin-bottom: 18px; }
  .field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: ${C.muted};
    margin-bottom: 8px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .field input {
    width: 100%;
    background: ${C.darker};
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 13px 16px;
    color: ${C.text};
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field input:focus {
    border-color: ${C.blue};
    box-shadow: 0 0 0 3px ${C.blue}22;
  }

  .btn-primary {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, ${C.blue}, #0088cc);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.5px;
    cursor: pointer;
    margin-top: 8px;
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px ${C.blue}44;
  }

  .btn-primary:active { transform: translateY(0); }

  .error-msg {
    background: #ff4d4d18;
    border: 1px solid #ff4d4d44;
    border-radius: 8px;
    padding: 10px 14px;
    color: #ff7070;
    font-size: 13px;
    margin-bottom: 16px;
    text-align: center;
  }

  /* ── APP SHELL ─────────────────────────────── */
  .app { display: flex; min-height: 100vh; }

  .sidebar {
    width: 240px;
    min-width: 240px;
    background: ${C.card};
    border-right: 1px solid ${C.border};
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
    transition: transform 0.3s;
  }

  .sidebar-brand {
    padding: 24px 20px;
    border-bottom: 1px solid ${C.border};
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sidebar-logo {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, ${C.orange}, ${C.yellow});
    display: flex; align-items: center; justify-content: center;
    font-family: 'Exo 2', sans-serif;
    font-weight: 900;
    font-size: 14px;
    color: #fff;
    overflow: hidden;
    flex-shrink: 0;
  }

  .sidebar-logo img {
    width: 100%; height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .sidebar-title {
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 16px;
  }

  .sidebar-title span { color: ${C.blue}; }

  .nav-section {
    padding: 16px 12px 8px;
  }

  .nav-label {
    font-size: 10px;
    font-weight: 600;
    color: ${C.muted};
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 0 8px;
    margin-bottom: 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    font-size: 14px;
    color: ${C.muted};
    margin-bottom: 2px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover { background: ${C.border}; color: ${C.text}; }

  .nav-item.active {
    background: ${C.blue}20;
    color: ${C.blue};
    font-weight: 500;
  }

  .nav-item.active .nav-icon { color: ${C.blue}; }

  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .nav-badge {
    margin-left: auto;
    background: ${C.orange};
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 10px;
  }

  .sidebar-footer {
    margin-top: auto;
    padding: 16px 12px;
    border-top: 1px solid ${C.border};
  }

  .user-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    background: ${C.border};
  }

  .user-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700;
    font-size: 13px;
    color: #fff;
    flex-shrink: 0;
  }

  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-role { font-size: 11px; color: ${C.muted}; }

  .logout-btn {
    background: none;
    border: none;
    color: ${C.muted};
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.15s;
  }
  .logout-btn:hover { color: #ff6b6b; }

  /* ── MAIN CONTENT ─────────────────────────── */
  .main {
    margin-left: 240px;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .topbar {
    background: ${C.card};
    border-bottom: 1px solid ${C.border};
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .topbar-title {
    font-family: 'Exo 2', sans-serif;
    font-size: 20px;
    font-weight: 700;
  }

  .topbar-actions { display: flex; gap: 10px; align-items: center; }

  .btn-sm {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    font-family: 'Exo 2', sans-serif;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .btn-blue { background: ${C.blue}; color: #fff; }
  .btn-blue:hover { background: #0099d4; box-shadow: 0 4px 12px ${C.blue}44; }

  .btn-orange { background: ${C.orange}; color: #fff; }
  .btn-orange:hover { background: #e07f10; }

  .btn-green { background: ${C.green}; color: #fff; }
  .btn-green:hover { background: #50a83a; }

  .btn-ghost {
    background: ${C.border};
    color: ${C.text};
    border: 1px solid ${C.border};
  }
  .btn-ghost:hover { background: #2a3d50; }

  .btn-danger { background: #ff4d4d22; color: #ff7070; border: 1px solid #ff4d4d44; }
  .btn-danger:hover { background: #ff4d4d33; }

  .content { padding: 32px; flex: 1; }

  /* ── DASHBOARD ─────────────────────────────── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 14px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }

  .stat-card.blue::before { background: ${C.blue}; }
  .stat-card.orange::before { background: ${C.orange}; }
  .stat-card.green::before { background: ${C.green}; }
  .stat-card.yellow::before { background: ${C.yellow}; }

  .stat-value {
    font-family: 'Exo 2', sans-serif;
    font-size: 36px;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label { font-size: 13px; color: ${C.muted}; }

  .stat-icon {
    position: absolute;
    top: 20px; right: 20px;
    font-size: 28px;
    opacity: 0.15;
  }

  /* ── USERS TABLE ──────────────────────────── */
  .table-card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 14px;
    overflow: hidden;
  }

  .table-header {
    padding: 20px 24px;
    border-bottom: 1px solid ${C.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .table-title {
    font-family: 'Exo 2', sans-serif;
    font-size: 16px;
    font-weight: 700;
  }

  .search-input {
    background: ${C.darker};
    border: 1px solid ${C.border};
    border-radius: 8px;
    padding: 8px 14px;
    color: ${C.text};
    font-size: 13px;
    outline: none;
    width: 220px;
    transition: border-color 0.2s;
  }

  .search-input:focus { border-color: ${C.blue}; }

  table { width: 100%; border-collapse: collapse; }

  th {
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: ${C.muted};
    letter-spacing: 0.8px;
    text-transform: uppercase;
    border-bottom: 1px solid ${C.border};
    background: ${C.darker}88;
  }

  td {
    padding: 14px 16px;
    font-size: 14px;
    border-bottom: 1px solid ${C.border}66;
  }

  tr:last-child td { border-bottom: none; }

  tr:hover td { background: ${C.border}44; }

  .role-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .role-superadmin { background: ${C.orange}22; color: ${C.orange}; border: 1px solid ${C.orange}44; }
  .role-admin { background: ${C.blue}22; color: ${C.blue}; border: 1px solid ${C.blue}44; }
  .role-empleado { background: ${C.green}22; color: ${C.green}; border: 1px solid ${C.green}44; }

  .status-dot {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }

  .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
  }

  .dot.active { background: ${C.green}; box-shadow: 0 0 6px ${C.green}88; }
  .dot.inactive { background: ${C.muted}; }

  .checkbox-cell { width: 40px; }

  input[type="checkbox"] {
    width: 16px; height: 16px;
    accent-color: ${C.blue};
    cursor: pointer;
  }

  .table-footer {
    padding: 14px 24px;
    border-top: 1px solid ${C.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: ${C.muted};
  }

  /* ── MODAL ─────────────────────────────────── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 16px;
    padding: 32px;
    width: 100%;
    max-width: 480px;
    animation: slideUp 0.25s ease;
    max-height: 90vh;
    overflow-y: auto;
  }

  @keyframes slideUp {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .modal-title {
    font-family: 'Exo 2', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  select {
    width: 100%;
    background: ${C.darker};
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 13px 16px;
    color: ${C.text};
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }

  select:focus { border-color: ${C.blue}; }
  select option { background: ${C.card}; }

  /* ── CSV UPLOAD ─────────────────────────────── */
  .upload-zone {
    border: 2px dashed ${C.border};
    border-radius: 12px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .upload-zone:hover {
    border-color: ${C.blue};
    background: ${C.blue}08;
  }

  .upload-icon { font-size: 36px; margin-bottom: 12px; }
  .upload-text { font-size: 14px; color: ${C.muted}; }
  .upload-hint { font-size: 12px; color: ${C.muted}; margin-top: 6px; opacity: 0.6; }

  /* ── TOAST ─────────────────────────────────── */
  .toast {
    position: fixed;
    bottom: 24px; right: 24px;
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    z-index: 300;
    animation: fadeUp 0.3s ease;
    max-width: 320px;
  }

  .toast.success { border-left: 3px solid ${C.green}; }
  .toast.error   { border-left: 3px solid #ff4d4d; }
  .toast.info    { border-left: 3px solid ${C.blue}; }

  /* ── BULK BAR ──────────────────────────────── */
  .bulk-bar {
    position: fixed;
    bottom: 24px; left: 50%; transform: translateX(-50%);
    background: ${C.card};
    border: 1px solid ${C.blue}44;
    border-radius: 12px;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 0 30px ${C.blue}22;
    z-index: 150;
    animation: fadeUp 0.3s ease;
    white-space: nowrap;
  }

  .bulk-count {
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    color: ${C.blue};
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .main { margin-left: 0; }
  }
`;

// ── DATOS MOCK ───────────────────────────────────────────────
const INITIAL_USERS = [
  { id: 1, name: "Carlos Medina",    email: "cmedina@gta.com",   role: "superadmin", area: "Sistemas",   active: true  },
  { id: 2, name: "Ana López",        email: "alopez@gta.com",    role: "admin",      area: "RRHH",       active: true  },
  { id: 3, name: "Pedro Ramírez",    email: "pramirez@gta.com",  role: "admin",      area: "Operaciones",active: true  },
  { id: 4, name: "María González",   email: "mgonzalez@gta.com", role: "empleado",   area: "Ventas",     active: true  },
  { id: 5, name: "Luis Torres",      email: "ltorres@gta.com",   role: "empleado",   area: "Logística",  active: false },
  { id: 6, name: "Sofía Herrera",    email: "sherrera@gta.com",  role: "empleado",   area: "Finanzas",   active: true  },
  { id: 7, name: "Jorge Vargas",     email: "jvargas@gta.com",   role: "empleado",   area: "Ventas",     active: true  },
  { id: 8, name: "Valentina Cruz",   email: "vcruz@gta.com",     role: "admin",      area: "Marketing",  active: true  },
];

const DEMO_CREDENTIALS = [
  { email: "cmedina@gta.com",   password: "admin123", role: "superadmin", name: "Carlos Medina"  },
  { email: "alopez@gta.com",    password: "admin123", role: "admin",      name: "Ana López"      },
  { email: "mgonzalez@gta.com", password: "emp123",   role: "empleado",   name: "María González" },
];

const ROLE_LABELS = { superadmin: "Superadmin", admin: "Admin de Área", empleado: "Empleado" };
const AREAS = ["Sistemas","RRHH","Operaciones","Ventas","Logística","Finanzas","Marketing","Compras"];

// ── LOGO COMPONENT ───────────────────────────────────────────
function Logo({ url, size = 36, className = "" }) {
  const initials = "GTA";
  return (
    <div className={`sidebar-logo ${className}`} style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {url ? <img src={url} alt="GTA" /> : initials}
    </div>
  );
}

// ── TOAST ────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  const icons = { success: "✓", error: "✕", info: "ℹ" };
  return (
    <div className={`toast ${type}`}>
      <span style={{ color: type === "success" ? C.green : type === "error" ? "#ff7070" : C.blue, fontWeight: 700 }}>
        {icons[type]}
      </span>
      {msg}
    </div>
  );
}

// ── LOGIN PAGE ───────────────────────────────────────────────
function LoginPage({ onLogin, logoUrl }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [err, setErr]     = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setTimeout(() => {
      const user = DEMO_CREDENTIALS.find(u => u.email === email && u.password === pass);
      if (user) onLogin(user);
      else { setErr("Credenciales incorrectas. Verifica tu usuario y contraseña."); setLoading(false); }
    }, 800);
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="brand-bar">
          <Logo url={logoUrl} size={48} />
          <div>
            <div className="brand-name">Somos<span>GTA</span></div>
          </div>
        </div>
        <div className="login-title">Grupo de Tiendas Asociadas S.A. — Intranet Corporativa</div>

        {err && <div className="error-msg">{err}</div>}

        <form onSubmit={handle}>
          <div className="field">
            <label>Correo corporativo</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="usuario@gta.com" required autoComplete="username" />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)}
              placeholder="••••••••" required autoComplete="current-password" />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Verificando…" : "Ingresar a SomosGTA"}
          </button>
        </form>

        <div style={{ marginTop: 24, background: C.darker, borderRadius: 10, padding: "14px 16px", fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
          <div style={{ fontWeight: 600, color: C.yellow, marginBottom: 6 }}>🔑 Credenciales de demo</div>
          <div><span style={{color:C.orange}}>Superadmin:</span> cmedina@gta.com / admin123</div>
          <div><span style={{color:C.blue}}>Admin:</span> alopez@gta.com / admin123</div>
          <div><span style={{color:C.green}}>Empleado:</span> mgonzalez@gta.com / emp123</div>
        </div>
      </div>
    </div>
  );
}

// ── SIDEBAR ──────────────────────────────────────────────────
function Sidebar({ user, active, setActive, onLogout, logoUrl }) {
  const isSA = user.role === "superadmin";
  const isAdmin = user.role === "admin" || isSA;

  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "announcements", icon: "📢", label: "Anuncios", badge: "3" },
    { id: "events", icon: "📅", label: "Eventos" },
    { id: "processes", icon: "📋", label: "Procesos" },
    { id: "gallery", icon: "🖼️", label: "Galería" },
  ];

  const adminItems = [
    { id: "users", icon: "👥", label: "Usuarios" },
    ...(isSA ? [{ id: "settings", icon: "⚙️", label: "Configuración" }] : []),
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Logo url={logoUrl} size={36} />
        <div className="sidebar-title">Somos<span>GTA</span></div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Navegación</div>
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => setActive(item.id)}>
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </button>
        ))}
      </div>

      {isAdmin && (
        <div className="nav-section">
          <div className="nav-label">Administración</div>
          {adminItems.map(item => (
            <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar" style={{
            background: user.role === "superadmin" ? C.orange : user.role === "admin" ? C.blue : C.green
          }}>
            {user.name.split(" ").map(n => n[0]).join("").slice(0,2)}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{ROLE_LABELS[user.role]}</div>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Cerrar sesión">⏻</button>
        </div>
      </div>
    </aside>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────
function Dashboard({ users }) {
  const active = users.filter(u => u.active).length;
  const admins = users.filter(u => u.role === "admin").length;
  const empleados = users.filter(u => u.role === "empleado").length;

  return (
    <div>
      <div className="stats-grid">
        {[
          { label: "Usuarios Totales",  value: users.length, color: "blue",   icon: "👥" },
          { label: "Usuarios Activos",  value: active,        color: "green",  icon: "✓"  },
          { label: "Admins de Área",    value: admins,        color: "orange", icon: "🛡" },
          { label: "Empleados",         value: empleados,     color: "yellow", icon: "👤" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value" style={{
              color: s.color === "blue" ? C.blue : s.color === "green" ? C.green :
                     s.color === "orange" ? C.orange : C.yellow
            }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="table-title">Actividad Reciente</div>
        </div>
        <table>
          <thead>
            <tr><th>Acción</th><th>Usuario</th><th>Fecha</th><th>Estado</th></tr>
          </thead>
          <tbody>
            {[
              { action: "Usuario creado",     user: "Carlos Medina",  date: "Hoy 09:14", ok: true },
              { action: "Anuncio publicado",  user: "Ana López",      date: "Hoy 08:30", ok: true },
              { action: "Acceso denegado",    user: "Desconocido",    date: "Ayer 23:52", ok: false },
              { action: "Evento programado",  user: "Valentina Cruz", date: "Ayer 17:00", ok: true },
            ].map((r, i) => (
              <tr key={i}>
                <td>{r.action}</td>
                <td style={{ color: C.muted }}>{r.user}</td>
                <td style={{ color: C.muted, fontSize: 13 }}>{r.date}</td>
                <td>
                  <span className="status-dot">
                    <span className={`dot ${r.ok ? "active" : "inactive"}`} style={!r.ok ? { background: "#ff4d4d" } : {}} />
                    {r.ok ? "OK" : "Alerta"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── USER MANAGEMENT ──────────────────────────────────────────
function UserManagement({ users, setUsers, showToast, currentUser }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showCsv, setShowCsv] = useState(false);
  const [newUser, setNewUser] = useState({ name:"", email:"", role:"empleado", area:"Ventas", password:"" });

  const isSA = currentUser.role === "superadmin";

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.area.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleAll = () => setSelected(s => s.length === filtered.length ? [] : filtered.map(u => u.id));

  const bulkDeactivate = () => {
    setUsers(u => u.map(x => selected.includes(x.id) ? { ...x, active: false } : x));
    showToast(`${selected.length} usuario(s) desactivados`, "success");
    setSelected([]);
  };

  const bulkActivate = () => {
    setUsers(u => u.map(x => selected.includes(x.id) ? { ...x, active: true } : x));
    showToast(`${selected.length} usuario(s) activados`, "success");
    setSelected([]);
  };

  const createUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      showToast("Completa todos los campos", "error"); return;
    }
    const id = Date.now();
    setUsers(u => [...u, { ...newUser, id, active: true }]);
    showToast(`Usuario ${newUser.name} creado`, "success");
    setShowCreate(false);
    setNewUser({ name:"", email:"", role:"empleado", area:"Ventas", password:"" });
  };

  const simulateCsv = () => {
    const bulk = [
      { id: Date.now()+1, name: "Roberto Núñez",  email: "rnunez@gta.com",  role:"empleado", area:"Ventas",    active: true },
      { id: Date.now()+2, name: "Sandra Vidal",   email: "svidal@gta.com",  role:"empleado", area:"Logística", active: true },
      { id: Date.now()+3, name: "Manuel Ríos",    email: "mrios@gta.com",   role:"empleado", area:"Finanzas",  active: true },
    ];
    setUsers(u => [...u, ...bulk]);
    showToast(`3 usuarios importados desde CSV`, "success");
    setShowCsv(false);
  };

  return (
    <div>
      <div className="table-card">
        <div className="table-header">
          <div className="table-title">👥 Gestión de Usuarios</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
            <input className="search-input" placeholder="Buscar usuario…"
              value={search} onChange={e => setSearch(e.target.value)} />
            {isSA && <>
              <button className="btn-sm btn-ghost" onClick={() => setShowCsv(true)}>📂 CSV Masivo</button>
              <button className="btn-sm btn-blue" onClick={() => setShowCreate(true)}>+ Nuevo Usuario</button>
            </>}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              {isSA && <th className="checkbox-cell"><input type="checkbox" onChange={toggleAll}
                checked={selected.length === filtered.length && filtered.length > 0} /></th>}
              <th>Nombre</th><th>Correo</th><th>Rol</th><th>Área</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                {isSA && <td><input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} /></td>}
                <td style={{ fontWeight: 500 }}>{u.name}</td>
                <td style={{ color: C.muted, fontSize: 13 }}>{u.email}</td>
                <td><span className={`role-badge role-${u.role}`}>{ROLE_LABELS[u.role]}</span></td>
                <td style={{ color: C.muted, fontSize: 13 }}>{u.area}</td>
                <td>
                  <span className="status-dot">
                    <span className={`dot ${u.active ? "active" : "inactive"}`} />
                    {u.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>{filtered.length} usuario(s) encontrado(s)</span>
          <span>{users.filter(u=>u.active).length} activos · {users.filter(u=>!u.active).length} inactivos</span>
        </div>
      </div>

      {/* BULK BAR */}
      {selected.length > 0 && (
        <div className="bulk-bar">
          <span className="bulk-count">{selected.length} seleccionados</span>
          <button className="btn-sm btn-green" onClick={bulkActivate}>✓ Activar</button>
          <button className="btn-sm btn-danger" onClick={bulkDeactivate}>✕ Desactivar</button>
          <button className="btn-sm btn-ghost" onClick={() => setSelected([])}>Cancelar</button>
        </div>
      )}

      {/* MODAL CREAR */}
      {showCreate && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="modal">
            <div className="modal-title">➕ Nuevo Usuario</div>
            {[
              { label:"Nombre completo", key:"name",     type:"text",     ph:"Ej: Juan Pérez"       },
              { label:"Correo corporativo", key:"email", type:"email",    ph:"usuario@gta.com"       },
              { label:"Contraseña inicial", key:"password", type:"password", ph:"Mínimo 6 caracteres" },
            ].map(f => (
              <div className="field" key={f.key}>
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.ph}
                  value={newUser[f.key]} onChange={e => setNewUser(u => ({...u, [f.key]: e.target.value}))} />
              </div>
            ))}
            <div className="field">
              <label>Rol</label>
              <select value={newUser.role} onChange={e => setNewUser(u => ({...u, role: e.target.value}))}>
                <option value="empleado">Empleado</option>
                <option value="admin">Admin de Área</option>
                {isSA && <option value="superadmin">Superadmin</option>}
              </select>
            </div>
            <div className="field">
              <label>Área</label>
              <select value={newUser.area} onChange={e => setNewUser(u => ({...u, area: e.target.value}))}>
                {AREAS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={() => setShowCreate(false)}>Cancelar</button>
              <button className="btn-sm btn-blue" onClick={createUser}>Crear Usuario</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CSV */}
      {showCsv && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowCsv(false)}>
          <div className="modal">
            <div className="modal-title">📂 Importar Usuarios (CSV)</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.7 }}>
              Sube un archivo CSV con columnas: <strong style={{color:C.text}}>nombre, correo, rol, área</strong>.
              El sistema creará las cuentas automáticamente y generará contraseñas temporales.
            </div>
            <div className="upload-zone" onClick={simulateCsv}>
              <div className="upload-icon">📄</div>
              <div className="upload-text">Haz clic para seleccionar CSV</div>
              <div className="upload-hint">Demo: se importarán 3 usuarios de ejemplo</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 14 }}>
              ⚠️ También puedes pegar hasta 1000 filas. Compatible con exportaciones de Excel.
            </div>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={() => setShowCsv(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PLACEHOLDER MODULES ──────────────────────────────────────
function PlaceholderModule({ icon, name, desc }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      minHeight: 360, gap: 16, color: C.muted, textAlign:"center"
    }}>
      <div style={{ fontSize: 64 }}>{icon}</div>
      <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:22, fontWeight:700, color:C.text }}>{name}</div>
      <div style={{ fontSize:14, maxWidth:380, lineHeight:1.7 }}>{desc}</div>
      <div style={{
        marginTop:8, padding:"10px 20px", borderRadius:8,
        background:`${C.blue}18`, border:`1px solid ${C.blue}33`, color:C.blue, fontSize:13
      }}>
        Módulo en desarrollo — próximamente disponible
      </div>
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────────────
function Settings({ logoUrl, setLogoUrl, showToast }) {
  const [inputUrl, setInputUrl] = useState(logoUrl || "");

  const save = () => {
    setLogoUrl(inputUrl);
    showToast("Logo actualizado correctamente", "success");
  };

  return (
    <div>
      <div className="table-card" style={{ padding: 28, marginBottom: 20 }}>
        <div className="table-title" style={{ marginBottom: 20 }}>🖼️ Logo de la Intranet</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight:1.7 }}>
          Sube tu logo a <strong style={{color:C.blue}}>Supabase Storage</strong> y pega la URL pública aquí.
          El logo se mostrará en el sidebar y en el login. No se requiere código.
        </div>
        <div className="field">
          <label>URL del logo (Supabase Storage)</label>
          <input type="url" placeholder="https://xxxx.supabase.co/storage/v1/object/public/assets/logo.png"
            value={inputUrl} onChange={e => setInputUrl(e.target.value)} />
        </div>
        {inputUrl && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Vista previa:</div>
            <img src={inputUrl} alt="Logo preview"
              style={{ height: 48, borderRadius: 8, border: `1px solid ${C.border}` }}
              onError={e => { e.target.style.display="none"; showToast("URL de imagen inválida", "error"); }} />
          </div>
        )}
        <button className="btn-sm btn-blue" onClick={save}>💾 Guardar Logo</button>
      </div>

      <div className="table-card" style={{ padding: 28 }}>
        <div className="table-title" style={{ marginBottom: 20 }}>🎨 Colores Corporativos</div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {[
            { name:"Naranja",  hex: C.orange },
            { name:"Azul",     hex: C.blue   },
            { name:"Amarillo", hex: C.yellow },
            { name:"Verde",    hex: C.green  },
          ].map(c => (
            <div key={c.name} style={{
              display:"flex", alignItems:"center", gap:10, background:C.darker,
              borderRadius:8, padding:"10px 14px", border:`1px solid ${C.border}`
            }}>
              <div style={{ width:20, height:20, borderRadius:4, background:c.hex }} />
              <div>
                <div style={{ fontSize:13, fontWeight:500 }}>{c.name}</div>
                <div style={{ fontSize:11, color:C.muted }}>{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ─────────────────────────────────────────────────
export default function App() {
  const [user,    setUser]    = useState(null);
  const [page,    setPage]    = useState("dashboard");
  const [users,   setUsers]   = useState(INITIAL_USERS);
  const [logoUrl, setLogoUrl] = useState("");
  const [toast,   setToast]   = useState(null);

  const showToast = (msg, type = "info") => {
    setToast({ msg, type, key: Date.now() });
  };

  const logout = () => { setUser(null); setPage("dashboard"); };

  const renderPage = () => {
    switch (page) {
      case "dashboard":     return <Dashboard users={users} />;
      case "users":         return <UserManagement users={users} setUsers={setUsers} showToast={showToast} currentUser={user} />;
      case "settings":      return <Settings logoUrl={logoUrl} setLogoUrl={setLogoUrl} showToast={showToast} />;
      case "announcements": return <PlaceholderModule icon="📢" name="Anuncios y Comunicados" desc="Publica noticias, comunicados oficiales y novedades de GTA visibles para toda la organización." />;
      case "events":        return <PlaceholderModule icon="📅" name="Eventos y Agenda" desc="Gestiona eventos corporativos, reuniones y actividades del equipo con calendario interactivo." />;
      case "processes":     return <PlaceholderModule icon="📋" name="Procesos y Documentos" desc="Centraliza manuales, procedimientos y documentos oficiales de GTA de forma organizada." />;
      case "gallery":       return <PlaceholderModule icon="🖼️" name="Galería Multimedia" desc="Sube fotos y videos corporativos. Los archivos son permanentes y no pueden ser eliminados por usuarios." />;
      default:              return null;
    }
  };

  const pageTitle = {
    dashboard:"Dashboard", users:"Usuarios", settings:"Configuración",
    announcements:"Anuncios", events:"Eventos", processes:"Procesos", gallery:"Galería"
  };

  if (!user) return (
    <>
      <style>{css}</style>
      <LoginPage onLogin={setUser} logoUrl={logoUrl} />
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <Sidebar user={user} active={page} setActive={setPage} onLogout={logout} logoUrl={logoUrl} />
        <div className="main">
          <div className="topbar">
            <div className="topbar-title">{pageTitle[page]}</div>
            <div className="topbar-actions">
              <span style={{ fontSize:13, color:C.muted }}>Bienvenido, <strong style={{color:C.text}}>{user.name.split(" ")[0]}</strong></span>
            </div>
          </div>
          <div className="content">
            {renderPage()}
          </div>
        </div>
      </div>

      {toast && <Toast key={toast.key} msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
