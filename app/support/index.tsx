import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function HelpCenterScreen() {
  return (
    <Screen>
      <ScreenHeader title="Help center" subtitle="Support for transfer, KYC, wallet, and security questions." />
      <AppButton title="Raise a ticket" icon="create" onPress={() => router.push("/support/raise-ticket")} />
      <AppButton title="My tickets" variant="secondary" icon="albums" onPress={() => router.push("/support/tickets")} />
      <AppButton title="FAQ" variant="secondary" icon="help-circle" onPress={() => router.push("/support/faq")} />
    </Screen>
  );
}
