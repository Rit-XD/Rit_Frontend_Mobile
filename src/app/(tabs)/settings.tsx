import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
  async function signOut() {
    await supabase.auth.signOut();
  }
  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <Button
        text="Uitloggen"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 50,
  },
});
