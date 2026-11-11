# Panduan Administrator

Identitas admin dikonfigurasi melalui `USER_ID`, `ADMIN_USERNAME`, `CREATOR`. README menyebut menu Tambah Saldo, Lihat Saldo User, Sync Server API, Restart bot, dan toggle CloudFront Private. Handler aktual tidak bisa diverifikasi karena `app.js` hilang.

## Operasi yang dapat dipastikan
- Audit konfigurasi `.vars.json`.
- Periksa API upstream lewat `/me`, `/balance`, `/servers`.
- Kelola file reseller melalui module `reseller.js`.
- Backup database melalui `backup.js` bila scheduler runtime diintegrasikan.

## Batasan
`/addserver` dan `/editharga` dikelola bot utama menurut README. Jangan menganggap admin lokal dapat membuat server, mengubah harga, atau mengubah database akun tanpa entrypoint.

## Praktik aman
Batasi akses `USER_ID`, lindungi token, tinjau `PENDING_VERIFY` manual sebelum refund, dan jangan mengubah database saat proses order aktif.
