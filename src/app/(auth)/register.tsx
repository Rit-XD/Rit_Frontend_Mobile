import { Text, StyleSheet, Alert, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import { supabase } from "@/lib/supabase";
import { Image } from "expo-image";
import GradientText from "react-native-gradient-texts";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Input from "@/components/ui/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
// import ImagePicker from "react-native-image-picker";

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

  const position = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password,
    });

    if (error) {
      Alert.alert(error.message);
    } else if (data?.user) {
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from("Driver")
        .insert([
          {
            id: data.user.id,
            firstname: formState.firstname,
            lastname: formState.lastname,
            date_of_birth: formState.date,
            city: formState.city,
            postal: formState.postal,
            phone: formState.phone,
            license: formState.license,
            email: formState.email,
          },
        ]);

      if (insertError) {
        Alert.alert(insertError.message);
      }
    }
    setLoading(false);
  }

  function isValidEmail(email: string) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,63}$/;
    return re.test(email);
  }

  function isValidPhoneNumber(phone: string) {
    const re = /^(0\d{9}|\+32\d{9})$/;
    return re.test(phone);
  }

  function isValidPostalCode(postal: string) {
    const re = /^\d{4}$/;
    return re.test(postal);
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
    <Animated.View style={{ transform: [{ translateX: position }] }}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"never"}>
        <ThemedView style={styles.container}>
          <Image
            style={styles.image}
            source="https://iqfcxjbnqcpjzggtcptb.supabase.co/storage/v1/object/public/profilePics/Rit-Logo.png?t=2024-05-29T09%3A24%3A23.265Z"
            contentFit="contain"
            transition={1000}
          />
          {step === 1 && (
            <>
              <GradientText
                text="Registreren"
                fontWeight={"bold"}
                fontSize={32}
                isGradientFill
                gradientColors={["#ED6A01", "#FFCC00"]}
                fontFamily={"Cocon"}
                style={styles.title}
              />
              <ThemedText style={styles.label}>Voornaam</ThemedText>
              <Input
                value={formState.firstname}
                onChangeText={(text) => {
                  setFormState({ ...formState, firstname: text });
                  setFormErrors({ ...formErrors, firstname: !text });
                }}
                placeholder="Voornaam"
                autoComplete="given-name"
                style={[
                  isNextPressed &&
                    formErrors.firstname && { borderColor: "red" },
                ]}
              />
              <ThemedText style={styles.label}>Achternaam</ThemedText>
              <Input
                value={formState.lastname}
                onChangeText={(text) => {
                  setFormState({ ...formState, lastname: text });
                  setFormErrors({ ...formErrors, lastname: !text });
                }}
                placeholder="Achternaam"
                autoComplete="family-name"
                style={[
                  isNextPressed &&
                    formErrors.lastname && { borderColor: "red" },
                ]}
              />
              <Text style={styles.label}>Geboortedatum</Text>
              <RNDateTimePicker
                value={formState.date}
                display="default"
                style={[
                  isNextPressed &&
                    formErrors.date && {
                      borderColor: "red",
                      backgroundColor: "transparent",
                      flex: 1,
                      display: "flex",
                    },
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
              <ThemedView style={{ flexDirection: "row" }}>
                <ThemedView style={{ flexGrow: 1, marginRight: 5 }}>
                  <ThemedText style={styles.label}>Woonplaats</ThemedText>
                  <Input
                    value={formState.city}
                    onChangeText={(text) => {
                      setFormState({ ...formState, city: text });
                      setFormErrors({ ...formErrors, city: !text });
                    }}
                    placeholder="Woonplaats"
                    style={[
                      isNextPressed &&
                        formErrors.city && { borderColor: "red" },
                    ]}
                    autoComplete="postal-address"
                  />
                </ThemedView>
                <ThemedView>
                  <ThemedText style={styles.label}>Postcode</ThemedText>
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
                </ThemedView>
              </ThemedView>
              {formErrors.date && isNextPressed && (
                <ThemedText style={styles.error}>
                  Je moet minstens 18 jaar oud zijn
                </ThemedText>
              )}
              <Button
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
                  if (!isValidPostalCode(formState.postal)) {
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
              >
                <ThemedText style={styles.textButton}>Volgende</ThemedText>
              </Button>
              {/* <Link href="/login" style={styles.textButton}>
                Log in
              </Link> */}
            </>
          )}

          {step === 2 && (
            <>
              <GradientText
                text="Profiel"
                fontWeight={"bold"}
                fontSize={32}
                isGradientFill
                gradientColors={["#ED6A01", "#FFCC00"]}
                fontFamily={"Cocon"}
                style={styles.title}
              />
              <ThemedText style={styles.label}>Email</ThemedText>
              <Input
                keyboardType="email-address"
                value={formState.email}
                onChangeText={(text) => {
                  setFormState({ ...formState, email: text });
                  setFormErrors({ ...formErrors, email: !text });
                }}
                placeholder="rit@care.be"
                style={[
                  isNextPressed && formErrors.email && { borderColor: "red" },
                ]}
                autoComplete="email"
                email
              />
              <ThemedText style={styles.label}>Telefoonnummer</ThemedText>
              <Input
                keyboardType="phone-pad"
                placeholder="Uw telefoonnummer"
                value={formState.phone}
                onChangeText={(text) => {
                  setFormState({
                    ...formState,
                    phone: text,
                  });
                  setFormErrors({
                    ...formErrors,
                    phone: !text,
                  });
                }}
                style={[
                  isNextPressed && formErrors.phone && { borderColor: "red" },
                ]}
              />
              <ThemedText style={styles.label}>Rijbewijs</ThemedText>
              <Input
                value={formState.license}
                onChangeText={setLicense}
                placeholder="Uw rijbewijsnummer"
                keyboardType="numeric"
              />
              {isNextPressed && formErrors.phone && (
                <ThemedText style={styles.error}>
                  Ongeldig telefoonnummer
                </ThemedText>
              )}

              <Button
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
              >
                <ThemedText style={styles.textButton}>Volgende</ThemedText>
              </Button>
              <ThemedText style={styles.backButton} onPress={() => setStep(1)}>
                Terug
              </ThemedText>
            </>
          )}
          {step === 3 && (
            <>
              <GradientText
                text="Beveiliging"
                fontWeight={"bold"}
                fontSize={32}
                isGradientFill
                gradientColors={["#ED6A01", "#FFCC00"]}
                fontFamily={"Cocon"}
                style={styles.title}
              />
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
                style={[
                  isNextPressed &&
                    formErrors.password && { borderColor: "red" },
                ]}
                password
              />
              <ThemedText style={styles.label}>Bevestig wachtwoord</ThemedText>
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
              {isNextPressed && formErrors.password && (
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
              >
                <ThemedText style={styles.textButton}>Registreren</ThemedText>
              </Button>
              <ThemedText style={styles.backButton} onPress={() => setStep(2)}>
                Terug
              </ThemedText>
            </>
          )}
        </ThemedView>
      </KeyboardAwareScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 128,
    paddingBottom: 128,
    height: "100%",
    display: "flex",
  },

  image: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },

  title: {
    margin: "auto",
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
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
  },

  backButton: {
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "red",
  },
});

export default SignUpScreen;
