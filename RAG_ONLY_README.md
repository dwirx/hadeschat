# RAG Document-Only Implementation

## Status: ✅ In Progress

Fitur web search (DuckDuckGo & Brave) telah dihapus. Sistem sekarang hanya menggunakan **Document RAG** (Retrieval-Augmented Generation) dengan upload dokumen.

## ✅ Yang Sudah Dihapus

### File yang Dihapus
- ❌ `src/components/SearchPanel.tsx` - Panel hasil search
- ❌ `src/components/QuickSearchActions.tsx` - Quick search buttons
- ❌ `src/lib/searchApi.ts` - DuckDuckGo & Brave Search API
- ❌ `SEARCH_IMPLEMENTATION.md` - Dokumentasi search
- ❌ `SEARCH_BAHASA.md` - Panduan search Indonesia

### Komponen yang Sudah Diupdate
- ✅ `src/hooks/useRAG.ts` - Disederhanakan untuk hanya document RAG
- ✅ `src/lib/searchInstructions.ts` - Hanya document instructions
- ✅ `src/components/SettingsSidebar.tsx` - Hapus search engine options
- ✅ `src/components/RAGIndicator.tsx` - Hanya tampilkan document count
- ✅ `src/pages/Index.tsx` - Hapus SearchPanel references

## ⏳ Yang Masih Perlu Diupdate

### File yang Perlu Diperbaiki
- ⚠️ `src/components/ChatArea.tsx` - Masih import dari searchApi yang sudah dihapus
  - Hapus import `SearchResponse`, `getSearchSettings` dari searchApi
  - Hapus state `currentSearchResults`, `searchReminder`, `isSearching`
  - Hapus fungsi `handleManualSearch`
  - Hapus semua referensi ke web search
  - Update untuk hanya gunakan document RAG dari `useRAG` hook

## Fitur RAG yang Tersisa

### ✅ Document Upload RAG
1. **Upload Dokumen**
   - Format: TXT, MD, JSON, HTML, CSV
   - Max size: 5MB per file
   - Lokasi: Click ikon 📎 di chat input

2. **Document Processing**
   - File: `src/lib/documentProcessor.ts`
   - Ekstrak text dari berbagai format
   - Chunking untuk konteks yang lebih baik

3. **Document Management**
   - Component: `src/components/DocumentUpload.tsx`
   - Drag & drop support
   - List dokumen yang di-upload
   - Hapus dokumen individual

4. **RAG Settings**
   - Enable/disable RAG per-chat atau global
   - Settings di sidebar (Ctrl/Cmd + K)
   - Toggle RAG di three-dot menu chat header

## Cara Menggunakan (Document RAG Only)

### 1. Enable RAG
```
Settings → Document RAG → Enable Document RAG (ON)
```

### 2. Upload Dokumen
```
1. Click ikon 📎 di chat input area
2. Drag & drop file atau click "Choose files"
3. Dokumen akan diproses otomatis
```

### 3. Bertanya dengan Context
```
AI akan menggunakan isi dokumen untuk menjawab pertanyaan Anda.
Pastikan RAG enabled untuk chat tersebut.
```

## Struktur Kode RAG

### Hook: useRAG
```typescript
// src/hooks/useRAG.ts
const { 
  documents,           // List dokumen yang di-upload
  addDocument,         // Tambah dokumen
  removeDocument,      // Hapus dokumen
  clearDocuments,      // Hapus semua dokumen
  getRAGContext,       // Get formatted context untuk AI
  isRAGEnabled,        // Check apakah RAG aktif
  toggleRAG            // Toggle RAG on/off
} = useRAG(chatId);
```

### Document Processing
```typescript
// src/lib/documentProcessor.ts
export async function processDocument(file: File): Promise<ProcessedDocument>
export function extractText(content: string, fileType: string): string
export function chunkText(text: string, chunkSize?: number): string[]
export function formatDocumentForRAG(doc: ProcessedDocument): string
```

### Instructions
```typescript
// src/lib/searchInstructions.ts
export function generateDocumentInstruction(documentCount: number): string
export function formatDocumentContext(name: string, content: string, index: number): string
export function enhancePromptWithDocuments(prompt: string, count: number): string
```

## Next Steps (Action Required)

### 1. Fix ChatArea.tsx
Hapus semua referensi web search:
- Remove SearchResponse imports
- Remove search-related state
- Remove handleManualSearch function
- Remove search button UI
- Keep only document upload functionality

### 2. Update Headers (Desktop & Mobile)
- Remove quick search actions
- Keep RAGIndicator (document count only)
- Keep three-dot menu with RAG toggle

### 3. Test Build
```bash
npm run build
```

### 4. Test Functionality
- Upload dokumen
- Toggle RAG on/off
- Tanya dengan context dokumen
- Verify AI menggunakan document context

## Build Error Log

```
Error: Cannot find module 'searchApi'
Location: src/components/ChatArea.tsx

Fix:
1. Remove: import { SearchResponse, getSearchSettings } from "@/lib/searchApi"
2. Remove web search related code
3. Keep only document RAG functionality
```

## API Minimal (Document RAG Only)

### Settings Structure
```typescript
{
  ragEnabled: boolean  // Enable/disable document RAG
}
```

### Document Structure
```typescript
interface RAGDocument {
  id: string
  name: string
  content: string
  type: string
  size: number
  uploadedAt: number
}
```

### Chat Settings (Per-Chat)
```typescript
localStorage: `chat-${chatId}-rag`
{
  enabled: boolean
}
```

## File Size Summary

**Removed:** ~5 files (~2000 lines)
**Updated:** 5 files
**Build Status:** ⚠️ Needs ChatArea.tsx fix

## Timeline

- ✅ Delete web search files
- ✅ Update useRAG hook
- ✅ Update searchInstructions
- ✅ Update SettingsSidebar
- ✅ Update RAGIndicator
- ✅ Update Index.tsx
- ⏳ Fix ChatArea.tsx (CURRENT)
- ⏳ Fix headers (Desktop & Mobile)
- ⏳ Test build
- ⏳ Test functionality

---

**Last Updated:** 2024
**Status:** 80% Complete
**Next:** Fix ChatArea.tsx imports and remove web search code