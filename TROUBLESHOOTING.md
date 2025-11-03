# 🔧 Troubleshooting Guide - HadesChat

## 🚨 Masalah Umum & Solusi

---

## 1. Error: "Cannot read properties of undefined (reading 'digest')"

### Gejala:
```
Authentication error: TypeError: Cannot read properties of undefined (reading 'digest')
at hashPassword (PasswordProtection.tsx:25:44)
```

### Penyebab:
- Web Crypto API tidak tersedia di browser
- Running di HTTP (bukan HTTPS) di production
- Browser lama yang tidak support crypto.subtle
- Context tidak secure

### ✅ Solusi:

**Solusi 1: Gunakan HTTPS (Production)**
```bash
# Pastikan aplikasi running di HTTPS, bukan HTTP
# Crypto API hanya tersedia di secure context (HTTPS atau localhost)
```

**Solusi 2: Development - Gunakan localhost**
```bash
# Jangan gunakan IP address untuk development
# ❌ http://192.168.1.10:5173
# ✅ http://localhost:5173
```

**Solusi 3: Update Browser**
- Chrome/Edge: Versi 37+
- Firefox: Versi 34+
- Safari: Versi 11+

**Solusi 4: Code sudah diperbaiki**
Kode terbaru sudah include fallback mechanism yang otomatis menggunakan hash alternatif jika crypto.subtle tidak tersedia.

---

## 2. Password Tidak Bisa Login

### Gejala:
- Memasukkan password benar tapi tidak bisa login
- Selalu muncul "Password salah"

### ✅ Solusi:

**Cek 1: Verifikasi password di .env**
```bash
cat .env | grep VITE_APP_PASSWORD
# Output: VITE_APP_PASSWORD=test123
```

**Cek 2: Restart development server**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**Cek 3: Clear browser cache**
```javascript
// Buka browser console (F12), jalankan:
sessionStorage.clear();
localStorage.clear();
location.reload();
```

**Cek 4: Pastikan tidak ada spasi**
```bash
# ❌ SALAH
VITE_APP_PASSWORD= test123
VITE_APP_PASSWORD=test123 

# ✅ BENAR
VITE_APP_PASSWORD=test123
```

---

## 3. Akun Terkunci (Lockout)

### Gejala:
- Muncul timer countdown 15:00
- Tidak bisa login meski password benar
- Pesan: "Terlalu banyak percobaan gagal"

### ✅ Solusi:

**Solusi 1: Tunggu 15 menit**
Timer akan reset otomatis setelah 15 menit.

**Solusi 2: Clear lockout manual**
```javascript
// Buka browser console (F12), jalankan:
localStorage.removeItem('__hc_auth_lockout');
localStorage.removeItem('__hc_auth_attempts');
location.reload();
```

**Solusi 3: Clear semua data auth**
```javascript
// Clear semua
sessionStorage.clear();
localStorage.removeItem('__hc_auth_lockout');
localStorage.removeItem('__hc_auth_attempts');
localStorage.removeItem('__hc_auth_session');
localStorage.removeItem('__hc_auth_timestamp');
localStorage.removeItem('__hc_auth_token');
location.reload();
```

---

## 4. Session Expired Terlalu Cepat

### Gejala:
- Auto-logout sebelum 60 menit
- Harus login berulang kali

### ✅ Solusi:

**Penyebab 1: Tab tidak aktif**
Session extend hanya saat tab aktif. Jika berpindah tab lama, session bisa expired.

**Penyebab 2: Timeout terlalu pendek**
Edit `SESSION_TIMEOUT` di `PasswordProtection.tsx`:
```typescript
const SESSION_TIMEOUT = 120 * 60 * 1000; // Ubah jadi 120 menit
```

**Penyebab 3: Browser extension**
Disable extension yang block/clear storage otomatis.

---

## 5. File .env Tidak Terbaca

### Gejala:
- Password default (test123) selalu aktif
- Perubahan di .env tidak berpengaruh

### ✅ Solusi:

**Cek 1: Nama file benar**
```bash
# Harus .env (dengan titik di depan)
ls -la | grep .env

# ❌ SALAH: env.txt, .env.txt, env
# ✅ BENAR: .env
```

**Cek 2: Lokasi file**
```bash
# File harus di root project
hadeschat/
├── .env          ← DI SINI
├── src/
├── package.json
└── ...
```

**Cek 3: Format isi file**
```bash
# ✅ BENAR
VITE_APP_PASSWORD=test123

# ❌ SALAH (ada tanda kutip)
VITE_APP_PASSWORD="test123"
VITE_APP_PASSWORD='test123'
```

**Cek 4: Restart server setelah edit**
```bash
npm run dev
```

---

## 6. Error: "npm run dev" Tidak Jalan

### Gejala:
```
Error: Cannot find module 'vite'
Module not found
```

### ✅ Solusi:

**Install dependencies:**
```bash
npm install
```

**Clear cache dan reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Cek Node.js version:**
```bash
node --version  # Minimal v16.0.0
npm --version   # Minimal v7.0.0
```

---

## 7. Error: CORS / API Key Invalid

### Gejala:
- Chat tidak bisa mengirim pesan
- Error 401/403 di console
- "Invalid API key"

### ✅ Solusi:

**Cek API key di .env:**
```bash
cat .env | grep API_KEY
```

**Pastikan format benar:**
```bash
# Groq
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxx

# OpenRouter
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx

# Together AI
VITE_TOGETHER_API_KEY=xxxxxxxxxxxxx
```

