import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { primaryColor } from "@/constants/Colors";
import { Image } from "expo-image";
import GradientText from "react-native-gradient-texts";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/ui/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/useThemeColor";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const position = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError("Gebruikersnaam of wachtwoord is onjuist.");
    setLoading(false);
  }

  return (
    <Animated.View style={{ transform: [{ translateX: position }] }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"never"}
        contentContainerStyle={styles.container}
      >
        <ThemedView style={styles.themedView}>
          <View>
            <Image
              style={styles.image}
              source="https://iqfcxjbnqcpjzggtcptb.supabase.co/storage/v1/object/public/profilePics/Rit-Logo.png?t=2024-05-29T09%3A24%3A23.265Z"
              contentFit="contain"
              transition={1000}
            />
            <GradientText
              text="Log in"
              fontSize={32}
              isGradientFill
              gradientColors={[primaryColor, "#FFCC00"]}
              fontFamily={"Cocon"}
              style={styles.title}
              fontWeight={"bold"}
            />
          </View>
          <View>
            <ThemedText style={styles.label}>E-mail</ThemedText>
            <Input
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              placeholder="rit@care.be"
              keyboardType="email-address"
            />

            <ThemedText style={styles.label}>Wachtwoord</ThemedText>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••••"
              password
            />
          </View>
          <View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button onPress={signInWithEmail} disabled={loading}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                {loading ? "Inloggen..." : "Inloggen"}
              </Text>
            </Button>
            {/* <Link href="/register" style={styles.textButton}>
                Create an account
              </Link> */}
          </View>
        </ThemedView>
      </KeyboardAwareScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screencontainer: {
    height: "100%",
    backgroundColor: "transparent",
  },
  container: {
    height: "100%",
    backgroundColor: "transparent",
    display: "flex",
  },
  themedView: {
    paddingHorizontal: 24,
    paddingVertical: 128,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "red",
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
    color: primaryColor,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
  title: {
    margin: "auto",
    marginTop: -40,
  },
});

export default SignInScreen;
