# Instalasi dan Deployment

## Prasyarat
- Node.js >=18 sesuai `package.json:22-23`; README merekomendasikan Node.js 20 karena `sqlite3` native.
- npm.
- Service API BotVPN upstream.
- Service QRIS lokal sesuai gateway yang dipilih.
- Token bot Telegram dan API key reseller.

## Instalasi lokal
```bash
npm install
node app.js
```
`npm start` dan `npm dev` sama-sama menjalankan `node app.js` (`package.json:5-8`). Saat audit, `app.js` tidak tersedia sehingga proses runtime belum dapat diverifikasi.

## PM2
```bash
pm2 start ecosystem.config.js
```
`ecosystem.config.js` juga mengasumsikan `app.js`.

## Installer
File `start` memasang Node.js 20, PM2, dependency, membuat `.vars.json`, lalu menjalankan PM2. Nilai konfigurasi harus di-escape valid sebagai JSON; jangan masukkan credential ke repository.

## Validasi pascainstalasi
1. Pastikan `.vars.json` valid JSON.
2. Pastikan `app.js` tersedia pada deployment aktual.
3. Uji akses API upstream dengan `GET /me`.
4. Uji service QRIS lokal.
5. Periksa log proses dan kemampuan membuka SQLite.

## Catatan keamanan
Gunakan permission ketat untuk `.vars.json`, jangan membagikan backup database atau token Telegram, dan rotasi credential jika pernah terekspos.
