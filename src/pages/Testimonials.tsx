import { useState } from "react";
import { useLocation } from "wouter";
import { getCurrentUser } from "@/lib/storage";
import { getTestimonialsByCountry, getAllTestimonials, type Testimony } from "@/lib/testimonials";
import { ArrowLeft, Star, Quote, ChevronDown, ChevronUp } from "lucide-react";

function TestimonyCard({ t }: { t: Testimony }) {
  const [expanded, setExpanded] = useState(false);
  const previewText = t.text.length > 160 ? t.text.slice(0, 160) + "..." : t.text;

  return (
    <div
      className="glass-card rounded-2xl p-5 space-y-4 border border-yellow-500/10"
      data-testid={`card-testimony-${t.id}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-12 h-12 rounded-full bg-secondary"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=DAA520&color=000&size=48`;
            }}
          />
          <span className="absolute -bottom-1 -right-1 text-sm">{t.flag}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{t.name}</p>
          <p className="text-muted-foreground text-xs">{t.country}</p>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={10} className="fill-yellow-500 text-yellow-500" />
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-green-400 font-bold text-sm">{t.amount}</p>
          <p className="text-muted-foreground text-xs">received</p>
        </div>
      </div>

      {/* Payment proof graphic */}
      <div className={`rounded-xl bg-gradient-to-r ${t.paymentProofBg} p-4 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 8px)` }} />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs">Payment Received</p>
              <p className="text-white font-bold text-lg">{t.amount}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">✅</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 rounded-full" style={{ width: "100%" }} />
            </div>
            <p className="text-white/60 text-xs">Confirmed</p>
          </div>
          <p className="text-white/50 text-xs mt-1">GlobalMinersPay · {new Date(t.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Testimony text */}
      <div className="relative">
        <Quote size={14} className="text-yellow-500/40 mb-1" />
        <p className="text-muted-foreground text-sm leading-relaxed">
          {expanded ? t.text : previewText}
        </p>
        {t.text.length > 160 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-yellow-500 text-xs mt-2 font-medium"
          >
            {expanded ? (
              <><ChevronUp size={12} /> Show less</>
            ) : (
              <><ChevronDown size={12} /> Read more</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [, setLocation] = useLocation();
  const user = getCurrentUser();
  const countryCode = user?.country
    ? (getAllTestimonials().find((t) => t.country === user.country)?.countryCode || "")
    : "";

  const testimonials = countryCode
    ? getTestimonialsByCountry(countryCode)
    : getAllTestimonials().slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-10 pb-2">
        <button
          onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 rounded-full bg-card flex items-center justify-center"
          data-testid="button-back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg">Success Stories</h1>
          {user && (
            <p className="text-muted-foreground text-xs">
              Testimonials from {user.country}
            </p>
          )}
        </div>
      </div>

      {/* Banner */}
      <div className="mx-4 my-4 glass-card rounded-2xl p-4 text-center border border-yellow-500/20">
        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Real People, Real Earnings</p>
        <p className="font-semibold text-sm">
          {testimonials.length} verified payment{testimonials.length !== 1 ? "s" : ""} from your region
        </p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
          ))}
          <span className="text-muted-foreground text-xs ml-1">4.9/5 satisfaction</span>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 space-y-4">
        {testimonials.map((t) => (
          <TestimonyCard key={t.id} t={t} />
        ))}

        {testimonials.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No testimonials available for your region yet.</p>
            <p className="text-xs mt-1">Be the first to share your success story!</p>
          </div>
        )}
      </div>

      <div className="px-4 mt-6 text-center">
        <p className="text-muted-foreground text-xs">
          All testimonials are from verified GlobalMinersPay members. Results may vary.
        </p>
      </div>
    </div>
  );
}
