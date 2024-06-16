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
import { Driver } from "@/types/Driver.type";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { supabase } from "@/lib/supabase";
import { primaryColor } from "@/constants/Colors";
import Modal from "react-native-modal";

type AccountProps = {
  onClose: () => void;
};

const Account = ({ onClose }: AccountProps) => {
  const { user, fetchDriver } = useAuth();
  const themeColor = useThemeColor(
    { light: "#151515", dark: "#fefefe" },
    "background"
  );
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [scopeUser, setScopeUser] = useState(user);
  const [newUser, setNewUser] = useState<Driver | null>(user);
  const [showAcceptModal, setShowAcceptModal] = useState<"confirmed" | null>(null);

  useEffect(() => {
    if (imageFile && imageFile!.uri) {
      setImage(imageFile!.uri);
    } else {
      setImage(user!.picture);
    }
  }, [user!.picture, imageFile]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageFile(result.assets[0]);
    }
  };

  const [uploading, setUploading] = useState(false)

  const uploadAvatar = async (file: ImagePicker.ImagePickerAsset) => {
  try {
    setUploading(true)

    if (!file) {
      throw new Error('You must select an image to upload.')
    }
    console.log(file)
    const fileExt = file.uri.split('.').pop()
    const filePath = `${user!.id}/${Math.random()}.${fileExt}`
    const {data, error: uploadError} = await supabase.storage
      .from('profilePics')
      .upload(filePath, file.uri, { contentType: `image/${fileExt}`})

    if (uploadError) {
      throw uploadError
    }
    let url = supabase.storage.from('profilePics').getPublicUrl(filePath)
      .data.publicUrl
    setImage(url);
  } catch (error) {
    console.log('Error uploading avatar: ', error)
  } finally {
    setUploading(false)
  }
}

  const onSave = async() => {
    try {
      if (image) uploadAvatar(imageFile!)
    } catch (error) {
      console.log(error);
    }
    const query = supabaseAdmin
    .from("Driver")
    .update({
      firstname: newUser!.firstname,
      lastname: newUser!.lastname,
      date_of_birth: newUser!.date_of_birth,
      city: newUser!.city,
      postal: newUser!.postal,
      picture: image,
    })
    .eq("id", user!.id)
    .select() 
    const { data, error } = await query;
    if(error) console.log(error);
    if(!error) fetchDriver(user!.id);
    setShowAcceptModal("confirmed");
    return data;
    
  }

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
        <Input value={newUser!.firstname || ""} onChangeText={(value) => {if(newUser) setNewUser({...newUser, firstname: value})}} />
        <ThemedText style={styles.label}>Achternaam</ThemedText>
        <Input value={newUser!.lastname || ""} onChangeText={(value) => {if(newUser) setNewUser({...newUser, lastname: value})}} />
        <ThemedText style={styles.label}>Geboortedatum</ThemedText>
        <Input value={newUser!.date_of_birth || ""} onChangeText={(value) => {if(newUser) setNewUser({...newUser, date_of_birth: value})}} />
        <View style={styles.address}>
          <View>
            <ThemedText style={styles.label}>Plaats</ThemedText>
            <Input
              value={newUser!.city || ""}
              onChangeText={(value) => {if(newUser) setNewUser({...newUser, city: value})}}
              style={{ width: 234 }}
            />
          </View>
          <View>
            <ThemedText style={styles.label}>Postcode</ThemedText>
            <Input
              keyboardType="numeric"
              value={newUser!.postal?.toString() || ""}
              onChangeText={(value) => {if(newUser) setNewUser({...newUser, postal: value})}}
              style={{ width: 95 }}
            />
          </View>
        </View>
      </View>
      <Button onPress={onSave}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Opslaan</Text>
      </Button>
      <Modal isVisible={showAcceptModal === "confirmed"} style={{margin: 0}} animationIn="fadeIn" animationOut="fadeOut">
          <Pressable
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "black",
              opacity: 0.75,
              position: "absolute",
            }}
            onPress={() => setShowAcceptModal(null)}
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
              Account
            </Text>
            <ThemedText style={{ textAlign: "center", marginBottom: 16 }}>
              Accountgegevens opgeslagen
            </ThemedText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 16,
                  borderColor: "#CCCCCC",
                  borderTopWidth: 0.5,
                  backgroundColor: primaryColor,
                }}
                onPress={() => setShowAcceptModal(null)}
              >
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Accepteer
                </Text>
              </Pressable>
            </View>
          </ThemedView>
        </Modal>
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
