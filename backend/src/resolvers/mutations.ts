import { 
  LapanganModel, 
  AlatModel, 
  ReservasiModel, 
  PeminjamanModel, 
  LaporanModel, 
  JadwalBlokirModel 
} from '../db';

export const mutations = {
  // Reservasi Mutations
  addReservasi: async (_: any, args: { user_id: string; lapangan_id: string; date: string; start_time: string; end_time: string }) => {
    const id = Date.now().toString();
    const newRes = await ReservasiModel.create({
      id,
      ...args,
      status: 'PENDING',
      created_at: new Date()
    });
    return newRes;
  },
  updateReservasiStatus: async (_: any, { id, status }: { id: string; status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' }) => {
    const res = await ReservasiModel.findByPk(id);
    if (!res) throw new Error('Reservasi not found');
    await res.update({ status });
    return res;
  },
  updateReservasiTime: async (_: any, { id, date, start_time }: { id: string; date: string; start_time: string }) => {
    const res = await ReservasiModel.findByPk(id);
    if (!res) throw new Error('Reservasi not found');
    await res.update({ date, start_time, end_time: start_time });
    return res;
  },
  deleteReservasi: async (_: any, { id }: { id: string }) => {
    const rows = await ReservasiModel.destroy({ where: { id } });
    return rows > 0;
  },

  // Peminjaman Mutations
  addPeminjaman: async (_: any, args: { user_id: string; alat_id: string; borrow_date: string; expected_return: string }) => {
    const id = Date.now().toString();
    const newPem = await PeminjamanModel.create({
      id,
      ...args,
      status: 'PENDING',
      penalty: 0
    });
    return newPem;
  },
  updatePeminjamanStatus: async (_: any, { id, status }: { id: string; status: 'PENDING' | 'BORROWED' | 'RETURNED' }) => {
    const pem = await PeminjamanModel.findByPk(id);
    if (!pem) throw new Error('Peminjaman not found');

    const prevStatus = pem.get('status') as string;
    const alatId = pem.get('alat_id') as string;

    // Adjust stock logic based on status transition
    if (status === 'BORROWED' && prevStatus === 'PENDING') {
      const alat = await AlatModel.findByPk(alatId);
      if (alat) {
        const available = alat.get('available_stock') as number;
        await alat.update({ available_stock: Math.max(0, available - 1) });
      }
    } else if (status === 'RETURNED' && prevStatus === 'BORROWED') {
      const alat = await AlatModel.findByPk(alatId);
      if (alat) {
        const total = alat.get('total_stock') as number;
        const available = alat.get('available_stock') as number;
        await alat.update({ available_stock: Math.min(total, available + 1) });
      }
    }

    await pem.update({ status });
    return pem;
  },
  updatePeminjamanContent: async (_: any, { id, alat_id, expected_return }: { id: string; alat_id: string; expected_return: string }) => {
    const pem = await PeminjamanModel.findByPk(id);
    if (!pem) throw new Error('Peminjaman not found');
    await pem.update({ alat_id, expected_return });
    return pem;
  },
  deletePeminjaman: async (_: any, { id }: { id: string }) => {
    const rows = await PeminjamanModel.destroy({ where: { id } });
    return rows > 0;
  },

  // Laporan Mutations
  addLaporan: async (_: any, args: { user_id: string; location: string; description: string }) => {
    const id = Date.now().toString();
    const newLap = await LaporanModel.create({
      id,
      ...args,
      status: 'WAITING',
      created_at: new Date()
    });
    return newLap;
  },
  updateLaporanStatus: async (_: any, { id, status }: { id: string; status: 'WAITING' | 'PROCESSING' | 'RESOLVED' }) => {
    const lap = await LaporanModel.findByPk(id);
    if (!lap) throw new Error('Laporan not found');
    await lap.update({ status });
    return lap;
  },
  updateLaporanContent: async (_: any, { id, location, description }: { id: string; location: string; description: string }) => {
    const lap = await LaporanModel.findByPk(id);
    if (!lap) throw new Error('Laporan not found');
    await lap.update({ location, description });
    return lap;
  },
  deleteLaporan: async (_: any, { id }: { id: string }) => {
    const rows = await LaporanModel.destroy({ where: { id } });
    return rows > 0;
  },

  // Alat Mutations
  addAlat: async (_: any, args: { code: string; name: string; total_stock: number; condition: 'GOOD' | 'DAMAGED' }) => {
    const id = Date.now().toString();
    const newAlat = await AlatModel.create({
      id,
      ...args,
      available_stock: args.total_stock
    });
    return newAlat;
  },
  updateAlat: async (_: any, { id, ...data }: { id: string; code?: string; name?: string; total_stock?: number; available_stock?: number; condition?: 'GOOD' | 'DAMAGED' }) => {
    const alat = await AlatModel.findByPk(id);
    if (!alat) throw new Error('Alat not found');
    await alat.update(data);
    return alat;
  },
  deleteAlat: async (_: any, { id }: { id: string }) => {
    const rows = await AlatModel.destroy({ where: { id } });
    return rows > 0;
  },

  // JadwalBlokir Mutations
  addJadwalBlokir: async (_: any, args: { lapangan_id: string; date: string; start_time: string; end_time: string; event_name: string }) => {
    const id = Date.now().toString();
    const newBlokir = await JadwalBlokirModel.create({
      id,
      ...args
    });
    return newBlokir;
  },
  updateJadwalBlokir: async (_: any, { id, ...data }: { id: string; lapangan_id?: string; date?: string; start_time?: string; end_time?: string; event_name?: string }) => {
    const blokir = await JadwalBlokirModel.findByPk(id);
    if (!blokir) throw new Error('JadwalBlokir not found');
    await blokir.update(data);
    return blokir;
  },
  deleteJadwalBlokir: async (_: any, { id }: { id: string }) => {
    const rows = await JadwalBlokirModel.destroy({ where: { id } });
    return rows > 0;
  }
};
