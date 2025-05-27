import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Badge, Divider, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { TAREAS } from '../constants/tareas.js'

export default function TareasScreen() {
  const theme = useTheme();
  const router = useRouter();
  
  const navigateToSubtareas = (tarea) => {
    router.push({
      pathname: '/dashboard/subtareas',
      params: { 
        tareaId: tarea.id,
        tareaTitulo: tarea.titulo
      }
    });
  };
  
  const renderTarea = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToSubtareas(item)}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text variant="titleLarge" style={{ flex: 1 }}>{item.titulo}</Text>
            <Badge style={styles.subtaskCount}>
              {item.subtareas.length}
            </Badge>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <Text variant="bodyMedium">{item.descripcion}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Mis Tareas</Text>
      <FlatList
        data={TAREAS}
        renderItem={renderTarea}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtaskCount: {
    backgroundColor: '#3498db',
  }
});