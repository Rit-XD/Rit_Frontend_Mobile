import { supabase } from '@/lib/supabase';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {

  async function signOut() {
    await supabase.auth.signOut();
  }
  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  }
});