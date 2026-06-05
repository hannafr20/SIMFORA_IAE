import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { CalendarDays, Dumbbell, AlertTriangle, Menu, X, LogIn, LogOut, User, Lock, Mail, ChevronRight, ShieldCheck, CheckCircle, XCircle, Clock, Search, Plus, Trash2, Edit2 } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DBProvider, useDB } from './context/DatabaseContext';
import './index.css';

// --- SHARED COMPONENTS ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary-red)' }}>
          <div style={{ width: '42px', height: '42px', background: 'var(--primary-red)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(183,28,28,0.3)' }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '1.4rem' }}>S</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>SIMFORA</span>
        </Link>
        <div className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Beranda</Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
              <Link to="/profil" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <User size={18} color="var(--primary-red)" />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name.split(' ')[0]}</span>
              </Link>
              <Link to="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Dashboard</Link>
              <button onClick={() => { logout(); navigate('/'); }} className="btn" style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: 'var(--primary-red)' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
              <Link to="/login" className="btn btn-outline">Masuk</Link>
              <Link to="/register" className="btn btn-primary">Daftar SSO</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- PAGES ---
const LandingPage = () => { /* Kept simple for brevity */
  return (
    <div className="animate-in" style={{ padding: '6rem 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sistem Terpadu Manajemen Fasilitas Olahraga</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Reservasi, Peminjaman Alat, dan Laporan Kerusakan dalam 1 platform.</p>
      <div style={{ marginTop: '2rem' }}>
         <Link to="/register" className="btn btn-primary" style={{ marginRight: '1rem' }}>Mulai Sekarang</Link>
         <Link to="/login" className="btn btn-outline">Login</Link>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await login(email, password); navigate('/dashboard'); } 
    catch (err: any) { alert(err.message); }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={{ marginTop: '1rem' }}>
          <input className="form-input" style={{ marginBottom: '1rem' }} placeholder="Email (@student.telkomuniversity.ac.id)" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="form-input" style={{ marginBottom: '1rem' }} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn btn-primary btn-block">Masuk</button>
        </form>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await register(name, email, password); alert('Registrasi Berhasil!'); navigate('/login'); } 
    catch (err: any) { alert(err.message); }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2>Daftar Akun</h2>
        <form onSubmit={handleRegister} style={{ marginTop: '1rem' }}>
          <input className="form-input" style={{ marginBottom: '1rem' }} placeholder="Nama Lengkap" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="form-input" style={{ marginBottom: '1rem' }} type="email" placeholder="Email Telkom" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="form-input" style={{ marginBottom: '1rem' }} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn btn-primary btn-block">Daftar</button>
        </form>
      </div>
    </div>
  );
};

