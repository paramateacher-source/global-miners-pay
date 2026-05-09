import { useLocation } from "wouter";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6">
      <div className="text-6xl font-bold gold-text">404</div>
      <div>
        <h2 className="text-xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground text-sm mt-1">The page you're looking for doesn't exist.</p>
      </div>
      <Button onClick={() => setLocation("/")} className="gold-gradient text-black font-bold px-8">
        <Home size={16} className="mr-2" /> Go Home
      </Button>
    </div>
  );
}
