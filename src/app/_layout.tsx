import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';
import { ScrollView, View, useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import AuthProvider from '@/providers/AuthProvider';



export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
  } from 'expo-router';

  export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
  };

  // Prevent the splash screen from auto-hiding before asset loading is complete.
  SplashScreen.preventAutoHideAsync();

  export default function RootLayout() {
    const [loaded, error] = useFonts({
        // Load a custom font from a URL.
        'Cocon': require('@assets/fonts/Cocon.otf'),
        ...FontAwesome.font,
        });

        useEffect(() => {
            if(error) throw error;
        }, [error]);

        useEffect(() => {
            if(loaded) SplashScreen.hideAsync();
        }, [loaded]);

        if(!loaded) return null;

        return <RootLayoutNav />
  }

  function RootLayoutNav() {
    const colorscheme = useColorScheme();

    return (

        <ThemeProvider value={colorscheme === "dark"? DarkTheme : DefaultTheme}>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: colorscheme === "dark"? "#151515" : "#ffffff"}}} >
                    <Stack.Screen name="(auth)"/>
                    <Stack.Screen name="(tabs)"/>
                </Stack>
            </AuthProvider>
        </ThemeProvider>
    )
  }
