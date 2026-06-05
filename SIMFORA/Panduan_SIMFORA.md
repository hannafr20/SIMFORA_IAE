# DOKUMEN PANDUAN TEKNIS DAN OPERASIONAL
**Program:** SIMFORA (Sistem Terpadu Manajemen Fasilitas Olahraga)

Dokumen ini merupakan panduan lengkap mengenai alur, cara kerja, dan tata cara penggunaan aplikasi SIMFORA baik dari sisi Administrator maupun Pengguna (Mahasiswa).

---

## 1. CARA MENJALANKAN PROGRAM (VS CODE)

Program SIMFORA versi saat ini dibangun menggunakan teknologi **Node.js dan React (Vite)**. Berikut adalah panduan untuk menjalankan aplikasinya di lingkungan lokal Anda.

### A. Persiapan Awal
1. **Buka VS Code:** Buka folder project aplikasi SIMFORA di dalam Visual Studio Code.
2. **Buka Terminal:** Buka terminal terintegrasi di VS Code dengan menekan `Ctrl + \`` (backtick) atau melalui menu *Terminal > New Terminal*.
3. **Instalasi Dependencies:** Jika ini adalah pertama kalinya Anda menjalankan program di perangkat tersebut, ketikkan perintah berikut untuk mengunduh semua modul yang dibutuhkan:
```bash
   cd simfora
   ```
 
   ```bash
   npm install
   ```

### B. Menjalankan Program (Node.js/React)
1. Setelah instalasi selesai, jalankan server pengembangan (development server) dengan perintah:
   ```bash
   npm run dev
   ```
2. Terminal akan memunculkan URL lokal (biasanya `    `).
3. Tekan `Ctrl + Klik` pada link tersebut untuk membuka aplikasi SIMFORA di browser Anda.

*(Catatan Tambahan untuk XAMPP/MySQL: Versi saat ini menggunakan simulasi database pintar berbasis LocalStorage. Jika di masa depan program ini dihubungkan dengan backend PHP/Laravel, Anda perlu menyalakan modul Apache & MySQL pada aplikasi XAMPP, lalu mengimpor file `database.sql` melalui phpMyAdmin di `http://localhost/phpmyadmin` sebelum menjalankan server lokal).*

---

## 2. ALUR UTAMA PROGRAM (WORKFLOW)

Program ini bekerja sebagai platform **satu pintu** untuk mengelola fasilitas olahraga kampus secara *real-time*.
* **Sinkronisasi Data Mutlak:** Seluruh entitas data (jumlah lapangan, stok alat, riwayat peminjaman) ditarik dari basis data terpusat. Artinya, apa yang diinput, diubah, atau dihapus oleh Admin akan **seketika itu juga** terlihat efeknya di layar User.
* **Siklus Bisnis:**
  1. Admin menyiapkan data infrastruktur (Daftar Alat Olahraga, Daftar Lapangan, dan Jadwal Blokir Event Kampus).
  2. User mendaftarkan akun, masuk ke sistem, dan melihat ketersediaan fasilitas berdasarkan data aktual dari Admin.
  3. User mengajukan peminjaman alat atau reservasi lapangan (dengan batasan aturan waktu yang ketat).
  4. Admin menerima pengajuan tersebut, melakukan validasi (*Approve/Reject*), lalu sistem akan mengunci jadwal atau memotong stok alat secara otomatis.
  5. Setelah selesai, Admin atau User dapat menghapus riwayat tersebut untuk membersihkan basis data.

---

## 3. PANDUAN AUTENTIKASI (AKSES & PEMBUATAN AKUN)

### Cara Membuat Akun Baru (Registrasi)
1. Pada halaman utama (Landing Page), klik tombol **"Daftar SSO"** atau **"Mulai Sekarang"**.
2. Anda akan diarahkan ke halaman Registrasi.
3. Masukkan **Nama Lengkap**, **Email Mahasiswa/Pegawai**, dan **Password** (minimal 8 karakter).
   * *Sistem akan memastikan bahwa format email valid.*
