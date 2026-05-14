import { create } from "zustand";
import { backend } from "@/services/backend";
import { CurrencyCode } from "@/types";

type ExchangeState = {
  rates: Record<string, number>;
  loading: boolean;
  error: string | null;
  loadRates: () => Promise<void>;
  convert: (from: CurrencyCode, to: CurrencyCode, amount: number) => Promise<{ rate: number; convertedAmount: number; fee: number; updatedAt: string }>;
};

export const useExchangeStore = create<ExchangeState>((set) => ({
  rates: {},
  loading: false,
  error: null,
  async loadRates() {
    set({ loading: true, error: null });
    try {
      const rates = await backend.exchange.rates();
      set({ rates, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Unable to load exchange rates" });
    }
  },
  async convert(from, to, amount) {
    return backend.exchange.convert(from, to, amount);
  }
}));