// --- DASHBOARD MAHASISWA ---
const MahasiswaDashboard = () => {
  const { user } = useAuth();
  const { lapangan, alat, reservasi, peminjaman, laporan, jadwalBlokir, addReservasi, addPeminjaman, addLaporan, updateReservasiStatus, updateReservasiTime, deleteReservasi, updatePeminjamanContent, deletePeminjaman, deleteLaporan, updateLaporanContent } = useDB();
  const [activeTab, setActiveTab] = useState<'RESERVASI' | 'ALAT' | 'LAPORAN'>('RESERVASI');
  
  // Forms state
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [resLap, setResLap] = useState('');
  
  const [pinjamAlat, setPinjamAlat] = useState('');
  const [pinjamReturn, setPinjamReturn] = useState('');
  
  const [laporLoc, setLaporLoc] = useState('');
  const [laporDesc, setLaporDesc] = useState('');
  const [editLaporanId, setEditLaporanId] = useState<string | null>(null);
  const [editReservasiId, setEditReservasiId] = useState<string | null>(null);
  const [editPeminjamanId, setEditPeminjamanId] = useState<string | null>(null);

  const myReservasi = reservasi.filter(r => r.user_id === user?.id);
  const myPeminjaman = peminjaman.filter(p => p.user_id === user?.id);
  const myLaporan = laporan.filter(l => l.user_id === user?.id);

  const handleReservasi = (e: React.FormEvent) => {
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
      alert('Reservasi diajukan!');
    }
    setResDate(''); setResTime(''); setResLap('');
  };

  const startEditReservasi = (r: any) => {
    setActiveTab('RESERVASI');
    setEditReservasiId(r.id);
    setResLap(r.lapangan_id);
    setResDate(r.date);
    setResTime(r.start_time);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePinjam = (e: React.FormEvent) => {
    e.preventDefault();
    const returnDate = new Date(pinjamReturn);
    if (returnDate <= new Date()) return alert('Batas kembali harus di masa depan!');
    
    if (editPeminjamanId) {
      updatePeminjamanContent(editPeminjamanId, pinjamAlat, pinjamReturn);
      alert('Peminjaman berhasil diupdate!');
      setEditPeminjamanId(null);
    } else {
      addPeminjaman({ user_id: user!.id, alat_id: pinjamAlat, borrow_date: new Date().toISOString(), expected_return: pinjamReturn });
      alert('Peminjaman diajukan!');
    }
    setPinjamAlat(''); setPinjamReturn('');
  };

  const startEditPeminjaman = (p: any) => {
    setActiveTab('ALAT');
    setEditPeminjamanId(p.id);
    setPinjamAlat(p.alat_id);
    setPinjamReturn(p.expected_return.slice(0, 16));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLapor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editLaporanId) {
      updateLaporanContent(editLaporanId, laporLoc, laporDesc);
      alert('Laporan diupdate!'); setEditLaporanId(null);
    } else {
      addLaporan({ user_id: user!.id, location: laporLoc, description: laporDesc });
      alert('Laporan terkirim!');
    }
    setLaporLoc(''); setLaporDesc('');
  };

  const startEditLaporan = (lap: any) => {
    setActiveTab('LAPORAN');
    setEditLaporanId(lap.id);
    setLaporLoc(lap.location);
    setLaporDesc(lap.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className={`btn ${activeTab === 'RESERVASI' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('RESERVASI')}>Reservasi Lapangan</button>
        <button className={`btn ${activeTab === 'ALAT' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('ALAT')}>Pinjam Alat</button>
        <button className={`btn ${activeTab === 'LAPORAN' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('LAPORAN')}>Lapor Kerusakan</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3>Form Pengajuan</h3>
          <hr style={{ margin: '1rem 0' }}/>
          {activeTab === 'RESERVASI' && (
            <div>
              <form onSubmit={handleReservasi}>
                <select className="form-input" style={{ marginBottom: '1rem' }} value={resLap} onChange={e=>setResLap(e.target.value)} disabled={!!editReservasiId} required>
                  <option value="">-- Pilih Lapangan --</option>
                  {lapangan.filter(l=>l.status==='AVAILABLE').map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
                <input type="date" className="form-input" style={{ marginBottom: '1rem' }} value={resDate} onChange={e=>setResDate(e.target.value)} required />
                <input type="time" className="form-input" style={{ marginBottom: '1rem' }} value={resTime} onChange={e=>setResTime(e.target.value)} required />
                <button className="btn btn-primary">{editReservasiId ? 'Simpan Perubahan' : 'Booking Lapangan'}</button>
                {editReservasiId && <button type="button" onClick={()=>{setEditReservasiId(null); setResLap(''); setResDate(''); setResTime('');}} className="btn btn-outline" style={{marginLeft: '0.5rem'}}>Batal</button>}
              </form>
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--primary-red)' }}>Info: Jadwal Sedang Diblokir (Event Kampus)</h4>
                {jadwalBlokir.length === 0 ? <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tidak ada event yang memblokir lapangan saat ini.</p> : (
                  <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', paddingLeft: '1.2rem' }}>
                    {jadwalBlokir.map(j => (
                      <li key={j.id}><strong>{lapangan.find(l=>l.id===j.lapangan_id)?.name}</strong>: {j.date} ({j.start_time} - {j.end_time}) - {j.event_name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {activeTab === 'ALAT' && (
            <form onSubmit={handlePinjam}>
              <select className="form-input" style={{ marginBottom: '1rem' }} value={pinjamAlat} onChange={e=>setPinjamAlat(e.target.value)} required>
                <option value="">-- Pilih Alat Olahraga --</option>
                {alat.map(a => <option key={a.id} value={a.id}>{a.name} (Tersedia: {a.available_stock})</option>)}
              </select>
              <label className="form-label">Tanggal Rencana Kembali</label>
              <input type="datetime-local" className="form-input" style={{ marginBottom: '1rem' }} value={pinjamReturn} onChange={e=>setPinjamReturn(e.target.value)} required />
              <button className="btn btn-primary">{editPeminjamanId ? 'Simpan Perubahan' : 'Pinjam Alat'}</button>
              {editPeminjamanId && <button type="button" onClick={()=>{setEditPeminjamanId(null); setPinjamAlat(''); setPinjamReturn('');}} className="btn btn-outline" style={{marginLeft: '0.5rem'}}>Batal Edit</button>}
            </form>
          )}
          {activeTab === 'LAPORAN' && (
            <form onSubmit={handleLapor}>
              <input className="form-input" style={{ marginBottom: '1rem' }} placeholder="Lokasi (Contoh: Lampu Futsal Indor)" value={laporLoc} onChange={e=>setLaporLoc(e.target.value)} required />
              <textarea className="form-input" style={{ marginBottom: '1rem', minHeight: '100px' }} placeholder="Deskripsi Kerusakan" value={laporDesc} onChange={e=>setLaporDesc(e.target.value)} required />
              <button className="btn btn-primary">{editLaporanId ? 'Simpan Perubahan Laporan' : 'Kirim Laporan'}</button>
              {editLaporanId && <button type="button" onClick={()=>{setEditLaporanId(null); setLaporLoc(''); setLaporDesc('');}} className="btn btn-outline" style={{marginLeft: '0.5rem'}}>Batal Edit</button>}
            </form>
          )}
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3>Histori {activeTab === 'RESERVASI' ? 'Reservasi' : activeTab === 'ALAT' ? 'Peminjaman' : 'Laporan'} Anda</h3>
          <hr style={{ margin: '1rem 0' }}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeTab === 'RESERVASI' && myReservasi.map(r => (
              <div key={r.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{lapangan.find(l=>l.id===r.lapangan_id)?.name}</strong>
                  <span style={{ color: r.status==='APPROVED'?'green':r.status==='PENDING'?'orange':'red' }}>{r.status}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tanggal: {r.date} Jam: {r.start_time}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {r.status === 'PENDING' && (
                    <>
                      <button onClick={() => startEditReservasi(r)} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Edit2 size={14}/> Reschedule</button>
                      <button onClick={() => updateReservasiStatus(r.id, 'CANCELLED')} className="btn" style={{ background: '#fee2e2', color: 'red', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Batalkan</button>
                    </>
                  )}
                  {(r.status === 'CANCELLED' || r.status === 'REJECTED' || r.status === 'APPROVED') && <button onClick={() => deleteReservasi(r.id)} className="btn" style={{ background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Trash2 size={14}/> Hapus Riwayat</button>}
                </div>
              </div>
            ))}
            {activeTab === 'ALAT' && myPeminjaman.map(p => (
              <div key={p.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{alat.find(a=>a.id===p.alat_id)?.name}</strong>
                  <span style={{ color: p.status==='RETURNED'?'green':'orange' }}>{p.status}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Batas Kembali: {new Date(p.expected_return).toLocaleString()}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {p.status === 'PENDING' && <button onClick={() => startEditPeminjaman(p)} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Edit2 size={14}/> Edit Ajuan</button>}
                  {p.status === 'RETURNED' && <button onClick={() => deletePeminjaman(p.id)} className="btn" style={{ background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Trash2 size={14}/> Hapus Riwayat</button>}
                </div>
              </div>
            ))}
            {activeTab === 'LAPORAN' && myLaporan.map(l => (
              <div key={l.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{l.location}</strong>
                  <span style={{ color: l.status==='RESOLVED'?'green':l.status==='PROCESSING'?'blue':'orange' }}>{l.status}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{l.description}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {l.status === 'WAITING' && <button onClick={() => startEditLaporan(l)} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Edit2 size={14}/> Edit Laporan</button>}
                  {l.status === 'RESOLVED' && <button onClick={() => deleteLaporan(l.id)} className="btn" style={{ background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Trash2 size={14}/> Hapus Riwayat</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD ADMIN ---
const AdminDashboard = () => {
  const { lapangan, reservasi, peminjaman, laporan, alat, jadwalBlokir, updateReservasiStatus, updatePeminjamanStatus, updateLaporanStatus, addAlat, updateAlat, deleteAlat, addJadwalBlokir, updateJadwalBlokir, deleteJadwalBlokir, deleteReservasi, deletePeminjaman, deleteLaporan } = useDB();
  const [activeTab, setActiveTab] = useState<'RESERVASI' | 'ALAT' | 'LAPORAN' | 'INVENTARIS' | 'JADWAL'>('RESERVASI');
  
  // Helper to get user names
  const getUserName = (id: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('simfora_users') || '[]');
      const user = users.find((u: any) => u.id === id);
      return user ? user.name : 'Mahasiswa (' + id.slice(-4) + ')';
    } catch { return id; }
  };

  // Inventaris state
  const [newAlat, setNewAlat] = useState({ id: '', code: '', name: '', total_stock: '' as string | number, condition: 'GOOD' as 'GOOD'|'DAMAGED' });
  const [isEditingAlat, setIsEditingAlat] = useState(false);

  // Jadwal Blokir state
  const [blokir, setBlokir] = useState({ id: '', lapangan_id: '', date: '', start_time: '', end_time: '', event_name: '' });
  const [isEditingBlokir, setIsEditingBlokir] = useState(false);

  const handleAddAlat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlat.code || !newAlat.name || Number(newAlat.total_stock) <= 0) return alert('Data tidak valid');
    
    if (isEditingAlat && newAlat.id) {
      updateAlat(newAlat.id, { code: newAlat.code, name: newAlat.name, total_stock: Number(newAlat.total_stock), condition: newAlat.condition });
      alert('Alat berhasil diupdate!');
    } else {
      addAlat({ ...newAlat, total_stock: Number(newAlat.total_stock), available_stock: Number(newAlat.total_stock) });
      alert('Alat berhasil ditambahkan ke Inventaris!');
    }
    setNewAlat({ id: '', code: '', name: '', total_stock: '', condition: 'GOOD' });
    setIsEditingAlat(false);
  };

  const startEditAlat = (a: any) => {
    setActiveTab('INVENTARIS');
    setIsEditingAlat(true);
    setNewAlat({ id: a.id, code: a.code, name: a.name, total_stock: a.total_stock, condition: a.condition });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBlokir = (e: React.FormEvent) => {
    e.preventDefault();
    if (blokir.end_time <= blokir.start_time) return alert('Waktu selesai harus lebih besar dari waktu mulai!');
    
    if (isEditingBlokir && blokir.id) {
      updateJadwalBlokir(blokir.id, { lapangan_id: blokir.lapangan_id, date: blokir.date, start_time: blokir.start_time, end_time: blokir.end_time, event_name: blokir.event_name });
      alert('Jadwal blokir diupdate!');
    } else {
      addJadwalBlokir(blokir);
      alert('Jadwal berhasil diblokir untuk event!');
    }
    setBlokir({ id: '', lapangan_id: '', date: '', start_time: '', end_time: '', event_name: '' });
    setIsEditingBlokir(false);
  };

  const startEditBlokir = (j: any) => {
    setActiveTab('JADWAL');
    setIsEditingBlokir(true);
    setBlokir({ id: j.id, lapangan_id: j.lapangan_id, date: j.date, start_time: j.start_time, end_time: j.end_time, event_name: j.event_name });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button className={`btn ${activeTab === 'RESERVASI' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('RESERVASI')}>Approval Reservasi</button>
        <button className={`btn ${activeTab === 'ALAT' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('ALAT')}>Log Peminjaman</button>
        <button className={`btn ${activeTab === 'LAPORAN' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('LAPORAN')}>Laporan Kerusakan</button>
        <button className={`btn ${activeTab === 'INVENTARIS' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('INVENTARIS')}>Inventaris</button>
        <button className={`btn ${activeTab === 'JADWAL' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setActiveTab('JADWAL')}>Manajemen Jadwal</button>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        {activeTab === 'RESERVASI' && (
          <div>
            <h3>Approval Reservasi & Riwayat</h3>
            {reservasi.length === 0 ? <p>Belum ada data reservasi.</p> : reservasi.map(r => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
                <div>
                  <strong>{getUserName(r.user_id)}</strong> - {lapangan.find(l=>l.id===r.lapangan_id)?.name}<br/>
                  Tgl: {r.date} | Jam: {r.start_time} | Status: <strong style={{ color: r.status==='APPROVED'?'green':r.status==='PENDING'?'orange':'red' }}>{r.status}</strong>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {r.status === 'PENDING' ? (
                    <>
                      <button onClick={() => updateReservasiStatus(r.id, 'APPROVED')} className="btn" style={{ background: '#dcfce7', color: 'green' }}>Approve</button>
                      <button onClick={() => updateReservasiStatus(r.id, 'REJECTED')} className="btn" style={{ background: '#fee2e2', color: 'red' }}>Reject</button>
                    </>
                  ) : (
                    <button onClick={() => deleteReservasi(r.id)} className="btn btn-outline" style={{ padding: '0.5rem', color: 'red', borderColor: 'red' }}><Trash2 size={16} /> Hapus Riwayat</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'ALAT' && (
          <div>
            <h3>Log Peminjaman & Riwayat</h3>
            {peminjaman.length === 0 ? <p>Belum ada data peminjaman.</p> : peminjaman.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
                <div>
                  <strong>{getUserName(p.user_id)}</strong> meminjam {alat.find(a=>a.id===p.alat_id)?.name}<br/>
                  Batas: {new Date(p.expected_return).toLocaleString()} | Status: <strong style={{ color: p.status==='RETURNED'?'green':'orange' }}>{p.status}</strong>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {p.status === 'PENDING' && <button onClick={() => updatePeminjamanStatus(p.id, 'BORROWED')} className="btn btn-outline">Tandai Dipinjam (Kurangi Stok)</button>}
                  {p.status === 'BORROWED' && <button onClick={() => updatePeminjamanStatus(p.id, 'RETURNED')} className="btn btn-primary">Tandai Kembali (Tambah Stok)</button>}
                  {p.status === 'RETURNED' && <button onClick={() => deletePeminjaman(p.id)} className="btn btn-outline" style={{ padding: '0.5rem', color: 'red', borderColor: 'red' }}><Trash2 size={16} /> Hapus Riwayat</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'LAPORAN' && (
          <div>
            <h3>Update Status Kerusakan & Riwayat</h3>
            {laporan.length === 0 ? <p>Belum ada data laporan kerusakan.</p> : laporan.map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
                <div>
                  <strong>{getUserName(l.user_id)}</strong> melapor di {l.location}<br/>
                  <small>{l.description}</small>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {l.status !== 'RESOLVED' ? (
                    <select className="form-input" style={{ width: '150px' }} value={l.status} onChange={e => updateLaporanStatus(l.id, e.target.value as any)}>
                      <option value="WAITING">Menunggu</option>
                      <option value="PROCESSING">Diproses</option>
                      <option value="RESOLVED">Selesai</option>
                    </select>
                  ) : (
                    <>
                      <span style={{ color: 'green', fontWeight: 'bold' }}>Selesai</span>
                      <button onClick={() => deleteLaporan(l.id)} className="btn btn-outline" style={{ padding: '0.5rem', color: 'red', borderColor: 'red' }}><Trash2 size={16} /> Hapus</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'INVENTARIS' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <h3>{isEditingAlat ? 'Update Alat' : 'Tambah Alat'}</h3>
              <form onSubmit={handleAddAlat}>
                <input className="form-input" style={{ marginBottom: '1rem' }} placeholder="Kode (ex: BSK-002)" value={newAlat.code} onChange={e=>setNewAlat({...newAlat, code: e.target.value})} required/>
                <input className="form-input" style={{ marginBottom: '1rem' }} placeholder="Nama Alat" value={newAlat.name} onChange={e=>setNewAlat({...newAlat, name: e.target.value})} required/>
                <input type="number" className="form-input" style={{ marginBottom: '1rem' }} placeholder="Total Stok" value={newAlat.total_stock} onChange={e=>setNewAlat({...newAlat, total_stock: e.target.value})} min={1} required/>
                <select className="form-input" style={{ marginBottom: '1rem' }} value={newAlat.condition} onChange={e=>setNewAlat({...newAlat, condition: e.target.value as any})} required>
                  <option value="GOOD">Kondisi Baik</option>
                  <option value="DAMAGED">Rusak</option>
                </select>
                <button className="btn btn-primary btn-block">{isEditingAlat ? 'Simpan Perubahan' : 'Simpan Alat'}</button>
                {isEditingAlat && <button type="button" onClick={()=>{setIsEditingAlat(false); setNewAlat({id:'', code:'', name:'', total_stock:'', condition:'GOOD'});}} className="btn btn-outline btn-block" style={{marginTop: '0.5rem'}}>Batal Edit</button>}
              </form>
            </div>
            <div>
              <h3>Daftar Inventaris</h3>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead><tr><th style={{padding:'0.5rem'}}>Kode</th><th>Nama</th><th>Stok (Tersedia)</th><th>Kondisi</th><th>Aksi</th></tr></thead>
                <tbody>
                  {alat.length === 0 ? <tr><td colSpan={5} style={{padding:'1rem'}}>Belum ada data alat.</td></tr> : alat.map(a => (
                    <tr key={a.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                      <td style={{padding:'0.5rem'}}>{a.code}</td><td>{a.name}</td><td>{a.total_stock} ({a.available_stock})</td>
                      <td><span style={{ color: a.condition === 'GOOD' ? 'green' : 'red' }}>{a.condition === 'GOOD' ? 'Baik' : 'Rusak'}</span></td>
                      <td>
                        <button onClick={()=>startEditAlat(a)} style={{ color: 'blue', border: 'none', background: 'transparent', cursor:'pointer', marginRight: '0.5rem' }}><Edit2 size={18}/></button>
                        <button onClick={()=>deleteAlat(a.id)} style={{ color: 'red', border: 'none', background: 'transparent', cursor:'pointer' }}><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'JADWAL' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <h3>{isEditingBlokir ? 'Update Jadwal Event' : 'Blokir Jadwal Event'}</h3>
              <form onSubmit={handleAddBlokir}>
                <input className="form-input" style={{ marginBottom: '1rem' }} placeholder="Nama Event" value={blokir.event_name} onChange={e=>setBlokir({...blokir, event_name: e.target.value})} required/>
                <select className="form-input" style={{ marginBottom: '1rem' }} value={blokir.lapangan_id} onChange={e=>setBlokir({...blokir, lapangan_id: e.target.value})} required>
                  <option value="">-- Pilih Lapangan --</option>
                  {lapangan.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
                <input type="date" className="form-input" style={{ marginBottom: '1rem' }} value={blokir.date} onChange={e=>setBlokir({...blokir, date: e.target.value})} required/>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <input type="time" className="form-input" value={blokir.start_time} onChange={e=>setBlokir({...blokir, start_time: e.target.value})} required title="Jam Mulai"/>
                  <input type="time" className="form-input" value={blokir.end_time} onChange={e=>setBlokir({...blokir, end_time: e.target.value})} required title="Jam Selesai"/>
                </div>
                <button className="btn btn-primary btn-block">{isEditingBlokir ? 'Simpan Perubahan' : 'Blokir Jadwal'}</button>
                {isEditingBlokir && <button type="button" onClick={()=>{setIsEditingBlokir(false); setBlokir({id:'', lapangan_id:'', date:'', start_time:'', end_time:'', event_name:''});}} className="btn btn-outline btn-block" style={{marginTop: '0.5rem'}}>Batal Edit</button>}
              </form>
            </div>
            <div>
              <h3>Daftar Jadwal Terblokir</h3>
              {jadwalBlokir.length === 0 ? <p>Belum ada jadwal event.</p> : jadwalBlokir.map(j => (
                <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: 'var(--primary-red)' }}>{j.event_name}</strong> - {lapangan.find(l=>l.id===j.lapangan_id)?.name}<br/>
                    <small>Tgl: {j.date} ({j.start_time} - {j.end_time})</small>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => startEditBlokir(j)} className="btn btn-outline" style={{ padding: '0.5rem', color: 'blue', borderColor: 'blue' }}><Edit2 size={16} /> Edit</button>
                    <button onClick={() => deleteJadwalBlokir(j.id)} className="btn btn-outline" style={{ padding: '0.5rem', color: 'red', borderColor: 'red' }}><Trash2 size={16} /> Buka Blokir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardRouter = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  
  return (
    <div className="container animate-in" style={{ padding: '3rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Halo, {user.name}! 👋</h1>
          <p style={{ color: 'var(--text-muted)' }}>Dashboard {user.role === 'ADMIN' ? 'Administrator' : 'Mahasiswa'}.</p>
        </div>
      </div>
      {user.role === 'ADMIN' ? <AdminDashboard /> : <MahasiswaDashboard />}
    </div>
  );
};

// --- PROFIL PAGE (Update User) ---
const ProfilPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');

  if (!user) return <Navigate to="/login" />;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('simfora_users') || '[]');
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return { ...u, name, password: password || u.password };
      }
      return u;
    });
    localStorage.setItem('simfora_users', JSON.stringify(updatedUsers));
    
    // Update active session locally
    const session = JSON.parse(localStorage.getItem('simfora_session') || '{}');
    session.name = name;
    localStorage.setItem('simfora_session', JSON.stringify(session));
    
    alert('Profil berhasil diperbarui! Perubahan nama akan tampil pada sesi berikutnya, atau Anda bisa Logout lalu Login kembali.');
    window.location.reload();
  };

  return (
    <div className="container animate-in" style={{ padding: '3rem 1rem', maxWidth: '500px' }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2>Edit Profil</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Perbarui informasi dasar akun Anda.</p>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" value={user.email} disabled style={{ background: '#f1f5f9', color: '#94a3b8' }}/>
          </div>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input className="form-input" value={name} onChange={e=>setName(e.target.value)} required/>
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Ganti Password (Opsional)</label>
            <input className="form-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Kosongkan jika tidak ingin ganti" minLength={8}/>
          </div>
          <button className="btn btn-primary btn-block">Update Profil</button>
        </form>
      </div>
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
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardRouter />} />
                <Route path="/profil" element={<ProfilPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            
            <footer style={{ background: 'var(--text-main)', color: 'white', padding: '4rem 0 2rem', marginTop: 'auto' }}>
              <div className="container" style={{ textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                © {new Date().getFullYear()} Telkom University - SIMFORA WBS Requirements Fully Met.
              </div>
            </footer>
          </div>
        </Router>
      </DBProvider>
    </AuthProvider>
  );
}

export default App;
