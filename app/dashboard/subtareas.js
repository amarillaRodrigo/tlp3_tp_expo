import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, Divider, useTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { TAREAS } from '../constants/tareas.js'

export default function SubTareasScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { tareaId, tareaTitulo } = useLocalSearchParams();
  const [subtareas, setSubtareas] = useState([]);
  const [tarea, setTarea] = useState(null);
  
  useEffect(() => {
    if (tareaId) {
      const tareaEncontrada = TAREAS.find(t => t.id === parseInt(tareaId));
      if (tareaEncontrada) {
        setTarea(tareaEncontrada);
        setSubtareas(tareaEncontrada.subtareas);
      }
    }
  }, [tareaId]);
  
  const navigateToDetalle = (subtarea) => {
    router.push({
      pathname: '/dashboard/detalle-subtarea',
      params: {
        subtareaId: subtarea.id,
        tareaId: tareaId,
        subtareaTitulo: subtarea.titulo
      }
    });
  };
  
  const getStatusChip = (estado) => {
    let chipColor;
    switch (estado) {
      case 'Completada':
        chipColor = '#27ae60';
        break;
      case 'En progreso':
        chipColor = '#f39c12';
        break;
      case 'Pendiente':
      default:
        chipColor = '#e74c3c';
        break;
    }
    
    return (
      <Chip 
        style={{ backgroundColor: chipColor }}
        textStyle={{ color: 'white' }}
      >
        {estado}
      </Chip>
    );
  };
  
  const renderSubtarea = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetalle(item)}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={{ flex: 1 }}>{item.titulo}</Text>
            {getStatusChip(item.estado)}
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <Text variant="bodyMedium" numberOfLines={2}>{item.descripcion}</Text>
          <View style={styles.footer}>
            <Text variant="bodySmall">Prioridad: {item.prioridad}</Text>
            <Text variant="bodySmall">Fecha límite: {item.fechaLimite}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen 
        options={{ 
          title: tareaTitulo || "Subtareas",
          headerBackTitle: "Tareas"
        }} 
      />
      
      <FlatList
        data={subtareas}
        renderItem={renderSubtarea}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
          <Text style={styles.description}>{tarea?.descripcion}</Text>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No se encontraron subtareas</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
    color: '#555',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  }
});