**Test API key:**
```bash
# Test Groq API
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api.groq.com/openai/v1/models
```

---

## 8. Build Error / Production Error

### Gejala:
```
npm run build
Error: [build error message]
```

### ✅ Solusi:

**Solusi 1: Clear build cache**
```bash
rm -rf dist node_modules/.vite
npm run build
```

**Solusi 2: Update dependencies**
```bash
npm update
npm run build
```

**Solusi 3: Check TypeScript errors**
```bash
npm run type-check
# Atau
npx tsc --noEmit
```

---

## 9. Storage Manipulation Detected

### Gejala:
- Page auto-reload terus menerus
- Console warning: "Development tools detected"

### ✅ Solusi:

**Penyebab: DevTools terbuka**
Tutup browser DevTools atau comment detection di code.

**Disable DevTools detection (development only):**

Edit `src/components/PasswordProtection.tsx`:
```typescript
// Comment out bagian ini saat development:
/*
useEffect(() => {
    const detectDevTools = () => {
        // ...
    };
    const interval = setInterval(detectDevTools, 1000);
    return () => clearInterval(interval);
}, []);
*/
```

---

## 10. Lupa Password

### Gejala:
- Tidak ingat password yang di-set

### ✅ Solusi:

**Cek file .env:**
```bash
cat .env | grep VITE_APP_PASSWORD
```

**Jika tidak ada .env:**
Default password adalah: `test123`

**Reset password:**
```bash
# Buat/edit file .env
echo "VITE_APP_PASSWORD=newpassword123" > .env

# Restart server
npm run dev
```

---

## 11. Browser Compatibility Issues

### Gejala:
- Fitur tidak jalan di browser tertentu
- UI broken atau error

### ✅ Solusi:

**Browser yang didukung:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Update browser ke versi terbaru**

**Disable browser extensions:**
Beberapa extension bisa interfere dengan aplikasi.

---

## 12. Performance Issues / Slow

### Gejala:
- Aplikasi lambat
- Login lama

### ✅ Solusi:

**Solusi 1: Clear browser data**
```
Settings → Privacy → Clear browsing data
- Cached images and files
- Cookies and site data
```

**Solusi 2: Check RAM usage**
Aplikasi butuh minimal 2GB RAM free.

**Solusi 3: Disable heavy extensions**
Ad blockers, VPN, dll bisa memperlambat.

**Solusi 4: Use production build**
```bash
npm run build
npm run preview
```

---

## 13. Document Upload Issues (RAG)

### Gejala:
- Tidak bisa upload dokumen
- Error saat processing

### ✅ Solusi:

**Cek ukuran file:**
- Maksimal 10MB per file
- Total maksimal ~50MB (tergantung browser)

**Cek format file:**
Supported: PDF, DOCX, TXT, MD, CSV, JSON

**Clear IndexedDB:**
```javascript
// Console (F12)
indexedDB.deleteDatabase('hadeschat-db');
location.reload();
```

---

## 14. Deployment Issues

### Gejala:
- Aplikasi jalan di local tapi tidak di production
- Environment variables tidak terbaca

### ✅ Solusi:

**Vercel/Netlify:**
1. Set environment variables di dashboard
2. Prefix harus `VITE_` untuk Vite
3. Redeploy setelah set env vars

**Check environment:**
```bash
# Pastikan semua VITE_* variables di-set
VITE_APP_PASSWORD=xxx
VITE_GROQ_API_KEY=xxx
```

**Build locally dulu:**
```bash
npm run build
npm run preview
# Test di http://localhost:4173
```

---

## 🔍 Debug Tips

### Enable Verbose Logging
```javascript
// Tambahkan di browser console
localStorage.setItem('debug', 'true');
```

### Check Console Errors
```
F12 → Console tab
Lihat error messages merah
```

### Network Tab
```
F12 → Network tab
Filter: Fetch/XHR
Check API requests & responses
```

### Application Tab
```
F12 → Application tab
- Session Storage (cek auth data)
- Local Storage (cek lockout)
- IndexedDB (cek documents)
```

---

## 📞 Masih Butuh Bantuan?

Jika masalah masih belum resolved:

1. **Collect informasi:**
   - Browser & version
   - OS & version
   - Error message lengkap
   - Steps to reproduce

2. **Check dokumentasi lain:**
   - `README.md` - Setup guide
   - `SECURITY_FEATURES.md` - Security details
   - `PANDUAN_KEAMANAN.md` - Panduan Indonesia
   - `PASSWORD_SETUP.md` - Password setup

3. **Common fixes (try all):**
   ```bash
   # Clear everything
   rm -rf node_modules package-lock.json dist
   npm install
   
   # Clear browser
   # Console: sessionStorage.clear(); localStorage.clear();
   
   # Restart
   npm run dev
   ```

---

## ✅ Quick Fix Checklist

Sebelum report bug, coba checklist ini:

- [ ] Restart development server
- [ ] Clear browser cache (Ctrl+Shift+R)
- [ ] Clear sessionStorage & localStorage
- [ ] Check .env file exists and correct
- [ ] Verify password no extra spaces
- [ ] Update Node.js & npm
- [ ] Reinstall node_modules
- [ ] Try different browser
- [ ] Disable browser extensions
- [ ] Check console for errors

---

**Last Updated:** December 2024  
**Version:** 2.0.0  
**Status:** ✅ Maintained

Happy troubleshooting! 🚀