# Fitur

Semua operasi standar mengarah ke `modules/_op.js` → `api-client.operation()` (`modules/api-client.js:84-94`). Payload aktual diteruskan ke API upstream; bentuk field Telegram tidak bisa dipastikan tanpa `app.js`.

## Akun standar
| Fitur | Akses source | Action | Status |
|---|---|---|---|
| Create SSH | `modules/create.js:7-20` | `create`, protocol `ssh` | tersedia sebagai proxy |
| Create VMess | sama | `create`, `vmess` | tersedia |
| Create VLESS | sama | `create`, `vless` | tersedia |
| Create Trojan | sama | `create`, `trojan` | tersedia |
| Renew | `modules/renew.js:7-20` | `renew` | tersedia |
| Delete | `modules/del.js:8-24` | `delete` | tersedia |
| Check account/server | `modules/del.js:8-24` | `cek` | proxy tersedia; UI tidak terverifikasi |
| Trial | `modules/trial.js` | `trial` | proxy tersedia |
| Lock/unlock | `modules/lock.js`, `unlock.js` | `lock`, `unlock` | tersedia |
| Limit IP | `modules/change-ip.js:7-20` | `changelimip` | tersedia |
| Fix | README:155 | `fix` | BELUM TERSEDIA sebagai module; dispatcher/UI hilang |
| Migrasi standar | README:111 | tidak ditemukan module khusus | BELUM DAPAT DIVERIFIKASI |

Parameter operasional bergantung payload API: protocol, server/product, username/account, duration, dan limit IP sesuai operasi. Contoh konseptual:
```json
{"action":"create","protocol":"ssh","server_id":1,"username":"contoh","duration":30,"limit_ip":2}
```
Response sukses/gagal berasal dari API upstream; gunakan format upstream, bukan asumsi lokal.

## CloudFront Private
`modules/sshcf.js:9-31` mendukung `sshcf`, `vmesscf`, `vlesscf`, `trojancf` untuk create/renew. Toggle `ENABLE_VPNCF` dikonfigurasi, tetapi `/togglevpncf` belum dapat diverifikasi.

## CloudFront API
`modules/nadiavpn.js:10-50`: servers, accounts, details, sync, create, trial, renew, migrate, delete melalui `/vpncf/*`.

## EDU Direct
`modules/naytra.js:8-41`: products, accounts, renewable, trial, order, renew melalui `/edu/*`.

## Saldo dan transaksi
`modules/purchase-flow.js` memeriksa `users.saldo`, memotong saldo, menjalankan provisioning asynchronous, mencatat `purchases`, refund untuk kegagalan pasti, dan `PENDING_VERIFY` untuk error tidak pasti. Kekurangan saldo membuat invoice QRIS dan pending deposit.

## Reseller, admin, history
`modules/reseller.js` menyimpan daftar Telegram ID reseller di `ressel.db`. Menu admin, transaction history, user management, dan generate config disebut locale/README atau dipakai alur, tetapi handler lengkap tidak dapat diverifikasi karena `app.js` hilang. Tandai sebagai BELUM DAPAT DIVERIFIKASI, bukan jaminan tersedia.

## Fitur yang tidak ditemukan
SlowDNS, Cloudflare terpisah, Edu Direct (yang ada adalah EDU), Generate Config sebagai command khusus, Extend Expiration sebagai action terpisah, dan schema akun lokal tidak ditemukan. SlowDNS mungkin termasuk varian SSH upstream, tetapi tidak boleh dianggap fitur mandiri tanpa handler.

## Format dokumentasi operasi
Input nyata harus dilihat dari handler entrypoint yang hilang. Validasi upstream dapat menghasilkan 400/401/402/403/404/429/502/503/530. File proxy dan API menjadi sumber implementasi; database provisioning berada di upstream.
