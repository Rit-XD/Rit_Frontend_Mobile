import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Ride } from "@/types/Ride.type";
import MapView from "react-native-maps";
import {
  Ionicons,
  AntDesign,
  FontAwesome6,
  FontAwesome5,
} from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import Button from "../ui/Button";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Passenger } from "@/types/Passenger.type";
import { primaryColor } from "@/constants/Colors";
import MapViewDirections from "react-native-maps-directions";
import Geocoder from "react-native-geocoding";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import useCalendar from "@atiladev/usecalendar";

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!, { language: "nl" });

const {
  getPermission,
  createCalendar,
  addEventsToCalendar,
  deleteCalendar,
  openSettings,
  isThereEvents,
} = useCalendar("Rit planning", primaryColor, "Planning Rit");

type detailsProps = {
  ride: Ride;
  closeDetails: (returnToRides?: boolean) => void;
};
const RideDetails = ({ ride, closeDetails }: detailsProps) => {
  const { user, fetchRides } = useAuth();
  const themeColor = useThemeColor(
    { light: "#151515", dark: "#fefefe" },
    "background"
  );
  const [passenger, setPassenger] = React.useState<Passenger | null>(null);
  const origin = {
    address: ride.origin.split(", ")[0],
    city: ride.origin.split(", ")[1].split(" ")[1],
  };
  const destination = {
    address: ride.destination.split(", ")[0],
    city: ride.destination.split(", ")[1].split(" ")[1],
  };
  const [geocodedOrigin, setGeocodedOrigin] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [geocodedDestination, setGeocodedDestination] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [mapcenter, setMapCenter] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.125,
    longitudeDelta: 0.125,
  });
  const [showAcceptModal, setShowAcceptModal] = React.useState<
    "accept" | "calendar" | "cancel" | null
  >(null);

  const geocode = async (location: string) => {
    const geocodedOrigin = Geocoder.from(location).then((json) => {
      const location = json.results[0].geometry.location;
    });
    return await geocodedOrigin;
  };

  useEffect(() => {
    const geocode = async () => {
      const geocodedOrigin = await Geocoder.from(ride.origin).then((json) => {
        const location = json.results[0].geometry.location;
        setGeocodedOrigin({ latitude: location.lat, longitude: location.lng });
        return { latitude: location.lat, longitude: location.lng };
      });
      const geocodedDestination = await Geocoder.from(ride.destination).then(
        (json) => {
          const location = json.results[0].geometry.location;
          setGeocodedDestination({
            latitude: location.lat,
            longitude: location.lng,
          });
          return { latitude: location.lat, longitude: location.lng };
        }
      );

      const delta = ride.distance! / 60000;
      setMapCenter({
        latitude:
          (geocodedOrigin.latitude + geocodedDestination.latitude) / 2 -
          delta / 2.777777777,
        longitude:
          (geocodedOrigin.longitude + geocodedDestination.longitude) / 2,
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
    };
    geocode();
  }, []);

  useEffect(() => {
    const fetchPassenger = async () => {
      const { data, error } = await supabaseAdmin
        .from("Passengers")
        .select("*")
        .eq("id", ride.passenger_1)
        .single();

      if (error) console.log(error);
      setPassenger(data || null);
    };
    fetchPassenger();
  }, [ride.passenger_1]);

  const acceptRide = async () => {
    let query = supabaseAdmin
      .from("Rides")
      .update({ driver: user.id })
      .eq("id", ride.id)
      .single();
    const res = query.then((res) => {
      fetchRides();
      closeDetails(true);
    });
  };

  const cancelRide = async () => {
    const currentTime = new Date();
    const rideStartTime = new Date(ride.timestamp);

    const timeDifference = rideStartTime.getTime() - currentTime.getTime();
    const timeDifferenceInHours = timeDifference / (1000 * 3600);

    if (timeDifferenceInHours > 24) {
      let query = supabaseAdmin
        .from("Rides")
        .update({ driver: null })
        .eq("id", ride.id)
        .single();
      const res = query.then((res) => {
        fetchRides();
        closeDetails(true);
      });
    } else {
      Alert.alert(
        "Rit kan niet geannuleerd worden",
        "Je kan een rit niet annuleren minder dan 24 uur voor de starttijd."
      );
    }
  };
  const redirectToChat = (passengerId: string) => {
    return () => {
      closeDetails();
      return <Redirect href={`/chat`} />;
    };
  };

  const createCalAndEvent = async () => {
    const granted = await getPermission();
    if (granted) {
      await createCalendar();
      // console.log(new Date(ride.duration!).getTime() + (ride.duration!*1000));
      try {
        addEventsToCalendar(
          `Rit met ${passenger?.firstname}`,
          new Date(ride.timestamp),
          new Date(
            new Date(ride.timestamp).getTime() + (ride.duration! + 450) * 2000
          )
        );
        setShowAcceptModal(null);
      } catch (e) {
        console.log(e);
      }
    } else {
      openSettings();
    }
  };

  return (
    <View style={styles.modalContainer}>
      <MapView
        key={mapcenter.latitude + mapcenter.longitude}
        style={styles.map}
        initialRegion={mapcenter}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
      >
        <MapViewDirections
          origin={ride.origin}
          destination={ride.destination}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!}
          strokeWidth={4}
          strokeColor={primaryColor}
          precision="high"
        />
      </MapView>
      <View style={{ position: "absolute", top: 64, left: 32 }}>
        <Button onPress={() => closeDetails()} mod={["white", "square"]}>
          <AntDesign name="arrowleft" size={24} color={themeColor} />
        </Button>
      </View>
      <View
        style={{ position: "absolute", bottom: 64, width: "100%", height: 350 }}
      >
        <ThemedView
          style={{
            flex: 1,
            marginHorizontal: 24,
            alignItems: "center",
            borderRadius: 15,
            padding: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <ThemedText style={styles.name}>{passenger?.firstname}</ThemedText>
          {ride.driver === user.id && (
            <ThemedText
              style={styles.edit}
              onPress={() => setShowAcceptModal("cancel")}
            >
              ...
            </ThemedText>
          )}
          <ThemedText style={styles.distance}>
            {ride.distance ? Math.round(ride.distance / 1000) : ""} km
          </ThemedText>
          <ThemedText style={styles.date}>
            {ride.timestamp
              ? new Date(ride.timestamp).toLocaleDateString("nl-BE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "1 jan 0000"}
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <ThemedText style={styles.time}>
              {ride.timestamp
                ? new Date(ride.timestamp).toLocaleTimeString("nl-BE", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                : "00.00"}
            </ThemedText>
            {ride.driver === user.id && (
              <View style={{ position: "absolute", right: 0 }}>
                <FontAwesome5
                  name="calendar-plus"
                  size={24}
                  color={themeColor}
                  onPress={() => setShowAcceptModal("calendar")}
                />
              </View>
            )}
          </View>

          <View
            style={{
              borderBottomColor: themeColor,
              borderBottomWidth: 1,
              width: "100%",
              opacity: 0.2,
              height: 8,
            }}
          />
          <View style={styles.route}>
            <View style={{ alignItems: "center", gap: 8, marginRight: 8 }}>
              <FontAwesome6 name="location-dot" size={24} color={themeColor} />
              <View
                style={{
                  height: 32,
                  width: 1,
                  backgroundColor: themeColor,
                  opacity: 0.2,
                }}
              />
              <Ionicons name="flag" size={24} color={themeColor} />
            </View>
            <View>
              <View>
                <ThemedText>{origin.address}</ThemedText>
                <ThemedText style={{ fontSize: 14, opacity: 0.5 }}>
                  {origin.city}
                </ThemedText>
              </View>
              <View style={{ marginTop: 24 }}>
                <ThemedText>{destination.address}</ThemedText>
                <ThemedText style={{ fontSize: 14, opacity: 0.5 }}>
                  {destination.city}
                </ThemedText>
              </View>
            </View>
          </View>
          <Pressable
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: primaryColor,
              width: "150%",
              height: 48,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={
              ride.driver !== user.id
                ? () => setShowAcceptModal("accept")
                : redirectToChat(ride.passenger_1)
            }
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {ride.driver !== user.id ? "Accepteer" : "Stuur bericht"}
            </Text>
          </Pressable>
        </ThemedView>
      </View>
      {showAcceptModal === "accept" && (
        <Modal transparent>
          <Pressable
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "black",
              opacity: 0.75,
              position: "absolute",
            }}
            onPress={() => setShowAcceptModal(null)}
          />
          <ThemedView
            style={{
              margin: "auto",
              width: "75%",
              alignItems: "center",
              borderRadius: 15,
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                marginVertical: 16,
                color: primaryColor,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Rit accepteren?
            </Text>
            <ThemedText style={{ textAlign: "center", marginBottom: 16 }}>
              Ben je zeker dat je deze rit wilt accepteren?
            </ThemedText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 16,
                  borderColor: "#CCCCCC",
                  borderRightWidth: 0.5,
                  borderTopWidth: 0.5,
                }}
                onPress={() => setShowAcceptModal(null)}
              >
                <ThemedText>Terug</ThemedText>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 16,
                  borderColor: "#CCCCCC",
                  borderTopWidth: 0.5,
                  backgroundColor: primaryColor,
                }}
                onPress={acceptRide}
              >
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Accepteer
                </Text>
              </Pressable>
            </View>
          </ThemedView>
        </Modal>
      )}
      {showAcceptModal === "cancel" && (
        <Modal transparent>
          <Pressable
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "black",
              opacity: 0.75,
              position: "absolute",
            }}
            onPress={() => setShowAcceptModal(null)}
          />
          <ThemedView
            style={{
              margin: "auto",
              width: "75%",
              alignItems: "center",
              borderRadius: 15,
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                marginVertical: 16,
                color: primaryColor,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Rit annuleren
            </Text>
            <ThemedText
              style={{
                textAlign: "center",
                marginBottom: 16,
                marginHorizontal: 16,
              }}
            >
              Ben je zeker dat je deze rit wilt annuleren?
            </ThemedText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 16,
                  borderColor: "#CCCCCC",
                  borderRightWidth: 0.5,
                  borderTopWidth: 0.5,
                }}
                onPress={() => setShowAcceptModal(null)}
              >
                <ThemedText>Terug</ThemedText>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 16,
                  borderColor: "#CCCCCC",
                  borderTopWidth: 0.5,
                  backgroundColor: "red",
                }}
                onPress={cancelRide}
              >
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Rit annuleren
                </Text>
              </Pressable>
            </View>
          </ThemedView>
        </Modal>
      )}
      {showAcceptModal === "calendar" && (
        <Modal transparent>
          <Pressable
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "black",
              opacity: 0.75,
              position: "absolute",
            }}
            onPress={() => setShowAcceptModal(null)}
          />
          <ThemedView
            style={{
              margin: "auto",
              width: "75%",
              alignItems: "center",
              borderRadius: 15,
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                marginVertical: 16,
                color: primaryColor,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Rit kalender
            </Text>
            <ThemedText
              style={{
                textAlign: "center",
                marginBottom: 16,
                marginHorizontal: 16,
              }}
            >
              Wil je deze rit toevoegen aan je kalender?
            </ThemedText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 16,
                  borderColor: "#CCCCCC",
                  borderRightWidth: 0.5,
                  borderTopWidth: 0.5,
                }}
                onPress={() => setShowAcceptModal(null)}
              >
                <ThemedText>Terug</ThemedText>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 16,
                  borderColor: "#CCCCCC",
                  borderTopWidth: 0.5,
                  backgroundColor: primaryColor,
                }}
                onPress={createCalAndEvent}
              >
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Voeg toe
                </Text>
              </Pressable>
            </View>
          </ThemedView>
        </Modal>
      )}
    </View>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  map: {
    width: "100%",
    height: "110%",
  },
  edit: {
    fontSize: 36,
    position: "absolute",
    right: 14,
    top: 12,
  },
  name: {
    fontSize: 24,
    fontFamily: "Cocon",
  },
  distance: {
    fontSize: 32,
    fontFamily: "Cocon",
    paddingVertical: 16,
  },
  date: {
    fontSize: 18,
  },
  time: {
    fontSize: 18,
  },
  route: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 16,
    width: "100%",
  },
});
