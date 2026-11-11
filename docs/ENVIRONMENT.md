# Environment dan Konfigurasi Rahasia

Tidak ada file `.env` yang digunakan secara eksplisit. Konfigurasi dibaca dari `.vars.json`. Untuk deployment, simpan file tersebut di luar version control dan gunakan secret manager bila tersedia.

## Secret
`BOT_TOKEN`, `API_KEY`, `AUTH_TOKEN_ORKUT`, `GOPAY_KEY`, dan credential service pembayaran adalah secret. Nilai asli tidak dicantumkan di docs.

## Runtime eksternal
- API upstream: `API_BASE_URL`, Bearer API key.
- ShopeePay: service HTTP lokal pada `SHOPEEPAY_BASE_URL`.
- GoPay: `GOPAY_QRIS_BASE_URL` atau fallback `http://localhost:2234`.
- Orkut: konfigurasi QRIS dan auth dari object konfigurasi.

## Checklist
- JSON valid.
- API key aktif dan reseller memiliki saldo upstream.
- Service pembayaran dapat diakses dari proses Node.
- Database memiliki permission baca/tulis.
- File rahasia tidak masuk backup publik atau git.
