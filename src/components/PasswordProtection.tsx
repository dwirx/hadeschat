import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export const PasswordProtection = ({ children }: PasswordProtectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated in session
  useEffect(() => {
    const authStatus = sessionStorage.getItem("authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Get password from environment variable
    const correctPassword = import.meta.env.VITE_APP_PASSWORD || "test123";

    setTimeout(() => {
      if (password === correctPassword) {
        setIsAuthenticated(true);
        sessionStorage.setItem("authenticated", "true");
        setError("");
      } else {
        setError("Password salah. Silakan coba lagi.");
        setPassword("");
      }
      setIsLoading(false);
    }, 300);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[hsl(var(--background))] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(21,128,61,0.22),_transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-emerald-600/40 via-green-500/20 to-lime-500/40 opacity-90 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-[32px] border border-emerald-400/15 bg-[rgba(7,22,14,0.92)] shadow-[0_24px_70px_rgba(6,24,14,0.55)] backdrop-blur-2xl">
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-8 p-8 sm:p-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 shadow-[0_18px_52px_rgba(34,197,94,0.35)]">
                <Lock className="h-8 w-8 text-white" strokeWidth={1.5} />
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  HadesChat
                </h1>
                <p className="text-base text-emerald-100/70">
                  Masukkan kata sandi untuk melanjutkan ke ruang obrolan Anda.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-left">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100/60"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-emerald-400/30 bg-[rgba(3,12,7,0.95)] px-4 py-3 text-base text-white placeholder:text-emerald-100/40 focus-visible:border-emerald-400 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-0"
                  autoFocus
                  disabled={isLoading}
                />
                {error && <p className="text-sm text-rose-300">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-300 py-5 text-base font-semibold text-emerald-950 shadow-[0_22px_55px_rgba(34,197,94,0.35)] transition-transform hover:-translate-y-[1px] hover:shadow-[0_28px_62px_rgba(74,222,128,0.45)] disabled:translate-y-0 disabled:shadow-none"
                disabled={isLoading || !password}
              >
                {isLoading ? "Memverifikasi..." : "Masuk"}
              </Button>
            </form>

            <div className="rounded-xl border border-emerald-400/15 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-100/70">
              <p>Akses dilindungi untuk menjaga keamanan percakapan Anda.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
