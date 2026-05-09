import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCurrentUser, setCurrentUser, addAdminNotification, generateNotifId, type UserData } from "@/lib/storage";
import { getCountryByName, formatDualCurrency } from "@/lib/currencies";
import { hapticSuccess, hapticError } from "@/lib/telegram";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, Shield, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MIN_WITHDRAWAL = 1000;
const MAX_WITHDRAWAL = 5000;

const schema = z.object({
  amount: z.string()
    .min(1, "Amount is required")
    .refine((v) => !isNaN(Number(v)), "Must be a number")
    .refine((v) => Number(v) >= MIN_WITHDRAWAL, `Minimum withdrawal is $${MIN_WITHDRAWAL}`)
    .refine((v) => Number(v) <= MAX_WITHDRAWAL, `Maximum withdrawal is $${MAX_WITHDRAWAL}`),
  walletAddress: z.string().min(10, "Enter a valid wallet address"),
  pin: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d{4}$/, "PIN must be 4 digits"),
});

type FormValues = z.infer<typeof schema>;

export default function WithdrawPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);

  const user = getCurrentUser();
  const countryInfo = user ? getCountryByName(user.country) : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: "", walletAddress: "", pin: "" },
  });

  if (!user) { setLocation("/register"); return null; }

  if (!user.pinActivated || user.paymentStatus !== "approved" || !user.withdrawPin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-yellow-500/15 flex items-center justify-center">
          <Shield size={36} className="text-yellow-500" />
        </div>
        <h2 className="text-xl font-bold">PIN Required</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {user.paymentStatus === "pending"
            ? "Your payment is under review. Please wait for admin approval to receive your PIN."
            : "You need to activate your withdrawal PIN first. Pay the one-time $50 USDT fee to unlock withdrawals."}
        </p>
        <Button
          onClick={() => setLocation(user.paymentStatus === "pending" ? "/dashboard" : "/payment")}
          className="gold-gradient text-black font-bold px-8"
        >
          {user.paymentStatus === "pending" ? "Back to Dashboard" : "Activate PIN"}
        </Button>
      </div>
    );
  }

  if (user.balance < MIN_WITHDRAWAL) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/15 flex items-center justify-center">
          <AlertCircle size={36} className="text-amber-500" />
        </div>
        <h2 className="text-xl font-bold">Insufficient Balance</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your balance is <span className="text-yellow-400 font-bold">${user.balance.toFixed(2)}</span>. You need at least <span className="text-yellow-400 font-bold">$1,000</span> to withdraw. Keep mining daily!
        </p>
        <div className="glass-card rounded-2xl p-4 w-full text-left space-y-2">
          <p className="text-muted-foreground text-xs">Progress to minimum withdrawal</p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full gold-gradient rounded-full transition-all" style={{ width: `${Math.min((user.balance / MIN_WITHDRAWAL) * 100, 100)}%` }} />
          </div>
          <p className="text-sm font-semibold">${user.balance.toFixed(0)} / $1,000 — {Math.ceil((MIN_WITHDRAWAL - user.balance) / 100)} more days of mining</p>
        </div>
        <Button onClick={() => setLocation("/dashboard")} className="gold-gradient text-black font-bold px-8">
          Keep Mining
        </Button>
      </div>
    );
  }

  function onSubmit(values: FormValues) {
    if (!user) return;
    if (values.pin !== user.withdrawPin) {
      hapticError();
      toast({ title: "Incorrect PIN", description: "The PIN you entered is wrong. Please try again.", variant: "destructive" });
      return;
    }
    const amount = Number(values.amount);
    if (amount > user.balance) {
      hapticError();
      toast({ title: "Insufficient balance", description: "You don't have enough balance for this withdrawal.", variant: "destructive" });
      return;
    }

    const notif = {
      id: generateNotifId(),
      type: "withdrawal_request" as const,
      userId: user.id,
      userFullName: user.fullName,
      userPhone: user.phoneNumber,
      userCountry: user.country,
      amount,
      walletAddress: values.walletAddress,
      status: "pending" as const,
      createdAt: Date.now(),
    };
    addAdminNotification(notif);

    const updated: UserData = {
      ...user,
      balance: user.balance - amount,
      totalWithdrawn: user.totalWithdrawn + amount,
    };
    setCurrentUser(updated);
    setWithdrawnAmount(amount);
    hapticSuccess();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center">
          <CheckCircle size={44} className="text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-400">Withdrawal Submitted!</h2>
          <p className="text-4xl font-bold gold-text mt-2">${withdrawnAmount.toLocaleString()}</p>
          {countryInfo && (
            <p className="text-muted-foreground text-sm mt-1">
              ≈ {formatDualCurrency(withdrawnAmount, countryInfo).split("(")[1]?.replace(")", "")} {countryInfo.currencyCode}
            </p>
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          Your withdrawal request is being processed. Payment will be sent to your wallet within 24–48 hours.
        </p>
        <Button onClick={() => setLocation("/dashboard")} className="gold-gradient text-black font-bold px-10 py-6 w-full">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 px-4 pt-10 pb-4">
        <button onClick={() => setLocation("/dashboard")} className="w-9 h-9 rounded-full bg-card flex items-center justify-center" data-testid="button-back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-bold text-lg">Withdraw Funds</h1>
      </div>

      <div className="px-4 space-y-4">
        {/* Balance */}
        <div className="glass-card rounded-2xl p-4 border border-yellow-500/20">
          <p className="text-muted-foreground text-xs">Available Balance</p>
          <p className="text-2xl font-bold gold-text">${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          {countryInfo && (
            <p className="text-muted-foreground text-sm">≈ {formatDualCurrency(user.balance, countryInfo)}</p>
          )}
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 bg-blue-500/5 rounded-xl p-3 border border-blue-500/15">
          <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">Min: <span className="text-yellow-400">$1,000</span> · Max: <span className="text-yellow-400">$5,000</span> per withdrawal</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Wallet size={14} className="text-yellow-500" /> Withdrawal Amount (USD)
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="input-amount"
                      placeholder="Enter amount ($1,000 – $5,000)"
                      type="number"
                      min={MIN_WITHDRAWAL}
                      max={Math.min(MAX_WITHDRAWAL, user.balance)}
                      className="bg-card border-border/60 focus:border-yellow-500/60 py-5"
                      {...field}
                    />
                  </FormControl>
                  {field.value && !isNaN(Number(field.value)) && countryInfo && Number(field.value) > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ≈ {formatDualCurrency(Number(field.value), countryInfo)}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address (USDT BEP20)</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="input-wallet"
                      placeholder="0x... or your wallet address"
                      className="bg-card border-border/60 focus:border-yellow-500/60 py-5 font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Shield size={14} className="text-yellow-500" /> Withdrawal PIN
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="input-pin"
                      placeholder="Enter your 4-digit PIN"
                      type="password"
                      maxLength={4}
                      className="bg-card border-border/60 focus:border-yellow-500/60 py-5 text-center tracking-widest text-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full gold-gradient text-black font-bold py-6 text-base"
              data-testid="button-submit-withdraw"
            >
              Submit Withdrawal Request
            </Button>
          </form>
        </Form>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Withdrawals are processed within 24–48 hours. Contact support for delays.
        </p>
      </div>
    </div>
  );
}
