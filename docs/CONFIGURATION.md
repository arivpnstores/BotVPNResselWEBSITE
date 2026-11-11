# Konfigurasi

Sumber utama adalah `.vars.json`, dibaca oleh `modules/api-client.js` dan module pembayaran. Tidak ditemukan penggunaan `process.env` pada source yang diaudit.

| Key | Fungsi | Status |
|---|---|---|
| `BOT_TOKEN` | Token Telegram | dipakai runtime yang hilang |
| `USER_ID` | Telegram ID admin | konfigurasi |
| `NAMA_STORE` | Nama toko | konfigurasi |
| `GROUP_ID` | Group notifikasi | pemakaian runtime tidak terverifikasi |
| `PORT` | Port aplikasi | pemakaian tidak terverifikasi |
| `PAYMENT` | Gateway, contoh `SHOPEEPAY` | dipakai alur pembayaran |
| `GOPAY_KEY` | Key GoPay | tidak dipakai `gopay-qris.js` |
| `DATA_QRIS_ORKUT` | Data QRIS Orkut | dipakai/diantisipasi purchase flow |
| `AUTH_USERNAME_ORKUT` | Username Orkut | sama |
| `AUTH_TOKEN_ORKUT` | Token Orkut | sama |
| `SHOPEEPAY_BASE_URL` | Base service ShopeePay | default module localhost:2007 |
| `GOPAY_QRIS_BASE_URL` | Base GoPay QRIS | tidak ada pada contoh `.vars.json`; fallback localhost:2234 |
| `API_BASE_URL` | Base API upstream | default pada client |
| `API_KEY` | Bearer key reseller | rahasia |
| `REQUIRED_CHANNEL` | Gate channel | handler tidak terverifikasi |
| `REQUIRED_GROUP` | Gate group | handler tidak terverifikasi |
| `ADMIN_USERNAME` / `CREATOR` | Identitas tampilan admin | konfigurasi |
| `ENABLE_VPNCF` | Toggle CloudFront Private | module membaca fitur; command belum terverifikasi |

Jangan menulis nilai credential asli ke dokumentasi. `.vars.json` saat audit berisi placeholder API key dan beberapa nilai kosong.
