import { Pressable, StyleSheet, Text, View } from "react-native";
import { forwardRef } from "react";
import { Colors, primaryColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

type ButtonProps = {
  children?: React.ReactNode;
  mod?: ["white"?, "square"?]; 
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ children, mod, ...pressableProps }, ref) => {
  const whiteColor = useThemeColor({ light: "white", dark: "#151515" }, "text");

    return (
      <Pressable ref={ref} {...pressableProps} style={[styles.container, mod?.includes("white")? {backgroundColor: whiteColor, shadowColor: "rgba(0, 0, 0, 0.25)", shadowOffset: { width: 0, height: 1 }, shadowRadius: 9, shadowOpacity: 1,}: {}, mod?.includes("square")? {borderRadius: 15}: {}]}>
        {children}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default Button;
