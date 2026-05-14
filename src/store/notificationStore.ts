import { create } from "zustand";
import { backend } from "@/services/backend";
import { NotificationItem, Ticket } from "@/types";
import { makeId } from "@/lib/format";

type NotificationState = {
  notifications: NotificationItem[];
  tickets: Ticket[];
  error: string | null;
  loadNotifications: () => Promise<void>;
  raiseTicket: (subject: string) => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  tickets: [{ id: "tic_1001", subject: "Where is my AED transfer?", status: "In Review", createdAt: "2026-05-12T09:00:00.000Z" }],
  error: null,
  async loadNotifications() {
    try {
      const notifications = await backend.notifications.list();
      set({ notifications, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Unable to load notifications" });
    }
  },
  raiseTicket(subject) {
    set({ tickets: [{ id: makeId("tic"), subject, status: "Open", createdAt: new Date().toISOString() }, ...get().tickets] });
  }
}));
