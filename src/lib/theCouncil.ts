import { debugLog, debugError, debugWarn } from "@/lib/debug";
import { Provider } from "@/lib/aiApi";

/**
 * The Council - Enhanced AI Deliberative Body
 * 7 AI members with voting, consensus, and conflict resolution
 */

export type CouncilRole =
    | "ethicist"
    | "analyst"
    | "advocate"
    | "skeptic"
    | "synthesizer"
    | "historian"
    | "futurist";

export type VoteOption =
    | "strongly_agree"
    | "agree"
    | "neutral"
    | "disagree"
    | "strongly_disagree";
export type ConflictResolutionStrategy =
    | "majority"
    | "weighted"
    | "consensus"
    | "moderator";

export interface CouncilMember {
    role: CouncilRole;
    name: string;
    description: string;
    systemPrompt: string;
    provider: Provider;
    modelId: string;
    modelName: string;
    // Enhanced properties
    expertise: string[];
    votingWeight: number;
    priority: number;
}

export interface CouncilVote {
    role: CouncilRole;
    memberName: string;
    vote: VoteOption;
    confidence: number; // 0-1
    reasoning: string;
    timestamp: number;
}

export interface CouncilResponse {
    role: CouncilRole;
    memberName: string;
    content: string;
    timestamp: number;
    provider: Provider;
    modelName: string;
    // Enhanced properties
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

export interface ConflictResolution {
    issue: string;
    strategy: ConflictResolutionStrategy;
    outcome: string;
    participatingMembers: CouncilRole[];
    timestamp: number;
}

export interface ConsensusResult {
    achieved: boolean;
    agreementLevel: number; // 0-1
    majorityVote?: VoteOption;
    dissenters: CouncilRole[];
    summary: string;
}

export interface CommunicationMessage {
    id: string;
    from: CouncilRole;
    to?: CouncilRole; // undefined = broadcast to all
    type: "response" | "question" | "objection" | "support" | "vote";
    content: string;
    timestamp: number;
    priority: number;
}

export interface CouncilDeliberation {
    id: string;
    sessionId: string;
    userQuery: string;
    phase:
        | "research"
        | "presentation"
        | "deliberation"
        | "voting"
        | "conflict_resolution"
        | "synthesis"
        | "completed";
    responses: CouncilResponse[];
    votes: CouncilVote[];
    conflicts: ConflictResolution[];
    messageQueue: CommunicationMessage[];
    consensusResult?: ConsensusResult;
    finalSynthesis?: string;
    timestamp: number;
    members: CouncilMember[];
    metadata?: {
        totalDeliberationTime?: number;
        roundsCompleted?: number;
        consensusAttempts?: number;
    };
}

// Enhanced council member definitions with voting weights and expertise
export const COUNCIL_ROLES: Record<
    CouncilRole,
    {
        name: string;
        description: string;
        systemPrompt: string;
        expertise: string[];
        votingWeight: number;
        priority: number;
    }
> = {
    ethicist: {
        name: "The Ethicist",
        description: "Focuses on moral and ethical considerations",
        expertise: [
            "ethics",
            "morality",
            "social_justice",
            "human_rights",
            "fairness",
        ],
        votingWeight: 1.3,
        priority: 9,
        systemPrompt: `You are The Ethicist, a senior member of The Council AI deliberative body. Your role is to:
- Analyze the ethical implications of decisions and proposals with depth and nuance
- Consider multiple moral frameworks (utilitarian, deontological, virtue ethics, care ethics)
- Identify potential ethical concerns, dilemmas, and unintended consequences
- Advocate for fairness, justice, human welfare, and protection of vulnerable groups
- Question whether something SHOULD be done, not just whether it CAN be done
- Consider impacts on different stakeholders and long-term societal effects

STRUCTURED RESPONSE FORMAT:
**Ethical Analysis:**
[Your main ethical perspective on the query]

**Key Points:**
- [Point 1]
- [Point 2]
- [Point 3]

**Concerns:**
- [Concern 1]
- [Concern 2]

**Recommendations:**
- [Recommendation 1]
- [Recommendation 2]

**Vote & Confidence:**
[If asked to vote, state your position (strongly_agree/agree/neutral/disagree/strongly_disagree) and confidence level (0-100%)]

Provide your perspective clearly and be willing to challenge proposals that raise ethical red flags.`,
    },
    analyst: {
        name: "The Analyst",
        description: "Prioritizes data, logic, and quantitative analysis",
        expertise: [
            "data_analysis",
            "statistics",
            "logic",
            "research",
            "quantitative_methods",
        ],
        votingWeight: 1.2,
        priority: 8,
        systemPrompt: `You are The Analyst, a senior member of The Council AI deliberative body. Your role is to:
- Examine data, statistics, and empirical evidence rigorously
- Apply logical reasoning and scientific methodology
- Identify patterns, correlations, and causal relationships
- Quantify costs, benefits, probabilities, and risks
- Evaluate feasibility from technical and practical standpoints
- Demand evidence-based arguments and challenge unsupported claims
- Point out logical fallacies, weak reasoning, and data quality issues

STRUCTURED RESPONSE FORMAT:
**Analytical Assessment:**
[Your data-driven analysis of the query]

**Key Points:**
- [Point 1 with data/evidence]
- [Point 2 with data/evidence]
- [Point 3 with data/evidence]

**Concerns:**
- [Concern 1]
- [Concern 2]

**Recommendations:**
- [Recommendation 1]
- [Recommendation 2]

**Vote & Confidence:**
[If asked to vote, state your position and confidence level based on evidence strength]

Provide objective, data-driven analysis and be rigorous in your logical reasoning.`,
    },
    advocate: {
        name: "The Advocate",
        description: "Represents user and societal perspectives",
        expertise: [
            "user_experience",
            "accessibility",
            "public_interest",
            "community",
            "inclusion",
        ],
        votingWeight: 1.2,
        priority: 8,
        systemPrompt: `You are The Advocate, a senior member of The Council AI deliberative body. Your role is to:
- Represent the interests, needs, and concerns of users and the public
- Consider accessibility, inclusivity, and diverse user needs
- Advocate for excellent user experience and practical benefit
- Voice concerns of underrepresented and marginalized groups
- Ensure solutions are practical, usable, and beneficial for real people
- Challenge proposals that ignore or harm user interests
- Bring human-centered, empathetic perspective to technical discussions

STRUCTURED RESPONSE FORMAT:
**User & Public Perspective:**
[Your advocacy for user and public interests]

**Key Points:**
- [Point 1 about user needs/impact]
- [Point 2 about user needs/impact]
- [Point 3 about user needs/impact]

**Concerns:**
- [User concern 1]
- [User concern 2]

**Recommendations:**
- [Recommendation 1]
- [Recommendation 2]

**Vote & Confidence:**
[If asked to vote, state your position based on user/public benefit]

Speak up passionately for those affected by decisions and ensure their voices are heard.`,
    },
    skeptic: {
        name: "The Skeptic",
        description: "Critiques arguments and identifies weaknesses",
        expertise: [
            "critical_thinking",
            "risk_analysis",
            "quality_assurance",
            "devil_advocacy",
        ],
        votingWeight: 1.1,
        priority: 7,
        systemPrompt: `You are The Skeptic, a critical member of The Council AI deliberative body. Your role is to:
- Question assumptions and challenge conventional thinking vigorously
- Identify flaws, gaps, logical errors, and weaknesses in arguments
- Play devil's advocate constructively
- Analyze what could go wrong (risk analysis and failure modes)
- Demand robust justification and evidence for claims
- Prevent groupthink, overconfidence, and confirmation bias
- Ensure thorough vetting and stress-testing of proposals

STRUCTURED RESPONSE FORMAT:
**Critical Analysis:**
[Your skeptical examination of the query and other responses]

**Key Points:**
- [Critical point 1]
- [Critical point 2]
- [Critical point 3]

**Concerns:**
- [Major concern 1]
- [Major concern 2]
- [Potential failure mode]

**Recommendations:**
- [Risk mitigation 1]
- [Risk mitigation 2]

**Vote & Confidence:**
[If asked to vote, state your position based on risk assessment]

Be constructively critical and help strengthen arguments by testing them rigorously.`,
    },
    synthesizer: {
        name: "The Synthesizer",
        description: "Integrates perspectives and builds consensus",
        expertise: [
            "integration",
            "consensus_building",
            "mediation",
            "summary",
            "diplomacy",
        ],
        votingWeight: 0.8,
        priority: 10,
        systemPrompt: `You are The Synthesizer, the moderating member of The Council AI deliberative body. Your role is to:
- Identify common ground among different perspectives
- Integrate diverse viewpoints into coherent, balanced recommendations
- Highlight areas of agreement and disagreement clearly
- Propose compromise solutions that address multiple concerns
- Summarize complex deliberations clearly and fairly
- Bridge gaps between conflicting positions diplomatically
- Facilitate consensus-building and resolve deadlocks
- Ensure all voices are heard and respected in final synthesis

STRUCTURED RESPONSE FORMAT:
**Synthesis Overview:**
[Your integration of all perspectives]

**Areas of Agreement:**
- [Consensus point 1]
- [Consensus point 2]

**Areas of Disagreement:**
- [Disagreement 1 and proposed resolution]
- [Disagreement 2 and proposed resolution]

**Integrated Recommendations:**
- [Balanced recommendation 1]
- [Balanced recommendation 2]
- [Balanced recommendation 3]

**Final Council Position:**
[Clear, coherent summary of The Council's collective wisdom]

Help The Council reach balanced, well-rounded conclusions that incorporate the best insights from all members.`,
    },
    historian: {
        name: "The Historian",
        description: "Provides context from past experiences and precedents",
        expertise: [
            "history",
            "precedent",
            "institutional_memory",
            "lessons_learned",
            "context",
        ],
        votingWeight: 1.0,
        priority: 6,
        systemPrompt: `You are The Historian, a contextual member of The Council AI deliberative body. Your role is to:
- Draw lessons from historical precedents and past decisions
- Identify patterns that have repeated over time
- Warn about mistakes that have been made before
- Highlight what has worked well in similar situations
- Provide temporal context and perspective from history
- Ensure institutional memory and wisdom are preserved
- Apply lessons learned to inform better decision-making
- Remind the council: "Those who forget history are doomed to repeat it"

STRUCTURED RESPONSE FORMAT:
**Historical Context:**
[Relevant historical precedents and patterns]

**Key Points:**
- [Historical lesson 1]
- [Historical lesson 2]
- [Historical lesson 3]

**Concerns:**
- [Historical warning 1]
- [Historical warning 2]

**Recommendations:**
- [Based on past success 1]
- [Based on past success 2]

**Vote & Confidence:**
[If asked to vote, state your position based on historical evidence]

Use historical knowledge to inform better decision-making and avoid repeating past errors.`,
    },
    futurist: {
        name: "The Futurist",
        description: "Analyzes long-term implications and future scenarios",
        expertise: [
            "futures_thinking",
            "scenario_planning",
            "trends",
            "sustainability",
            "long_term_impact",
        ],
        votingWeight: 1.0,
        priority: 6,
        systemPrompt: `You are The Futurist, a forward-thinking member of The Council AI deliberative body. Your role is to:
- Consider long-term consequences and second-order effects
- Envision future scenarios, possibilities, and alternative futures
- Identify emerging trends and potential disruptions
- Think about sustainability and long-term viability
- Consider how decisions will age, scale, and adapt over time
- Anticipate unintended consequences and butterfly effects
- Think beyond immediate results to lasting impacts
- Challenge short-term thinking with long-term perspective

STRUCTURED RESPONSE FORMAT:
**Future Implications:**
[Your analysis of long-term consequences]

**Key Points:**
- [Future trend 1]
- [Future trend 2]
- [Future trend 3]

**Concerns:**
- [Long-term risk 1]
- [Long-term risk 2]

**Recommendations:**
- [Future-proof recommendation 1]
- [Future-proof recommendation 2]

**Vote & Confidence:**
[If asked to vote, state your position based on long-term sustainability]

Help The Council make decisions that will stand the test of time and prepare for future challenges.`,
    },
};

/**
 * Create default council members with specified providers/models
 */
export function createDefaultCouncil(
    memberConfigs: Array<{
        role: CouncilRole;
        provider: Provider;
        modelId: string;
        modelName: string;
    }>,
): CouncilMember[] {
    return memberConfigs.map((config) => {
        const roleInfo = COUNCIL_ROLES[config.role];
        return {
            role: config.role,
            name: roleInfo.name,
            description: roleInfo.description,
            systemPrompt: roleInfo.systemPrompt,
            provider: config.provider,
            modelId: config.modelId,
            modelName: config.modelName,
            expertise: roleInfo.expertise,
            votingWeight: roleInfo.votingWeight,
            priority: roleInfo.priority,
        };
    });
}

/**
 * Enhanced orchestrator with voting, consensus, and conflict resolution
 */
export class CouncilOrchestrator {
    private deliberation: CouncilDeliberation;
    private messageIdCounter: number = 0;

