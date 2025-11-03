# Panduan Setup Password Protection

## 📋 Deskripsi

Aplikasi HadesChat dilengkapi dengan proteksi password untuk keamanan. Pengguna harus memasukkan password yang benar sebelum dapat mengakses aplikasi.

## 🔐 Cara Setup Password

### Langkah 1: Buat atau Edit File `.env`

Di root directory project Anda, buat file baru bernama `.env` (jika belum ada), atau edit file yang sudah ada.

**Lokasi file:**
```
hadeschat/
├── .env          ← File ini
├── package.json
├── vite.config.ts
└── ...
```

### Langkah 2: Tambahkan Variable Password

Tambahkan baris berikut ke file `.env`:

```env
VITE_APP_PASSWORD=test123
```

**Catatan Penting:**
- Ganti `test123` dengan password pilihan Anda
- Pastikan tidak ada spasi sebelum atau sesudah tanda `=`
- Gunakan password yang kuat untuk produksi
- **JANGAN** commit file `.env` ke Git (sudah ada di `.gitignore`)

### Langkah 3: Contoh File `.env` Lengkap

```env
# ========================================
# PASSWORD PROTECTION
# ========================================
VITE_APP_PASSWORD=test123

# ========================================
# API KEYS
# ========================================

# Groq API (Recommended - Fast and Free tier available)
VITE_GROQ_API_KEY=your_groq_api_key_here

# OpenRouter API (Many free models available)
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here

# Together AI API (Optional)
VITE_TOGETHER_API_KEY=your_together_api_key_here

# Poe API (Optional)
VITE_POE_API_KEY=your_poe_api_key_here

# Optional: Site info for OpenRouter
VITE_SITE_URL=http://localhost:5173
VITE_SITE_NAME=HadesChat
```

### Langkah 4: Restart Development Server

Setelah menambahkan atau mengubah password di file `.env`, restart development server:

```bash
# Hentikan server yang sedang berjalan (Ctrl+C)
# Kemudian jalankan kembali:
npm run dev
```

## 🎯 Cara Menggunakan

### Login ke Aplikasi

1. Buka browser dan akses `http://localhost:5173`
2. Anda akan melihat halaman login dengan form password
3. Masukkan password yang Anda set di `.env` (contoh: `test123`)
4. Klik tombol **"Masuk"**
5. Jika password benar, Anda akan masuk ke aplikasi

### Session Management

- **Autentikasi tersimpan**: Setelah login, Anda tidak perlu login lagi di tab yang sama
- **Session berakhir**: Ketika Anda menutup tab browser
- **Login ulang**: Diperlukan saat membuka tab baru atau browser baru

## 🔒 Keamanan

### Password Default

Jika `VITE_APP_PASSWORD` tidak diset di file `.env`, maka password default adalah `test123`.

**⚠️ PERINGATAN**: Selalu ganti password default untuk deployment produksi!

### Best Practices

✅ **DO (Lakukan):**
- Gunakan password yang kuat dan unik
- Ganti password default (`test123`) untuk produksi
- Simpan password di tempat aman (password manager)
- Pastikan file `.env` ada di `.gitignore`
- Gunakan password berbeda untuk setiap environment (dev, staging, production)

❌ **DON'T (Jangan):**
- Jangan commit file `.env` ke repository
- Jangan share password di chat atau email yang tidak terenkripsi
- Jangan gunakan password yang mudah ditebak (123456, password, dll)
- Jangan hardcode password di source code
- Jangan gunakan password yang sama untuk semua aplikasi

### Contoh Password Kuat

```env
# ❌ Password Lemah
VITE_APP_PASSWORD=123456
VITE_APP_PASSWORD=password
VITE_APP_PASSWORD=test123

# ✅ Password Kuat
VITE_APP_PASSWORD=H4d3sChat!2024$Secure
VITE_APP_PASSWORD=MyStr0ng!P@ssw0rd#2024
VITE_APP_PASSWORD=SecureApp_789!XyZ
```

## 🛠️ Troubleshooting

### Problem: Password Tidak Berubah

**Gejala**: Setelah mengubah password di `.env`, password lama masih berfungsi

**Solusi**:
1. Pastikan Anda sudah menyimpan file `.env`
2. Restart development server (Ctrl+C, lalu `npm run dev`)
3. Refresh browser dan clear cache (Ctrl+Shift+R atau Cmd+Shift+R)
4. Hapus session storage: Buka Developer Tools → Application → Session Storage → Clear

### Problem: Selalu Minta Password

**Gejala**: Setiap kali refresh page, diminta login lagi

