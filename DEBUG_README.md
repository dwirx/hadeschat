# 🐛 Debug Mode - README

## 📌 Ringkasan

HadesChat memiliki sistem debug mode yang dapat diaktifkan/dinonaktifkan melalui file `.env`. Ketika debug mode **HIDUP**, semua log development akan muncul di browser console. Ketika debug mode **MATI**, log akan disembunyikan untuk performa optimal di production.

---

## ⚡ Quick Start

### Aktifkan Debug Mode (Development)

1. Buka file `.env`
2. Set nilai: `VITE_DEBUG_MODE=true`
3. Restart server: `Ctrl+C` → `npm run dev`

### Matikan Debug Mode (Production)

1. Buka file `.env`
2. Set nilai: `VITE_DEBUG_MODE=false`
3. Restart server: `Ctrl+C` → `npm run dev`

---

## 📝 Contoh Konfigurasi `.env`

```env
# ============================================
# DEBUG MODE
# ============================================
# true = Tampilkan semua log (untuk development)
# false = Sembunyikan log (untuk production)
VITE_DEBUG_MODE=true

# ============================================
# API KEYS
# ============================================
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxx
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx

# ============================================
# PASSWORD PROTECTION
# ============================================
VITE_ENABLE_PASSWORD_PROTECTION=true
VITE_APP_PASSWORD=mypassword123
```

---

## 🎯 Perbedaan Mode

| Mode | Console Output | Kapan Digunakan |
|------|---------------|-----------------|
| `VITE_DEBUG_MODE=true` | ✅ Menampilkan semua debug log | Development, debugging, mencari bug |
| `VITE_DEBUG_MODE=false` | ❌ Menyembunyikan debug log | Production, demo, publish online |

### Contoh Output Console

**Saat Debug Mode = `true` (HIDUP):**
```
🔍 Environment Variables Check:
POE: ✅
TOGETHER: ✅
GROQ: ✅
OPENROUTER: ✅
✅ GROQ KEY LOADED: gsk_YbCjZoo...
✅ OPENROUTER KEY LOADED: sk-or-v1-505...
🚀 App initialized
💾 Data loaded from IndexedDB
```

**Saat Debug Mode = `false` (MATI):**
```
(Console kosong atau hanya error kritis)
```

---

## 💻 Cara Menggunakan Debug Functions di Kode

### Import Debug Functions

```typescript
import { debugLog, debugWarn, debugError, debugInfo, alwaysLog } from '@/lib/debug';
```

### 1. `debugLog()` - Log Biasa

Untuk informasi umum saat development:

```typescript
debugLog('Button clicked');
debugLog('API Response:', response);
debugLog('State:', { userId: 123, isActive: true });
```

### 2. `debugWarn()` - Warning

Untuk peringatan atau kondisi yang perlu perhatian:

```typescript
debugWarn('API rate limit approaching');
debugWarn('Deprecated function called');
```

### 3. `debugError()` - Error

Untuk error yang perlu investigasi:

```typescript
debugError('Failed to fetch data:', error);
debugError('Invalid input:', userInput);
```

### 4. `debugInfo()` - Log dengan Emoji

Untuk log yang lebih menarik dan mudah dibaca:

```typescript
debugInfo('🚀', 'App started');
debugInfo('✅', 'Operation successful');
debugInfo('🔍', 'Searching for:', query);
debugInfo('💾', 'Data saved');
debugInfo('🔄', 'Refreshing data');
```

### 5. `alwaysLog()` - Selalu Tampil

Log yang **SELALU** muncul bahkan saat debug mode OFF (untuk pesan kritis):

```typescript
alwaysLog('✅ Application started successfully');
alwaysLog('❌ Critical error occurred:', error);
```

---

## 📖 Contoh Lengkap

### Di Component React

```typescript
import { debugLog, debugInfo, debugError } from '@/lib/debug';
import { useState } from 'react';

export function ChatComponent() {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    debugInfo('📤', 'Sending message:', message);
    
    try {
      const response = await sendToAPI(message);
      debugLog('Response received:', response);
    } catch (error) {
      debugError('Failed to send:', error);
    }
  };

  return <div>{/* Your JSX */}</div>;
}
```

### Di API Handler

```typescript
import { debugLog, debugError, debugInfo } from '@/lib/debug';

export async function fetchData(prompt: string) {
  debugInfo('🤖', 'Calling API with:', prompt);
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      debugError('API error:', response.status);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    debugLog('Success:', data);
    return data;

  } catch (error) {
    debugError('Fatal error:', error);
    throw error;
  }
}
```

