import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const products = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "100% organic cotton, sustainably sourced and ethically made",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    id: 2,
    name: "Recycled Denim Jeans",
    price: 79.99,
    description: "Made from recycled denim, water-saving production process",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  },
  {
    id: 3,
    name: "Hemp Blend Sweater",
    price: 69.99,
    description: "Sustainable hemp and organic cotton blend, naturally dyed",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500"
  },
  {
    id: 4,
    name: "Bamboo Fiber Dress",
    price: 89.99,
    description: "Elegant dress made from sustainable bamboo fiber",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500"
  },
  {
    id: 5,
    name: "Cork Leather Wallet",
    price: 39.99,
    description: "Vegan-friendly wallet made from sustainable cork leather",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500"
  },
  {
    id: 6,
    name: "Recycled Polyester Jacket",
    price: 129.99,
    description: "Weather-resistant jacket made from recycled plastic bottles",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500"
  }
];

const Home = ({ onAddToCart }) => {
  return (
    <div className="home">
      <div className="hero">
        <h1>EcoWear</h1>
        <p>Sustainable Fashion for a Better Tomorrow</p>
      </div>
      <div className="products-section">
        <h2>Our Sustainable Collection</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;