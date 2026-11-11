# Server Management

Bot ini bukan panel server. Daftar server diambil dari API upstream (`GET /servers`) dan dibaca lokal oleh `modules/server-store.js` dari tabel `Server`.

README mengklaim sinkron saat start, tiap 5 menit, dan manual via admin; scheduler/sync tidak ditemukan karena `app.js` hilang. CRUD server dan ubah harga/IP limit tidak ditemukan di module lokal dan diarahkan ke BotVPN utama.

Field yang dikonsumsi/didokumentasikan upstream dapat mencakup `id`, `nama_server`, `domain`, `cloudfront_domain`, `harga`, `batas_create_akun`, `total_create_akun`, `iplimit`, `status`, dan location. Sumber kebenaran tetap response upstream.

Jika server penuh/offline, API dapat menolak provisioning. Periksa `/servers` dan saldo reseller sebelum melakukan order.
