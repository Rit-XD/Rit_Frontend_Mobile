import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import Input from "../ui/Input";
import { supabase } from "@/lib/supabase";
import { primaryColor } from "@/constants/Colors";

type PasswordProps = {
  onClose: () => void;
};

const Password = ({ onClose }: PasswordProps) => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const themeColor = useThemeColor(
    { light: "#151515", dark: "#fefefe" },
    "background"
  );

  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: false,
    confirmPassword: false,
  });

  const validatePassword = (password: string) => password.length >= 8;
  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword;

  const handleSubmit = async () => {
    const isPasswordValid = validatePassword(formState.password);
    const isConfirmPasswordValid = validateConfirmPassword(
      formState.password,
      formState.confirmPassword
    );

    setFormErrors({
      ...formErrors,
      password: !isPasswordValid,
      confirmPassword: !isConfirmPasswordValid,
    });

    if (isPasswordValid && isConfirmPasswordValid) {
      const password = formState.password;
      await supabase.auth.updateUser({
        password: password,
      });
    }
    setIsSuccessModalVisible(true);
  };

  return (
    <ThemedView style={styles.container}>
      <Button
        mod={["white", "square"]}
        onPress={onClose}
        style={{ position: "absolute", top: 64, left: 32 }}
      >
        <AntDesign name="arrowleft" size={24} color={themeColor} />
      </Button>
      <ThemedText>Wijzig wachtwoord</ThemedText>
      <ThemedText style={styles.label}>Wachtwoord</ThemedText>
      <Input
        value={formState.password}
        onChangeText={(text) => {
          setFormState({ ...formState, password: text });
          setFormErrors({
            ...formErrors,
            password: !validatePassword(text),
          });
        }}
        placeholder="Wachtwoord"
        style={[formErrors.password && { borderColor: "red" }]}
        password
      />
      <ThemedText style={styles.label}>Bevestig wachtwoord</ThemedText>
      <Input
        value={formState.confirmPassword}
        onChangeText={(text) => {
          setFormState({ ...formState, confirmPassword: text });
          setFormErrors({
            ...formErrors,
            confirmPassword: !validateConfirmPassword(formState.password, text),
          });
        }}
        placeholder="Bevestig wachtwoord"
        style={[formErrors.confirmPassword && { borderColor: "red" }]}
        password
      />
      {formErrors.confirmPassword && formState.password.length >= 8 && (
        <ThemedText
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Wachtwoorden komen niet overeen.
        </ThemedText>
      )}
      {formErrors.password && (
        <ThemedText
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Wachtwoord moet minstens 8 karakters lang zijn.
        </ThemedText>
      )}
      <Button
        onPress={() => {
          if (!validatePassword(formState.password)) {
            setFormErrors({ ...formErrors, password: true });
          }
          if (
            !validateConfirmPassword(
              formState.password,
              formState.confirmPassword
            )
          ) {
            setFormErrors({ ...formErrors, confirmPassword: true });
          }
          if (
            validatePassword(formState.password) &&
            validateConfirmPassword(
              formState.password,
              formState.confirmPassword
            )
          ) {
            handleSubmit();
          }
        }}
      >
        <Text style={styles.textButton}>Opslaan</Text>
      </Button>
      <Modal visible={isSuccessModalVisible} transparent={true}>
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            opacity: 0.25,
            position: "absolute",
          }}
          onPress={onClose}
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
            Wachtwoord gewijzigd!
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 16,
                borderColor: "#CCCCCC",
                borderTopWidth: 0.5,
              }}
              onPress={() => {
                setIsSuccessModalVisible(false);
                onClose();
              }}
            >
              <ThemedText
                style={{
                  lineHeight: 24,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                OK
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 74,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },

  label: {
    color: "gray",
  },
  input: {
    borderWidth: 2,
    borderColor: "#D9D9D9",
    padding: 18,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "transparent",
    borderRadius: 5,
  },

  textButton: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
  },
  error: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "red",
  },
});