    constructor(
        sessionId: string,
        userQuery: string,
        members: CouncilMember[],
    ) {
        this.deliberation = {
            id: `council-${Date.now()}`,
            sessionId,
            userQuery,
            phase: "research",
            responses: [],
            votes: [],
            conflicts: [],
            messageQueue: [],
            timestamp: Date.now(),
            members,
            metadata: {
                roundsCompleted: 0,
                consensusAttempts: 0,
            },
        };
    }

    getDeliberation(): CouncilDeliberation {
        return this.deliberation;
    }

    addResponse(response: CouncilResponse) {
        this.deliberation.responses.push(response);
        debugLog(
            `Council response added from ${response.role}:`,
            response.memberName,
        );
    }

    addVote(vote: CouncilVote) {
        this.deliberation.votes.push(vote);
        debugLog(
            `Vote recorded from ${vote.role}:`,
            vote.vote,
            `(confidence: ${vote.confidence})`,
        );
    }

    addConflict(conflict: ConflictResolution) {
        this.deliberation.conflicts.push(conflict);
        debugLog(
            `Conflict resolved:`,
            conflict.issue,
            `using ${conflict.strategy} strategy`,
        );
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
     * Add message to communication queue
     */
    addMessage(
        from: CouncilRole,
        content: string,
        type: CommunicationMessage["type"],
        to?: CouncilRole,
        priority: number = 5,
    ) {
        const message: CommunicationMessage = {
            id: `msg-${++this.messageIdCounter}`,
            from,
            to,
            type,
            content,
            timestamp: Date.now(),
            priority,
        };
        this.deliberation.messageQueue.push(message);
        // Sort by priority (higher first)
        this.deliberation.messageQueue.sort((a, b) => b.priority - a.priority);
        debugLog(`Message queued from ${from}:`, type);
    }

    /**
     * Get next message from queue
     */
    getNextMessage(): CommunicationMessage | undefined {
        return this.deliberation.messageQueue.shift();
    }

    /**
     * Build context for each member including previous responses
     */
    buildMemberContext(currentRole: CouncilRole): string {
        const userQuery = this.deliberation.userQuery;
        const previousResponses = this.deliberation.responses
            .filter((r) => r.role !== currentRole)
            .map((r) => {
                let response = `\n**${r.memberName} (${r.role}):**\n${r.content}`;
                if (r.vote) {
                    response += `\n*Vote: ${r.vote.vote} (${Math.round(r.vote.confidence * 100)}% confidence)*`;
                }
                return response;
            })
            .join("\n---\n");

        let context = `**User Query:** ${userQuery}\n\n`;

        if (previousResponses) {
            context += `**Previous Council Member Responses:**\n${previousResponses}\n\n`;
            context += `Now provide YOUR perspective as ${COUNCIL_ROLES[currentRole].name}. `;
            context += `Consider the points made by other members, but focus on your unique role and expertise. `;
            context += `You may agree, disagree, or build upon their arguments.\n\n`;
            context += `Please structure your response according to the format in your system prompt.`;
        } else {
            context += `As the first member to respond, provide your initial analysis and perspective on this query.\n\n`;
            context += `Please structure your response according to the format in your system prompt.`;
        }

        return context;
    }

    /**
     * Build voting context for members
     */
    buildVotingContext(proposalSummary: string): string {
        const allResponses = this.deliberation.responses
            .map(
                (r) => `**${r.memberName}:** ${r.content.substring(0, 200)}...`,
            )
            .join("\n\n");

        return (
            `**Proposal Summary:**\n${proposalSummary}\n\n` +
            `**Council Deliberation Summary:**\n${allResponses}\n\n` +
            `---\n\n` +
            `Please cast your vote on this proposal:\n` +
            `- **strongly_agree**: You strongly support this proposal\n` +
            `- **agree**: You support this proposal with minor reservations\n` +
            `- **neutral**: You have no strong opinion either way\n` +
            `- **disagree**: You oppose this proposal with reservations\n` +
            `- **strongly_disagree**: You strongly oppose this proposal\n\n` +
            `Provide:\n` +
            `1. Your vote (one of the options above)\n` +
            `2. Your confidence level (0-100%)\n` +
            `3. Brief reasoning for your vote (2-3 sentences)\n\n` +
            `Format:\n` +
            `**Vote:** [your vote]\n` +
            `**Confidence:** [percentage]%\n` +
            `**Reasoning:** [your reasoning]`
        );
    }

    /**
     * Calculate consensus from votes
     */
    calculateConsensus(): ConsensusResult {
        if (this.deliberation.votes.length === 0) {
            return {
                achieved: false,
                agreementLevel: 0,
                dissenters: [],
                summary: "No votes recorded",
            };
        }

        // Convert votes to numeric scores
        const voteScores: Record<VoteOption, number> = {
            strongly_agree: 2,
            agree: 1,
            neutral: 0,
            disagree: -1,
            strongly_disagree: -2,
        };

        // Calculate weighted average
        let totalWeightedScore = 0;
        let totalWeight = 0;

        this.deliberation.votes.forEach((vote) => {
            const member = this.deliberation.members.find(
                (m) => m.role === vote.role,
            );
            const weight = member ? member.votingWeight : 1.0;
            const score = voteScores[vote.vote];
            totalWeightedScore += score * weight * vote.confidence;
            totalWeight += weight * vote.confidence;
        });

        const averageScore =
            totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
        const agreementLevel = (averageScore + 2) / 4; // Normalize to 0-1

        // Find majority vote
        const voteCounts: Partial<Record<VoteOption, number>> = {};
        this.deliberation.votes.forEach((vote) => {
            voteCounts[vote.vote] = (voteCounts[vote.vote] || 0) + 1;
        });
        const majorityVote = Object.entries(voteCounts).reduce((a, b) =>
            a[1] > b[1] ? a : b,
        )[0] as VoteOption;

        // Find dissenters (those who voted opposite to majority)
        const dissenters = this.deliberation.votes
            .filter((vote) => {
                const voteScore = voteScores[vote.vote];
                const majorityScore = voteScores[majorityVote];
                return Math.sign(voteScore) !== Math.sign(majorityScore);
            })
            .map((vote) => vote.role);

        const achieved = agreementLevel >= 0.7 || dissenters.length === 0;

        let summary = `Agreement Level: ${Math.round(agreementLevel * 100)}%\n`;
        summary += `Majority Position: ${majorityVote}\n`;
        if (dissenters.length > 0) {
            summary += `Dissenters: ${dissenters.map((r) => COUNCIL_ROLES[r].name).join(", ")}`;
        } else {
            summary += `Unanimous or strong consensus achieved`;
        }

        return {
            achieved,
            agreementLevel,
            majorityVote,
            dissenters,
            summary,
        };
    }

    /**
     * Build synthesis context including votes and consensus
     */
    buildSynthesisContext(): string {
        const userQuery = this.deliberation.userQuery;
        const allResponses = this.deliberation.responses
            .map((r) => {
                let text = `\n**${r.memberName} (${r.role}):**\n${r.content}`;
                if (r.vote) {
                    text += `\n\n*Vote: ${r.vote.vote} (${Math.round(r.vote.confidence * 100)}% confidence)*`;
                    text += `\n*Reasoning: ${r.vote.reasoning}*`;
                }
                return text;
            })
            .join("\n---\n");

        let context = `**Original User Query:** ${userQuery}\n\n`;
        context += `**All Council Member Deliberations:**\n${allResponses}\n\n`;

        // Add voting results if available
        if (this.deliberation.votes.length > 0) {
            const consensus = this.calculateConsensus();
            context += `**Voting Results:**\n${consensus.summary}\n\n`;
        }

        // Add conflicts if any
        if (this.deliberation.conflicts.length > 0) {
            context += `**Conflicts Resolved:**\n`;
            this.deliberation.conflicts.forEach((conflict) => {
                context += `- ${conflict.issue}: ${conflict.outcome}\n`;
            });
            context += `\n`;
        }

        context += `---\n\n`;
        context += `As The Synthesizer, your task is to:\n`;
        context += `1. Identify the key points of agreement and disagreement\n`;
        context += `2. Synthesize the diverse perspectives into a coherent recommendation\n`;
        context += `3. Address the major concerns raised by different members\n`;
        context += `4. Provide a balanced, comprehensive answer to the user's query\n`;
        context += `5. Acknowledge trade-offs and limitations honestly\n`;
        context += `6. Present a clear final recommendation that reflects The Council's collective wisdom\n\n`;
        context += `Please structure your synthesis according to the format in your system prompt.\n\n`;
        context += `Provide your final synthesis now:`;

        return context;
    }

    /**
     * Resolve conflicts using specified strategy
     */
    async resolveConflict(
        issue: string,
        conflictingMembers: CouncilRole[],
        strategy: ConflictResolutionStrategy = "weighted",
    ): Promise<ConflictResolution> {
        let outcome = "";

        switch (strategy) {
            case "majority":
                // Simple majority voting
                const votesFor = this.deliberation.votes.filter(
                    (v) =>
                        conflictingMembers.includes(v.role) &&
                        (v.vote === "agree" || v.vote === "strongly_agree"),
                ).length;
                const votesAgainst = this.deliberation.votes.filter(
                    (v) =>
                        conflictingMembers.includes(v.role) &&
                        (v.vote === "disagree" ||
                            v.vote === "strongly_disagree"),
                ).length;
                outcome =
                    votesFor > votesAgainst
                        ? "Resolved in favor"
                        : "Resolved against";
                break;

            case "weighted":
                // Weighted voting by member importance
                let weightedFor = 0;
                let weightedAgainst = 0;
                this.deliberation.votes.forEach((v) => {
                    if (conflictingMembers.includes(v.role)) {
                        const member = this.deliberation.members.find(
                            (m) => m.role === v.role,
                        );
                        const weight = member ? member.votingWeight : 1.0;
                        if (v.vote === "agree" || v.vote === "strongly_agree") {
                            weightedFor += weight * v.confidence;
                        } else if (
                            v.vote === "disagree" ||
                            v.vote === "strongly_disagree"
                        ) {
                            weightedAgainst += weight * v.confidence;
                        }
                    }
                });
                outcome =
                    weightedFor > weightedAgainst
                        ? `Resolved in favor (weighted score: ${weightedFor.toFixed(2)} vs ${weightedAgainst.toFixed(2)})`
                        : `Resolved against (weighted score: ${weightedAgainst.toFixed(2)} vs ${weightedFor.toFixed(2)})`;
                break;

            case "consensus":
                // Require high agreement threshold
                const consensus = this.calculateConsensus();
                outcome = consensus.achieved
                    ? "Consensus achieved through deliberation"
                    : "No consensus - deferred to synthesizer";
                break;

            case "moderator":
                // Synthesizer decides
                outcome = "Deferred to Synthesizer for final judgment";
                break;
        }

        const resolution: ConflictResolution = {
            issue,
            strategy,
            outcome,
            participatingMembers: conflictingMembers,
            timestamp: Date.now(),
        };

        this.addConflict(resolution);
        return resolution;
    }

    /**
     * Parse structured response to extract key points, concerns, recommendations
     */
    parseStructuredResponse(content: string): {
        keyPoints: string[];
        concerns: string[];
        recommendations: string[];
    } {
        const keyPoints: string[] = [];
        const concerns: string[] = [];
        const recommendations: string[] = [];

        // Extract Key Points
        const keyPointsMatch = content.match(
            /\*\*Key Points:\*\*([\s\S]*?)(?=\*\*|$)/i,
        );
        if (keyPointsMatch) {
            const points = keyPointsMatch[1].match(/^- (.+)$/gm);
            if (points)
                keyPoints.push(
                    ...points.map((p) => p.replace(/^- /, "").trim()),
                );
        }

        // Extract Concerns
        const concernsMatch = content.match(
            /\*\*Concerns:\*\*([\s\S]*?)(?=\*\*|$)/i,
        );
        if (concernsMatch) {
            const concernsList = concernsMatch[1].match(/^- (.+)$/gm);
            if (concernsList)
                concerns.push(
                    ...concernsList.map((c) => c.replace(/^- /, "").trim()),
                );
        }

        // Extract Recommendations
        const recsMatch = content.match(
            /\*\*(?:Recommendations|Integrated Recommendations):\*\*([\s\S]*?)(?=\*\*|$)/i,
        );
        if (recsMatch) {
            const recsList = recsMatch[1].match(/^- (.+)$/gm);
            if (recsList)
                recommendations.push(
                    ...recsList.map((r) => r.replace(/^- /, "").trim()),
                );
        }

        return { keyPoints, concerns, recommendations };
    }

    /**
     * Parse vote from response content
     */
    parseVote(
        content: string,
        role: CouncilRole,
        memberName: string,
    ): CouncilVote | undefined {
        const voteMatch = content.match(
            /\*\*Vote:\*\*\s*(strongly_agree|agree|neutral|disagree|strongly_disagree)/i,
        );
        const confidenceMatch = content.match(/\*\*Confidence:\*\*\s*(\d+)%/i);
        const reasoningMatch = content.match(
            /\*\*Reasoning:\*\*\s*(.+?)(?=\n\n|\n\*\*|$)/is,
        );

        if (voteMatch) {
            const vote: CouncilVote = {
                role,
                memberName,
                vote: voteMatch[1].toLowerCase() as VoteOption,
                confidence: confidenceMatch
                    ? parseInt(confidenceMatch[1]) / 100
                    : 0.5,
                reasoning: reasoningMatch
                    ? reasoningMatch[1].trim()
                    : "No reasoning provided",
                timestamp: Date.now(),
            };
            return vote;
        }

        return undefined;
    }
}

/**
 * Validate council configuration
 */
export function validateCouncilConfig(members: CouncilMember[]): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (members.length !== 7) {
        errors.push(
            `Council must have exactly 7 members, got ${members.length}`,
        );
    }

