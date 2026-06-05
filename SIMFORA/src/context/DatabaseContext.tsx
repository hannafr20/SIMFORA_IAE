import React, { createContext, useContext, useState, useEffect } from 'react';

export type Lapangan = { id: string; name: string; description: string; status: 'AVAILABLE' | 'MAINTENANCE'; };
export type Reservasi = { id: string; user_id: string; lapangan_id: string; date: string; start_time: string; end_time: string; status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'; created_at: string; };
export type Alat = { id: string; code: string; name: string; total_stock: number; available_stock: number; condition: 'GOOD' | 'DAMAGED'; };
export type Peminjaman = { id: string; user_id: string; alat_id: string; borrow_date: string; expected_return: string; status: 'PENDING' | 'BORROWED' | 'RETURNED'; penalty: number; };
export type Laporan = { id: string; user_id: string; location: string; description: string; status: 'WAITING' | 'PROCESSING' | 'RESOLVED'; created_at: string; };
export type JadwalBlokir = { id: string; lapangan_id: string; date: string; start_time: string; end_time: string; event_name: string; };

type DBContextType = {
  lapangan: Lapangan[];
  reservasi: Reservasi[];
  alat: Alat[];
  peminjaman: Peminjaman[];
  laporan: Laporan[];
  jadwalBlokir: JadwalBlokir[];
  
  // Actions
  addReservasi: (data: Omit<Reservasi, 'id' | 'status' | 'created_at'>) => void;
  updateReservasiStatus: (id: string, status: Reservasi['status']) => void;
  updateReservasiTime: (id: string, date: string, start_time: string) => void;
  deleteReservasi: (id: string) => void;
  
  addPeminjaman: (data: Omit<Peminjaman, 'id' | 'status' | 'penalty'>) => void;
  updatePeminjamanStatus: (id: string, status: Peminjaman['status']) => void;
  updatePeminjamanContent: (id: string, alat_id: string, expected_return: string) => void;
  deletePeminjaman: (id: string) => void;
  
  addLaporan: (data: Omit<Laporan, 'id' | 'status' | 'created_at'>) => void;
  updateLaporanStatus: (id: string, status: Laporan['status']) => void;
  updateLaporanContent: (id: string, location: string, description: string) => void;
  deleteLaporan: (id: string) => void;
  
  addAlat: (data: Omit<Alat, 'id' | 'available_stock'>) => void;
  updateAlat: (id: string, data: Partial<Alat>) => void;
  deleteAlat: (id: string) => void;

  addJadwalBlokir: (data: Omit<JadwalBlokir, 'id'>) => void;
  updateJadwalBlokir: (id: string, data: Partial<JadwalBlokir>) => void;
  deleteJadwalBlokir: (id: string) => void;
};

const DBContext = createContext<DBContextType | undefined>(undefined);

const initialLapangan: Lapangan[] = [
  { id: 'L1', name: 'Lapangan Basket Outdoor', description: 'Lapangan basket standar FIBA', status: 'AVAILABLE' },
  { id: 'L2', name: 'Lapangan Futsal Indoor', description: 'Rumput sintetis', status: 'AVAILABLE' },
  { id: 'L3', name: 'Lapangan Tenis', description: 'Hard court', status: 'MAINTENANCE' },
];

const initialAlat: Alat[] = [
  { id: 'A1', code: 'BSK-001', name: 'Bola Basket Molten', total_stock: 10, available_stock: 10, condition: 'GOOD' },
  { id: 'A2', code: 'FTS-001', name: 'Bola Futsal Specs', total_stock: 15, available_stock: 15, condition: 'GOOD' },
  { id: 'A3', code: 'RKT-001', name: 'Raket Badminton Yonex', total_stock: 20, available_stock: 18, condition: 'GOOD' },
];

export const DBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lapangan, setLapangan] = useState<Lapangan[]>([]);
  const [reservasi, setReservasi] = useState<Reservasi[]>([]);
  const [alat, setAlat] = useState<Alat[]>([]);
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [jadwalBlokir, setJadwalBlokir] = useState<JadwalBlokir[]>([]);

  // Load from local storage
  useEffect(() => {
    const load = (key: string, defaultVal: any) => {
      const saved = localStorage.getItem(`simfora_${key}`);
      return saved ? JSON.parse(saved) : defaultVal;
    };
    setLapangan(load('lapangan', initialLapangan));
    setAlat(load('alat', initialAlat));
    setReservasi(load('reservasi', []));
    setPeminjaman(load('peminjaman', []));
    setLaporan(load('laporan', []));
    setJadwalBlokir(load('jadwalBlokir', []));
  }, []);

  // Save to local storage on change
  const save = (key: string, data: any) => {
    localStorage.setItem(`simfora_${key}`, JSON.stringify(data));
  };

  const addReservasi = (data: Omit<Reservasi, 'id' | 'status' | 'created_at'>) => {
    const newRes: Reservasi = { ...data, id: Date.now().toString(), status: 'PENDING', created_at: new Date().toISOString() };
    const updated = [...reservasi, newRes];
    setReservasi(updated); save('reservasi', updated);
  };
  const updateReservasiStatus = (id: string, status: Reservasi['status']) => {
    const updated = reservasi.map(r => r.id === id ? { ...r, status } : r);
    setReservasi(updated); save('reservasi', updated);
  };

  const updateReservasiTime = (id: string, date: string, start_time: string) => {
    const updated = reservasi.map(r => r.id === id ? { ...r, date, start_time, end_time: start_time } : r);
    setReservasi(updated); save('reservasi', updated);
  };

  const addPeminjaman = (data: Omit<Peminjaman, 'id' | 'status' | 'penalty'>) => {
    const newPem: Peminjaman = { ...data, id: Date.now().toString(), status: 'PENDING', penalty: 0 };
    const updated = [...peminjaman, newPem];
    setPeminjaman(updated); save('peminjaman', updated);
  };
  const updatePeminjamanStatus = (id: string, status: Peminjaman['status']) => {
    const pem = peminjaman.find(p => p.id === id);
    if (!pem) return;
    
    // Update stock logic
    let updatedAlat = [...alat];
    if (status === 'BORROWED' && pem.status === 'PENDING') {
      updatedAlat = updatedAlat.map(a => a.id === pem.alat_id ? { ...a, available_stock: Math.max(0, a.available_stock - 1) } : a);
    } else if (status === 'RETURNED' && pem.status === 'BORROWED') {
      updatedAlat = updatedAlat.map(a => a.id === pem.alat_id ? { ...a, available_stock: Math.min(a.total_stock, a.available_stock + 1) } : a);
    }
    setAlat(updatedAlat); save('alat', updatedAlat);

    const updated = peminjaman.map(p => p.id === id ? { ...p, status } : p);
    setPeminjaman(updated); save('peminjaman', updated);
  };

  const updatePeminjamanContent = (id: string, alat_id: string, expected_return: string) => {
    const updated = peminjaman.map(p => p.id === id ? { ...p, alat_id, expected_return } : p);
    setPeminjaman(updated); save('peminjaman', updated);
  };

  const addLaporan = (data: Omit<Laporan, 'id' | 'status' | 'created_at'>) => {
    const newLap: Laporan = { ...data, id: Date.now().toString(), status: 'WAITING', created_at: new Date().toISOString() };
    const updated = [...laporan, newLap];
    setLaporan(updated); save('laporan', updated);
  };
  const updateLaporanStatus = (id: string, status: Laporan['status']) => {
    const updated = laporan.map(l => l.id === id ? { ...l, status } : l);
    setLaporan(updated); save('laporan', updated);
  };
  const updateLaporanContent = (id: string, location: string, description: string) => {
    const updated = laporan.map(l => l.id === id ? { ...l, location, description } : l);
    setLaporan(updated); save('laporan', updated);
  };

  const addAlat = (data: Omit<Alat, 'id' | 'available_stock'>) => {
    const newA: Alat = { ...data, id: Date.now().toString(), available_stock: data.total_stock };
    const updated = [...alat, newA];
    setAlat(updated); save('alat', updated);
  };
  const updateAlat = (id: string, data: Partial<Alat>) => {
    const updated = alat.map(a => a.id === id ? { ...a, ...data } : a);
    setAlat(updated); save('alat', updated);
  };
  const deleteAlat = (id: string) => {
    const updated = alat.filter(a => a.id !== id);
    setAlat(updated); save('alat', updated);
  };

  const deleteReservasi = (id: string) => {
    const updated = reservasi.filter(r => r.id !== id);
    setReservasi(updated); save('reservasi', updated);
  };

  const deletePeminjaman = (id: string) => {
    const updated = peminjaman.filter(p => p.id !== id);
    setPeminjaman(updated); save('peminjaman', updated);
  };

  const deleteLaporan = (id: string) => {
    const updated = laporan.filter(l => l.id !== id);
    setLaporan(updated); save('laporan', updated);
  };

  const addJadwalBlokir = (data: Omit<JadwalBlokir, 'id'>) => {
    const newBlokir: JadwalBlokir = { ...data, id: Date.now().toString() };
    const updated = [...jadwalBlokir, newBlokir];
    setJadwalBlokir(updated); save('jadwalBlokir', updated);
  };

  const updateJadwalBlokir = (id: string, data: Partial<JadwalBlokir>) => {
    const updated = jadwalBlokir.map(j => j.id === id ? { ...j, ...data } : j);
    setJadwalBlokir(updated); save('jadwalBlokir', updated);
  };

  const deleteJadwalBlokir = (id: string) => {
    const updated = jadwalBlokir.filter(j => j.id !== id);
    setJadwalBlokir(updated); save('jadwalBlokir', updated);
  };

  return (
    <DBContext.Provider value={{
      lapangan, reservasi, alat, peminjaman, laporan, jadwalBlokir,
      addReservasi, updateReservasiStatus, updateReservasiTime, deleteReservasi,
      addPeminjaman, updatePeminjamanStatus, updatePeminjamanContent, deletePeminjaman,
      addLaporan, updateLaporanStatus, updateLaporanContent, deleteLaporan,
      addAlat, updateAlat, deleteAlat,
      addJadwalBlokir, updateJadwalBlokir, deleteJadwalBlokir
    }}>
      {children}
    </DBContext.Provider>
  );
};

export const useDB = () => {
  const context = useContext(DBContext);
  if (!context) throw new Error('useDB must be used within DBProvider');
  return context;
};
