import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function AppInput({ label, error, className, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-slate-200">{label}</Text>
      <TextInput
        placeholderTextColor="#7C8AA5"
        className={`min-h-13 rounded-xl border border-white/10 bg-navy-900 px-4 text-base text-white ${className || ""}`}
        {...props}
      />
      {error ? <Text className="mt-1 text-xs text-red-300">{error}</Text> : null}
    </View>
  );
}
