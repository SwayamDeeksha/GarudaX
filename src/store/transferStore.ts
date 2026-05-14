import { create } from "zustand";
import { backend } from "@/services/backend";
import { Beneficiary, CurrencyCode, Quote, Transaction } from "@/types";

type TransferDraft = {
  sourceCurrency: CurrencyCode;
  destinationCurrency: CurrencyCode;
  amount: number;
  quote?: Quote;
  beneficiary?: Beneficiary;
  purpose?: string;
  sourceOfFunds?: string;
};

type TransferState = {
  draft: TransferDraft;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  setDraft: (draft: Partial<TransferDraft>) => void;
  getQuote: () => Promise<Quote>;
  createTransfer: () => Promise<Transaction>;
  markPaid: (id: string) => Promise<void>;
  loadTransactions: () => Promise<void>;
};

export const useTransferStore = create<TransferState>((set, get) => ({
  draft: { sourceCurrency: "USD", destinationCurrency: "INR", amount: 100 },
  transactions: [],
  loading: false,
  error: null,
  setDraft(draft) {
    set({ draft: { ...get().draft, ...draft } });
  },
  async getQuote() {
    const { sourceCurrency, destinationCurrency, amount } = get().draft;
    const quote = await backend.transfers.quote(sourceCurrency, destinationCurrency, amount);
    set({ draft: { ...get().draft, quote } });
    return quote;
  },
  async createTransfer() {
    const { draft } = get();
    if (!draft.quote || !draft.beneficiary || !draft.purpose) throw new Error("Transfer draft is incomplete");
    const transfer = await backend.transfers.create({ quote: draft.quote, beneficiary: draft.beneficiary, purpose: draft.purpose, sourceOfFunds: draft.sourceOfFunds });
    set({ transactions: [transfer, ...get().transactions] });
    return transfer;
  },
  async markPaid(id) {
    await backend.transfers.pay(id);
    set({ transactions: get().transactions.map((tx) => (tx.id === id ? { ...tx, status: "Payment Received" } : tx)) });
  },
  async loadTransactions() {
    set({ loading: true, error: null });
    try {
      const transactions = await backend.transfers.list();
      set({ transactions, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Unable to load transactions" });
    }
  }
}));
