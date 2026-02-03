import React from "react";

function CartSidebar({ isOpen, closeCart, cartItems, updateQty, removeItem }) {
  // Hitung Total Harga
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <>
      {/* Overlay Gelap */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={closeCart}
      ></div>

      {/* Sidebar Putih */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Keranjang Belanja</h2>
          <button className="close-btn" onClick={closeCart}>
            &times;
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p
              style={{ textAlign: "center", marginTop: "50px", color: "#999" }}
            >
              Keranjang masih kosong 😢
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    {formatRupiah(item.price)}
                  </div>
                </div>

                {/* Kontrol Jumlah Barang */}
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, -1)}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "0.9rem" }}>{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "red",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Sidebar (Total & Checkout) */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Total:</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() =>
                alert(
                  "Terima kasih sudah berbelanja! Fitur Payment belum tersedia.",
                )
              }
            >
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
