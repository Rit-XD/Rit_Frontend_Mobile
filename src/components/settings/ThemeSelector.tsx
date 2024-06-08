import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import  Button from "../ui/Button";
import  Modal from "react-native-modal";
import { AntDesign, FontAwesome, Octicons, Ionicons } from "@expo/vector-icons";
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
        <Button onPress={() => {if (updateUserTheme) updateUserTheme("light")}} style={styles.button}>
          <FontAwesome name="moon-o" size={24} color="white" />
          <Text style={{color: "white", fontWeight: "bold", marginLeft: 8}}>Lichte modus</Text>
        </Button>
        <Button onPress={() =>  {if (updateUserTheme) updateUserTheme("dark")}} style={styles.button}>
          <Octicons name="sun" size={24} color="white" />
          <Text style={{color: "white", fontWeight: "bold", marginLeft: 8}}>Donkere modus</Text>        
        </Button>
        <Button onPress={() =>  {if (updateUserTheme) updateUserTheme("auto")}} style={styles.button}>
          <Ionicons name="phone-portrait-outline" size={24} color="white" />
          <Text style={{color: "white", fontWeight: "bold", marginLeft: 8}}>Automatisch</Text>        
        </Button>
      </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24

  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",

  },
});

export default ThemeSelector;
