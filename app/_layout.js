import { Tabs } from 'expo-router';
import { setupDatabase } from '../database';

export default function Layout() {
  setupDatabase();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Товары' }} />
      <Tabs.Screen name="cart" options={{ title: 'Корзина' }} />
    </Tabs>
  );
}
