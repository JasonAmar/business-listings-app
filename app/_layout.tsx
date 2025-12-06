import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import Toast from 'react-native-toast-message';

export default function TabLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Set the navigation bar style
      NavigationBar.setStyle('dark');
    }
  }, []);

  return (
    <>
      <ThemeProvider value={DarkTheme}>
        <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
          <Stack.Screen
            name='index'
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style='light' />
      </ThemeProvider>
      <Toast />
    </>
  );
}
