import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import  Button from "../ui/Button";
import  Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/providers/AuthProvider";

type ThemeSelectorProps = {
  onClose: () => void;
};

const ThemeSelector = ({onClose} : ThemeSelectorProps) => {
  const themeColor = useThemeColor({ light: "#151515", dark: "#fefefe" }, 'background');
  const {updateUserTheme} = useAuth();
  return (
      <ThemedView style={styles.container}>
        <View style={{position: 'absolute', top: 64, left: 32}}>
          <Button mod={["white", "square"]} onPress={onClose}>
            <AntDesign name='arrowleft' size={24} color={themeColor}/>
          </Button>
        </View>
        <ThemedText style={styles.title}>Kies een thema</ThemedText>
        <Button onPress={() => {if (updateUserTheme) updateUserTheme("light")}}>
          <Text>Light</Text>
        </Button>
        <Button onPress={() =>  {if (updateUserTheme) updateUserTheme("dark")}}>
          <Text>Dark</Text>
        </Button>
        <Button onPress={() =>  {if (updateUserTheme) updateUserTheme("auto")}} >
          <Text>System</Text>
        </Button>
      </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ThemeSelector;
