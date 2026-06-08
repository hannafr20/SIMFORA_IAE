import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const dialect = (process.env.DB_DIALECT || 'sqlite') as any;

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'simfora_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: dialect,
    logging: false,
    storage: dialect === 'sqlite' ? path.join(__dirname, '../simfora.sqlite') : undefined,
  }
);

// Models Define
export const LapanganModel = sequelize.define('Lapangan', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('AVAILABLE', 'MAINTENANCE'), defaultValue: 'AVAILABLE' }
});

export const AlatModel = sequelize.define('Alat', {
  id: { type: DataTypes.STRING, primaryKey: true },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  total_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  available_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  condition: { type: DataTypes.ENUM('GOOD', 'DAMAGED'), defaultValue: 'GOOD' }
});

export const ReservasiModel = sequelize.define('Reservasi', {
  id: { type: DataTypes.STRING, primaryKey: true },
  user_id: { type: DataTypes.STRING, allowNull: false },
  lapangan_id: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  start_time: { type: DataTypes.STRING, allowNull: false },
  end_time: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'), defaultValue: 'PENDING' },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const PeminjamanModel = sequelize.define('Peminjaman', {
  id: { type: DataTypes.STRING, primaryKey: true },
  user_id: { type: DataTypes.STRING, allowNull: false },
  alat_id: { type: DataTypes.STRING, allowNull: false },
  borrow_date: { type: DataTypes.STRING, allowNull: false },
  expected_return: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'BORROWED', 'RETURNED'), defaultValue: 'PENDING' },
  penalty: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export const LaporanModel = sequelize.define('Laporan', {
  id: { type: DataTypes.STRING, primaryKey: true },
  user_id: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('WAITING', 'PROCESSING', 'RESOLVED'), defaultValue: 'WAITING' },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const JadwalBlokirModel = sequelize.define('JadwalBlokir', {
  id: { type: DataTypes.STRING, primaryKey: true },
  lapangan_id: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  start_time: { type: DataTypes.STRING, allowNull: false },
  end_time: { type: DataTypes.STRING, allowNull: false },
  event_name: { type: DataTypes.STRING, allowNull: false }
});

export async function initDb() {
  await sequelize.sync({ alter: true });
  console.log('Database synced successfully.');

  // Seed default Lapangan and Alat if empty
  const countLapangan = await LapanganModel.count();
  if (countLapangan === 0) {
    await LapanganModel.bulkCreate([
      { id: 'L1', name: 'Lapangan Basket Outdoor', description: 'Lapangan basket standar FIBA', status: 'AVAILABLE' },
      { id: 'L2', name: 'Lapangan Futsal Indoor', description: 'Rumput sintetis', status: 'AVAILABLE' },
      { id: 'L3', name: 'Lapangan Tenis', description: 'Hard court', status: 'AVAILABLE' },
      { id: 'L4', name: 'Lapangan Voli', description: 'Kualitas lantai taraflex premium', status: 'AVAILABLE' },
      { id: 'L5', name: 'Lapangan Bulu Tangkis', description: 'Karpet lapangan standar PBSI', status: 'AVAILABLE' },
    ]);
    console.log('Seeded default Lapangan.');
  }

  const countAlat = await AlatModel.count();
  if (countAlat === 0) {
    await AlatModel.bulkCreate([
      { id: 'A1', code: 'BSK-001', name: 'Bola Basket Molten', total_stock: 10, available_stock: 10, condition: 'GOOD' },
      { id: 'A2', code: 'FTS-001', name: 'Bola Futsal Specs', total_stock: 15, available_stock: 15, condition: 'GOOD' },
      { id: 'A3', code: 'RKT-001', name: 'Raket Badminton Yonex', total_stock: 20, available_stock: 18, condition: 'GOOD' },
    ]);
    console.log('Seeded default Alat.');
  }
}
