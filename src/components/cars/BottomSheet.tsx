import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
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

const BottomSheetComponent = () => {
  const snapPoints = useMemo(() => ["22%", "87%"], []);

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

  const arrow = useThemeColor({ light: "black", dark: "#fefefe" }, "icon");

  // const;

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleStyle={{ backgroundColor: background }}
      handleIndicatorStyle={{ backgroundColor: handleIndicator }}
    >
      <ThemedView style={styles.centeredView}>
        <Image
          source={require("@assets/images/testcar.webp")}
          style={styles.carImage}
        />
        <ThemedText style={styles.carTitle}>Volkswagen Caddy</ThemedText>
        <ThemedText style={styles.carSubtitle}>2-DGT-215</ThemedText>
      </ThemedView>

      <ThemedView style={styles.specsContainer}>
        <ThemedView style={styles.specsRow}>
          <FontAwesome style={{ color: primaryColor }} name="gears" size={16} />
          <ThemedText style={styles.text}>Automatisch</ThemedText>
        </ThemedView>
        <ThemedView style={styles.specsRow}>
          <FontAwesome5
            style={{ color: primaryColor }}
            name="gas-pump"
            size={16}
          />
          <ThemedText style={styles.text}>Benzine</ThemedText>
        </ThemedView>
        <ThemedView style={styles.specsRow}>
          <FontAwesome5
            name="wheelchair"
            size={16}
            style={{ color: primaryColor }}
          />
          <ThemedText style={styles.text}>1 plaats</ThemedText>
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
          <ThemedText style={styles.infoText}>350 km</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoRow}>
          <ThemedView style={styles.specsRow}>
            <Ionicons
              style={{ color: primaryColor }}
              name="person-outline"
              size={16}
            />
            <ThemedText style={styles.text}>Zit plaatsen</ThemedText>
          </ThemedView>
          <ThemedText style={styles.infoText}>
            4 Zitplaatsen + 1 bestuurder
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.infoContainer}>
        <ThemedView style={styles.otherRow}>
          <ThemedText style={styles.text}>
            Informatie van het voertuig
          </ThemedText>
          <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
        </ThemedView>
        <ThemedView style={styles.otherRow}>
          <ThemedText style={styles.text}>Verzekering</ThemedText>
          <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
        </ThemedView>
        <ThemedView style={styles.otherRow}>
          <ThemedText style={styles.text}>Inschrijvingsformulier</ThemedText>
          <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
        </ThemedView>
        <ThemedView style={styles.otherRow}>
          <ThemedText style={styles.text}>Contacteer zorginstelling</ThemedText>
          <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Button text="Open wagen" style={styles.button} />
      </ThemedView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;

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
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  button: {
    flex: 1,
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
    marginHorizontal: 24,
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
});
