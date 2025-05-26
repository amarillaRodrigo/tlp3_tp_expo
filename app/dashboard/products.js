import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator, Searchbar, Chip, Badge } from 'react-native-paper';
import axios from 'axios';

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ["Electrónica", "Ropa", "Hogar", "Deportes", "Juguetes"];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Simulamos productos con JSONPlaceholder
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
          params: { _limit: 20 }
        });
        
        // Transformamos la respuesta para adaptarla a nuestro formato de producto
        const formattedProducts = response.data.map(item => ({
          id: item.id,
          title: item.title.split(' ').slice(0, 3).join(' '),
          description: `Descripción del producto ${item.id}. Este es un producto de alta calidad.`,
          price: (Math.random() * 100 + 10).toFixed(2),
          image: item.url,
          category: categories[Math.floor(Math.random() * categories.length)]
        }));
        
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    // Filtramos los productos basados en la búsqueda y categoría
    let results = products;
    
    if (searchQuery) {
      results = results.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, products]);

  const onChangeSearch = query => setSearchQuery(query);
  
  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Badge style={styles.priceBadge}>${item.price}</Badge>
      <Card.Content>
        <Title style={styles.productTitle}>{item.title}</Title>
        <Chip icon="tag" style={styles.categoryChip}>{item.category}</Chip>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button icon="cart">Agregar</Button>
        <Button icon="eye">Detalles</Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar productos"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Chip
              selected={selectedCategory === item}
              style={styles.categoryFilterChip}
              onPress={() => toggleCategory(item)}
            >
              {item}
            </Chip>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    margin: 8,
    elevation: 4,
  },
  categoriesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  categoryFilterChip: {
    margin: 4,
  },
  productList: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    maxWidth: '47%',
  },
  productTitle: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
  priceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#3498db',
  },
  categoryChip: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  }
});