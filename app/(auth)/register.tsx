import {
  View,
  Text,
  TextInput,
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
import { useFonts } from "expo-font";
import GradientText from "react-native-gradient-texts";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [step, setStep] = useState(1);
  const [isFirstnameValid, setIsFirstnameValid] = useState(false);
  const [isLastnameValid, setIsLastnameValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);
  const [isPostalValid, setIsPostalValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  // const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNextPressed, setIsNextPressed] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  function isValidEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function isValidPhoneNumber(phone: string) {
    const re = /^(\+32\s|0)4\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/;
    return re.test(phone);
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
            <TextInput
              value={firstname}
              onChangeText={(text) => {
                setFirstname(text);
                if (text === "") {
                  setIsFirstnameValid(false);
                } else {
                  setIsFirstnameValid(true);
                }
              }}
              placeholder="Voornaam"
              autoComplete="given-name"
              style={[
                styles.input,
                isNextPressed && !isFirstnameValid && { borderColor: "red" },
              ]}
            />
            <Text style={styles.label}>Achternaam</Text>
            <TextInput
              value={lastname}
              onChangeText={(text) => {
                setLastname(text);
                if (text === "") {
                  setIsLastnameValid(false);
                } else {
                  setIsLastnameValid(true);
                }
              }}
              placeholder="Achternaam"
              autoComplete="family-name"
              style={[
                styles.input,
                isNextPressed && !isLastnameValid && { borderColor: "red" },
              ]}
            />

            <Text style={styles.label}>Geboortedatum</Text>
            {!isDateValid && isNextPressed && (
              <Text style={{ color: "red" }}>
                U moet minstens 18 jaar oud zijn
              </Text>
            )}
            <RNDateTimePicker
              value={date}
              display="default"
              style={[
                styles.input,
                isNextPressed && !isDateValid && { borderColor: "red" },
              ]}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexGrow: 1, marginRight: 5 }}>
                <Text style={styles.label}>Woonplaats</Text>
                <TextInput
                  value={city}
                  onChangeText={(text) => {
                    setCity(text);
                    if (text === "") {
                      setIsCityValid(false);
                    } else {
                      setIsCityValid(true);
                    }
                  }}
                  placeholder="Woonplaats"
                  style={[
                    styles.input,
                    isNextPressed && !isCityValid && { borderColor: "red" },
                  ]}
                  autoComplete="postal-address"
                />
              </View>
              <View>
                <Text style={styles.label}>Postcode</Text>
                <TextInput
                  keyboardType="numeric"
                  value={postal}
                  onChangeText={(text) => {
                    setPostal(text);
                    if (text === "") {
                      setIsPostalValid(false);
                    } else {
                      setIsPostalValid(true);
                    }
                  }}
                  placeholder="Postcode"
                  style={[
                    styles.input,
                    isNextPressed && !isPostalValid && { borderColor: "red" },
                  ]}
                  autoComplete="postal-code"
                />
              </View>
            </View>
            <Button
              text="Volgende"
              onPress={() => {
                setIsNextPressed(true);
                if (firstname === "") {
                  setIsFirstnameValid(false);
                } else {
                  setIsFirstnameValid(true);
                }
                if (lastname === "") {
                  setIsLastnameValid(false);
                } else {
                  setIsLastnameValid(true);
                }
                const currentDate = new Date();
                const enteredDate = new Date(date);
                let age = currentDate.getFullYear() - enteredDate.getFullYear();
                const m = currentDate.getMonth() - enteredDate.getMonth();

                if (
                  m < 0 ||
                  (m === 0 && currentDate.getDate() < enteredDate.getDate())
                ) {
                  age--;
                }

                if (age < 18) {
                  setIsDateValid(false);
                } else {
                  setIsDateValid(true);
                }
                if (city === "") {
                  setIsCityValid(false);
                } else {
                  setIsCityValid(true);
                }
                if (postal === "") {
                  setIsPostalValid(false);
                } else {
                  setIsPostalValid(true);
                }
                if (
                  isFirstnameValid &&
                  isLastnameValid &&
                  isDateValid &&
                  isCityValid &&
                  isPostalValid
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
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholder="rit@care.be"
              style={[
                styles.input,
                isNextPressed && !isEmailValid && { borderColor: "red" },
              ]}
              autoComplete="email"
            />
            <Text style={styles.label}>Telefoonnummer</Text>
            {!isPhoneValid && isNextPressed && (
              <Text style={{ color: "red" }}>
                Voer een geldig telefoonnummer in
              </Text>
            )}
            <TextInput
              keyboardType="phone-pad"
              placeholder="Uw telefoonnummer"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (text === "") {
                  setIsPhoneValid(false);
                } else {
                  setIsPhoneValid(true);
                }
              }}
              style={[
                styles.input,
                isNextPressed && !isPhoneValid && { borderColor: "red" },
              ]}
            />
            <Text style={styles.label}>Rijbewijs</Text>
            <TextInput
              value={license}
              onChangeText={setLicense}
              placeholder="Uw rijbewijsnummer"
              style={styles.input}
              keyboardType="numeric"
            />
            <Button
              text="Volgende"
              onPress={() => {
                setIsNextPressed(true);
                if (!isValidEmail(email)) {
                  setIsEmailValid(false);
                } else {
                  setIsEmailValid(true);
                }
                if (!isValidPhoneNumber(phone)) {
                  setIsPhoneValid(false);
                } else {
                  setIsPhoneValid(true);
                }
                if (isEmailValid && isPhoneValid) {
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
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Wachtwoord"
              style={[
                styles.input,
                isNextPressed && !isPasswordValid && { borderColor: "red" },
              ]}
              secureTextEntry
            />
            <Text style={styles.label}>Bevestig wachtwoord</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Bevestig wachtwoord"
              style={[
                styles.input,
                isNextPressed &&
                  !isConfirmPasswordValid && { borderColor: "red" },
              ]}
              secureTextEntry
            />

            <Button
              text="Registreren"
              onPress={() => {
                setIsNextPressed(true);
                if (password.length < 8) {
                  setIsPasswordValid(false);
                } else {
                  setIsPasswordValid(true);
                }
                if (password !== confirmPassword) {
                  setIsConfirmPasswordValid(false);
                } else {
                  setIsConfirmPasswordValid(true);
                }
                if (
                  isPasswordValid &&
                  isConfirmPasswordValid /* && other conditions... */
                ) {
                  signUpWithEmail();
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
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
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
