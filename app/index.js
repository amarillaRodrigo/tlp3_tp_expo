import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, Surface, ActivityIndicator, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    // Validar que haya ingresado un usuario
    if (!username.trim()) {
      alert('Por favor ingrese un nombre de usuario');
      return;
    }
    
    // Simular carga
    setLoading(true);
    
    // Generar correo random basado en el nombre de usuario
    const randomEmail = `${username.toLowerCase().replace(/\s+/g, '.')}@ejemplo.com`;
    
    try {
      // Guardar datos de usuario en AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify({
        username,
        email: randomEmail,
        avatarId: Math.floor(Math.random() * 1000) // ID aleatorio para la imagen
      }));
      
      // Navegar al dashboard
      setTimeout(() => {
        setLoading(false);
        router.replace('/dashboard/home');
      }, 1500);
      
    } catch (error) {
      console.error('Error guardando datos:', error);
      setLoading(false);
      alert('Error al iniciar sesión. Intente nuevamente.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]} elevation={4}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            style={styles.logo}
          />
        </View>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Bienvenido/a</Text>
        
        <TextInput
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="account" color={theme.colors.primary} />}
          outlineColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.primary}
        />
        
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
          outlineColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.primary}
          right={
            <TextInput.Icon 
              icon={secureTextEntry ? "eye" : "eye-off"} 
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              color={theme.colors.secondary}
            />
          }
        />
        
        <Button 
          mode="contained" 
          onPress={handleLogin} 
          style={styles.button}
          disabled={loading}
          buttonColor={theme.colors.primary}
        >
          {loading ? <ActivityIndicator animating={true} color="white" /> : "Ingresar"}
        </Button>
        
        <Text style={[styles.registerText, { color: theme.colors.secondary }]}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  surface: {
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderRadius: 16,
  },
  logoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 50,
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  registerText: {
    marginTop: 24,
    fontSize: 16,
  },
});