4. Klik tombol **Daftar**. Akun Anda akan langsung tersimpan dan dapat digunakan.

### Cara Mengakses Program (Login)
1. Klik tombol **"Masuk"** atau **"Login"** pada navigasi atas.
2. Masukkan Email dan Password yang telah didaftarkan.
3. Sistem akan mengenali secara otomatis apakah Anda adalah **Admin** (melalui email `admin@telkomuniversity.ac.id`) pw'admin123` atau **User/Mahasiswa**.
4. Anda akan langsung diarahkan ke *Dashboard* sesuai dengan peran (Role) masing-masing.

---

## 4. PANDUAN CARA KERJA PERAN (ROLE)

Sistem membagi kontrol menjadi dua peran utama dengan akses dan aturan logika yang berbeda.

### A. SISI ADMIN (Pengelola Fasilitas)
Admin memiliki kontrol penuh terhadap *database* lapangan, alat, persetujuan, dan jadwal operasional.
* **Manajemen Lapangan & Inventaris Alat:** 
  Apa yang ditetapkan Admin adalah apa yang dilihat oleh User. Jika Admin menginputkan 3 lapangan dan 20 bola basket, maka User hanya akan melihat 3 lapangan tersebut dan maksimal stok 20 bola basket.
  * Admin dapat menambah stok, mengubah (*update*) kondisi alat (Baik/Rusak), dan menghapus data alat.
* **Fitur Blokir Jadwal Event (Manajemen Jadwal):**
  Admin dapat memblokir lapangan tertentu pada tanggal dan jam tertentu untuk kebutuhan khusus (contoh: Olimpiade Kampus).
  * **Validasi Logika Admin:** Sistem mengunci input yang tidak masuk akal. **"Waktu Berakhir tidak boleh kurang dari Waktu Dimulai"**. Jika Admin memasukkan jam mulai pukul 15:00 dan jam selesai pukul 14:00, sistem akan menolak dan memunculkan peringatan error.
  * Hasil pemblokiran ini akan memunculkan informasi otomatis di *dashboard* pengajuan User dan mengunci jadwal tersebut agar tidak bisa dibooking.

### B. SISI USER (Mahasiswa/Pengguna Biasa)
User berinteraksi dengan sistem untuk mencari fasilitas yang tersedia dan mengajukan permohonan.
* **Mengajukan Jadwal Reservasi Lapangan:**
  User memilih lapangan, tanggal, dan jam bermain. Sistem memiliki penyaring ketat:
  * **Validasi Masa Depan:** User **TIDAK BISA** mengajukan jadwal yang kurang dari waktu saat ini. Jika user mencoba mem-booking jam yang sudah lewat di hari ini, sistem akan menolak dengan peringatan *"Tidak bisa mengajukan jadwal di masa lalu!"*.
  * **Validasi Jadwal Terblokir:** Tanggal dan jam yang beririsan dengan jadwal yang sudah diblokir oleh Admin akan **otomatis ditolak/dikunci** oleh sistem (*disabled* secara logika) dengan peringatan *"Lapangan sedang diblokir untuk Event Kampus pada waktu tersebut"*.
* **Meminjam Alat Olahraga:**
  User dapat melihat daftar alat yang stoknya masih > 0. User menentukan tanggal batas kembali. (Batas kembali juga wajib berada di masa depan).
* **Melakukan Edit (Update):**
  Selama status pengajuan masih **PENDING** (belum diproses Admin), User diberikan kebebasan untuk melakukan perubahan (*Reschedule* tanggal/jam lapangan, mengganti jenis alat, atau mengedit laporan kerusakan).

---
*Dokumen ini disusun untuk memastikan bahwa pengembang, pengelola, maupun pengguna awam dapat memahami ekosistem aplikasi SIMFORA secara terstruktur dan terpadu.*
