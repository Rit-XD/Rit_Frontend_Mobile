import { StyleSheet, Text, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useAuth } from "@/providers/AuthProvider";
import { ThemedText } from "@/components/ThemedText";
import { primaryColor, secondaryColor } from "@/constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { user } = useAuth();
  const [logout, setLogout] = useState(false);

  return (
    <ThemedView style={styles.page}>
            <LinearGradient
        // Background Linear Gradient
        colors={[primaryColor, secondaryColor]}
        style={styles.headBackground}
      />
      <View style= {styles.head}>
        <Image 
        source={"https://iqfcxjbnqcpjzggtcptb.supabase.co/storage/v1/object/public/profilePics/Rit-Logo.png?t=2024-05-29T09%3A24%3A23.265Z"} 
        style={styles.image}               
        contentFit="contain"
        transition={1000}
        />   
        <View style={styles.headTextContainer}>
          <ThemedText style={styles.headText}>Hey {user.name},</ThemedText>
          <ThemedText style={styles.headText}>Wie pik jij vandaag op?</ThemedText>
        </View> 
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    height: "100%",
    paddingTop: 64,
  },
  head: {
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 24
  },
  headBackground: {
    position: 'absolute',
    height: "25%",
    width: "100%",
    opacity: 0.1
  },
  headTextContainer: {
    marginLeft: 16,
    display: "flex",
    justifyContent: "center"
  },
  headText: {
    fontSize: 24,
  },
  image: {
    width: 64,
    height: 64,
  }
});
