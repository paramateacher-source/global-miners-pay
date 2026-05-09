declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  ready(): void;
  expand(): void;
  close(): void;
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    start_param?: string;
  };
  colorScheme: "light" | "dark";
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  HapticFeedback: {
    impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
    notificationOccurred(type: "error" | "success" | "warning"): void;
    selectionChanged(): void;
  };
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback: (confirmed: boolean) => void): void;
  sendData(data: string): void;
  openLink(url: string): void;
  openTelegramLink(url: string): void;
}

export function getTelegram(): TelegramWebApp | null {
  return window.Telegram?.WebApp || null;
}

export function initTelegram(): void {
  const tg = getTelegram();
  if (tg) {
    tg.ready();
    tg.expand();
  }
}

export function getTelegramUser(): { id: string; username: string | null } | null {
  const tg = getTelegram();
  if (tg?.initDataUnsafe?.user) {
    return {
      id: String(tg.initDataUnsafe.user.id),
      username: tg.initDataUnsafe.user.username || null,
    };
  }
  return null;
}

export function hapticSuccess(): void {
  const tg = getTelegram();
  tg?.HapticFeedback?.notificationOccurred("success");
}

export function hapticError(): void {
  const tg = getTelegram();
  tg?.HapticFeedback?.notificationOccurred("error");
}

export function hapticImpact(): void {
  const tg = getTelegram();
  tg?.HapticFeedback?.impactOccurred("medium");
}

export function showTelegramAlert(msg: string): void {
  const tg = getTelegram();
  if (tg) {
    tg.showAlert(msg);
  } else {
    alert(msg);
  }
}

export function isTelegramMiniApp(): boolean {
  return typeof window !== "undefined" && !!window.Telegram?.WebApp;
}
