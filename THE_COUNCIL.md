# The Council - AI Deliberative Body

## Overview
The Council is a unique feature that brings together 7 AI specialists with different roles to deliberate on complex questions and produce well-rounded, comprehensive answers through structured debate and synthesis.

## The 7 Council Members

### 1. The Ethicist
- **Focus**: Moral and ethical considerations
- **Role**: Analyzes ethical implications, identifies moral concerns, advocates for fairness and human welfare
- **Perspective**: "Should we do this?" rather than "Can we do this?"

### 2. The Analyst
- **Focus**: Data, logic, and quantitative analysis
- **Role**: Examines empirical evidence, applies rigorous reasoning, demands evidence-based arguments
- **Perspective**: Objective, data-driven analysis with statistical rigor

### 3. The Advocate
- **Focus**: User and societal perspectives
- **Role**: Represents public interests, considers accessibility, ensures human-centered solutions
- **Perspective**: Voices concerns of those affected by decisions

### 4. The Skeptic
- **Focus**: Critical analysis and risk identification
- **Role**: Questions assumptions, identifies flaws, plays devil's advocate, prevents groupthink
- **Perspective**: "What could go wrong?" - constructive criticism

### 5. The Historian
- **Focus**: Historical context and precedents
- **Role**: Draws lessons from the past, identifies patterns, warns about repeated mistakes
- **Perspective**: "History doesn't repeat, but it rhymes"

### 6. The Futurist
- **Focus**: Long-term implications and scenarios
- **Role**: Considers second-order effects, anticipates unintended consequences, thinks beyond immediate results
- **Perspective**: "How will this decision age?"

### 7. The Synthesizer
- **Focus**: Integration and consensus building
- **Role**: Identifies common ground, integrates diverse viewpoints, proposes balanced solutions
- **Perspective**: Bridges gaps and creates coherent recommendations

## How It Works

### Deliberation Process
1. **User Query**: Submit your question or topic for deliberation
2. **Research Phase**: Each member independently analyzes the query
3. **Sequential Presentations**: Members present their perspectives in order (Ethicist → Analyst → Advocate → Skeptic → Historian → Futurist)
4. **Context Building**: Each member considers previous responses when forming their view
5. **Synthesis**: The Synthesizer integrates all perspectives into a final recommendation

### Technical Architecture
```
User Query
    ↓
Council Orchestrator
    ↓
Member 1 (Ethicist) → Response + Context
    ↓
Member 2 (Analyst) → Response + Context + Member 1's view
    ↓
Member 3-6 (Sequential deliberation with full context)
    ↓
Synthesizer → Final integrated recommendation
    ↓
Comprehensive Answer
```

## Configuration

### Model Selection
- Each council member can use a **different AI provider** (Groq, OpenRouter, Together AI, Poe)
- Each member can use a **different model**
- **Searchable model selector** allows quick filtering of 100+ available models
- Mix and match providers for optimal results (e.g., fast models for initial analysis, powerful models for synthesis)

### Provider Flexibility
Example configuration:
- Ethicist: Groq Llama 3.1 70B (fast ethical reasoning)
- Analyst: OpenRouter GPT-4 (deep analytical capability)
- Advocate: Together AI Mixtral (balanced perspective)
- Skeptic: Groq Gemma 2 (quick critical analysis)
- Historian: Together AI Llama 3 (broad knowledge)
- Futurist: OpenRouter Claude (long-term thinking)
- Synthesizer: Groq Llama 3.1 70B (comprehensive synthesis)

## Use Cases

### Best For:
- **Complex ethical dilemmas** requiring multiple perspectives
- **Strategic decisions** needing comprehensive analysis
- **Policy proposals** that impact various stakeholders
- **Technical designs** requiring risk assessment and long-term thinking
- **Research questions** benefiting from diverse analytical approaches
- **Controversial topics** needing balanced viewpoints

### Examples:
- "Should we implement AI-driven hiring systems?"
- "What are the implications of universal basic income?"
- "How should we regulate social media platforms?"
- "What's the best approach to climate change mitigation?"
- "Should we allow human genetic enhancement?"

## Data Storage

### IndexedDB Schema
Council sessions are stored locally in your browser:
- **councilSessions**: Session metadata, user query, member configuration, deliberation phase
- **councilResponses**: Individual member responses with timestamps and metadata

### Privacy
- All data stored client-side
- No backend server
- API keys remain in environment variables
- Deliberation content sent to respective AI providers during generation

## UI Features

### Configuration Panel
- Visual cards for each council member
- Per-member provider and model selection
- Searchable model dropdown with 100+ models
- Real-time configuration validation

### Deliberation View
- Live progress indicator showing which member is speaking
- Streaming responses in real-time
- Color-coded member cards
- Metadata display (provider, model, generation time)
- Special highlighting for final synthesis

### Controls
- Start/pause deliberation
- New deliberation button
- Session history (future enhancement)
- Export deliberation transcript (future enhancement)

## Access

### From Sidebar
Click the **"Council"** button in the chat sidebar

### From Settings
Open Settings (Ctrl/Cmd + K) → Click **"The Council"** card

## Performance

### Typical Deliberation Time
- 6 initial responses: ~30-60 seconds each (depends on model)
- Final synthesis: ~60-90 seconds
- **Total**: 4-8 minutes for complete deliberation

### Optimization Tips
- Use faster models (e.g., Groq Llama 3.1 8B) for quick deliberations
- Use powerful models (e.g., GPT-4, Claude) for complex topics
- Mix fast and powerful models strategically

## Future Enhancements

### Planned Features
- **Weighted voting**: Different importance for different members
- **Interactive deliberation**: User can inject questions mid-deliberation
- **Debate rounds**: Multiple rounds of discussion
- **Custom roles**: User-defined council members
- **Parallel processing**: Some members deliberate simultaneously
- **History view**: Review past council sessions
- **Export functionality**: Save deliberations as PDF/markdown

## Code Structure

### Core Files
- `src/lib/theCouncil.ts`: Core logic, orchestration, member definitions
- `src/components/CouncilMode.tsx`: UI component
- `src/components/SearchableModelSelector.tsx`: Model selection UI
- `src/lib/db.ts`: IndexedDB integration (councilSessions, councilResponses)

### Key Functions
- `createDefaultCouncil()`: Initialize council with configurations
- `CouncilOrchestrator`: Manages deliberation flow and context
- `buildMemberContext()`: Injects previous responses into prompts
- `buildSynthesisContext()`: Creates comprehensive summary prompt

## Philosophy

The Council embodies the principle that **complex questions deserve multi-faceted answers**. By structuring AI deliberation like a human advisory board, we:

1. **Reduce bias**: Multiple perspectives counter individual model biases
2. **Improve thoroughness**: Different lenses catch what others miss
3. **Build trust**: Transparent deliberation process shows reasoning
4. **Enable nuance**: Synthesis balances competing concerns
5. **Promote wisdom**: Historical and futurist views add temporal depth

## Comparison to Other Modes

| Feature | Chat | Agent Mode | Debate Mode | **Council** |
|---------|------|------------|-------------|-----------|
| Models | 1 | Multiple | 2 teams | 7 specialized |
| Structure | Linear | Parallel | Debate rounds | Sequential + Synthesis |
| Focus | Q&A | Comparison | Argumentation | **Deliberation** |
| Best For | Quick answers | Model testing | Exploring sides | **Complex decisions** |

---

**The Council: Where diverse AI minds deliberate for comprehensive wisdom.**
