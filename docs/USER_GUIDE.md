# Panduan User/Member

Identitas user adalah Telegram ID. Bahasa disimpan pada `users.language`; saldo pada `users.saldo`. Menu locale mencantumkan pembuatan, renew, hapus, cek, trial, lock/unlock, limit IP, topup, EDU, CloudFront, daftar akun, dan bahasa.

Alur pembelian:
- Saldo cukup: saldo dipotong, provisioning dijalankan asynchronous, sukses dicatat.
- Saldo kurang: dibuat invoice/QRIS dan record pending deposit, lalu order dilanjutkan setelah pembayaran.

Parameter username, server, durasi, protocol, dan limit IP berasal dari UI handler yang tidak tersedia. Jika operasi gagal, simpan transaction ID dan hubungi admin; jangan mengulang order sebelum status diperiksa karena error uncertain bisa berarti akun upstream sudah dibuat.

SlowDNS, Cloudflare standalone, dan command generate config tidak ditemukan sebagai fitur mandiri dalam source yang diaudit.
