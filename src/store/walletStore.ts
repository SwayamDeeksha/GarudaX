import { create } from "zustand";
import { backend } from "@/services/backend";
import { Wallet } from "@/types";

type WalletState = {
  wallets: Wallet[];
  loading: boolean;
  error: string | null;
  loadWallets: () => Promise<void>;
};

export const useWalletStore = create<WalletState>((set) => ({
  wallets: [],
  loading: false,
  error: null,
  async loadWallets() {
    set({ loading: true, error: null });
    try {
      const wallets = await backend.wallets.list();
      set({ wallets, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Unable to load wallets" });
    }
  }
}));
