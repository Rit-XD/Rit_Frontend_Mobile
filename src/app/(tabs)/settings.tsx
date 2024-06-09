import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Availability from "@/components/notifications/AvailabilityToggle";
import Button from "@/components/ui/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Icon } from "@rneui/themed";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";
import { primaryColor } from "@/constants/Colors";
import { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ThemeSelector from "@/components/settings/ThemeSelector";
import Modal from "react-native-modal";

const SettingsScreen = () => {
  const [notification, setNotification] = useState(true);
  const [modalVisible, setModalVisible] = useState<"logout" | "theme" | null>(null);

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
        <Pressable  onPress={() => setModalVisible("theme")} style={[styles.oneRow, { backgroundColor: infoBackground }]}>
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

      {/* Modal for sign out confirmation */}
      {/* <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={modalVisible==="logout"}
        style={{ margin: 0 }}
      >
        <ThemedView style={styles.overlay}>
          <ThemedView style={styles.modalView}>
            <ThemedText style={styles.modalTitle}>Afmelden?</ThemedText>
            <ThemedText style={styles.modalText}>
              U staat op het punt om af te melden.
            </ThemedText>
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(null)}
              >
                <ThemedText
                  style={[styles.buttonText, styles.cancelButtonText]}
                >
                  Terug
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => {
                  setModalVisible(null);
                  signOut();
                }}
              >
                <ThemedText
                  style={[styles.buttonText, styles.confirmButtonText]}
                >
                  Afmelden
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal> */}

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
      
      <Modal isVisible={modalVisible !== null} animationIn={modalVisible !== "logout"? "slideInRight" : "fadeIn"} animationOut="slideOutRight" style={{margin: 0}}>
        {modalVisible==="theme" && <ThemeSelector onClose={() => setModalVisible(null)}/>}
        {modalVisible==="logout" && <>
                                  <Pressable style={{height: "100%", width: "100%", backgroundColor: "black", opacity: .75, position: 'absolute' }} onPress={() => setModalVisible(null)}/>
                                  <ThemedView style={{margin: 'auto', width: "75%", alignItems: 'center', borderRadius: 15, overflow: 'hidden'}}>
                                      <Text style={{marginVertical: 16, color: primaryColor, fontSize: 18, fontWeight: 'bold'}}>Afmelden</Text>
                                      <ThemedText style={{textAlign: 'center', marginBottom: 16, marginHorizontal: 16}}>Ben je zeker dat je wilt afmelden?</ThemedText>
                                      <View style= {{flexDirection: "row", alignItems: 'center'}}>
                                          <Pressable style={{flex: 1, alignItems: 'center', paddingVertical: 16, borderColor: "#CCCCCC", borderRightWidth: .5, borderTopWidth: .5}} onPress={() => setModalVisible(null)}>
                                              <ThemedText>Terug</ThemedText>
                                          </Pressable>
                                          <Pressable style={{flex: 1, alignItems: 'center', paddingVertical: 16, borderColor: "#CCCCCC", borderTopWidth: .5, backgroundColor: "red"}} onPress={signOut}>
                                              <Text style={{lineHeight: 24, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Afmelden</Text>
                                          </Pressable>
                                      </View>
                                  </ThemedView>
        </>}
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
