import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import GradientText from "react-native-gradient-texts";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Input from "@/components/ui/Input";

const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [license, setLicense] = useState("");
  const [step, setStep] = useState(1);
  const [isNextPressed, setIsNextPressed] = useState(false);
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    date: new Date(),
    city: "",
    postal: "",
    phone: "",
    license: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastname: false,
    date: false,
    city: false,
    postal: false,
    phone: false,
    license: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  function isValidEmail(email: string) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,63}$/;
    return re.test(email);
  }

  function isValidPhoneNumber(phone: string) {
    const re = /^(0|\+32)\s?4\s?70\s?42\s?93\s?61$/;
    return re.test(phone);
  }

  const validatePassword = (password: string) => password.length >= 8;
  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword;

  const handleSubmit = () => {
    setIsNextPressed(true);

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
      signUpWithEmail();
    }
  };

  function validateDate(date: Date) {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    const m = currentDate.getMonth() - selectedDate.getMonth();

    if (m < 0 || (m === 0 && currentDate.getDate() < selectedDate.getDate())) {
      age--;
    }

    return age >= 18;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Image
          style={styles.image}
          source="https://iqfcxjbnqcpjzggtcptb.supabase.co/storage/v1/object/public/profilePics/Rit-Logo.png?t=2024-05-29T09%3A24%3A23.265Z"
          contentFit="contain"
          transition={1000}
        />
        <GradientText
          text="Registreren"
          fontWeight={"bold"}
          fontSize={32}
          isGradientFill
          gradientColors={["#ED6A01", "#FFCC00"]}
          fontFamily={"Cocon"}
          style={styles.title}
        />
        {step === 1 && (
          <>
            <Text style={styles.label}>Voornaam</Text>
            <Input
              value={formState.firstname}
              onChangeText={(text) => {
                setFormState({ ...formState, firstname: text });
                setFormErrors({ ...formErrors, firstname: !text });
              }}
              placeholder="Voornaam"
              autoComplete="given-name"
              style={[
                isNextPressed && formErrors.firstname && { borderColor: "red" },
              ]}
            />
            <Text style={styles.label}>Achternaam</Text>
            <Input
              value={formState.lastname}
              onChangeText={(text) => {
                setFormState({ ...formState, lastname: text });
                setFormErrors({ ...formErrors, lastname: !text });
              }}
              placeholder="Achternaam"
              autoComplete="family-name"
              style={[
                isNextPressed && formErrors.lastname && { borderColor: "red" },
              ]}
            />
            <Text style={styles.label}>Geboortedatum</Text>
            {formErrors.date && isNextPressed && (
              <Text style={{ color: "red" }}>
                Je moet minstens 18 jaar oud zijn
              </Text>
            )}
            <RNDateTimePicker
              value={formState.date}
              display="default"
              style={[
                isNextPressed && formErrors.date && { borderColor: "red" },
              ]}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || formState.date;
                setFormState({ ...formState, date: currentDate });
                setFormErrors({
                  ...formErrors,
                  date: !validateDate(currentDate),
                });
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexGrow: 1, marginRight: 5 }}>
                <Text style={styles.label}>Woonplaats</Text>
                <Input
                  value={formState.city}
                  onChangeText={(text) => {
                    setFormState({ ...formState, city: text });
                    setFormErrors({ ...formErrors, city: !text });
                  }}
                  placeholder="Woonplaats"
                  style={[
                    isNextPressed && formErrors.city && { borderColor: "red" },
                  ]}
                  autoComplete="postal-address"
                />
              </View>
              <View>
                <Text style={styles.label}>Postcode</Text>
                <Input
                  style={[
                    isNextPressed &&
                      formErrors.postal && { borderColor: "red" },
                  ]}
                  keyboardType="numeric"
                  value={formState.postal}
                  onChangeText={(text) => {
                    setFormState({ ...formState, postal: text });
                    setFormErrors({ ...formErrors, postal: !text });
                  }}
                  placeholder="Postcode"
                  autoComplete="postal-code"
                />
              </View>
            </View>
            <Button
              text="Volgende"
              onPress={() => {
                setIsNextPressed(true);
                let newErrors = { ...formErrors };

                if (!formState.firstname) {
                  newErrors = { ...newErrors, firstname: true };
                }
                if (!formState.lastname) {
                  newErrors = { ...newErrors, lastname: true };
                }
                if (!validateDate(formState.date)) {
                  newErrors = { ...newErrors, date: true };
                }
                if (!formState.city) {
                  newErrors = { ...newErrors, city: true };
                }
                if (!formState.postal) {
                  newErrors = { ...newErrors, postal: true };
                }

                setFormErrors(newErrors);

                if (
                  formState.firstname &&
                  formState.lastname &&
                  validateDate(formState.date) &&
                  formState.city &&
                  formState.postal &&
                  !newErrors.firstname &&
                  !newErrors.lastname &&
                  !newErrors.date &&
                  !newErrors.city &&
                  !newErrors.postal
                ) {
                  setStep(2);
                }
              }}
            />
            <Link href="/login" style={styles.textButton}>
              Log in
            </Link>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.label}>Email</Text>
            <Input
              keyboardType="email-address"
              value={formState.email}
              onChangeText={(text) => {
                setFormState({ ...formState, email: text });
                setFormErrors({ ...formErrors, email: !isValidEmail(text) });
              }}
              placeholder="rit@care.be"
              style={[
                isNextPressed && formErrors.email && { borderColor: "red" },
              ]}
              autoComplete="email"
            />
            <Text style={styles.label}>Telefoonnummer</Text>
            {isNextPressed && formErrors.phone && (
              <Text style={{ color: "red" }}>Ongeldig telefoonnummer</Text>
            )}
            <Input
              keyboardType="phone-pad"
              placeholder="Uw telefoonnummer"
              value={formState.phone}
              onChangeText={(text) => {
                setFormState({ ...formState, phone: text });
                setFormErrors({
                  ...formErrors,
                  phone: !isValidPhoneNumber(text),
                });
              }}
              style={[
                isNextPressed && formErrors.phone && { borderColor: "red" },
              ]}
            />
            <Text style={styles.label}>Rijbewijs</Text>
            <Input
              value={formState.license}
              onChangeText={setLicense}
              placeholder="Uw rijbewijsnummer"
              keyboardType="numeric"
            />
            <Button
              text="Volgende"
              onPress={() => {
                setIsNextPressed(true);
                let newErrors = { ...formErrors };

                if (!isValidEmail(formState.email)) {
                  newErrors = { ...newErrors, email: true };
                }
                if (!isValidPhoneNumber(formState.phone)) {
                  newErrors = { ...newErrors, phone: true };
                }

                setFormErrors(newErrors);

                if (
                  isValidEmail(formState.email) &&
                  isValidPhoneNumber(formState.phone) &&
                  !newErrors.email &&
                  !newErrors.phone
                ) {
                  setStep(3);
                }
              }}
            />
            <Text style={styles.textButton} onPress={() => setStep(1)}>
              Terug
            </Text>
          </>
        )}
        {step === 3 && (
          <>
            <Text style={styles.label}>Wachtwoord</Text>
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
              style={[
                isNextPressed && formErrors.password && { borderColor: "red" },
              ]}
              password
            />
            <Text style={styles.label}>Bevestig wachtwoord</Text>
            <Input
              value={formState.confirmPassword}
              onChangeText={(text) => {
                setFormState({ ...formState, confirmPassword: text });
                setFormErrors({
                  ...formErrors,
                  confirmPassword: !validateConfirmPassword(
                    formState.password,
                    text
                  ),
                });
              }}
              placeholder="Bevestig wachtwoord"
              style={[
                isNextPressed &&
                  formErrors.confirmPassword && { borderColor: "red" },
              ]}
              password
            />
            {isNextPressed &&
              formErrors.confirmPassword &&
              formState.password.length >= 8 && (
                <Text style={{ color: "red" }}>
                  Wachtwoorden komen niet overeen
                </Text>
              )}
            {isNextPressed && formErrors.password && (
              <Text style={{ color: "red" }}>
                Wachtwoord moet minstens 8 karakters lang zijn
              </Text>
            )}
            <Button
              text="Registreren"
              onPress={() => {
                setIsNextPressed(true);
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
            />
            <Text style={styles.textButton} onPress={() => setStep(2)}>
              Terug
            </Text>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    justifyContent: "center",
    flex: 1,
  },

  image: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },

  title: {
    marginBottom: 20,
    textAlign: "center",
    marginTop: -40,
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
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;
