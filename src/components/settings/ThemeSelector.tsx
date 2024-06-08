import React from "react";
import {  Modal, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import  Button from "../ui/Button";
import { Text } from "react-native-svg";

const ThemeSelector: React.FC = () => {
  return (
    <Modal>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Kies een thema</ThemedText>
        <Button onPress={() => console.log("Light Theme Selected")} >
          <Text>Light</Text>
        </Button>
        <Button onPress={() => console.log("Dark Theme Selected")}>
          <Text>Dark</Text>
        </Button>
        <Button onPress={() => console.log("System Theme Selected")} >
          <Text>System</Text>
        </Button>
      </ThemedView>
    </Modal>
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
