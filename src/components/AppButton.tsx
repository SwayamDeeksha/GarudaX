import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme/useTheme";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  children?: ReactNode;
};

export function AppButton({
  title,
  onPress,
  variant = "primary",
  icon,
  disabled,
  children,
}: Props) {
  const theme = useTheme();

  const stylesMap = {
    primary: {
      backgroundColor: theme.primary,
      textColor: "#FFFFFF",
      borderColor: "transparent",
    },
    secondary: {
      backgroundColor: "transparent",
      textColor: theme.text,
      borderColor: theme.primary,
    },
    ghost: {
      backgroundColor: "transparent",
      textColor: theme.text,
      borderColor: "transparent",
    },
    danger: {
      backgroundColor: "#EF4444",
      textColor: "#FFFFFF",
      borderColor: "transparent",
    },
  };

  const current = stylesMap[variant];

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        paddingHorizontal: 20,
        backgroundColor: current.backgroundColor,
        borderWidth: current.borderColor !== "transparent" ? 1 : 0,
        borderColor: current.borderColor,
        opacity: pressed || disabled ? 0.7 : 1,

        // 🔥 elevation (makes button stand out)
        shadowColor: "#000",
        shadowOpacity: variant === "primary" ? 0.25 : 0,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: variant === "primary" ? 4 : 0,
      })}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={current.textColor}
          style={{ marginRight: 6 }}
        />
      )}

      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: current.textColor,
        }}
      >
        {title}
      </Text>

      {children}
    </Pressable>
  );
}