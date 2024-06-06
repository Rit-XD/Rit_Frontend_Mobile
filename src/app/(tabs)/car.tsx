import React, { useEffect, useMemo, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import BottomSheetComponent from "@/components/cars/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemedView } from "@/components/ThemedView";

const CarScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const origin = {
    latitude: 51.02735567847175,
    longitude: 4.478807550388861,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={origin}
          // provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
          showsTraffic
        />
        <BottomSheetComponent />
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default CarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "104%",
  },
});
