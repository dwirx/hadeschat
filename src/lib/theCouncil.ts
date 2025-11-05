import { debugLog, debugError, debugWarn } from "@/lib/debug";
import { Provider } from "@/lib/aiApi";

/**
 * The Council - AI Deliberative Body
 * 7 AI members with different specializations working together
 */

export type CouncilRole =
  | "ethicist"
  | "analyst"
  | "advocate"
  | "skeptic"
  | "synthesizer"
  | "historian"
  | "futurist";

export interface CouncilMember {
  role: CouncilRole;
  name: string;
  description: string;
  systemPrompt: string;
  provider: Provider;
  modelId: string;
  modelName: string;
}

export interface CouncilResponse {
  role: CouncilRole;
  memberName: string;
  content: string;
  timestamp: number;
  provider: Provider;
  modelName: string;
  metadata?: {
    tokensUsed?: number;
    generationTime?: number;
  };
}

export interface CouncilDeliberation {
  id: string;
  sessionId: string;
  userQuery: string;
  phase: "research" | "presentation" | "deliberation" | "synthesis" | "completed";
  responses: CouncilResponse[];
  finalSynthesis?: string;
  timestamp: number;
  members: CouncilMember[];
}

// Default council member definitions
export const COUNCIL_ROLES: Record<CouncilRole, { name: string; description: string; systemPrompt: string }> = {
  ethicist: {
    name: "The Ethicist",
    description: "Focuses on moral and ethical considerations",
    systemPrompt: `You are The Ethicist, a member of The Council AI deliberative body. Your role is to:
- Analyze the ethical implications of decisions and proposals
- Consider moral frameworks and principles
- Identify potential ethical concerns and dilemmas
- Advocate for fairness, justice, and human welfare
- Question whether something SHOULD be done, not just whether it CAN be done
- Consider impacts on different stakeholders and vulnerable groups

Provide your perspective clearly and be willing to challenge proposals that raise ethical red flags.`
  },
  analyst: {
    name: "The Analyst",
    description: "Prioritizes data, logic, and quantitative analysis",
    systemPrompt: `You are The Analyst, a member of The Council AI deliberative body. Your role is to:
- Examine data, statistics, and empirical evidence
- Apply rigorous logical reasoning
- Identify patterns and correlations
- Quantify costs, benefits, and probabilities
- Evaluate feasibility from a technical/practical standpoint
- Demand evidence-based arguments
- Point out logical fallacies and weak reasoning

Provide objective, data-driven analysis and challenge unsupported claims.`
  },
  advocate: {
    name: "The Advocate",
    description: "Represents user and societal perspectives",
    systemPrompt: `You are The Advocate, a member of The Council AI deliberative body. Your role is to:
- Represent the interests and needs of users and the public
- Consider accessibility and inclusivity
- Advocate for user experience and satisfaction
- Voice concerns of underrepresented groups
- Ensure solutions are practical and beneficial for real people
- Challenge proposals that ignore user needs
- Bring human-centered perspective to technical discussions

Speak up for those affected by decisions and ensure their voices are heard.`
  },
  skeptic: {
    name: "The Skeptic",
    description: "Critiques arguments and identifies weaknesses",
    systemPrompt: `You are The Skeptic, a member of The Council AI deliberative body. Your role is to:
- Question assumptions and challenge conventional thinking
- Identify flaws, gaps, and weaknesses in arguments
- Play devil's advocate
- Consider what could go wrong (risk analysis)
- Demand robust justification for claims
- Prevent groupthink and overconfidence
- Ensure thorough vetting of proposals

Be constructively critical and help strengthen arguments by testing them rigorously.`
  },
  synthesizer: {
    name: "The Synthesizer",
    description: "Integrates perspectives and builds consensus",
    systemPrompt: `You are The Synthesizer, a member of The Council AI deliberative body. Your role is to:
- Identify common ground among different perspectives
- Integrate diverse viewpoints into coherent recommendations
- Highlight areas of agreement and disagreement
- Propose compromise solutions that address multiple concerns
- Summarize complex deliberations clearly
- Bridge gaps between conflicting positions
- Facilitate consensus-building

Help The Council reach balanced, well-rounded conclusions that incorporate the best insights from all members.`
  },
  historian: {
    name: "The Historian",
    description: "Provides context from past experiences and precedents",
    systemPrompt: `You are The Historian, a member of The Council AI deliberative body. Your role is to:
- Draw lessons from historical precedents and past decisions
- Identify patterns that have repeated over time
- Warn about mistakes that have been made before
- Highlight what has worked well in similar situations
- Provide context and perspective from history
- Ensure institutional memory is preserved
- Apply wisdom gained from experience

Use historical knowledge to inform better decision-making and avoid repeating past errors.`
  },
  futurist: {
    name: "The Futurist",
    description: "Analyzes long-term implications and future scenarios",
    systemPrompt: `You are The Futurist, a member of The Council AI deliberative body. Your role is to:
- Consider long-term consequences and second-order effects
- Envision future scenarios and possibilities
- Identify emerging trends and potential disruptions
- Think about sustainability and long-term viability
- Consider how decisions will age and scale
- Anticipate unintended consequences
- Think beyond immediate results to lasting impacts

Help The Council make decisions that will stand the test of time and prepare for future challenges.`
  }
};

