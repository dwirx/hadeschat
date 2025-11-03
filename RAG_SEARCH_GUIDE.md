# RAG & Web Search Integration Guide

## 🌟 Overview

ChatBotX now includes powerful RAG (Retrieval-Augmented Generation) capabilities with integrated web search functionality. This feature enhances AI responses with real-time, accurate information from the web.

## 🚀 Features

### 1. **Web Search Integration**
- **DuckDuckGo Search** - Free, no API key required
- **Brave Search** - Premium search with API key support
- Real-time web results integrated into AI responses

### 2. **Smart Auto-Search**
- Automatically detects questions and queries
- Searches the web when needed
- Seamlessly augments AI responses with current information

### 3. **Interactive Search Panel**
- Beautiful animated panel showing search results
- Click to open sources in new tabs
- Collapsible interface to save screen space
- Mobile-responsive design

### 4. **Settings Sidebar**
- Easy-to-use settings interface
- Configure search preferences
- Manage API keys securely
- Toggle features on/off

## 📖 How to Use

### Getting Started

1. **Open Settings**
   - Click the ⚙️ Settings button (floating button on bottom-right)
   - Or press keyboard shortcut (coming soon)

2. **Enable RAG**
   - Toggle "Enable RAG" switch in the settings
   - This activates web search for your conversations

3. **Choose Search Engine**
   - **DuckDuckGo** (Default): Free, works immediately
   - **Brave Search**: Requires API key but offers better results

### Using DuckDuckGo (Free)

DuckDuckGo works out of the box:
```
✅ No API key required
✅ Free unlimited searches
✅ Privacy-focused
✅ Good for general queries
```

Simply enable RAG and start asking questions!

### Using Brave Search (Recommended)

For better search results, use Brave Search API:

1. **Get API Key**
   - Visit: https://brave.com/search/api/
   - Sign up for free tier (2,000 queries/month)
   - Copy your API key (starts with "BSA...")

2. **Configure in Settings**
   - Open Settings sidebar
   - Select "Brave Search" from dropdown
   - Paste your API key in the "Brave API Key" field
   - Key is saved securely in your browser

3. **Benefits**
   ```
   ✅ Higher quality results
   ✅ Better relevance
   ✅ More structured data
   ✅ Commercial-grade API
   ```

## 🎯 Auto-Search Feature

### How It Works

When **Auto Search** is enabled, the system automatically searches the web when you ask questions:

**Triggers Auto-Search:**
- Questions starting with: what, where, when, who, why, how
- Questions ending with "?"
- Queries about current events, facts, or information

**Examples:**
```
✓ "What is the latest news about AI?"
✓ "How does quantum computing work?"
✓ "When was React 19 released?"
✓ "Who won the 2024 Olympics?"
```

**Does NOT Trigger:**
```
✗ "Write me a poem"
✗ "Hello, how are you?"
✗ "Continue our previous conversation"
```

## 🔧 Configuration Options

### Max Search Results
Choose how many search results to retrieve:
- **3 results** - Quick, focused answers
- **5 results** (Default) - Balanced coverage
- **10 results** - Comprehensive research
- **15 results** - Deep dive into topics

### Auto Search Toggle
- **ON**: Automatically search for questions
- **OFF**: Only search when manually triggered

## 📱 User Interface

### Search Panel

The search panel appears when web search is performed:

**Features:**
- 🔍 Shows search query and engine used
- 📊 Displays number of results found
- 🔗 Click any result to open in new tab
- 📌 Collapsible to save screen space
- ✨ Smooth animations and transitions
- 📱 Fully responsive for mobile

**Controls:**
- **Expand/Collapse**: Toggle arrow button
- **Close**: X button
- **Open Link**: Click on any result card

### Settings Sidebar

Access comprehensive settings:

**Sections:**
1. **RAG & Web Search**
   - Enable/disable RAG
   - Choose search engine
   - Configure API keys
   - Set max results
   - Toggle auto-search

2. **Appearance** (Coming Soon)
   - Theme selection
   - UI customization

3. **Performance** (Coming Soon)
   - Streaming settings
   - Optimization options

## 🎨 Mobile Experience

