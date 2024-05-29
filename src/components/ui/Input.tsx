import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { forwardRef } from "react";
import { Colors, primaryColor } from "@/constants/Colors";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type AutoCompleteType =
  | "additional-name"
  | "address-line1"
  | "address-line2"
  | "birthdate-day"
  | "birthdate-full"
  | "birthdate-month"
  | "birthdate-year"
  | "cc-csc"
  | "cc-exp"
  | "cc-exp-day"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-number"
  | "cc-name"
  | "cc-given-name"
  | "cc-middle-name"
  | "cc-family-name"
  | "cc-type"
  | "country"
  | "current-password"
  | "email"
  | "family-name"
  | "gender"
  | "given-name"
  | "honorific-prefix"
  | "honorific-suffix"
  | "name"
  | "name-family"
  | "name-given"
  | "name-middle"
  | "name-middle-initial"
  | "name-prefix"
  | "name-suffix"
  | "new-password"
  | "nickname"
  | "one-time-code"
  | "organization"
  | "organization-title"
  | "password"
  | "password-new"
  | "postal-address"
  | "postal-address-country"
  | "postal-address-extended"
  | "postal-address-extended-postal-code"
  | "postal-address-locality"
  | "postal-address-region"
  | "postal-code"
  | "street-address"
  | "sms-otp"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-device"
  | "url"
  | "username"
  | "username-new"
  | "off";

type KeyboardType =
  | "default"
  | "number-pad"
  | "decimal-pad"
  | "numeric"
  | "email-address"
  | "phone-pad"
  | "url";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardType;
  password?: boolean;
  lightColor?: string;
  darkColor?: string;
  autoComplete?: AutoCompleteType;
  style?: StyleProp<TextStyle>;
};

export default function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  password,
  lightColor,
  darkColor,
  autoComplete,
  style,
}: InputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        value={value ? value : ""}
        onChangeText={onChangeText}
        placeholder={placeholder ? placeholder : ""}
        style={[styles.input, { color }, style]}
        keyboardType={keyboardType ? keyboardType : "default"}
        secureTextEntry={password && !showPassword ? true : false}
        autoComplete={autoComplete ? autoComplete : "off"}
      />
      {password && (
        <Text
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPassword}
        >
          Toon Wachtwoord
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    borderWidth: 2,
    borderColor: "#D9D9D9",
    padding: 18,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  showPassword: {
    position: "absolute",
    right: 10,
    top: 23,
    color: primaryColor,
  },
});
