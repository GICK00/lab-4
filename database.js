import * as SQLite from 'expo-sqlite';

let db;

export const setupDatabase = async () => {
  db = await SQLite.openDatabaseAsync('cart.db');

  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        image TEXT,
        price REAL NOT NULL,
        description TEXT,
        quantity INTEGER DEFAULT 1
      );
    `);
};

export const addToCart = async (product) => {
  const result = await db.runAsync(
    `
      INSERT INTO cart (id, name, image, price, description, quantity)
      VALUES (?, ?, ?, ?, ?, 1)
      ON CONFLICT(id) DO UPDATE SET quantity = quantity + 1;
      `,
    [product.id, product.title, product.image, product.price, product.description]
  );
};

export const getCartItems = async () => {
  const rows = await db.getAllAsync('SELECT * FROM cart');
  return rows;
};

export const removeFromCart = async (productId) => {
  await db.runAsync('DELETE FROM cart WHERE id = ?', [productId]);
};

export const getFirstCartItem = async () => {
  const firstItem = await db.getFirstAsync('SELECT * FROM cart');
  console.log('Первый товар в корзине:', firstItem);
  return firstItem;
};
