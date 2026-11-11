# Troubleshooting

## Bot tidak start
Pastikan `app.js` ada; package scripts dan PM2 menunjuk ke file itu. Audit repository menemukan file tersebut hilang.

## sqlite3 binding gagal
Gunakan Node.js 20 sesuai README, install build tools, lalu `npm rebuild sqlite3 --build-from-source` bila diperlukan.

## API 401/403
Periksa `API_BASE_URL`, API key reseller, status reseller di upstream, dan header Bearer.

## API 402
Saldo modal reseller upstream tidak cukup; top up melalui BotVPN utama.

## Pembayaran tidak terdeteksi
Pastikan service gateway hidup pada base URL yang sesuai, nominal dan transaction ID benar, serta handler polling/webhook runtime tersedia. `GOPAY_KEY` tidak digunakan oleh module GoPay yang diaudit.

## Akun terbuat tetapi bot error
Cari status `PENDING_VERIFY`; verifikasi panel upstream sebelum refund atau retry.

## Server kosong/stale
Periksa `/servers`, tabel `Server`, dan scheduler sync. Scheduler tidak dapat dikonfirmasi dari source karena entrypoint hilang.

## Callback/menu tidak muncul
`confirmation.js` hanya membuktikan callback `cfm_yes_*`/`cfm_no_*`; registrasi handler utama berada pada file yang tidak tersedia.
