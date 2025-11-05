# The Council - API Reference & Developer Guide

Quick reference untuk menggunakan dan mengembangkan Enhanced Council system.

---

## 🏗️ Core Interfaces

### CouncilMember

```typescript
interface CouncilMember {
  role: CouncilRole;
  name: string;
  description: string;
  systemPrompt: string;
  provider: Provider;
  modelId: string;
  modelName: string;
  expertise: string[];      // NEW: Domain expertise
  votingWeight: number;     // NEW: 0.8-1.3
  priority: number;         // NEW: 1-10
}
```

### CouncilResponse

```typescript
interface CouncilResponse {
  role: CouncilRole;
  memberName: string;
  content: string;
  timestamp: number;
  provider: Provider;
  modelName: string;
  
  // NEW: Structured data
  keyPoints: string[];
  concerns: string[];
  recommendations: string[];
  vote?: CouncilVote;
  
  metadata?: {
    tokensUsed?: number;
    generationTime?: number;
    confidence?: number;
  };
}
```

### CouncilVote

```typescript
interface CouncilVote {
  role: CouncilRole;
  memberName: string;
  vote: VoteOption;         // strongly_agree | agree | neutral | disagree | strongly_disagree
  confidence: number;       // 0-1
  reasoning: string;
  timestamp: number;
}
```

### ConflictResolution

```typescript
interface ConflictResolution {
  issue: string;
  strategy: ConflictResolutionStrategy;  // majority | weighted | consensus | moderator
  outcome: string;
  participatingMembers: CouncilRole[];
  timestamp: number;
}
```

### ConsensusResult

```typescript
interface ConsensusResult {
  achieved: boolean;        // true if agreementLevel >= 0.7
  agreementLevel: number;   // 0-1
  majorityVote?: VoteOption;
  dissenters: CouncilRole[];
  summary: string;
}
```

### CommunicationMessage

```typescript
interface CommunicationMessage {
  id: string;
  from: CouncilRole;
  to?: CouncilRole;         // undefined = broadcast
  type: "response" | "question" | "objection" | "support" | "vote";
  content: string;
  timestamp: number;
  priority: number;         // 1-10, higher processed first
}
```

---

## 🎯 CouncilOrchestrator API

### Constructor

```typescript
const orchestrator = new CouncilOrchestrator(
  sessionId: string,
  userQuery: string,
  members: CouncilMember[]
);
```

### Core Methods

#### Getters

```typescript
orchestrator.getDeliberation(): CouncilDeliberation
```
Returns complete deliberation state including responses, votes, conflicts, etc.

#### Response Management

```typescript
orchestrator.addResponse(response: CouncilResponse): void
```
Add a member's response to the deliberation.

```typescript
orchestrator.addVote(vote: CouncilVote): void
```
Record a vote from a member.

#### Phase Management

```typescript
orchestrator.setPhase(phase: CouncilDeliberation["phase"]): void
```
Phases: `"research"` | `"presentation"` | `"deliberation"` | `"voting"` | `"conflict_resolution"` | `"synthesis"` | `"completed"`

```typescript
orchestrator.setFinalSynthesis(synthesis: string): void
```
Set final synthesis and mark as completed.

#### Communication

```typescript
orchestrator.addMessage(
  from: CouncilRole,
  content: string,
  type: CommunicationMessage["type"],
  to?: CouncilRole,
  priority: number = 5
): void
```
Add message to priority queue.

```typescript
orchestrator.getNextMessage(): CommunicationMessage | undefined
```
Retrieve and remove highest priority message.

#### Context Building

```typescript
orchestrator.buildMemberContext(currentRole: CouncilRole): string
```
Build context string for a member including previous responses.

```typescript
orchestrator.buildSynthesisContext(): string
```
Build comprehensive context for synthesizer including all responses, votes, conflicts.

```typescript
orchestrator.buildVotingContext(proposalSummary: string): string
```
Build context for explicit voting round.

#### Consensus & Conflict

```typescript
orchestrator.calculateConsensus(): ConsensusResult
```
Calculate consensus from all votes using weighted algorithm.

```typescript
await orchestrator.resolveConflict(
  issue: string,
  conflictingMembers: CouncilRole[],
  strategy: ConflictResolutionStrategy = "weighted"
): Promise<ConflictResolution>
```
Resolve conflict using specified strategy.

#### Parsing

