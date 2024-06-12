import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useAuth } from "@/providers/AuthProvider";
import { primaryColor, secondaryColor } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import RideDetails from "./RideDetails";
import { Ride } from "@/types/Ride.type";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import { SlideInRight } from "react-native-reanimated";

export default function RidesList() {
  const { availableRides, acceptedRides, fetchRides, carecenters, getCarecenter } = useAuth();
  const color = useThemeColor({ light: "#fefefe", dark: "#fff" }, "background");
  const chevronColor = useThemeColor(
    { light: "#151515", dark: "#fefefe" },
    "background"
  );
  const [filter, setFilter] = React.useState<"all" | "accepted">("all");
  const [selectedRide, setSelectedRide] = React.useState<Ride | null>(null);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const parseDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("nl-BE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " - " +
      date.toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit" })
    );
  };

  function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  const determineColor = (timestamp: string) => {
    const d1 = new Date(timestamp);
    const d2 = new Date();
    if (addDays(d2, 1) > d1) return styles.red;
    else if (addDays(d2, 3) > d1) return styles.orange;
    else if (addDays(d2, 7) > d1) return styles.yellow;
    else return styles.green;
  };
  function closeDetails(returnToRides: boolean = false) {
    setSelectedRide(null);
    if (returnToRides) setFilter("accepted");
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          paddingHorizontal: 24,
        }}
      >
        <View
          style={
            filter === "all"
              ? { borderBottomColor: primaryColor, borderBottomWidth: 4 }
              : {}
          }
        >
          <ThemedText
            style={[
              {
                paddingTop: 24,
                paddingBottom: 4,
                paddingHorizontal: 8,
                fontSize: 22,
              },
              filter === "all" ? styles.active : {},
            ]}
            onPress={() => {
              setFilter("all");
            }}
          >
            Aanvragen
          </ThemedText>
        </View>
        <View
          style={
            filter === "accepted"
              ? { borderBottomColor: primaryColor, borderBottomWidth: 4 }
              : {}
          }
        >
          <ThemedText
            style={[
              {
                paddingTop: 24,
                paddingBottom: 4,
                paddingHorizontal: 8,
                fontSize: 22,
              },
              filter === "accepted" ? styles.active : {},
            ]}
            onPress={() => {
              setFilter("accepted");
            }}
          >
            Ritten
          </ThemedText>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <GestureHandlerRootView style={{height: 0}}>
            <RefreshControl refreshing={refreshing} onRefresh={fetchRides} tintColor={primaryColor}/>
          </GestureHandlerRootView>
        }
      >
        <View style={styles.listContainer}>
          {(filter === "all" ? availableRides.length : acceptedRides.length) ? (
            <>
              {(filter === "all" ? availableRides : acceptedRides).map(
                (ride) => (
                  <Pressable
                    onPress={() => setSelectedRide(ride)}
                    key={ride.id}
                  >
                    <ThemedView
                      style={styles.rideContainer}
                      darkColor="#303030"
                    >
                      <View style={styles.rideContainerInner}>
                        <View
                          style={[
                            styles.colorCode,
                            determineColor(ride.timestamp),
                          ]}
                        ></View>
                        <View style={styles.content}>
                          <ThemedText style={styles.origin}>
                            <RouteTitle ride={ride}/>
                          </ThemedText>
                          <ThemedText style={styles.destination}>
                            {parseDateTime(ride.timestamp)}
                          </ThemedText>
                        </View>
                      </View>
                      <View>
                        <Ionicons
                          name="chevron-forward"
                          size={24}
                          style={{ marginRight: 16 }}
                          color={chevronColor}
                        />
                      </View>
                    </ThemedView>
                  </Pressable>
                )
              )}
            </>
          ) : (
            <View
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              {filter === "all" ? (
                <ThemedText>
                  Er zijn momenteel geen openstaande aanvragen.
                </ThemedText>
              ) : (
                <ThemedText>Je hebt momenteel geen ritten gepland.</ThemedText>
              )}
            </View>
          )}
        </View>
      </ScrollView>
        <Modal
        isVisible={selectedRide !== null}
        animationIn={"slideInRight"}
        animationOut={"tada"}
        style={{margin: 0}}
        >
          {selectedRide? ( <RideDetails ride={selectedRide} closeDetails={closeDetails} /> ) : <></>}
        </Modal>
    </View>
  );
}

function RouteTitle({ ride }: { ride: Ride }) {
  const { getCarecenter } = useAuth();
  const parseAddress = (address: string) => {
    return address.split(",")[0];
  };
  const title = `${getCarecenter(ride.carecenter_id)?.name} - ${parseAddress(ride.destination)}`;
  if (title.length > 30) {
    return title.slice(0, 27) + "...";
  } else {
    return title;
  }
} 

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
  },
});
