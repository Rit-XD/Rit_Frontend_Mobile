import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useAuth } from "@/providers/AuthProvider";

type AvailabilityProps = {
  filter: "all" | "accepted";
};

export default function RidesList({filter}: AvailabilityProps) {
    const { availableRides, acceptedRides } = useAuth();
    const color = useThemeColor({ light: "#fefefe", dark: "#fff" }, 'background');

    useEffect(() => {
        console.log(availableRides);
        console.log(acceptedRides);
    }, [availableRides, acceptedRides]);

    return (
        <View style={styles.container}>
            <ThemedView style={styles.rideContainer}>
            {availableRides.length? (
                <ThemedText>{availableRides[0].origin}</ThemedText>
            ) : (
                <ThemedText>Geen ritten</ThemedText>
            )}
            
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