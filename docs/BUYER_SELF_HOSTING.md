# Panduan Pembeli: Menjalankan Bot Sendiri

Dokumen ini ditujukan untuk pembeli yang ingin menjalankan BotVPN-Reseller pada server atau VPS milik sendiri. Gunakan bersama `INSTALLATION.md`, `CONFIGURATION.md`, `ENVIRONMENT.md`, dan `TROUBLESHOOTING.md`.

## 1. Yang diterima pembeli

Bot ini adalah bot Telegram reseller yang terhubung ke API BotVPN utama. Pembeli membutuhkan:

- Source code bot.
- Bot token dari BotFather.
- Telegram ID administrator.
- API key reseller dari pemilik API BotVPN utama.
- Akses ke API BotVPN upstream.
- Service pembayaran QRIS jika fitur top up ingin digunakan.
- VPS/server dengan Node.js dan akses internet.

Bot ini bukan panel VPN mandiri. Pembuatan akun, renew, delete, lock, unlock, trial, limit IP, EDU, dan CloudFront diproses melalui API upstream.

## 2. Persyaratan server

Minimum yang direkomendasikan:

- Ubuntu/Debian.
- Node.js 20 LTS.
- npm.
- RAM minimal 1 GB untuk bot dan proses dasar.
- Penyimpanan yang cukup untuk source, database, log, dan backup.
- Koneksi keluar HTTPS ke API upstream dan Telegram.
- Port publik tidak diperlukan untuk mode polling Telegram, kecuali deployment pembeli menambahkan webhook atau service eksternal.

`package.json` mendefinisikan Node.js minimal versi 18 dan dependency `telegraf`, `axios`, `sqlite3`, `express`, `sharp`, dan `winston`. README merekomendasikan Node.js 20 karena kompatibilitas binding `sqlite3`.

## 3. Membuat bot Telegram

1. Buka BotFather.
2. Buat bot baru.
3. Salin token bot.
4. Dapatkan Telegram ID calon admin.
5. Jangan mengirim token ke grup atau memasukkannya ke dokumentasi publik.

Token hanya dimasukkan ke `.vars.json` pada server pembeli.

## 4. Mendapatkan akses reseller API

Pemilik API BotVPN utama harus:

1. Mendaftarkan Telegram ID pembeli sebagai reseller.
2. Memberikan saldo modal reseller.
3. Membuat API key reseller.
4. Memberikan alamat base API.
5. Memastikan endpoint API dapat diakses dari VPS pembeli.

API key reseller bukan token Telegram. Jangan menukar kedua nilai tersebut.

Endpoint yang digunakan bot antara lain:

- `GET /me`
- `GET /balance`
- `GET /servers`
- `GET /products`
- `POST /operations`
- Endpoint `/edu/*`
- Endpoint `/vpncf/*`

## 5. Instalasi

```bash
git clone <repository-atau-paket-yang-diberikan> BotVPN-Reseller
cd BotVPN-Reseller
npm install
```

Pastikan file entrypoint yang dirujuk `package.json` tersedia sebelum menjalankan bot:

```bash
node app.js
```

Untuk production, gunakan PM2 sesuai `ecosystem.config.js`:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Jangan menjalankan source dengan user root jika tidak diperlukan.

## 6. Membuat `.vars.json`

Contoh aman dengan nilai placeholder:

```json
{
  "BOT_TOKEN": "ISI_TOKEN_BOT_TELEGRAM",
  "USER_ID": "ISI_TELEGRAM_ID_ADMIN",
  "NAMA_STORE": "NAMA TOKO",
  "GROUP_ID": "ISI_GROUP_ID",
  "PORT": "6969",
  "PAYMENT": "SHOPEEPAY",
  "GOPAY_KEY": "",
  "DATA_QRIS_ORKUT": "",
  "AUTH_USERNAME_ORKUT": "",
  "AUTH_TOKEN_ORKUT": "",
  "SHOPEEPAY_BASE_URL": "http://localhost:2007",
  "GOPAY_QRIS_BASE_URL": "http://localhost:2234",
  "API_BASE_URL": "https://alamat-api-upstream/api/v1",
  "API_KEY": "ISI_API_KEY_RESELLER",
  "REQUIRED_CHANNEL": "",
  "REQUIRED_GROUP": "",
  "ADMIN_USERNAME": "Admin",
  "CREATOR": "Admin",
  "ENABLE_VPNCF": true
}
```

Nilai harus berupa JSON valid. Jangan menggunakan tanda kutip tambahan, trailing comma, atau memasukkan credential ke Git.

## 7. Konfigurasi pembayaran

Top up memerlukan service pembayaran yang sesuai dengan nilai `PAYMENT`.

- ShopeePay menggunakan `SHOPEEPAY_BASE_URL`.
- GoPay menggunakan `GOPAY_QRIS_BASE_URL`; module memiliki fallback localhost jika key ini tidak diatur.
- Orkut memerlukan konfigurasi QRIS dan autentikasi yang sesuai service pembeli.

