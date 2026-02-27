import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eoefjevfwrqkfnmcftmp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZWZqZXZmd3Jxa2ZubWNmdG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzE0NTIsImV4cCI6MjA4NzA0NzQ1Mn0.E9m6nNJxcGsaB2ATYSCQJFnbskl7JBbJIeVD0U7Ed7g";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const C = {
  orange: "#f7921d", blue: "#00aeef", yellow: "#facd01", green: "#60bb46",
  dark: "#0d1117", darker: "#080c10", card: "#111820", border: "#1e2c3a",
  text: "#e8f4fd", muted: "#6b8fa8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;900&family=Inter:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.darker}; color: ${C.text}; font-family: 'Inter', sans-serif; min-height: 100vh; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.dark}; }
  ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 3px; }
  .login-bg { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: ${C.darker}; position: relative; overflow: hidden; }
  .login-bg::before { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, ${C.blue}18 0%, transparent 70%); top: -150px; left: -150px; border-radius: 50%; pointer-events: none; }
  .login-bg::after { content: ''; position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, ${C.orange}14 0%, transparent 70%); bottom: -100px; right: -100px; border-radius: 50%; pointer-events: none; }
  .login-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 20px; padding: 48px 40px; width: 100%; max-width: 420px; position: relative; z-index: 1; box-shadow: 0 0 60px rgba(0,174,239,0.08), 0 24px 48px rgba(0,0,0,0.5); animation: fadeUp 0.5s ease; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
  .brand-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; justify-content: center; }
  .brand-logo { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .brand-logo img { width: 100%; height: 100%; object-fit: cover; border-radius: 10px; }
  .brand-name { font-family: 'Exo 2', sans-serif; font-weight: 700; font-size: 22px; color: ${C.text}; }
  .brand-name span { color: ${C.blue}; }
  .login-title { font-family: 'Exo 2', sans-serif; font-size: 15px; font-weight: 400; color: ${C.muted}; text-align: center; margin-bottom: 32px; letter-spacing: 0.5px; }
  .field { margin-bottom: 18px; }
  .field label { display: block; font-size: 12px; font-weight: 500; color: ${C.muted}; margin-bottom: 8px; letter-spacing: 0.8px; text-transform: uppercase; }
  .field input { width: 100%; background: ${C.darker}; border: 1px solid ${C.border}; border-radius: 10px; padding: 13px 16px; color: ${C.text}; font-family: 'Inter', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
  .field input:focus { border-color: ${C.blue}; box-shadow: 0 0 0 3px ${C.blue}22; }
  .btn-primary { width: 100%; padding: 14px; background: linear-gradient(135deg, ${C.blue}, #0088cc); border: none; border-radius: 10px; color: #fff; font-family: 'Exo 2', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; margin-top: 8px; transition: transform 0.15s, box-shadow 0.15s; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px ${C.blue}44; }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .error-msg { background: #ff4d4d18; border: 1px solid #ff4d4d44; border-radius: 8px; padding: 10px 14px; color: #ff7070; font-size: 13px; margin-bottom: 16px; text-align: center; }
  .app { display: flex; min-height: 100vh; }
  .sidebar { width: 240px; min-width: 240px; background: ${C.card}; border-right: 1px solid ${C.border}; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 100; }
  .sidebar-brand { padding: 24px 20px; border-bottom: 1px solid ${C.border}; display: flex; align-items: center; gap: 10px; }
  .sidebar-logo { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
  .sidebar-logo img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
  .sidebar-title { font-family: 'Exo 2', sans-serif; font-weight: 700; font-size: 16px; }
  .sidebar-title span { color: ${C.blue}; }
  .nav-section { padding: 16px 12px 8px; }
  .nav-label { font-size: 10px; font-weight: 600; color: ${C.muted}; letter-spacing: 1.2px; text-transform: uppercase; padding: 0 8px; margin-bottom: 6px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s, color 0.15s; font-size: 14px; color: ${C.muted}; margin-bottom: 2px; border: none; background: none; width: 100%; text-align: left; }
  .nav-item:hover { background: ${C.border}; color: ${C.text}; }
  .nav-item.active { background: ${C.blue}20; color: ${C.blue}; font-weight: 500; }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge { margin-left: auto; background: ${C.orange}; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; }
  .sidebar-footer { margin-top: auto; padding: 16px 12px; border-top: 1px solid ${C.border}; }
  .user-chip { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: ${C.border}; }
  .user-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; color: #fff; flex-shrink: 0; }
  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-role { font-size: 11px; color: ${C.muted}; }
  .logout-btn { background: none; border: none; color: ${C.muted}; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; transition: color 0.15s; }
  .logout-btn:hover { color: #ff6b6b; }
  .main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
  .topbar { background: ${C.card}; border-bottom: 1px solid ${C.border}; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .topbar-title { font-family: 'Exo 2', sans-serif; font-size: 20px; font-weight: 700; }
  .topbar-actions { display: flex; gap: 10px; align-items: center; }
  .btn-sm { padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: 'Exo 2', sans-serif; transition: all 0.15s; display: flex; align-items: center; gap: 6px; }
  .btn-blue { background: ${C.blue}; color: #fff; }
  .btn-blue:hover { background: #0099d4; }
  .btn-green { background: ${C.green}; color: #fff; }
  .btn-green:hover { background: #50a83a; }
  .btn-ghost { background: ${C.border}; color: ${C.text}; border: 1px solid ${C.border}; }
  .btn-ghost:hover { background: #2a3d50; }
  .btn-danger { background: #ff4d4d22; color: #ff7070; border: 1px solid #ff4d4d44; }
  .btn-danger:hover { background: #ff4d4d33; }
  .content { padding: 32px; flex: 1; }
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .stat-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 14px; padding: 20px; position: relative; overflow: hidden; transition: transform 0.15s, box-shadow 0.15s; }
  .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .stat-card.blue::before { background: ${C.blue}; }
  .stat-card.orange::before { background: ${C.orange}; }
  .stat-card.green::before { background: ${C.green}; }
  .stat-card.yellow::before { background: ${C.yellow}; }
  .stat-value { font-family: 'Exo 2', sans-serif; font-size: 36px; font-weight: 900; line-height: 1; margin-bottom: 6px; }
  .stat-label { font-size: 13px; color: ${C.muted}; }
  .stat-icon { position: absolute; top: 20px; right: 20px; font-size: 28px; opacity: 0.15; }
  .table-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 14px; overflow: hidden; }
  .table-header { padding: 20px 24px; border-bottom: 1px solid ${C.border}; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .table-title { font-family: 'Exo 2', sans-serif; font-size: 16px; font-weight: 700; }
  .search-input { background: ${C.darker}; border: 1px solid ${C.border}; border-radius: 8px; padding: 8px 14px; color: ${C.text}; font-size: 13px; outline: none; width: 220px; transition: border-color 0.2s; }
  .search-input:focus { border-color: ${C.blue}; }
  table { width: 100%; border-collapse: collapse; }
  th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: ${C.muted}; letter-spacing: 0.8px; text-transform: uppercase; border-bottom: 1px solid ${C.border}; background: ${C.darker}88; }
  td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid ${C.border}66; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: ${C.border}44; }
  .role-badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .role-superadmin { background: ${C.orange}22; color: ${C.orange}; border: 1px solid ${C.orange}44; }
  .role-admin { background: ${C.blue}22; color: ${C.blue}; border: 1px solid ${C.blue}44; }
  .role-empleado { background: ${C.green}22; color: ${C.green}; border: 1px solid ${C.green}44; }
  .status-dot { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; }
  .dot.active { background: ${C.green}; box-shadow: 0 0 6px ${C.green}88; }
  .dot.inactive { background: ${C.muted}; }
  .checkbox-cell { width: 40px; }
  input[type="checkbox"] { width: 16px; height: 16px; accent-color: ${C.blue}; cursor: pointer; }
  .table-footer { padding: 14px 24px; border-top: 1px solid ${C.border}; display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: ${C.muted}; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 16px; padding: 32px; width: 100%; max-width: 480px; animation: slideUp 0.25s ease; max-height: 90vh; overflow-y: auto; }
  @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
  .modal-title { font-family: 'Exo 2', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }
  select { width: 100%; background: ${C.darker}; border: 1px solid ${C.border}; border-radius: 10px; padding: 13px 16px; color: ${C.text}; font-size: 15px; outline: none; transition: border-color 0.2s; }
  select:focus { border-color: ${C.blue}; }
  select option { background: ${C.card}; }
  .upload-zone { border: 2px dashed ${C.border}; border-radius: 12px; padding: 32px; text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
  .upload-zone:hover { border-color: ${C.blue}; background: ${C.blue}08; }
  .upload-icon { font-size: 36px; margin-bottom: 12px; }
  .upload-text { font-size: 14px; color: ${C.muted}; }
  .upload-hint { font-size: 12px; color: ${C.muted}; margin-top: 6px; opacity: 0.6; }
  .toast { position: fixed; bottom: 24px; right: 24px; background: ${C.card}; border: 1px solid ${C.border}; border-radius: 10px; padding: 14px 20px; display: flex; align-items: center; gap: 10px; font-size: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 300; animation: fadeUp 0.3s ease; max-width: 320px; }
  .toast.success { border-left: 3px solid ${C.green}; }
  .toast.error { border-left: 3px solid #ff4d4d; }
  .toast.info { border-left: 3px solid ${C.blue}; }
  .bulk-bar { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: ${C.card}; border: 1px solid ${C.blue}44; border-radius: 12px; padding: 12px 24px; display: flex; align-items: center; gap: 16px; box-shadow: 0 0 30px ${C.blue}22; z-index: 150; animation: fadeUp 0.3s ease; white-space: nowrap; }
  .bulk-count { font-family: 'Exo 2', sans-serif; font-weight: 700; color: ${C.blue}; font-size: 14px; }
  .loading-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: ${C.darker}; flex-direction: column; gap: 16px; }
  .spinner { width: 40px; height: 40px; border: 3px solid ${C.border}; border-top-color: ${C.blue}; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const ROLE_LABELS = { superadmin: "Superadmin", admin: "Admin de Área", empleado: "Empleado" };
const AREAS = ["Sistemas","RRHH","Operaciones","Ventas","Logística","Finanzas","Marketing","Compras","General"];

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`toast ${type}`}>
      <span style={{ color: type==="success"?C.green:type==="error"?"#ff7070":C.blue, fontWeight:700 }}>
        {type==="success"?"✓":type==="error"?"✕":"ℹ"}
      </span>
      {msg}
    </div>
  );
}

const LOGO_URL = "https://eoefjevfwrqkfnmcftmp.supabase.co/storage/v1/object/sign/assets/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNGIzNWZkNy00NWJlLTRhOGItYTljYi0xYzE5NGVkNTRhNGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvbG9nby5wbmciLCJpYXQiOjE3NzE0ODM0OTIsImV4cCI6MTkyOTE2MzQ5Mn0.4u6NjS8K5Th2vw7AJMS3LijC-06fb73viMdaMbReHa4";

function Logo({ size=36 }) {
  return (
    <div style={{ width:size, height:size, flexShrink:0 }}>
      <img src={LOGO_URL} alt="GTA" style={{ width:"100%", height:"100%", objectFit:"contain", borderRadius:8 }}/>
    </div>
  );
}

function LoginPage({ onLogin, logoUrl }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) { setErr("Credenciales incorrectas. Verifica tu usuario y contraseña."); setLoading(false); return; }
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
    if (!profile) { setErr("Usuario sin perfil. Contacta al administrador."); setLoading(false); return; }
    if (!profile.active) { setErr("Tu cuenta está inactiva. Contacta al administrador."); await supabase.auth.signOut(); setLoading(false); return; }
    onLogin(profile);
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="brand-bar">
          <Logo size={48} />
          <div><div className="brand-name">Somos<span>GTA</span></div></div>
        </div>
        <div className="login-title">Grupo de Tiendas Asociadas S.A. — Intranet Corporativa</div>
        {err && <div className="error-msg">{err}</div>}
        <form onSubmit={handle}>
          <div className="field">
            <label>Correo corporativo</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="usuario@gta.com" required />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Verificando…" : "Ingresar a SomosGTA"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ user, active, setActive, onLogout, logoUrl }) {
  const isSA = user.role === "superadmin";
  const isAdmin = user.role === "admin" || isSA;
  const navItems = [
    { id:"dashboard", icon:"⊞", label:"Dashboard" },
    { id:"announcements", icon:"📢", label:"Anuncios" },
    { id:"events", icon:"📅", label:"Eventos" },
    { id:"processes", icon:"📋", label:"Procesos" },
    { id:"gallery", icon:"🖼️", label:"Galería" },
  ];
  const adminItems = [
    { id:"users", icon:"👥", label:"Usuarios" },
    ...(isSA ? [{ id:"settings", icon:"⚙️", label:"Configuración" }] : []),
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Logo size={36} />
        <div className="sidebar-title">Somos<span>GTA</span></div>
      </div>
      <div className="nav-section">
        <div className="nav-label">Navegación</div>
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${active===item.id?"active":""}`} onClick={()=>setActive(item.id)}>
            <span className="nav-icon">{item.icon}</span>{item.label}
          </button>
        ))}
      </div>
      {isAdmin && (
        <div className="nav-section">
          <div className="nav-label">Administración</div>
          {adminItems.map(item => (
            <button key={item.id} className={`nav-item ${active===item.id?"active":""}`} onClick={()=>setActive(item.id)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      )}
      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar" style={{ background: user.role==="superadmin"?C.orange:user.role==="admin"?C.blue:C.green }}>
            {user.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{ROLE_LABELS[user.role]}</div>
          </div>
          <button className="logout-btn" onClick={onLogout}>⏻</button>
        </div>
      </div>
    </aside>
  );
}

function Dashboard({ users }) {
  const active = users.filter(u=>u.active).length;
  const admins = users.filter(u=>u.role==="admin").length;
  const empleados = users.filter(u=>u.role==="empleado").length;
  return (
    <div>
      <div className="stats-grid">
        {[
          { label:"Usuarios Totales", value:users.length, color:"blue",   icon:"👥" },
          { label:"Usuarios Activos", value:active,       color:"green",  icon:"✓"  },
          { label:"Admins de Área",   value:admins,       color:"orange", icon:"🛡" },
          { label:"Empleados",        value:empleados,    color:"yellow", icon:"👤" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value" style={{ color:s.color==="blue"?C.blue:s.color==="green"?C.green:s.color==="orange"?C.orange:C.yellow }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="table-card">
        <div className="table-header"><div className="table-title">Usuarios Registrados</div></div>
        <table>
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Área</th><th>Estado</th></tr></thead>
          <tbody>
            {users.slice(0,5).map(u => (
              <tr key={u.id}>
                <td style={{fontWeight:500}}>{u.name}</td>
                <td style={{color:C.muted,fontSize:13}}>{u.email}</td>
                <td><span className={`role-badge role-${u.role}`}>{ROLE_LABELS[u.role]}</span></td>
                <td style={{color:C.muted,fontSize:13}}>{u.area}</td>
                <td><span className="status-dot"><span className={`dot ${u.active?"active":"inactive"}`}/>{u.active?"Activo":"Inactivo"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer"><span>Mostrando {Math.min(5,users.length)} de {users.length} usuarios</span></div>
      </div>
    </div>
  );
}

function UserManagement({ users, setUsers, showToast, currentUser }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showCsv, setShowCsv] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newUser, setNewUser] = useState({ name:"", email:"", role:"empleado", area:"Ventas", password:"" });
  const isSA = currentUser.role === "superadmin";

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.area.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => setSelected(s => s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const toggleAll = () => setSelected(s => s.length===filtered.length?[]:filtered.map(u=>u.id));

  const bulkSetActive = async (val) => {
    setSaving(true);
    for (const id of selected) {
      await supabase.from("profiles").update({ active: val }).eq("id", id);
    }
    setUsers(u => u.map(x => selected.includes(x.id) ? {...x, active:val} : x));
    showToast(`${selected.length} usuario(s) ${val?"activados":"desactivados"}`, "success");
    setSelected([]);
    setSaving(false);
  };

  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) { showToast("Completa todos los campos","error"); return; }
    setSaving(true);
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: newUser.email, password: newUser.password, email_confirm: true
    });
    if (authError) {
      showToast("Error al crear usuario: " + authError.message, "error");
      setSaving(false); return;
    }
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id, name: newUser.name, email: newUser.email,
      role: newUser.role, area: newUser.area, active: true
    });
    if (profileError) { showToast("Error al crear perfil: " + profileError.message, "error"); setSaving(false); return; }
    setUsers(u => [...u, { id:authData.user.id, ...newUser, active:true }]);
    showToast(`Usuario ${newUser.name} creado`, "success");
    setShowCreate(false);
    setNewUser({ name:"", email:"", role:"empleado", area:"Ventas", password:"" });
    setSaving(false);
  };

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split("\n").filter(l=>l.trim()).slice(1);
    setSaving(true);
    let count = 0;
    for (const line of lines) {
      const [name, email, role, area, password] = line.split(",").map(s=>s.trim());
      if (!name || !email || !password) continue;
      const { data: authData, error } = await supabase.auth.admin.createUser({
        email, password: password||"Temporal123!", email_confirm: true
      });
      if (error) continue;
      await supabase.from("profiles").insert({
        id: authData.user.id, name, email,
        role: role||"empleado", area: area||"General", active: true
      });
      setUsers(u => [...u, { id:authData.user.id, name, email, role:role||"empleado", area:area||"General", active:true }]);
      count++;
    }
    showToast(`${count} usuarios importados`, "success");
    setSaving(false);
    setShowCsv(false);
  };

  return (
    <div>
      <div className="table-card">
        <div className="table-header">
          <div className="table-title">👥 Gestión de Usuarios</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <input className="search-input" placeholder="Buscar usuario…" value={search} onChange={e=>setSearch(e.target.value)} />
            {(isSA || currentUser.role === "admin") && (
              <button className="btn-sm btn-blue" onClick={()=>setShowCreate(true)}>+ Nuevo Usuario</button>
            )}
            {isSA && (
              <button className="btn-sm btn-ghost" onClick={()=>setShowCsv(true)}>📂 CSV Masivo</button>
            )}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {isSA && <th className="checkbox-cell"><input type="checkbox" onChange={toggleAll} checked={selected.length===filtered.length&&filtered.length>0}/></th>}
              <th>Nombre</th><th>Correo</th><th>Rol</th><th>Área</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                {isSA && <td><input type="checkbox" checked={selected.includes(u.id)} onChange={()=>toggleSelect(u.id)}/></td>}
                <td style={{fontWeight:500}}>{u.name}</td>
                <td style={{color:C.muted,fontSize:13}}>{u.email}</td>
                <td><span className={`role-badge role-${u.role}`}>{ROLE_LABELS[u.role]}</span></td>
                <td style={{color:C.muted,fontSize:13}}>{u.area}</td>
                <td><span className="status-dot"><span className={`dot ${u.active?"active":"inactive"}`}/>{u.active?"Activo":"Inactivo"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>{filtered.length} usuario(s)</span>
          <span>{users.filter(u=>u.active).length} activos · {users.filter(u=>!u.active).length} inactivos</span>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="bulk-bar">
          <span className="bulk-count">{selected.length} seleccionados</span>
          <button className="btn-sm btn-green" onClick={()=>bulkSetActive(true)} disabled={saving}>✓ Activar</button>
          <button className="btn-sm btn-danger" onClick={()=>bulkSetActive(false)} disabled={saving}>✕ Desactivar</button>
          <button className="btn-sm btn-ghost" onClick={()=>setSelected([])}>Cancelar</button>
        </div>
      )}

      {showCreate && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowCreate(false)}>
          <div className="modal">
            <div className="modal-title">➕ Nuevo Usuario</div>
            {[
              {label:"Nombre completo",key:"name",type:"text",ph:"Ej: Juan Pérez"},
              {label:"Correo corporativo",key:"email",type:"email",ph:"usuario@gta.com"},
              {label:"Contraseña inicial",key:"password",type:"password",ph:"Mínimo 6 caracteres"},
            ].map(f => (
              <div className="field" key={f.key}>
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={newUser[f.key]} onChange={e=>setNewUser(u=>({...u,[f.key]:e.target.value}))}/>
              </div>
            ))}
            <div className="field">
              <label>Rol</label>
              <select value={newUser.role} onChange={e=>setNewUser(u=>({...u,role:e.target.value}))} disabled={!isSA}>
                <option value="empleado">Empleado</option>
                {isSA && <option value="admin">Admin de Área</option>}
                {isSA && <option value="superadmin">Superadmin</option>}
              </select>
            </div>
            <div className="field">
              <label>Área</label>
              <select value={newUser.area} onChange={e=>setNewUser(u=>({...u,area:e.target.value}))}>
                {AREAS.map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={()=>setShowCreate(false)}>Cancelar</button>
              <button className="btn-sm btn-blue" onClick={createUser} disabled={saving}>{saving?"Creando…":"Crear Usuario"}</button>
            </div>
          </div>
        </div>
      )}

      {showCsv && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowCsv(false)}>
          <div className="modal">
            <div className="modal-title">📂 Importar Usuarios CSV</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:16,lineHeight:1.7}}>
              El archivo CSV debe tener estas columnas en orden:<br/>
              <strong style={{color:C.text}}>nombre, correo, rol, área, contraseña</strong>
              <br/>La primera fila es el encabezado y se ignora.
            </div>
            <label className="upload-zone" style={{display:"block"}}>
              <input type="file" accept=".csv" onChange={handleCsvUpload} style={{display:"none"}}/>
              <div className="upload-icon">📄</div>
              <div className="upload-text">{saving?"Importando usuarios…":"Haz clic para seleccionar CSV"}</div>
              <div className="upload-hint">Compatible con Excel. Máximo 1000 filas.</div>
            </label>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={()=>setShowCsv(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Settings({ logoUrl, setLogoUrl, showToast }) {
  const [inputUrl, setInputUrl] = useState(logoUrl||"");
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("portal_config").select("*").eq("id",1).single().then(({data})=>{
      if (data) setConfig(data);
    });
  }, []);

  const saveLogo = () => { setLogoUrl(inputUrl); showToast("Logo actualizado","success"); };

  const saveConfig = async () => {
    setSaving(true);
    const { error } = await supabase.from("portal_config").update(config).eq("id",1);
    if (error) showToast("Error al guardar: "+error.message,"error");
    else showToast("Portal actualizado correctamente","success");
    setSaving(false);
  };

  const updateConfig = (key, val) => setConfig(c => ({...c, [key]: val}));

  return (
    <div>
      {/* LOGO */}
      <div className="table-card" style={{padding:28,marginBottom:20}}>
        <div className="table-title" style={{marginBottom:20}}>🖼️ Logo de la Intranet</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16,lineHeight:1.7}}>
          Sube tu logo a <strong style={{color:C.blue}}>Supabase Storage</strong> y pega la URL pública aquí.
        </div>
        <div className="field">
          <label>URL del logo</label>
          <input type="url" placeholder="https://eoefjevfwrqkfnmcftmp.supabase.co/storage/v1/object/public/assets/logo.png"
            value={inputUrl} onChange={e=>setInputUrl(e.target.value)}/>
        </div>
        {inputUrl && <div style={{marginBottom:16}}><img src={inputUrl} alt="preview" style={{height:48,borderRadius:8,border:`1px solid ${C.border}`}} onError={e=>e.target.style.display="none"}/></div>}
        <button className="btn-sm btn-blue" onClick={saveLogo}>💾 Guardar Logo</button>
      </div>

      {/* PORTAL CONFIG */}
      {config && (
        <div className="table-card" style={{padding:28,marginBottom:20}}>
          <div className="table-title" style={{marginBottom:6}}>🎨 Personalización del Portal del Empleado</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:24}}>Estos cambios se reflejan en tiempo real en lo que ven los empleados.</div>

          {/* HERO */}
          <div style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:14,marginBottom:12,color:C.blue}}>Banner de Bienvenida</div>
          <div className="field">
            <label>Título de bienvenida</label>
            <input type="text" value={config.hero_title} onChange={e=>updateConfig("hero_title",e.target.value)} placeholder="¡Bienvenido a SomosGTA!"/>
          </div>
          <div className="field">
            <label>Subtítulo</label>
            <input type="text" value={config.hero_subtitle} onChange={e=>updateConfig("hero_subtitle",e.target.value)} placeholder="Tu espacio de comunicación interna"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div className="field">
              <label>Color inicio del banner</label>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <input type="color" value={config.hero_color_start} onChange={e=>updateConfig("hero_color_start",e.target.value)} style={{width:48,height:40,borderRadius:8,border:"none",cursor:"pointer",background:"none"}}/>
                <input type="text" value={config.hero_color_start} onChange={e=>updateConfig("hero_color_start",e.target.value)} style={{flex:1,background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:14,outline:"none"}}/>
              </div>
            </div>
            <div className="field">
              <label>Color fin del banner</label>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <input type="color" value={config.hero_color_end} onChange={e=>updateConfig("hero_color_end",e.target.value)} style={{width:48,height:40,borderRadius:8,border:"none",cursor:"pointer",background:"none"}}/>
                <input type="text" value={config.hero_color_end} onChange={e=>updateConfig("hero_color_end",e.target.value)} style={{flex:1,background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:14,outline:"none"}}/>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Imagen de fondo del banner (URL Supabase Storage)</label>
            <input type="url" value={config.hero_bg_image} onChange={e=>updateConfig("hero_bg_image",e.target.value)} placeholder="https://... (opcional)"/>
          </div>

          {/* PREVIEW HERO */}
          <div style={{borderRadius:12,padding:"28px 32px",marginBottom:24,background:`linear-gradient(135deg, ${config.hero_color_start}, ${config.hero_color_end})`,backgroundImage:config.hero_bg_image?`url(${config.hero_bg_image})`:"none",backgroundSize:"cover",backgroundPosition:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg, ${config.hero_color_start}cc, ${config.hero_color_end}cc)`}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:20,fontWeight:900,color:"#fff",marginBottom:6}}>{config.hero_title||"Título"}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.85)"}}>{config.hero_subtitle||"Subtítulo"}</div>
            </div>
          </div>

          {/* SECCIONES */}
          <div style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:14,marginBottom:12,color:C.blue}}>Secciones Visibles</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
            {[
              {key:"show_events",label:"📅 Eventos"},
              {key:"show_photos",label:"📷 Fotos"},
              {key:"show_videos",label:"🎥 Videos"},
            ].map(s=>(
              <div key={s.key} onClick={()=>updateConfig(s.key,!config[s.key])}
                style={{display:"flex",alignItems:"center",gap:10,padding:"12px 20px",borderRadius:10,cursor:"pointer",border:`2px solid ${config[s.key]?C.green:C.border}`,background:config[s.key]?`${C.green}18`:C.darker,transition:"all 0.2s"}}>
                <div style={{width:20,height:20,borderRadius:4,background:config[s.key]?C.green:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",fontWeight:700}}>{config[s.key]?"✓":""}</div>
                <span style={{fontSize:14,fontWeight:500,color:config[s.key]?C.green:C.muted}}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CARRUSEL */}
          <div style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:14,marginBottom:12,color:C.blue}}>Imágenes del Carrusel</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Estas imágenes aparecen en el carrusel del portal del empleado. No se toman de la galería.</div>
          {(config.carousel_images||[]).map((img,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"center",marginBottom:8,background:C.darker,padding:"10px 12px",borderRadius:8,border:`1px solid ${C.border}`}}>
              <span style={{color:C.muted,fontSize:12,minWidth:20}}>{i+1}</span>
              <input type="url" placeholder="URL de la imagen" value={img.url||""} onChange={e=>{const imgs=[...(config.carousel_images||[])];imgs[i]={...imgs[i],url:e.target.value};updateConfig("carousel_images",imgs);}} style={{flex:2,background:"transparent",border:"none",color:C.text,fontSize:13,outline:"none"}}/>
              <input type="text" placeholder="Título (opcional)" value={img.caption||""} onChange={e=>{const imgs=[...(config.carousel_images||[])];imgs[i]={...imgs[i],caption:e.target.value};updateConfig("carousel_images",imgs);}} style={{flex:1,background:"transparent",border:"none",color:C.text,fontSize:13,outline:"none"}}/>
              <button onClick={()=>updateConfig("carousel_images",(config.carousel_images||[]).filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#ff6b6b",cursor:"pointer",fontSize:16}}>✕</button>
            </div>
          ))}
          <button className="btn-sm btn-ghost" style={{marginBottom:24}} onClick={()=>updateConfig("carousel_images",[...(config.carousel_images||[]),{url:"",caption:""}])}>+ Agregar imagen</button>

          {/* TARJETAS RÁPIDAS */}
          <div style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:14,marginBottom:12,color:C.blue}}>Tarjetas de Acceso Rápido</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Aparecen debajo del carrusel. Pueden tener links externos o internos.</div>
          {(config.quick_cards||[]).map((card,i)=>(
            <div key={i} style={{background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px",marginBottom:10}}>
              <div style={{display:"flex",gap:10,marginBottom:8}}>
                <input type="text" placeholder="Ícono (emoji)" value={card.icon||""} onChange={e=>{const cards=[...(config.quick_cards||[])];cards[i]={...cards[i],icon:e.target.value};updateConfig("quick_cards",cards);}} style={{width:64,background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px",color:C.text,fontSize:16,textAlign:"center",outline:"none"}}/>
                <input type="text" placeholder="Título *" value={card.title||""} onChange={e=>{const cards=[...(config.quick_cards||[])];cards[i]={...cards[i],title:e.target.value};updateConfig("quick_cards",cards);}} style={{flex:1,background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13,outline:"none"}}/>
                <input type="color" value={card.color||C.blue} onChange={e=>{const cards=[...(config.quick_cards||[])];cards[i]={...cards[i],color:e.target.value};updateConfig("quick_cards",cards);}} style={{width:40,height:36,borderRadius:8,border:"none",cursor:"pointer"}}/>
                <button onClick={()=>updateConfig("quick_cards",(config.quick_cards||[]).filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#ff6b6b",cursor:"pointer",fontSize:16}}>✕</button>
              </div>
              <input type="text" placeholder="Descripción (opcional)" value={card.desc||""} onChange={e=>{const cards=[...(config.quick_cards||[])];cards[i]={...cards[i],desc:e.target.value};updateConfig("quick_cards",cards);}} style={{width:"100%",background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13,outline:"none",marginBottom:8}}/>
              <input type="url" placeholder="Link (URL externa o dejar vacío para sección interna)" value={card.link||""} onChange={e=>{const cards=[...(config.quick_cards||[])];cards[i]={...cards[i],link:e.target.value};updateConfig("quick_cards",cards);}} style={{width:"100%",background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13,outline:"none"}}/>
            </div>
          ))}
          <button className="btn-sm btn-ghost" style={{marginBottom:24}} onClick={()=>updateConfig("quick_cards",[...(config.quick_cards||[]),{icon:"📌",title:"",desc:"",color:C.blue,link:""}])}>+ Agregar tarjeta</button>

          {/* FOOTER */}
          <div style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:14,marginBottom:12,color:C.blue}}>Pie de Página</div>
          <div className="field">
            <label>Texto del pie de página</label>
            <input type="text" value={config.footer_text} onChange={e=>updateConfig("footer_text",e.target.value)} placeholder="SomosGTA © Grupo de Tiendas Asociadas S.A."/>
          </div>

          <button className="btn-sm btn-blue" onClick={saveConfig} disabled={saving} style={{marginTop:8}}>
            {saving?"Guardando…":"💾 Guardar Configuración del Portal"}
          </button>
        </div>
      )}

      {/* GUEST PORTAL CONFIG — NUEVA SECCIÓN */}
      {config && (
        <div className="table-card" style={{padding:28,marginBottom:20}}>
          <div className="table-title" style={{marginBottom:6}}>🌐 Portal de Invitados</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:8}}>
            Personaliza el hero de la página pública de invitados.
          </div>
          <div style={{fontSize:12,color:C.blue,marginBottom:24,padding:"8px 14px",background:`${C.blue}12`,borderRadius:8,border:`1px solid ${C.blue}30`,display:"flex",alignItems:"center",gap:8}}>
            🔗 URL de acceso:&nbsp;<strong>somosgta.vercel.app/#/guest</strong>
          </div>

          <div className="field">
            <label>Título del hero</label>
            <input type="text" value={config.guest_hero_title||""} onChange={e=>updateConfig("guest_hero_title",e.target.value)} placeholder="Bienvenido"/>
          </div>
          <div className="field">
            <label>Subtítulo</label>
            <input type="text" value={config.guest_hero_subtitle||""} onChange={e=>updateConfig("guest_hero_subtitle",e.target.value)} placeholder="Comparte tus fotos y videos"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div className="field">
              <label>Color inicio</label>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <input type="color" value={config.guest_hero_color_start||"#00aeef"} onChange={e=>updateConfig("guest_hero_color_start",e.target.value)} style={{width:48,height:40,borderRadius:8,border:"none",cursor:"pointer"}}/>
                <input type="text" value={config.guest_hero_color_start||"#00aeef"} onChange={e=>updateConfig("guest_hero_color_start",e.target.value)} style={{flex:1,background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:14,outline:"none"}}/>
              </div>
            </div>
            <div className="field">
              <label>Color fin</label>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <input type="color" value={config.guest_hero_color_end||"#60bb46"} onChange={e=>updateConfig("guest_hero_color_end",e.target.value)} style={{width:48,height:40,borderRadius:8,border:"none",cursor:"pointer"}}/>
                <input type="text" value={config.guest_hero_color_end||"#60bb46"} onChange={e=>updateConfig("guest_hero_color_end",e.target.value)} style={{flex:1,background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:14,outline:"none"}}/>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Imagen de fondo (URL, opcional)</label>
            <input type="url" value={config.guest_hero_bg_image||""} onChange={e=>updateConfig("guest_hero_bg_image",e.target.value)} placeholder="https://..."/>
          </div>

          {/* PREVIEW */}
          <div style={{borderRadius:12,padding:"28px 32px",marginBottom:20,background:`linear-gradient(135deg,${config.guest_hero_color_start||"#00aeef"},${config.guest_hero_color_end||"#60bb46"})`,backgroundImage:config.guest_hero_bg_image?`url(${config.guest_hero_bg_image})`:"none",backgroundSize:"cover",backgroundPosition:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${config.guest_hero_color_start||"#00aeef"}cc,${config.guest_hero_color_end||"#60bb46"}cc)`}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:20,fontWeight:900,color:"#fff",marginBottom:6}}>{config.guest_hero_title||"Bienvenido"}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.85)"}}>{config.guest_hero_subtitle||"Comparte tus fotos y videos"}</div>
            </div>
          </div>

          <button className="btn-sm btn-blue" onClick={saveConfig} disabled={saving}>
            {saving?"Guardando…":"💾 Guardar Portal de Invitados"}
          </button>
        </div>
      )}

      {/* COLORES */}
      <div className="table-card" style={{padding:28}}>
        <div className="table-title" style={{marginBottom:20}}>🎨 Colores Corporativos GTA</div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {[{name:"Naranja",hex:C.orange},{name:"Azul",hex:C.blue},{name:"Amarillo",hex:C.yellow},{name:"Verde",hex:C.green}].map(c=>(
            <div key={c.name} style={{display:"flex",alignItems:"center",gap:10,background:C.darker,borderRadius:8,padding:"10px 14px",border:`1px solid ${C.border}`}}>
              <div style={{width:20,height:20,borderRadius:4,background:c.hex}}/>
              <div><div style={{fontSize:13,fontWeight:500}}>{c.name}</div><div style={{fontSize:11,color:C.muted}}>{c.hex}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderModule({ icon, name, desc }) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,gap:16,color:C.muted,textAlign:"center"}}>
      <div style={{fontSize:64}}>{icon}</div>
      <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:22,fontWeight:700,color:C.text}}>{name}</div>
      <div style={{fontSize:14,maxWidth:380,lineHeight:1.7}}>{desc}</div>
      <div style={{marginTop:8,padding:"10px 20px",borderRadius:8,background:`${C.blue}18`,border:`1px solid ${C.blue}33`,color:C.blue,fontSize:13}}>
        Módulo en desarrollo — próximamente disponible
      </div>
    </div>
  );
}

// ── EVENTOS ──────────────────────────────────────────────────
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

function EventsModule({ currentUser }) {
  const canCreate = currentUser.role === "superadmin" || currentUser.role === "admin";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [evToast, setEvToast] = useState(null);
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [form, setForm] = useState({ title:"", description:"", date:"", time:"", location:"", maps_url:"", area:"", image_url:"" });

  const showEvToast = (msg, type="info") => setEvToast({ msg, type, key: Date.now() });

  useEffect(() => {
    supabase.from("events").select("*").order("date", { ascending: true }).then(({ data }) => {
      if (data) setEvents(data);
      setLoading(false);
    });
  }, []);

  const saveEvent = async () => {
    if (!form.title || !form.date) { showEvToast("Título y fecha son obligatorios","error"); return; }
    setSaving(true);
    const { data, error } = await supabase.from("events").insert({ ...form, created_by: currentUser.id }).select().single();
    if (error) { showEvToast("Error: " + error.message,"error"); setSaving(false); return; }
    setEvents(e => [...e, data]);
    showEvToast("Evento creado","success");
    setShowForm(false);
    setForm({ title:"", description:"", date:"", time:"", location:"", maps_url:"", area:"", image_url:"" });
    setSaving(false);
  };

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const eventDates = events.reduce((acc, e) => {
    const d = e.date?.slice(0,10);
    if (d) { if (!acc[d]) acc[d] = []; acc[d].push(e); }
    return acc;
  }, {});

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y=>y-1); } else setCalMonth(m=>m-1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y=>y+1); } else setCalMonth(m=>m+1); };

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date(today.toDateString())).slice(0,10);
  const pastEvents = events.filter(e => new Date(e.date) < new Date(today.toDateString())).slice(0,5);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700}}>📅 Eventos y Agenda</div>
        {canCreate && <button className="btn-sm btn-blue" onClick={()=>setShowForm(true)}>+ Nuevo Evento</button>}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20,alignItems:"start"}}>
        <div className="table-card">
          <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <button className="btn-sm btn-ghost" onClick={prevMonth}>‹</button>
            <span style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:16}}>{MONTHS[calMonth]} {calYear}</span>
            <button className="btn-sm btn-ghost" onClick={nextMonth}>›</button>
          </div>
          <div style={{padding:16}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:8}}>
              {DAYS.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:600,color:C.muted,padding:"4px 0"}}>{d}</div>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
              {Array.from({length:firstDay}).map((_,i)=><div key={"e"+i}/>)}
              {Array.from({length:daysInMonth}).map((_,i)=>{
                const day = i+1;
                const dateStr = `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                const hasEvents = eventDates[dateStr];
                const isToday = day===today.getDate() && calMonth===today.getMonth() && calYear===today.getFullYear();
                return (
                  <div key={day} onClick={()=>hasEvents&&setSelectedEvent(eventDates[dateStr][0])}
                    style={{aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:8,cursor:hasEvents?"pointer":"default",background:isToday?`${C.blue}30`:hasEvents?`${C.orange}18`:"transparent",border:isToday?`1px solid ${C.blue}`:"1px solid transparent",transition:"background 0.15s"}}>
                    <span style={{fontSize:13,fontWeight:isToday?700:400,color:isToday?C.blue:C.text}}>{day}</span>
                    {hasEvents && <span style={{width:5,height:5,borderRadius:"50%",background:C.orange,marginTop:1,display:"block"}}/>}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{padding:"10px 20px",borderTop:`1px solid ${C.border}`,display:"flex",gap:16,fontSize:12,color:C.muted}}>
            <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:C.blue,display:"inline-block"}}/> Hoy</span>
            <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:C.orange,display:"inline-block"}}/> Evento</span>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="table-card">
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`}}>
              <div className="table-title">Próximos Eventos</div>
            </div>
            <div style={{maxHeight:300,overflowY:"auto"}}>
              {loading && <div style={{padding:20,textAlign:"center",color:C.muted,fontSize:13}}>Cargando…</div>}
              {!loading && upcomingEvents.length===0 && <div style={{padding:20,textAlign:"center",color:C.muted,fontSize:13}}>No hay eventos próximos</div>}
              {upcomingEvents.map(e=>(
                <div key={e.id} onClick={()=>setSelectedEvent(e)} style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}66`,cursor:"pointer"}}
                  onMouseEnter={el=>el.currentTarget.style.background=`${C.border}44`}
                  onMouseLeave={el=>el.currentTarget.style.background="transparent"}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{e.title}</div>
                  <div style={{fontSize:11,color:C.orange}}>{e.date}{e.time&&` · ${e.time.slice(0,5)}`}</div>
                  {e.location&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>📍 {e.location}</div>}
                </div>
              ))}
            </div>
          </div>
          {pastEvents.length>0 && (
            <div className="table-card">
              <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`}}><div className="table-title" style={{fontSize:14}}>Eventos Pasados</div></div>
              {pastEvents.map(e=>(
                <div key={e.id} onClick={()=>setSelectedEvent(e)} style={{padding:"10px 18px",borderBottom:`1px solid ${C.border}44`,cursor:"pointer",opacity:0.6}}
                  onMouseEnter={el=>el.currentTarget.style.opacity="1"} onMouseLeave={el=>el.currentTarget.style.opacity="0.6"}>
                  <div style={{fontSize:13,fontWeight:500}}>{e.title}</div>
                  <div style={{fontSize:11,color:C.muted}}>{e.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedEvent && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setSelectedEvent(null)}>
          <div className="modal" style={{maxWidth:540}}>
            {selectedEvent.image_url && <img src={selectedEvent.image_url} alt={selectedEvent.title} style={{width:"100%",height:200,objectFit:"cover",borderRadius:10,marginBottom:20}} onError={e=>e.target.style.display="none"}/>}
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:20,fontWeight:700,marginBottom:12}}>{selectedEvent.title}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:16}}>
              <span style={{background:`${C.blue}20`,color:C.blue,padding:"4px 10px",borderRadius:20,fontSize:12}}>📅 {selectedEvent.date}{selectedEvent.time&&` · ${selectedEvent.time.slice(0,5)}`}</span>
              {selectedEvent.area&&<span style={{background:`${C.green}20`,color:C.green,padding:"4px 10px",borderRadius:20,fontSize:12}}>🏢 {selectedEvent.area}</span>}
            </div>
            {selectedEvent.description&&<div style={{fontSize:14,color:C.muted,lineHeight:1.7,marginBottom:16}}>{selectedEvent.description}</div>}
            {selectedEvent.location&&<div style={{fontSize:13,marginBottom:8}}>📍 <strong>Lugar:</strong> {selectedEvent.location}</div>}
            {selectedEvent.maps_url&&<a href={selectedEvent.maps_url} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",background:`${C.blue}20`,color:C.blue,borderRadius:8,fontSize:13,textDecoration:"none",marginTop:8}}>🗺️ Ver en Google Maps</a>}
            <div className="modal-actions"><button className="btn-sm btn-ghost" onClick={()=>setSelectedEvent(null)}>Cerrar</button></div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowForm(false)}>
          <div className="modal" style={{maxWidth:520}}>
            <div className="modal-title">📅 Nuevo Evento</div>
            <div className="field"><label>Título *</label><input type="text" placeholder="Nombre del evento" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></div>
            <div className="field"><label>Descripción</label><input type="text" placeholder="Descripción del evento" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="field"><label>Fecha *</label><input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
              <div className="field"><label>Hora</label><input type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></div>
            </div>
            <div className="field"><label>Lugar</label><input type="text" placeholder="Ej: Sala de reuniones" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))}/></div>
            <div className="field"><label>Link Google Maps</label><input type="url" placeholder="https://maps.google.com/..." value={form.maps_url} onChange={e=>setForm(f=>({...f,maps_url:e.target.value}))}/></div>
            <div className="field"><label>Área responsable</label>
              <select value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))}>
                <option value="">— Seleccionar —</option>
                {AREAS.map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="field"><label>URL imagen (Supabase Storage)</label><input type="url" placeholder="https://..." value={form.image_url} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))}/></div>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={()=>setShowForm(false)}>Cancelar</button>
              <button className="btn-sm btn-blue" onClick={saveEvent} disabled={saving}>{saving?"Guardando…":"Crear Evento"}</button>
            </div>
          </div>
        </div>
      )}

      {evToast && <Toast key={evToast.key} msg={evToast.msg} type={evToast.type} onClose={()=>setEvToast(null)}/>}
    </div>
  );
}


// ── GALERÍA (con pestaña Invitados para admin/superadmin) ─────
function GalleryModule({ currentUser }) {
  const isAdmin = currentUser.role === "superadmin" || currentUser.role === "admin";
  const [tab, setTab] = useState("internal"); // "internal" | "guests"
  const [items, setItems] = useState([]);
  const [guestItems, setGuestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [filter, setFilter] = useState("all");
  const [galToast, setGalToast] = useState(null);
  const [form, setForm] = useState({ title:"", type:"foto", file:null });

  const showGalToast = (msg, type="info") => setGalToast({ msg, type, key: Date.now() });

  useEffect(() => {
    Promise.all([
      supabase.from("gallery").select("*").order("created_at", { ascending: false }),
      isAdmin ? supabase.from("guest_uploads").select("*").order("created_at", { ascending: false }) : Promise.resolve({ data: [] })
    ]).then(([{ data: gData }, { data: guData }]) => {
      if (gData) setItems(gData);
      if (guData) setGuestItems(guData);
      setLoading(false);
    });
  }, []);

  const handleUpload = async () => {
    if (!form.title) { showGalToast("El título es obligatorio","error"); return; }
    if (!form.file) { showGalToast("Selecciona un archivo","error"); return; }
    const maxSize = form.type === "foto" ? 10 * 1024 * 1024 : 200 * 1024 * 1024;
    const maxLabel = form.type === "foto" ? "10MB" : "200MB";
    if (form.file.size > maxSize) { showGalToast(`El archivo supera el límite de ${maxLabel}`,"error"); return; }
    setUploading(true);
    const ext = form.file.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(filename, form.file);
    if (uploadError) { showGalToast("Error al subir archivo: " + uploadError.message,"error"); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filename);
    const { data, error } = await supabase.from("gallery").insert({
      title: form.title, type: form.type, url: urlData.publicUrl,
      uploaded_by: currentUser.id, uploaded_by_name: currentUser.name
    }).select().single();
    if (error) { showGalToast("Error al guardar: " + error.message,"error"); setUploading(false); return; }
    setItems(i => [data, ...i]);
    showGalToast("Archivo subido correctamente","success");
    setShowForm(false);
    setForm({ title:"", type:"foto", file:null });
    setUploading(false);
  };

  const downloadFile = async (url, title) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = title;
      a.click();
      URL.revokeObjectURL(a.href);
      showGalToast("Descarga iniciada","success");
    } catch {
      showGalToast("Error al descargar","error");
    }
  };

  const getYoutubeEmbed = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const grouped = items.filter(i => filter==="all" || i.type===filter).reduce((acc, item) => {
    const date = new Date(item.created_at);
    const key = `${date.getFullYear()} — ${MONTHS[date.getMonth()]}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const groupedGuests = guestItems.filter(i => filter==="all" || i.type===filter).reduce((acc, item) => {
    const date = new Date(item.created_at);
    const key = `${date.getFullYear()} — ${MONTHS[date.getMonth()]}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700}}>🖼️ Galería Multimedia</div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{display:"flex",gap:4,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:4}}>
            {[["all","Todos"],["foto","Fotos"],["video","Videos"]].map(([val,label])=>(
              <button key={val} onClick={()=>setFilter(val)} style={{padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filter===val?C.blue:"transparent",color:filter===val?"#fff":C.muted,transition:"all 0.15s"}}>{label}</button>
            ))}
          </div>
          {tab === "internal" && <button className="btn-sm btn-blue" onClick={()=>setShowForm(true)}>+ Subir</button>}
        </div>
      </div>

      {/* TABS — solo para admin/superadmin */}
      {isAdmin && (
        <div style={{display:"flex",gap:4,background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:4,marginBottom:24,width:"fit-content"}}>
          <button onClick={()=>setTab("internal")} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:tab==="internal"?C.card:"transparent",color:tab==="internal"?C.text:C.muted,transition:"all 0.15s",boxShadow:tab==="internal"?`0 2px 8px rgba(0,0,0,0.3)`:"none"}}>
            🖼️ Galería Interna
          </button>
          <button onClick={()=>setTab("guests")} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:tab==="guests"?C.card:"transparent",color:tab==="guests"?C.orange:C.muted,transition:"all 0.15s",boxShadow:tab==="guests"?`0 2px 8px rgba(0,0,0,0.3)`:"none",display:"flex",alignItems:"center",gap:6}}>
            🌐 Subidas de Invitados
            {guestItems.length > 0 && <span style={{background:C.orange,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:10}}>{guestItems.length}</span>}
          </button>
        </div>
      )}

      {loading && <div style={{textAlign:"center",padding:40,color:C.muted}}>Cargando galería…</div>}

      {/* GALERÍA INTERNA */}
      {tab === "internal" && !loading && (
        <>
          {Object.keys(grouped).length === 0 && (
            <div style={{textAlign:"center",padding:60,color:C.muted}}>
              <div style={{fontSize:48,marginBottom:12}}>🖼️</div>
              <div style={{fontSize:14}}>No hay archivos aún. ¡Sé el primero en subir!</div>
            </div>
          )}
          {Object.entries(grouped).map(([month, monthItems]) => (
            <div key={month} style={{marginBottom:32}}>
              <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:14,fontWeight:700,color:C.muted,marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                <span>{month}</span>
                <span style={{flex:1,height:1,background:C.border}}/>
                <span style={{fontSize:12}}>{monthItems.length} archivo(s)</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
                {monthItems.map(item => (
                  <div key={item.id} onClick={()=>setSelected(item)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"transform 0.15s, box-shadow 0.15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.3)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                    {item.type === "foto" ? (
                      <img src={item.url} alt={item.title} style={{width:"100%",height:140,objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                    ) : (
                      <div style={{width:"100%",height:140,background:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>▶️</div>
                    )}
                    <div style={{padding:"10px 12px"}}>
                      <div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.title}</div>
                      <div style={{fontSize:11,color:C.muted,marginTop:3}}>{item.uploaded_by_name} · {new Date(item.created_at).toLocaleDateString("es")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* GALERÍA INVITADOS */}
      {tab === "guests" && !loading && (
        <>
          <div style={{padding:"12px 16px",background:`${C.orange}12`,border:`1px solid ${C.orange}30`,borderRadius:10,marginBottom:20,fontSize:13,color:C.orange,display:"flex",alignItems:"center",gap:8}}>
            🌐 Contenido subido por visitantes anónimos desde el portal público. Solo admins pueden descargar.
          </div>
          {Object.keys(groupedGuests).length === 0 && (
            <div style={{textAlign:"center",padding:60,color:C.muted}}>
              <div style={{fontSize:48,marginBottom:12}}>🌐</div>
              <div style={{fontSize:14}}>No hay subidas de invitados aún</div>
            </div>
          )}
          {Object.entries(groupedGuests).map(([month, monthItems]) => (
            <div key={month} style={{marginBottom:32}}>
              <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:14,fontWeight:700,color:C.muted,marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                <span>{month}</span>
                <span style={{flex:1,height:1,background:C.border}}/>
                <span style={{fontSize:12}}>{monthItems.length} archivo(s)</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
                {monthItems.map(item => (
                  <div key={item.id} onClick={()=>setSelectedGuest(item)} style={{background:C.card,border:`1px solid ${C.orange}33`,borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"transform 0.15s, box-shadow 0.15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${C.orange}22`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                    {item.type === "foto" ? (
                      <img src={item.url} alt={item.title} style={{width:"100%",height:140,objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                    ) : (
                      <div style={{width:"100%",height:140,background:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>▶️</div>
                    )}
                    <div style={{padding:"10px 12px"}}>
                      <div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.title}</div>
                      <div style={{fontSize:11,color:C.muted,marginTop:3}}>Invitado · {new Date(item.created_at).toLocaleDateString("es")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* MODAL GALERÍA INTERNA */}
      {selected && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setSelected(null)}>
          <div className="modal" style={{maxWidth:640}}>
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700,marginBottom:16}}>{selected.title}</div>
            {selected.type === "foto" ? (
              <img src={selected.url} alt={selected.title} style={{width:"100%",borderRadius:10,maxHeight:400,objectFit:"contain",background:C.darker}}/>
            ) : (
              getYoutubeEmbed(selected.url) ? (
                <iframe src={getYoutubeEmbed(selected.url)} style={{width:"100%",height:320,borderRadius:10,border:"none"}} allowFullScreen title={selected.title}/>
              ) : (
                <video src={selected.url} controls style={{width:"100%",borderRadius:10,maxHeight:400}}/>
              )
            )}
            <div style={{marginTop:12,fontSize:12,color:C.muted}}>
              Subido por <strong style={{color:C.text}}>{selected.uploaded_by_name}</strong> · {new Date(selected.created_at).toLocaleDateString("es")}
            </div>
            <div className="modal-actions"><button className="btn-sm btn-ghost" onClick={()=>setSelected(null)}>Cerrar</button></div>
          </div>
        </div>
      )}

      {/* MODAL INVITADO — con descarga */}
      {selectedGuest && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setSelectedGuest(null)}>
          <div className="modal" style={{maxWidth:640}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700,flex:1}}>{selectedGuest.title}</div>
              <span style={{background:`${C.orange}20`,color:C.orange,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>🌐 Invitado</span>
            </div>
            {selectedGuest.type === "foto" ? (
              <img src={selectedGuest.url} alt={selectedGuest.title} style={{width:"100%",borderRadius:10,maxHeight:400,objectFit:"contain",background:C.darker}}/>
            ) : (
              <video src={selectedGuest.url} controls style={{width:"100%",borderRadius:10,maxHeight:400}}/>
            )}
            <div style={{marginTop:12,fontSize:12,color:C.muted}}>
              Subido por visitante anónimo · {new Date(selectedGuest.created_at).toLocaleDateString("es")}
            </div>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={()=>setSelectedGuest(null)}>Cerrar</button>
              {isAdmin && (
                <button className="btn-sm btn-blue" onClick={()=>downloadFile(selectedGuest.url, selectedGuest.title)}>
                  ⬇️ Descargar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowForm(false)}>
          <div className="modal" style={{maxWidth:480}}>
            <div className="modal-title">📤 Subir Archivo</div>
            <div className="field"><label>Título *</label><input type="text" placeholder="Describe este archivo" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></div>
            <div className="field">
              <label>Tipo</label>
              <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value,file:null,video_url:""}))}>
                <option value="foto">📷 Foto</option>
                <option value="video">🎥 Video</option>
              </select>
            </div>
            {form.type === "foto" ? (
              <div className="field">
                <label>Imagen (JPG, PNG, WEBP)</label>
                <label className="upload-zone" style={{display:"block",cursor:"pointer"}}>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>setForm(f=>({...f,file:e.target.files[0]}))}/>
                  <div className="upload-icon">{form.file?"✅":"📷"}</div>
                  <div className="upload-text">{form.file?form.file.name:"Clic para seleccionar imagen"}</div>
                  <div className="upload-hint">JPG, PNG, WEBP — máx 10MB</div>
                </label>
              </div>
            ) : (
              <div className="field">
                <label>Video (MP4, MOV, AVI, etc.)</label>
                <label className="upload-zone" style={{display:"block",cursor:"pointer"}}>
                  <input type="file" accept="video/*" style={{display:"none"}} onChange={e=>setForm(f=>({...f,file:e.target.files[0]}))}/>
                  <div className="upload-icon">{form.file?"✅":"🎥"}</div>
                  <div className="upload-text">{form.file?form.file.name:"Clic para seleccionar video"}</div>
                  <div className="upload-hint">MP4, MOV, AVI, WEBM — máx 200MB</div>
                </label>
              </div>
            )}
            <div style={{fontSize:12,color:C.muted,marginTop:8,padding:"10px",background:`${C.orange}11`,borderRadius:8,border:`1px solid ${C.orange}22`}}>
              ⚠️ Los archivos subidos son <strong>permanentes</strong> y no podrán ser eliminados.
            </div>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={()=>setShowForm(false)}>Cancelar</button>
              <button className="btn-sm btn-blue" onClick={handleUpload} disabled={uploading}>{uploading?"Subiendo…":"Subir Archivo"}</button>
            </div>
          </div>
        </div>
      )}

      {galToast && <Toast key={galToast.key} msg={galToast.msg} type={galToast.type} onClose={()=>setGalToast(null)}/>}
    </div>
  );
}


