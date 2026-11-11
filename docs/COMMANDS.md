# Commands dan Callback Telegram

## Yang disebut dokumentasi
README menyebut `/addressel`, `/addsaldo`, `/apikey`, `/togglevpncf`, `/addserver`, `/editharga`; sebagian adalah command BotVPN utama atau diarahkan ke upstream. Tidak ada registrasi `bot.command()` yang dapat diaudit karena `app.js` hilang.

| Command | Sasaran/status |
|---|---|
| `/addressel <telegram_id>` | pendaftaran reseller di bot utama; handler lokal tidak ditemukan |
| `/addsaldo <telegram_id> <nominal>` | admin/upstream; handler lokal tidak terverifikasi |
| `/apikey create <telegram_id>` | pembuatan key di bot utama |
| `/togglevpncf` | diklaim toggle admin; implementasi tidak ditemukan |
| `/addserver`, `/editharga` | diblokir/diarahkan ke bot utama menurut README |

Menu locale `locales/id.json` mencantumkan create, renew, delete, check server, migrate, protocol/IP limit, fix, lock/unlock, trial, topup, EDU, CloudFront, list account, reseller, language. Itu bukan bukti semua handler runtime tersedia.

## Callback yang ditemukan
`modules/confirmation.js:27-31` mendaftarkan pola `cfm_yes_(.+)` dan `cfm_no_(.+)` untuk konfirmasi/pembatalan. Callback lain tidak dapat dipetakan.

## Parameter dan error
Parameter callback adalah suffix identifier transaksi/operasi. Validasi lanjutan ada di confirmation flow; detail pesan dan menu membutuhkan `app.js`. Jangan mengandalkan command di atas sebelum entrypoint deployment dikembalikan.
