/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const primaryColor = "#ED6A01";
export const secondaryColor = "#FFCC00";
const tintColorLight = primaryColor;
const tintColorDark = primaryColor;

export const Colors = {
  light: {
    text: "#11181C",
    background: "#ffffff",
    backgroundColor: "red",
    tint: tintColorLight,
    icon: primaryColor,
    tabIconDefault: primaryColor,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151515',
    tint: tintColorDark,
    icon: primaryColor,
    tabIconDefault: primaryColor,
    tabIconSelected: tintColorDark,
  },
};
