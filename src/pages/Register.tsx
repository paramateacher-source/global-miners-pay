import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTRIES, formatDualCurrency, type CountryInfo } from "@/lib/currencies";
import { getCurrentUser, setCurrentUser, generateUserId } from "@/lib/storage";
import { getTelegramUser } from "@/lib/telegram";
import { useEffect } from "react";

async function notifyAdminRegistration(user: any) {
  try {
    await fetch("/api/notify/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        country: user.country,
        telegramId: user.telegramId,
        telegramUsername: user.telegramUsername,
      }),
    });
  } catch { /* silent */ }
}

import { Shield, User, Phone, MapPin, ChevronRight } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  phoneNumber: z.string().min(7, "Enter a valid phone number"),
  country: z.string().min(1, "Please select your country"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) setLocation("/dashboard");
  }, [setLocation]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phoneNumber: "", country: "" },
  });

  function onCountryChange(value: string) {
    form.setValue("country", value);
    const country = COUNTRIES.find((c) => c.code === value) || null;
    setSelectedCountry(country);
  }

  function onSubmit(values: FormValues) {
    setLoading(true);
    const tgUser = getTelegramUser();
    const country = COUNTRIES.find((c) => c.code === values.country)!;
    const user = {
      id: generateUserId(),
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      country: country.name,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      exchangeRate: country.exchangeRate,
      registeredAt: Date.now(),
      balance: 0,
      lastMineTime: null,
      miningActive: false,
      pinActivated: false,
      withdrawPin: null,
      paymentSubmitted: false,
      paymentStatus: null as null,
      paymentReceiptBase64: null,
      paymentSubmittedAt: null,
      totalWithdrawn: 0,
      telegramId: tgUser?.id || null,
      telegramUsername: tgUser?.username || null,
    };
    setCurrentUser(user);
    notifyAdminRegistration(user);
    setTimeout(() => {
      setLoading(false);
      setLocation("/dashboard");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-yellow-950/40 to-transparent pt-12 pb-8 px-6">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 50% 0%, rgba(218,165,32,0.8), transparent 70%)` }} />
        <div className="relative text-center">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-3xl">⛏️</span>
          </div>
          <h1 className="text-2xl font-bold gold-text" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            Join GlobalMinersPay
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Create your account and start mining $100 daily</p>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-3 px-6 mb-6">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "gold-gradient text-black" : "bg-secondary text-muted-foreground"}`}>
              {s}
            </div>
            {s < 2 && <div className={`w-16 h-0.5 transition-all ${step >= 2 ? "bg-yellow-500" : "bg-secondary"}`} />}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center gap-2">
                        <User size={14} className="text-yellow-500" /> Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            data-testid="input-fullname"
                            placeholder="Enter your full legal name"
                            className="bg-card border-border/60 focus:border-yellow-500/60 pl-4 py-5"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center gap-2">
                        <Phone size={14} className="text-yellow-500" /> Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-phone"
                          placeholder="e.g. +234 800 000 0000"
                          type="tel"
                          className="bg-card border-border/60 focus:border-yellow-500/60 py-5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  className="w-full gold-gradient text-black font-bold py-6 text-base"
                  onClick={() => {
                    form.trigger(["fullName", "phoneNumber"]).then((valid) => {
                      if (valid) setStep(2);
                    });
                  }}
                  data-testid="button-next-step"
                >
                  Continue <ChevronRight size={18} className="ml-1" />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center gap-2">
                        <MapPin size={14} className="text-yellow-500" /> Your Country
                      </FormLabel>
                      <Select onValueChange={(v) => { field.onChange(v); onCountryChange(v); }} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-country" className="bg-card border-border/60 py-6">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {COUNTRIES.map((c) => (
                            <SelectItem key={c.code} value={c.code} data-testid={`option-country-${c.code}`}>
                              {c.flag} {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedCountry && (
                  <div className="glass-card rounded-xl p-4 space-y-2 border border-yellow-500/20">
                    <p className="text-muted-foreground text-xs uppercase tracking-wide">Your Mining Earnings Preview</p>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Daily mining</span>
                        <span className="font-semibold text-sm text-green-400">{formatDualCurrency(100, selectedCountry)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Min withdrawal</span>
                        <span className="font-semibold text-sm text-yellow-400">{formatDualCurrency(1000, selectedCountry)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Max withdrawal</span>
                        <span className="font-semibold text-sm text-yellow-400">{formatDualCurrency(5000, selectedCountry)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                      Currency: {selectedCountry.flag} {selectedCountry.currency} ({selectedCountry.currencyCode})
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-3 bg-yellow-500/5 rounded-xl p-4 border border-yellow-500/10">
                  <Shield size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By creating an account, you agree to GlobalMinersPay's Terms of Service, AML Policy, and confirm that you are 18+ years old.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1 py-6" onClick={() => setStep(1)} data-testid="button-back">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gold-gradient text-black font-bold py-6"
                    disabled={loading}
                    data-testid="button-register"
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