---

## ✅ Best Practices

### ✓ DO (Lakukan)

1. **Gunakan debug functions** alih-alih `console.log`:
   ```typescript
   // ✅ Good
   debugLog('User data:', userData);
   
   // ❌ Bad
   console.log('User data:', userData);
   ```

2. **Gunakan emoji** untuk readability:
   ```typescript
   debugInfo('🚀', 'Component mounted');
   debugInfo('✅', 'Success');
   debugInfo('❌', 'Failed');
   ```

3. **Matikan debug di production**:
   ```env
   VITE_DEBUG_MODE=false
   ```

### ✗ DON'T (Jangan)

1. ❌ Jangan gunakan `console.log` langsung
2. ❌ Jangan log data sensitif (password, API keys)
3. ❌ Jangan lupa restart server setelah ubah `.env`
4. ❌ Jangan commit file `.env` ke git

---

## 🔍 Troubleshooting

### Debug mode tidak berubah setelah edit `.env`

**Penyebab:** Server belum di-restart

**Solusi:**
```bash
# Tekan Ctrl+C di terminal
# Lalu jalankan lagi:
npm run dev
```

### Log tidak muncul padahal sudah set `true`

**Periksa:**
1. ✅ Format benar: `VITE_DEBUG_MODE=true` (tanpa spasi, tanpa tanda kutip)
2. ✅ Server sudah di-restart
3. ✅ Browser console dibuka (F12)
4. ✅ Filter console tidak aktif

### Pesan "React DevTools" tetap muncul

Ini **NORMAL**! Pesan dari React library, bukan dari aplikasi. Tidak bisa dan tidak perlu dimatikan.

### Console penuh dengan log

**Solusi:**
- Set `VITE_DEBUG_MODE=false` di `.env`
- Atau filter console di DevTools browser

---

## 📂 File-File Penting

```
hadeschat/
├── .env                        # Config utama (jangan commit!)
├── .env.template               # Template untuk .env baru
├── src/
│   ├── main.tsx               # Entry point (sudah pakai debug functions)
│   └── lib/
│       └── debug.ts           # Debug utility functions
└── docs/
    ├── DEBUG_README.md        # File ini (overview)
    ├── DEBUG_MODE_GUIDE.md    # Panduan lengkap dengan banyak contoh
    └── CARA_DEBUG_MODE.md     # Panduan singkat bahasa Indonesia
```

---

## 📚 Dokumentasi Lengkap

- **DEBUG_MODE_GUIDE.md** - Panduan lengkap dengan contoh kode detail
- **CARA_DEBUG_MODE.md** - Panduan singkat dalam Bahasa Indonesia
- **.env.template** - Template file environment dengan dokumentasi

---

## 🎓 Tips Development

### Development Workflow

```bash
# 1. Set debug mode ON
VITE_DEBUG_MODE=true

# 2. Start dev server
npm run dev

# 3. Open browser console (F12)
# 4. Lihat semua debug log untuk tracking behavior
```

### Production Deployment

```bash
# 1. Set debug mode OFF
VITE_DEBUG_MODE=false

# 2. Build untuk production
npm run build

# 3. Test build
npm run preview

# 4. Verify console bersih (hanya critical logs)
```

---

## 📋 Checklist Deploy ke Production

Sebelum deploy, pastikan:

- [ ] `VITE_DEBUG_MODE=false` di `.env` production
- [ ] Test aplikasi berjalan normal
- [ ] Console tidak menampilkan debug log
- [ ] Hanya pesan kritis yang muncul
- [ ] File `.env` tidak ter-commit ke git

---

## 🆘 Butuh Bantuan?

1. Baca **CARA_DEBUG_MODE.md** untuk panduan cepat
2. Baca **DEBUG_MODE_GUIDE.md** untuk panduan lengkap
3. Cek **TROUBLESHOOTING.md** untuk masalah umum
4. Lihat contoh di `src/main.tsx` untuk referensi

---

## 📌 Catatan Penting

- ⚠️ **Semua variabel environment HARUS diawali `VITE_`** untuk bisa diakses di browser
- ⚠️ **WAJIB restart server** setelah ubah file `.env`
- ⚠️ **Jangan commit `.env`** ke git (sudah ada di `.gitignore`)
- ✅ File `.env` sudah ter-protect, tidak bisa dibaca langsung
- ✅ Debug system sudah terintegrasi di `main.tsx`

---

**Versi:** 1.0  
**Dibuat:** 2024  
**Untuk:** HadesChat  
**Status:** ✅ Fully Implemented & Tested