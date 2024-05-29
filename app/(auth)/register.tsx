import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { useFonts } from "expo-font";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

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
      <Text style={styles.title}>Registreren</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="rit@care.be"
        style={styles.input}
      />

      <Text style={styles.label}>Wachtwoord</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Uw wachtwoord"
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? "Registreren..." : "Registreren"}
      />
      <Link href="/login" style={styles.textButton}>
        Log in
      </Link>
    </View>
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
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Cocon",
    marginBottom: 20,
    textAlign: "center",
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
