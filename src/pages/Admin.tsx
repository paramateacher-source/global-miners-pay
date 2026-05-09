import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  getAdminNotifications,
  updateAdminNotification,
  updateUser,
  getAllUsers,
  generatePin,
  type AdminNotification,
  type UserData,
} from "@/lib/storage";
import { getBotInfo, getWebhookInfo, setupBotWebhook } from "@/lib/botSetup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Bell,
  LogOut,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Wallet,
  Bot,
  Link,
  RefreshCw,
} from "lucide-react";

const ADMIN_EMAIL = "gramfreemigration@gmail.com";
const ADMIN_PASSWORD = "Ologibadge";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

type LoginValues = z.infer<typeof loginSchema>;

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginValues) {
    if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Invalid credentials. Access denied.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
            <Shield size={28} className="text-red-500" />
          </div>
          <h1 className="text-xl font-bold">Admin Access</h1>
          <p className="text-muted-foreground text-sm">Restricted area — authorized personnel only</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Email</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="input-admin-email"
                      type="email"
                      placeholder="admin@email.com"
                      className="bg-card border-border/60 py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        data-testid="input-admin-password"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-card border-border/60 py-5 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6"
              data-testid="button-admin-login"
            >
              Access Admin Panel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function NotificationCard({
  notif,
  onApprove,
  onReject,
}: {
  notif: AdminNotification;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <div
      className={`glass-card rounded-2xl p-4 space-y-3 border ${
        notif.status === "pending"
          ? "border-amber-500/30"
          : notif.status === "approved"
          ? "border-green-500/30"
          : "border-red-500/30"
      }`}
      data-testid={`card-notif-${notif.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm truncate">{notif.userFullName}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                notif.status === "pending"
                  ? "bg-amber-500/15 text-amber-400"
                  : notif.status === "approved"
                  ? "bg-green-500/15 text-green-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {notif.status}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground shrink-0">
              {notif.type === "payment_receipt" ? "💳 PIN Request" : "💸 Withdrawal"}
            </span>
          </div>
          <p className="text-muted-foreground text-xs mt-0.5">{notif.userCountry}</p>
          <p className="text-muted-foreground text-xs">📞 {notif.userPhone}</p>
          <p className="text-muted-foreground text-xs">{new Date(notif.createdAt).toLocaleString()}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground shrink-0 mt-1"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {notif.amount && (
        <div className="bg-secondary/50 rounded-xl px-3 py-2 flex justify-between items-center">
          <span className="text-muted-foreground text-xs">Amount</span>
          <span className="font-bold text-yellow-400 text-sm">${notif.amount.toLocaleString()}</span>
        </div>
      )}

      {notif.walletAddress && expanded && (
        <div className="bg-secondary/50 rounded-xl px-3 py-2">
          <p className="text-muted-foreground text-xs mb-1">Wallet Address</p>
          <p className="font-mono text-xs break-all text-foreground/80">{notif.walletAddress}</p>
        </div>
      )}

      {expanded && notif.receiptBase64 && (
        <div className="space-y-2">
          <button
            onClick={() => setShowReceipt(!showReceipt)}
            className="text-yellow-400 text-xs font-medium flex items-center gap-1"
          >
            <Eye size={12} /> {showReceipt ? "Hide Receipt" : "View Payment Receipt"}
          </button>
          {showReceipt && (
            <div className="rounded-xl overflow-hidden border border-yellow-500/20">
              <img
                src={notif.receiptBase64}
                alt="Payment Receipt"
                className="w-full max-h-80 object-contain bg-black/30"
              />
            </div>
          )}
        </div>
      )}

      {notif.status === "approved" && notif.generatedPin && (
        <div className="bg-green-500/10 rounded-xl px-4 py-3 border border-green-500/20 text-center">
          <p className="text-muted-foreground text-xs mb-1">Generated Withdrawal PIN</p>
          <p className="text-3xl font-bold tracking-widest text-green-400">{notif.generatedPin}</p>
          <p className="text-muted-foreground text-xs mt-1">Sent to user · Permanent PIN</p>
        </div>
      )}

      {notif.status === "pending" && (
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
            onClick={() => onApprove(notif.id)}
            data-testid={`button-approve-${notif.id}`}
          >
            <CheckCircle size={14} className="mr-1" /> Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1 font-semibold"
            onClick={() => onReject(notif.id)}
            data-testid={`button-reject-${notif.id}`}
          >
            <XCircle size={14} className="mr-1" /> Reject
          </Button>
        </div>
      )}
    </div>
  );
}

function BotSetupTab() {
  const [botInfo, setBotInfo] = useState<{ username?: string; first_name?: string } | null>(null);
  const [webhookInfo, setWebhookInfo] = useState<{ url?: string; pending_update_count?: number } | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupMsg, setSetupMsg] = useState("");

  async function loadInfo() {
    setLoading(true);
    const [bi, wi] = await Promise.all([getBotInfo(), getWebhookInfo()]);
    if (bi.ok && bi.result) setBotInfo(bi.result);
    if (wi.ok && wi.result) setWebhookInfo(wi.result);
    setLoading(false);
  }

  useEffect(() => { loadInfo(); }, []);

  async function handleSetWebhook() {
    if (!webhookUrl) return;
    setLoading(true);
    const result = await setupBotWebhook(webhookUrl);
    setSetupMsg(result.ok ? "✅ Webhook set successfully!" : `❌ Error: ${result.description}`);
    await loadInfo();
    setLoading(false);
  }

  const autoUrl = typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}/api/telegram/webhook`
    : "";

  return (
    <div className="space-y-4">
      {/* Bot info */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2 text-sm">
            <Bot size={16} className="text-yellow-500" /> Bot Info
          </h3>
          <button onClick={loadInfo} className="text-muted-foreground" disabled={loading}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
        {botInfo ? (
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{botInfo.first_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Username</span>
              <span className="font-medium text-yellow-400">@{botInfo.username}</span>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">Loading bot info...</p>
        )}
      </div>

      {/* Webhook status */}
      <div className="glass-card rounded-2xl p-4 space-y-2">
        <h3 className="font-semibold flex items-center gap-2 text-sm">
          <Link size={16} className="text-yellow-500" /> Webhook Status
        </h3>
        {webhookInfo ? (
          <div className="space-y-1 text-xs">
            <div className="flex justify-between items-start gap-2">
              <span className="text-muted-foreground shrink-0">URL</span>
              <span className={`font-mono text-right break-all ${webhookInfo.url ? "text-green-400" : "text-red-400"}`}>
                {webhookInfo.url || "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending updates</span>
              <span className="font-medium">{webhookInfo.pending_update_count ?? 0}</span>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">Loading...</p>
        )}
      </div>

      {/* Set webhook */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="font-semibold text-sm">Set Webhook URL</h3>
        <p className="text-muted-foreground text-xs leading-relaxed">
          After deploying, set the webhook to receive Telegram bot updates. Use your deployed domain below.
        </p>
        <div className="space-y-2">
          <div className="bg-secondary/50 rounded-xl px-3 py-2">
            <p className="text-muted-foreground text-xs mb-1">Auto-detected URL</p>
            <p className="font-mono text-xs break-all text-yellow-400">{autoUrl}</p>
          </div>
          <Button
            size="sm"
            className="w-full gold-gradient text-black font-semibold"
            onClick={() => { setWebhookUrl(autoUrl); }}
          >
            Use Auto-detected URL
          </Button>
        </div>
        <div className="space-y-2">
          <Input
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://your-domain.replit.app/api/telegram/webhook"
            className="bg-card border-border/60 text-xs font-mono"
          />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            onClick={handleSetWebhook}
            disabled={!webhookUrl || loading}
          >
            {loading ? "Setting..." : "Set Webhook"}
          </Button>
        </div>
        {setupMsg && (
          <p className={`text-sm text-center ${setupMsg.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {setupMsg}
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-2xl p-4 space-y-2 border border-yellow-500/15">
        <h3 className="font-semibold text-sm">Setup Instructions</h3>
        {[
          "1. Deploy your app first using the Deploy button",
          "2. Come back to this Admin Panel (/gmp-admin-secure)",
          "3. Click 'Use Auto-detected URL' to fill in your deployed domain",
          "4. Click 'Set Webhook' to register with Telegram",
          "5. Test by sending /start to your bot",
          "6. Users tap the button and the Mini App opens",
        ].map((s) => (
          <p key={s} className="text-muted-foreground text-xs leading-relaxed">{s}</p>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [activeTab, setActiveTab] = useState<"notifications" | "users" | "bot">("notifications");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  function refresh() {
    setNotifications(getAdminNotifications());
    setUsers(getAllUsers());
  }

  useEffect(() => {
    if (isLoggedIn) refresh();
  }, [isLoggedIn]);

  function handleApprove(id: string) {
    const notif = notifications.find((n) => n.id === id);
    if (!notif) return;

    if (notif.type === "payment_receipt") {
      const pin = generatePin();
      updateAdminNotification(id, {
        status: "approved",
        processedAt: Date.now(),
        generatedPin: pin,
      });
      updateUser({
        id: notif.userId,
        paymentStatus: "approved",
        withdrawPin: pin,
        pinActivated: true,
      });
    } else {
      updateAdminNotification(id, {
        status: "approved",
        processedAt: Date.now(),
      });
    }
    refresh();
  }

  function handleReject(id: string) {
    const notif = notifications.find((n) => n.id === id);
    if (!notif) return;
    updateAdminNotification(id, { status: "rejected", processedAt: Date.now() });
    if (notif.type === "payment_receipt") {
      updateUser({ id: notif.userId, paymentStatus: "rejected" });
    }
    refresh();
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const filteredNotifs =
    filter === "all" ? notifications : notifications.filter((n) => n.status === filter);
  const pendingCount = notifications.filter((n) => n.status === "pending").length;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-red-950/30 border-b border-red-500/20 px-4 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center">
              <Shield size={18} className="text-red-400" />
            </div>
            <div>
              <h1 className="font-bold text-base">Admin Panel</h1>
              <p className="text-muted-foreground text-xs">GlobalMinersPay Control Center</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-1 text-muted-foreground text-xs"
            data-testid="button-admin-logout"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 mt-4">
        {[
          { label: "Total Users", value: users.length, icon: <Users size={16} className="text-blue-400" /> },
          { label: "Pending", value: pendingCount, icon: <Clock size={16} className="text-amber-400" /> },
          { label: "Approved", value: notifications.filter((n) => n.status === "approved").length, icon: <CheckCircle size={16} className="text-green-400" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="glass-card rounded-xl p-3 text-center">
            <div className="flex justify-center mb-1">{icon}</div>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-muted-foreground text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mx-4 mt-4 bg-secondary/50 rounded-xl p-1">
        {(["notifications", "users", "bot"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all capitalize flex items-center justify-center gap-1 ${
              activeTab === tab ? "gold-gradient text-black" : "text-muted-foreground"
            }`}
            data-testid={`tab-${tab}`}
          >
            {tab === "notifications" ? <Bell size={13} /> : tab === "users" ? <Users size={13} /> : <Bot size={13} />}
            {tab}
            {tab === "notifications" && pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4 space-y-3">
        {activeTab === "notifications" && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(["pending", "all", "approved", "rejected"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 capitalize transition-all ${
                    filter === f ? "gold-gradient text-black" : "bg-secondary text-muted-foreground"
                  }`}
                  data-testid={`filter-${f}`}
                >
                  {f}{f === "pending" && pendingCount > 0 ? ` (${pendingCount})` : ""}
                </button>
              ))}
            </div>

            {filteredNotifs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No {filter === "all" ? "" : filter} notifications</p>
              </div>
            ) : (
              filteredNotifs.slice().reverse().map((notif) => (
                <NotificationCard key={notif.id} notif={notif} onApprove={handleApprove} onReject={handleReject} />
              ))
            )}
          </>
        )}

        {activeTab === "users" && (
          <>
            {users.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No registered users yet</p>
              </div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="glass-card rounded-2xl p-4 space-y-2" data-testid={`card-user-${user.id}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{user.fullName}</p>
                      <p className="text-muted-foreground text-xs">{user.country} · {user.phoneNumber}</p>
                      <p className="text-muted-foreground text-xs">ID: {user.id}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-yellow-400 font-bold text-sm">${user.balance.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.paymentStatus === "approved" ? "bg-green-500/15 text-green-400"
                        : user.paymentStatus === "pending" ? "bg-amber-500/15 text-amber-400"
                        : user.paymentStatus === "rejected" ? "bg-red-500/15 text-red-400"
                        : "bg-secondary text-muted-foreground"
                      }`}>
                        {user.paymentStatus || "unverified"}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-secondary/50 rounded-lg px-2 py-1.5">
                      <p className="text-muted-foreground">Balance</p>
                      <p className="font-medium">${user.balance.toFixed(2)}</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg px-2 py-1.5">
                      <p className="text-muted-foreground">Withdrawn</p>
                      <p className="font-medium">${user.totalWithdrawn.toFixed(2)}</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg px-2 py-1.5">
                      <p className="text-muted-foreground">PIN</p>
                      <p className="font-medium text-green-400">{user.withdrawPin || "Not set"}</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg px-2 py-1.5 flex items-center gap-1">
                      <div>
                        <p className="text-muted-foreground">Currency</p>
                        <p className="font-medium">{user.currencyCode}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs">Registered: {new Date(user.registeredAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === "bot" && <BotSetupTab />}
      </div>
    </div>
  );
}
