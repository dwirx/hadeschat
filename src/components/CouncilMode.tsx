import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Users,
    Send,
    Loader2,
    Settings,
    CheckCircle,
    Circle,
    PlayCircle,
    Globe,
    Power,
    StopCircle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    CouncilMember,
    CouncilRole,
    CouncilResponse,
    CouncilOrchestrator,
    createDefaultCouncil,
    validateCouncilConfig,
    COUNCIL_ROLES,
} from "@/lib/theCouncil";
import { Provider, aiApi, UnifiedMessage } from "@/lib/aiApi";
import { SearchableModelSelector } from "@/components/SearchableModelSelector";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { debugLog, debugError, debugWarn } from "@/lib/debug";
import {
    saveCouncilSession,
    getCouncilSession,
    saveCouncilResponse,
} from "@/lib/db";

// Multi-language support
const LANG = {
    en: {
        title: "The Council",
        subtitle: "AI Deliberative Body",
        config: "Council Configuration",
        submit: "Submit your query to The Council",
        placeholder: "Enter your question or topic for deliberation...",
        start: "Start Deliberation",
        deliberating: "Deliberating...",
        stop: "Stop Deliberation",
        newDeliberation: "Start New Deliberation",
        query: "Query",
        finalSynthesis: "Final Council Synthesis",
        enabled: "Enabled",
        respondIn: "Respond in",
    },
    id: {
        title: "Dewan",
        subtitle: "Badan Deliberatif AI",
        config: "Konfigurasi Dewan",
        submit: "Kirim pertanyaan Anda ke Dewan",
        placeholder: "Masukkan pertanyaan atau topik untuk deliberasi...",
        start: "Mulai Deliberasi",
        deliberating: "Sedang Berdeliberasi...",
        stop: "Hentikan Deliberasi",
        newDeliberation: "Mulai Deliberasi Baru",
        query: "Pertanyaan",
        finalSynthesis: "Sintesis Akhir Dewan",
        enabled: "Aktif",
        respondIn: "Jawab dalam",
    },
};

interface CouncilModeProps {
    sessionId: string;
}

