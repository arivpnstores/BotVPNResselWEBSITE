# API Upstream

Base URL dikonfigurasi `API_BASE_URL`; default client `https://api.rajaserver.web.id/api/v1` (`modules/api-client.js:16-27`). Client mengirim `Authorization: Bearer <API_KEY>`, timeout 130 detik (`api-client.js:39-46`). Ini bukan API server lokal; repository hanya client.

| Method | Endpoint | Kegunaan |
|---|---|---|
| GET | `/me` | identitas reseller |
| GET | `/balance` | saldo upstream |
| GET | `/servers` | daftar/sinkron server |
| GET | `/products` | produk |
| POST | `/operations` | action create, renew, delete, lock, unlock, changelimip, trial, fix, cek |
| GET | `/edu/products`, `/edu/accounts`, `/edu/renewable` | EDU |
| POST | `/edu/trial`, `/edu/order`, `/edu/renew` | EDU |
| GET | `/vpncf/servers`, `/vpncf/accounts` | CloudFront API |
| POST | `/vpncf/account/details`, `/account/sync`, `/create`, `/trial`, `/renew`, `/migrate`, `/delete` | CloudFront API |

Header umum:
```http
Authorization: Bearer rsl_REDACTED
Content-Type: application/json
```

Contoh:
```bash
curl -H "Authorization: Bearer rsl_REDACTED" https://api.example.invalid/api/v1/servers
curl -X POST -H "Authorization: Bearer rsl_REDACTED" -H "Content-Type: application/json" -d '{"action":"create","protocol":"ssh","server_id":1,"duration":30}' https://api.example.invalid/api/v1/operations
```
Gunakan host aktual dari `.vars.json`; host contoh sengaja tidak memuat credential.

Response sukses dan body operasi diteruskan oleh `api-client.js`/`_op.js`; schema detail payload operasi tidak dapat dipastikan tanpa upstream/handler yang hilang. Error mapping client: 401 invalid key, 403 suspended/forbidden, 402 insufficient balance, 429 rate limit, 502/503/530 upstream unavailable, dan no-response connection failure. `docs/openapi.yaml` serta `docs/API_RESELLER.md` memuat kontrak tambahan seperti `/health`, `/accounts`, tetapi endpoint tersebut tidak dipanggil client lokal dan implementasinya berada upstream.
