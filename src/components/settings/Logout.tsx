import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { primaryColor } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

type LogoutProps = {
    onClose: () => void;
  };

const Logout = ({onClose} : LogoutProps) => {
    async function signOut() {
        await supabase.auth.signOut();
        }
    return (
        <>
            <Pressable style={{height: "100%", width: "100%", backgroundColor: "black", opacity: .25, position: 'absolute' }} onPress={onClose}/>
            <ThemedView style={{margin: 'auto', width: "75%", alignItems: 'center', borderRadius: 15, overflow: 'hidden'}}>
                <Text style={{marginVertical: 16, color: primaryColor, fontSize: 18, fontWeight: 'bold'}}>Afmelden</Text>
                <ThemedText style={{textAlign: 'center', marginBottom: 16, marginHorizontal: 16}}>Ben je zeker dat je wilt afmelden?</ThemedText>
                <View style= {{flexDirection: "row", alignItems: 'center'}}>
                    <Pressable style={{flex: 1, alignItems: 'center', paddingVertical: 16, borderColor: "#CCCCCC", borderRightWidth: .5, borderTopWidth: .5}} onPress={onClose}>
                        <ThemedText>Terug</ThemedText>
                    </Pressable>
                    <Pressable style={{flex: 1, alignItems: 'center', paddingVertical: 16, borderColor: "#CCCCCC", borderTopWidth: .5, backgroundColor: "red"}} onPress={signOut}>
                        <Text style={{lineHeight: 24, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Afmelden</Text>
                    </Pressable>
                </View>
            </ThemedView>
        </>
    )
}

export default Logout

const styles = StyleSheet.create({})