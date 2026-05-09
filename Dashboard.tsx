import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { getCurrentUser, setCurrentUser, type UserData } from "@/lib/storage";
import { getCountryByName, formatDualCurrency, formatCurrency } from "@/lib/currencies";
import { hapticImpact, hapticSuccess } from "@/lib/telegram";
import { Wallet, TrendingUp, Users, MessageSquare, Info, LogOut, Pickaxe, ChevronRight, Clock, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MINE_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
const DAILY_MINE_AMOUNT = 100;

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<UserData | null>(null);
  const [miningProgress, setMiningProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [canMine, setCanMine] = useState(false);
  const [mining, setMining] = useState(false);
  const [justMined, setJustMined] = useState(false);

  const countryInfo = user ? getCountryByName(user.country) : null;

  const refreshUser = useCallback(() => {
    const u = getCurrentUser();
    if (!u) { setLocation("/register"); return; }
    setUser(u);
  }, [setLocation]);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      const now = Date.now();
      if (!user.lastMineTime) {
        setCanMine(true);
        setMiningProgress(100);
        setTimeLeft("Ready to mine!");
        return;
      }
      const elapsed = now - user.lastMineTime;
      const remaining = MINE_COOLDOWN_MS - elapsed;
      if (remaining <= 0) {
        setCanMine(true);
        setMiningProgress(100);
        setTimeLeft("Ready to mine!");
      } else {
        setCanMine(false);
        const progress = (elapsed / MINE_COOLDOWN_MS) * 100;
        setMiningProgress(Math.min(progress, 100));
        const hrs = Math.floor(remaining / 3600000);
        const mins = Math.floor((remaining % 3600000) / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  function handleMine() {
    if (!user || !canMine || mining) return;
    hapticImpact();
    setMining(true);
    setTimeout(() => {
      const updated = {
        ...user,
        balance: user.balance + DAILY_MINE_AMOUNT,
        lastMineTime: Date.now(),
        miningActive: true,
      };
      setCurrentUser(updated);
      setUser(updated);
      setMining(false);
      setJustMined(true);
      hapticSuccess();
      setTimeout(() => setJustMined(false), 3000);
    }, 1500);
  }

  if (!user) return null;

  const balanceInLocalCurrency = countryInfo ? formatCurrency(user.balance, countryInfo) : `$${user.balance.toFixed(2)}`;
  const minWithdrawal = 1000;
  const maxWithdrawal = 5000;
  const canWithdraw = user.balance >= minWithdrawal && user.balance <= maxWithdrawal;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-yellow-950/50 to-transparent px-4 pt-10 pb-6">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 50% 0%, rgba(218,165,32,0.9), transparent 70%)` }} />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Welcome back</p>
            <h1 className="text-xl font-bold text-foreground truncate max-w-48">{user.fullName}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{user.country} · ID: {user.id}</p>
          </div>
          <div className="flex gap-2">
            {user.paymentStatus === "approved" && (
              <div className="flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-2 py-1">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-green-400 text-xs">Verified</span>
              </div>
            )}
            {!user.pinActivated && (
              <div className="flex items-center gap-1 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-2 py-1">
                <AlertCircle size={12} className="text-yellow-400" />
                <span className="text-yellow-400 text-xs">Unverified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Balance Card */}
        <div className="glass-card rounded-2xl p-5 mining-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -translate-y-8 translate-x-8 blur-xl" />
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Total Balance</p>
          <div className="mt-1">
            <span className="text-4xl font-bold gold-text" data-testid="text-balance">
              ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          {countryInfo && (
            <p className="text-muted-foreground text-sm mt-1">
              ≈ {balanceInLocalCurrency} {countryInfo.currencyCode}
            </p>
          )}
          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-muted-foreground text-xs">Daily Earn</p>
              <p className="text-green-400 font-semibold text-sm">+$100.00</p>
            </div>
            <div className="flex-1 bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-muted-foreground text-xs">Total Withdrawn</p>
              <p className="text-yellow-400 font-semibold text-sm">${user.totalWithdrawn.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Mining Button */}
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Mining Status</p>
          <Progress value={miningProgress} className="h-2 mb-3 bg-secondary" />
          <p className="text-sm text-muted-foreground mb-4">
            {canMine ? "Tap to claim your $100 daily reward" : `Next mine in: ${timeLeft}`}
          </p>

          <button
            onClick={handleMine}
            disabled={!canMine || mining}
            data-testid="button-mine"
            className={`w-32 h-32 rounded-full mx-auto flex flex-col items-center justify-center gap-2 transition-all duration-300 relative ${
              canMine && !mining
                ? "gold-gradient shadow-2xl pulse-gold cursor-pointer active:scale-95"
                : "bg-secondary cursor-not-allowed opacity-60"
            }`}
          >
            <Pickaxe size={36} className={canMine ? "text-black" : "text-muted-foreground"} style={{ animation: mining ? "mining-spin 0.5s linear infinite" : "none" }} />
            <span className={`text-xs font-bold ${canMine ? "text-black" : "text-muted-foreground"}`}>
              {mining ? "Mining..." : canMine ? "MINE NOW" : "Mining..."}
            </span>
          </button>

          {justMined && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-400 count-animation">
              <CheckCircle size={16} />
              <span className="font-semibold">+$100.00 added to your balance!</span>
            </div>
          )}
        </div>

        {/* Withdraw CTA */}
        {!user.pinActivated ? (
          <div
            className="glass-card rounded-2xl p-4 border border-yellow-500/30 cursor-pointer active:scale-98 transition-all"
            onClick={() => setLocation("/payment")}
            data-testid="card-activate-pin"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/15 flex items-center justify-center">
                  <Shield size={20} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-yellow-400">Activate Withdrawal PIN</p>
                  <p className="text-muted-foreground text-xs">Pay $50 USDT to unlock withdrawals</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </div>
          </div>
        ) : user.paymentStatus === "pending" ? (
          <div className="glass-card rounded-2xl p-4 border border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center">
                <Clock size={20} className="text-amber-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-amber-400">Payment Under Review</p>
                <p className="text-muted-foreground text-xs">Your PIN will be sent once admin approves</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`glass-card rounded-2xl p-4 cursor-pointer active:scale-98 transition-all ${canWithdraw ? "border border-green-500/30" : "border border-border/40"}`}
            onClick={() => setLocation("/withdraw")}
            data-testid="card-withdraw"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${canWithdraw ? "bg-green-500/15" : "bg-secondary"}`}>
                  <Wallet size={20} className={canWithdraw ? "text-green-500" : "text-muted-foreground"} />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${canWithdraw ? "text-green-400" : "text-foreground"}`}>
                    {canWithdraw ? "Withdraw Now" : "Withdraw Funds"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Min: $1,000 · Max: $5,000
                    {!canWithdraw && user.balance < minWithdrawal && ` · Need $${(minWithdrawal - user.balance).toFixed(0)} more`}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="glass-card rounded-xl p-4 cursor-pointer active:scale-98"
            onClick={() => setLocation("/testimonials")}
            data-testid="card-testimonials"
          >
            <MessageSquare size={20} className="text-yellow-500 mb-2" />
            <p className="text-sm font-semibold">Testimonials</p>
            <p className="text-muted-foreground text-xs">Read success stories</p>
          </div>
          <div
            className="glass-card rounded-xl p-4 cursor-pointer active:scale-98"
            onClick={() => setLocation("/about")}
            data-testid="card-about"
          >
            <Info size={20} className="text-yellow-500 mb-2" />
            <p className="text-sm font-semibold">About Us</p>
            <p className="text-muted-foreground text-xs">Company info</p>
          </div>
          <div
            className="glass-card rounded-xl p-4 cursor-pointer active:scale-98"
            onClick={() => setLocation("/aml-policy")}
            data-testid="card-aml"
          >
            <Shield size={20} className="text-yellow-500 mb-2" />
            <p className="text-sm font-semibold">AML Policy</p>
            <p className="text-muted-foreground text-xs">Compliance info</p>
          </div>
          <div
            className="glass-card rounded-xl p-4 cursor-pointer active:scale-98"
            onClick={() => setLocation("/tax-policy")}
            data-testid="card-tax"
          >
            <TrendingUp size={20} className="text-yellow-500 mb-2" />
            <p className="text-sm font-semibold">Tax Policy</p>
            <p className="text-muted-foreground text-xs">Regulations</p>
          </div>
        </div>

        {/* Mining Details */}
        <div className="glass-card rounded-xl p-4 space-y-2">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Mining Details</p>
          <div className="space-y-2 text-sm">
            {[
              { label: "Platform", value: "GlobalMinersPay" },
              { label: "License", value: "GMP-US-2024-847392-X" },
              { label: "Location", value: "United States" },
              { label: "Daily Reward", value: "$100.00 USD" },
              { label: "Min Withdrawal", value: "$1,000.00 USD" },
              { label: "Max Withdrawal", value: "$5,000.00 USD" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("gmp_current_user");
            setLocation("/register");
          }}
          className="w-full flex items-center justify-center gap-2 text-muted-foreground text-sm py-3 rounded-xl border border-border/30 active:bg-secondary/50"
          data-testid="button-logout"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="flex items-center justify-around py-3 px-4">
          {[
            { icon: Pickaxe, label: "Mine", path: "/dashboard" },
            { icon: Wallet, label: "Withdraw", path: "/withdraw" },
            { icon: MessageSquare, label: "Stories", path: "/testimonials" },
            { icon: Users, label: "About", path: "/about" },
          ].map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => setLocation(path)}
              className="flex flex-col items-center gap-1 text-muted-foreground"
              data-testid={`nav-${label.toLowerCase()}`}
            >
              <Icon size={20} className={path === "/dashboard" ? "text-yellow-500" : ""} />
              <span className={`text-xs ${path === "/dashboard" ? "text-yellow-500 font-semibold" : ""}`}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
