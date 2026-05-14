import { Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";

const faqs = [
  ["How to send money", "Choose currencies, get a quote, select beneficiary, confirm purpose, and complete mock payment."],
  ["How exchange rates work", "Rates include indicative FX, markup, fees, and tax/GST before confirmation."],
  ["Why KYC is required", "Identity verification supports AML, sanctions screening, fraud prevention, and regulatory obligations."],
  ["Transfer delivery time", "Sandbox delivery is simulated. Real delivery depends on corridor, partners, and compliance checks."],
  ["Refunds and cancellations", "Refund and cancellation states are modeled but not connected to real payment rails."],
  ["Supported currencies", "USD, EUR, GBP, INR, AED, SGD, AUD, CAD, JPY, CHF, SAR, QAR, MYR, THB."],
  ["Security and compliance", "JWT tokens use SecureStore, sensitive values are masked, and audit logs are planned."]
];

export default function FAQScreen() {
  return (
    <Screen>
      <ScreenHeader title="FAQ" subtitle="Common GarudaX demo questions." />
      {faqs.map(([title, body]) => (
        <View key={title} className="mb-3 rounded-2xl bg-navy-900 p-4">
          <Text className="text-base font-black text-white">{title}</Text>
          <Text className="mt-2 text-sm text-slate-300">{body}</Text>
        </View>
      ))}
    </Screen>
  );
}