// ── ANUNCIOS ─────────────────────────────────────────────────
function AnnouncementsModule({ currentUser }) {
  const canManage = currentUser.role === "superadmin" || currentUser.role === "admin";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [annToast, setAnnToast] = useState(null);
  const [form, setForm] = useState({ title:"", content:"", area:"", priority:"normal", image_url:"", expires_at:"" });

  const showAnnToast = (msg, type="info") => setAnnToast({ msg, type, key: Date.now() });

  const loadAnnouncements = () => {
    supabase.from("announcements").select("*")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setItems(data); setLoading(false); });
  };

  useEffect(() => { loadAnnouncements(); }, []);

  const save = async () => {
    if (!form.title || !form.content || !form.expires_at) { showAnnToast("Título, contenido y fecha de vencimiento son obligatorios","error"); return; }
    setSaving(true);
    const { data, error } = await supabase.from("announcements").insert({
      ...form,
      expires_at: new Date(form.expires_at).toISOString(),
      created_by: currentUser.id,
      created_by_name: currentUser.name
    }).select().single();
    if (error) { showAnnToast("Error: "+error.message,"error"); setSaving(false); return; }
    setItems(i => [data, ...i]);
    showAnnToast("Anuncio publicado","success");
    setShowForm(false);
    setForm({ title:"", content:"", area:"", priority:"normal", image_url:"", expires_at:"" });
    setSaving(false);
  };

  const deleteAnn = async (id) => {
    if (!window.confirm("¿Eliminar este anuncio?")) return;
    await supabase.from("announcements").delete().eq("id", id);
    setItems(i => i.filter(x => x.id !== id));
    setSelected(null);
    showAnnToast("Anuncio eliminado","info");
  };

  const priorityConfig = {
    urgente:     { color:"#ff4d4d", bg:"#ff4d4d18", label:"🚨 Urgente" },
    normal:      { color:C.blue,    bg:`${C.blue}18`, label:"📢 Normal" },
    informativo: { color:C.green,   bg:`${C.green}18`, label:"ℹ️ Informativo" }
  };

  const daysLeft = (expires) => {
    const diff = new Date(expires) - new Date();
    const days = Math.ceil(diff / (1000*60*60*24));
    if (days <= 0) return "Vence hoy";
    if (days === 1) return "Vence mañana";
    return `Vence en ${days} días`;
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700}}>📢 Anuncios y Comunicados</div>
        {canManage && <button className="btn-sm btn-blue" onClick={()=>setShowForm(true)}>+ Nuevo Anuncio</button>}
      </div>

      {loading && <div style={{textAlign:"center",padding:40,color:C.muted}}>Cargando anuncios…</div>}

      {!loading && items.length === 0 && (
        <div style={{textAlign:"center",padding:60,color:C.muted}}>
          <div style={{fontSize:48,marginBottom:12}}>📢</div>
          <div style={{fontSize:14}}>No hay anuncios activos</div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {items.map(item => {
          const pc = priorityConfig[item.priority] || priorityConfig.normal;
          return (
            <div key={item.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",borderLeft:`4px solid ${pc.color}`,cursor:"pointer",transition:"box-shadow 0.15s"}}
              onClick={()=>setSelected(item)}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.2)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{display:"flex",gap:16,padding:20}}>
                {item.image_url && <img src={item.image_url} alt={item.title} style={{width:80,height:80,borderRadius:10,objectFit:"cover",flexShrink:0}} onError={e=>e.target.style.display="none"}/>}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                    <span style={{background:pc.bg,color:pc.color,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{pc.label}</span>
                    {item.area && <span style={{background:`${C.green}18`,color:C.green,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>🏢 {item.area}</span>}
                    <span style={{fontSize:11,color:C.muted,marginLeft:"auto"}}>{daysLeft(item.expires_at)}</span>
                  </div>
                  <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:16,fontWeight:700,marginBottom:6}}>{item.title}</div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.6,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{item.content}</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:8}}>Publicado por {item.created_by_name} · {new Date(item.created_at).toLocaleDateString("es")}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setSelected(null)}>
          <div className="modal" style={{maxWidth:560}}>
            {selected.image_url && <img src={selected.image_url} alt={selected.title} style={{width:"100%",height:200,objectFit:"cover",borderRadius:10,marginBottom:20}} onError={e=>e.target.style.display="none"}/>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              <span style={{background:priorityConfig[selected.priority]?.bg,color:priorityConfig[selected.priority]?.color,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>{priorityConfig[selected.priority]?.label}</span>
              {selected.area && <span style={{background:`${C.green}18`,color:C.green,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>🏢 {selected.area}</span>}
            </div>
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:20,fontWeight:700,marginBottom:12}}>{selected.title}</div>
            <div style={{fontSize:14,color:C.muted,lineHeight:1.8,marginBottom:16,whiteSpace:"pre-wrap"}}>{selected.content}</div>
            <div style={{fontSize:12,color:C.muted,borderTop:`1px solid ${C.border}`,paddingTop:12}}>
              Publicado por <strong style={{color:C.text}}>{selected.created_by_name}</strong> · {new Date(selected.created_at).toLocaleDateString("es")} · Vence: {new Date(selected.expires_at).toLocaleString("es")}
            </div>
            <div className="modal-actions">
              {canManage && <button className="btn-sm btn-danger" onClick={()=>deleteAnn(selected.id)}>🗑 Eliminar</button>}
              <button className="btn-sm btn-ghost" onClick={()=>setSelected(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowForm(false)}>
          <div className="modal" style={{maxWidth:520}}>
            <div className="modal-title">📢 Nuevo Anuncio</div>
            <div className="field"><label>Título *</label><input type="text" placeholder="Título del anuncio" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></div>
            <div className="field">
              <label>Contenido *</label>
              <textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} placeholder="Escribe el contenido del anuncio…" style={{width:"100%",background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 16px",color:C.text,fontSize:14,outline:"none",minHeight:120,resize:"vertical",fontFamily:"'Inter',sans-serif"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="field">
                <label>Prioridad</label>
                <select value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>
                  <option value="informativo">ℹ️ Informativo</option>
                  <option value="normal">📢 Normal</option>
                  <option value="urgente">🚨 Urgente</option>
                </select>
              </div>
              <div className="field">
                <label>Área que publica</label>
                <select value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))}>
                  <option value="">— General —</option>
                  {AREAS.map(a=><option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label>Fecha y hora de vencimiento *</label>
              <input type="datetime-local" value={form.expires_at} onChange={e=>setForm(f=>({...f,expires_at:e.target.value}))} style={{width:"100%",background:C.darker,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 16px",color:C.text,fontSize:14,outline:"none"}}/>
            </div>
            <div className="field"><label>URL imagen (opcional, Supabase Storage)</label><input type="url" placeholder="https://…" value={form.image_url} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))}/></div>
            <div className="modal-actions">
              <button className="btn-sm btn-ghost" onClick={()=>setShowForm(false)}>Cancelar</button>
              <button className="btn-sm btn-blue" onClick={save} disabled={saving}>{saving?"Publicando…":"Publicar Anuncio"}</button>
            </div>
          </div>
        </div>
      )}

      {annToast && <Toast key={annToast.key} msg={annToast.msg} type={annToast.type} onClose={()=>setAnnToast(null)}/>}
    </div>
  );
}


// ── PORTAL DE INVITADOS (público, sin auth) ───────────────────
function GuestPortal() {
  const [items, setItems] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [filter, setFilter] = useState("all");
  const [uploadForm, setUploadForm] = useState({ title:"", type:"foto", file:null });
  const [guestToast, setGuestToast] = useState(null);

  const showGuestToast = (msg, type="info") => setGuestToast({ msg, type, key: Date.now() });

  useEffect(() => {
    Promise.all([
      supabase.from("guest_uploads").select("*").order("created_at", { ascending: false }),
      supabase.from("portal_config").select("*").eq("id", 1).single()
    ]).then(([{ data: uploads }, { data: cfg }]) => {
      if (uploads) setItems(uploads);
      if (cfg) setConfig(cfg);
      setLoading(false);
    });
  }, []);

  const handleUpload = async () => {
    if (!uploadForm.title.trim()) { showGuestToast("El título es obligatorio","error"); return; }
    if (!uploadForm.file) { showGuestToast("Selecciona un archivo","error"); return; }
    const maxSize = uploadForm.type === "foto" ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
    const maxLabel = uploadForm.type === "foto" ? "10MB" : "50MB";
    if (uploadForm.file.size > maxSize) { showGuestToast(`El archivo supera el límite de ${maxLabel}`,"error"); return; }
    setUploading(true);
    const ext = uploadForm.file.name.split(".").pop();
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("guest-gallery").upload(filename, uploadForm.file);
    if (upErr) { showGuestToast("Error al subir: " + upErr.message,"error"); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("guest-gallery").getPublicUrl(filename);
    const { data, error } = await supabase.from("guest_uploads").insert({
      title: uploadForm.title.trim(),
      type: uploadForm.type,
      url: urlData.publicUrl
    }).select().single();
    if (error) { showGuestToast("Error al guardar","error"); setUploading(false); return; }
    setItems(i => [data, ...i]);
    showGuestToast("¡Archivo compartido exitosamente!","success");
    setShowUpload(false);
    setUploadForm({ title:"", type:"foto", file:null });
    setUploading(false);
  };

  const filtered = items.filter(i => filter === "all" || i.type === filter);
  const heroColorStart = config?.guest_hero_color_start || "#00aeef";
  const heroColorEnd   = config?.guest_hero_color_end   || "#60bb46";
  const heroBgImage    = config?.guest_hero_bg_image    || "";
  const heroTitle      = config?.guest_hero_title       || "Bienvenido";
  const heroSubtitle   = config?.guest_hero_subtitle    || "Comparte tus fotos y videos con nosotros";

  const guestCss = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f8f9fb; color: #1a1a2e; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: ${heroColorStart}; border-radius: 10px; }
    .g-wrap { min-height: 100vh; background: #f8f9fb; }
    .g-nav { position: sticky; top: 0; z-index: 100; backdrop-filter: blur(16px); background: rgba(248,249,251,0.85); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 14px 40px; display: flex; align-items: center; justify-content: space-between; }
    .g-nav-brand { display: flex; align-items: center; gap: 10px; }
    .g-nav-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: #1a1a2e; }
    .g-nav-title span { color: ${heroColorStart}; }
    .g-upload-btn { padding: 10px 22px; background: ${heroColorStart}; color: #fff; border: none; border-radius: 100px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px ${heroColorStart}44; }
    .g-upload-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px ${heroColorStart}55; }
    .g-hero { position: relative; overflow: hidden; padding: 80px 40px 72px; text-align: center; background: linear-gradient(135deg, ${heroColorStart}, ${heroColorEnd}); }
    .g-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.18; }
    .g-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, ${heroColorStart}dd, ${heroColorEnd}cc); }
    .g-hero-content { position: relative; z-index: 1; }
    .g-hero-eyebrow { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 20px; backdrop-filter: blur(4px); }
    .g-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 56px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 16px; }
    .g-hero p { font-size: 16px; color: rgba(255,255,255,0.85); max-width: 480px; margin: 0 auto 32px; line-height: 1.6; }
    .g-hero-cta { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: #fff; color: ${heroColorStart}; border: none; border-radius: 100px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
    .g-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.25); }
    .g-hero-stats { display: flex; gap: 32px; justify-content: center; margin-top: 36px; flex-wrap: wrap; }
    .g-hero-stat { text-align: center; }
    .g-hero-stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: #fff; line-height: 1; }
    .g-hero-stat-label { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 3px; text-transform: uppercase; letter-spacing: 1px; }
    .g-body { max-width: 1200px; margin: 0 auto; padding: 48px 32px; }
    .g-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
    .g-section-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #1a1a2e; }
    .g-filter-bar { display: flex; gap: 4px; background: #fff; border: 1px solid #e8edf2; border-radius: 100px; padding: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .g-filter-btn { padding: 7px 18px; border-radius: 100px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
    .g-filter-btn.active { background: ${heroColorStart}; color: #fff; box-shadow: 0 2px 8px ${heroColorStart}44; }
    .g-filter-btn:not(.active) { background: transparent; color: #888; }
    .g-filter-btn:not(.active):hover { color: #1a1a2e; }
    .g-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .g-card { background: #fff; border-radius: 16px; overflow: hidden; cursor: pointer; box-shadow: 0 2px 12px rgba(0,0,0,0.06); border: 1px solid #f0f0f0; transition: all 0.2s; }
    .g-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); border-color: ${heroColorStart}44; }
    .g-card-thumb { width: 100%; height: 180px; object-fit: cover; display: block; }
    .g-card-video { width: 100%; height: 180px; background: linear-gradient(135deg, #1a1a2e, #2d3561); display: flex; align-items: center; justify-content: center; }
    .g-card-play { width: 48px; height: 48px; background: rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2); }
    .g-card-body { padding: 14px 16px; }
    .g-card-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: #1a1a2e; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .g-card-meta { font-size: 11px; color: #aaa; display: flex; align-items: center; gap: 6px; }
    .g-card-type { display: inline-flex; align-items: center; gap: 3px; background: ${heroColorStart}15; color: ${heroColorStart}; padding: 2px 8px; border-radius: 100px; font-size: 10px; font-weight: 600; }
    .g-empty { text-align: center; padding: 80px 20px; color: #bbb; }
    .g-empty-icon { font-size: 56px; margin-bottom: 16px; filter: grayscale(1); opacity: 0.5; }
    .g-empty-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #ccc; margin-bottom: 8px; }
    .g-empty-sub { font-size: 13px; color: #ccc; }
    .g-footer { text-align: center; padding: 32px; border-top: 1px solid #eee; color: #ccc; font-size: 12px; }
    .g-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; animation: gFadeIn 0.2s ease; }
    @keyframes gFadeIn { from { opacity: 0; } to { opacity: 1; } }
    .g-modal { background: #fff; border-radius: 20px; padding: 28px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; animation: gSlideUp 0.25s ease; }
    @keyframes gSlideUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
    .g-upload-modal { max-width: 480px; }
    .g-field { margin-bottom: 16px; }
    .g-field label { display: block; font-size: 11px; font-weight: 600; color: #999; margin-bottom: 7px; letter-spacing: 0.8px; text-transform: uppercase; }
    .g-field input, .g-field select { width: 100%; border: 1.5px solid #e8edf2; border-radius: 10px; padding: 11px 14px; font-size: 14px; color: #1a1a2e; outline: none; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; }
    .g-field input:focus, .g-field select:focus { border-color: ${heroColorStart}; box-shadow: 0 0 0 3px ${heroColorStart}18; }
    .g-drop-zone { border: 2px dashed #d8e0ea; border-radius: 14px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.2s; }
    .g-drop-zone:hover { border-color: ${heroColorStart}; background: ${heroColorStart}06; }
    .g-drop-icon { font-size: 36px; margin-bottom: 10px; }
    .g-drop-text { font-size: 13px; color: #888; }
    .g-drop-hint { font-size: 11px; color: #bbb; margin-top: 6px; }
    .g-btn { padding: 11px 22px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: 'Syne', sans-serif; transition: all 0.15s; }
    .g-btn-primary { background: ${heroColorStart}; color: #fff; box-shadow: 0 4px 12px ${heroColorStart}33; }
    .g-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px ${heroColorStart}44; }
    .g-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    .g-btn-ghost { background: #f5f7fa; color: #555; border: 1px solid #e8edf2; }
    .g-btn-ghost:hover { background: #eef0f4; }
    .g-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .g-toast { position: fixed; bottom: 24px; right: 24px; background: #fff; border-radius: 12px; padding: 14px 20px; display: flex; align-items: center; gap: 10px; font-size: 13px; font-family: 'DM Sans', sans-serif; box-shadow: 0 8px 32px rgba(0,0,0,0.15); z-index: 300; animation: gFadeIn 0.3s ease; max-width: 300px; border: 1px solid #eee; }
    .g-toast-success { border-left: 3px solid #22c55e; }
    .g-toast-error { border-left: 3px solid #ef4444; }
    .g-toast-info { border-left: 3px solid ${heroColorStart}; }
    .loading-guest { min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; background: #f8f9fb; }
    .g-spinner { width: 36px; height: 36px; border: 3px solid #e8edf2; border-top-color: ${heroColorStart}; border-radius: 50%; animation: gSpin 0.8s linear infinite; }
    @keyframes gSpin { to { transform: rotate(360deg); } }
  `;

  const photos = items.filter(i => i.type === "foto").length;
  const videos = items.filter(i => i.type === "video").length;

  if (loading) return (
    <><style>{guestCss}</style>
    <div className="loading-guest">
      <div className="g-spinner"/>
      <div style={{color:"#aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cargando…</div>
    </div></>
  );

  return (
    <><style>{guestCss}</style>
    <div className="g-wrap">

      {/* NAV */}
      <nav className="g-nav">
        <div className="g-nav-brand">
          <Logo size={30}/>
          <div className="g-nav-title">Somos<span>GTA</span></div>
        </div>
        <button className="g-upload-btn" onClick={()=>setShowUpload(true)}>
          <span>↑</span> Compartir
        </button>
      </nav>

      {/* HERO */}
      <div className="g-hero">
        {heroBgImage && <div className="g-hero-bg" style={{backgroundImage:`url(${heroBgImage})`}}/>}
        <div className="g-hero-overlay"/>
        <div className="g-hero-content">
          <div className="g-hero-eyebrow">
            <span>✦</span> Portal Público GTA
          </div>
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <button className="g-hero-cta" onClick={()=>setShowUpload(true)}>
            <span>📤</span> Compartir archivo
          </button>
          <div className="g-hero-stats">
            <div className="g-hero-stat">
              <div className="g-hero-stat-num">{items.length}</div>
              <div className="g-hero-stat-label">Archivos</div>
            </div>
            <div className="g-hero-stat">
              <div className="g-hero-stat-num">{photos}</div>
              <div className="g-hero-stat-label">Fotos</div>
            </div>
            <div className="g-hero-stat">
              <div className="g-hero-stat-num">{videos}</div>
              <div className="g-hero-stat-label">Videos</div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="g-body">
        <div className="g-section-header">
          <div className="g-section-title">Galería Compartida</div>
          <div className="g-filter-bar">
            {[["all","Todos"],["foto","Fotos"],["video","Videos"]].map(([val,label])=>(
              <button key={val} className={`g-filter-btn ${filter===val?"active":""}`} onClick={()=>setFilter(val)}>{label}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="g-empty">
            <div className="g-empty-icon">📷</div>
            <div className="g-empty-title">Aún no hay contenido</div>
            <div className="g-empty-sub">¡Sé el primero en compartir una foto o video!</div>
          </div>
        ) : (
          <div className="g-grid">
            {filtered.map(item => (
              <div key={item.id} className="g-card" onClick={()=>setViewItem(item)}>
                {item.type === "foto"
                  ? <img className="g-card-thumb" src={item.url} alt={item.title} onError={e=>e.target.style.display="none"}/>
                  : <div className="g-card-video"><div className="g-card-play">▶</div></div>
                }
                <div className="g-card-body">
                  <div className="g-card-title">{item.title}</div>
                  <div className="g-card-meta">
                    <span className="g-card-type">{item.type === "foto" ? "📷 Foto" : "🎥 Video"}</span>
                    <span>{new Date(item.created_at).toLocaleDateString("es")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="g-footer">
        SomosGTA · Grupo de Tiendas Asociadas S.A.
      </div>

      {/* MODAL VER */}
      {viewItem && (
        <div className="g-modal-overlay" onClick={e=>e.target===e.currentTarget&&setViewItem(null)}>
          <div className="g-modal">
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:"#1a1a2e",marginBottom:16}}>{viewItem.title}</div>
            {viewItem.type === "foto"
              ? <img src={viewItem.url} alt={viewItem.title} style={{width:"100%",borderRadius:12,maxHeight:420,objectFit:"contain",background:"#f5f5f5"}}/>
              : <video src={viewItem.url} controls style={{width:"100%",borderRadius:12,maxHeight:360}}/>
            }
            <div style={{marginTop:12,fontSize:12,color:"#aaa",fontFamily:"'DM Sans',sans-serif"}}>
              {new Date(viewItem.created_at).toLocaleDateString("es", {day:"numeric",month:"long",year:"numeric"})}
            </div>
            <div className="g-actions">
              <button className="g-btn g-btn-ghost" onClick={()=>setViewItem(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SUBIR */}
      {showUpload && (
        <div className="g-modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowUpload(false)}>
          <div className="g-modal g-upload-modal">
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#1a1a2e",marginBottom:4}}>Compartir archivo</div>
            <div style={{fontSize:13,color:"#aaa",marginBottom:24,fontFamily:"'DM Sans',sans-serif"}}>Tu contenido será visible para todos los visitantes.</div>
            <div className="g-field">
              <label>Título *</label>
              <input type="text" placeholder="Describe brevemente tu archivo" value={uploadForm.title} onChange={e=>setUploadForm(f=>({...f,title:e.target.value}))}/>
            </div>
            <div className="g-field">
              <label>Tipo de archivo</label>
              <select value={uploadForm.type} onChange={e=>setUploadForm(f=>({...f,type:e.target.value,file:null}))}>
                <option value="foto">📷 Foto (JPG, PNG — máx 10MB)</option>
                <option value="video">🎥 Video (MP4, MOV — máx 50MB)</option>
              </select>
            </div>
            <div className="g-field">
              <label>Archivo *</label>
              <label className="g-drop-zone" style={{display:"block"}}>
                <input type="file" accept={uploadForm.type==="foto"?"image/*":"video/*"} style={{display:"none"}} onChange={e=>setUploadForm(f=>({...f,file:e.target.files[0]}))}/>
                <div className="g-drop-icon">{uploadForm.file ? "✅" : uploadForm.type==="foto" ? "🖼️" : "🎬"}</div>
                <div className="g-drop-text">{uploadForm.file ? uploadForm.file.name : "Clic para seleccionar archivo"}</div>
                <div className="g-drop-hint">{uploadForm.type==="foto" ? "JPG, PNG, WEBP · máx 10MB" : "MP4, MOV, WEBM · máx 50MB"}</div>
              </label>
            </div>
            <div className="g-actions">
              <button className="g-btn g-btn-ghost" onClick={()=>setShowUpload(false)}>Cancelar</button>
              <button className="g-btn g-btn-primary" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Subiendo…" : "Compartir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {guestToast && (
        <div className={`g-toast g-toast-${guestToast.type}`} key={guestToast.key}>
          <span style={{fontWeight:700,color:guestToast.type==="success"?"#22c55e":guestToast.type==="error"?"#ef4444":heroColorStart}}>
            {guestToast.type==="success"?"✓":guestToast.type==="error"?"✕":"ℹ"}
          </span>
          {guestToast.msg}
        </div>
      )}
    </div>
    </>
  );
}


function EmployeePortal({ user }) {
  const [section, setSection] = useState("inicio");
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title:"", type:"foto", file:null });
  const [viewItem, setViewItem] = useState(null);
  const [selectedAnn, setSelectedAnn] = useState(null);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [upToast, setUpToast] = useState(null);
  const [cardsIdx, setCardsIdx] = useState(0);
  const [viewEvent, setViewEvent] = useState(null);
  const showUpToast = (msg, type="info") => setUpToast({ msg, type, key: Date.now() });
  const [config, setConfig] = useState({
    hero_title:"¡Bienvenido a SomosGTA!", hero_subtitle:"Grupo de Tiendas Asociadas S.A.",
    hero_color_start:"#00aeef", hero_color_end:"#60bb46", hero_bg_image:"",
    show_events:true, show_photos:true, show_videos:true,
    footer_text:"SomosGTA © Grupo de Tiendas Asociadas S.A.",
    carousel_images:[], quick_cards:[]
  });

  useEffect(() => {
    Promise.all([
      supabase.from("events").select("*").order("date"),
      supabase.from("announcements").select("*").gt("expires_at", new Date().toISOString()).order("created_at",{ascending:false}),
      supabase.from("gallery").select("*").order("created_at",{ascending:false}),
      supabase.from("portal_config").select("*").eq("id",1).single(),
      supabase.from("folders").select("*").eq("created_by", user.id)
    ]).then(([{data:ev},{data:ann},{data:gal},{data:cfg},{data:fols}]) => {
      if (ev) setEvents(ev);
      if (ann) setAnnouncements(ann);
      if (gal) {
        const filtered = gal.filter(g => !g.folder || g.uploaded_by === user.id);
        setGallery(filtered);
      }
      if (cfg) setConfig(cfg);
      if (fols) setFolders(fols);
      setLoading(false);
    });
  }, []);

  const photos = gallery.filter(g => g.type === "foto");
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date(new Date().toDateString()));

  useEffect(() => {
    const imgs = config.carousel_images;
    if (!imgs || imgs.length <= 1) return;
    const t = setInterval(() => setCarouselIdx(i => (i+1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, [config.carousel_images]);

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const today = new Date();
  const eventDates = events.reduce((acc,e) => {
    const d = e.date?.slice(0,10);
    if (d) { if (!acc[d]) acc[d]=[]; acc[d].push(e); }
    return acc;
  }, {});

  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    const name = newFolderName.trim().replace(/[/\\]/g,"");
    const parent = activeFolder && !activeFolder.includes("/") ? activeFolder : null;
    const fullPath = parent ? parent+"/"+name : name;
    await supabase.from("folders").insert({ name, parent, created_by: user.id });
    if (parent) {
      setFolders(f=>[...f,{name,parent,created_by:user.id}]);
    } else {
      setFolders(f=>[...f,{name,parent:null,created_by:user.id}]);
    }
    setActiveFolder(fullPath);
    setNewFolderName("");
    setShowNewFolder(false);
  };

  const handleUpload = async () => {
    if (!uploadForm.title || !uploadForm.file) { showUpToast("Completa todos los campos","error"); return; }
    const maxSize = uploadForm.type === "foto" ? 10*1024*1024 : 50*1024*1024;
    const maxLabel = uploadForm.type === "foto" ? "10MB" : "50MB";
    if (uploadForm.file.size > maxSize) { showUpToast(`El archivo supera el límite de ${maxLabel}`,"error"); return; }
    setUploading(true);
    const ext = uploadForm.file.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(filename, uploadForm.file);
    if (upErr) { showUpToast("Error al subir: "+upErr.message,"error"); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filename);
    const { data, error } = await supabase.from("gallery").insert({
      title: uploadForm.title, type: uploadForm.type, url: urlData.publicUrl,
      folder: activeFolder || null, uploaded_by: user.id, uploaded_by_name: user.name
    }).select().single();
    if (error) { showUpToast("Error al guardar","error"); setUploading(false); return; }
    setGallery(g => [data, ...g]);
    if (activeFolder && !folders.includes(activeFolder)) setFolders(f=>[...f,activeFolder]);
    showUpToast("Archivo subido","success");
    setShowUpload(false);
    setUploadForm({ title:"", type:"foto", file:null });
    setUploading(false);
  };

  const folderItems = activeFolder ? gallery.filter(g=>g.folder===activeFolder) : gallery.filter(g=>!g.folder);
  const priorityConfig = {
    urgente:     { color:"#ff4d4d", bg:"#ff4d4d15", label:"🚨 Urgente" },
    normal:      { color:C.blue,    bg:`${C.blue}15`, label:"📢 Normal" },
    informativo: { color:C.green,   bg:`${C.green}15`, label:"ℹ️ Informativo" }
  };

  const portalCss = `
    .portal { display:flex; min-height:100vh; background:#f0f4f8; font-family:'Inter',sans-serif; }
    .portal-sidebar { width:220px; min-width:220px; background:#fff; border-right:1px solid #e8edf2; display:flex; flex-direction:column; position:fixed; top:0; left:0; bottom:0; box-shadow:2px 0 12px rgba(0,0,0,0.06); z-index:100; }
    .portal-sidebar-brand { padding:20px 16px; border-bottom:1px solid #e8edf2; display:flex; align-items:center; gap:10px; }
    .portal-sidebar-title { font-family:'Exo 2',sans-serif; font-weight:900; font-size:18px; color:#1a1a2e; }
    .portal-sidebar-title span { color:${C.blue}; }
    .portal-nav { padding:12px 8px; flex:1; }
    .portal-nav-item { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; cursor:pointer; font-size:14px; color:#666; margin-bottom:4px; border:none; background:none; width:100%; text-align:left; transition:all 0.15s; }
    .portal-nav-item:hover { background:#f0f4f8; color:#1a1a2e; }
    .portal-nav-item.active { background:${C.blue}15; color:${C.blue}; font-weight:600; }
    .portal-nav-icon { font-size:16px; width:20px; text-align:center; }
    .portal-sidebar-footer { padding:14px 12px; border-top:1px solid #e8edf2; }
    .portal-user-chip { display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius:10px; background:#f5f7fa; }
    .portal-avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,${C.blue},${C.green}); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:12px; flex-shrink:0; }
    .portal-main { margin-left:220px; flex:1; display:flex; flex-direction:column; }
    .portal-topbar { background:#fff; padding:14px 28px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #e8edf2; position:sticky; top:0; z-index:50; }
    .portal-section-heading { font-family:'Exo 2',sans-serif; font-size:20px; font-weight:700; color:#1a1a2e; }
    .portal-content { padding:28px; flex:1; }
    .portal-hero { border-radius:18px; padding:36px 44px; color:#fff; margin-bottom:28px; position:relative; overflow:hidden; }
    .portal-hero h1 { font-family:'Exo 2',sans-serif; font-size:26px; font-weight:900; margin-bottom:6px; position:relative; z-index:1; }
    .portal-hero p { font-size:14px; opacity:0.88; position:relative; z-index:1; }
    .portal-section-title { font-family:'Exo 2',sans-serif; font-size:16px; font-weight:700; color:#1a1a2e; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
    .carousel-wrap { border-radius:14px; overflow:hidden; position:relative; height:280px; background:#ddd; margin-bottom:28px; box-shadow:0 4px 20px rgba(0,0,0,0.1); }
    .carousel-img { width:100%; height:100%; object-fit:cover; }
    .carousel-dots { position:absolute; bottom:14px; left:50%; transform:translateX(-50%); display:flex; gap:6px; }
    .carousel-dot { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.5); cursor:pointer; border:none; transition:all 0.2s; }
    .carousel-dot.active { background:#fff; width:18px; border-radius:4px; }
    .carousel-arrows { position:absolute; top:50%; transform:translateY(-50%); width:100%; display:flex; justify-content:space-between; padding:0 10px; pointer-events:none; }
    .carousel-arrow { width:34px; height:34px; background:rgba(255,255,255,0.85); border:none; border-radius:50%; font-size:16px; cursor:pointer; pointer-events:all; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.15); }
    .carousel-caption { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(transparent,rgba(0,0,0,0.6)); padding:20px 18px 42px; color:#fff; font-size:13px; font-weight:500; }
    .event-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; margin-bottom:28px; }
    .event-card { background:#fff; border-radius:12px; padding:18px; box-shadow:0 2px 10px rgba(0,0,0,0.06); border-left:4px solid ${C.orange}; transition:transform 0.15s,box-shadow 0.15s; }
    .event-card:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(0,0,0,0.1); }
    .ann-card { background:#fff; border-radius:12px; padding:18px 20px; margin-bottom:12px; box-shadow:0 2px 10px rgba(0,0,0,0.06); cursor:pointer; display:flex; gap:14px; align-items:flex-start; transition:box-shadow 0.15s; }
    .ann-card:hover { box-shadow:0 6px 18px rgba(0,0,0,0.1); }
    .ann-priority-bar { width:4px; border-radius:4px; flex-shrink:0; align-self:stretch; }
    .gallery-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:10px; }
    .gallery-thumb { border-radius:10px; overflow:hidden; aspect-ratio:1; cursor:pointer; position:relative; box-shadow:0 2px 8px rgba(0,0,0,0.08); transition:transform 0.15s; }
    .gallery-thumb:hover { transform:scale(1.03); }
    .gallery-thumb img { width:100%; height:100%; object-fit:cover; }
    .gallery-thumb-video { width:100%; height:100%; background:linear-gradient(135deg,#1a1a2e,#2d3561); display:flex; align-items:center; justify-content:center; font-size:30px; }
    .folder-chip { display:flex; align-items:center; gap:6px; padding:8px 14px; border-radius:8px; cursor:pointer; font-size:13px; font-weight:500; border:2px solid #e8edf2; background:#fff; transition:all 0.15s; color:#555; }
    .folder-chip.active { border-color:${C.blue}; background:${C.blue}15; color:${C.blue}; }
    .folder-chip:hover { border-color:${C.blue}; }
    .portal-empty { text-align:center; padding:40px; color:#aaa; font-size:14px; }
    .portal-logout { background:none; border:1px solid #e0e0e0; border-radius:8px; padding:6px 12px; font-size:12px; color:#999; cursor:pointer; transition:all 0.15s; }
    .portal-logout:hover { background:#fee2e2; color:#ef4444; border-color:#ef4444; }
    .modal-overlay-light { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; }
    .modal-light { background:#fff; border-radius:16px; padding:28px; width:100%; max-width:580px; max-height:90vh; overflow-y:auto; }
    .field-light label { display:block; font-size:12px; font-weight:600; color:#888; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.6px; }
    .field-light input,.field-light select,.field-light textarea { width:100%; border:1.5px solid #e8edf2; border-radius:10px; padding:11px 14px; font-size:14px; color:#1a1a2e; outline:none; font-family:'Inter',sans-serif; transition:border-color 0.2s; background:#fff; }
    .field-light input:focus,.field-light select:focus { border-color:${C.blue}; }
    .upload-zone-light { border:2px dashed #d0dae4; border-radius:12px; padding:28px; text-align:center; cursor:pointer; transition:all 0.2s; }
    .upload-zone-light:hover { border-color:${C.blue}; background:${C.blue}08; }
    .btn-portal { padding:10px 20px; border-radius:10px; font-size:13px; font-weight:600; cursor:pointer; border:none; font-family:'Exo 2',sans-serif; transition:all 0.15s; }
    .btn-portal-blue { background:${C.blue}; color:#fff; }
    .btn-portal-blue:hover { background:#0099d4; }
    .btn-portal-ghost { background:#f5f7fa; color:#555; border:1px solid #e8edf2; }
    .btn-portal-ghost:hover { background:#eef0f4; }
    .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
    .cal-cell { aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:8px; cursor:default; }
    .cal-cell.has-event { cursor:pointer; background:${C.orange}15; }
    .cal-cell.is-today { background:${C.blue}20; border:1.5px solid ${C.blue}; }
  `;

  const sectionTitles = { inicio:"Inicio", events:"Eventos", announcements:"Anuncios", gallery:"Mi Galería" };

  if (loading) return (
    <><style>{portalCss}</style>
    <div className="portal" style={{alignItems:"center",justifyContent:"center",display:"flex"}}>
      <div style={{textAlign:"center",color:"#888"}}><div className="spinner" style={{borderTopColor:C.blue,margin:"0 auto 12px"}}/><div>Cargando…</div></div>
    </div></>
  );

  return (
    <><style>{css}</style><style>{portalCss}</style>
    <div className="portal">
      <aside className="portal-sidebar">
        <div className="portal-sidebar-brand">
          <Logo size={32}/>
          <div className="portal-sidebar-title">Somos<span>GTA</span></div>
        </div>
        <nav className="portal-nav">
          {[
            {id:"inicio",icon:"⊞",label:"Inicio"},
            {id:"announcements",icon:"📢",label:"Anuncios", badge: announcements.filter(a=>a.priority==="urgente").length||null},
            {id:"events",icon:"📅",label:"Eventos"},
            {id:"gallery",icon:"🖼️",label:"Mi Galería"},
          ].map(item=>(
            <button key={item.id} className={`portal-nav-item ${section===item.id?"active":""}`} onClick={()=>setSection(item.id)}>
              <span className="portal-nav-icon">{item.icon}</span>
              <span style={{flex:1}}>{item.label}</span>
              {item.badge>0 && <span style={{background:"#ff4d4d",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:10}}>{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="portal-sidebar-footer">
          <div className="portal-user-chip">
            <div className="portal-avatar">{user.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:"#1a1a2e",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
              <div style={{fontSize:11,color:"#aaa"}}>Empleado</div>
            </div>
            <button className="portal-logout" onClick={async()=>{await supabase.auth.signOut();window.location.reload();}}>⏻</button>
          </div>
        </div>
      </aside>

      <div className="portal-main">
        <div className="portal-topbar">
          <div className="portal-section-heading">{sectionTitles[section]}</div>
          <div style={{fontSize:13,color:"#888"}}>Bienvenido, <strong style={{color:"#1a1a2e"}}>{user.name.split(" ")[0]}</strong></div>
        </div>

        <div className="portal-content">
          {section === "inicio" && <>
            <div className="portal-hero" style={{background:`linear-gradient(135deg,${config.hero_color_start},${config.hero_color_end})`,backgroundImage:config.hero_bg_image?`url(${config.hero_bg_image})`:"none",backgroundSize:"cover",backgroundPosition:"center"}}>
              <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${config.hero_color_start}cc,${config.hero_color_end}cc)`,borderRadius:18}}/>
              <h1>{config.hero_title} 👋</h1>
              <p>{config.hero_subtitle}</p>
            </div>

            {config.carousel_images?.length > 0 && (
              <div style={{marginBottom:28}}>
                <div className="carousel-wrap">
                  <img className="carousel-img" src={config.carousel_images[carouselIdx]?.url} alt={config.carousel_images[carouselIdx]?.caption||""}/>
                  {config.carousel_images[carouselIdx]?.caption && <div className="carousel-caption">{config.carousel_images[carouselIdx].caption}</div>}
                  <div className="carousel-arrows">
                    <button className="carousel-arrow" onClick={()=>setCarouselIdx(i=>(i-1+config.carousel_images.length)%config.carousel_images.length)}>‹</button>
                    <button className="carousel-arrow" onClick={()=>setCarouselIdx(i=>(i+1)%config.carousel_images.length)}>›</button>
                  </div>
                  <div className="carousel-dots">{config.carousel_images.map((_,i)=><button key={i} className={`carousel-dot ${i===carouselIdx?"active":""}`} onClick={()=>setCarouselIdx(i)}/>)}</div>
                </div>
              </div>
            )}

            {config.quick_cards?.length > 0 && (
              <div style={{marginBottom:28,position:"relative"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <button onClick={()=>setCardsIdx(i=>Math.max(0,i-1))} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e8edf2",background:"#fff",fontSize:18,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}} disabled={cardsIdx===0}>‹</button>
                  <div style={{flex:1,overflow:"hidden"}}>
                    <div style={{display:"flex",gap:14,transform:`translateX(calc(-${cardsIdx * (220+14)}px))`,transition:"transform 0.35s ease"}}>
                      {config.quick_cards.map((card,i)=>(
                        <div key={i} onClick={()=>card.link&&window.open(card.link,"_blank")}
                          style={{minWidth:220,background:card.color||C.blue,borderRadius:14,padding:"20px 18px",cursor:card.link?"pointer":"default",flexShrink:0,boxShadow:"0 4px 16px rgba(0,0,0,0.12)",transition:"transform 0.15s"}}
                          onMouseEnter={e=>card.link&&(e.currentTarget.style.transform="translateY(-3px)")}
                          onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                          <div style={{fontSize:32,marginBottom:10}}>{card.icon||"📌"}</div>
                          <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:15,fontWeight:700,color:"#fff",marginBottom:4}}>{card.title}</div>
                          {card.desc&&<div style={{fontSize:12,color:"rgba(255,255,255,0.8)",lineHeight:1.4}}>{card.desc}</div>}
                          {card.link&&<div style={{marginTop:10,fontSize:11,color:"rgba(255,255,255,0.7)",display:"flex",alignItems:"center",gap:4}}>Abrir →</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={()=>setCardsIdx(i=>Math.min(config.quick_cards.length-1,i+1))} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e8edf2",background:"#fff",fontSize:18,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}} disabled={cardsIdx>=config.quick_cards.length-1}>›</button>
                </div>
              </div>
            )}

            {announcements.length > 0 && (
              <div style={{marginBottom:28}}>
                <div className="portal-section-title">📢 Últimos Anuncios</div>
                {announcements.slice(0,3).map(a=>{
                  const pc = priorityConfig[a.priority]||priorityConfig.normal;
                  return (
                    <div key={a.id} className="ann-card" onClick={()=>{setSelectedAnn(a);setSection("announcements");}}>
                      <div className="ann-priority-bar" style={{background:pc.color}}/>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                          <span style={{background:pc.bg,color:pc.color,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600}}>{pc.label}</span>
                          {a.area&&<span style={{background:`${C.green}15`,color:C.green,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600}}>🏢 {a.area}</span>}
                        </div>
                        <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:15,fontWeight:700,color:"#1a1a2e",marginBottom:4}}>{a.title}</div>
                        <div style={{fontSize:12,color:"#888",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{a.content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {upcomingEvents.length > 0 && (
              <div style={{marginBottom:28}}>
                <div className="portal-section-title">📅 Próximos Eventos</div>
                <div className="event-cards">
                  {upcomingEvents.slice(0,3).map(e=>(
                    <div key={e.id} className="event-card">
                      <div style={{fontSize:11,fontWeight:600,color:C.orange,marginBottom:4}}>{e.date}{e.time&&` · ${e.time.slice(0,5)}`}</div>
                      <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:15,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>{e.title}</div>
                      <div style={{fontSize:11,color:"#888"}}>{e.location&&`📍 ${e.location}`}</div>
                      {e.maps_url&&<a href={e.maps_url} target="_blank" rel="noreferrer" style={{fontSize:11,color:C.blue,textDecoration:"none",fontWeight:600,marginTop:6,display:"inline-block"}}>🗺️ Ver en Maps</a>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{textAlign:"center",padding:"20px 0",borderTop:"1px solid #e8edf2",color:"#ccc",fontSize:12}}>{config.footer_text}</div>
          </>}

          {section === "announcements" && <>
            {announcements.length === 0 && <div className="portal-empty"><div style={{fontSize:40,marginBottom:10}}>📢</div>No hay anuncios activos</div>}
            {announcements.map(a=>{
              const pc = priorityConfig[a.priority]||priorityConfig.normal;
              return (
                <div key={a.id} className="ann-card" onClick={()=>setSelectedAnn(a)}>
                  <div className="ann-priority-bar" style={{background:pc.color}}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
                      <span style={{background:pc.bg,color:pc.color,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{pc.label}</span>
                      {a.area&&<span style={{background:`${C.green}15`,color:C.green,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>🏢 {a.area}</span>}
                      <span style={{fontSize:11,color:"#aaa",marginLeft:"auto"}}>Vence: {new Date(a.expires_at).toLocaleDateString("es")}</span>
                    </div>
                    {a.image_url&&<img src={a.image_url} alt={a.title} style={{width:"100%",height:140,objectFit:"cover",borderRadius:8,marginBottom:10}} onError={e=>e.target.style.display="none"}/>}
                    <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:16,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>{a.title}</div>
                    <div style={{fontSize:13,color:"#666",lineHeight:1.6,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{a.content}</div>
                    <div style={{fontSize:11,color:"#aaa",marginTop:8}}>Por {a.created_by_name} · {new Date(a.created_at).toLocaleDateString("es")}</div>
                  </div>
                </div>
              );
            })}
          </>}

          {section === "events" && <>
            <div className="table-card" style={{background:"#fff",border:"1px solid #e8edf2",marginBottom:20}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid #e8edf2",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <button className="btn-portal btn-portal-ghost" onClick={()=>{if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);}}>‹</button>
                <span style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:16,color:"#1a1a2e"}}>{MONTHS[calMonth]} {calYear}</span>
                <button className="btn-portal btn-portal-ghost" onClick={()=>{if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);}}>›</button>
              </div>
              <div style={{padding:16}}>
                <div className="cal-grid" style={{marginBottom:8}}>
                  {DAYS.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:600,color:"#aaa",padding:"4px 0"}}>{d}</div>)}
                </div>
                <div className="cal-grid">
                  {Array.from({length:firstDay}).map((_,i)=><div key={"e"+i}/>)}
                  {Array.from({length:daysInMonth}).map((_,i)=>{
                    const day=i+1;
                    const ds=`${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                    const hasEv=eventDates[ds];
                    const isToday=day===today.getDate()&&calMonth===today.getMonth()&&calYear===today.getFullYear();
                    return (
                      <div key={day} className={`cal-cell ${isToday?"is-today":""} ${hasEv?"has-event":""}`} onClick={()=>hasEv&&setViewEvent(eventDates[ds][0])}>
                        <span style={{fontSize:13,fontWeight:isToday?700:400,color:isToday?C.blue:"#1a1a2e"}}>{day}</span>
                        {hasEv&&<span style={{width:5,height:5,borderRadius:"50%",background:C.orange,display:"block",marginTop:1}}/>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="portal-section-title">Próximos Eventos</div>
            {upcomingEvents.length===0&&<div className="portal-empty">No hay eventos próximos</div>}
            <div className="event-cards">
              {upcomingEvents.map(e=>(
                <div key={e.id} className="event-card">
                  <div style={{fontSize:11,fontWeight:600,color:C.orange,marginBottom:4}}>{e.date}{e.time&&` · ${e.time.slice(0,5)}`}</div>
                  <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:15,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>{e.title}</div>
                  {e.description&&<div style={{fontSize:12,color:"#888",marginBottom:6,lineHeight:1.5}}>{e.description}</div>}
                  <div style={{fontSize:11,color:"#888"}}>{e.location&&`📍 ${e.location}`}{e.area&&` · 🏢 ${e.area}`}</div>
                  {e.maps_url&&<a href={e.maps_url} target="_blank" rel="noreferrer" style={{fontSize:12,color:C.blue,textDecoration:"none",fontWeight:600,marginTop:8,display:"inline-flex",alignItems:"center",gap:4}}>🗺️ Ver en Google Maps</a>}
                </div>
              ))}
            </div>
          </>}

          {section === "gallery" && (()=>{
            const isInFolder = activeFolder && !activeFolder.includes("/");
            const isInSub = activeFolder?.includes("/");
            const currentItems = !activeFolder
              ? gallery.filter(g=>!g.folder)
              : gallery.filter(g=>g.folder===activeFolder);
            const subFolderNames = isInFolder
              ? [...new Set(gallery.filter(g=>g.folder?.startsWith(activeFolder+"/")).map(g=>g.folder.split("/")[1]))]
              : [];
            const rootFolderNames = [...new Set([
              ...folders.map(f=>f.name),
              ...gallery.map(g=>g.folder).filter(Boolean).map(f=>f.split("/")[0])
            ])];
            const subFolderNamesForRoot = (fname) => [
              ...new Set([
                ...folders.filter(f=>f.parent===fname).map(f=>f.name),
                ...gallery.filter(g=>g.folder?.startsWith(fname+"/")).map(g=>g.folder.split("/")[1])
              ])
            ];
            const countFiles = (path) => gallery.filter(g=>g.folder===path).length;
            const countAllInFolder = (fname) => gallery.filter(g=>g.folder===fname||g.folder?.startsWith(fname+"/")).length;

            return <>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20,fontSize:13}}>
                <button onClick={()=>setActiveFolder(null)} style={{background:"none",border:"none",cursor:"pointer",color:!activeFolder?"#1a1a2e":C.blue,fontWeight:!activeFolder?700:500,fontSize:13,padding:0,display:"flex",alignItems:"center",gap:4}}>
                  🏠 Mi Galería
                </button>
                {activeFolder && <>
                  <span style={{color:"#ccc"}}>›</span>
                  <button onClick={()=>setActiveFolder(activeFolder.split("/")[0])} style={{background:"none",border:"none",cursor:"pointer",color:isInSub?C.blue:"#1a1a2e",fontWeight:isInSub?500:700,fontSize:13,padding:0}}>
                    {activeFolder.split("/")[0]}
                  </button>
                </>}
                {isInSub && <>
                  <span style={{color:"#ccc"}}>›</span>
                  <span style={{color:"#1a1a2e",fontWeight:700,fontSize:13}}>{activeFolder.split("/")[1]}</span>
                </>}
              </div>

              <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginBottom:20}}>
                {!isInSub && <button className="btn-portal btn-portal-ghost" onClick={()=>setShowNewFolder(true)}>
                  📁 {!activeFolder?"Nueva Carpeta":"Nueva Subcarpeta"}
                </button>}
                <button className="btn-portal btn-portal-blue" onClick={()=>setShowUpload(true)}>+ Subir Archivo</button>
              </div>

              {!activeFolder && rootFolderNames.length > 0 && (
                <div style={{marginBottom:28}}>
                  <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:14,fontWeight:700,color:"#888",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                    CARPETAS
                    <span style={{flex:1,height:1,background:"#e8edf2",display:"inline-block"}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
                    {rootFolderNames.map(fname=>(
                      <div key={fname} onClick={()=>setActiveFolder(fname)}
                        style={{background:"#fff",border:"2px solid #e8edf2",borderRadius:14,padding:"20px 16px",cursor:"pointer",textAlign:"center",transition:"all 0.15s",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 20px ${C.blue}22`;}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8edf2";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)";}}>
                        <div style={{fontSize:40,marginBottom:10}}>📂</div>
                        <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:4,wordBreak:"break-word"}}>{fname}</div>
                        <div style={{fontSize:11,color:"#aaa"}}>{countAllInFolder(fname)} archivo(s)</div>
                        {subFolderNamesForRoot(fname).length>0 && <div style={{fontSize:10,color:C.blue,marginTop:4}}>{subFolderNamesForRoot(fname).length} subcarpeta(s)</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isInFolder && subFolderNames.length > 0 && (
                <div style={{marginBottom:28}}>
                  <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:14,fontWeight:700,color:"#888",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                    SUBCARPETAS
                    <span style={{flex:1,height:1,background:"#e8edf2",display:"inline-block"}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
                    {subFolderNames.map(sname=>(
                      <div key={sname} onClick={()=>setActiveFolder(activeFolder+"/"+sname)}
                        style={{background:"#fff",border:"2px solid #e8edf2",borderRadius:14,padding:"20px 16px",cursor:"pointer",textAlign:"center",transition:"all 0.15s",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=C.orange;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 20px ${C.orange}22`;}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8edf2";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)";}}>
                        <div style={{fontSize:36,marginBottom:10}}>📁</div>
                        <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:4,wordBreak:"break-word"}}>{sname}</div>
                        <div style={{fontSize:11,color:"#aaa"}}>{countFiles(activeFolder+"/"+sname)} archivo(s)</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentItems.length > 0 && (
                <div>
                  <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:14,fontWeight:700,color:"#888",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                    ARCHIVOS
                    <span style={{flex:1,height:1,background:"#e8edf2",display:"inline-block"}}/>
                    <span style={{fontSize:12,fontWeight:400}}>{currentItems.length} archivo(s)</span>
                  </div>
                  <div className="gallery-grid">
                    {currentItems.map(item=>(
                      <div key={item.id} className="gallery-thumb" onClick={()=>setViewItem(item)}>
                        {item.type==="foto"
                          ? <img src={item.url} alt={item.title} onError={e=>e.target.style.display="none"}/>
                          : <div className="gallery-thumb-video">▶️</div>
                        }
                        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,0.65))",padding:"8px",fontSize:11,color:"#fff",fontWeight:500}}>{item.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentItems.length===0 && rootFolderNames.length===0 && subFolderNames.length===0 && (
                <div className="portal-empty"><div style={{fontSize:48,marginBottom:12}}>📂</div>No hay archivos aún. ¡Crea una carpeta y sube tu primer archivo!</div>
              )}

              {currentItems.length===0 && (activeFolder) && subFolderNames.length===0 && (
                <div className="portal-empty"><div style={{fontSize:40,marginBottom:10}}>📂</div>Esta carpeta está vacía</div>
              )}
            </>;
          })()}
        </div>
      </div>

      {viewEvent && (
        <div className="modal-overlay-light" onClick={e=>e.target===e.currentTarget&&setViewEvent(null)}>
          <div className="modal-light" style={{maxWidth:520}}>
            {viewEvent.image_url&&<img src={viewEvent.image_url} alt={viewEvent.title} style={{width:"100%",height:180,objectFit:"cover",borderRadius:10,marginBottom:16}} onError={e=>e.target.style.display="none"}/>}
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
              <span style={{background:`${C.blue}15`,color:C.blue,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>📅 {viewEvent.date}{viewEvent.time&&` · ${viewEvent.time.slice(0,5)}`}</span>
              {viewEvent.area&&<span style={{background:`${C.green}15`,color:C.green,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>🏢 {viewEvent.area}</span>}
            </div>
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:20,fontWeight:700,color:"#1a1a2e",marginBottom:10}}>{viewEvent.title}</div>
            {viewEvent.description&&<div style={{fontSize:14,color:"#666",lineHeight:1.7,marginBottom:14}}>{viewEvent.description}</div>}
            {viewEvent.location&&<div style={{fontSize:13,color:"#555",marginBottom:8}}>📍 <strong>Lugar:</strong> {viewEvent.location}</div>}
            {viewEvent.maps_url&&<a href={viewEvent.maps_url} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",background:`${C.blue}15`,color:C.blue,borderRadius:8,fontSize:13,textDecoration:"none",marginTop:4}}>🗺️ Ver en Google Maps</a>}
            <div style={{marginTop:16,textAlign:"right"}}><button className="btn-portal btn-portal-ghost" onClick={()=>setViewEvent(null)}>Cerrar</button></div>
          </div>
        </div>
      )}

      {selectedAnn && (
        <div className="modal-overlay-light" onClick={e=>e.target===e.currentTarget&&setSelectedAnn(null)}>
          <div className="modal-light">
            {selectedAnn.image_url&&<img src={selectedAnn.image_url} alt={selectedAnn.title} style={{width:"100%",height:180,objectFit:"cover",borderRadius:10,marginBottom:16}} onError={e=>e.target.style.display="none"}/>}
            <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
              <span style={{background:priorityConfig[selectedAnn.priority]?.bg,color:priorityConfig[selectedAnn.priority]?.color,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>{priorityConfig[selectedAnn.priority]?.label}</span>
              {selectedAnn.area&&<span style={{background:`${C.green}15`,color:C.green,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>🏢 {selectedAnn.area}</span>}
            </div>
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:20,fontWeight:700,color:"#1a1a2e",marginBottom:12}}>{selectedAnn.title}</div>
            <div style={{fontSize:14,color:"#555",lineHeight:1.8,marginBottom:16,whiteSpace:"pre-wrap"}}>{selectedAnn.content}</div>
            <div style={{fontSize:12,color:"#aaa",borderTop:"1px solid #eee",paddingTop:12}}>Por {selectedAnn.created_by_name} · Vence: {new Date(selectedAnn.expires_at).toLocaleString("es")}</div>
            <div style={{marginTop:16,textAlign:"right"}}><button className="btn-portal btn-portal-ghost" onClick={()=>setSelectedAnn(null)}>Cerrar</button></div>
          </div>
        </div>
      )}

      {viewItem && (
        <div className="modal-overlay-light" onClick={e=>e.target===e.currentTarget&&setViewItem(null)}>
          <div className="modal-light" style={{maxWidth:640}}>
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700,color:"#1a1a2e",marginBottom:14}}>{viewItem.title}</div>
            {viewItem.type==="foto"
              ? <img src={viewItem.url} alt={viewItem.title} style={{width:"100%",borderRadius:10,maxHeight:400,objectFit:"contain",background:"#f5f5f5"}}/>
              : <video src={viewItem.url} controls style={{width:"100%",borderRadius:10,maxHeight:360}}/>
            }
            <div style={{marginTop:10,fontSize:12,color:"#aaa"}}>Subido por {viewItem.uploaded_by_name} · {new Date(viewItem.created_at).toLocaleDateString("es")}</div>
            <div style={{marginTop:14,textAlign:"right"}}><button className="btn-portal btn-portal-ghost" onClick={()=>setViewItem(null)}>Cerrar</button></div>
          </div>
        </div>
      )}

      {showNewFolder && (
        <div className="modal-overlay-light" onClick={e=>e.target===e.currentTarget&&setShowNewFolder(false)}>
          <div className="modal-light" style={{maxWidth:400}}>
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700,color:"#1a1a2e",marginBottom:8}}>
              {activeFolder&&!activeFolder.includes("/")?"📂 Nueva Subcarpeta":"📁 Nueva Carpeta"}
            </div>
            {activeFolder&&!activeFolder.includes("/")&&<div style={{fontSize:12,color:"#888",marginBottom:14}}>Se creará dentro de: <strong>{activeFolder}</strong></div>}
            <div className="field-light" style={{marginBottom:16}}>
              <label>{activeFolder&&!activeFolder.includes("/")?"Nombre de la subcarpeta":"Nombre de la carpeta"}</label>
              <input type="text" placeholder={activeFolder&&!activeFolder.includes("/")?"Ej: Fotos del evento":"Ej: Apertura Panajachel"} value={newFolderName} onChange={e=>setNewFolderName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&createFolder()}/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button className="btn-portal btn-portal-ghost" onClick={()=>setShowNewFolder(false)}>Cancelar</button>
              <button className="btn-portal btn-portal-blue" onClick={createFolder}>Crear Carpeta</button>
            </div>
          </div>
        </div>
      )}

      {showUpload && (
        <div className="modal-overlay-light" onClick={e=>e.target===e.currentTarget&&setShowUpload(false)}>
          <div className="modal-light" style={{maxWidth:480}}>
            <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:18,fontWeight:700,color:"#1a1a2e",marginBottom:16}}>📤 Subir Archivo</div>
            <div style={{marginBottom:12,padding:"8px 12px",background:`${C.blue}10`,borderRadius:8,fontSize:12,color:C.blue}}>
              Subiendo a: <strong>{activeFolder ? activeFolder.replace("/"," → ") : "General"}</strong>
            </div>
            <div className="field-light" style={{marginBottom:12}}>
              <label>Título *</label>
              <input type="text" placeholder="Describe este archivo" value={uploadForm.title} onChange={e=>setUploadForm(f=>({...f,title:e.target.value}))}/>
            </div>
            <div className="field-light" style={{marginBottom:12}}>
              <label>Tipo</label>
              <select value={uploadForm.type} onChange={e=>setUploadForm(f=>({...f,type:e.target.value,file:null}))}>
                <option value="foto">📷 Foto</option>
                <option value="video">🎥 Video</option>
              </select>
            </div>
            <div className="field-light" style={{marginBottom:12}}>
              <label>{uploadForm.type==="foto"?"Imagen (JPG, PNG — máx 10MB)":"Video (MP4, MOV — máx 50MB)"}</label>
              <label className="upload-zone-light" style={{display:"block"}}>
                <input type="file" accept={uploadForm.type==="foto"?"image/*":"video/*"} style={{display:"none"}} onChange={e=>setUploadForm(f=>({...f,file:e.target.files[0]}))}/>
                <div style={{fontSize:28,marginBottom:8}}>{uploadForm.file?"✅":uploadForm.type==="foto"?"📷":"🎥"}</div>
                <div style={{fontSize:13,color:"#888"}}>{uploadForm.file?uploadForm.file.name:"Clic para seleccionar"}</div>
              </label>
            </div>
            <div style={{fontSize:11,color:"#f7921d",padding:"8px 12px",background:"#f7921d10",borderRadius:8,marginBottom:16}}>
              ⚠️ Archivos permanentes — no se pueden eliminar después de subir
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button className="btn-portal btn-portal-ghost" onClick={()=>setShowUpload(false)}>Cancelar</button>
              <button className="btn-portal btn-portal-blue" onClick={handleUpload} disabled={uploading}>{uploading?"Subiendo…":"Subir Archivo"}</button>
            </div>
          </div>
        </div>
      )}

      {upToast && <Toast key={upToast.key} msg={upToast.msg} type={upToast.type} onClose={()=>setUpToast(null)}/>}
    </div>
    </>
  );
}


export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [logoUrl, setLogoUrl] = useState(LOGO_URL);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuestRoute, setIsGuestRoute] = useState(false);

  const showToast = (msg, type="info") => setToast({ msg, type, key: Date.now() });

  // ── Detección de ruta guest ──
  useEffect(() => {
    const checkHash = () => setIsGuestRoute(window.location.hash === "#/guest");
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        if (profile && profile.active) setUser(profile);
        else await supabase.auth.signOut();
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").then(({ data }) => { if (data) setUsers(data); });
  }, [user]);

  const logout = async () => { await supabase.auth.signOut(); setUser(null); setPage("dashboard"); setUsers([]); };

  const pageTitle = { dashboard:"Dashboard", users:"Usuarios", settings:"Configuración", announcements:"Anuncios", events:"Eventos", processes:"Procesos", gallery:"Galería" };

  const renderPage = () => {
    switch(page) {
      case "dashboard":     return <Dashboard users={users}/>;
      case "users":         return <UserManagement users={users} setUsers={setUsers} showToast={showToast} currentUser={user}/>;
      case "settings":      return <Settings logoUrl={logoUrl} setLogoUrl={setLogoUrl} showToast={showToast}/>;
      case "announcements": return <AnnouncementsModule currentUser={user}/>;
      case "events":        return <EventsModule currentUser={user}/>;
      case "processes":     return <PlaceholderModule icon="📋" name="Procesos y Documentos" desc="Centraliza manuales y procedimientos oficiales de GTA."/>;
      case "gallery":       return <GalleryModule currentUser={user}/>;
      default: return null;
    }
  };

  // ── Si es ruta guest, mostrar portal público directamente ──
  if (isGuestRoute) return <GuestPortal />;

  if (loading) return (
    <><style>{css}</style>
    <div className="loading-screen">
      <div className="spinner"/>
      <div style={{color:C.muted,fontSize:14}}>Cargando SomosGTA…</div>
    </div></>
  );

  if (!user) return <><style>{css}</style><LoginPage onLogin={setUser} logoUrl={logoUrl}/></>;
  if (user.role === "empleado") return <EmployeePortal user={user} />;

  return (
    <><style>{css}</style>
    <div className="app">
      <Sidebar user={user} active={page} setActive={setPage} onLogout={logout} logoUrl={logoUrl}/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">{pageTitle[page]}</div>
          <div className="topbar-actions">
            <span style={{fontSize:13,color:C.muted}}>Bienvenido, <strong style={{color:C.text}}>{user.name.split(" ")[0]}</strong></span>
          </div>
        </div>
        <div className="content">{renderPage()}</div>
      </div>
    </div>
    {toast && <Toast key={toast.key} msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </>
  );
}
