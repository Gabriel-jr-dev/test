import { useMemo } from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const theme = useMemo(
    () => (colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    [colorScheme]
  );

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerType: 'front',
        sceneContainerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          drawerLabel: 'Favorites',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
