# 🐛 Cara Mengaktifkan/Menonaktifkan Debug Mode

## ⚡ Ringkasan Cepat

Debug mode mengontrol apakah log development muncul di browser console atau tidak.

### Aktifkan Debug Mode (Development)
```env
VITE_DEBUG_MODE=true
```

### Matikan Debug Mode (Production)
```env
VITE_DEBUG_MODE=false
```

**PENTING:** Setelah ubah `.env`, HARUS restart server dengan `Ctrl+C` lalu `npm run dev`

---

## 📋 Langkah-Langkah Detail

### 1. Buka File `.env`

Buka file `.env` di root folder proyek (sejajar dengan `package.json`).

### 2. Ubah Nilai `VITE_DEBUG_MODE`

**Untuk HIDUP (Menampilkan semua log):**
```env
VITE_DEBUG_MODE=true
```

**Untuk MATI (Menyembunyikan log debug):**
```env
VITE_DEBUG_MODE=false
```

### 3. Restart Development Server

```bash
# Tekan Ctrl+C untuk stop server
# Lalu jalankan lagi:
npm run dev
```

### 4. Buka Browser Console

- Chrome/Edge: Tekan `F12` atau `Ctrl+Shift+I`
- Firefox: Tekan `F12` atau `Ctrl+Shift+K`

---

## ✅ Cara Cek Apakah Sudah Berhasil

### Saat `VITE_DEBUG_MODE=true` (HIDUP)
Console akan menampilkan log seperti:
```
🔍 Environment Variables Check:
POE: ✅
GROQ: ✅
✅ GROQ KEY LOADED: gsk_YbCjZo...
```

### Saat `VITE_DEBUG_MODE=false` (MATI)
Console akan **KOSONG** atau hanya menampilkan:
- Pesan error kritis (jika ada masalah)
- Pesan `alwaysLog` (untuk info penting)
- React DevTools message (ini dari React, bukan dari app)

---

## 🎯 Kapan Pakai Mode Apa?

| Mode | Kapan Digunakan | Log Muncul? |
|------|----------------|-------------|
| `true` | Development, debugging, mencari bug | ✅ YA |
| `false` | Production, demo, publish online | ❌ TIDAK |

---

## 🔧 Contoh File `.env`

```env
# Debug Mode
VITE_DEBUG_MODE=true

# Password Protection
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=mypassword123

# API Keys
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxx
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
```

---

## ❓ Troubleshooting

### Log masih muncul padahal sudah set `false`

**Penyebab:** Server belum di-restart

**Solusi:**
1. Tekan `Ctrl+C` di terminal
2. Jalankan `npm run dev` lagi
3. Refresh browser (`Ctrl+R` atau `F5`)

### Log tidak muncul padahal sudah set `true`

**Periksa:**
1. ✅ Nilai ditulis: `VITE_DEBUG_MODE=true` (tidak ada spasi)
2. ✅ Bukan `VITE_DEBUG_MODE="true"` (tanpa tanda kutip)
3. ✅ Server sudah di-restart
4. ✅ Browser console sudah dibuka (F12)
5. ✅ Filter console tidak menyembunyikan log

### Pesan "React DevTools" tetap muncul

Ini **NORMAL**! Pesan ini dari React library, bukan dari aplikasi. Tidak bisa dimatikan dan tidak masalah.

---

## 📚 Dokumentasi Lengkap

Untuk dokumentasi lengkap dan cara menggunakan debug functions di kode, baca:
- `DEBUG_MODE_GUIDE.md` - Panduan lengkap dengan contoh kode

---

**Dibuat:** 2024  
**Untuk:** HadesChat  
**Versi:** 1.0