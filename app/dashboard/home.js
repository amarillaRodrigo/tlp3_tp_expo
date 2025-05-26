import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Card, Text, Title, Paragraph, Button, ActivityIndicator, Chip } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para cargar noticias simuladas
    const loadNews = async () => {
      try {
        setLoading(true);
        
        // Simulamos datos con API de placeholder
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { _limit: 5 }
        });
        
        // Agregamos imágenes aleatorias a los datos
        const newsWithImages = response.data.map(item => ({
          ...item,
          image: `https://picsum.photos/seed/${item.id}/500/300`,
          category: ['Tecnología', 'Deportes', 'Salud', 'Ciencia', 'Entretenimiento'][Math.floor(Math.random() * 5)]
        }));
        
        setNews(newsWithImages);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar noticias');
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Cargando noticias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={() => loadNews()}>
          Reintentar
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido al Dashboard</Text>
      <Text style={styles.subtitle}>Noticias de hoy</Text>
      
      {news.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Content>
            <Chip style={styles.chip} icon="tag">{item.category}</Chip>
            <Title>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Title>
            <Paragraph>{item.body}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Leer más</Button>
            <Button icon="share">Compartir</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#555',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  loadingText: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  chip: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  }
});