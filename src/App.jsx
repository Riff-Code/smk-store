import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartSidebar from "./components/CartSidebar"; // Komponen Baru
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Array Keranjang
  const [isCartOpen, setIsCartOpen] = useState(false); // Status Buka/Tutup Sidebar
  const [loading, setLoading] = useState(true);

  // URL MockAPI Kamu
  const API_URL = "https://6561ee54dcd355c08324587c.mockapi.io/products";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // --- LOGIKA KERANJANG PINTAR ---

  // 1. Tambah Barang (Cek Duplikat)
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Cek apakah barang sudah ada di keranjang?
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Jika ada, update qty-nya saja (+1)
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      } else {
        // Jika belum ada, masukkan sebagai barang baru dengan qty: 1
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
    // Buka sidebar otomatis saat tambah barang
    setIsCartOpen(true);
  };

  // 2. Ubah Jumlah (Tambah/Kurang) di Sidebar
  const updateQty = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + amount;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      }),
    );
  };

  // 3. Hapus Barang
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      {/* Navbar menerima fungsi untuk buka sidebar */}
      <Header
        cartCount={cart.reduce((acc, item) => acc + item.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Komponen Sidebar (Laci) */}
      <CartSidebar
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        cartItems={cart}
        updateQty={updateQty}
        removeItem={removeFromCart}
      />

      <main className="container">
        <h1 className="hero-title">Temukan Gadget Impianmu ✨</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>⏳ Memuat produk...</p>
        ) : (
          <ProductList products={products} onAddToCart={addToCart} />
        )}
      </main>
    </div>
  );
}

export default App;
