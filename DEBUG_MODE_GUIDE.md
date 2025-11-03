# Panduan Debug Mode

## 📖 Deskripsi

Aplikasi ini dilengkapi dengan sistem debug mode yang dapat diaktifkan dan dinonaktifkan melalui file `.env`. Ketika debug mode aktif, aplikasi akan menampilkan log detail di console browser untuk membantu development dan troubleshooting. Ketika dinonaktifkan, semua debug log akan otomatis dimatikan untuk menghemat performa di production.

## 🔧 Cara Mengaktifkan/Menonaktifkan Debug Mode

### 1. Melalui File `.env`

Buka file `.env` di root folder proyek dan tambahkan/ubah variabel berikut:

**Untuk MENGAKTIFKAN debug mode:**
```
VITE_DEBUG_MODE=true
```

**Untuk MENONAKTIFKAN debug mode:**
```
VITE_DEBUG_MODE=false
```

Atau cukup hapus/comment baris tersebut:
```
# VITE_DEBUG_MODE=true
```

### 2. Restart Development Server

Setelah mengubah `.env`, Anda **HARUS** restart development server:

```bash
# Stop server dengan Ctrl+C, lalu jalankan kembali:
npm run dev
```

**PENTING:** Perubahan pada file `.env` tidak akan langsung terdeteksi. Anda harus restart server!

## 📝 Contoh File `.env`

```env
# API Keys
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_TOGETHER_API_KEY=your_together_api_key_here

# Debug Mode - Set ke true untuk development, false untuk production
VITE_DEBUG_MODE=true

# Other configs...
```

## 💻 Cara Menggunakan Debug Functions di Kode

File `src/lib/debug.ts` menyediakan beberapa fungsi debug yang sudah siap pakai:

### Import Debug Functions

```typescript
import { debugLog, debugWarn, debugError, debugInfo, alwaysLog } from '@/lib/debug';
```

### 1. `debugLog()` - Log Biasa

Digunakan untuk informasi umum saat development:

```typescript
debugLog('User clicked button');
debugLog('API Response:', response);
debugLog('Current state:', { userId: 123, isActive: true });
```

### 2. `debugWarn()` - Warning

Digunakan untuk peringatan atau kondisi yang perlu diperhatikan:

```typescript
debugWarn('API rate limit approaching:', remainingCalls);
debugWarn('Deprecated function called');
```

### 3. `debugError()` - Error

Digunakan untuk error atau masalah yang perlu investigasi:

```typescript
debugError('Failed to fetch data:', error);
debugError('Invalid user input:', userInput);
```

### 4. `debugInfo()` - Info dengan Emoji

Digunakan untuk log yang lebih menarik dengan emoji:

```typescript
debugInfo('🚀', 'App started successfully');
debugInfo('✅', 'Database connected');
debugInfo('🔍', 'Searching for:', searchQuery);
debugInfo('💾', 'Data saved:', savedData);
```

### 5. `alwaysLog()` - Selalu Tampil

Log yang **SELALU** ditampilkan, bahkan saat debug mode OFF. Gunakan untuk informasi kritis:

```typescript
alwaysLog('✅ Application started successfully');
alwaysLog('❌ Critical error occurred:', criticalError);
```

## 🎯 Contoh Penggunaan Lengkap

### Contoh 1: Di Component React

```typescript
import { debugLog, debugWarn, debugInfo } from '@/lib/debug';
import { useState } from 'react';

export function ChatArea() {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    debugInfo('📤', 'Sending message:', message);
    
    try {
      const response = await sendToAPI(message);
      debugLog('Response received:', response);
      
      if (response.warning) {
        debugWarn('API returned warning:', response.warning);
      }
    } catch (error) {
      debugError('Failed to send message:', error);
    }
  };

  return (
    <div>
      {/* Your JSX */}
    </div>
  );
}
```

### Contoh 2: Di API Handler

```typescript
import { debugLog, debugError, debugInfo, alwaysLog } from '@/lib/debug';

export async function fetchChatResponse(prompt: string) {
  debugInfo('🤖', 'Calling AI API with prompt:', prompt);
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      debugError('API returned error status:', response.status);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    debugLog('AI Response:', data);
    return data;

  } catch (error) {
    debugError('Fatal error in fetchChatResponse:', error);
    alwaysLog('❌ Critical: AI API failed');
    throw error;
  }
}
```

### Contoh 3: Di Store/Hook

