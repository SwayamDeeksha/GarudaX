import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { sourceOfFunds, transferPurposes } from "@/constants/options";
import { useTransferStore } from "@/store/transferStore";

function ChoiceList({ title, options, value, onChange }: { title: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-slate-200">{title}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => (
          <Pressable key={option} onPress={() => onChange(option)} className={`rounded-xl border px-3 py-2 ${value === option ? "border-gold-500 bg-gold-500" : "border-white/10 bg-navy-900"}`}>
            <Text className={`text-sm font-bold ${value === option ? "text-navy-950" : "text-white"}`}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function SendMoneyPurposeScreen() {
  const setDraft = useTransferStore((state) => state.setDraft);
  const [purpose, setPurpose] = useState("Family Support");
  const [funds, setFunds] = useState("Salary");
  const [note, setNote] = useState("");
  return (
    <Screen>
      <ScreenHeader title="Purpose" subtitle="Step 6-7: purpose and source of funds." />
      <ChoiceList title="Transfer purpose" options={transferPurposes} value={purpose} onChange={setPurpose} />
      <ChoiceList title="Source of funds" options={sourceOfFunds} value={funds} onChange={setFunds} />
      <AppInput label="Optional note" value={note} onChangeText={setNote} multiline />
      <AppButton title="Review transfer" icon="document-text" onPress={() => { setDraft({ purpose, sourceOfFunds: funds }); router.push("/send/review"); }} />
    </Screen>
  );
}
