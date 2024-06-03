import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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

    return (
        <View style={styles.container}>
            <ScrollView>
                    {availableRides.length && (
                        <>
                            {availableRides.map((ride) => (
                                <ThemedView style={styles.rideContainer}>
                                    <ThemedText>{ride.destination}</ThemedText>
                                </ThemedView>
                            ))}
                        </>
                    )}
            </ScrollView>


            {/* <ThemedView style={styles.rideContainer}>
            {availableRides.length? (
                <ThemedText>Geen ritten</ThemedText>
            ) : (
                <ThemedText>Geen ritten</ThemedText>
            )}
            </ThemedView> */}

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
        shadowOpacity: 1,
        borderRadius: 15,
        marginHorizontal: 16,
        marginVertical: 4,
    },
});