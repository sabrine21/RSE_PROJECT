import React from 'react';
import ProductCard from '../components/ProductCard';
import { LeafIcon } from '../components/Icons';
import '../styles/Home.css';

const products = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "100% organic cotton, sustainably sourced and ethically made",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    supplier : "ECCLO",
    weight : "0.2"
  },
  {
    id: 2,
    name: "Recycled Denim Jeans",
    price: 79.99,
    description: "Made from recycled denim, water-saving production process",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    supplier : "AATISE",
    weight : "0.3"
  },
  {
    id: 3,
    name: "Hemp Blend Sweater",
    price: 69.99,
    description: "Sustainable hemp and organic cotton blend, naturally dyed",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    supplier: "SUBLIMFACTORY",
    weight : "0.5"
  },
  {
    id: 4,
    name: "Bamboo Fiber Dress",
    price: 89.99,
    description: "Elegant dress made from sustainable bamboo fiber",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    supplier: "ECCO",
    weight : "0.4"
  },
  {
    id: 5,
    name: "Cork Leather Wallet",
    price: 39.99,
    description: "Vegan-friendly wallet made from sustainable cork leather",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    supplier: "ECCO",
    weight : "0.4"
  },
  {
    id: 6,
    name: "Recycled Polyester Jacket",
    price: 129.99,
    description: "Weather-resistant jacket made from recycled plastic bottles",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500",
    supplier: "ECCO",
    weight : "0.7"
  }
];

const Home = ({ onAddToCart }) => {
  return (
    <div className="home">
    <div className="hero">
        <div className="hero-content">
          <LeafIcon className="hero-logo" />
          <h1>EcoWear</h1>
          <p>Sustainable Fashion for a Better Tomorrow</p>
          <div className="hero-quote">
            "Fashion with purpose: Where style meets sustainability, and every purchase makes a difference."
          </div>
        </div>
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