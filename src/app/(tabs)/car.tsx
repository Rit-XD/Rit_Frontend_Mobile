import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { View, Text, StyleSheet } from "react-native";

const CarScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Voertuig</Text>
    </View>
  );
};

export default CarScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 50,
  },
});
