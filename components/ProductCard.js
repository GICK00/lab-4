import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function ProductCard({ product, onAddToCart, isCartItem, quantity }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name || product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      {isCartItem && <Text style={styles.quantity}>Количество: {quantity}</Text>}
      {!isCartItem && <Button title="Добавить в корзину" onPress={() => onAddToCart(product)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
    marginVertical: 8,
  },
});
