import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

type AvailabilityProps = {
  filter: "all" | "accepted";
};

export default function RidesList({filter}: AvailabilityProps) {
  const color = useThemeColor({ light: "#fefefe", dark: "#fff" }, 'background');

  return (
    <View style={styles.container}>
        <ThemedView style={styles.rideContainer}>
        <ThemedText>Ride</ThemedText>
        </ThemedView>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {

    },
    rideContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 9,
        shadowOpacity: .5,
        borderRadius: 15,
        marginHorizontal: 16,
        marginVertical: 4,
    },
});