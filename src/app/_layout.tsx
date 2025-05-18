import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import { useColorScheme } from 'nativewind';
import { Colors, getThemeColor } from '@/constants/Colors';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import Icon from '@/components/ui/ThemeIcon';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// colorScheme.set("system")

export default function RootLayout() {
  const theme = useColorScheme()
  const router = useRouter()

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return (
    <GestureHandlerRootView className=' flex-1'>

      <Stack>


        <Stack.Screen
          name="index"
          options={{
            contentStyle: {
              backgroundColor: getThemeColor(theme.colorScheme).background,
            },
            header: () => <Header />
          }}
        />




        <Stack.Screen
          name="basket"
          options={{
            headerTitle: "Basket",
            headerTitleStyle: { color: getThemeColor(theme.colorScheme).text },
            headerStyle: { backgroundColor: getThemeColor(theme.colorScheme).secondaryBG, },
            contentStyle: {
              backgroundColor: getThemeColor(theme.colorScheme).background,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} >
                <Icon type='Ionicons' name="arrow-back" size={28} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name='(modal)/filter'
          options={{
            presentation: "modal",
            headerTitle: "Filter",
            headerShadowVisible: false,
            // animation: "default",
            headerTitleStyle: {
              color: getThemeColor(theme.colorScheme).text
            },
            headerStyle: {
              backgroundColor: getThemeColor(theme.colorScheme).secondaryBG,
            },
            contentStyle: {
              backgroundColor: getThemeColor(theme.colorScheme).secondaryBG
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Icon type='Ionicons' name="close-outline" size={28} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}

        />


        <Stack.Screen
          name="(modal)/dish"


          options={{
            presentation: 'modal',
            animation: "slide_from_bottom",
            headerShown: false,
            headerStyle: { backgroundColor: getThemeColor(theme.colorScheme).secondaryBG, },
            contentStyle: {
              backgroundColor: getThemeColor(theme.colorScheme).background,
            },

          }}
        />



        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView >
  );
}
