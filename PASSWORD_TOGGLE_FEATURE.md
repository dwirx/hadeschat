# 🔐 Fitur Toggle Password Protection

## Overview

HadesChat sekarang dilengkapi dengan fitur untuk mengaktifkan atau menonaktifkan password protection melalui environment variable. Fitur ini sangat berguna untuk berbagai scenario seperti development, demo, atau testing.

---

## 🎯 Kegunaan

### Kapan Mengaktifkan Password Protection?

✅ **Production/Live Server**
- Aplikasi diakses publik
- Data sensitif
- Multi-user environment
- Keamanan tinggi diperlukan

✅ **Staging/Testing**
- Testing dengan real-world scenario
- User acceptance testing (UAT)
- Security testing

### Kapan Menonaktifkan Password Protection?

✅ **Local Development**
- Rapid testing tanpa login berulang
- Debugging lebih cepat
- Development iteration cepat

✅ **Demo/Presentation**
- Showcase fitur tanpa hambatan login
- Client presentation
- Video tutorial/recording

✅ **Internal Testing**
- Unit testing
- Integration testing
- Automated testing

---

## ⚙️ Cara Menggunakan

### Setup Environment Variable

Edit file `.env` di root project:

```env
# ========================================
# PASSWORD PROTECTION SETTINGS
# ========================================

# AKTIFKAN password protection (default)
VITE_ENABLE_PASSWORD_PROTECTION=true

# ATAU

# NONAKTIFKAN password protection
VITE_ENABLE_PASSWORD_PROTECTION=false
```

---

## 📋 Konfigurasi Detail

### Option 1: Aktifkan Password Protection (DEFAULT)

```env
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=your_secure_password
```

**Behavior:**
- ✅ User harus login dengan password
- ✅ Semua fitur keamanan aktif (rate limiting, session timeout, etc)
- ✅ SHA-256 hashing
- ✅ Brute force protection

**Use case:**
- Production deployment
- Public access
- Security required

---

### Option 2: Nonaktifkan Password Protection

```env
VITE_ENABLE_PASSWORD_PROTECTION=false
# VITE_APP_PASSWORD tidak diperlukan saat disabled
```

**Behavior:**
- 🔓 Langsung akses aplikasi tanpa login
- ⚠️ Tidak ada security layer
- 🚀 Akses instant

**Use case:**
- Local development
- Demo purposes
- Internal testing
- Trusted environment

---

### Option 3: Default (Variable Tidak Di-set)

```env
# VITE_ENABLE_PASSWORD_PROTECTION tidak ada di .env
```

**Behavior:**
- ✅ Default = **ENABLED** (password protection aktif)
- Aplikasi akan meminta password
- Untuk keamanan by default

---

## 🔄 Cara Mengganti Setting

### Dari Enabled ke Disabled

```bash
# Edit file .env
nano .env

# Ubah nilai:
# DARI:
VITE_ENABLE_PASSWORD_PROTECTION=true

# JADI:
VITE_ENABLE_PASSWORD_PROTECTION=false

# Save file, lalu restart server:
npm run dev
```

### Dari Disabled ke Enabled

```bash
# Edit file .env
nano .env

# Ubah nilai:
# DARI:
VITE_ENABLE_PASSWORD_PROTECTION=false

# JADI:
VITE_ENABLE_PASSWORD_PROTECTION=true

# Pastikan password juga di-set:
VITE_APP_PASSWORD=your_password_here

# Save file, lalu restart server:
npm run dev
```

---

## 💡 Best Practices

### Development Workflow

**File: `.env` (local development)**
```env
VITE_ENABLE_PASSWORD_PROTECTION=false  # Disable untuk dev
VITE_APP_PASSWORD=test123
```

**File: `.env.production` (production)**
```env
VITE_ENABLE_PASSWORD_PROTECTION=true   # Enable untuk production
VITE_APP_PASSWORD=SuperSecurePassword123!
```

---

### Multiple Environment Setup

#### 1. Development (.env.development)
```env
VITE_ENABLE_PASSWORD_PROTECTION=false
VITE_APP_PASSWORD=dev123
```

#### 2. Staging (.env.staging)
```env
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=staging_pass_456
```

#### 3. Production (.env.production)
```env
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=Pr0d_S3cur3_P@ss!
```

---

## 🧪 Testing

### Test Enable/Disable

**Test 1: Verify Disabled**
```bash
# 1. Set di .env
echo "VITE_ENABLE_PASSWORD_PROTECTION=false" >> .env

# 2. Restart server
npm run dev

# 3. Buka browser
# Expected: Langsung masuk aplikasi, no login screen

# 4. Check console
# Expected: "🔓 Password protection disabled via .env"
```

**Test 2: Verify Enabled**
```bash
# 1. Set di .env
echo "VITE_ENABLE_PASSWORD_PROTECTION=true" >> .env

# 2. Restart server
npm run dev

# 3. Buka browser
# Expected: Muncul login screen

# 4. Login dengan password
# Expected: Masuk ke aplikasi
```

---

## 📊 Valid Values

### Yang Diterima untuk TRUE (Enabled)

