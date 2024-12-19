import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../database';

export default function ProductListScreen() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const response = await fetch('https://fakestoreapi.com/products');
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const onRefresh = () => {
		setRefreshing(true);
		fetchProducts().finally(() => setRefreshing(false));
	};

	const handleAddToCart = (product) => {
		addToCart(product);
		alert('Товар добавлен в корзину');
	  };
	  
	if (loading) {
		return (
			<View style={styles.loader}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<FlatList
			data={products}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => <ProductCard product={item} onAddToCart={handleAddToCart} />}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			contentContainerStyle={styles.list}
		/>
	);
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	list: {
		padding: 10,
	},
});
