import React, { useState } from "react";
// Pastikan kamu sudah menjalankan: npm install qrcode.react
import { QRCodeCanvas } from "qrcode.react";

function CartSidebar({ isOpen, closeCart, cartItems = [], updateQty }) {
  // State untuk alur: cart -> qr -> struk
  const [view, setView] = useState("cart");

  // Hitung Total Harga dengan pengaman (?? 0)
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || 0),
    0,
  );

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Fungsi tutup yang mereset tampilan kembali ke keranjang
  const handleCloseSidebar = () => {
    setView("cart");
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={handleCloseSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>
            {view === "cart" && "Keranjang"}
            {view === "qr" && "Pembayaran"}
            {view === "struk" && "Struk Digital"}
          </h2>
          <button className="close-btn" onClick={handleCloseSidebar}>
            &times;
          </button>
        </div>

        <div
          className="cart-content"
          style={{
            padding: "15px",
            overflowY: "auto",
            height: "calc(100% - 150px)",
          }}
        >
          {/* TAMPILAN 1: DAFTAR BELANJA */}
          {view === "cart" &&
            (cartItems.length === 0 ? (
              <p style={{ textAlign: "center", marginTop: "50px" }}>
                Keranjang kosong 😢
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-item"
                  style={{
                    display: "flex",
                    marginBottom: "15px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: "0.9rem" }}>
                      {item.name}
                    </h4>
                    <small>{formatRupiah(item.price)}</small>
                  </div>
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              ))
            ))}

          {/* TAMPILAN 2: QR CODE */}
          {view === "qr" && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p>Scan QRIS SMK Store:</p>
              <div
                style={{
                  background: "white",
                  padding: "15px",
                  display: "inline-block",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              >
                <QRCodeCanvas
                  value={`PAYMENT-SMK-STORE-${totalPrice}`}
                  size={180}
                  includeMargin={true}
                />
              </div>
              <h3 style={{ marginTop: "15px", color: "#27ae60" }}>
                {formatRupiah(totalPrice)}
              </h3>
              <button
                className="checkout-btn"
                style={{ marginTop: "20px", background: "#27ae60" }}
                onClick={() => setView("struk")}
              >
                Konfirmasi Sudah Bayar
              </button>
            </div>
          )}

          {/* TAMPILAN 3: STRUK */}
          {view === "struk" && (
            <div
              style={{
                background: "#fffef0",
                padding: "15px",
                border: "1px dashed #000",
                fontFamily: "monospace",
              }}
            >
              <center>
                <strong>SMK STORE PROJECT</strong>
                <br />
                <small>Bukti Pembayaran Lunas</small>
                <p>=========================</p>
              </center>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                  }}
                >
                  <span>
                    {item.name} (x{item.qty})
                  </span>
                  <span>{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}
              <p>=========================</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>TOTAL</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>
              <center style={{ marginTop: "20px" }}>
                <small>Terima kasih sudah berbelanja!</small>
                <button
                  onClick={handleCloseSidebar}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "15px",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  Selesai
                </button>
              </center>
            </div>
          )}
        </div>

        {/* FOOTER: Hanya muncul jika di tampilan keranjang & ada isi */}
        {view === "cart" && cartItems.length > 0 && (
          <div
            className="cart-footer"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "15px",
              background: "#fff",
              borderTop: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              <span>Total:</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <button
              className="checkout-btn"
              style={{ width: "100%" }}
              onClick={() => setView("qr")}
            >
              Bayar Sekarang
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
