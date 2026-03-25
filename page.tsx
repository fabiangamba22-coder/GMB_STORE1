'use client';

import React, { useState } from 'react';
import { ShoppingCart, Zap, Package, ShieldCheck, ArrowRight, Trash2, X } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Neural Link Processor", price: 299, image: "https://picsum.photos/seed/p1/400/300" },
  { id: 2, name: "Cyberdeck V3", price: 850, image: "https://picsum.photos/seed/p2/400/300" },
  { id: 3, name: "Neon Flux Capacitor", price: 125, image: "https://picsum.photos/seed/p3/400/300" },
  { id: 4, name: "Data Crystal 1TB", price: 45, image: "https://picsum.photos/seed/p4/400/300" },
  { id: 5, name: "GMB Signature HUD", price: 199, image: "https://picsum.photos/seed/p5/400/300" },
  { id: 6, name: "Prism Core Engine", price: 1200, image: "https://picsum.photos/seed/p6/400/300" },
  { id: 7, name: "Void Shell Case", price: 75, image: "https://picsum.photos/seed/p7/400/300" },
  { id: 8, name: "Quantum Sync Cable", price: 25, image: "https://picsum.photos/seed/p8/400/300" },
];

export default function StorePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    alert(`${productName} added to cart!`);
  };

  const handleCartClick = () => {
    alert(`Cart functionality triggered! You have ${cartCount} items.`);
  };

  return (
    <div className="store-container">
      <style jsx global>{`
        :root {
          --bg: #0a0a0c;
          --card-bg: #16161a;
          --text: #e0e0e0;
          --cyan: #00f2ff;
          --purple: #bc13fe;
          --blue: #2979ff;
          --border: rgba(255, 255, 255, 0.05);
        }

        .store-container {
          background-color: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          line-height: 1.6;
          margin: -40px;
          padding: 0;
        }

        /* HEADER */
        header {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1.5rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 10, 12, 0.8);
          backdrop-filter: blur(10px);
        }

        .brand-logo {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: linear-gradient(to right, var(--cyan), var(--purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cart-status {
          cursor: pointer;
          padding: 8px 16px;
          border: 1px solid var(--cyan);
          border-radius: 20px;
          background: transparent;
          color: var(--text);
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
        }

        .cart-status:hover {
          box-shadow: 0 0 15px var(--cyan);
        }

        /* MAIN CONTENT */
        main {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .hero-title {
          text-align: center;
          margin-bottom: 60px;
        }

        .hero-title h1 {
          font-size: 3rem;
          font-weight: bold;
          letter-spacing: -1px;
          margin-bottom: 10px;
        }

        .neon-accent {
          color: var(--cyan);
          text-shadow: 0 0 10px var(--cyan);
        }

        /* PRODUCT GRID */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        /* PRODUCT CARD */
        .product-card {
          background: var(--card-bg);
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          border: 1px solid var(--border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(41, 121, 255, 0.2);
          border-color: var(--blue);
        }

        .product-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(45deg, #1e1e24, #2a2a35);
          border-radius: 10px;
          margin-bottom: 15px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 10px 0;
        }

        .product-price {
          font-size: 1.4rem;
          font-weight: bold;
          color: var(--cyan);
          margin-bottom: 20px;
        }

        .buy-btn {
          background: transparent;
          color: white;
          border: 1px solid var(--purple);
          padding: 10px 25px;
          border-radius: 5px;
          cursor: pointer;
          text-transform: uppercase;
          font-weight: bold;
          transition: 0.3s;
          width: 100%;
          margin-top: auto;
        }

        .buy-btn:hover {
          background: var(--purple);
          box-shadow: 0 0 20px var(--purple);
        }

        /* FOOTER */
        footer {
          text-align: center;
          padding: 60px 20px;
          border-top: 1px solid var(--border);
          margin-top: 50px;
          color: #666;
        }

        .footer-brand {
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 10px;
          display: block;
        }
      `}</style>

      <header>
        <div className="brand-logo">GMB STORE</div>
        <button className="cart-status" onClick={handleCartClick}>
          <ShoppingCart size={18} />
          <span>CART: {cartCount}</span>
        </button>
      </header>

      <main>
        <div className="hero-title">
          <h1>FUTURE <span className="neon-accent">DEVICES</span></h1>
          <p className="text-muted-foreground">Premium neural hardware and digital artifacts.</p>
        </div>

        <div className="product-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">${product.price}</div>
              <button className="buy-btn" onClick={() => handleAddToCart(product.name)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <span className="footer-brand">GMB STORE</span>
        <p>&copy; 2024 AUTHORIZED VENDOR SECTOR 7</p>
      </footer>
    </div>
  );
}
