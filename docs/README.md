# Dokumentasi BotVPN-Reseller

## Tujuan
Repository ini adalah bot Telegram reseller yang menjadi client API BotVPN upstream. Bot menyediakan menu operasi VPN, saldo customer lokal, dan pembayaran QRIS. Provisioning akun VPN dilakukan oleh API upstream; repository ini tidak menyimpan kredensial panel VPN.

## Status audit
Audit berdasarkan source yang tersedia. `app.js` direferensikan sebagai entrypoint (`package.json:5-8`, `ecosystem.config.js`) tetapi tidak ada di repository. Karena itu handler Telegram, inisialisasi database utama, scheduler, dan sebagian integrasi runtime tidak dapat diverifikasi. Hal yang hanya disebut README diberi label **BELUM DAPAT DIVERIFIKASI**.

## Peta dokumen
- [Panduan Pembeli Self-Hosting](BUYER_SELF_HOSTING.md)
- [Instalasi](INSTALLATION.md) · [Konfigurasi](CONFIGURATION.md) · [Environment](ENVIRONMENT.md)
- [Fitur](FEATURES.md) · [Command & callback](COMMANDS.md) · [API](API.md)
- [Database](DATABASE.md) · [Admin](ADMIN_GUIDE.md) · [Reseller](RESELLER_GUIDE.md) · [User](USER_GUIDE.md)
- [Payment](PAYMENT.md) · [Server](SERVER_MANAGEMENT.md) · [Error](ERROR_HANDLING.md) · [Troubleshooting](TROUBLESHOOTING.md)

## File penting
`modules/api-client.js`, `modules/purchase-flow.js`, `modules/create.js`, `renew.js`, `del.js`, `trial.js`, `change-ip.js`, `lock.js`, `unlock.js`, `sshcf.js`, `nadiavpn.js`, `naytra.js`, `server-store.js`, `reseller.js`, `confirmation.js`, `backup.js`, `.vars.json`, `package.json`.

## Batasan
Dokumen ini tidak mengarang command atau schema yang tidak ada. Token, API key, dan credential tidak ditampilkan.
