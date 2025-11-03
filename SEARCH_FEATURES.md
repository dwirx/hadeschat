# 🔍 Search Features Documentation

## Overview

ChatBotX now includes powerful manual and automatic search capabilities that let you control when and how to search the web for accurate, up-to-date information.

---

## 🎯 Key Features

### 1. **Manual Search Button** 🔍
- **Location**: Next to send button in input area
- **Function**: Search web BEFORE sending your message
- **Benefits**: 
  - Review results first
  - Control what gets searched
  - See sources before asking
  - Better context for AI

### 2. **Quick Search Menu** ⚡
- **Location**: Below input area, "Quick Search" button
- **Function**: Instant access to popular searches
- **Categories**:
  - 📰 News (Today's news, Tech news, AI developments)
  - 📍 Local (Weather, News, Events in your area)
  - 📈 Trending (Topics, Crypto, Stock market)
  - 📅 Events (Today's events, Holidays)

### 3. **AI-Assisted Search Detection** 🤖
- **Function**: AI detects when you want to search
- **Triggers**:
  - "search for [topic]"
  - "cari informasi tentang [topic]"
  - "berita hari ini di Malang"
  - "look up [something]"
- **Action**: Shows prompt with "Search Now" button

### 4. **Smart Search Suggestions** 💡
Three types of intelligent hints:

#### Amber Alert (High Priority)
Shows when your query needs current information:
- Recent events (today, yesterday, this week)
- Location-specific (di Malang, in Jakarta)
- Statistics/data requests
- **Action**: "Search Now" button included

#### Blue Suggestion (General)
Shows for question patterns:
- Questions starting with: what, where, when, who, why, how
- Questions ending with "?"
- **Message**: "Looks like a question - Click 🔍 to search web first"

#### Green Ready (Search Complete)
Shows when search results are loaded:
- Number of sources found
- "Send message to use them" prompt
- **Action**: "Clear" button to reset

### 5. **Comprehensive AI Instructions** 📋
AI receives detailed instructions on how to use search results:
- When to prioritize search results over training data
- How to cite sources
- How to handle conflicts in information
- When to acknowledge limitations
- How to combine documents + web search

---

## 🎮 How to Use

### Method 1: Manual Search (Recommended)
**Best for**: When you want full control

```
1. Type your query: "berita hari ini di Malang"
2. Click 🔍 Search button (NOT send button!)
3. Wait for results to load
4. Review results in popup panel
5. Now send your message
6. AI uses search results automatically!
```

**Visual Feedback**:
- 🔍 Default: Ready to search
- 🔄 Searching: Animated spinner
- ✅ Complete: Green globe icon + results count

### Method 2: Quick Search
**Best for**: Common queries, speed

```
1. Click "Quick Search" button
2. Browse categories (News, Local, Trending, etc.)
3. Click any option
4. Instant search + results!
5. Ready to chat with current info
```

**Popular Options**:
- Berita Hari Ini
- Cuaca [Your City]
- Harga Crypto
- Trending Topics
- Event Hari Ini

### Method 3: AI-Assisted
**Best for**: Natural conversation

```
1. Type: "tolong cari berita hari ini di Malang"
2. System detects search request
3. Shows amber alert with "Search Now" button
4. Click the button
5. AI searches and loads results
6. Continue conversation!
```

**Trigger Phrases**:
- "search for [topic]"
- "cari informasi tentang [topic]"
- "berita hari ini"
- "find out about [topic]"
- "look up [something]"

### Method 4: Auto-Search (Passive)
**Best for**: Hands-free experience

```
1. Enable auto-search in settings
2. Just ask questions naturally
3. System auto-detects and searches
4. Results used automatically
```

**Note**: Auto-search only works for question patterns.

---

## 🎨 User Interface Elements

### Search Button States

| State | Icon | Color | Meaning |
|-------|------|-------|---------|
| **Ready** | 🔍 | Default | Click to search |
| **Searching** | 🔄 | Blue | Search in progress |
| **Results Ready** | 🌐 | Green | Results loaded, ready to use |
| **Disabled** | 🔍 | Gray | RAG disabled or no query |

### Alert/Suggestion Banners

#### 🟨 Amber Alert (High Priority)
```
💡 This is about recent events - web search recommended for current information
[Search Now] button
```

Triggers:
- today, yesterday, this week
- di Malang, in Jakarta (location)
- statistics, data, numbers
- "cari", "search for" commands

#### 🟦 Blue Suggestion (General)
```
🔍 Looks like a question - Click 🔍 to search web first for accurate answers
```

Triggers:
- Question words (what, when, where, how, why)
- Questions ending with "?"

#### 🟩 Green Ready (Success)
```
🌐 5 web sources ready - Send message to use them [Clear]
```

Shows when:
- Search completed successfully
- Results available
- Ready to send message

### Search Results Panel
Animated popup showing:
- Search query used
- Search engine (DuckDuckGo/Brave)
- Number of results
- Each result with:
  - Title
  - Snippet/Description
  - Source URL
  - Click to open in new tab

---

## 🧠 AI Instructions System

The AI receives comprehensive instructions based on context:

### Search Results Only
```
[WEB SEARCH CONTEXT AVAILABLE]
5 search results from DuckDuckGo provided above.

INSTRUCTIONS FOR AI:
✓ Use search results for accurate, current information
✓ Cite sources by mentioning website name
✓ Prioritize official/reputable sources
✓ If asked about recent events, rely on search results
✓ Mention if results contradict each other
✓ Provide URLs when users might want more info

DO NOT:
✗ Make up information not in results
✗ Claim certainty if results are unclear
✗ Ignore results in favor of training data
```

### Documents Only
```
[UPLOADED DOCUMENTS CONTEXT]
2 user-uploaded documents provided above.

INSTRUCTIONS FOR AI:
✓ Answer based on document content
✓ Quote relevant passages
✓ Reference document filename
✓ State clearly if answer not in documents
✓ Summarize or analyze as requested
```

### Combined (Documents + Search)
```
[ENHANCED CONTEXT: DOCUMENTS + WEB SEARCH]
Context Available:
• 2 uploaded documents
• 5 web search results from DuckDuckGo

PRIORITY INSTRUCTIONS:
1. Check uploaded documents first
2. Use web search to supplement/verify
3. Combine both for comprehensive answers
4. Cite source of each piece of information
5. Explain if documents and web conflict
6. Use web for current events
7. Use documents for user-specific data
```

---

## 🎓 Best Practices

### When to Use Manual Search

✅ **Use Manual Search When**:
- You need current news/events
- Location-specific information
- Statistics and data
- Fact-checking claims
- Recent developments in a topic
- Weather, sports scores, stock prices

❌ **Don't Use Search When**:
- Creative writing tasks
- Opinion-based discussions
- Mathematical calculations
- Code generation (unless researching libraries)
- Personal advice
- Brainstorming ideas

### Search Query Tips

**Good Queries** (Specific):
- ✅ "berita AI terbaru hari ini"
- ✅ "cuaca Malang 2024"
- ✅ "harga Bitcoin hari ini"
- ✅ "event teknologi Jakarta bulan ini"

**Poor Queries** (Too Vague):
- ❌ "AI"
- ❌ "cuaca"
- ❌ "berita"
- ❌ "harga"

### Workflow Recommendations

#### For Research:
```
1. Type research question
2. Manual search 🔍
3. Review 5-10 results
4. Ask AI to analyze/summarize
5. Follow up with specific questions
```

#### For Quick Facts:
```
1. Use Quick Search
2. Select relevant category
3. Instant results
4. Ask direct question
```

#### For Document + Web:
```
1. Upload documents first
2. Ask question
3. If needs web data, manual search
4. AI combines both sources
```

---

## 🔧 Configuration

### Enable Manual Search
Manual search is always available when:
- ✅ RAG is enabled (toggle in header menu)
- ✅ You have an active chat session
- ✅ Input contains a query

### Search Settings (Ctrl+K)
Configure in settings sidebar:

**RAG & Web Search Section**:
- **Enable RAG**: Master toggle (must be ON)
- **Search Engine**: DuckDuckGo (free) or Brave (requires API key)
- **Brave API Key**: Enter if using Brave Search
- **Max Results**: 3, 5, 10, or 15 (affects auto-search only)
- **Auto-Search**: Toggle automatic question detection

**Per-Session Control**:
- Three-dot menu (⋮) in header
- Toggle "Enable RAG Search" for this chat only

---

## 📊 Search Flow Diagram

```
User Types Query
    ↓
┌─────────────────────────────┐
│ Smart Detection             │
├─────────────────────────────┤
│ • AI-requested search?      │
│ • Recent events?            │
│ • Location-specific?        │
│ • Statistics?               │
└─────────────────────────────┘
    ↓
Shows Suggestion/Alert
    ↓
User Clicks 🔍 or "Search Now"
    ↓
┌─────────────────────────────┐
│ Perform Web Search          │
├─────────────────────────────┤
│ • Extract query             │
│ • Call search API           │
│ • Format results            │
└─────────────────────────────┘
    ↓
Display Results Panel
    ↓
Generate AI Instructions
    ↓
User Sends Message
    ↓
┌─────────────────────────────┐
│ AI Response with Context    │
├─────────────────────────────┤
│ • Search results            │
│ • Documents (if any)        │
│ • Comprehensive instructions│
└─────────────────────────────┘
    ↓
AI Responds with Sources
```

---

## 🎯 Use Case Examples

### Example 1: Manual News Search
```
User types: "perkembangan AI terbaru"
User clicks: 🔍 Search button
System: Searches DuckDuckGo
Results: 5 articles found
Panel shows: Titles, snippets, sources
User types: "rangkumkan artikel tersebut"
AI: Summarizes with citations
```

### Example 2: Quick Search for Weather
```
User clicks: "Quick Search"
User selects: "Cuaca Malang"
System: Instant search
Results: Current weather data
User asks: "apakah perlu bawa payung?"
AI: Recommends based on weather data
```

### Example 3: AI-Detected Search
```
User types: "tolong cari berita hari ini tentang teknologi"
System: Detects search request
Alert shows: "Click search now!"
User clicks: "Search Now" button
System: Searches for "berita hari ini tentang teknologi"
Results: Latest tech news
User can now discuss with AI
```

### Example 4: Location + Stats
```
User types: "berapa penduduk Malang tahun 2024?"
System: Detects stats + location
Alert: "This asks for statistics - web search recommended"
User clicks: "Search Now"
Results: Population data
AI responds: With accurate numbers + sources
```

### Example 5: Combined Context
```
User uploads: company-report.pdf (as .txt)
User types: "bandingkan dengan data industri terkini"
User clicks: 🔍 to search "data industri terkini"
Results: Industry reports loaded
AI receives: Document + web results
AI responds: Comprehensive comparison
```

---

## 💡 Pro Tips

### Tip 1: Search Before Asking
For best results, search first, then ask questions about the results.

### Tip 2: Use Quick Search for Speed
Don't type common queries - use Quick Search presets!

### Tip 3: Review Results
Click results in panel to verify sources before using.

### Tip 4: Clear Old Results
Click "Clear" if search results are outdated or no longer needed.

### Tip 5: Combine with Documents
Upload docs + manual search = comprehensive answers!

### Tip 6: Let AI Detect
Say "cari" or "search for" - AI will prompt you!

### Tip 7: Specific Queries
More specific = better results. Add dates, locations, keywords.

### Tip 8: Use Right Engine
- DuckDuckGo: Privacy, general queries
- Brave: Quality, technical topics (requires API key)

---

## ❓ FAQ

**Q: Do I always need to search manually?**
A: No! Enable auto-search in settings for automatic searching. Manual gives you more control.

**Q: What happens if I send without searching?**
A: AI uses its training data only (which may be outdated for current events).

**Q: Can I search after sending a message?**
A: No, search before sending. Results are used when message is sent.

**Q: How do I know if results are being used?**
A: Green banner shows "X web sources ready". AI also cites sources in response.

**Q: What if search finds nothing?**
A: Try rephrasing, use different keywords, or try different search engine.

**Q: Can I search in Bahasa Indonesia?**
A: Yes! Both engines support Indonesian queries. Try Quick Search for local news.

**Q: Do searches cost money?**
A: DuckDuckGo is free. Brave has free tier (2,000/month), then paid.

**Q: Are searches private?**
A: Yes. DuckDuckGo doesn't track. Brave respects privacy. We don't log searches.

**Q: Can I see search results later?**
A: Results shown in panel during session. Panel can be reopened from bottom if closed.

---

## 🚨 Troubleshooting

### Manual Search Not Working
**Problem**: Click 🔍 but nothing happens

**Solutions**:
1. ✅ Check RAG is enabled (three-dot menu in header)
2. ✅ Ensure input box has a query
3. ✅ Wait for previous search to complete
4. ✅ Check internet connection

### No Results Found
**Problem**: Search completes but 0 results

**Solutions**:
1. ✅ Rephrase query (more specific)
2. ✅ Try English keywords
3. ✅ Remove special characters
4. ✅ Try different search engine
5. ✅ Check search engine API key (if using Brave)

### Quick Search Not Showing
**Problem**: Can't see Quick Search button

**Solutions**:
1. ✅ RAG must be enabled
2. ✅ Must have active chat session
3. ✅ Button is below document indicator

### AI Not Using Results
**Problem**: AI ignores search results

**Solutions**:
1. ✅ Ensure results loaded (green banner shows)
2. ✅ Send message AFTER search completes
3. ✅ Check results panel has content
4. ✅ Try asking explicitly about sources

### Search Taking Too Long
**Problem**: Search stuck on "Searching..."

**Solutions**:
1. ✅ Check internet connection
2. ✅ Try different search engine
3. ✅ Refresh page if stuck >30 seconds
4. ✅ Reduce max results in settings

---

## 🔮 Coming Soon

- [ ] **Search History**: View past searches
- [ ] **Save Searches**: Bookmark useful searches
- [ ] **More Engines**: Google, Bing integration
- [ ] **Image Search**: Visual search results
- [ ] **News Mode**: Dedicated news search
- [ ] **Real-time Data**: Live stock, crypto, weather widgets
- [ ] **Search Templates**: Pre-made search patterns
- [ ] **Batch Search**: Search multiple queries at once

---

## 📚 Related Documentation

- **Full Setup**: See `README.md`
- **RAG Guide**: See `RAG_SEARCH_GUIDE.md`
- **All Features**: See `FEATURE_SUMMARY.md`
- **Quick Start**: See `QUICK_START.md`

---

**Version**: 1.1.0  
**Last Updated**: 2024  
**Maintained By**: ChatBotX Team

**Happy Searching! 🔍✨**