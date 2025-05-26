import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Tema personalizado con nueva paleta de colores
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6A5ACD',         // Slateblue
    secondary: '#20B2AA',       // Light Sea Green
    tertiary: '#FF6347',        // Tomato
    accent: '#FFD700',          // Gold
    background: '#F8F8FF',      // Ghost White
    surface: '#FFFFFF',
    text: '#333333',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#FFA000',
    info: '#0288D1',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </PaperProvider>
  );
}