    const roles = members.map((m) => m.role);
    const uniqueRoles = new Set(roles);

    if (uniqueRoles.size !== 7) {
        errors.push("Each council member must have a unique role");
    }

    const requiredRoles: CouncilRole[] = [
        "ethicist",
        "analyst",
        "advocate",
        "skeptic",
        "synthesizer",
        "historian",
        "futurist",
    ];
    const missingRoles = requiredRoles.filter((r) => !roles.includes(r));

    if (missingRoles.length > 0) {
        errors.push(`Missing required roles: ${missingRoles.join(", ")}`);
    }

    members.forEach((member) => {
        if (!member.provider || !member.modelId || !member.modelName) {
            errors.push(
                `Member ${member.role} is missing provider or model configuration`,
            );
        }
        if (!member.votingWeight || member.votingWeight <= 0) {
            errors.push(`Member ${member.role} has invalid voting weight`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Quality assurance check for final synthesis
 */
export function validateSynthesisQuality(
    synthesis: string,
    responses: CouncilResponse[],
): {
    passed: boolean;
    issues: string[];
    score: number;
} {
    const issues: string[] = [];
    let score = 100;

    // Check minimum length
    if (synthesis.length < 200) {
        issues.push("Synthesis is too short (< 200 characters)");
        score -= 30;
    }

    // Check if synthesis addresses key concerns
    const allConcerns = responses.flatMap((r) => r.concerns || []);
    const concernsCovered = allConcerns.filter((concern) =>
        synthesis
            .toLowerCase()
            .includes(concern.toLowerCase().substring(0, 20)),
    ).length;
    const concernsCoverage =
        allConcerns.length > 0 ? concernsCovered / allConcerns.length : 1;
    if (concernsCoverage < 0.5) {
        issues.push(
            `Only ${Math.round(concernsCoverage * 100)}% of concerns addressed`,
        );
        score -= 20;
    }

    // Check if synthesis mentions multiple perspectives
    const rolesmentioned = responses.filter(
        (r) =>
            synthesis.toLowerCase().includes(r.role) ||
            synthesis.toLowerCase().includes(r.memberName.toLowerCase()),
    ).length;
    if (rolesmentioned < 3) {
        issues.push(
            "Synthesis doesn't acknowledge enough diverse perspectives",
        );
        score -= 15;
    }

    // Check for structured sections
    const hasSections = /\*\*.*?:\*\*/.test(synthesis);
    if (!hasSections) {
        issues.push("Synthesis lacks clear structure with sections");
        score -= 10;
    }

    // Check for balanced language (not too one-sided)
    const hasBalance =
        synthesis.includes("however") ||
        synthesis.includes("although") ||
        synthesis.includes("while") ||
        synthesis.includes("on the other hand");
    if (!hasBalance) {
        issues.push("Synthesis may lack balanced consideration of trade-offs");
        score -= 10;
    }

    score = Math.max(0, score);

    return {
        passed: score >= 70,
        issues,
        score,
    };
}
