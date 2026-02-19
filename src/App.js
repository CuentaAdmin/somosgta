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
  .brand-logo { width: 48px; height: 48px; border-radius: 10px; background: linear-gradient(135deg, ${C.orange}, ${C.yellow}); display: flex; align-items: center; justify-content: center; font-family: 'Exo 2', sans-serif; font-weight: 900; font-size: 20px; color: #fff; overflow: hidden; }
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
  .sidebar-logo { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, ${C.orange}, ${C.yellow}); display: flex; align-items: center; justify-content: center; font-family: 'Exo 2', sans-serif; font-weight: 900; font-size: 14px; color: #fff; overflow: hidden; flex-shrink: 0; }
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

function Logo({ url, size=36 }) {
  return (
    <div className="sidebar-logo" style={{ width:size, height:size, fontSize:size*0.38 }}>
      {url ? <img src={url} alt="GTA" /> : "GTA"}
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
          <Logo url={logoUrl} size={48} />
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
        <Logo url={logoUrl} size={36} />
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
            {isSA && <>
              <button className="btn-sm btn-ghost" onClick={()=>setShowCsv(true)}>📂 CSV Masivo</button>
              <button className="btn-sm btn-blue" onClick={()=>setShowCreate(true)}>+ Nuevo Usuario</button>
            </>}
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
              <select value={newUser.role} onChange={e=>setNewUser(u=>({...u,role:e.target.value}))}>
                <option value="empleado">Empleado</option>
                <option value="admin">Admin de Área</option>
                <option value="superadmin">Superadmin</option>
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
  const save = () => { setLogoUrl(inputUrl); showToast("Logo actualizado","success"); };
  return (
    <div>
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
        <button className="btn-sm btn-blue" onClick={save}>💾 Guardar Logo</button>
      </div>
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


// ── GALERÍA ──────────────────────────────────────────────────
function GalleryModule({ currentUser }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [galToast, setGalToast] = useState(null);
  const [form, setForm] = useState({ title:"", type:"foto", file:null });

  const showGalToast = (msg, type="info") => setGalToast({ msg, type, key: Date.now() });

  useEffect(() => {
    supabase.from("gallery").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setItems(data);
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
    let url = "";
    if (form.type === "foto" || form.type === "video") {
      const ext = form.file.name.split(".").pop();
      const filename = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("gallery").upload(filename, form.file);
      if (uploadError) { showGalToast("Error al subir archivo: " + uploadError.message,"error"); setUploading(false); return; }
      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filename);
      url = urlData.publicUrl;
    }
    const { data, error } = await supabase.from("gallery").insert({
      title: form.title, type: form.type, url,
      uploaded_by: currentUser.id, uploaded_by_name: currentUser.name
    }).select().single();
    if (error) { showGalToast("Error al guardar: " + error.message,"error"); setUploading(false); return; }
    setItems(i => [data, ...i]);
    showGalToast("Archivo subido correctamente","success");
    setShowForm(false);
    setForm({ title:"", type:"foto", file:null });
    setUploading(false);
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
          <button className="btn-sm btn-blue" onClick={()=>setShowForm(true)}>+ Subir</button>
        </div>
      </div>

      {loading && <div style={{textAlign:"center",padding:40,color:C.muted}}>Cargando galería…</div>}

      {!loading && Object.keys(grouped).length === 0 && (
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
            <div style={{marginTop:8,fontSize:11,color:C.muted,fontStyle:"italic"}}>🔒 Este archivo es permanente y no puede ser eliminado</div>
            <div className="modal-actions"><button className="btn-sm btn-ghost" onClick={()=>setSelected(null)}>Cerrar</button></div>
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

export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [logoUrl, setLogoUrl] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const showToast = (msg, type="info") => setToast({ msg, type, key: Date.now() });

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
      case "announcements": return <PlaceholderModule icon="📢" name="Anuncios y Comunicados" desc="Publica noticias y comunicados oficiales de GTA."/>;
      case "events":        return <EventsModule currentUser={user}/>;
      case "processes":     return <PlaceholderModule icon="📋" name="Procesos y Documentos" desc="Centraliza manuales y procedimientos oficiales de GTA."/>;
      case "gallery":       return <GalleryModule currentUser={user}/>;
      default: return null;
    }
  };

  if (loading) return (
    <><style>{css}</style>
    <div className="loading-screen">
      <div className="spinner"/>
      <div style={{color:C.muted,fontSize:14}}>Cargando SomosGTA…</div>
    </div></>
  );

  if (!user) return <><style>{css}</style><LoginPage onLogin={setUser} logoUrl={logoUrl}/></>;

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
