import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { KycStatus } from "@/types";

type AppSettingsState = {
  hasSeenOnboarding: boolean;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
  sessionTimeoutMinutes: number;
  kycStatus: KycStatus;
  setSeenOnboarding: () => void;
  setKycStatus: (status: KycStatus) => void;
  toggleBiometric: () => void;
  toggleTwoFactor: () => void;
};

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set, get) => ({
      hasSeenOnboarding: false,
      biometricEnabled: false,
      twoFactorEnabled: false,
      sessionTimeoutMinutes: 15,
      kycStatus: "Not Started",
      setSeenOnboarding: () => set({ hasSeenOnboarding: true }),
      setKycStatus: (kycStatus) => set({ kycStatus }),
      toggleBiometric: () => set({ biometricEnabled: !get().biometricEnabled }),
      toggleTwoFactor: () => set({ twoFactorEnabled: !get().twoFactorEnabled })
    }),
    {
      name: "garudax-app-settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasSeenOnboarding: state.hasSeenOnboarding,
        biometricEnabled: state.biometricEnabled,
        twoFactorEnabled: state.twoFactorEnabled,
        sessionTimeoutMinutes: state.sessionTimeoutMinutes,
        kycStatus: state.kycStatus
      })
    }
  )
);
