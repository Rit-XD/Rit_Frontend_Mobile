import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../ui/Button';
import { AntDesign } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

type LicenseProps = {
    onClose: () => void;
  };

const License = ({onClose} : LicenseProps) => {
    const themeColor = useThemeColor({ light: "#151515", dark: "#fefefe" }, 'background');

    return (
        <ThemedView style={styles.container}>
            <Button mod={["white", "square"]} onPress={onClose} style={{position: 'absolute', top: 64, left: 32}}>
                <AntDesign name='arrowleft' size={24} color={themeColor}/>
            </Button>
            <ThemedText>Rijbewijs</ThemedText>
        </ThemedView>
    )
}

export default License

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: 74,
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
})