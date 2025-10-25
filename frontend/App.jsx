import React, { useEffect, useState } from 'react';
import './styles/tailwind.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-cyan-600 text-white text-center p-6 text-3xl font-bold">ShopioDZ</header>
      <main className="max-w-6xl mx-auto py-10 grid md:grid-cols-3 gap-6 p-4">
        {products.map(product => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price} د.ج</p>
            </div>
          </div>
        ))}
      </main>
      <footer className="bg-gray-900 text-white text-center p-4">
        حقوق النشر © 2025 BETTAHAR Abdelkrim. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}

export default App;