```typescript
import { debugLog, debugInfo } from '@/lib/debug';
import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  messages: [],
  
  addMessage: (message) => {
    debugInfo('💬', 'Adding new message:', message);
    
    set((state) => {
      const newMessages = [...state.messages, message];
      debugLog('Total messages:', newMessages.length);
      return { messages: newMessages };
    });
  },
  
  clearMessages: () => {
    debugWarn('Clearing all messages');
    set({ messages: [] });
  },
}));
```

## 🔍 Mengecek Status Debug Mode

Anda juga bisa mengecek apakah debug mode aktif:

```typescript
import { DEBUG_MODE } from '@/lib/debug';

if (DEBUG_MODE) {
  // Kode yang hanya jalan saat debug mode aktif
  console.log('Debug mode is ON');
}
```

## ✅ Best Practices

### ✓ DO (Lakukan)

1. **Gunakan debug functions** alih-alih `console.log` langsung:
   ```typescript
   // ✅ Good
   debugLog('User data:', userData);
   
   // ❌ Bad
   console.log('User data:', userData);
   ```

2. **Gunakan emoji** untuk debug info yang mudah dibaca:
   ```typescript
   debugInfo('🚀', 'Component mounted');
   debugInfo('🔄', 'Refetching data');
   debugInfo('✅', 'Operation completed');
   ```

3. **Gunakan alwaysLog** untuk pesan kritis:
   ```typescript
   alwaysLog('✅ App initialized successfully');
   alwaysLog('❌ Fatal error:', error);
   ```

4. **Matikan debug mode** di production:
   ```env
   VITE_DEBUG_MODE=false
   ```

### ✗ DON'T (Jangan)

1. **Jangan gunakan `console.log` langsung** kecuali untuk testing cepat
2. **Jangan log data sensitif** seperti password atau API keys
3. **Jangan lupa restart server** setelah ubah `.env`
4. **Jangan commit file `.env`** ke git (sudah ada di `.gitignore`)

## 🚀 Tips Development

### Development Mode (Debug ON)
```env
VITE_DEBUG_MODE=true
```
- Semua debug log akan muncul di browser console
- Memudahkan tracking bug dan behavior aplikasi
- Log berwarna (warn = kuning, error = merah)

### Production Mode (Debug OFF)
```env
VITE_DEBUG_MODE=false
```
- Semua debug log otomatis dimatikan
- Performa lebih baik
- Console lebih bersih
- Hanya `alwaysLog()` yang tetap muncul

## 🧪 Testing Debug Mode

Untuk memastikan debug mode berfungsi dengan baik:

1. **Test dengan debug ON:**
   ```bash
   # Set di .env
   VITE_DEBUG_MODE=true
   
   # Restart server
   npm run dev
   ```
   
   Buka browser console, Anda harus melihat log debug.

2. **Test dengan debug OFF:**
   ```bash
   # Set di .env
   VITE_DEBUG_MODE=false
   
   # Restart server
   npm run dev
   ```
   
   Buka browser console, debug log tidak muncul (kecuali `alwaysLog`).

## 📋 Checklist Deployment

Sebelum deploy ke production:

- [ ] Set `VITE_DEBUG_MODE=false` di `.env` production
- [ ] Test aplikasi berjalan normal tanpa debug log
- [ ] Pastikan tidak ada `console.log` hardcoded yang tersisa
- [ ] Verifikasi hanya pesan kritis (`alwaysLog`) yang muncul

## 🆘 Troubleshooting

### Debug mode tidak berubah setelah edit `.env`

**Solusi:** Restart development server dengan Ctrl+C lalu `npm run dev`

### Debug log tidak muncul meski sudah set `true`

**Periksa:**
1. Pastikan variabel ditulis dengan benar: `VITE_DEBUG_MODE=true`
2. Tidak ada spasi: `VITE_DEBUG_MODE = true` ❌
3. Nilai adalah `true` bukan `"true"`: `VITE_DEBUG_MODE=true` ✅
4. Server sudah di-restart

### Browser console penuh dengan log

**Solusi:** 
- Set `VITE_DEBUG_MODE=false` di `.env`
- Atau filter console di DevTools (hanya tampilkan error/warn)

### Ingin log kondisional lebih kompleks

Gunakan `DEBUG_MODE` constant:
```typescript
import { DEBUG_MODE, debugLog } from '@/lib/debug';

if (DEBUG_MODE && someCondition) {
  debugLog('Complex debug scenario:', data);
}
```

## 📚 Referensi

- File utama: `src/lib/debug.ts`
- Vite env vars: https://vitejs.dev/guide/env-and-mode.html
- Semua variabel environment harus diawali `VITE_` agar bisa diakses di browser

---

**Dibuat untuk HadesChat** | Versi 1.0