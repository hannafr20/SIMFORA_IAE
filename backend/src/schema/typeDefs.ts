export const typeDefs = `#graphql
  enum LapanganStatus {
    AVAILABLE
    MAINTENANCE
  }

  enum ReservasiStatus {
    PENDING
    APPROVED
    REJECTED
    CANCELLED
  }

  enum AlatCondition {
    GOOD
    DAMAGED
  }

  enum PeminjamanStatus {
    PENDING
    BORROWED
    RETURNED
  }

  enum LaporanStatus {
    WAITING
    PROCESSING
    RESOLVED
  }

  type Lapangan {
    id: ID!
    name: String!
    description: String
    status: LapanganStatus!
  }

  type Alat {
    id: ID!
    code: String!
    name: String!
    total_stock: Int!
    available_stock: Int!
    condition: AlatCondition!
  }

  type Reservasi {
    id: ID!
    user_id: String!
    lapangan_id: String!
    date: String!
    start_time: String!
    end_time: String!
    status: ReservasiStatus!
    created_at: String
  }

  type Peminjaman {
    id: ID!
    user_id: String!
    alat_id: String!
    borrow_date: String!
    expected_return: String!
    status: PeminjamanStatus!
    penalty: Int!
  }

  type Laporan {
    id: ID!
    user_id: String!
    location: String!
    description: String!
    status: LaporanStatus!
    created_at: String
  }

  type JadwalBlokir {
    id: ID!
    lapangan_id: String!
    date: String!
    start_time: String!
    end_time: String!
    event_name: String!
  }

  type Query {
    getLapangan: [Lapangan!]!
    getAlat: [Alat!]!
    getReservasi: [Reservasi!]!
    getPeminjaman: [Peminjaman!]!
    getLaporan: [Laporan!]!
    getJadwalBlokir: [JadwalBlokir!]!
  }

  type Mutation {
    # Reservasi
    addReservasi(user_id: String!, lapangan_id: String!, date: String!, start_time: String!, end_time: String!): Reservasi!
    updateReservasiStatus(id: ID!, status: ReservasiStatus!): Reservasi!
    updateReservasiTime(id: ID!, date: String!, start_time: String!): Reservasi!
    deleteReservasi(id: ID!): Boolean!

    # Peminjaman
    addPeminjaman(user_id: String!, alat_id: String!, borrow_date: String!, expected_return: String!): Peminjaman!
    updatePeminjamanStatus(id: ID!, status: PeminjamanStatus!): Peminjaman!
    updatePeminjamanContent(id: ID!, alat_id: String!, expected_return: String!): Peminjaman!
    deletePeminjaman(id: ID!): Boolean!

    # Laporan
    addLaporan(user_id: String!, location: String!, description: String!): Laporan!
    updateLaporanStatus(id: ID!, status: LaporanStatus!): Laporan!
    updateLaporanContent(id: ID!, location: String!, description: String!): Laporan!
    deleteLaporan(id: ID!): Boolean!

    # Alat
    addAlat(code: String!, name: String!, total_stock: Int!, condition: AlatCondition!): Alat!
    updateAlat(id: ID!, code: String, name: String, total_stock: Int, available_stock: Int, condition: AlatCondition): Alat!
    deleteAlat(id: ID!): Boolean!

    # JadwalBlokir
    addJadwalBlokir(lapangan_id: String!, date: String!, start_time: String!, end_time: String!, event_name: String!): JadwalBlokir!
    updateJadwalBlokir(id: ID!, lapangan_id: String, date: String, start_time: String, end_time: String, event_name: String): JadwalBlokir!
    deleteJadwalBlokir(id: ID!): Boolean!
  }
`;
