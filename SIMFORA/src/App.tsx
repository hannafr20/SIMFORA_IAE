import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { 
  CalendarDays, Dumbbell, AlertTriangle, Menu, X, LogIn, LogOut, User, 
  Lock, Mail, ChevronRight, ShieldCheck, CheckCircle, XCircle, Clock, 
  Search, Plus, Trash2, Edit3, Settings, LayoutDashboard, Database, 
  Flag, Ban, Users, BarChart3, HardHat, Info, HelpCircle
} from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DBProvider, useDB } from './context/DatabaseContext';
import './index.css';

// --- REUSABLE MODAL COMPONENT ---
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup"><X size={20} /></button>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ width: '42px', height: '42px', background: 'var(--primary-red)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-red)' }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '1.4rem', fontFamily: 'Outfit' }}>S</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.5px', color: '#FFFFFF', fontFamily: 'Outfit' }}>SIMFORA</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.95rem' }}>Beranda</Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>
                <User size={18} color="var(--primary-red)" />
                {user.name.split(' ')[0]}
              </span>
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Dashboard</Link>
              <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#FCA5A5' }} title="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Masuk</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Daftar SSO</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- LANDING PAGE ---
const LandingPage = () => {
  return (
    <div className="animate-in">
      <div className="hero-wrapper">
        <div className="container">
          <span className="brand-badge">Official Telkom University Portal</span>
          <h1 className="hero-title">Sistem Manajemen Fasilitas &<br />Inventaris Olahraga Kampus</h1>
          <p className="hero-subtitle">
            Rasakan kemudahan reservasi lapangan secara real-time, peminjaman alat olahraga terintegrasi, dan pelaporan kerusakan terpadu dalam satu platform komersial premium.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
             <Link to="/register" className="btn btn-primary">Mulai Sekarang <ChevronRight size={16} /></Link>
             <Link to="/login" className="btn btn-outline">Masuk ke SIMFORA</Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '6rem' }}>
        {/* Statistics section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '-3rem', marginBottom: '5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-red-accent)', marginBottom: '0.25rem' }}>3+</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Lapangan Premium</p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-red-accent)', marginBottom: '0.25rem' }}>100+</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Peralatan Olahraga Ready</p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-red-accent)', marginBottom: '0.25rem' }}>24/7</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Sistem Monitoring Aktif</p>
          </div>
        </div>

        {/* Features list */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Fitur Layanan Utama</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Nikmati kenyamanan berolahraga dengan integrasi sistem mutakhir untuk seluruh civitas akademika.</p>
        </div>

        <div className="features-grid">
          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(198, 40, 40, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red-accent)', marginBottom: '1.5rem' }}>
              <CalendarDays size={24} />
            </div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Booking Lapangan Instan</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Pilih lapangan futsal, basket, atau tenis secara online. Kalender jadwal yang real-time mencegah bentrok pemesanan.</p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(198, 40, 40, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red-accent)', marginBottom: '1.5rem' }}>
              <Dumbbell size={24} />
            </div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Inventaris Alat Terintegrasi</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Pinjam raket, bola basket, atau bola futsal. Jumlah stok terupdate otomatis sehingga ketersediaan terjamin.</p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(198, 40, 40, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red-accent)', marginBottom: '1.5rem' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Lapor Kerusakan Cepat</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Temukan kerusakan fasilitas? Laporkan langsung via dashboard. Admin akan segera memproses perbaikan secara transparan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try { 
      await login(email, password); 
      navigate('/dashboard'); 
    } catch (err: any) { 
      alert(err.message); 
    }
  };

  return (
    <div className="container" style={{ maxWidth: '480px', marginTop: '5rem', paddingBottom: '6rem' }}>
      <div className="glass-card animate-in" style={{ padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Selamat Datang</h2>
          <p style={{ color: 'var(--text-muted)' }}>Login SSO SIMFORA Telkom University</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email SSO</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: '2.75rem' }} 
                placeholder="email@student.telkomuniversity.ac.id" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: '2.75rem' }} 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>
          <button className="btn btn-primary btn-block">Masuk Ke Akun</button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Belum punya akun? <Link to="/register" style={{ color: 'var(--primary-red-accent)', fontWeight: 600 }}>Daftar SSO Sekarang</Link>
        </div>
      </div>
    </div>
  );
};

// --- REGISTER PAGE ---
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try { 
      await register(name, email, password); 
      alert('Registrasi Berhasil! Silakan masuk.'); 
      navigate('/login'); 
    } catch (err: any) { 
      alert(err.message); 
    }
  };

  return (
    <div className="container" style={{ maxWidth: '480px', marginTop: '4rem', paddingBottom: '6rem' }}>
      <div className="glass-card animate-in" style={{ padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Pendaftaran Akun</h2>
          <p style={{ color: 'var(--text-muted)' }}>Gunakan Email Resmi Telkom University</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: '2.75rem' }} 
                placeholder="Nama Lengkap Anda" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Kampus</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: '2.75rem' }} 
                type="email" 
                placeholder="username@student.telkomuniversity.ac.id" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password (Min. 8 Karakter)</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: '2.75rem' }} 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                minLength={8}
                required 
              />
            </div>
          </div>
          <button className="btn btn-primary btn-block">Daftar Akun Baru</button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Sudah terdaftar? <Link to="/login" style={{ color: 'var(--primary-red-accent)', fontWeight: 600 }}>Silakan Login</Link>
        </div>
      </div>
    </div>
  );
};

