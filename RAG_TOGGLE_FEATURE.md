# RAG Toggle Feature Documentation

## Overview
Fitur RAG (Retrieval-Augmented Generation) Toggle memungkinkan pengguna untuk mengaktifkan atau menonaktifkan RAG secara global melalui Settings Panel, dengan UI yang responsif, compact, dan mobile-friendly.

## Features

### 1. **Global RAG Toggle di Settings**
- Toggle switch utama untuk mengaktifkan/menonaktifkan RAG secara global
- Tersedia di Settings Panel (tab Settings di sidebar)
- Status disimpan di localStorage dan persist across sessions
- Visual warning ketika RAG disabled
- Tooltip informatif dan helpful hints

### 2. **Compact Status Indicator**
- Indikator visual status RAG di header (desktop & mobile)
- Minimalis dan tidak memakan banyak space
- Dot indicator dengan warna:
  - 🟢 Hijau (animate-pulse) = RAG Active
  - ⚪ Abu-abu = RAG Disabled
- Badge counter untuk jumlah dokumen yang di-upload
- Auto-hide ketika tidak relevan

### 3. **Document Management**
- Button untuk membuka panel dokumen
- Badge counter menunjukkan jumlah dokumen aktif
- Akses mudah ke pengelolaan dokumen RAG
- Compact design untuk mobile

### 4. **Responsive & Mobile-First Design**

#### **Mobile (< 1024px) - Ultra Compact**:
```
┌─────────────────────────────────────┐
│ ☰  Session Title [RAG] 📄 ⚙️        │
│    • 2 documents loaded             │ (optional, only when active)
└─────────────────────────────────────┘
```
- Single row header (32px height)
- Minimal padding: `px-3 py-2`
- Icon size: 16px (`h-4 w-4`)
- Button size: 32px (`h-8 w-8`)
- RAG badge inline dengan title
- Optional status bar hanya muncul saat RAG aktif dengan dokumen
- Touch-friendly targets (minimum 32x32px)

#### **Desktop (≥ 1024px) - Clean & Professional**:
```
┌─────────────────────────────────────────────────────────────┐
│ Session: Chat Title  [● RAG Active] [2 docs]   📄 Documents ⚙️│
└─────────────────────────────────────────────────────────────┘
```
- Single row header (40px height)
- Status indicator di kiri dengan session info
- Actions (Documents, Settings) di kanan
- Compact badge design
- Clear visual hierarchy

## Component Structure

### GeneralSettings Component
```typescript
interface GeneralSettingsState {
  ragEnabled: boolean;
  autoSave: boolean;
  confirmDelete: boolean;
}
```

**Features:**
- Global RAG toggle dengan description
- Warning message ketika RAG disabled
- Auto-save ke localStorage
- Informative tip card
- Responsive text sizes (10px mobile, 12px+ desktop)

### MobileHeader Component
```typescript
interface MobileHeaderProps {
  onMenuClick: () => void;
  sessionTitle: string;
  ragEnabled?: boolean;
  uploadedDocumentCount?: number;
  onOpenDocuments?: () => void;
  onOpenSettings?: () => void;
}
```

**Optimizations:**
- Removed toggle switch (moved to Settings)
- Ultra-compact single row design
- Badge counter pada documents button
- Optional status bar (only when needed)
- Text size: 12px title, 10px status

### DesktopHeader Component
```typescript
interface DesktopHeaderProps {
  sessionTitle: string;
  ragEnabled?: boolean;
  uploadedDocumentCount?: number;
  onOpenDocuments?: () => void;
  onOpenSettings?: () => void;
}
```

**Optimizations:**
- Removed toggle switch (moved to Settings)
- Cleaner layout dengan better spacing
- Status badge hanya muncul when relevant
- Reduced button sizes (h-8 instead of h-10)

## Usage

### In Settings Panel
```typescript
// Settings automatically save to localStorage
const settings = {
  ragEnabled: true,  // Global RAG control
  autoSave: true,
  confirmDelete: true
};
```

### In ChatArea Component
```typescript
// Get RAG settings from localStorage
const getRAGSettings = () => {
  const settings = localStorage.getItem("chatbotx-settings");
  if (settings) {
    const parsed = JSON.parse(settings);
    return {
      ragEnabled: parsed.ragEnabled ?? true,
    };
  }
  return { ragEnabled: true };
};

const ragSettings = getRAGSettings();

// Session-level control (future: per-session override)
const [ragEnabledForSession, setRagEnabledForSession] = useState(true);

// Combined logic
const isRagEnabled = ragSettings.ragEnabled && ragEnabledForSession;
```

