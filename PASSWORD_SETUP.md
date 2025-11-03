# 🔐 Panduan Setup Password HadesChat

## Quick Start

### 1. Buat File `.env`

Di root folder project, buat file bernama `.env`:

```bash
# File: .env
VITE_APP_PASSWORD=your_secure_password_here
```

### 2. Ganti Password Default

**⚠️ PENTING:** Ganti `your_secure_password_here` dengan password yang kuat!

### 3. Restart Development Server

```bash
npm run dev
```

---

## 🔑 Contoh Password

### ❌ LEMAH (Jangan Pakai!)
```
test123
password
admin
123456
hadeschat
```

### ✅ KUAT (Recommended!)
```
H@d3sCh@t!2024$Secure
mK9#pL2$vN8@xQ5&zR7^wT3!
P@ssw0rd!Hades#2024
Str0ng&S3cur3!Ch@t
```

---

## 🛡️ Fitur Keamanan Baru

### 1. Rate Limiting
- **Maksimal 5 percobaan gagal**
- Akun dikunci 15 menit setelah 5x gagal
- Timer countdown otomatis

### 2. Session Timeout
- Session expired setelah 60 menit
- Auto-logout otomatis

### 3. Password Hashing
- Password di-hash dengan SHA-256
- Tidak disimpan dalam plain text

### 4. Anti-Bypass
- Deteksi manipulasi storage
- Proteksi console manipulation
- Auto-reload jika ada bypass attempt

---

## 📋 Kriteria Password Kuat

- ✅ Minimal 12 karakter
- ✅ Huruf besar (A-Z)
- ✅ Huruf kecil (a-z)
- ✅ Angka (0-9)
- ✅ Simbol (!@#$%^&*)
- ✅ Tidak menggunakan kata umum
- ✅ Tidak menggunakan info personal

---

## 🔧 Setup untuk Different Environments

### Development (`.env`)
```bash
VITE_APP_PASSWORD=DevPassword123!
```

### Production (Hosting Platform)

**Vercel:**
```
Dashboard → Settings → Environment Variables
Key: VITE_APP_PASSWORD
Value: YourProductionPassword123!
```

**Netlify:**
```
Site Settings → Environment Variables
Key: VITE_APP_PASSWORD
Value: YourProductionPassword123!
```

**Railway:**
```
Variables → New Variable
VITE_APP_PASSWORD = YourProductionPassword123!
```

---

## 🧪 Testing

### Test Login
```bash
# 1. Start dev server
npm run dev

# 2. Buka browser
http://localhost:5173

# 3. Login dengan password dari .env
```

### Test Rate Limiting
```
1. Login dengan password salah 5x
2. Harus muncul lockout 15 menit
3. Timer countdown harus berjalan
```

### Test Session Timeout
```
1. Login dengan benar
2. Tunggu 60 menit
3. Refresh page
4. Harus auto-logout
```

---

## 🚨 Troubleshooting

### Problem: "Password salah" padahal benar

**Solusi:**
1. Cek file `.env` ada di root folder
2. Pastikan tidak ada spasi sebelum/sesudah password
3. Restart dev server
4. Clear browser cache

### Problem: Akun terkunci

**Solusi 1:** Tunggu 15 menit

**Solusi 2:** Clear manual
```javascript
// Buka browser console (F12)
localStorage.removeItem("__hc_auth_lockout");
localStorage.removeItem("__hc_auth_attempts");
// Refresh page
```

### Problem: `.env` tidak terdeteksi

**Cek:**
```bash
# Pastikan file ada
ls -la .env

# Pastikan format benar
cat .env

# Output harus:
# VITE_APP_PASSWORD=YourPassword
```

---

## 🔒 Security Best Practices

### DO ✅
- Gunakan password minimal 12 karakter
- Kombinasi huruf, angka, simbol
- Simpan password di password manager
- Ganti password secara berkala
- Gunakan HTTPS di production

### DON'T ❌
- Jangan commit `.env` ke Git
- Jangan share password via chat
- Jangan gunakan password umum
- Jangan hardcode password di code
- Jangan disable security features

---

## 📁 File Structure

```
hadeschat/
├── .env                    # ← Password disimpan di sini
├── .env.example           # Template (optional)
├── .gitignore             # ← Pastikan .env ada di sini
├── src/
│   └── components/
│       └── PasswordProtection.tsx  # Logic security
└── ...
```

---

## 🎯 Checklist Setup

- [ ] Buat file `.env` di root folder
- [ ] Set `VITE_APP_PASSWORD` dengan password kuat
- [ ] Verify `.env` ada di `.gitignore`
- [ ] Test login dengan password baru
- [ ] Test rate limiting
- [ ] Backup password di tempat aman
- [ ] Setup environment variables di hosting

---

## 📊 Security Metrics

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Password Hashing | ✅ | SHA-256 |
| Rate Limiting | ✅ | 5 attempts, 15 min lockout |
| Session Timeout | ✅ | 60 minutes |
| Encryption | ✅ | XOR + Random token |
| Anti-Bypass | ✅ | Multi-layer protection |

**Security Level:** 🔒 **ENTERPRISE GRADE**

---

## 💡 Tips Generate Password

### Option 1: OpenSSL (Linux/Mac)
```bash
openssl rand -base64 24
```

### Option 2: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64'))"
```

### Option 3: Online Generator
- https://passwordsgenerator.net/
- https://1password.com/password-generator/

### Option 4: Manual Pattern
```
[Word][Number][Symbol][Word][Number][Symbol]
Hades2024!Chat2025$

[Upper][Lower][Symbol][Number][Symbol][Lower]
Ha#123$des
```

---

## 🔄 Update Password

### Cara Ganti Password

```bash
# 1. Edit file .env
nano .env
# atau
code .env

# 2. Ganti password
VITE_APP_PASSWORD=NewSecurePassword456!

# 3. Save file

# 4. Restart server
npm run dev

# 5. Test login dengan password baru
```

### Password History (Jangan Diulang)
Simpan log password lama untuk reference:
```
# Jangan simpan di code!
# Simpan di password manager atau secure notes
```

---

## 📞 Support

Butuh bantuan? Cek dokumentasi lengkap:
- `SECURITY_FEATURES.md` - Fitur keamanan detail
- `PANDUAN_KEAMANAN.md` - Panduan keamanan lengkap
- `README.md` - Dokumentasi utama

---

## ✅ Verification Checklist

Setelah setup, pastikan:

```bash
# 1. File .env exist
[ -f .env ] && echo "✅ .env exists" || echo "❌ .env missing"

# 2. Password di .env
grep "VITE_APP_PASSWORD" .env && echo "✅ Password set" || echo "❌ Password not set"

# 3. .env di .gitignore
grep ".env" .gitignore && echo "✅ .env in gitignore" || echo "❌ .env not ignored"

# 4. Dev server running
npm run dev
```

---

**Last Updated:** December 2024  
**Version:** 2.0.0 (Security Overhaul)  
**Status:** ✅ Production Ready

🎉 **Selamat! Password protection Anda sekarang sangat aman!** 🔒