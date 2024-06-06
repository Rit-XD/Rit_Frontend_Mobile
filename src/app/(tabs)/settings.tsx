import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Availability from "@/components/notifications/AvailabilityToggle";
import Button from "@/components/ui/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Icon } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";
import { primaryColor } from "@/constants/Colors";
import { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [notification, setNotification] = useState(true);
  async function signOut() {
    await supabase.auth.signOut();
  }

  const colorTrack = useThemeColor(
    { light: "#fefefe", dark: "#fff" },
    "background"
  );
  const colorThumb = useThemeColor(
    { light: "#c3c3c3", dark: "#444444" },
    "background"
  );

  const infoBackground = useThemeColor(
    { light: "white", dark: "#303030" },
    "background"
  );

  const icons = useThemeColor({ light: "black", dark: "#fefefe" }, "icon");

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Algemeen</ThemedText>
      <ThemedView
        style={[styles.infoContainer, { backgroundColor: infoBackground }]}
      >
        <ThemedView style={[styles.row, { backgroundColor: infoBackground }]}>
          <ThemedView style={styles.iconWord}>
            <Ionicons
              style={{ color: icons }}
              name="person-outline"
              size={20}
            />
            <ThemedText style={styles.text}>Account</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </ThemedView>
        <ThemedView style={[styles.row, { backgroundColor: infoBackground }]}>
          <ThemedView style={styles.iconWord}>
            <Ionicons style={{ color: icons }} name="key-outline" size={20} />
            <ThemedText style={styles.text}>Wijzig wachtwoord</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </ThemedView>
        <ThemedView style={[styles.row, { backgroundColor: infoBackground }]}>
          <ThemedView style={styles.iconWord}>
            <Ionicons
              style={{ color: icons }}
              name="notifications-outline"
              size={20}
            />
            <ThemedText style={styles.text}>Meldingen</ThemedText>
          </ThemedView>
          <GestureHandlerRootView>
            <Switch
              style={styles.slider}
              trackColor={{ true: primaryColor, false: colorTrack }}
              thumbColor={notification ? "white" : colorThumb}
              ios_backgroundColor={colorTrack}
              onValueChange={() => setNotification(!notification)}
              value={notification}
            />
          </GestureHandlerRootView>
        </ThemedView>
        <ThemedView style={[styles.row, { backgroundColor: infoBackground }]}>
          <ThemedView style={styles.iconWord}>
            <AntDesign style={{ color: icons }} name="idcard" size={20} />
            <ThemedText style={styles.text}>Rijbewijs</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </ThemedView>
        <ThemedView style={[styles.row, { backgroundColor: infoBackground }]}>
          <ThemedView style={styles.iconWord}>
            <Ionicons style={{ color: icons }} name="card-outline" size={20} />
            <ThemedText style={styles.text}>Bestuurderspas</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </ThemedView>
      </ThemedView>
      <ThemedText style={styles.title}>Thema</ThemedText>
      <ThemedView
        style={[styles.infoContainer, { backgroundColor: infoBackground }]}
      >
        <ThemedView
          style={[styles.oneRow, { backgroundColor: infoBackground }]}
        >
          <ThemedView style={styles.iconWord}>
            <Ionicons style={{ color: icons }} name="moon-outline" size={20} />
            <ThemedText style={styles.text}>Appweergave</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </ThemedView>
      </ThemedView>
      <ThemedText style={styles.title}>Support</ThemedText>
      <ThemedView
        style={[styles.infoContainer, { backgroundColor: infoBackground }]}
      >
        <ThemedView
          style={[styles.oneRow, { backgroundColor: infoBackground }]}
        >
          <ThemedView style={styles.iconWord}>
            <Ionicons
              style={{ color: icons }}
              name="help-circle-outline"
              size={20}
            />
            <ThemedText style={styles.text}>FAQ</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </ThemedView>
      </ThemedView>

      <Button
        style={styles.button}
        onPress={async () => await supabase.auth.signOut()}
        mod={["white", "square"]}
      >
        <View style={styles.iconWord}>
          <Ionicons name="log-out-outline" size={20} style={{ color: "red" }} />
          <ThemedText style={{ color: "red" }}>Afmelden</ThemedText>
        </View>
      </Button>
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 50,
    paddingVertical: 24,
    height: "100%",
    flex: 1,
    position: "relative",
  },

  text: {
    fontSize: 16,
  },

  slider: {
    marginLeft: "auto",
    marginRight: 8,
  },

  title: {
    fontFamily: "Cocon",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
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
    marginVertical: 8,
    paddingVertical: 10,
  },

  iconWord: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  button: {
    width: "100%",
    position: "absolute",
    marginHorizontal: 24,
    bottom: 0,
  },

  infoText: {
    fontFamily: "Cocon",
    fontSize: 16,
  },

  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 10,
    paddingVertical: 16,
  },
  oneRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 10,
  },
});