### Pass to Headers
```typescript
<MobileHeader
  ragEnabled={ragEnabledForSession}
  uploadedDocumentCount={uploadedDocuments.length}
  onOpenDocuments={() => setDocumentPanelOpen(true)}
  onOpenSettings={onOpenSettings}
/>

<DesktopHeader
  ragEnabled={ragEnabledForSession}
  uploadedDocumentCount={uploadedDocuments.length}
  onOpenDocuments={() => setDocumentPanelOpen(true)}
  onOpenSettings={onOpenSettings}
/>
```

## Visual Design

### Color Scheme
- **Active State**: 
  - Indicator: `bg-green-500 animate-pulse`
  - Badge: `bg-primary/10 text-primary border-primary/20`
  
- **Disabled State**:
  - Indicator: `bg-gray-400`
  - Background: `bg-muted/30`

### Typography Scale (Responsive)
```css
/* Mobile First */
- Title: text-xs (12px)
- Status: text-[10px] (10px)
- Badge: text-[9px] (9px)

/* Desktop */
- Title: text-sm (14px)
- Status: text-xs (12px)
- Badge: text-[10px] (10px)
```

### Spacing System
```css
/* Mobile - Minimal */
- Header padding: px-3 py-2
- Gap between items: gap-1 to gap-2
- Icon size: h-4 w-4 (16px)
- Button size: h-8 w-8 (32px)

/* Desktop - Comfortable */
- Header padding: px-6 py-2.5
- Gap between items: gap-2 to gap-3
- Icon size: h-4 w-4 (16px)
- Button size: h-8 w-8 (32px)
```

## Behavior

### RAG Enable/Disable Flow

1. **User opens Settings** (sidebar → Settings tab)
2. **Toggle RAG switch**:
   - ON: RAG available, documents can enhance responses
   - OFF: RAG disabled globally, warning shown
3. **Settings auto-save** to localStorage
4. **Header updates** to show current status
5. **Chat behavior changes**:
   ```typescript
   if (isRagEnabled && uploadedDocuments.length > 0) {
     // Use document context
     const docContext = formatDocumentsForRAG(uploadedDocuments);
     messageContent = docContext + userMessage;
   } else {
     // Normal chat without RAG
     messageContent = userMessage;
   }
   ```

### Document Context Logic
```typescript
// RAG only active when:
// 1. Global setting enabled (Settings Panel)
// 2. Session setting enabled (future per-session control)
// 3. Documents uploaded

const isRagEnabled = ragSettings.ragEnabled && ragEnabledForSession;

if (isRagEnabled && uploadedDocuments.length > 0) {
  const docContext = formatDocumentsForRAG(uploadedDocuments);
  ragContext += docContext;
  ragContext += generateDocumentInstruction(uploadedDocuments.length);
}
```

## Accessibility

### Mobile Optimizations
- ✅ Minimum touch target: 32x32px (iOS/Android guideline)
- ✅ Adequate spacing between interactive elements
- ✅ Clear visual feedback on tap
- ✅ Readable text sizes (minimum 10px for labels)
- ✅ High contrast ratios
- ✅ No horizontal scrolling required

### Desktop Optimizations
- ✅ Hover states for all interactive elements
- ✅ Keyboard navigation support
- ✅ Tooltips on icon buttons
- ✅ Clear focus indicators

### Screen Reader Support
- ✅ Semantic HTML structure
- ✅ Title attributes on buttons
- ✅ Label associations with form controls
- ✅ Descriptive badge text

## Testing Checklist

### Settings Panel
- [ ] RAG toggle berfungsi dan save ke localStorage
- [ ] Warning message muncul saat RAG disabled
- [ ] Auto-save bekerja dengan baik
- [ ] Tip card informatif dan readable

### Mobile Header
- [ ] Header height tidak melebihi 50px
- [ ] Touch targets minimum 32x32px
- [ ] Badge counter update real-time
- [ ] Status bar hanya muncul when needed
- [ ] Text truncate dengan benar
- [ ] All buttons accessible dan responsive

### Desktop Header
- [ ] Layout clean dan professional
- [ ] Status indicator update real-time
- [ ] Badge counter update saat upload/remove
- [ ] Hover states bekerja
- [ ] Keyboard navigation OK

