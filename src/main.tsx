import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Debug environment variables
console.log("🔍 Environment Variables Check:");
console.log("POE:", import.meta.env.VITE_POE_API_KEY ? "✅" : "❌");
console.log("TOGETHER:", import.meta.env.VITE_TOGETHER_API_KEY ? "✅" : "❌");
console.log("GROQ:", import.meta.env.VITE_GROQ_API_KEY ? "✅" : "❌");
console.log(
    "OPENROUTER:",
    import.meta.env.VITE_OPENROUTER_API_KEY ? "✅" : "❌",
);

if (import.meta.env.VITE_GROQ_API_KEY) {
    console.log(
        "✅ GROQ KEY LOADED:",
        import.meta.env.VITE_GROQ_API_KEY.substring(0, 15) + "...",
    );
} else {
    console.error(
        "❌ GROQ KEY NOT LOADED! Check .env file and restart server!",
    );
}

if (import.meta.env.VITE_OPENROUTER_API_KEY) {
    console.log(
        "✅ OPENROUTER KEY LOADED:",
        import.meta.env.VITE_OPENROUTER_API_KEY.substring(0, 15) + "...",
    );
} else {
    console.warn(
        "⚠️ OPENROUTER KEY NOT LOADED! Add to .env file if you want to use OpenRouter.",
    );
}

createRoot(document.getElementById("root")!).render(<App />);
