import { View, Text, StyleSheet, Image } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Button from "../ui/Button";
import { Icon } from "@rneui/themed";
import {
  FontAwesome,
  Ionicons,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { primaryColor } from "@/constants/Colors";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Car } from "@/types/Car.type";
import { useAuth } from "@/providers/AuthProvider";

const CarBottomSheetComponent = () => {
  const [car, setCar] = useState<Car | null>(null);
  const snapPoints = useMemo(() => ["22%", "87%"], []);

  const { acceptedRides } = useAuth();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.7}
        pressBehavior={"collapse"}
      />
    ),
    []
  );

  const background = useThemeColor(
    { light: "white", dark: "#151515" },
    "background"
  );

  const handleIndicator = useThemeColor(
    { light: "black", dark: "#fefefe" },
    "background"
  );

  const infoBackground = useThemeColor(
    { light: "white", dark: "#303030" },
    "background"
  );

  const arrow = useThemeColor({ light: "black", dark: "#fefefe" }, "icon");

  useEffect(() => {
    const fetchCar = async () => {
      const { data, error } = await supabaseAdmin
        .from("Car")
        .select("*")
        // .eq("id", acceptedRides[0].car)
        .eq("id", "4daa75d4-39a4-499b-a0a0-8fa843ca2ecc")
        .limit(1)
        .single();

      if (error) console.log(error);
      setCar(data || null);
    };
    fetchCar();
  }, []);

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleStyle={{ backgroundColor: background }}
      handleIndicatorStyle={{ backgroundColor: handleIndicator }}
    >
      <ThemedView>
        <ThemedView style={styles.centeredView}>
          {car?.picture && (
            <Image
              source={{ uri: car?.picture }}
              style={styles.carImage}
              resizeMode="contain"
            />
          )}
          <ThemedText style={styles.carTitle}>
            {car?.brand} {car?.model}
          </ThemedText>
          <ThemedText style={styles.carSubtitle}>{car?.plate}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.specsContainer}>
          <ThemedView style={styles.specsRow}>
            <FontAwesome
              style={{ color: primaryColor }}
              name="gears"
              size={16}
            />
            <ThemedText style={styles.text}>
              {car?.automatic === true ? "Automaat" : "Manueel"}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.specsRow}>
            <FontAwesome5
              style={{ color: primaryColor }}
              name="gas-pump"
              size={16}
            />
            <ThemedText style={styles.text}>{car?.fuel}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.specsRow}>
            <FontAwesome5
              name="wheelchair"
              size={16}
              style={{ color: primaryColor }}
            />
            <ThemedText style={styles.text}>
              {car?.wheelchaircapacity === 1
                ? `${car?.wheelchaircapacity} plaats`
                : `${car?.wheelchaircapacity} plaatsen`}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedView style={styles.specsRow}>
              <SimpleLineIcons
                style={{ color: primaryColor }}
                name="speedometer"
                size={16}
              />
              <ThemedText style={styles.text}>Bereik</ThemedText>
            </ThemedView>
            <ThemedText style={styles.infoText}>{car?.range} km</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedView style={styles.specsRow}>
              <Ionicons
                style={{ color: primaryColor }}
                name="person-outline"
                size={16}
              />
              <ThemedText style={styles.text}>Zitplaatsen</ThemedText>
            </ThemedView>
            <ThemedText style={styles.infoText}>
              {car?.seats === 1
                ? `${car?.seats} passagier`
                : `${car?.seats} passagiers`}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView
          style={[styles.infoContainer, { backgroundColor: infoBackground }]}
        >
          <ThemedView
            style={[styles.otherRow, { backgroundColor: infoBackground }]}
          >
            <ThemedText style={styles.text}>
              Informatie van het voertuig
            </ThemedText>
            <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
          </ThemedView>
          <ThemedView
            style={[styles.otherRow, { backgroundColor: infoBackground }]}
          >
            <ThemedText style={styles.text}>Verzekering</ThemedText>
            <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
          </ThemedView>
          <ThemedView
            style={[styles.otherRow, { backgroundColor: infoBackground }]}
          >
            <ThemedText style={styles.text}>Inschrijvingsformulier</ThemedText>
            <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
          </ThemedView>
          <ThemedView
            style={[styles.otherRow, { backgroundColor: infoBackground }]}
          >
            <ThemedText style={styles.text}>
              Contacteer zorginstelling
            </ThemedText>
            <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <Button>
            <Text style={styles.buttonText}>Ontgrendel wagen</Text>
          </Button>
        </ThemedView>
      </ThemedView>
    </BottomSheet>
  );
};

export default CarBottomSheetComponent;

const styles = StyleSheet.create({
  centeredView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carImage: {
    width: 130,
    aspectRatio: 115 / 75,
  },
  carTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Cocon",
  },
  carSubtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },

  specsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  infoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },

  infoText: {
    fontFamily: "Cocon",
    fontSize: 16,
  },

  text: {
    fontSize: 16,
  },

  specsRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  otherRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 10,
    paddingVertical: 10,
  },

  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 9,
    shadowOpacity: 1,
    borderRadius: 15,
    marginHorizontal: 16,
    marginVertical: 16,
    position: "relative",
    paddingVertical: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