Fully optimized for mobile devices:

- **Responsive Design**: Adapts to any screen size
- **Touch-Friendly**: Large tap targets
- **Smooth Animations**: Native-feeling transitions
- **Backdrop Overlay**: Focus on active panels
- **Bottom Sheets**: Mobile-native patterns

## 🔒 Privacy & Security

### API Key Storage
- Keys stored locally in browser (localStorage)
- Never sent to our servers
- Encrypted by browser's security model
- Only you have access

### Search Privacy
- **DuckDuckGo**: Privacy-focused, no tracking
- **Brave Search**: Privacy-respecting search
- No search history stored on our servers
- All searches are ephemeral

## 💡 Tips & Best Practices

### For Best Results

1. **Use Specific Questions**
   ```
   Good: "What are the new features in React 19?"
   Bad: "Tell me about React"
   ```

2. **Current Information**
   - Use RAG for recent events
   - Use RAG for factual data
   - Use RAG for statistics and numbers

3. **Manage Results**
   - Start with 5 results
   - Increase if needed
   - More results = longer processing time

4. **Engine Selection**
   - DuckDuckGo: General queries, privacy
   - Brave Search: Technical topics, detailed info

### Performance Tips

- **Auto-Search ON**: Convenience for research
- **Auto-Search OFF**: Faster casual chat
- **Lower Max Results**: Faster responses
- **Higher Max Results**: More comprehensive info

## 🐛 Troubleshooting

### Search Not Working

**DuckDuckGo Issues:**
```
Problem: No results appearing
Solution: Check internet connection
Solution: Try different query phrasing
```

**Brave Search Issues:**
```
Problem: "Invalid API key" error
Solution: Verify key is correct (starts with BSA)
Solution: Check API key is active on Brave dashboard

Problem: "Rate limit exceeded"
Solution: You've used monthly quota
Solution: Wait for reset or upgrade plan
```

### Search Panel Not Showing

1. Check if RAG is enabled in settings
2. Verify search was triggered (check auto-search rules)
3. Look for search loading indicator
4. Check browser console for errors

### Performance Issues

```
Issue: Slow responses
- Reduce max search results
- Use DuckDuckGo (faster)
- Check internet speed

Issue: Too many searches
- Disable auto-search
- Manually control when to search
```

## 🔮 Future Enhancements

Coming soon:
- [ ] Manual search button
- [ ] Search history
- [ ] Custom search sources
- [ ] More search engines (Google, Bing)
- [ ] Document upload for RAG
- [ ] Local knowledge base
- [ ] Search result caching
- [ ] Advanced filtering
- [ ] Keyboard shortcuts

## 📚 Technical Details

### How RAG Works

1. **User Input**: You ask a question
2. **Query Extraction**: System identifies key terms
3. **Web Search**: Searches selected engine
4. **Result Processing**: Formats and ranks results
5. **Context Injection**: Adds results to AI prompt
6. **AI Response**: AI uses search data + its knowledge
7. **Display**: Shows both response and sources

### Architecture

```
User Question
    ↓
[Auto-Search Detection]
    ↓
[Search API Call]
    ↓
[Result Formatting]
    ↓
[RAG Context Builder]
    ↓
[AI Prompt Enhancement]
    ↓
[AI Response Generation]
    ↓
User Sees Enhanced Answer
```

### API Integration

**DuckDuckGo API:**
- Endpoint: `https://api.duckduckgo.com/`
- Method: GET
- Rate Limit: None (fair use)
- Response: JSON

**Brave Search API:**
- Endpoint: `https://api.search.brave.com/res/v1/web/search`
- Method: GET
- Auth: X-Subscription-Token header
- Rate Limit: Based on plan
- Response: JSON with rich data

## 🤝 Contributing

Help improve RAG features:

1. Report bugs via GitHub issues
2. Suggest search engine integrations
3. Contribute to documentation
4. Share usage feedback

## 📞 Support

Need help?
- Check this guide first
- Review troubleshooting section
- Open GitHub issue
- Contact support team

---

**Built with ❤️ by the ChatBotX Team**

Version: 1.0.0
Last Updated: 2024