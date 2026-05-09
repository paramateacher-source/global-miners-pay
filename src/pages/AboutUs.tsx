import { useLocation } from "wouter";
import { ArrowLeft, MapPin, Award, Shield, Globe, Users, TrendingUp, CheckCircle } from "lucide-react";
import { LICENSE_NUMBER } from "@/lib/storage";

export default function AboutUsPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-yellow-950/40 to-transparent px-4 pt-10 pb-6">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 50% 0%, rgba(218,165,32,0.9), transparent 70%)` }} />
        <div className="flex items-center gap-3 relative mb-4">
          <button onClick={() => setLocation("/dashboard")} className="w-9 h-9 rounded-full bg-card/50 flex items-center justify-center" data-testid="button-back">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-bold text-lg">About Us</h1>
        </div>
        <div className="relative text-center">
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-3 shadow-xl">
            <span className="text-4xl">⛏️</span>
          </div>
          <h2 className="text-2xl font-bold gold-text" style={{ fontFamily: "Rajdhani, sans-serif" }}>GlobalMinersPay</h2>
          <p className="text-muted-foreground text-sm mt-1">The World's Premier Digital Mining Platform</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* License & Registration */}
        <div className="glass-card rounded-2xl p-5 space-y-3 border border-yellow-500/20">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-yellow-400">Official Registration</h3>
          <div className="space-y-2">
            {[
              { icon: <Award size={14} className="text-yellow-500" />, label: "License Number", value: LICENSE_NUMBER },
              { icon: <MapPin size={14} className="text-yellow-500" />, label: "Registered Location", value: "United States of America" },
              { icon: <Globe size={14} className="text-yellow-500" />, label: "Jurisdiction", value: "Federal, United States" },
              { icon: <Shield size={14} className="text-yellow-500" />, label: "Regulatory Status", value: "Fully Compliant" },
              { icon: <CheckCircle size={14} className="text-green-500" />, label: "Operational Since", value: "2021" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="shrink-0">{icon}</span>
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">{label}</span>
                  <span className="text-xs font-medium text-right max-w-40">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Globe size={16} className="text-yellow-500" /> Our Mission
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            GlobalMinersPay was founded with a singular mission: to democratize digital wealth creation and make financial freedom accessible to every individual on the planet, regardless of their location, background, or economic status.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We believe that technology should empower people. Our proprietary cloud mining infrastructure allows anyone with a smartphone to participate in the digital economy and earn consistent daily rewards — up to $100 per day — simply by using our platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Users size={20} className="text-yellow-500" />, value: "2.8M+", label: "Active Miners" },
            { icon: <Globe size={20} className="text-yellow-500" />, value: "180+", label: "Countries" },
            { icon: <TrendingUp size={20} className="text-yellow-500" />, value: "$420M+", label: "Total Paid Out" },
            { icon: <Shield size={20} className="text-yellow-500" />, value: "99.9%", label: "Uptime" },
          ].map(({ icon, value, label }) => (
            <div key={label} className="glass-card rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">{icon}</div>
              <p className="text-xl font-bold gold-text">{value}</p>
              <p className="text-muted-foreground text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp size={16} className="text-yellow-500" /> How GlobalMinersPay Works
          </h3>
          {[
            { step: "1", title: "Register", desc: "Create your free account with your name, phone number, and country." },
            { step: "2", title: "Verify Identity", desc: "Complete the one-time $50 USDT Gateway Verification to confirm you are a real human user." },
            { step: "3", title: "Mine Daily", desc: "Tap the mine button once every 24 hours to claim your $100 daily reward." },
            { step: "4", title: "Accumulate", desc: "Your earnings build up in your wallet. Minimum withdrawal is $1,000." },
            { step: "5", title: "Withdraw", desc: "Use your secure 4-digit PIN to request withdrawals of $1,000–$5,000." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0 text-sm font-bold text-black">
                {step}
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold">Our Technology</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            GlobalMinersPay operates a distributed cloud mining network utilizing advanced ASIC and GPU farms located across data centers in the United States, Singapore, and Iceland. Our infrastructure processes over 180 petahashes per second (PH/s), placing us among the top-tier mining operations globally.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Revenue generated from our mining operations is distributed daily to our registered users through our proprietary reward distribution engine. Every user receives an equal share of the daily mining profits, averaged to $100 per active miner per day.
          </p>
        </div>

        {/* Security */}
        <div className="glass-card rounded-2xl p-5 space-y-3 border border-green-500/15">
          <h3 className="font-semibold flex items-center gap-2">
            <Shield size={16} className="text-green-500" /> Security & Trust
          </h3>
          {[
            "256-bit SSL/TLS encryption for all data transmission",
            "Cold storage for 95% of platform assets",
            "Two-factor authentication on all admin accounts",
            "Regular third-party security audits",
            "AML/KYC compliant verification process",
            "GDPR-compliant data handling practices",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle size={13} className="text-green-500 mt-0.5 shrink-0" />
              <p className="text-muted-foreground text-xs">{item}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h3 className="font-semibold">Contact Us</h3>
          <p className="text-muted-foreground text-xs">Email: support@globalminerspy.com</p>
          <p className="text-muted-foreground text-xs">Address: 1234 Innovation Drive, Suite 500, San Francisco, CA 94105, United States</p>
          <p className="text-muted-foreground text-xs">Business Hours: Monday–Friday, 9 AM–6 PM EST</p>
        </div>

        <p className="text-center text-muted-foreground text-xs pb-4">
          © 2024 GlobalMinersPay Inc. All rights reserved. Licensed under {LICENSE_NUMBER}
        </p>
      </div>
    </div>
  );
}
