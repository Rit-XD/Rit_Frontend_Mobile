import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import { forwardRef } from "react";
import { Colors, primaryColor } from "@/constants/Colors";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";


type KeyboardType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'url';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardType;
  password?: boolean;
  lightColor?: string;
  darkColor?: string;
};


export default function Input({value, onChangeText, placeholder, keyboardType, password, lightColor, darkColor}: InputProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <View style={styles.container}>
            <TextInput
              value={value? value : "" }
              onChangeText={onChangeText}
              placeholder={placeholder? placeholder : "" }
              style={[{ color }, styles.input ]}
              keyboardType={keyboardType? keyboardType : 'default' }
              secureTextEntry={password && !showPassword? true : false}
            />
            {password && (
                <Text onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>Toon Wachtwoord</Text>
            )}
        </View>
    );
  };

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