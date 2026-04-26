# Media Kit Website – JemoDusunTV

Website media kit dinamis dengan YouTube live data.

---

## File dalam folder ini

- `index.html` → Halaman utama website
- `config.js`  → Data channel (edit di sini untuk update)
- `README.md`  → Panduan ini

---

## Cara Update Data

Buka file `config.js` dengan Notepad atau VS Code, edit angka yang perlu diubah, lalu simpan.

---

## Cara Aktifkan YouTube Live Data (GRATIS)

### Langkah 1 – Buat API Key Google

1. Buka https://console.cloud.google.com
2. Buat project baru (nama bebas, misal: "MediaKit")
3. Di menu kiri → **APIs & Services** → **Library**
4. Cari **"YouTube Data API v3"** → Klik → Enable
5. Di menu kiri → **APIs & Services** → **Credentials**
6. Klik **"+ Create Credentials"** → pilih **API Key**
7. Copy API key yang muncul

### Langkah 2 – Cari Channel ID Anda

1. Buka YouTube channel Anda
2. Klik kanan → View Page Source
3. Tekan Ctrl+F, cari: `"channelId"`
4. Copy nilai seperti: `UCxxxxxxxxxxxxxxxxxxxxxx`

Atau pakai tool: https://commentpicker.com/youtube-channel-id.php

### Langkah 3 – Masukkan ke config.js

```js
youtube_api_key: "AIzaSy...", // API key dari step 1
youtube_channel_id: "UCxxx...", // Channel ID dari step 2
```

---

## Deploy ke Internet GRATIS

### Opsi A – Netlify (Paling mudah, recommended)

1. Buka https://netlify.com → Sign up gratis
2. Drag & drop folder `mediakit-site` ke dashboard Netlify
3. Website langsung online! URL seperti: `random-name.netlify.app`
4. Bisa ganti nama di Settings → Domain management

### Opsi B – GitHub Pages

1. Buat akun di https://github.com
2. Buat repository baru (nama bebas)
3. Upload semua file (index.html, config.js)
4. Settings → Pages → Source: main branch
5. Website online di: `username.github.io/nama-repo`

### Opsi C – Domain sendiri (opsional, ~Rp 150rb/tahun)

Setelah deploy di Netlify, beli domain di Niagahoster atau Domainesia,
lalu arahkan ke Netlify via CNAME record.

---

## Update Data Setelah Deploy

**Netlify:** Upload ulang file `config.js` yang sudah diedit
**GitHub Pages:** Edit file di GitHub langsung, auto-update dalam 1-2 menit

---

## Troubleshooting

**YouTube data tidak muncul:**
- Pastikan API key sudah benar di config.js
- Pastikan Channel ID benar (diawali UC...)
- Cek quota di Google Console (gratis 10.000 request/hari)

**Website tidak bisa dibuka:**
- Pastikan index.html dan config.js ada dalam folder yang sama
- Jangan buka langsung dari file (file://...), harus via server atau Netlify