// --- PROFILE SETTINGS COMPONENT ---
const ProfilView = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');

  if (!user) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('simfora_users') || '[]');
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return { ...u, name, password: password || u.password };
        }
        return u;
      });
      localStorage.setItem('simfora_users', JSON.stringify(updatedUsers));
      
      const session = JSON.parse(localStorage.getItem('simfora_session') || '{}');
      session.name = name;
      localStorage.setItem('simfora_session', JSON.stringify(session));
      
      alert('Profil berhasil diperbarui!');
      window.location.reload();
    } catch {
      alert('Gagal memperbarui profil.');
    }
  };

  return (
    <div className="animate-in" style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Pengaturan Profil</h2>
        <p style={{ color: 'var(--text-muted)' }}>Kelola data login dan detail identitas Anda.</p>
      </div>

      <div className="glass-card">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Email (SSO Telkom)</label>
            <input className="form-input" value={user.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}/>
          </div>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input className="form-input" value={name} onChange={e => setName(e.target.value)} required/>
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Ganti Password (Opsional)</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Kosongkan jika tidak ingin ganti" minLength={8}/>
          </div>
          <button className="btn btn-primary">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// ============ STUDENT DASHBOARD ============
// ==========================================
type StudentTabs = 'OVERVIEW' | 'RESERVASI' | 'PEMINJAMAN' | 'LAPORAN' | 'PROFIL';

const MahasiswaDashboard = ({ currentTab, setTab }: { currentTab: StudentTabs, setTab: (t: StudentTabs) => void }) => {
  const { user } = useAuth();
  const { 
    lapangan, alat, reservasi, peminjaman, laporan, jadwalBlokir, 
    addReservasi, addPeminjaman, addLaporan, 
    updateReservasiTime, deleteReservasi, updateReservasiStatus,
    updatePeminjamanContent, deletePeminjaman, 
    deleteLaporan, updateLaporanContent 
  } = useDB();

  // Modals state
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [isPinjamModalOpen, setIsPinjamModalOpen] = useState(false);
  const [isLaporModalOpen, setIsLaporModalOpen] = useState(false);

  // Forms state
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [resLap, setResLap] = useState('');
  const [editReservasiId, setEditReservasiId] = useState<string | null>(null);

  const [pinjamAlat, setPinjamAlat] = useState('');
  const [pinjamReturn, setPinjamReturn] = useState('');
  const [editPeminjamanId, setEditPeminjamanId] = useState<string | null>(null);

  const [laporLoc, setLaporLoc] = useState('');
  const [laporDesc, setLaporDesc] = useState('');
  const [editLaporanId, setEditLaporanId] = useState<string | null>(null);

  // User-specific data lists
  const myReservasi = reservasi.filter(r => r.user_id === user?.id);
  const myPeminjaman = peminjaman.filter(p => p.user_id === user?.id);
  const myLaporan = laporan.filter(l => l.user_id === user?.id);

  // Handlers
  const handleReservasiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reqDateTime = new Date(`${resDate}T${resTime}`);
    if (reqDateTime <= new Date()) return alert('Tidak bisa mengajukan jadwal di masa lalu!');
    
    const isConflict = reservasi.some(r => r.lapangan_id === resLap && r.date === resDate && r.start_time === resTime && r.status === 'APPROVED' && r.id !== editReservasiId);
    if (isConflict) return alert('Jadwal bentrok! Lapangan sudah dipesan pada waktu tersebut.');
    
    const isBlocked = jadwalBlokir.some(j => j.lapangan_id === resLap && j.date === resDate && resTime >= j.start_time && resTime <= j.end_time);
    if (isBlocked) return alert('Lapangan sedang diblokir untuk Event Kampus pada waktu tersebut!');
    
    if (editReservasiId) {
      updateReservasiTime(editReservasiId, resDate, resTime);
      alert('Reservasi berhasil diupdate!');
      setEditReservasiId(null);
    } else {
      addReservasi({ user_id: user!.id, lapangan_id: resLap, date: resDate, start_time: resTime, end_time: resTime });
      alert('Reservasi diajukan! Menunggu persetujuan admin.');
    }
    setResDate(''); setResTime(''); setResLap('');
    setIsResModalOpen(false);
  };

  const startEditReservasi = (r: any) => {
    setEditReservasiId(r.id);
    setResLap(r.lapangan_id);
    setResDate(r.date);
    setResTime(r.start_time);
    setIsResModalOpen(true);
  };

  const handlePinjamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(pinjamReturn) <= new Date()) return alert('Batas kembali harus di masa depan!');
    
    if (editPeminjamanId) {
      updatePeminjamanContent(editPeminjamanId, pinjamAlat, pinjamReturn);
      alert('Peminjaman berhasil diupdate!');
      setEditPeminjamanId(null);
    } else {
      addPeminjaman({ user_id: user!.id, alat_id: pinjamAlat, borrow_date: new Date().toISOString(), expected_return: pinjamReturn });
      alert('Peminjaman diajukan! Harap hubungi Logistik jika disetujui.');
    }
    setPinjamAlat(''); setPinjamReturn('');
    setIsPinjamModalOpen(false);
  };

  const startEditPeminjaman = (p: any) => {
    setEditPeminjamanId(p.id);
    setPinjamAlat(p.alat_id);
    setPinjamReturn(p.expected_return.slice(0, 16));
    setIsPinjamModalOpen(true);
  };

  const handleLaporSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editLaporanId) {
      updateLaporanContent(editLaporanId, laporLoc, laporDesc);
      alert('Laporan berhasil diperbarui!');
      setEditLaporanId(null);
    } else {
      addLaporan({ user_id: user!.id, location: laporLoc, description: laporDesc });
      alert('Laporan kerusakan dikirim! Tim sarpras akan segera memproses.');
    }
    setLaporLoc(''); setLaporDesc('');
    setIsLaporModalOpen(false);
  };

  const startEditLaporan = (l: any) => {
    setEditLaporanId(l.id);
    setLaporLoc(l.location);
    setLaporDesc(l.description);
    setIsLaporModalOpen(true);
  };

  return (
    <div className="animate-in">
      {/* 1. OVERVIEW VIEW */}
      {currentTab === 'OVERVIEW' && (
        <div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Ringkasan SIMFORA</h2>
            <p style={{ color: 'var(--text-muted)' }}>Pantau status pengajuan olahraga Anda secara cepat.</p>
          </div>

          <div className="stats-grid">
            <div className="stats-card" onClick={() => setTab('RESERVASI')} style={{ cursor: 'pointer' }}>
              <div className="stats-icon-wrapper"><CalendarDays size={24} /></div>
              <div>
                <div className="stats-number">{myReservasi.length}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Total Reservasi</div>
              </div>
            </div>
            <div className="stats-card" onClick={() => setTab('PEMINJAMAN')} style={{ cursor: 'pointer' }}>
              <div className="stats-icon-wrapper"><Dumbbell size={24} /></div>
              <div>
                <div className="stats-number">{myPeminjaman.length}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Peminjaman Alat</div>
              </div>
            </div>
            <div className="stats-card" onClick={() => setTab('LAPORAN')} style={{ cursor: 'pointer' }}>
              <div className="stats-icon-wrapper"><AlertTriangle size={24} /></div>
              <div>
                <div className="stats-number">{myLaporan.length}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Laporan Kerusakan</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} color="var(--primary-red-accent)" /> Reservasi Terbaru</h3>
              {myReservasi.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Belum ada pengajuan reservasi.</p>
              ) : (
                <div className="premium-table-wrapper">
                  <table className="premium-table">
                    <thead>
                      <tr>
                        <th>Lapangan</th>
                        <th>Tanggal</th>
                        <th>Jam</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myReservasi.slice(0, 3).map(r => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 600 }}>{lapangan.find(l => l.id === r.lapangan_id)?.name || r.lapangan_id}</td>
                          <td>{r.date}</td>
                          <td>{r.start_time}</td>
                          <td>
                            <span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Ban size={18} color="var(--primary-red-accent)" /> Event Kampus / Blokir</h3>
              {jadwalBlokir.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tidak ada lapangan terblokir saat ini.</p>
              ) : (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {jadwalBlokir.slice(0, 3).map(j => (
                    <li key={j.id} style={{ background: 'var(--bg-secondary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary-red)' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF' }}>{j.event_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {lapangan.find(l => l.id === j.lapangan_id)?.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--primary-red-accent)', marginTop: '0.15rem', fontWeight: 600 }}>
                        {j.date} | {j.start_time} - {j.end_time}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. RESERVASI TAB */}
      {currentTab === 'RESERVASI' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Reservasi Lapangan</h2>
              <p style={{ color: 'var(--text-muted)' }}>Ajukan pemesanan jadwal lapangan olahraga kampus.</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setEditReservasiId(null); setIsResModalOpen(true); }}><Plus size={18} /> Booking Baru</button>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Lapangan</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {myReservasi.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada histori reservasi.</td>
                    </tr>
                  ) : (
                    myReservasi.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600 }}>{lapangan.find(l => l.id === r.lapangan_id)?.name || r.lapangan_id}</td>
                        <td>{r.date}</td>
                        <td>{r.start_time}</td>
                        <td>
                          <span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {r.status === 'PENDING' && (
                              <>
                                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => startEditReservasi(r)}><Edit3 size={14} /> Edit</button>
                                <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => updateReservasiStatus(r.id, 'CANCELLED')}>Batalkan</button>
                              </>
                            )}
                            {(r.status === 'CANCELLED' || r.status === 'REJECTED' || r.status === 'APPROVED') && (
                              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteReservasi(r.id)}><Trash2 size={14} /> Hapus</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Booking Modal */}
          <Modal isOpen={isResModalOpen} onClose={() => setIsResModalOpen(false)} title={editReservasiId ? 'Reschedule Reservasi' : 'Booking Lapangan'}>
            <form onSubmit={handleReservasiSubmit}>
              <div className="form-group">
                <label className="form-label">Lapangan Olahraga</label>
                <select className="form-input" value={resLap} onChange={e => setResLap(e.target.value)} disabled={!!editReservasiId} required>
                  <option value="">-- Pilih Lapangan --</option>
                  {lapangan.filter(l => l.status === 'AVAILABLE' || editReservasiId).map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal Bermain</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={resDate} 
                  onChange={e => setResDate(e.target.value)} 
                  min={new Date().toISOString().split('T')[0]}
                  required 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Jam Mulai</label>
                <input type="time" className="form-input" value={resTime} onChange={e => setResTime(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsResModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">{editReservasiId ? 'Simpan Reschedule' : 'Konfirmasi Booking'}</button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* 3. PEMINJAMAN TAB */}
      {currentTab === 'PEMINJAMAN' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Peminjaman Alat</h2>
              <p style={{ color: 'var(--text-muted)' }}>Pinjam inventaris alat olahraga kampus.</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setEditPeminjamanId(null); setIsPinjamModalOpen(true); }}><Plus size={18} /> Pinjam Alat</button>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Alat Olahraga</th>
                    <th>Status</th>
                    <th>Batas Pengembalian</th>
                    <th>Denda</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {myPeminjaman.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada histori peminjaman.</td>
                    </tr>
                  ) : (
                    myPeminjaman.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{alat.find(a => a.id === p.alat_id)?.name || p.alat_id}</td>
                        <td>
                          <span className={`badge badge-${p.status === 'BORROWED' ? 'approved' : p.status === 'RETURNED' ? 'resolved' : 'pending'}`}>{p.status}</span>
                        </td>
                        <td>{new Date(p.expected_return).toLocaleString()}</td>
                        <td style={{ color: p.penalty > 0 ? 'var(--color-rejected)' : 'var(--text-main)', fontWeight: 600 }}>
                          {p.penalty > 0 ? `Rp ${p.penalty.toLocaleString()}` : '-'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {p.status === 'PENDING' && (
                              <>
                                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => startEditPeminjaman(p)}><Edit3 size={14} /> Edit</button>
                              </>
                            )}
                            {p.status === 'RETURNED' && (
                              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deletePeminjaman(p.id)}><Trash2 size={14} /> Hapus</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Borrow Modal */}
          <Modal isOpen={isPinjamModalOpen} onClose={() => setIsPinjamModalOpen(false)} title={editPeminjamanId ? 'Edit Pengajuan Alat' : 'Pinjam Alat Olahraga'}>
            <form onSubmit={handlePinjamSubmit}>
              <div className="form-group">
                <label className="form-label">Pilih Alat</label>
                <select className="form-input" value={pinjamAlat} onChange={e => setPinjamAlat(e.target.value)} required>
                  <option value="">-- Pilih Alat --</option>
                  {alat.map(a => (
                    <option key={a.id} value={a.id} disabled={a.available_stock <= 0}>{a.name} (Tersedia: {a.available_stock})</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Tanggal & Jam Pengembalian</label>
                <input 
                  type="datetime-local" 
                  className="form-input" 
                  value={pinjamReturn} 
                  onChange={e => setPinjamReturn(e.target.value)} 
                  min={new Date().toISOString().slice(0, 16)}
                  required 
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsPinjamModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">{editPeminjamanId ? 'Simpan Perubahan' : 'Kirim Ajuan Peminjaman'}</button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* 4. LAPORAN TAB */}
      {currentTab === 'LAPORAN' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Lapor Kerusakan</h2>
              <p style={{ color: 'var(--text-muted)' }}>Laporkan sarana olahraga kampus yang rusak / perlu perbaikan.</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setEditLaporanId(null); setIsLaporModalOpen(true); }}><Plus size={18} /> Buat Laporan</button>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Lokasi</th>
                    <th>Deskripsi Kerusakan</th>
                    <th>Status Laporan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {myLaporan.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada histori laporan.</td>
                    </tr>
                  ) : (
                    myLaporan.map(l => (
                      <tr key={l.id}>
                        <td style={{ fontWeight: 600 }}>{l.location}</td>
                        <td>{l.description}</td>
                        <td>
                          <span className={`badge badge-${l.status.toLowerCase()}`}>{l.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {l.status === 'WAITING' && (
                              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => startEditLaporan(l)}><Edit3 size={14} /> Edit</button>
                            )}
                            {l.status === 'RESOLVED' && (
                              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteLaporan(l.id)}><Trash2 size={14} /> Hapus</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Laporan Modal */}
          <Modal isOpen={isLaporModalOpen} onClose={() => setIsLaporModalOpen(false)} title={editLaporanId ? 'Edit Laporan Kerusakan' : 'Lapor Kerusakan Baru'}>
            <form onSubmit={handleLaporSubmit}>
              <div className="form-group">
                <label className="form-label">Lokasi Detail</label>
                <input className="form-input" placeholder="Contoh: Tiang Net Tenis GKU lantai 1" value={laporLoc} onChange={e => setLaporLoc(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Keterangan / Deskripsi Kerusakan</label>
                <textarea className="form-input" style={{ minHeight: '120px' }} placeholder="Jelaskan secara rinci kerusakan yang terjadi..." value={laporDesc} onChange={e => setLaporDesc(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsLaporModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">{editLaporanId ? 'Simpan Laporan' : 'Kirim Laporan'}</button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* 5. PROFIL TAB */}
      {currentTab === 'PROFIL' && <ProfilView />}
    </div>
  );
};

// ==========================================
// ============= ADMIN DASHBOARD ============
// ==========================================
type AdminTabs = 'OVERVIEW' | 'PERSETUJUAN_RES' | 'LOG_PINJAM' | 'LAPORAN_MASUK' | 'KELOLA_LAPANGAN' | 'KELOLA_INVENTARIS' | 'JADWAL_BLOKIR' | 'PROFIL';

const AdminDashboard = ({ currentTab, setTab }: { currentTab: AdminTabs, setTab: (t: AdminTabs) => void }) => {
  const { 
    lapangan, reservasi, peminjaman, laporan, alat, jadwalBlokir, 
    updateReservasiStatus, updatePeminjamanStatus, updateLaporanStatus, 
    addAlat, updateAlat, deleteAlat, 
    addJadwalBlokir, updateJadwalBlokir, deleteJadwalBlokir,
    addLapangan, updateLapangan, deleteLapangan,
    deleteReservasi, deletePeminjaman, deleteLaporan
  } = useDB();

  // Modals state
  const [isAlatModalOpen, setIsAlatModalOpen] = useState(false);
  const [isBlokirModalOpen, setIsBlokirModalOpen] = useState(false);
  const [isLapanganModalOpen, setIsLapanganModalOpen] = useState(false);

  // Helper to fetch user full name based on ID
  const getUserName = (id: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('simfora_users') || '[]');
      const targetUser = users.find((u: any) => u.id === id);
      return targetUser ? targetUser.name : 'User (' + id.slice(-4) + ')';
    } catch { 
      return id; 
    }
  };

  // Inventaris State
  const [newAlat, setNewAlat] = useState({ id: '', code: '', name: '', total_stock: '' as string | number, condition: 'GOOD' as 'GOOD'|'DAMAGED' });
  const [isEditingAlat, setIsEditingAlat] = useState(false);

  // Blokir State
  const [newBlokir, setNewBlokir] = useState({ id: '', lapangan_id: '', date: '', start_time: '', end_time: '', event_name: '' });
  const [isEditingBlokir, setIsEditingBlokir] = useState(false);

  // Lapangan State
  const [newLapangan, setNewLapangan] = useState({ id: '', name: '', description: '', status: 'AVAILABLE' as 'AVAILABLE'|'MAINTENANCE' });
  const [isEditingLapangan, setIsEditingLapangan] = useState(false);

  // Handlers for Inventaris
  const handleAlatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlat.code || !newAlat.name || Number(newAlat.total_stock) <= 0) return alert('Data tidak valid');
    
    if (isEditingAlat && newAlat.id) {
      updateAlat(newAlat.id, { code: newAlat.code, name: newAlat.name, total_stock: Number(newAlat.total_stock), condition: newAlat.condition });
      alert('Alat berhasil diperbarui!');
    } else {
      addAlat({ code: newAlat.code, name: newAlat.name, total_stock: Number(newAlat.total_stock), condition: newAlat.condition });
      alert('Alat baru berhasil didaftarkan ke Inventaris!');
    }
    setNewAlat({ id: '', code: '', name: '', total_stock: '', condition: 'GOOD' });
    setIsEditingAlat(false);
    setIsAlatModalOpen(false);
  };

  const startEditAlat = (a: any) => {
    setIsEditingAlat(true);
    setNewAlat({ id: a.id, code: a.code, name: a.name, total_stock: a.total_stock, condition: a.condition });
    setIsAlatModalOpen(true);
  };

  // Handlers for Lapangan
  const handleLapanganSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLapangan.name) return alert('Nama lapangan wajib diisi');
    
    if (isEditingLapangan && newLapangan.id) {
      updateLapangan(newLapangan.id, { name: newLapangan.name, description: newLapangan.description, status: newLapangan.status });
      alert('Lapangan berhasil diperbarui!');
    } else {
      addLapangan({ name: newLapangan.name, description: newLapangan.description, status: newLapangan.status });
      alert('Lapangan baru berhasil didaftarkan!');
    }
    setNewLapangan({ id: '', name: '', description: '', status: 'AVAILABLE' });
    setIsEditingLapangan(false);
    setIsLapanganModalOpen(false);
  };

  const startEditLapangan = (l: any) => {
    setIsEditingLapangan(true);
    setNewLapangan({ id: l.id, name: l.name, description: l.description, status: l.status });
    setIsLapanganModalOpen(true);
  };

  // Handlers for Blokir
  const handleBlokirSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlokir.end_time <= newBlokir.start_time) return alert('Waktu selesai harus lebih besar dari waktu mulai!');
    
    if (isEditingBlokir && newBlokir.id) {
      updateJadwalBlokir(newBlokir.id, { lapangan_id: newBlokir.lapangan_id, date: newBlokir.date, start_time: newBlokir.start_time, end_time: newBlokir.end_time, event_name: newBlokir.event_name });
      alert('Jadwal blokir diperbarui!');
    } else {
      addJadwalBlokir(newBlokir);
      alert('Lapangan berhasil diblokir untuk event!');
    }
    setNewBlokir({ id: '', lapangan_id: '', date: '', start_time: '', end_time: '', event_name: '' });
    setIsEditingBlokir(false);
    setIsBlokirModalOpen(false);
  };

  const startEditBlokir = (j: any) => {
    setIsEditingBlokir(true);
    setNewBlokir({ id: j.id, lapangan_id: j.lapangan_id, date: j.date, start_time: j.start_time, end_time: j.end_time, event_name: j.event_name });
    setIsBlokirModalOpen(true);
  };

  const totalUsers = (() => {
    try {
      return JSON.parse(localStorage.getItem('simfora_users') || '[]').length;
    } catch {
      return 0;
    }
  })();

  const pendingReservations = reservasi.filter(r => r.status === 'PENDING').length;
  const activeRentals = peminjaman.filter(p => p.status === 'BORROWED').length;
  const activeReports = laporan.filter(l => l.status !== 'RESOLVED').length;

  return (
    <div className="animate-in">
      {/* 1. OVERVIEW VIEW */}
      {currentTab === 'OVERVIEW' && (
        <div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Ringkasan Admin</h2>
            <p style={{ color: 'var(--text-muted)' }}>Status operasional sistem SIMFORA Telkom University.</p>
          </div>

          <div className="stats-grid">
            <div className="stats-card" onClick={() => setTab('PERSETUJUAN_RES')} style={{ cursor: 'pointer' }}>
              <div className="stats-icon-wrapper"><CalendarDays size={24} /></div>
              <div>
                <div className="stats-number">{pendingReservations}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Persetujuan Reservasi</div>
              </div>
            </div>
            <div className="stats-card" onClick={() => setTab('LOG_PINJAM')} style={{ cursor: 'pointer' }}>
              <div className="stats-icon-wrapper"><Dumbbell size={24} /></div>
              <div>
                <div className="stats-number">{activeRentals}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Sedang Dipinjam</div>
              </div>
            </div>
            <div className="stats-card" onClick={() => setTab('LAPORAN_MASUK')} style={{ cursor: 'pointer' }}>
              <div className="stats-icon-wrapper"><AlertTriangle size={24} /></div>
              <div>
                <div className="stats-number">{activeReports}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Laporan Kerusakan</div>
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-icon-wrapper"><Users size={24} /></div>
              <div>
                <div className="stats-number">{totalUsers}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Mahasiswa Terdaftar</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} color="var(--primary-red-accent)" /> Reservasi Perlu Diproses</h3>
              {reservasi.filter(r => r.status === 'PENDING').length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Semua reservasi telah diproses.</p>
              ) : (
                <div className="premium-table-wrapper">
                  <table className="premium-table">
                    <thead>
                      <tr>
                        <th>Mahasiswa</th>
                        <th>Lapangan</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservasi.filter(r => r.status === 'PENDING').slice(0, 3).map(r => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 600 }}>{getUserName(r.user_id)}</td>
                          <td>{lapangan.find(l => l.id === r.lapangan_id)?.name || r.lapangan_id}</td>
                          <td>{r.date}</td>
                          <td>
                            <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setTab('PERSETUJUAN_RES')}>Proses</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Database size={18} color="var(--primary-red-accent)" /> Kapasitas Lapangan</h3>
              <div className="premium-table-wrapper">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Nama Lapangan</th>
                      <th>Status Ops</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lapangan.map(l => (
                      <tr key={l.id}>
                        <td style={{ fontWeight: 600 }}>{l.name}</td>
                        <td>
                          <span className={`badge ${l.status === 'AVAILABLE' ? 'badge-approved' : 'badge-rejected'}`}>
                            {l.status === 'AVAILABLE' ? 'AKTIF' : 'MAINTENANCE'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. APPROVAL RESERVASI TAB */}
      {currentTab === 'PERSETUJUAN_RES' && (
        <div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Persetujuan Reservasi Lapangan</h2>
            <p style={{ color: 'var(--text-muted)' }}>Proses persetujuan pemesanan jadwal lapangan dari mahasiswa.</p>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Mahasiswa</th>
                    <th>Lapangan</th>
                    <th>Tanggal & Waktu</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasi.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada data reservasi.</td>
                    </tr>
                  ) : (
                    reservasi.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600 }}>{getUserName(r.user_id)}</td>
                        <td>{lapangan.find(l => l.id === r.lapangan_id)?.name || r.lapangan_id}</td>
                        <td>{r.date} pada {r.start_time}</td>
                        <td>
                          <span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {r.status === 'PENDING' ? (
                              <>
                                <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#10B981', boxShadow: 'none' }} onClick={() => updateReservasiStatus(r.id, 'APPROVED')}>Setujui</button>
                                <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => updateReservasiStatus(r.id, 'REJECTED')}>Tolak</button>
                              </>
                            ) : (
                              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteReservasi(r.id)}><Trash2 size={14} /> Hapus</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. LOG PEMINJAMAN ALAT TAB */}
      {currentTab === 'LOG_PINJAM' && (
        <div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Log Peminjaman Alat</h2>
            <p style={{ color: 'var(--text-muted)' }}>Manajemen status sewa alat olahraga mahasiswa.</p>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Mahasiswa</th>
                    <th>Nama Alat</th>
                    <th>Batas Pengembalian</th>
                    <th>Status</th>
                    <th>Denda</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {peminjaman.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada data peminjaman.</td>
                    </tr>
                  ) : (
                    peminjaman.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{getUserName(p.user_id)}</td>
                        <td>{alat.find(a => a.id === p.alat_id)?.name || p.alat_id}</td>
                        <td>{new Date(p.expected_return).toLocaleString()}</td>
                        <td>
                          <span className={`badge badge-${p.status === 'BORROWED' ? 'approved' : p.status === 'RETURNED' ? 'resolved' : 'pending'}`}>{p.status}</span>
                        </td>
                        <td style={{ color: p.penalty > 0 ? 'var(--color-rejected)' : 'var(--text-main)', fontWeight: 600 }}>
                          {p.penalty > 0 ? `Rp ${p.penalty.toLocaleString()}` : '-'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {p.status === 'PENDING' && (
                              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => updatePeminjamanStatus(p.id, 'BORROWED')}>Ambil (Potong Stok)</button>
                            )}
                            {p.status === 'BORROWED' && (
                              <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => updatePeminjamanStatus(p.id, 'RETURNED')}>Kembalikan (Tambah Stok)</button>
                            )}
                            {p.status === 'RETURNED' && (
                              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deletePeminjaman(p.id)}><Trash2 size={14} /> Hapus</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. LAPORAN MASUK TAB */}
      {currentTab === 'LAPORAN_MASUK' && (
        <div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Laporan Kerusakan Masuk</h2>
            <p style={{ color: 'var(--text-muted)' }}>Proses tindak lanjut aduan kerusakan sarana prasarana.</p>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Pelapor</th>
                    <th>Lokasi</th>
                    <th>Keterangan</th>
                    <th>Status Tindakan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {laporan.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada laporan kerusakan.</td>
                    </tr>
                  ) : (
                    laporan.map(l => (
                      <tr key={l.id}>
                        <td style={{ fontWeight: 600 }}>{getUserName(l.user_id)}</td>
                        <td>{l.location}</td>
                        <td>{l.description}</td>
                        <td>
                          <span className={`badge badge-${l.status.toLowerCase()}`}>{l.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {l.status !== 'RESOLVED' ? (
                              <select 
                                className="form-input" 
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', width: '135px' }} 
                                value={l.status} 
                                onChange={e => updateLaporanStatus(l.id, e.target.value as any)}
                              >
                                <option value="WAITING">Menunggu</option>
                                <option value="PROCESSING">Diproses</option>
                                <option value="RESOLVED">Selesai</option>
                              </select>
                            ) : (
                              <>
                                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteLaporan(l.id)}><Trash2 size={14} /> Hapus</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. KELOLA LAPANGAN TAB */}
      {currentTab === 'KELOLA_LAPANGAN' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Kelola Lapangan Olahraga</h2>
              <p style={{ color: 'var(--text-muted)' }}>Daftar dan konfigurasi lapangan olahraga Telkom University.</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setIsEditingLapangan(false); setNewLapangan({ id: '', name: '', description: '', status: 'AVAILABLE' }); setIsLapanganModalOpen(true); }}><Plus size={18} /> Lapangan Baru</button>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Nama Lapangan</th>
                    <th>Keterangan</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {lapangan.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada data lapangan.</td>
                    </tr>
                  ) : (
                    lapangan.map(l => (
                      <tr key={l.id}>
                        <td style={{ fontWeight: 600 }}>{l.id}</td>
                        <td style={{ fontWeight: 600 }}>{l.name}</td>
                        <td>{l.description || '-'}</td>
                        <td>
                          <span className={`badge ${l.status === 'AVAILABLE' ? 'badge-approved' : 'badge-rejected'}`}>{l.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => startEditLapangan(l)}><Edit3 size={14} /> Edit</button>
                            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteLapangan(l.id)}><Trash2 size={14} /> Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lapangan Modal */}
          <Modal isOpen={isLapanganModalOpen} onClose={() => setIsLapanganModalOpen(false)} title={isEditingLapangan ? 'Edit Detail Lapangan' : 'Daftarkan Lapangan Baru'}>
            <form onSubmit={handleLapanganSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Lapangan</label>
                <input className="form-input" placeholder="Contoh: Lapangan Voli GKU" value={newLapangan.name} onChange={e => setNewLapangan({ ...newLapangan, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Deskripsi / Spesifikasi</label>
                <input className="form-input" placeholder="Contoh: Lapangan outdoor dengan tiang net standar" value={newLapangan.description} onChange={e => setNewLapangan({ ...newLapangan, description: e.target.value })} />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Status Operasional</label>
                <select className="form-input" value={newLapangan.status} onChange={e => setNewLapangan({ ...newLapangan, status: e.target.value as any })} required>
                  <option value="AVAILABLE">Aktif (Tersedia untuk Booking)</option>
                  <option value="MAINTENANCE">Maintenance (Diblokir Otomatis)</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsLapanganModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Lapangan</button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* 6. KELOLA INVENTARIS TAB */}
      {currentTab === 'KELOLA_INVENTARIS' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Kelola Inventaris Alat</h2>
              <p style={{ color: 'var(--text-muted)' }}>Daftar stok dan status kondisi sarana alat olahraga kampus.</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setIsEditingAlat(false); setNewAlat({ id: '', code: '', name: '', total_stock: '', condition: 'GOOD' }); setIsAlatModalOpen(true); }}><Plus size={18} /> Alat Baru</button>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Kode Alat</th>
                    <th>Nama Alat</th>
                    <th>Total Stok (Tersedia)</th>
                    <th>Kondisi Fisik</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {alat.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada data inventaris.</td>
                    </tr>
                  ) : (
                    alat.map(a => (
                      <tr key={a.id}>
                        <td style={{ fontWeight: 600 }}>{a.code}</td>
                        <td style={{ fontWeight: 600 }}>{a.name}</td>
                        <td>{a.total_stock} pcs ({a.available_stock} ready)</td>
                        <td>
                          <span className={`badge ${a.condition === 'GOOD' ? 'badge-approved' : 'badge-rejected'}`}>
                            {a.condition === 'GOOD' ? 'BAIK' : 'RUSAK'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => startEditAlat(a)}><Edit3 size={14} /> Edit</button>
                            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteAlat(a.id)}><Trash2 size={14} /> Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alat Modal */}
          <Modal isOpen={isAlatModalOpen} onClose={() => setIsAlatModalOpen(false)} title={isEditingAlat ? 'Edit Detail Inventaris' : 'Tambah Alat Olahraga Baru'}>
            <form onSubmit={handleAlatSubmit}>
              <div className="form-group">
                <label className="form-label">Kode Alat</label>
                <input className="form-input" placeholder="Contoh: BSK-002" value={newAlat.code} onChange={e => setNewAlat({ ...newAlat, code: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Nama Alat</label>
                <input className="form-input" placeholder="Contoh: Bola Basket Molten Size 7" value={newAlat.name} onChange={e => setNewAlat({ ...newAlat, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Total Stok</label>
                <input type="number" className="form-input" placeholder="Contoh: 10" value={newAlat.total_stock} onChange={e => setNewAlat({ ...newAlat, total_stock: e.target.value })} min={1} required />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Kondisi Fisik</label>
                <select className="form-input" value={newAlat.condition} onChange={e => setNewAlat({ ...newAlat, condition: e.target.value as any })} required>
                  <option value="GOOD">Kondisi Baik</option>
                  <option value="DAMAGED">Rusak</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsAlatModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Alat</button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* 7. JADWAL BLOKIR TAB */}
      {currentTab === 'JADWAL_BLOKIR' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Manajemen Blokir Lapangan</h2>
              <p style={{ color: 'var(--text-muted)' }}>Blokir jadwal lapangan untuk event resmi universitas.</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setIsEditingBlokir(false); setNewBlokir({ id: '', lapangan_id: '', date: '', start_time: '', end_time: '', event_name: '' }); setIsBlokirModalOpen(true); }}><Plus size={18} /> Blokir Jadwal</button>
          </div>

          <div className="glass-card" style={{ padding: '0' }}>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Nama Event</th>
                    <th>Lapangan</th>
                    <th>Tanggal Event</th>
                    <th>Jam Blokir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalBlokir.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Belum ada jadwal yang diblokir.</td>
                    </tr>
                  ) : (
                    jadwalBlokir.map(j => (
                      <tr key={j.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary-red-accent)' }}>{j.event_name}</td>
                        <td style={{ fontWeight: 600 }}>{lapangan.find(l => l.id === j.lapangan_id)?.name || j.lapangan_id}</td>
                        <td>{j.date}</td>
                        <td>{j.start_time} s.d {j.end_time}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => startEditBlokir(j)}><Edit3 size={14} /> Edit</button>
                            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteJadwalBlokir(j.id)}><Trash2 size={14} /> Buka Blokir</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Blokir Modal */}
          <Modal isOpen={isBlokirModalOpen} onClose={() => setIsBlokirModalOpen(false)} title={isEditingBlokir ? 'Edit Pemblokiran Jadwal' : 'Blokir Lapangan untuk Event'}>
            <form onSubmit={handleBlokirSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Event / Alasan Blokir</label>
                <input className="form-input" placeholder="Contoh: Pekan Olahraga Telkom University (PORTAL)" value={newBlokir.event_name} onChange={e => setNewBlokir({ ...newBlokir, event_name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Lapangan Terblokir</label>
                <select className="form-input" value={newBlokir.lapangan_id} onChange={e => setNewBlokir({ ...newBlokir, lapangan_id: e.target.value })} required>
                  <option value="">-- Pilih Lapangan --</option>
                  {lapangan.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal Pelaksanaan</label>
                <input type="date" className="form-input" value={newBlokir.date} onChange={e => setNewBlokir({ ...newBlokir, date: e.target.value })} required />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Jam Mulai</label>
                    <input type="time" className="form-input" value={newBlokir.start_time} onChange={e => setNewBlokir({ ...newBlokir, start_time: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Jam Selesai</label>
                    <input type="time" className="form-input" value={newBlokir.end_time} onChange={e => setNewBlokir({ ...newBlokir, end_time: e.target.value })} required />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsBlokirModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Blokir Jadwal</button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* 8. PROFIL TAB */}
      {currentTab === 'PROFIL' && <ProfilView />}
    </div>
  );
};

// --- ROUTER DECORATOR ---
const DashboardRouter = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return <Navigate to="/login" />;

  // Setup tab state
  const [studentTab, setStudentTab] = useState<StudentTabs>('OVERVIEW');
  const [adminTab, setAdminTab] = useState<AdminTabs>('OVERVIEW');

  return (
    <div className="dashboard-layout">
      {/* Sidebar Panel */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div style={{ width: '36px', height: '36px', background: 'var(--primary-red)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', fontFamily: 'Outfit' }}>S</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.5px', color: '#FFFFFF', fontFamily: 'Outfit' }}>SIMFORA PANEL</span>
        </div>

        {/* User profile snippet */}
        <div style={{ padding: '0.5rem 0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red-accent)' }}>
            <User size={20} />
          </div>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF' }}>{user.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{user.role}</div>
          </div>
        </div>

        {/* Dynamic Sidebar Links */}
        {user.role === 'ADMIN' ? (
          <>
            <div className={`sidebar-link ${adminTab === 'OVERVIEW' ? 'active' : ''}`} onClick={() => setAdminTab('OVERVIEW')}>
              <LayoutDashboard size={18} />
              Ringkasan
            </div>
            <div className={`sidebar-link ${adminTab === 'PERSETUJUAN_RES' ? 'active' : ''}`} onClick={() => setAdminTab('PERSETUJUAN_RES')}>
              <ShieldCheck size={18} />
              Persetujuan Reservasi
            </div>
            <div className={`sidebar-link ${adminTab === 'LOG_PINJAM' ? 'active' : ''}`} onClick={() => setAdminTab('LOG_PINJAM')}>
              <BarChart3 size={18} />
              Log Peminjaman
            </div>
            <div className={`sidebar-link ${adminTab === 'LAPORAN_MASUK' ? 'active' : ''}`} onClick={() => setAdminTab('LAPORAN_MASUK')}>
              <Flag size={18} />
              Laporan Kerusakan
            </div>
            <div className={`sidebar-link ${adminTab === 'KELOLA_LAPANGAN' ? 'active' : ''}`} onClick={() => setAdminTab('KELOLA_LAPANGAN')}>
              <Database size={18} />
              Kelola Lapangan
            </div>
            <div className={`sidebar-link ${adminTab === 'KELOLA_INVENTARIS' ? 'active' : ''}`} onClick={() => setAdminTab('KELOLA_INVENTARIS')}>
              <Dumbbell size={18} />
              Kelola Inventaris
            </div>
            <div className={`sidebar-link ${adminTab === 'JADWAL_BLOKIR' ? 'active' : ''}`} onClick={() => setAdminTab('JADWAL_BLOKIR')}>
              <Ban size={18} />
              Jadwal Blokir Event
            </div>
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div className={`sidebar-link ${adminTab === 'PROFIL' ? 'active' : ''}`} onClick={() => setAdminTab('PROFIL')}>
                <Settings size={18} />
                Profil Saya
              </div>
              <div className="sidebar-link" onClick={() => { logout(); navigate('/'); }} style={{ color: '#FCA5A5' }}>
                <LogOut size={18} />
                Keluar
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`sidebar-link ${studentTab === 'OVERVIEW' ? 'active' : ''}`} onClick={() => setStudentTab('OVERVIEW')}>
              <LayoutDashboard size={18} />
              Ringkasan
            </div>
            <div className={`sidebar-link ${studentTab === 'RESERVASI' ? 'active' : ''}`} onClick={() => setStudentTab('RESERVASI')}>
              <CalendarDays size={18} />
              Booking Lapangan
            </div>
            <div className={`sidebar-link ${studentTab === 'PEMINJAMAN' ? 'active' : ''}`} onClick={() => setStudentTab('PEMINJAMAN')}>
              <Dumbbell size={18} />
              Pinjam Alat
            </div>
            <div className={`sidebar-link ${studentTab === 'LAPORAN' ? 'active' : ''}`} onClick={() => setStudentTab('LAPORAN')}>
              <AlertTriangle size={18} />
              Lapor Kerusakan
            </div>
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div className={`sidebar-link ${studentTab === 'PROFIL' ? 'active' : ''}`} onClick={() => setStudentTab('PROFIL')}>
                <Settings size={18} />
                Profil Saya
              </div>
              <div className="sidebar-link" onClick={() => { logout(); navigate('/'); }} style={{ color: '#FCA5A5' }}>
                <LogOut size={18} />
                Keluar
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="content-panel">
        {user.role === 'ADMIN' ? (
          <AdminDashboard currentTab={adminTab} setTab={setAdminTab} />
        ) : (
          <MahasiswaDashboard currentTab={studentTab} setTab={setStudentTab} />
        )}
      </main>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <AuthProvider>
      <DBProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardRouter />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            
            <footer style={{ background: '#090D16', color: 'var(--text-muted)', padding: '3rem 0', borderTop: '1px solid var(--border-color)' }}>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '30px', height: '30px', background: 'var(--primary-red)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontWeight: '800', fontSize: '1rem', fontFamily: 'Outfit' }}>S</span>
                  </div>
                  <span style={{ fontWeight: '700', color: '#FFFFFF' }}>SIMFORA Telkom University</span>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  © {new Date().getFullYear()} SIMFORA. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </DBProvider>
    </AuthProvider>
  );
}

export default App;
