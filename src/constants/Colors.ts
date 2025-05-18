/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    secondaryBG: "#171717",
    icon: '#000',
    tabIconDefault: '#687076',
    gray: "#999999",
    tabBarIcon: "blue",
  },
  dark: {
    text: '#fff',
    background: '#000',
    secondaryBG: "#171717",
    icon: '#fff',
    tabIconDefault: '#9BA1A6',
    gray: "#444444",
    tabBarIcon: "blue",
  },
  primary: "#20E1B2",
};


export const getThemeColor = (colorScheme: "dark" | "light" | undefined) => Colors[colorScheme || 'dark'];
