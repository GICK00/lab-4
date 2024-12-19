import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from 'expo-router';
import ProductCard from '../components/ProductCard';
import { getCartItems } from '../database';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCartItems = async () => {
        const items = await getCartItems(); 
        setCartItems(items);
      };

      fetchCartItems();
    }, [])
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Корзина пуста</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard product={item} isCartItem quantity={item.quantity} />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
  },
  list: {
    padding: 10,
  },
});
