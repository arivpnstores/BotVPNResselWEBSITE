# Panduan Reseller

Reseller dikenali dari Telegram ID yang ada di `ressel.db` (`modules/reseller.js`). Provisioning memakai API key reseller dan saldo modal upstream; saldo customer disimpan lokal.

Alur operasional:
1. Reseller didaftarkan di BotVPN utama.
2. API key reseller dimasukkan ke `.vars.json`.
3. Customer memilih produk melalui bot.
4. `purchase-flow.js` memotong saldo lokal atau membuat pembayaran QRIS.
5. API upstream memprovision akun dan saldo modal upstream berkurang.

Command pendaftaran/API key yang ada di README (`/addressel`, `/apikey`) ditujukan BotVPN utama; handler lokal tidak terbukti. Periksa `GET /me`, `GET /balance`, dan `GET /servers` dengan API key tanpa menampilkan key pada log.
