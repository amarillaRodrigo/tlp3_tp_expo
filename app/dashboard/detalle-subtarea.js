import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Divider, useTheme, Chip, Avatar, Button } from 'react-native-paper';
import { useLocalSearchParams, Stack } from 'expo-router';
import { TAREAS } from '../constants/tareas.js'

export default function DetalleSubtareaScreen() {
  const theme = useTheme();
  const { subtareaId, tareaId, subtareaTitulo } = useLocalSearchParams();
  const [subtarea, setSubtarea] = useState(null);
  const [tarea, setTarea] = useState(null);
  
  useEffect(() => {
    if (tareaId && subtareaId) {
      const tareaEncontrada = TAREAS.find(t => t.id === parseInt(tareaId));
      if (tareaEncontrada) {
        setTarea(tareaEncontrada);
        const subtareaEncontrada = tareaEncontrada.subtareas.find(
          st => st.id === parseInt(subtareaId)
        );
        if (subtareaEncontrada) {
          setSubtarea(subtareaEncontrada);
        }
      }
    }
  }, [tareaId, subtareaId]);

  if (!subtarea) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Cargando detalles...</Text>
      </View>
    );
  }

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Completada':
        return '#27ae60';
      case 'En progreso':
        return '#f39c12';
      case 'Pendiente':
      default:
        return '#e74c3c';
    }
  };
  
  const getPriorityColor = (prioridad) => {
    switch (prioridad) {
      case 'Alta':
        return '#e74c3c';
      case 'Media':
        return '#f39c12';
      case 'Baja':
      default:
        return '#27ae60';
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen 
        options={{ 
          title: subtareaTitulo || "Detalle de subtarea",
          headerBackTitle: tarea?.titulo || "Subtareas"
        }} 
      />
      
      <Surface style={styles.headerContainer} elevation={2}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{subtarea.titulo}</Text>
          <Chip 
            style={{ backgroundColor: getStatusColor(subtarea.estado) }}
            textStyle={{ color: 'white' }}
          >
            {subtarea.estado}
          </Chip>
        </View>
        <Text style={styles.parentTask}>Tarea principal: {tarea?.titulo}</Text>
      </Surface>
      
      <Surface style={styles.section} elevation={2}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Divider style={styles.divider} />
        <Text style={styles.description}>{subtarea.descripcion}</Text>
      </Surface>
      
      <Surface style={styles.section} elevation={2}>
        <Text style={styles.sectionTitle}>Detalles</Text>
        <Divider style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Prioridad:</Text>
          <Chip 
            style={{ backgroundColor: getPriorityColor(subtarea.prioridad) }}
            textStyle={{ color: 'white' }}
          >
            {subtarea.prioridad}
          </Chip>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fecha límite:</Text>
          <Text style={styles.infoValue}>{subtarea.fechaLimite}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Responsable:</Text>
          <View style={styles.responsable}>
            <Avatar.Text 
              size={24} 
              label={subtarea.responsable.split(' ').map(n => n[0]).join('')} 
              color="white"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <Text style={styles.infoValue}>{subtarea.responsable}</Text>
          </View>
        </View>
      </Surface>
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          icon="check" 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          Marcar como completada
        </Button>
        <Button 
          mode="outlined" 
          icon="pencil" 
          style={styles.button}
          textColor={theme.colors.primary}
        >
          Editar subtarea
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  parentTask: {
    fontStyle: 'italic',
    marginTop: 4,
    color: '#555',
  },
  section: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  divider: {
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    width: 100,
  },
  infoValue: {
    fontSize: 16,
  },
  responsable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    marginBottom: 16,
    borderRadius: 8,
  }
});