```typescript
orchestrator.parseStructuredResponse(content: string): {
  keyPoints: string[];
  concerns: string[];
  recommendations: string[];
}
```
Extract structured data from markdown response.

```typescript
orchestrator.parseVote(
  content: string,
  role: CouncilRole,
  memberName: string
): CouncilVote | undefined
```
Extract vote information from response.

---

## 🛠️ Utility Functions

### createDefaultCouncil

```typescript
import { createDefaultCouncil } from "@/lib/theCouncil";

const members = createDefaultCouncil([
  { role: "ethicist", provider: "groq", modelId: "llama-3.1-70b-versatile", modelName: "Llama 3.1 70B" },
  { role: "analyst", provider: "openrouter", modelId: "gpt-4", modelName: "GPT-4" },
  // ... 5 more members
]);
```

### validateCouncilConfig

```typescript
import { validateCouncilConfig } from "@/lib/theCouncil";

const validation = validateCouncilConfig(members);
if (!validation.valid) {
  console.error("Config errors:", validation.errors);
}
// Returns: { valid: boolean, errors: string[] }
```

### validateSynthesisQuality

```typescript
import { validateSynthesisQuality } from "@/lib/theCouncil";

const quality = validateSynthesisQuality(synthesisText, allResponses);
console.log(`Quality: ${quality.score}%`);
console.log(`Passed: ${quality.passed}`);  // true if >= 70
console.log(`Issues:`, quality.issues);
// Returns: { passed: boolean, issues: string[], score: number }
```

---

## 📊 Constants & Defaults

### COUNCIL_ROLES

```typescript
import { COUNCIL_ROLES } from "@/lib/theCouncil";

COUNCIL_ROLES.ethicist
// Returns:
{
  name: "The Ethicist",
  description: "Focuses on moral and ethical considerations",
  systemPrompt: "...",
  expertise: ["ethics", "morality", "social_justice", "human_rights", "fairness"],
  votingWeight: 1.3,
  priority: 9
}
```

### Voting Weights

```typescript
const weights = {
  ethicist: 1.3,      // Highest - ethics paramount
  analyst: 1.2,
  advocate: 1.2,
  skeptic: 1.1,
  historian: 1.0,
  futurist: 1.0,
  synthesizer: 0.8    // Lowest - moderator role
};
```

### Priority Levels

```typescript
const priorities = {
  synthesizer: 10,    // Moderator
  ethicist: 9,        // Foundational
  analyst: 8,
  advocate: 8,
  skeptic: 7,
  historian: 6,
  futurist: 6
};
```

---

## 🔄 Complete Deliberation Flow

### Step-by-Step Example

```typescript
import { CouncilOrchestrator, createDefaultCouncil } from "@/lib/theCouncil";
import { aiApi } from "@/lib/aiApi";

// 1. Create council members
const members = createDefaultCouncil([
  { role: "ethicist", provider: "groq", modelId: "llama-3.1-70b-versatile", modelName: "Llama 3.1 70B" },
  { role: "analyst", provider: "groq", modelId: "llama-3.1-70b-versatile", modelName: "Llama 3.1 70B" },
  // ... rest of members
]);

// 2. Initialize orchestrator
const orchestrator = new CouncilOrchestrator(
  "session-123",
  "Should we implement universal basic income?",
  members
);

// 3. Phase 1: Research & Presentation
orchestrator.setPhase("research");

for (const role of ["ethicist", "analyst", "advocate", "skeptic", "historian", "futurist"]) {
  const member = members.find(m => m.role === role);
  const context = orchestrator.buildMemberContext(role);
  
  // Generate response via AI
  let fullContent = "";
  await aiApi.sendMessage(
    {
      provider: member.provider,
      model: member.modelId,
      messages: [
        { role: "system", content: member.systemPrompt },
        { role: "user", content: context }
      ],
    },
    (chunk) => { fullContent += chunk; },
    async () => {
      // Parse structured response
      const { keyPoints, concerns, recommendations } = 
        orchestrator.parseStructuredResponse(fullContent);
      
      // Parse vote
      const vote = orchestrator.parseVote(fullContent, role, member.name);
      if (vote) orchestrator.addVote(vote);
      
      // Add response
      const response: CouncilResponse = {
        role,
        memberName: member.name,
        content: fullContent,
        timestamp: Date.now(),
        provider: member.provider,
        modelName: member.modelName,
        keyPoints,
        concerns,
        recommendations,
        vote
      };
      orchestrator.addResponse(response);
    },
    (error) => console.error(error)
  );
}

// 4. Calculate consensus
const consensus = orchestrator.calculateConsensus();
console.log(`Consensus: ${consensus.achieved} (${Math.round(consensus.agreementLevel * 100)}%)`);

// 5. Conflict resolution (if needed)
if (!consensus.achieved && consensus.dissenters.length > 2) {
  await orchestrator.resolveConflict(
    "Universal Basic Income Implementation",
    consensus.dissenters,
    "weighted"
  );
}

// 6. Synthesis phase
orchestrator.setPhase("synthesis");
const synthesisContext = orchestrator.buildSynthesisContext();

// Generate synthesis
const synthesizer = members.find(m => m.role === "synthesizer");
let synthesis = "";
await aiApi.sendMessage(
  {
    provider: synthesizer.provider,
    model: synthesizer.modelId,
    messages: [
      { role: "system", content: synthesizer.systemPrompt },
      { role: "user", content: synthesisContext }
    ],
  },
  (chunk) => { synthesis += chunk; },
  async () => {
    // Validate quality
    const quality = validateSynthesisQuality(synthesis, orchestrator.getDeliberation().responses);
    console.log(`Synthesis quality: ${quality.score}%`);
    
    if (!quality.passed) {
      console.warn("Quality issues:", quality.issues);
    }
    
    orchestrator.setFinalSynthesis(synthesis);
  },
  (error) => console.error(error)
);

// 7. Complete
console.log("Deliberation completed!");
console.log(orchestrator.getDeliberation());
```