**Solusi**:
1. Pastikan browser tidak dalam mode Incognito/Private
2. Check apakah session storage diblokir oleh browser
3. Periksa browser console untuk error messages

### Problem: Tidak Bisa Login

**Gejala**: Password benar tapi tidak bisa login

**Solusi**:
1. Pastikan tidak ada spasi di awal atau akhir password di `.env`
2. Periksa console browser untuk error messages (F12)
3. Pastikan variable name benar: `VITE_APP_PASSWORD` (case-sensitive)
4. Pastikan server sudah di-restart setelah perubahan `.env`

### Problem: File .env Tidak Terbaca

**Gejala**: Password default (`test123`) selalu digunakan

**Solusi**:
1. Pastikan file bernama `.env` (bukan `env.txt` atau `.env.example`)
2. Pastikan file berada di root directory project
3. Restart development server
4. Check apakah ada typo di nama variable: `VITE_APP_PASSWORD`

## 📱 Deployment ke Production

### Vercel

1. Login ke [Vercel Dashboard](https://vercel.com)
2. Pilih project Anda
3. Go to **Settings → Environment Variables**
4. Tambahkan variable:
   - **Name**: `VITE_APP_PASSWORD`
   - **Value**: `your_strong_password_here`
5. Pilih environment: Production, Preview, Development
6. Klik **Save**
7. Redeploy aplikasi

### Netlify

1. Login ke [Netlify Dashboard](https://netlify.com)
2. Pilih site Anda
3. Go to **Site settings → Environment variables**
4. Klik **Add a variable**
5. Tambahkan:
   - **Key**: `VITE_APP_PASSWORD`
   - **Value**: `your_strong_password_here`
6. Klik **Save**
7. Redeploy site

### Custom Server / VPS

Edit atau buat file `.env` di server:

```bash
# SSH ke server
ssh user@your-server.com

# Navigasi ke project directory
cd /path/to/hadeschat

# Edit .env file
nano .env

# Tambahkan password
VITE_APP_PASSWORD=your_strong_password_here

# Save (Ctrl+O, Enter, Ctrl+X)

# Rebuild aplikasi
npm run build

# Restart server/service
pm2 restart hadeschat
```

## 🔄 Mengganti Password

### Development (Local)

1. Edit file `.env`
2. Ubah value `VITE_APP_PASSWORD`
3. Save file
4. Restart dev server: `npm run dev`
5. Refresh browser dan login dengan password baru

### Production

1. Update environment variable di hosting platform (Vercel/Netlify/dll)
2. Redeploy aplikasi
3. User harus logout dan login dengan password baru

### Notifikasi User

Jika Anda mengganti password produksi, pastikan untuk:
- Notifikasi semua user yang memiliki akses
- Berikan password baru melalui channel yang aman
- Pertimbangkan untuk menggunakan sistem reset password (future feature)

## 📚 Informasi Teknis

### Bagaimana Cara Kerjanya?

1. **Environment Variable**: Password disimpan di `.env` sebagai `VITE_APP_PASSWORD`
2. **Component**: `PasswordProtection.tsx` membungkus seluruh aplikasi
3. **Validation**: Password user dibandingkan dengan environment variable
4. **Session**: Setelah valid, status disimpan di `sessionStorage`
5. **Persistence**: Session bertahan sampai tab/browser ditutup

### Session Storage

```javascript
// Setelah login berhasil
sessionStorage.setItem("authenticated", "true");

// Check authentication
const authStatus = sessionStorage.getItem("authenticated");
if (authStatus === "true") {
  // User sudah login
}
```

### Security Features

- ✅ Password tidak disimpan di localStorage (lebih aman)
- ✅ Session otomatis clear saat tab ditutup
- ✅ Password tidak terlihat di network requests
- ✅ Environment variable tidak ter-expose di client code
- ✅ Simple brute force protection (loading state)

## 💡 Tips

1. **Development**: Gunakan password simple (`test123`) untuk kemudahan testing
2. **Staging**: Gunakan password berbeda dari production
3. **Production**: Gunakan password yang sangat kuat
4. **Team**: Share password menggunakan password manager (1Password, LastPass, dll)
5. **Rotation**: Ganti password secara berkala (setiap 3-6 bulan)

## 🆘 Butuh Bantuan?

Jika Anda mengalami masalah:

1. Check browser console (F12) untuk error messages
2. Pastikan semua langkah di atas sudah dilakukan dengan benar
3. Restart development server dan browser
4. Clear browser cache dan session storage
5. Buka issue di GitHub repository (jika applicable)

---

**Dibuat dengan ❤️ untuk keamanan HadesChat**

**Terakhir diupdate**: 2024