export function CouncilMode({ sessionId }: CouncilModeProps) {
    const [members, setMembers] = useState<CouncilMember[]>([]);
    const [enabledMembers, setEnabledMembers] = useState<
        Record<CouncilRole, boolean>
    >({
        ethicist: true,
        analyst: true,
        advocate: true,
        skeptic: true,
        historian: true,
        futurist: true,
        synthesizer: true,
    });
    const [language, setLanguage] = useState<"en" | "id">("en");
    const [userQuery, setUserQuery] = useState("");
    const [orchestrator, setOrchestrator] =
        useState<CouncilOrchestrator | null>(null);
    const [isDeliberating, setIsDeliberating] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState<CouncilRole | null>(
        null,
    );
    const [showConfig, setShowConfig] = useState(true);
    const [responses, setResponses] = useState<CouncilResponse[]>([]);
    const [streamingContent, setStreamingContent] = useState<
        Partial<Record<CouncilRole, string>>
    >({});

    // Ref untuk abort controller
    const abortControllerRef = useRef<AbortController | null>(null);
    const responsesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll ke bawah saat ada response baru
    useEffect(() => {
        if (responsesEndRef.current) {
            responsesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [responses, streamingContent]);

    // Initialize with default configuration
    useEffect(() => {
        const defaultMembers = createDefaultCouncil([
            {
                role: "ethicist",
                provider: "groq",
                modelId: "llama-3.1-70b-versatile",
                modelName: "Llama 3.1 70B",
            },
            {
                role: "analyst",
                provider: "groq",
                modelId: "llama-3.1-70b-versatile",
                modelName: "Llama 3.1 70B",
            },
            {
                role: "advocate",
                provider: "groq",
                modelId: "llama-3.1-70b-versatile",
                modelName: "Llama 3.1 70B",
            },
            {
                role: "skeptic",
                provider: "groq",
                modelId: "llama-3.1-70b-versatile",
                modelName: "Llama 3.1 70B",
            },
            {
                role: "synthesizer",
                provider: "groq",
                modelId: "llama-3.1-70b-versatile",
                modelName: "Llama 3.1 70B",
            },
            {
                role: "historian",
                provider: "groq",
                modelId: "llama-3.1-70b-versatile",
                modelName: "Llama 3.1 70B",
            },
            {
                role: "futurist",
                provider: "groq",
                modelId: "llama-3.1-70b-versatile",
                modelName: "Llama 3.1 70B",
            },
        ]);
        setMembers(defaultMembers);
    }, []);

    // Update member configuration
    const updateMember = useCallback(
        (role: CouncilRole, updates: Partial<CouncilMember>) => {
            setMembers((prev) =>
                prev.map((m) => (m.role === role ? { ...m, ...updates } : m)),
            );
        },
        [],
    );

    // Generate response from a specific member
    const generateMemberResponse = useCallback(
        async (orc: CouncilOrchestrator, role: CouncilRole) => {
            const member = members.find((m) => m.role === role);
            if (!member) {
                debugError(`Member with role ${role} not found`);
                return;
            }

            // Check if aborted
            if (abortControllerRef.current?.signal.aborted) {
                debugLog(`Generation aborted for ${role}`);
                return;
            }

            setCurrentSpeaker(role);
            debugLog(`${member.name} is now speaking...`);

            const context =
                role === "synthesizer"
                    ? orc.buildSynthesisContext()
                    : orc.buildMemberContext(role);

            // Add language instruction
            const languageInstruction =
                language === "id"
                    ? "\n\nIMPORTANT: Please respond in Indonesian (Bahasa Indonesia)."
                    : "\n\nIMPORTANT: Please respond in English.";

            let fullContent = "";
            const startTime = Date.now();

            try {
                const apiMessages: UnifiedMessage[] = [
                    {
                        role: "system",
                        content: member.systemPrompt + languageInstruction,
                    },
                    { role: "user", content: context },
                ];

                await aiApi.sendMessage(
                    {
                        provider: member.provider,
                        model: member.modelId,
                        messages: apiMessages,
                        temperature: 0.7,
                        max_tokens: role === "synthesizer" ? 2000 : 1000,
                    },
                    // onChunk
                    (chunk: string) => {
                        // Check if aborted
                        if (abortControllerRef.current?.signal.aborted) {
                            throw new Error("Deliberation stopped by user");
                        }

                        fullContent += chunk;
                        setStreamingContent((prev) => ({
                            ...prev,
                            [role]: fullContent,
                        }));
                    },
                    // onComplete
                    async () => {
                        // Check if aborted
                        if (abortControllerRef.current?.signal.aborted) {
                            debugLog(`Completion aborted for ${role}`);
                            return;
                        }

                        const endTime = Date.now();
                        const response: CouncilResponse = {
                            role,
                            memberName: member.name,
                            content: fullContent,
                            timestamp: Date.now(),
                            provider: member.provider,
                            modelName: member.modelName,
                            metadata: {
                                generationTime: endTime - startTime,
                            },
                        };

                        orc.addResponse(response);
                        setResponses((prev) => [...prev, response]);

                        // Save to database
                        await saveCouncilResponse({
                            id: `${orc.getDeliberation().id}-${role}`,
                            councilSessionId: orc.getDeliberation().id,
                            role,
                            memberName: member.name,
                            content: fullContent,
                            timestamp: response.timestamp,
                            provider: member.provider,
                            modelName: member.modelName,
                            metadata: response.metadata,
                        });

                        // If synthesizer, save final synthesis
                        if (role === "synthesizer") {
                            orc.setFinalSynthesis(fullContent);
                        }

                        // Clear streaming content for this role
                        setStreamingContent((prev) => {
                            const newContent = { ...prev };
                            delete newContent[role];
                            return newContent;
                        });
                    },
                    // onError
                    (error: Error) => {
                        debugError(
                            `Error generating response for ${member.name}:`,
                            error,
                        );
                        const errorResponse: CouncilResponse = {
                            role,
                            memberName: member.name,
                            content: `**Error:** Failed to generate response. ${error.message}`,
                            timestamp: Date.now(),
                            provider: member.provider,
                            modelName: member.modelName,
                        };
                        orc.addResponse(errorResponse);
                        setResponses((prev) => [...prev, errorResponse]);

                        // Clear streaming content for this role
                        setStreamingContent((prev) => {
                            const newContent = { ...prev };
                            delete newContent[role];
                            return newContent;
                        });
                    },
                );
            } catch (error) {
                debugError(
                    `Error generating response for ${member.name}:`,
                    error,
                );
                const errorResponse: CouncilResponse = {
                    role,
                    memberName: member.name,
                    content: `**Error:** Failed to generate response. ${error instanceof Error ? error.message : String(error)}`,
                    timestamp: Date.now(),
                    provider: member.provider,
                    modelName: member.modelName,
                };
                orc.addResponse(errorResponse);
                setResponses((prev) => [...prev, errorResponse]);

                // Clear streaming content for this role
                setStreamingContent((prev) => {
                    const newContent = { ...prev };
                    delete newContent[role];
                    return newContent;
                });
            }
        },
        [members, language],
    );

    // Stop deliberation
    const stopDeliberation = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setIsDeliberating(false);
        setCurrentSpeaker(null);
        setStreamingContent({});
        debugLog("Council deliberation stopped by user");
    }, []);

    // Start deliberation process
    const startDeliberation = useCallback(async () => {
        if (!userQuery.trim()) {
            debugWarn("Cannot start deliberation without a query");
            return;
        }

        const validation = validateCouncilConfig(members);
        if (!validation.valid) {
            debugError("Invalid council configuration:", validation.errors);
            alert(`Configuration error:\n${validation.errors.join("\n")}`);
            return;
        }

        setIsDeliberating(true);
        setShowConfig(false);
        setResponses([]);
        setStreamingContent({});

        // Create abort controller
        abortControllerRef.current = new AbortController();

        const newOrchestrator = new CouncilOrchestrator(
            sessionId,
            userQuery,
            members,
        );
        setOrchestrator(newOrchestrator);

        try {
            // Save council session to DB
            await saveCouncilSession({
                id: newOrchestrator.getDeliberation().id,
                sessionId,
                userQuery,
                timestamp: Date.now(),
                members: members.map((m) => ({
                    role: m.role,
                    name: m.name,
                    provider: m.provider,
                    modelId: m.modelId,
                    modelName: m.modelName,
                })),
                phase: "research",
            });

            // Phase 1-6: Each member speaks in order (only if enabled)
            const speakingOrder: CouncilRole[] = [
                "ethicist",
                "analyst",
                "advocate",
                "skeptic",
                "historian",
                "futurist",
            ];

            for (const role of speakingOrder) {
                // Check if stopped
                if (abortControllerRef.current?.signal.aborted) {
                    debugLog("Deliberation stopped during speaking order");
                    return;
                }

                if (enabledMembers[role]) {
                    await generateMemberResponse(newOrchestrator, role);
                }
            }

            // Check if stopped before synthesis
            if (abortControllerRef.current?.signal.aborted) {
                debugLog("Deliberation stopped before synthesis");
                return;
            }

            // Phase 7: Synthesizer provides final synthesis (always enabled)
            newOrchestrator.setPhase("synthesis");
            if (enabledMembers.synthesizer) {
                await generateMemberResponse(newOrchestrator, "synthesizer");
            }

            newOrchestrator.setPhase("completed");
            debugLog("Council deliberation completed successfully");
        } catch (error) {
            debugError("Error during council deliberation:", error);
            if (
                error instanceof Error &&
                error.message !== "Deliberation stopped by user"
            ) {
                alert(
                    "An error occurred during deliberation. Please check the console.",
                );
            }
        } finally {
            setIsDeliberating(false);
            setCurrentSpeaker(null);
            abortControllerRef.current = null;
        }
    }, [userQuery, members, sessionId, enabledMembers, generateMemberResponse]);

    const roleOrder: CouncilRole[] = [
        "ethicist",
        "analyst",
        "advocate",
        "skeptic",
        "historian",
        "futurist",
        "synthesizer",
    ];

    const getRoleIcon = (role: CouncilRole) => {
        const isActive = currentSpeaker === role;
        const hasResponded = responses.some((r) => r.role === role);

        if (isActive)
            return <Loader2 className="w-4 h-4 animate-spin text-blue-400" />;
        if (hasResponded)
            return <CheckCircle className="w-4 h-4 text-green-400" />;
        return <Circle className="w-4 h-4 text-gray-500" />;
    };

    const t = LANG[language];

    return (
        <div className="flex flex-col h-full max-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-700 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-400 flex-shrink-0" />
                    <div>
                        <h2 className="text-lg md:text-xl font-bold">
                            {t.title}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-400">
                            {t.subtitle}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Language Selector */}
                    <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-1.5 flex-1 sm:flex-none">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <select
                            value={language}
                            onChange={(e) =>
                                setLanguage(e.target.value as "en" | "id")
                            }
                            className="bg-transparent text-sm focus:outline-none cursor-pointer"
                            disabled={isDeliberating}
                        >
                            <option value="en">English</option>
                            <option value="id">Indonesia</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="p-2 hover:bg-gray-700 rounded transition-colors flex-shrink-0"
                        disabled={isDeliberating}
                        title="Settings"
                    >
                        <Settings className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>

            {/* Configuration Panel */}
            {showConfig && !isDeliberating && (
                <div className="border-b border-gray-700 p-3 md:p-4 bg-gray-800 max-h-[40vh] overflow-y-auto flex-shrink-0">
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                        {t.config}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {roleOrder.map((role) => {
                            const member = members.find((m) => m.role === role);
                            if (!member) return null;
                            const isEnabled = enabledMembers[role];

                            return (
                                <div
                                    key={role}
                                    className={`bg-gray-700 p-3 md:p-4 rounded border transition-all ${
                                        isEnabled
                                            ? "border-purple-500 opacity-100"
                                            : "border-gray-600 opacity-50"
                                    }`}
                                >
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-purple-300 text-sm md:text-base break-words">
                                                {member.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 mt-1 break-words">
                                                {member.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                                            <Switch
                                                checked={isEnabled}
                                                onCheckedChange={(checked) =>
                                                    setEnabledMembers(
                                                        (prev) => ({
                                                            ...prev,
                                                            [role]: checked,
                                                        }),
                                                    )
                                                }
                                                className="data-[state=checked]:bg-purple-600"
                                            />
                                            <Power
                                                className={`w-4 h-4 ${isEnabled ? "text-green-400" : "text-gray-500"}`}
                                            />
                                        </div>
                                    </div>

                                    <SearchableModelSelector
                                        selectedProvider={member.provider}
                                        selectedModelId={member.modelId}
                                        onProviderChange={(provider) => {
                                            updateMember(role, { provider });
                                        }}
                                        onModelChange={(modelId, modelName) => {
                                            updateMember(role, {
                                                modelId,
                                                modelName,
                                            });
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Query Input */}
            {!orchestrator && (
                <div className="p-3 md:p-4 border-b border-gray-700 bg-gray-800 flex-shrink-0">
                    <label className="block text-xs md:text-sm font-medium mb-2">
                        {t.submit}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={userQuery}
                            onChange={(e) => setUserQuery(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                !isDeliberating &&
                                startDeliberation()
                            }
                            placeholder={t.placeholder}
                            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 md:px-4 py-2 text-sm md:text-base text-white focus:outline-none focus:border-purple-500 transition-colors"
                            disabled={isDeliberating}
                        />
                        {!isDeliberating ? (
                            <button
                                onClick={startDeliberation}
                                disabled={!userQuery.trim()}
                                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 md:px-6 py-2 rounded font-medium transition-colors flex items-center justify-center space-x-2 text-sm md:text-base whitespace-nowrap"
                            >
                                <PlayCircle className="w-4 h-4" />
                                <span>{t.start}</span>
                            </button>
                        ) : (
                            <button
                                onClick={stopDeliberation}
                                className="bg-red-600 hover:bg-red-700 px-4 md:px-6 py-2 rounded font-medium transition-colors flex items-center justify-center space-x-2 text-sm md:text-base whitespace-nowrap"
                            >
                                <StopCircle className="w-4 h-4" />
                                <span>{t.stop}</span>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Deliberation Progress Indicator */}
            {orchestrator && (
                <div className="p-3 md:p-4 border-b border-gray-700 bg-gray-800 flex-shrink-0">
                    <div className="mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <span className="text-xs md:text-sm font-medium text-gray-300">
                                {t.query}:{" "}
                            </span>
                            <span className="text-xs md:text-sm text-gray-400 break-words">
                                {userQuery}
                            </span>
                        </div>
                        {isDeliberating && (
                            <button
                                onClick={stopDeliberation}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1 flex-shrink-0"
                            >
                                <StopCircle className="w-3 h-3" />
                                <span>{t.stop}</span>
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                        {roleOrder.map((role) => {
                            const member = members.find((m) => m.role === role);
                            if (!enabledMembers[role]) return null;
                            return (
                                <div
                                    key={role}
                                    className="flex items-center gap-1"
                                >
                                    {getRoleIcon(role)}
                                    <span
                                        className={
                                            currentSpeaker === role
                                                ? "text-blue-400 font-medium"
                                                : "text-gray-400"
                                        }
                                    >
                                        {member?.name.replace("The ", "")}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Deliberation Responses */}
            <div
                className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4 space-y-4 md:space-y-6 min-h-0"
                style={{
                    WebkitOverflowScrolling: "touch",
                    overscrollBehavior: "contain",
                }}
            >
                {responses.map((response, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 rounded-lg border border-gray-700 p-3 md:p-4 hover:border-purple-500 transition-colors w-full"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-purple-300 flex items-start space-x-2 text-sm md:text-base">
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span className="break-words">
                                        {response.memberName}
                                    </span>
                                </h3>
                                <p className="text-xs text-gray-400 mt-1 break-words">
                                    {response.modelName} • {response.provider}
                                    {response.metadata?.generationTime &&
                                        ` • ${(response.metadata.generationTime / 1000).toFixed(1)}s`}
                                </p>
                            </div>
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 self-start flex-shrink-0">
                                {response.role}
                            </span>
                        </div>
                        <div className="prose prose-sm md:prose prose-invert max-w-none break-words overflow-x-auto">
                            <MarkdownRenderer content={response.content} />
                        </div>
                    </div>
                ))}

                {/* Currently streaming response */}
                {Object.entries(streamingContent).map(([role, content]) => {
                    const member = members.find((m) => m.role === role);
                    if (!member) return null;

                    return (
                        <div
                            key={role}
                            className="bg-gray-800 rounded-lg border border-blue-500 p-3 md:p-4 shadow-lg shadow-blue-500/20 w-full"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-blue-300 flex items-start space-x-2 text-sm md:text-base">
                                        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0 mt-0.5" />
                                        <span className="break-words">
                                            {member.name}{" "}
                                            <span className="hidden sm:inline">
                                                (Speaking...)
                                            </span>
                                        </span>
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1 break-words">
                                        {member.modelName} • {member.provider}
                                    </p>
                                </div>
                                <span className="text-xs bg-blue-600 px-2 py-1 rounded text-white self-start animate-pulse flex-shrink-0">
                                    {role}
                                </span>
                            </div>
                            <div className="prose prose-sm md:prose prose-invert max-w-none break-words overflow-x-auto">
                                <MarkdownRenderer content={content} />
                            </div>
                        </div>
                    );
                })}

                {/* Final Synthesis Highlight */}
                {orchestrator?.getDeliberation().phase === "completed" && (
                    <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg border-2 border-purple-500 p-4 md:p-6 shadow-2xl w-full">
                        <h3 className="text-lg md:text-xl font-bold text-purple-200 mb-4 flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5" />
                            <span>{t.finalSynthesis}</span>
                        </h3>
                        <div className="prose prose-sm md:prose prose-invert max-w-none text-gray-100 break-words overflow-x-auto">
                            <MarkdownRenderer
                                content={
                                    orchestrator.getDeliberation()
                                        .finalSynthesis || ""
                                }
                            />
                        </div>
                    </div>
                )}

                {/* Scroll anchor */}
                <div ref={responsesEndRef} />
            </div>

            {/* New Deliberation Button */}
            {orchestrator?.getDeliberation().phase === "completed" && (
                <div className="p-3 md:p-4 border-t border-gray-700 bg-gray-800 flex-shrink-0">
                    <button
                        onClick={() => {
                            setOrchestrator(null);
                            setResponses([]);
                            setUserQuery("");
                            setShowConfig(true);
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 md:py-3 rounded font-medium transition-colors text-sm md:text-base"
                    >
                        {t.newDeliberation}
                    </button>
                </div>
            )}
        </div>
    );
}
