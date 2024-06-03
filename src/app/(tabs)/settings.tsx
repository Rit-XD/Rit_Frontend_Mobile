import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { View, Text, StyleSheet } from "react-native";

const SettingsScreen = () => {
  async function signOut() {
    await supabase.auth.signOut();
  }
  return (
    <View style={styles.container}>
      <Text>Settings</Text>

      <Button
        text="Uitloggen"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 50,
  },
});
