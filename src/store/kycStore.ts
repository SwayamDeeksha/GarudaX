import { create } from "zustand";
import { backend, KycSubmissionPayload } from "@/services/backend";
import { KycStatus } from "@/types";

type KycState = {
  status: KycStatus;
  loading: boolean;
  error: string | null;
  loadStatus: () => Promise<void>;
  submit: (payload: KycSubmissionPayload) => Promise<void>;
};

export const useKycStore = create<KycState>((set) => ({
  status: "Not Started",
  loading: false,
  error: null,
  async loadStatus() {
    set({ loading: true, error: null });
    try {
      const result = await backend.kyc.status();
      set({ status: result.status, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Unable to load KYC status" });
    }
  },
  async submit(payload) {
    set({ loading: true, error: null });
    try {
      const result = await backend.kyc.submit(payload);
      set({ status: result.status, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Unable to submit KYC" });
      throw error;
    }
  }
}));
