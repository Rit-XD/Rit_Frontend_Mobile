// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { Colors, primaryColor } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

const colorScheme = useColorScheme();


export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3, color: primaryColor }, style]} {...rest} />;
}
