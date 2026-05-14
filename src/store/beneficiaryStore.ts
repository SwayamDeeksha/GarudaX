import { create } from "zustand";
import { backend } from "@/services/backend";
import { Beneficiary } from "@/types";

type BeneficiaryState = {
  beneficiaries: Beneficiary[];
  loading: boolean;
  error: string | null;
  loadBeneficiaries: () => Promise<void>;
  addBeneficiary: (input: Omit<Beneficiary, "id">) => Promise<Beneficiary>;
  updateBeneficiary: (id: string, input: Partial<Beneficiary>) => Promise<void>;
  removeBeneficiary: (id: string) => Promise<void>;
};

export const useBeneficiaryStore = create<BeneficiaryState>((set, get) => ({
  beneficiaries: [],
  loading: false,
  error: null,
  async loadBeneficiaries() {
    set({ loading: true, error: null });
    try {
      const beneficiaries = await backend.beneficiaries.list();
      set({ beneficiaries, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Unable to load beneficiaries" });
    }
  },
  async addBeneficiary(input) {
    const created = await backend.beneficiaries.create(input);
    set({ beneficiaries: [created, ...get().beneficiaries] });
    return created;
  },
  async updateBeneficiary(id, input) {
    await backend.beneficiaries.update(id, input);
    set({ beneficiaries: get().beneficiaries.map((item) => (item.id === id ? { ...item, ...input } : item)) });
  },
  async removeBeneficiary(id) {
    await backend.beneficiaries.remove(id);
    set({ beneficiaries: get().beneficiaries.filter((item) => item.id !== id) });
  }
}));
