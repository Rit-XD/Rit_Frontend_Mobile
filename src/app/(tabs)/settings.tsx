import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/ui/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Icon } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

const SettingsScreen = () => {
  async function signOut() {
    await supabase.auth.signOut();
  }

  const infoBackground = useThemeColor(
    { light: "white", dark: "#303030" },
    "background"
  );

  const arrow = useThemeColor({ light: "black", dark: "#fefefe" }, "icon");
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Algemeen</ThemedText>
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
          <ThemedText style={styles.text}>Contacteer zorginstelling</ThemedText>
          <Icon iconStyle={{ color: arrow }} name="chevron-right" size={28} />
        </ThemedView>
      </ThemedView>

      <View style={{ position: "absolute", bottom: 16, width: "100%" }}>
        <Button
          onPress={async () => await supabase.auth.signOut()}
          mod={["white", "square"]}
        >
          <ThemedText style={{ color: "red" }}>Uitloggen</ThemedText>
        </Button>
      </View>
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 50,
    paddingVertical: 24,
    height: "100%",
    flex: 1,
    position: "relative",
  },

  text: {
    fontSize: 16,
  },

  title: {
    fontFamily: "Cocon",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
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
});