---

## 🎨 UI Component Integration

### CouncilMode Component

```typescript
import { CouncilMode } from "@/components/CouncilMode";

<CouncilMode sessionId="session-123" />
```

### Key State Variables

```typescript
const [members, setMembers] = useState<CouncilMember[]>([]);
const [orchestrator, setOrchestrator] = useState<CouncilOrchestrator | null>(null);
const [responses, setResponses] = useState<CouncilResponse[]>([]);
const [isDeliberating, setIsDeliberating] = useState(false);
const [currentSpeaker, setCurrentSpeaker] = useState<CouncilRole | null>(null);
```

### Update Member Config

```typescript
const updateMember = (role: CouncilRole, updates: Partial<CouncilMember>) => {
  setMembers(prev => prev.map(m => m.role === role ? { ...m, ...updates } : m));
};

// Usage
updateMember("ethicist", { provider: "openrouter", modelId: "gpt-4" });
```

---

## 🧪 Testing

### Unit Test Example

```typescript
import { describe, it, expect } from "vitest";
import { CouncilOrchestrator, createDefaultCouncil, validateSynthesisQuality } from "@/lib/theCouncil";

describe("CouncilOrchestrator", () => {
  it("should calculate consensus correctly", () => {
    const members = createDefaultCouncil([...]);
    const orchestrator = new CouncilOrchestrator("test", "query", members);
    
    // Add votes
    orchestrator.addVote({
      role: "ethicist",
      memberName: "The Ethicist",
      vote: "agree",
      confidence: 0.9,
      reasoning: "Test",
      timestamp: Date.now()
    });
    
    const consensus = orchestrator.calculateConsensus();
    expect(consensus.agreementLevel).toBeGreaterThan(0.5);
  });
  
  it("should validate synthesis quality", () => {
    const synthesis = "**Key Points:**\n- Point 1\n- Point 2\n\n**Balanced view:** However, we must consider...";
    const responses = []; // Mock responses
    
    const quality = validateSynthesisQuality(synthesis, responses);
    expect(quality.score).toBeGreaterThan(0);
  });
});
```

---

## 🐛 Debugging Tips

### Enable Debug Logging

```bash
# .env
VITE_DEBUG_MODE=true
```

### Key Debug Points

```typescript
import { debugLog, debugWarn, debugError } from "@/lib/debug";

// Track response addition
debugLog(`Council response added from ${response.role}:`, response.memberName);

// Track voting
debugLog(`Vote recorded from ${vote.role}:`, vote.vote, `(confidence: ${vote.confidence})`);

// Track consensus
const consensus = orchestrator.calculateConsensus();
debugLog("Consensus result:", consensus);

// Track quality issues
const quality = validateSynthesisQuality(synthesis, responses);
if (!quality.passed) {
  debugWarn("Synthesis quality issues:", quality.issues);
}
```

