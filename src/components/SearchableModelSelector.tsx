import React, { useState, useMemo } from "react";
import { Provider, aiApi } from "@/lib/aiApi";
import { Search, X } from "lucide-react";

interface SearchableModelSelectorProps {
    selectedProvider: Provider;
    selectedModelId: string;
    onProviderChange: (provider: Provider) => void;
    onModelChange: (modelId: string, modelName: string) => void;
    label?: string;
}

export function SearchableModelSelector({
    selectedProvider,
    selectedModelId,
    onProviderChange,
    onModelChange,
    label,
}: SearchableModelSelectorProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Get available models for selected provider
    const availableModels = useMemo(() => {
        return aiApi.getModelsByProvider(selectedProvider);
    }, [selectedProvider]);

    // Filter models based on search query
    const filteredModels = useMemo(() => {
        if (!searchQuery.trim()) return availableModels;

        const query = searchQuery.toLowerCase();
        return availableModels.filter(
            (m) =>
                m.name.toLowerCase().includes(query) ||
                m.id.toLowerCase().includes(query),
        );
    }, [availableModels, searchQuery]);

    // Get currently selected model info
    const selectedModel = availableModels.find((m) => m.id === selectedModelId);

    const handleModelSelect = (modelId: string, modelName: string) => {
        onModelChange(modelId, modelName);
        setIsDropdownOpen(false);
        setSearchQuery("");
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}

            {/* Provider Selector */}
            <div>
                <label className="text-xs text-gray-400 mb-1 block">
                    Provider
                </label>
                <select
                    value={selectedProvider}
                    onChange={(e) => {
                        const newProvider = e.target.value as Provider;
                        onProviderChange(newProvider);
                        // Auto-select first model of new provider
                        const newProviderModels =
                            aiApi.getModelsByProvider(newProvider);
                        const firstModel = newProviderModels[0];
                        if (firstModel) {
                            onModelChange(firstModel.id, firstModel.name);
                        }
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                >
                    <option value="groq">Groq</option>
                    <option value="openrouter">OpenRouter</option>
                    <option value="together">Together AI</option>
                    <option value="poe">Poe</option>
                </select>
            </div>

            {/* Model Selector with Search */}
            <div className="relative">
                <label className="text-xs text-gray-400 mb-1 block">
                    Model
                </label>

                {/* Selected Model Display / Dropdown Trigger */}
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm text-left focus:outline-none focus:border-blue-500 flex items-center justify-between hover:bg-gray-650"
                >
                    <span className="truncate">
                        {selectedModel ? selectedModel.name : "Select model..."}
                    </span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-80 overflow-hidden flex flex-col">
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-600">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search models..."
                                    className="w-full bg-gray-800 border border-gray-600 rounded pl-8 pr-8 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
                                    autoFocus
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Model List */}
                        <div className="overflow-y-auto flex-1">
                            {filteredModels.length === 0 ? (
                                <div className="p-3 text-center text-gray-400 text-sm">
                                    No models found
                                </div>
                            ) : (
                                filteredModels.map((model) => (
                                    <button
                                        key={model.id}
                                        onClick={() =>
                                            handleModelSelect(
                                                model.id,
                                                model.name,
                                            )
                                        }
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${
                                            model.id === selectedModelId
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-200"
                                        }`}
                                    >
                                        <div className="font-medium">
                                            {model.name}
                                        </div>
                                        <div className="text-xs text-gray-400 truncate">
                                            {model.id}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Model Count */}
                        <div className="p-2 border-t border-gray-600 text-xs text-gray-400 text-center">
                            {filteredModels.length} model
                            {filteredModels.length !== 1 ? "s" : ""} available
                        </div>
                    </div>
                )}
            </div>

            {/* Close dropdown when clicking outside */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    );
}
