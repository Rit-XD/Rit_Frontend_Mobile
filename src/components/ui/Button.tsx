import { Pressable, StyleSheet, Text, View } from "react-native";
import { forwardRef } from "react";
import { Colors, primaryColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

type ButtonProps = {
  text: string;
  icon?: string;
  family?: "antdesign";
  mod?: ["white"?, "square"?]; 
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, icon, family, mod, ...pressableProps }, ref) => {
    if (icon && family) {
      if(family === "antdesign") return (
        <Pressable ref={ref} {...pressableProps} style={[styles.container, mod?.includes("white")? {backgroundColor: "white"}: {}, mod?.includes("square")? {borderRadius: 15}: {}]}>
          <AntDesign name={icon} size={24} color={mod?.includes("white")? "#151515": "white"} />
        </Pressable>
      )
    }
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
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
