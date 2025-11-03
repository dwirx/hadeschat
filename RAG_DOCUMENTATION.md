# RAG (Retrieval-Augmented Generation) Documentation

## Overview

**ChatBotX RAG** is a powerful feature that allows you to enhance AI responses with your own documents. By uploading files, the AI can provide accurate, context-aware answers based on your specific content rather than relying solely on its training data.

## What is RAG?

**Retrieval-Augmented Generation (RAG)** is an AI technique that combines:
- **Retrieval**: Accessing relevant information from your uploaded documents
- **Generation**: Using that information to generate accurate, contextual responses

Think of it as giving the AI a reference library to consult before answering your questions.

## Key Features

### 📄 Document Upload
- Support for multiple file formats: PDF, TXT, DOC, DOCX, MD, and more
- Drag-and-drop or click to upload
- Multiple document support in a single conversation
- Real-time document processing

### 🎯 Context-Aware Responses
- AI prioritizes information from your uploaded documents
- Accurate citations and references
- Clear distinction between document content and general knowledge
- Cross-document synthesis when multiple files are uploaded

### 🔒 Privacy & Security
- All document processing happens locally in your browser
- Documents are stored in your browser's local storage
- No server uploads (your data never leaves your device)
- Documents are session-specific

### ⚡ Performance
- Fast document processing using Web Workers
- Efficient text extraction and chunking
- Optimized context injection to AI models
- Minimal impact on response time

## How to Use RAG

### Step 1: Create a Chat Session
1. Open ChatBotX
2. Click "New Chat" in the sidebar
3. Select your preferred AI model
4. A new chat session will be created

### Step 2: Upload Documents
You have several ways to upload documents:

**Method A: Welcome Screen Upload**
- On first use, you'll see a document upload card
- Click "Upload Documents" or drag files into the designated area

**Method B: Document Panel**
- Click the 📎 Upload icon in the chat input area
- The document management panel will open
- Drag files or click to browse
- Selected files will be processed automatically

**Method C: Header Button**
- On desktop, click the document count badge in the header
- This opens the document management panel

### Step 3: Ask Questions
Once documents are uploaded:
1. Type your question in the input box
2. The AI will automatically use your documents as context
3. Responses will reference specific documents when applicable
4. Citations will indicate which document information came from

### Step 4: Manage Documents
- View all uploaded documents in the management panel
- Remove documents you no longer need
- Upload additional documents at any time
- Toggle RAG on/off in the header if needed

## Supported File Formats

| Format | Extension | Max Size | Notes |
|--------|-----------|----------|-------|
| PDF | `.pdf` | 10 MB | Full text extraction including tables |
| Text | `.txt` | 5 MB | Plain text files |
| Markdown | `.md` | 5 MB | Preserves formatting |
| Word | `.doc`, `.docx` | 10 MB | Microsoft Word documents |
| Rich Text | `.rtf` | 5 MB | Rich Text Format |
| CSV | `.csv` | 5 MB | Comma-separated values |
| JSON | `.json` | 5 MB | JSON data files |

## Best Practices

### ✅ Do's
1. **Use Relevant Documents**: Upload documents directly related to your questions
2. **Organize Content**: Well-structured documents produce better results
3. **Clear Naming**: Use descriptive filenames for easy identification
4. **Multiple Sources**: Upload multiple documents for comprehensive coverage
5. **Update Regularly**: Remove outdated documents and add new ones as needed

### ❌ Don'ts
1. **Avoid Huge Files**: Keep files under the recommended size limits
2. **Don't Mix Topics**: Separate unrelated topics into different chat sessions
3. **Avoid Scanned PDFs**: Text-based PDFs work best (OCR not supported yet)
4. **Don't Overload**: Too many large documents may slow processing
5. **Skip Empty Files**: Ensure documents have actual content

## Advanced Features

### Multi-Document Synthesis
When multiple documents are uploaded, the AI can:
- Compare and contrast information across documents
- Find patterns and relationships
- Synthesize comprehensive answers from multiple sources
- Identify conflicting information

### Document Citation
The AI will cite sources in responses:
```
According to Document 1 (report.pdf), the revenue increased by 25%...
```

### Context Preservation
- Documents remain active throughout the chat session
- Context is maintained across multiple questions
- No need to re-upload for each question

## Technical Details

### Document Processing Pipeline
1. **Upload**: File selected by user
2. **Validation**: Check file type and size
3. **Extraction**: Text content extracted from file
4. **Chunking**: Large documents split into manageable chunks
5. **Storage**: Processed content stored in browser IndexedDB
6. **Injection**: Relevant chunks added to AI prompts

### RAG Context Format
When you send a message, the system formats your documents like this:

```
[Document Context - Use this information to answer the user's question]

Document 1: report.pdf
[Content of report.pdf...]
---

Document 2: notes.txt
[Content of notes.txt...]
---

[IMPORTANT INSTRUCTIONS]
You have access to 2 document(s) uploaded by the user...
[Additional guidelines for the AI...]

User Question: What was the revenue last quarter?
```

### Storage & Limits
- **Browser Storage**: IndexedDB (typically 50 MB - 1 GB available)
- **Per Document**: 10 MB recommended maximum
- **Total Documents**: Limited by browser storage
- **Persistence**: Documents persist until manually removed or browser data cleared

## Troubleshooting

### Document Won't Upload
**Problem**: File not uploading or processing fails

**Solutions**:
- Check file size (should be under 10 MB)
- Verify file format is supported
- Ensure file isn't corrupted
- Try a different browser if issues persist
- Clear browser cache and try again

