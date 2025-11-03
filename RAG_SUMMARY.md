# RAG Feature Summary

## What is RAG?

**RAG (Retrieval-Augmented Generation)** allows you to upload documents and have the AI use them as context when answering your questions. Instead of relying only on its training data, the AI references your specific documents for accurate, context-aware responses.

## Quick Start

1. **Create a chat session** - Select an AI model
2. **Upload documents** - Click the 📎 upload button
3. **Ask questions** - Type questions about your documents
4. **Get accurate answers** - AI uses your documents as primary source

## Key Features

✅ **Multiple File Formats** - PDF, TXT, DOC, DOCX, MD, CSV, JSON  
✅ **Multi-Document Support** - Upload multiple files per session  
✅ **Smart Citations** - AI references which document information came from  
✅ **Privacy First** - All processing happens locally in your browser  
✅ **Fast Processing** - Optimized document extraction and chunking  
✅ **Context Preservation** - Documents remain active throughout the session  

## How It Works

```
Your Documents → Text Extraction → Context Injection → AI Response
     ↓                 ↓                  ↓                ↓
  Upload           Process         Add to Prompt    Uses Document
  Files            Content         with Question    as Reference
```

## Supported Formats

| Format | Extension | Max Size |
|--------|-----------|----------|
| PDF | `.pdf` | 10 MB |
| Text | `.txt` | 5 MB |
| Word | `.doc`, `.docx` | 10 MB |
| Markdown | `.md` | 5 MB |
| CSV | `.csv` | 5 MB |
| JSON | `.json` | 5 MB |

## Best Practices

### ✅ Do:
- Upload relevant documents for your questions
- Use clear, well-structured documents
- Keep files under recommended size limits
- Remove documents when no longer needed

### ❌ Don't:
- Upload huge files (>10 MB)
- Mix unrelated topics in one session
- Use scanned PDFs without text (OCR not supported yet)
- Overload with too many large documents

## Example Usage

### Single Document Analysis
```
Upload: company_report.pdf

Question: "What was the revenue in Q4?"

AI Response: "According to Document 1 (company_report.pdf), 
the revenue in Q4 was $16.5M, representing a 32% increase 
year-over-year..."
```

### Multi-Document Comparison
```
Upload: proposal_v1.pdf, proposal_v2.pdf

Question: "What are the main differences?"

AI Response: "Comparing the two proposals:
- Budget: V1 ($500K) vs V2 ($650K)
- Timeline: V1 (6 months) vs V2 (8 months)
- Scope: V2 includes mobile app, V1 does not..."
```

## Privacy & Security

🔒 **Your documents stay private:**
- All processing happens in your browser
- No server uploads
- Stored locally in browser storage
- Cleared when you clear browser data

⚠️ **Note:** Document content IS sent to AI providers (Groq, OpenRouter, etc.) when generating responses. Choose providers you trust.

## Troubleshooting

### Document Won't Upload
- Check file size (under 10 MB)
- Verify supported format
- Try different browser if needed

### AI Not Using Documents
- Ensure RAG is enabled (toggle in header)
- Verify documents uploaded successfully
- Ask questions directly related to content
- Check documents contain relevant information

### Slow Performance
- Reduce document sizes
- Remove unnecessary documents
- Use text formats instead of PDFs when possible

## Tips for Better Results

1. **Be Specific** - Ask clear, focused questions
2. **Reference Documents** - Mention document names if you have multiple
3. **Verify Context** - Check that uploaded documents are relevant
4. **Manage Documents** - Remove outdated files regularly
5. **Use Multiple Sources** - Upload related documents for comprehensive answers

## Coming Soon

- 🔍 Advanced semantic search
- 📸 Image OCR support
- 📊 Document summarization
- 🔄 Document versioning
- 💾 Import/export document sets
- 🎨 Citation highlighting

## Need More Details?

📖 Read the full [RAG Documentation](./RAG_DOCUMENTATION.md) for:
- Detailed technical information
- Advanced usage scenarios
- API integration guides
- Complete troubleshooting guide
- Development roadmap

---

**TL;DR:** Upload your documents → Ask questions → Get accurate answers based on YOUR content! 🚀