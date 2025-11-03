# Quick Start Guide - RAG & Document Upload Features

## 🚀 Get Started in 3 Steps

### Step 1: Enable RAG
1. Click the **three-dot menu (⋮)** in the header
2. Toggle **"Enable RAG Search"** to ON
3. You're ready to use RAG!

### Step 2: Choose Your Search Engine
1. Press `Ctrl+K` (or `Cmd+K` on Mac) to open Settings
2. Select **Search Engine**:
   - **DuckDuckGo**: Free, works immediately ✅
   - **Brave Search**: Better results, requires API key

### Step 3: Start Using RAG!

#### Option A: Web Search (Auto)
Just ask questions naturally:
```
"What are the latest AI developments?"
"How does quantum computing work?"
"When was React 19 released?"
```
✨ Auto-search activates and enhances AI responses with web results!

#### Option B: Web Search (Manual)
Want to search before asking?
1. Type your query: `berita hari ini di Malang`
2. Click **🔍 Search button** (next to send button)
3. Wait for results (they'll appear in a panel)
4. Now send your message - AI will use those results!

**OR** use **Quick Search**:
- Click "Quick Search" button below input
- Choose from popular searches (News, Weather, Crypto, etc.)
- Instantly get current information!

#### Option C: Upload Documents
1. Click the **📎 Upload button** (next to send button)
2. Drag & drop or click to select files
3. Upload TXT, MD, JSON, HTML, or CSV files (max 10MB)
4. Ask questions about your documents!

```
Example:
- Upload: company-handbook.txt
- Ask: "What is the vacation policy?"
- AI answers using your document! 📄
```

#### Option D: Combined Power
Upload documents AND ask questions - get the best of both worlds!

---

## 📱 Quick Controls

### Header Menu (⋮)
- **Enable RAG Search**: Quick toggle ON/OFF
- **Settings**: Full configuration panel

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Open Settings
- `Enter`: Send message
- `Shift + Enter`: New line

### Action Buttons (Input Area)
- **🔍 Search Button**: Manual web search
- **📎 Upload Button**: Upload documents for RAG
- **Quick Search**: Popular search queries

### Smart Suggestions
The system will show helpful hints:
- 💡 **Search Reminder**: For current events/location queries
- 🔵 **Search Suggestion**: For general questions
- ✅ **Search Ready**: When results are loaded

---

## ⚡ Tips for Best Results

### 1. When to Use RAG
✅ Use RAG for:
- Current events & news
- Technical documentation questions
- Research and fact-checking
- Document Q&A
- Location-specific information
- Statistics and data

❌ Disable RAG for:
- Creative writing
- Casual conversation
- Brainstorming
- Personal opinions

### 2. How to Trigger Search
**Automatic** (if auto-search enabled):
- Questions starting with: what, where, when, who, why, how
- Questions ending with "?"

**Manual** (always available):
- Type your query
- Click 🔍 search button
- Use "Quick Search" for popular queries

**AI-Assisted**:
- Say: "search for [topic]"
- Say: "cari informasi tentang [topic]"
- Say: "berita hari ini di Malang"
- System will prompt you to click search!

### 3. Document Upload Tips
- Convert PDFs to TXT for now (PDF support coming soon)
- Use clear, descriptive filenames
- Maximum 10MB per file
- Supported: TXT, MD, JSON, HTML, CSV

### 4. Search Engine Selection
- **DuckDuckGo**: 
  - ✅ Free, no setup
  - ✅ Privacy-focused
  - ✅ Good for general queries
  
- **Brave Search**: 
  - ✅ Higher quality results
  - ✅ Better for technical topics
  - ⚠️ Requires API key (free tier: 2,000 queries/month)
  - 🔗 Get key: https://brave.com/search/api/

---

## 🎯 Common Use Cases

### Use Case 1: Current News (Manual Search)
```
1. Type: "berita terbaru hari ini di Malang"
2. Click 🔍 search button
3. See search results in panel
4. Ask follow-up question - AI uses those results!
```

### Use Case 2: Quick Information (Quick Search)
```
1. Click "Quick Search" button
2. Select "Berita Hari Ini" or "Cuaca Malang"
3. Instant search + ready to chat with results!
```

### Use Case 3: Research Assistant (Auto)
```
1. Enable RAG + auto-search
2. Ask: "What are the pros and cons of TypeScript vs JavaScript in 2024?"
3. Get current, fact-based comparison with sources (auto-searched!)
```

### Use Case 4: Document Analysis
```
1. Upload company-data.csv
2. Ask: "What were the top 3 products by revenue?"
3. AI analyzes your document and answers
```

### Use Case 5: Combined Power
```
1. Upload your study notes
2. Type: "search for latest developments in this topic"
3. Click 🔍 to get web results
4. Ask: "Compare my notes with current trends"
5. AI combines both sources!
```

### Use Case 6: AI-Requested Search
```
1. Say: "cari berita hari ini tentang AI"
2. System detects search request
3. Shows prompt: "Click search now!"
4. One click to search and use results
```

---

## 🔧 Configuration Options

### In Settings (Ctrl+K):

**RAG & Web Search Section**:
- ✅ Enable RAG: Master toggle
- 🔍 Search Engine: DuckDuckGo or Brave
- 🔑 Brave API Key: Enter if using Brave
- 📊 Max Results: 3, 5, 10, or 15 results
- 🎯 Auto-Search: Automatically search on questions

**Per-Session Control**:
- Use three-dot menu (⋮) in header
- Toggle RAG ON/OFF for specific chats
- Works independently from global settings

---

## 📊 Visual Indicators

### RAG Status Indicator (in header)
Shows current RAG state:

🔄 **Searching**: "Searching web..." with spinner
✅ **Active**: Shows number of sources found
📄 **With Docs**: Shows document count
❌ **No Results**: "No results found"

### Document Counter (below input)
When documents are uploaded:
```
📄 2 documents in context [Manage]
```

### Search Panel (animated popup)
- Appears when search completes
- Shows all search results
- Click to open sources
- Collapsible interface

### Search Button States
🔍 **Default**: Ready to search
🔄 **Searching**: Animated spinner
✅ **Ready**: Green globe (results loaded)

---

## ❓ Troubleshooting

### RAG Not Working?
1. ✅ Check RAG is enabled (three-dot menu)
2. ✅ Verify settings are configured (Ctrl+K)
3. ✅ For Brave: ensure API key is valid
4. ✅ Try toggling OFF then ON

### Manual Search Not Working?
1. ✅ RAG must be enabled first
2. ✅ Type a query in the input box
3. ✅ Click 🔍 button (not send button!)
4. ✅ Wait for results, then send message

### Document Upload Failed?
1. ✅ File size under 10MB?
2. ✅ File type supported? (TXT, MD, JSON, HTML, CSV)
3. ✅ Try converting to plain text
4. ✅ Check browser console for errors

### Search Not Triggering?
1. ✅ Auto-search enabled in settings?
2. ✅ Using question format? (What, How, When, etc.)
3. ✅ Try ending with "?"
4. ✅ RAG enabled in header menu?

### No Search Results?
- Try rephrasing your question
- Use more specific keywords
- Try different search engine
- Check internet connection

---

## 🎓 Pro Tips

### Tip 1: Combine Sources
Upload a document + enable web search = comprehensive answers combining your docs with current web data!

### Tip 2: Session-Level Control
Working on creative writing? Toggle RAG OFF for that chat. Doing research? Toggle it ON!

### Tip 3: Manage Context
Too many documents can slow responses. Use "Manage" button to remove unused files.

### Tip 4: Optimize Search Results
- 3-5 results: Fast, focused answers
- 10-15 results: Comprehensive research

### Tip 5: Use Manual Search for Better Control
Type your query → Click 🔍 → Review results → Then ask your question!

### Tip 6: Use Quick Search for Speed
Click "Quick Search" for instant access to popular queries (news, weather, crypto, etc.)

### Tip 7: Let AI Request Search
Say "search for X" or "cari informasi Y" - AI will prompt you to click search!

### Tip 8: Use Keyboard Shortcuts
`Ctrl/Cmd + K` for quick settings access!

---

## 📚 Learn More

- **Full Documentation**: See `RAG_SEARCH_GUIDE.md`
- **All Features**: See `FEATURE_SUMMARY.md`
- **Changes**: See `CHANGELOG.md`
- **Setup**: See `README.md`

---

## 🎉 You're Ready!

That's it! You now know how to:
- ✅ Enable and use RAG
- ✅ Manual search with 🔍 button
- ✅ Quick Search for popular queries
- ✅ Upload documents for Q&A
- ✅ Configure search engines
- ✅ Control RAG per session
- ✅ Use AI-assisted search requests
- ✅ Get the best results

**Happy chatting with enhanced AI!** 🚀

---

**Need Help?**
- Check documentation files above
- Open GitHub issue for bugs
- Review troubleshooting section

**Version**: 1.1.0  
**Last Updated**: 2024