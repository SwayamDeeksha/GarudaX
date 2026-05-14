import { useState } from "react";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useNotificationStore } from "@/store/notificationStore";

export default function RaiseTicketScreen() {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const raiseTicket = useNotificationStore((state) => state.raiseTicket);
  return (
    <Screen>
      <ScreenHeader title="Raise ticket" subtitle="Create a sandbox support request." />
      <AppInput label="Subject" value={subject} onChangeText={setSubject} />
      <AppInput label="Details" value={details} onChangeText={setDetails} multiline />
      <AppButton title="Submit ticket" icon="send" onPress={() => { raiseTicket(subject || "Support request"); router.replace("/support/tickets"); }} />
    </Screen>
  );
}
