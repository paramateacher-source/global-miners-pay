import { useEffect } from "react";
import { useLocation } from "wouter";
import { getCurrentUser } from "@/lib/storage";

export default function SplashPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = getCurrentUser();
      if (user) {
        setLocation("/dashboard");
      } else {
        setLocation("/register");
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(218,165,32,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(218,165,32,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-8">
        {/* Logo */}
        <div className="float-animation">
          <div className="w-28 h-28 rounded-full gold-gradient flex items-center justify-center shadow-2xl pulse-gold">
            <span className="text-5xl">⛏️</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="text-4xl font-bold gold-text"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            GlobalMinersPay
          </h1>
          <p className="text-muted-foreground mt-1 text-sm tracking-widest uppercase">
            Mine · Earn · Withdraw
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-yellow-500"
              style={{
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-xs text-center mt-2">
          Licensed · Regulated · Trusted
        </p>
      </div>

      <div className="absolute bottom-8 text-center px-6">
        <p className="text-muted-foreground text-xs">
          © 2024 GlobalMinersPay. All rights reserved.
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          United States · Lic: GMP-US-2024-847392-X
        </p>
      </div>
    </div>
  );
}