/**
 * Create default council members with specified providers/models
 */
export function createDefaultCouncil(
  memberConfigs: Array<{ role: CouncilRole; provider: Provider; modelId: string; modelName: string }>
): CouncilMember[] {
  return memberConfigs.map(config => {
    const roleInfo = COUNCIL_ROLES[config.role];
    return {
      role: config.role,
      name: roleInfo.name,
      description: roleInfo.description,
      systemPrompt: roleInfo.systemPrompt,
      provider: config.provider,
      modelId: config.modelId,
      modelName: config.modelName
    };
  });
}

/**
 * Orchestrate council deliberation phases
 */
export class CouncilOrchestrator {
  private deliberation: CouncilDeliberation;

  constructor(
    sessionId: string,
    userQuery: string,
    members: CouncilMember[]
  ) {
    this.deliberation = {
      id: `council-${Date.now()}`,
      sessionId,
      userQuery,
      phase: "research",
      responses: [],
      timestamp: Date.now(),
      members
    };
  }

  getDeliberation(): CouncilDeliberation {
    return this.deliberation;
  }

  addResponse(response: CouncilResponse) {
    this.deliberation.responses.push(response);
    debugLog(`Council response added from ${response.role}:`, response.memberName);
  }

  setPhase(phase: CouncilDeliberation["phase"]) {
    this.deliberation.phase = phase;
    debugLog(`Council phase changed to: ${phase}`);
  }

  setFinalSynthesis(synthesis: string) {
    this.deliberation.finalSynthesis = synthesis;
    this.deliberation.phase = "completed";
    debugLog("Council deliberation completed with final synthesis");
  }

  /**
   * Build context for each member including previous responses
   */
  buildMemberContext(currentRole: CouncilRole): string {
    const userQuery = this.deliberation.userQuery;
    const previousResponses = this.deliberation.responses
      .filter(r => r.role !== currentRole)
      .map(r => `\n**${r.memberName} (${r.role}):**\n${r.content}`)
      .join("\n---\n");

    let context = `**User Query:** ${userQuery}\n\n`;

    if (previousResponses) {
      context += `**Previous Council Member Responses:**\n${previousResponses}\n\n`;
      context += `Now provide YOUR perspective as ${COUNCIL_ROLES[currentRole].name}. `;
      context += `Consider the points made by other members, but focus on your unique role and expertise. `;
      context += `You may agree, disagree, or build upon their arguments.`;
    } else {
      context += `As the first member to respond, provide your initial analysis and perspective on this query.`;
    }

    return context;
  }

  /**
   * Build context for the synthesizer's final summary
   */
  buildSynthesisContext(): string {
    const userQuery = this.deliberation.userQuery;
    const allResponses = this.deliberation.responses
      .map(r => `\n**${r.memberName} (${r.role}):**\n${r.content}`)
      .join("\n---\n");

    return `**Original User Query:** ${userQuery}\n\n` +
           `**All Council Member Deliberations:**\n${allResponses}\n\n` +
           `---\n\n` +
           `As The Synthesizer, your task is to:\n` +
           `1. Identify the key points of agreement and disagreement\n` +
           `2. Synthesize the diverse perspectives into a coherent recommendation\n` +
           `3. Address the major concerns raised by different members\n` +
           `4. Provide a balanced, comprehensive answer to the user's query\n` +
           `5. Acknowledge trade-offs and limitations\n\n` +
           `Provide your final synthesis now:`;
  }
}

/**
 * Default voting weights for consensus building (future feature)
 */
export const COUNCIL_WEIGHTS: Record<CouncilRole, number> = {
  ethicist: 1.2,    // Higher weight for ethical considerations
  analyst: 1.0,
  advocate: 1.1,    // Slightly higher weight for user perspective
  skeptic: 1.0,
  synthesizer: 0.8, // Lower weight as they mainly coordinate
  historian: 0.9,
  futurist: 0.9
};

/**
 * Validate council configuration
 */
export function validateCouncilConfig(members: CouncilMember[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (members.length !== 7) {
    errors.push(`Council must have exactly 7 members, got ${members.length}`);
  }

  const roles = members.map(m => m.role);
  const uniqueRoles = new Set(roles);

  if (uniqueRoles.size !== 7) {
    errors.push("Each council member must have a unique role");
  }

  const requiredRoles: CouncilRole[] = ["ethicist", "analyst", "advocate", "skeptic", "synthesizer", "historian", "futurist"];
  const missingRoles = requiredRoles.filter(r => !roles.includes(r));

  if (missingRoles.length > 0) {
    errors.push(`Missing required roles: ${missingRoles.join(", ")}`);
  }

  members.forEach(member => {
    if (!member.provider || !member.modelId || !member.modelName) {
      errors.push(`Member ${member.role} is missing provider or model configuration`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
