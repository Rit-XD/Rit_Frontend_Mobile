import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useAuth } from "@/providers/AuthProvider";
import { Ride } from "@/types/Ride.type";
import { primaryColor } from "@/constants/Colors";
import { color } from "@rneui/themed/dist/config";



export default function RidesList() {
    const { availableRides, acceptedRides } = useAuth();
    const color = useThemeColor({ light: "#fefefe", dark: "#fff" }, 'background');
    const [filter, setFilter] = React.useState<"all" | "accepted">("all");

    if (filter === "all") {
        return (
            <View style={styles.container}>
                <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 24}}>
                    <View style={{ borderBottomColor: primaryColor, borderBottomWidth: 4}}>
                        <ThemedText style={{paddingTop: 24,paddingBottom: 4, paddingHorizontal: 8, fontSize: 22, color: primaryColor}}>Aanvragen</ThemedText>
                    </View>
                    <ThemedText style={{paddingTop: 24,paddingBottom: 4, paddingHorizontal: 8, fontSize: 22}} onPress={() => {setFilter("accepted")}}>Ritten</ThemedText>
    
                </View>
                <ScrollView>
                    {availableRides.length && (
                        <>
                        {availableRides.map((ride) => (
                            <ThemedView style={styles.rideContainer} key={ride.id}>
                                <View style={styles.rideContainerInner}>
                                    <View style={styles.colorCode}></View>
                                    <View style={styles.content}>
                                        <ThemedText>{ride.origin}</ThemedText>
                                        <ThemedText>{ride.destination}</ThemedText>
                                    </View>
                                </View>
                            </ThemedView>
                        ))}
                        </>
                    )}
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 24}}>
                    <ThemedText style={{paddingTop: 24,paddingBottom: 4, paddingHorizontal: 8, fontSize: 22}} onPress={() => {setFilter("all")}}>Aanvragen</ThemedText>
                    <View style={{borderBottomColor: primaryColor, borderBottomWidth: 4}}>
                        <ThemedText style={{paddingTop: 24,paddingBottom: 4, paddingHorizontal: 8, fontSize: 22, color: primaryColor}}>Ritten</ThemedText>
                    </View>
                </View>
                <ScrollView>
                    {acceptedRides.length && (
                        <>
                        {acceptedRides.map((ride) => (
                            <ThemedView style={styles.rideContainer} key={ride.id}>
                                <View style={styles.rideContainerInner}>
                                    <View style={styles.colorCode}></View>
                                    <View style={styles.content}>
                                        <ThemedText>{ride.origin}</ThemedText>
                                        <ThemedText>{ride.destination}</ThemedText>
                                    </View>
                                </View>
                            </ThemedView>
                        ))}
                        </>
                    )}
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -16,
    },
    rideContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        padding: 0,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 9,
        shadowOpacity: 1,
        borderRadius: 15,
        marginHorizontal: 16,
        marginVertical: 4,
        position: "relative",
    },
    rideContainerInner: {
        overflow: "hidden",
        height: "100%",
        borderRadius: 15,
    },
    content: {
        backgroundColor: "transparent",
        marginLeft: 32,
        height: "100%",
        justifyContent: "center",
    },
    colorCode: {
        position: "absolute",
        width: 8,
        height: "100%",
        backgroundColor: primaryColor,
    },

});