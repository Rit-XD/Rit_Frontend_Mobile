import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useAuth } from "@/providers/AuthProvider";
import Input from "../ui/Input";

type AccountProps = {
  onClose: () => void;
};

const Account = ({ onClose }: AccountProps) => {
  const { user } = useAuth();
  const themeColor = useThemeColor(
    { light: "#151515", dark: "#fefefe" },
    "background"
  );
  const [image, setImage] = useState<string | null>(null);
  const [scopeUser, setScopeUser] = useState(user);
  useEffect(() => {
    if (user.picture) {
      setImage(user.picture);
    }
  }, [user.picture]);

  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
      <ThemedText style={styles.title}>Account</ThemedText>
      <View>
        <Pressable onPress={pickImage} style={styles.profilepic}>
          {image && <Image source={image} style={styles.image} />}
          {!image && (
            <Image
              source={
                "https://iqfcxjbnqcpjzggtcptb.supabase.co/storage/v1/object/public/profilePics/placeholder.jpg"
              }
              style={styles.image}
            />
          )}
          <ThemedView style={styles.editImage}>
            <Feather name="edit" size={20} color={themeColor} />
          </ThemedView>
        </Pressable>
        <ThemedText style={styles.label}>Voornaam</ThemedText>
        <Input value={user.firstname} onChangeText={() => {}} />
        <ThemedText style={styles.label}>Achternaam</ThemedText>
        <Input value={user.lastname} onChangeText={() => {}} />
        <ThemedText style={styles.label}>Geboortedatum</ThemedText>
        <Input value={user.date_of_birth} onChangeText={() => {}} />
        <View style={styles.address}>
          <View>
            <ThemedText style={styles.label}>Plaats</ThemedText>
            <Input
              value={user.city}
              onChangeText={() => {}}
              style={{ width: 234 }}
            />
          </View>
          <View>
            <ThemedText style={styles.label}>Postcode</ThemedText>
            <Input
              keyboardType="numeric"
              value={user.postal || ""}
              onChangeText={() => {}}
              style={{ width: 95 }}
            />
          </View>
        </View>
      </View>
      <Button>
        <Text style={{ color: "white", fontWeight: "bold" }}>Opslaan</Text>
      </Button>
    </ThemedView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 74,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    marginHorizontal: "auto",
    fontFamily: "Cocon",
  },
  profilepic: {
    position: "relative",
    width: 100,
    marginHorizontal: "auto",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
  editImage: {
    position: "absolute",
    bottom: 8,
    right: 0,
    padding: 8,
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  address: {
    flexDirection: "row",
    gap: 16,
  },
  label: {
    fontWeight: "bold",
  },
});
