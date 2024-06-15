import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/ui/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Icon } from "@rneui/themed";
import { View, StyleSheet, Pressable } from "react-native";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";
import { primaryColor } from "@/constants/Colors";
import { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ThemeSelector from "@/components/settings/ThemeSelector";
import Modal from "react-native-modal";
import Account from "@/components/settings/Account";
import Password from "@/components/settings/Password";
import License from "@/components/settings/License";
import Bestuurderspas from "@/components/settings/Bestuurderspas";
import Faq from "@/components/settings/Faq";
import Logout from "@/components/settings/Logout";
import * as Notifications from "expo-notifications";

const SettingsScreen = () => {
  const [notification, setNotification] = useState(true);
  const [modalVisible, setModalVisible] = useState<
    | "logout"
    | "theme"
    | "account"
    | "password"
    | "license"
    | "bestuurderspas"
    | "faq"
    | null
  >(null);

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
        <Pressable
          style={[styles.row, { backgroundColor: infoBackground }]}
          onPress={() => setModalVisible("account")}
        >
          <ThemedView style={styles.iconWord}>
            <Ionicons
              style={{ color: icons }}
              name="person-outline"
              size={20}
            />
            <ThemedText style={styles.text}>Account</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </Pressable>
        <Pressable
          style={[styles.row, { backgroundColor: infoBackground }]}
          onPress={() => setModalVisible("password")}
        >
          <ThemedView style={styles.iconWord}>
            <Ionicons style={{ color: icons }} name="key-outline" size={20} />
            <ThemedText style={styles.text}>Wijzig wachtwoord</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </Pressable>
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
        <Pressable
          style={[styles.row, { backgroundColor: infoBackground }]}
          onPress={() => setModalVisible("license")}
        >
          <ThemedView style={styles.iconWord}>
            <AntDesign style={{ color: icons }} name="idcard" size={20} />
            <ThemedText style={styles.text}>Rijbewijs</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </Pressable>
        <Pressable
          style={[styles.row, { backgroundColor: infoBackground }]}
          onPress={() => setModalVisible("bestuurderspas")}
        >
          <ThemedView style={styles.iconWord}>
            <Ionicons style={{ color: icons }} name="card-outline" size={20} />
            <ThemedText style={styles.text}>Bestuurderspas</ThemedText>
          </ThemedView>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </Pressable>
      </ThemedView>
      <ThemedText style={styles.title}>Thema</ThemedText>
      <ThemedView
        style={[styles.infoContainer, { backgroundColor: infoBackground }]}
      >
        <Pressable
          onPress={() => setModalVisible("theme")}
          style={[styles.oneRow, { backgroundColor: infoBackground }]}
        >
          <View style={styles.iconWord}>
            <Ionicons style={{ color: icons }} name="moon-outline" size={20} />
            <ThemedText style={styles.text}>Appweergave</ThemedText>
          </View>
          <Icon iconStyle={{ color: icons }} name="chevron-right" size={28} />
        </Pressable>
      </ThemedView>
      <ThemedText style={styles.title}>Support</ThemedText>
      <ThemedView
        style={[styles.infoContainer, { backgroundColor: infoBackground }]}
      >
        <Pressable
          style={[styles.oneRow, { backgroundColor: infoBackground }]}
          onPress={() => setModalVisible("faq")}
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
        </Pressable>
      </ThemedView>

      <Button
        style={styles.button}
        onPress={() => setModalVisible("logout")}
        mod={["white", "square"]}
      >
        <View style={styles.iconWord}>
          <Ionicons name="log-out-outline" size={20} style={{ color: "red" }} />
          <ThemedText style={{ color: "red" }}>Afmelden</ThemedText>
        </View>
      </Button>

      <Modal
        isVisible={modalVisible !== null}
        animationIn={modalVisible !== "logout" ? "slideInRight" : "fadeIn"}
        animationOut="slideOutRight"
        style={{ margin: 0 }}
      >
        {modalVisible === "account" && (
          <Account onClose={() => setModalVisible(null)} />
        )}
        {modalVisible === "password" && (
          <Password onClose={() => setModalVisible(null)} />
        )}
        {modalVisible === "license" && (
          <License onClose={() => setModalVisible(null)} />
        )}
        {modalVisible === "bestuurderspas" && (
          <Bestuurderspas onClose={() => setModalVisible(null)} />
        )}
        {modalVisible === "theme" && (
          <ThemeSelector onClose={() => setModalVisible(null)} />
        )}
        {modalVisible === "faq" && (
          <Faq onClose={() => setModalVisible(null)} />
        )}
        {modalVisible === "logout" && (
          <Logout onClose={() => setModalVisible(null)} />
        )}
      </Modal>
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 74,
    paddingBottom: 24,
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 16,
  },
  cancelButtonText: {
    color: "black",
  },
  confirmButtonText: {
    color: "white",
  },
});
