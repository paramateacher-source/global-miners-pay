export interface UserData {
  id: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number;
  registeredAt: number;
  balance: number;
  lastMineTime: number | null;
  miningActive: boolean;
  pinActivated: boolean;
  withdrawPin: string | null;
  paymentSubmitted: boolean;
  paymentStatus: "pending" | "approved" | "rejected" | null;
  paymentReceiptBase64: string | null;
  paymentSubmittedAt: number | null;
  totalWithdrawn: number;
  telegramId: string | null;
  telegramUsername: string | null;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userFullName: string;
  userCountry: string;
  amount: number;
  walletAddress: string;
  pin: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: number;
  processedAt: number | null;
}

export interface AdminNotification {
  id: string;
  type: "payment_receipt" | "withdrawal_request";
  userId: string;
  userFullName: string;
  userPhone: string;
  userCountry: string;
  receiptBase64?: string;
  amount?: number;
  walletAddress?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
  processedAt?: number;
  generatedPin?: string;
}

const STORAGE_KEYS = {
  CURRENT_USER: "gmp_current_user",
  USERS: "gmp_users",
  ADMIN_NOTIFICATIONS: "gmp_admin_notifications",
  WITHDRAWAL_REQUESTS: "gmp_withdrawals",
};

export function getCurrentUser(): UserData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: UserData): void {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getAllUsers(): UserData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getUserById(id: string): UserData | null {
  const users = getAllUsers();
  return users.find((u) => u.id === id) || null;
}

export function updateUser(updated: Partial<UserData> & { id: string }): void {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === updated.id);
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...updated };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    const current = getCurrentUser();
    if (current && current.id === updated.id) {
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(users[idx])
      );
    }
  }
}

export function getAdminNotifications(): AdminNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addAdminNotification(notif: AdminNotification): void {
  const notifications = getAdminNotifications();
  notifications.push(notif);
  localStorage.setItem(
    STORAGE_KEYS.ADMIN_NOTIFICATIONS,
    JSON.stringify(notifications)
  );
}

export function updateAdminNotification(
  id: string,
  updates: Partial<AdminNotification>
): void {
  const notifications = getAdminNotifications();
  const idx = notifications.findIndex((n) => n.id === id);
  if (idx >= 0) {
    notifications[idx] = { ...notifications[idx], ...updates };
    localStorage.setItem(
      STORAGE_KEYS.ADMIN_NOTIFICATIONS,
      JSON.stringify(notifications)
    );
  }
}

export function getWithdrawalRequests(): WithdrawalRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addWithdrawalRequest(req: WithdrawalRequest): void {
  const requests = getWithdrawalRequests();
  requests.push(req);
  localStorage.setItem(
    STORAGE_KEYS.WITHDRAWAL_REQUESTS,
    JSON.stringify(requests)
  );
}

export function generateUserId(): string {
  return "GMP" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function generateNotifId(): string {
  return "NOTIF" + Date.now().toString(36).toUpperCase();
}

export function generatePin(): string {
  const digits = Math.floor(1000 + Math.random() * 9000).toString();
  return digits;
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export const LICENSE_NUMBER = "GMP-US-2024-847392-X";