### RAG Functionality
- [ ] RAG hanya aktif saat setting enabled
- [ ] Document context terkirim saat RAG active
- [ ] Responses tidak menggunakan context saat disabled
- [ ] Upload documents tetap bisa (tapi tidak digunakan)

### Responsive Behavior
- [ ] Smooth transition mobile ↔ desktop
- [ ] No layout shift or overflow
- [ ] Text scaling sesuai viewport
- [ ] Icons dan spacing proporsional

## Performance Considerations

### Optimization Strategies
1. **Minimal Re-renders**:
   - Settings use localStorage, not React state in parent
   - Headers only re-render when props change
   - Memoization for expensive operations

2. **Efficient Storage**:
   ```typescript
   // Single localStorage key for all settings
   localStorage.setItem("chatbotx-settings", JSON.stringify({
     ragEnabled: true,
     autoSave: true,
     confirmDelete: true
   }));
   ```

3. **Conditional Rendering**:
   - Status bar only renders when needed
   - Badges only show when count > 0
   - Tooltips lazy-loaded

4. **CSS Optimizations**:
   - Tailwind utility classes (no runtime CSS-in-JS)
   - Hardware-accelerated animations (`transform`, `opacity`)
   - Minimal DOM nodes

## Future Enhancements

### Phase 2 Features
1. **Per-Session RAG Override**:
   - Allow temporary RAG enable/disable per chat
   - Independent from global setting
   - Useful for testing or specific use cases

2. **RAG Quality Metrics**:
   - Show relevance score of document matches
   - Token usage from RAG context
   - Performance indicators

3. **Advanced Settings**:
   - RAG context window size
   - Document chunking options
   - Similarity threshold tuning

4. **Keyboard Shortcuts**:
   - `Ctrl+R` - Toggle RAG
   - `Ctrl+D` - Open Documents
   - `Ctrl+Shift+R` - Reload documents

5. **Document Preview**:
   - Quick preview in header dropdown
   - Inline document viewer
   - Highlight relevant chunks

6. **Smart Auto-Enable**:
   - Auto-enable RAG when documents uploaded
   - Suggest enabling if user asks document questions
   - Context-aware prompts

## Technical Notes

### Dependencies
- `@/components/ui/switch` - Toggle switch
- `@/components/ui/button` - Buttons
- `@/components/ui/badge` - Counter badges
- `@/components/ui/card` - Settings cards
- `@/components/ui/label` - Form labels
- `@/components/ui/separator` - Visual separators
- `lucide-react` - Icons
- Tailwind CSS - Styling

### File Structure
```
src/components/
├── GeneralSettings.tsx       (NEW - Settings panel with RAG toggle)
├── MobileHeader.tsx          (UPDATED - Compact design)
├── DesktopHeader.tsx         (UPDATED - Cleaner layout)
├── ChatArea.tsx              (UPDATED - Props passing)
└── ChatSidebar.tsx           (UPDATED - Include GeneralSettings)
```

### LocalStorage Schema
```json
{
  "chatbotx-settings": {
    "ragEnabled": true,
    "autoSave": true,
    "confirmDelete": true
  }
}
```

## Migration Guide

### For Users
1. Existing chats continue working normally
2. RAG enabled by default (backward compatible)
3. Open Settings to customize RAG behavior
4. No data loss or session reset required

### For Developers
1. Import new `GeneralSettings` component
2. Add to Settings tab in sidebar
3. Remove old toggle controls from headers
4. Update props (remove `onToggleRAG`)
5. Test localStorage integration

## Troubleshooting

### RAG Not Working?
1. Check Settings Panel → RAG enabled?
2. Check documents uploaded?
3. Check console for errors
4. Verify localStorage not corrupted

### Header Too Large on Mobile?
1. Verify using latest component version
2. Check custom CSS overrides
3. Test on actual device (not just browser resize)

### Settings Not Saving?
1. Check browser localStorage enabled
2. Check private/incognito mode restrictions
3. Verify no errors in console
4. Try clearing localStorage and retry

## Support & Feedback

Untuk pertanyaan, bug reports, atau feature requests:
- Open issue di GitHub repository
- Tag dengan label: `enhancement`, `bug`, atau `question`
- Sertakan screenshot untuk UI issues
- Include browser/device info untuk mobile issues

---

**Version**: 2.0  
**Last Updated**: 2024  
**Author**: ChatBotX Team