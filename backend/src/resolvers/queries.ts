import { 
  LapanganModel, 
  AlatModel, 
  ReservasiModel, 
  PeminjamanModel, 
  LaporanModel, 
  JadwalBlokirModel 
} from '../db';

export const queries = {
  getLapangan: async () => {
    return await LapanganModel.findAll();
  },
  getAlat: async () => {
    return await AlatModel.findAll();
  },
  getReservasi: async () => {
    return await ReservasiModel.findAll();
  },
  getPeminjaman: async () => {
    return await PeminjamanModel.findAll();
  },
  getLaporan: async () => {
    return await LaporanModel.findAll();
  },
  getJadwalBlokir: async () => {
    return await JadwalBlokirModel.findAll();
  }
};
