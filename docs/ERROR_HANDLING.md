# Error Handling

## API client
`modules/api-client.js:56-73` memetakan 401 API key invalid, 403 akses/reseller nonaktif, 402 saldo upstream kurang, 429 rate limit, 502/503/530 upstream tidak tersedia, dan koneksi tanpa response.

## Purchase flow
`modules/purchase-flow.js:14-23` menganggap error runtime tertentu tidak pasti. Untuk kondisi ini tidak ada refund otomatis; transaksi `PENDING_VERIFY` agar admin memeriksa panel. Kegagalan pasti dapat menghasilkan refund dan `FAILED_CREATE`.

## Validasi umum
Periksa action, protocol, server/product, durasi, limit IP, saldo, dan status akun. Gunakan transaction ID untuk tracing. Jangan mengulang request ketika status tidak jelas.

## Security
Jangan log Bearer token, token Telegram, password, QR auth, atau payload credential. Sanitasi error sebelum dikirim ke user.