### AI Not Using Document Context
**Problem**: AI responses don't reference uploaded documents

**Solutions**:
- Verify RAG is enabled (toggle in header)
- Check that documents successfully uploaded (green checkmark)
- Ask questions directly related to document content
- Try rephrasing your question to be more specific
- Ensure documents contain relevant information

### Slow Performance
**Problem**: Document processing or AI responses are slow

**Solutions**:
- Reduce document file sizes
- Remove unnecessary documents
- Upload fewer documents per session
- Use text-based formats instead of PDFs when possible
- Close other browser tabs to free memory

### Document Context Too Large
**Problem**: "Context too large" error when sending messages

**Solutions**:
- Remove some uploaded documents
- Use smaller, more focused documents
- Split large documents into smaller files
- Ask more specific questions to reduce context needed

## API & Integration

### Programmatic Access
Currently, RAG is UI-based only. Programmatic access coming in future versions.

### Custom Document Processors
To add support for custom file formats, modify:
```typescript
// src/lib/documentProcessor.ts
export const processDocument = async (file: File): Promise<ProcessedDocument>
```

## Privacy & Security

### Data Handling
- ✅ All processing happens client-side (in your browser)
- ✅ No document uploads to external servers
- ✅ Documents stored locally in IndexedDB
- ✅ Cleared when you clear browser data
- ❌ Documents NOT encrypted at rest (use browser security features)

### Sensitive Information
For highly sensitive documents:
- Use in private/incognito mode
- Clear browser data after use
- Enable browser encryption if available
- Avoid using on shared computers

### AI Provider Privacy
When using RAG:
- Document content IS sent to the AI provider (Groq, OpenRouter, etc.)
- Choose providers with strong privacy policies
- Read provider's data retention policies
- Consider self-hosted models for maximum privacy

## FAQ

### Q: Are my documents saved on a server?
**A**: No. All documents are processed and stored locally in your browser. They never leave your device.

### Q: Can I use RAG with any AI model?
**A**: Yes. RAG works with all supported providers (Groq, OpenRouter, Together).

### Q: How many documents can I upload?
**A**: Limited by your browser's storage (typically 50 MB - 1 GB). Recommended: 5-10 documents per session.

### Q: Do documents persist across sessions?
**A**: Documents are session-specific. Each chat session has its own document set.

### Q: Can I upload images?
**A**: Currently text-only. Image OCR and vision support coming soon.

### Q: Does RAG work offline?
**A**: Document processing works offline, but AI responses require internet (API calls).

### Q: How accurate are RAG responses?
**A**: Very accurate when documents contain the information. AI explicitly states when information isn't in documents.

### Q: Can I export documents from a session?
**A**: Not yet. This feature is planned for future releases.

## Roadmap

### Coming Soon
- [ ] Image OCR support (extract text from scanned PDFs)
- [ ] Document export/import
- [ ] Advanced search within documents
- [ ] Document versioning
- [ ] Shared document libraries
- [ ] Vector embeddings for semantic search
- [ ] Citation highlighting in responses
- [ ] Document summarization

### Under Consideration
- [ ] Multi-modal RAG (images, audio, video)
- [ ] Real-time document collaboration
- [ ] Cloud storage integration
- [ ] Custom chunking strategies
- [ ] Advanced filtering and ranking

## Support

### Getting Help
- **Documentation**: Check this guide first
- **Issues**: Report bugs on GitHub
- **Discussions**: Join community discussions
- **Email**: Contact support team

### Resources
- [Getting Started Guide](./QUICK_START.md)
- [Feature Summary](./FEATURE_SUMMARY.md)
- [API Documentation](./API_DOCS.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## Examples

### Example 1: Analyzing a Report
```
Documents: quarterly_report_q4.pdf

User: What was our revenue growth in Q4?

AI: According to Document 1 (quarterly_report_q4.pdf), the revenue 
growth in Q4 was 32% year-over-year, increasing from $12.5M to $16.5M. 
The document attributes this growth primarily to the launch of the new 
product line and expansion into the European market.
```

### Example 2: Comparing Multiple Documents
```
Documents: proposal_v1.pdf, proposal_v2.pdf

User: What are the key differences between the two proposals?

AI: Comparing Document 1 (proposal_v1.pdf) and Document 2 (proposal_v2.pdf):

Key Differences:
1. Budget: V1 proposes $500K, V2 proposes $650K
2. Timeline: V1 is 6 months, V2 is 8 months
3. Team Size: V1 has 5 members, V2 has 7 members
4. Scope: V2 includes mobile app development, V1 does not

Both proposals share the same core objectives and target audience.
```

### Example 3: Technical Documentation
```
Documents: api_documentation.md, setup_guide.md

User: How do I authenticate API requests?

AI: Based on Document 1 (api_documentation.md), here's how to 
authenticate API requests:

1. Obtain an API key from the developer dashboard
2. Include it in the request header: `Authorization: Bearer YOUR_API_KEY`
3. All requests must use HTTPS

Document 2 (setup_guide.md) adds that you should store your API key 
in environment variables for security, never hardcode it in your source code.
```

## Conclusion

RAG transforms ChatBotX into a powerful document analysis and question-answering system. By uploading your own documents, you can get accurate, contextual responses based on your specific content. This feature is perfect for:

- 📊 Analyzing reports and data
- 📚 Research and study assistance
- 💼 Business document analysis
- 📝 Content synthesis and summarization
- 🔍 Information retrieval and fact-checking

Start using RAG today to unlock the full potential of AI-powered document analysis!

---

**Version**: 2.0.0  
**Last Updated**: 2024  
**License**: MIT