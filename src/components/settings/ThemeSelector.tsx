import React from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

const ThemeSelector: React.FC = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Kies een thema</ThemedText>
      <Button
        title="Light"
        onPress={() => console.log("Light Theme Selected")}
      />
      <Button title="Dark" onPress={() => console.log("Dark Theme Selected")} />
      <Button
        title="System"
        onPress={() => console.log("System Theme Selected")}
      />
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
