import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useAuth } from "@/providers/AuthProvider";
import { primaryColor, secondaryColor } from "@/constants/Colors";



export default function RidesList() {
    const { availableRides, acceptedRides } = useAuth();
    const color = useThemeColor({ light: "#fefefe", dark: "#fff" }, 'background');
    const [filter, setFilter] = React.useState<"all" | "accepted">("all");

    const parseAddress = (address: string) => {
        return address.split(",")[0];
    }
    const parseDateTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("nl-BE", {day: "numeric", month: "long", year: "numeric"}) + " - " + date.toLocaleTimeString("nl-BE", {hour: "2-digit", minute: "2-digit"});
    }

    function addDays(date: Date, days: number) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
    const determineColor = (timestamp: string) => {
        const d1 = new Date(timestamp);
        const d2 = new Date();
        if(addDays(d2, 1) > d1) return styles.red;
        else if (addDays(d2, 3) > d1) return styles.orange;
        else if (addDays(d2, 7) > d1) return styles.yellow;
        else return styles.green;
    }

        return (
            <View style={styles.container}>
                <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 24}}>
                    <View style={filter==="all"?{ borderBottomColor: primaryColor, borderBottomWidth: 4} : {}}>
                        <ThemedText style={[{paddingTop: 24,paddingBottom: 4, paddingHorizontal: 8, fontSize: 22}, filter==="all"? styles.active : {}]} onPress={() => {setFilter("all")}}>Aanvragen</ThemedText>
                    </View>
                    <View style={filter==="accepted"?{ borderBottomColor: primaryColor, borderBottomWidth: 4} : {}}>
                        <ThemedText style={[{paddingTop: 24,paddingBottom: 4, paddingHorizontal: 8, fontSize: 22}, filter==="accepted"? styles.active : {}]} onPress={() => {setFilter("accepted")}}>Ritten</ThemedText>
                    </View>
    
                </View>
                <ScrollView>
                    <View style={styles.listContainer}>
                    {(filter==="all"? availableRides.length : acceptedRides.length)? (
                        <>
                        {(filter==="all"? availableRides : acceptedRides).map((ride) => (
                        <ThemedView style={styles.rideContainer} key={ride.id} darkColor="#303030">
                            <View style={styles.rideContainerInner}>
                                <View style={[styles.colorCode, determineColor(ride.timestamp)]}></View>
                                <View style={styles.content}>
                                    <ThemedText style={styles.origin}>{parseAddress(ride.destination)}</ThemedText>
                                    <ThemedText style={styles.destination}>{parseDateTime(ride.timestamp)}</ThemedText>
                                </View>
                            </View>
                        </ThemedView>
                        ))}
                        </>
                    ) : (
                        <View style={{display: "flex", width: "100%", alignItems: "center"}}>
                            {filter==="all"? (
                                <ThemedText>Er zijn momenteel geen openstaande aanvragen.</ThemedText>
                            ) : (
                                <ThemedText>Je hebt momenteel geen ritten gepland.</ThemedText>
                            )}
                        </View>
                    )}
                    </View>
                </ScrollView>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -16,
    },
    active: {
        color: primaryColor,
    },
    listContainer: {
        marginVertical: 16,
    },
    rideContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 80,
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
    },
    red: {
        backgroundColor: "red",
    },
    orange: {
        backgroundColor: "orange",
    },
    yellow: {
        backgroundColor: "#FFDE5A",
    },
    green: {
        backgroundColor: "#29CC6A",
    },
    origin: {
        fontSize: 18,
        fontWeight: "bold",
    },
    destination: {
        fontSize: 16,
        color: "#666",
    }
});