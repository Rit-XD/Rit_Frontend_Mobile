import { primaryColor } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Easing } from "react-native-reanimated";

const LoginRegisterSlider = ({ initialActive }: { initialActive: string }) => {
  const router = useRouter();
  const [active, setActive] = useState(initialActive);
  const animation = new Animated.Value(active === "login" ? 0 : 1);

  const handlePress = (type: any) => {
    setActive(type);
    Animated.timing(animation, {
      toValue: type === "login" ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      router.push(type);
    });
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 345 / 2],
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("login")}
        >
          <Text
            style={[styles.buttonText, active === "login" && styles.activeText]}
          >
            Inloggen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("register")}
        >
          <Text
            style={[
              styles.buttonText,
              active === "register" && styles.activeText,
            ]}
          >
            Registreren
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.slider, { transform: [{ translateX }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: "auto",
    width: 345,
    height: 50,
    backgroundColor: "#fad2b3",
    borderRadius: 25,
    padding: 2,
    justifyContent: "center",
    position: "relative",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  activeText: {
    fontWeight: "bold",
  },
  slider: {
    position: "absolute",
    top: 2,
    left: 2,
    width: 345 / 2 - 4,
    height: 46,
    backgroundColor: primaryColor,
    borderRadius: 23,
    zIndex: -1,
  },
});

export default LoginRegisterSlider;