```env
VITE_ENABLE_PASSWORD_PROTECTION=true   ✅
VITE_ENABLE_PASSWORD_PROTECTION=TRUE   ✅
VITE_ENABLE_PASSWORD_PROTECTION=True   ✅
VITE_ENABLE_PASSWORD_PROTECTION=1      ✅
```

### Yang Diterima untuk FALSE (Disabled)

```env
VITE_ENABLE_PASSWORD_PROTECTION=false  ✅
VITE_ENABLE_PASSWORD_PROTECTION=FALSE  ✅
VITE_ENABLE_PASSWORD_PROTECTION=False  ✅
VITE_ENABLE_PASSWORD_PROTECTION=0      ✅
VITE_ENABLE_PASSWORD_PROTECTION=       ✅ (empty = default true)
# Variable tidak ada                    ✅ (default true)
```

---

## ⚠️ Security Warnings

### JANGAN Di Production!

```env
# ❌ BAHAYA - Jangan lakukan ini di production:
VITE_ENABLE_PASSWORD_PROTECTION=false
```

**Risiko:**
- 🚨 Siapa saja bisa akses aplikasi
- 🚨 Tidak ada audit trail
- 🚨 Tidak ada rate limiting
- 🚨 Tidak ada protection dari abuse

### Aman Di Development

```env
# ✅ OK untuk local development:
VITE_ENABLE_PASSWORD_PROTECTION=false
```

**Alasan aman:**
- ✅ Hanya di localhost
- ✅ Tidak diakses publik
- ✅ Mempercepat development

---

## 🔍 Troubleshooting

### Problem: Setting Tidak Berpengaruh

**Gejala:**
Password protection masih aktif meski sudah set `false`

**Solusi:**
```bash
# 1. Pastikan typo tidak ada
cat .env | grep ENABLE_PASSWORD

# 2. Restart server (PENTING!)
# Stop: Ctrl+C
npm run dev

# 3. Clear browser cache
# F12 → Console:
sessionStorage.clear();
localStorage.clear();
location.reload();
```

### Problem: Lupa Status Aktif/Tidak

**Cek Status:**
```bash
# Method 1: Check .env
grep ENABLE_PASSWORD .env

# Method 2: Check browser console
# Buka aplikasi, lihat console
# Jika disabled: "🔓 Password protection disabled via .env"
```

---

## 🎛️ Advanced Configuration

### Dynamic Toggle (Runtime)

Untuk advanced use case, bisa kombinasi dengan query parameter:

```typescript
// Example: src/components/PasswordProtection.tsx
const urlParams = new URLSearchParams(window.location.search);
const bypassToken = urlParams.get('bypass');

// Check special bypass token (for demo purposes)
if (bypassToken === 'demo123' && import.meta.env.DEV) {
  return <>{children}</>;
}
```

**Usage:**
```
http://localhost:5173?bypass=demo123
```

⚠️ **WARNING:** Hanya gunakan di development, NEVER di production!

---

## 📚 Related Documentation

- `PASSWORD_SETUP.md` - Setup password guide
- `SECURITY_FEATURES.md` - Security features detail
- `PANDUAN_KEAMANAN.md` - Panduan keamanan (ID)
- `TROUBLESHOOTING.md` - Troubleshooting guide

---

## 🎯 Use Case Examples

### Use Case 1: Solo Developer

```env
# Development
VITE_ENABLE_PASSWORD_PROTECTION=false

# Deploy ke Vercel
# Dashboard → Environment Variables
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=mySecurePass123!
```

### Use Case 2: Team Development

```env
# .env.local (gitignored, personal)
VITE_ENABLE_PASSWORD_PROTECTION=false

# .env.example (committed, template)
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=change_this_password
```

### Use Case 3: Client Demo

```env
# Sebelum demo:
VITE_ENABLE_PASSWORD_PROTECTION=false

# Setelah demo (deploy production):
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=ClientSecurePass789!
```

---

## ✅ Quick Reference

| Scenario | Setting | Password Required? |
|----------|---------|-------------------|
| Local Development | `false` | ❌ No |
| Team Testing | `true` | ✅ Yes |
| Staging | `true` | ✅ Yes |
| Production | `true` | ✅ Yes |
| Demo/Presentation | `false` | ❌ No |
| Client UAT | `true` | ✅ Yes |
| Automated Testing | `false` | ❌ No |

---

## 🚀 Quick Start Commands

### Enable Password Protection
```bash
echo "VITE_ENABLE_PASSWORD_PROTECTION=true" >> .env
npm run dev
```

### Disable Password Protection
```bash
echo "VITE_ENABLE_PASSWORD_PROTECTION=false" >> .env
npm run dev
```

### Check Current Status
```bash
grep VITE_ENABLE_PASSWORD_PROTECTION .env
```

---

## 📞 Support

Untuk pertanyaan atau issue terkait fitur ini:
1. Check `TROUBLESHOOTING.md`
2. Review console logs untuk debug info
3. Verify `.env` configuration
4. Restart development server

---

**Feature Version:** 2.1.0  
**Added:** December 2024  
**Status:** ✅ Production Ready  
**Compatibility:** All browsers

🎉 **Enjoy flexible password protection control!** 🔐