Service pembayaran bukan bagian dari API provisioning VPN. Jika service QRIS tidak aktif, pembelian dengan saldo kurang atau top up dapat gagal walaupun API VPN normal.

## 8. Pengujian setelah instalasi

Lakukan pengujian berurutan:

1. Bot dapat start tanpa error.
2. Bot dapat merespons `/start` atau menu awal yang tersedia.
3. API key valid dengan memeriksa `GET /me`.
4. Saldo modal terbaca melalui `GET /balance`.
5. Server terbaca melalui `GET /servers`.
6. Produk terbaca melalui `GET /products`.
7. Coba satu transaksi nominal kecil.
8. Uji renew, check, delete, atau fitur non-pembuatan sesuai izin.
9. Uji top up hanya setelah gateway QRIS siap.
10. Pastikan backup database dan permission file benar.

Contoh pemeriksaan API tanpa menampilkan key:

```bash
curl -H "Authorization: Bearer API_KEY_REDACTED" \
  https://alamat-api-upstream/api/v1/me
```

## 9. Struktur data lokal

Bot menggunakan database lokal untuk data customer, saldo, transaksi, purchase, server mirror, dan daftar reseller sesuai module yang tersedia. Akun VPN sebenarnya diproses pada API/panel upstream, bukan dibuat langsung oleh database lokal bot.

Jangan menghapus file database saat bot berjalan. Sebelum migrasi VPS:

1. Hentikan bot.
2. Salin database.
3. Salin `.vars.json` melalui kanal aman.
4. Jalankan bot di server baru.
5. Verifikasi saldo dan transaksi.

## 10. Hak akses dan tanggung jawab pembeli

Pembeli bertanggung jawab atas:

- VPS dan firewall.
- Kerahasiaan bot token dan API key.
- Saldo reseller upstream.
- Service QRIS.
- Backup dan pemulihan database.
- Moderasi user dan penggunaan bot.
- Monitoring error dan transaksi `PENDING_VERIFY`.

Pemilik API utama bertanggung jawab atas:

- Ketersediaan endpoint upstream.
- Validasi API key reseller.
- Data server dan harga upstream.
- Provisioning akun pada panel VPN.
- Saldo modal reseller pada sistem upstream.

## 11. Fitur yang bergantung pada upstream

Fitur berikut tidak dapat berjalan mandiri tanpa API upstream yang sesuai:

- Create SSH, VMess, VLESS, dan Trojan.
- Renew dan delete akun.
- Trial.
- Lock dan unlock.
- Change limit IP.
- CloudFront Private dan CloudFront API.
- EDU Direct.
- Sinkronisasi server dan harga.

Jika upstream tidak menyediakan endpoint atau izin action, menu terkait tidak boleh dianggap tersedia hanya karena module lokal ada.

## 12. Keamanan wajib

- Jangan membagikan `BOT_TOKEN`, `API_KEY`, token Orkut, atau credential QRIS.
- Berikan permission terbatas pada `.vars.json`.
- Jangan mencetak header Authorization ke log.
- Gunakan user Linux khusus untuk bot.
- Aktifkan firewall dan update OS.
- Batasi akses SSH dengan key.
- Rotasi credential jika VPS pernah diakses pihak lain.
- Jangan mengirim database ke pembeli atau pihak lain tanpa perlindungan karena dapat berisi data user dan saldo.

## 13. Troubleshooting pembeli

### Bot tidak mau start
Periksa Node.js, `npm install`, JSON `.vars.json`, dan keberadaan `app.js`.

### API 401
API key salah, tidak aktif, atau tidak sesuai base URL.

### API 403
Reseller belum terdaftar, dinonaktifkan, atau tidak memiliki izin.

### API 402
Saldo modal reseller upstream tidak cukup.

### Server atau produk kosong
API upstream gagal, sinkronisasi belum berjalan, atau response upstream berubah.

### Pembayaran tidak masuk
Periksa service QRIS, base URL gateway, nominal, dan status invoice. Jangan membuat order ulang sebelum transaksi lama diperiksa.

### Akun terbuat tetapi bot menampilkan gagal
Periksa status `PENDING_VERIFY` dan verifikasi panel upstream sebelum refund atau retry.

## 14. Checklist serah-terima

- [ ] Source code diterima.
- [ ] Node.js dan npm kompatibel.
- [ ] Bot Telegram berhasil dibuat.
- [ ] Telegram ID admin sudah benar.
- [ ] API key reseller sudah aktif.
- [ ] API `/me`, `/balance`, `/servers`, dan `/products` berhasil diuji.
- [ ] `.vars.json` valid dan tidak berisi placeholder yang belum diganti.
- [ ] Gateway pembayaran diuji bila digunakan.
- [ ] PM2 atau service manager aktif.
- [ ] Backup database dikonfigurasi.
- [ ] Credential tidak dikirim melalui dokumentasi publik.
- [ ] Batas tanggung jawab antara pembeli dan pemilik API upstream disepakati.
