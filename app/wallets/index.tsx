import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { WalletCard } from "@/components/WalletCard";
import { useWalletStore } from "@/store/walletStore";

export default function WalletsScreen() {
  const wallets = useWalletStore((state) => state.wallets);
  const loadWallets = useWalletStore((state) => state.loadWallets);

  useEffect(() => {
    loadWallets();
  }, [loadWallets]);

  return (
    <Screen>
      <ScreenHeader title="Wallets" subtitle="Multi-currency balances and mock top-ups." rightIcon="add" onRightPress={() => undefined} />
      <View className="mb-4 flex-row gap-3">
        <View className="flex-1"><AppButton title="Converter" icon="swap-horizontal" onPress={() => router.push("/wallets/converter")} /></View>
        <View className="flex-1"><AppButton title="Mock top-up" variant="secondary" icon="add-circle" /></View>
      </View>
      {wallets.map((wallet) => <WalletCard key={wallet.currency} wallet={wallet} onPress={() => router.push(`/wallets/${wallet.currency}`)} />)}
      <Text className="mt-3 text-xs text-slate-400">Wallet actions are sandbox-only until regulated payment rails are connected.</Text>
    </Screen>
  );
}
