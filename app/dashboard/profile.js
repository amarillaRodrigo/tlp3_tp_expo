import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Button,
  Divider,
  List,
  Avatar,
  Surface,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme(); // Obtener el tema actual
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recuperar datos del usuario al cargar el componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const data = JSON.parse(userDataString);
          setUserData(data);
        } else {
          // Si no hay datos, usamos un valor predeterminado
          setUserData({
            username: "Usuario",
            email: "usuario@ejemplo.com",
            avatarId: 123
          });
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Eliminar datos de la sesión
      await AsyncStorage.removeItem("userData");
      // Navegar a la pantalla de login
      router.replace("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para generar URLs de avatar que no sean personas
  const getAvatarUrl = (id) => {
    // Categorías de imágenes que no son personas
    const categories = [
      "abstract", "animals", "business", "cats", "city", "food", 
      "nightlife", "fashion", "nature", "sports", "technics", "transport"
    ];
    
    // Elegir una categoría aleatoria
    const category = categories[id % categories.length];
    
    // Retornar URL de una imagen de esa categoría
    return `https://loremflickr.com/320/320/${category}?lock=${id}`;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Surface 
        style={[styles.header, { backgroundColor: theme.colors.surface }]} 
        elevation={4}
      >
        <Avatar.Image
          size={120}
          source={{ uri: userData ? getAvatarUrl(userData.avatarId) : getAvatarUrl(0) }}
          style={styles.avatar}
        />
        <Text 
          style={[styles.name, { color: theme.colors.primary }]}
        >
          {userData?.username || "Usuario"}
        </Text>
        <Text style={styles.email}>{userData?.email || "usuario@ejemplo.com"}</Text>
      </Surface>

      <Surface 
        style={[styles.section, { backgroundColor: theme.colors.surface }]} 
        elevation={2}
      >
        <Text 
          style={[styles.sectionTitle, { color: theme.colors.secondary }]}
        >
          Soporte
        </Text>
        <List.Item
          title="Ayuda & soporte técnico"
          left={(props) => <List.Icon {...props} color={theme.colors.secondary} icon="help-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Términos y condiciones"
          left={(props) => <List.Icon {...props} color={theme.colors.secondary} icon="file-document" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </Surface>

      <Button
        mode="contained"
        style={[styles.logoutButton, { backgroundColor: theme.colors.tertiary }]}
        icon="logout"
        onPress={handleLogout}
      >
        Cerrar Sesión
      </Button>

      <Text style={styles.versionText}>Versión 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
    paddingBottom: 8,
  },
  logoutButton: {
    margin: 16,
    borderRadius: 8,
    paddingVertical: 6,
  },
  versionText: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
    color: "#888",
  },
});