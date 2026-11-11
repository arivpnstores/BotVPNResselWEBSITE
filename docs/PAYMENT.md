# Payment dan Saldo

## Saldo
`purchase-flow.js` membaca saldo user, membandingkan total, memotong saldo sebelum provisioning, lalu mencatat transaksi. Kegagalan pasti memicu refund; error uncertain dicatat `PENDING_VERIFY` tanpa refund otomatis dan admin diberi notifikasi.

## Gateway
- ShopeePay: `modules/shopee-pay.js`, `GET {SHOPEEPAY_BASE_URL}/createqris/amount={amount}` dan `cekpembayaran/transaction_sn={orderSn}`; fallback localhost:2007.
- GoPay: `modules/gopay-qris.js`, create QRIS dan cek pembayaran; fallback localhost:2234.
- Orkut: diproses dalam `purchase-flow.js`, konfigurasi QRIS/auth diperlukan.

## Alur saldo kurang
Hitung shortage → buat QRIS → insert `purchases` dan `pending_deposits` → tunggu pembayaran → tandai paid → lanjutkan provisioning. Handler polling/webhook tidak dapat diverifikasi karena `app.js` hilang.

## Status
`PENDING_PAYMENT`, `PAID`, `SUCCESS`, `EXPIRED`, `PENDING_VERIFY`, `FAILED_CREATE`; refund dipakai untuk kompensasi kegagalan tertentu.

## Risiko operasional
Service payment adalah dependency eksternal localhost. Validasi nominal, transaction ID, status pembayaran, dan idempotensi harus dilakukan pada implementasi upstream/runtime sebelum produksi.
