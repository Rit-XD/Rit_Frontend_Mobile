import { View, Text, TextInput, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { Colors, primaryColor } from "@/constants/Colors";
import { Image } from "expo-image";
import GradientText from "react-native-gradient-texts";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/ui/Input";

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
<<<<<<< HEAD
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <Image
              style={styles.image}
              source="https://iqfcxjbnqcpjzggtcptb.supabase.co/storage/v1/object/public/profilePics/Rit-Logo.png?t=2024-05-29T09%3A24%3A23.265Z" 
              contentFit="contain"
              transition={1000}
            />
          <GradientText text="Log in" fontSize={32} isGradientFill gradientColors={[primaryColor, "#FFCC00"]} fontFamily={"Cocon"} style={styles.title} fontWeight={"bold"}/>
        </View>
    
        <ThemedText style={styles.label}>E-mail</ThemedText>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="voorbeeld@rit.be"
          keyboardType="email-address"
        />
        
=======
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
>>>>>>> e9457e6ee225fc6c03705820cdc16e253ce83944

        <ThemedText style={styles.label}>Wachtwoord</ThemedText>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••••"
          password
        />

        <Button
          onPress={signInWithEmail}
          disabled={loading}
          text={loading ? "Signing in..." : "Sign in"}
        />
        <Link href="/register" style={styles.textButton}>
          Create an account
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 128,
    height: '100%',
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
<<<<<<< HEAD
    margin: 'auto',
    marginTop: -40,
=======
    fontWeight: "bold",
    margin: "auto",
>>>>>>> e9457e6ee225fc6c03705820cdc16e253ce83944
  },
});

export default SignInScreen;
