# Database

## File database
`backup.js:4` mencantumkan `sellvpn.db`, `ressel.db`, `trial.db`, `listaccount.db`.

### sellvpn.db
`modules/server-store.js:7-30` membuka SQLite dan membaca tabel `Server` berdasarkan `id` atau `domain`. Kolom server mengikuti data API (`id`, `domain`, nama, harga, limit, status) tetapi DDL lokal tidak ditemukan. README mengklaim sync start/5 menit/manual; implementasinya tidak dapat diverifikasi.

### ressel.db
Bukan SQLite pada `modules/reseller.js`; diperlakukan sebagai file teks newline-delimited Telegram ID. Dibaca/cache 30 detik, ditambah dan dihapus. Tidak ada deduplikasi/locking.

### users
DDL tidak ditemukan. Query `modules/i18n.js:55-81` memakai `user_id`, `language`; `purchase-flow.js:631-636` memakai `saldo`. Relasi yang dapat dipastikan: satu Telegram user memiliki bahasa dan saldo.

### purchases
DDL dibuat `PurchaseFlow.init()` (`purchase-flow.js:44-62`): `id`, unique `transaction_id`, `invoice_id`, `user_id`, `product`, `shortage_amount`, `total_harga`, `status`, timestamps, `purchase_data`, unique `unique_code`, `error_log`. Status: `PENDING_PAYMENT`, `PAID`, `SUCCESS`, `EXPIRED`, `PENDING_VERIFY`, `FAILED_CREATE`, dan refund dicatat pada alur.

### pending_deposits dan transactions
Keduanya dipakai tetapi DDL tidak ditemukan. `pending_deposits` menyimpan unique code, user, nominal, timestamp, status, QR message, transaction dan chat. `transactions` menyimpan user, amount, type, reference, timestamp (`purchase-flow.js:239-244`, `567-570`).

## Mutasi
Saldo dipotong sebelum provisioning, dikembalikan untuk kegagalan pasti; error uncertain menjadi `PENDING_VERIFY`. Akun VPN tidak diprovision lokal, melainkan upstream. Backup otomatis (`backup.js`) mengirim database yang terdaftar ke admin; tidak ada enkripsi/retention yang terlihat.

## Gap audit
DDL users/pending_deposits/transactions, trial/listaccount usage, relasi foreign key, indeks tambahan, dan migrasi database tidak tersedia pada source.
