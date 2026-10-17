export type InGameNotification = {
  type: "quest" | "achievement";
  title: string;
  description?: string;
};

export function notifyInGame(notification: InGameNotification): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<InGameNotification>("rankle-notification", { detail: notification }));
}
