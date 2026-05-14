import { create } from "zustand";
import { tokenStorage } from "@/services/api";
import { backend, RegisterPayload } from "@/services/backend";
import { User } from "@/types";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  hydrated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  hydrated: false,
  error: null,
  async hydrate() {
    const token = await tokenStorage.get();
    if (!token) {
      set({ token: null, user: null, hydrated: true });
      return;
    }
    try {
      const user = await backend.auth.me();
      set({ token, user, hydrated: true, error: null });
    } catch (error) {
      await tokenStorage.clear();
      set({ token: null, user: null, hydrated: true, error: error instanceof Error ? error.message : "Session expired" });
    }
  },
  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const result = await backend.auth.login(email, password);
      await tokenStorage.set(result.token);
      set({ token: result.token, user: result.user, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Login failed" });
      throw error;
    }
  },
  async register(payload) {
    set({ loading: true, error: null });
    try {
      const result = await backend.auth.register(payload);
      await tokenStorage.set(result.token);
      set({ token: result.token, user: result.user, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Registration failed" });
      throw error;
    }
  },
  async logout() {
    await backend.auth.logout();
    set({ token: null, user: null });
  }
}));
