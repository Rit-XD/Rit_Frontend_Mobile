import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import GradientText from "react-native-gradient-texts";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        style={styles.image}
        source="https://iqfcxjbnqcpjzggtcptb.supabase.co/storage/v1/object/public/profilePics/Rit-Logo.png?t=2024-05-29T09%3A24%3A23.265Z"
        contentFit="contain"
        transition={1000}
      />
      <GradientText
        text="Log in"
        fontSize={24}
        isGradientFill
        gradientColors={["#ED6A01", "#FFCC00"]}
        fontFamily={"Cocon"}
        style={styles.title}
      />
      <Text style={styles.label}>Email</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? "Signing in..." : "Sign in"}
      />
      <Link href="/register" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
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
  image: {
    width: "100%",
    height: 100,
  },
  title: {
    fontWeight: "bold",
    margin: "auto",
  },
});

export default SignInScreen;