### Common Issues

**Issue: Parsing fails**
```typescript
// Check if structured format is used
const { keyPoints, concerns, recommendations } = orchestrator.parseStructuredResponse(content);
if (keyPoints.length === 0) {
  debugWarn("No key points found - check format");
}
```

**Issue: Low consensus**
```typescript
// Check dissenter reasoning
const consensus = orchestrator.calculateConsensus();
if (!consensus.achieved) {
  debugLog("Dissenters:", consensus.dissenters);
  orchestrator.getDeliberation().votes
    .filter(v => consensus.dissenters.includes(v.role))
    .forEach(v => debugLog(`${v.role}: ${v.reasoning}`));
}
```

---

## 📚 Best Practices

### 1. Always Validate Config

```typescript
const validation = validateCouncilConfig(members);
if (!validation.valid) {
  alert(`Configuration error:\n${validation.errors.join("\n")}`);
  return;
}
```

### 2. Handle Streaming Gracefully

```typescript
let fullContent = "";
await aiApi.sendMessage(
  config,
  (chunk) => {
    fullContent += chunk;
    // Update UI progressively
    setStreamingContent(prev => ({ ...prev, [role]: fullContent }));
  },
  async () => {
    // Parse only after complete
    const parsed = orchestrator.parseStructuredResponse(fullContent);
    // ...
  },
  (error) => {
    // Always handle errors
    debugError("Generation failed:", error);
  }
);
```

### 3. Check Consensus Before Synthesis

```typescript
const consensus = orchestrator.calculateConsensus();
debugLog(`Consensus: ${Math.round(consensus.agreementLevel * 100)}%`);

if (!consensus.achieved) {
  // Optionally resolve conflicts first
  await orchestrator.resolveConflict("Issue", consensus.dissenters, "weighted");
}

// Then synthesize
orchestrator.setPhase("synthesis");
```

### 4. Validate Synthesis Quality

```typescript
const quality = validateSynthesisQuality(synthesis, responses);

if (quality.score < 80) {
  debugWarn(`Synthesis quality only ${quality.score}%`);
  // Optionally regenerate or show warning to user
}
```

### 5. Use Priority Queue for Messages

```typescript
// High priority objection
orchestrator.addMessage("skeptic", "Critical flaw identified", "objection", undefined, 9);

// Normal priority response
orchestrator.addMessage("analyst", "Data shows...", "response", undefined, 5);

// Messages auto-sorted, high priority processed first
const nextMsg = orchestrator.getNextMessage(); // Returns skeptic's objection
```

---

## 🔗 Integration with Other Systems

### Database (IndexedDB)

```typescript
import { saveCouncilSession, saveCouncilResponse } from "@/lib/db";

// Save session
await saveCouncilSession({
  id: orchestrator.getDeliberation().id,
  sessionId,
  userQuery,
  timestamp: Date.now(),
  members: members.map(m => ({
    role: m.role,
    name: m.name,
    provider: m.provider,
    modelId: m.modelId,
    modelName: m.modelName
  })),
  phase: "research"
});

// Save response
await saveCouncilResponse({
  id: `${deliberationId}-${role}`,
  councilSessionId: deliberationId,
  role,
  memberName,
  content,
  timestamp,
  provider,
  modelName,
  metadata
});
```

### AI API Integration

```typescript
import { aiApi, UnifiedMessage } from "@/lib/aiApi";

const messages: UnifiedMessage[] = [
  { role: "system", content: member.systemPrompt },
  { role: "user", content: context }
];

await aiApi.sendMessage(
  {
    provider: member.provider,
    model: member.modelId,
    messages,
    temperature: 0.7,
    max_tokens: 1000
  },
  onChunk,
  onComplete,
  onError
);
```

---

## 📖 Further Reading

- `COUNCIL_ENHANCED.md`: Complete feature documentation
- `THE_COUNCIL.md`: Original concept and philosophy
- `COUNCIL_IMPROVEMENTS.md`: Version history
- `/src/lib/theCouncil.ts`: Source code with inline comments
- `/src/components/CouncilMode.tsx`: UI implementation

---

*The Council API Reference - Build Powerful AI Deliberation Systems* 🎯
