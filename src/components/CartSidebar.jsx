import React, { useState } from "react"; // Tambahkan useState
import { QRCodeSVG } from "qrcode.react"; // Tambahkan ini

function CartSidebar({ isOpen, closeCart, cartItems, updateQty, removeItem }) {
  // State untuk mengontrol tampilan QR Code
  const [showQR, setShowQR] = useState(false);

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

  // Fungsi untuk reset state saat sidebar ditutup
  const handleClose = () => {
    setShowQR(false);
    closeCart();
  };

  return (
    <>
      {/* Overlay Gelap */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={handleClose}
      ></div>

      {/* Sidebar Putih */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Keranjang Belanja</h2>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="cart-items">
          {/* ... bagian list item tetap sama seperti kode Anda ... */}
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

        {/* FOOTER: Bagian yang kita modifikasi */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {!showQR ? (
              <>
                <div className="total-row">
                  <span>Total:</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                <button
                  className="checkout-btn"
                  onClick={() => setShowQR(true)} // Ubah ini
                >
                  Bayar Sekarang (QRIS)
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "10px" }}>
                <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Scan QRIS untuk Membayar
                </p>

                {/* QR Code dinamis berdasarkan total belanja */}
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    display: "inline-block",
                    borderRadius: "8px",
                  }}
                >
                  <QRCodeSVG
                    value={`https://smk-store.vercel.app/pay?total=${totalPrice}`}
                    size={150}
                  />
                </div>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#27ae60",
                    fontWeight: "bold",
                  }}
                >
                  {formatRupiah(totalPrice)}
                </p>
                <button
                  onClick={() => setShowQR(false)}
                  style={{
                    fontSize: "0.8rem",
                    background: "none",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Kembali ke Keranjang
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
