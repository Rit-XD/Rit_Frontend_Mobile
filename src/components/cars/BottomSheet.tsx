import { View, Text } from "react-native";
import React, { useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import Button from "../ui/Button";

const BottomSheetComponent = () => {
  const snapPoints = useMemo(() => ["20%", "80%"], []);

  return (
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        // handleIndicatorStyle={{ backgroundColor: "#f0f0f0" }}
        
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          <Image
            source={require("@assets/images/testcar.webp")}
            style={{
              position: "absolute",
              width: 130,
              aspectRatio: 115 / 75,
              marginBottom: 16,
              top: 0,
              transform: [{ translateY: -50 }],
            }}
          />
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 24 }}>
            Volkswagen Caddy
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginTop: 4 }}>
            2-DGT-215
          </Text>
          <Button text="Open wagen" style={{}} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 24,
            borderBottomColor: "black",
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}
        >
          <Text>Automatisch</Text>
          <Text>Benzine</Text>
          <Text>1 plaats</Text>
        </View>
      </BottomSheet>
  );
};

export default BottomSheetComponent;
