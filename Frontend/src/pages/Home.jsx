// src/pages/Home.js
import React from 'react';
import { Smartphone, Laptop, Headphones, Camera } from 'react-icons/fa'; // Assuming you're using react-icons

// Hero Section Component
const HeroSection = () => (
  <section className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-white" style={{ backgroundImage: 'url(https://via.placeholder.com/1500)' }}>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 text-center px-6 md:px-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInUp">Welcome to TechSphere</h1>
      <p className="text-xl md:text-2xl mb-6 animate__animated animate__fadeInUp animate__delay-1s">Find the latest tech gadgets and accessories here!</p>
      <a href="#products" className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s">Explore Now</a>
    </div>
  </section>
);

// Product Card Component
const ProductCard = ({ image, title, description, link }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all">
    <img src={image} alt={title} className="w-full h-56 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a href={link} className="text-blue-600 hover:text-blue-800">Learn More</a>
    </div>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ image, name, role, quote }) => (
  <div className="w-80 bg-gray-100 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-all">
    <p className="text-gray-700 mb-4">"{quote}"</p>
    <div className="flex items-center">
      <img src={image} alt={name} className="rounded-full mr-4" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

// Category Card Component
const CategoryCard = ({ icon: Icon, title, color }) => (
  <div className="bg-white p-6 text-center rounded-lg shadow-lg transform hover:scale-105 transition-all">
    <Icon size={40} className={`mx-auto mb-4 ${color}`} />
    <h3 className="text-xl font-semibold">{title}</h3>
  </div>
);

// Newsletter Section Component
const NewsletterSection = () => (
  <section className="py-16 px-6 bg-blue-600 text-white text-center">
    <h2 className="text-3xl font-bold mb-4">Stay Updated with TechSphere</h2>
    <p className="text-lg mb-6">Subscribe to our newsletter for the latest tech news, gadgets, and exclusive offers.</p>
    <div className="max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-4 mb-4 text-lg rounded-lg border-2 border-white focus:outline-none"
      />
      <button className="w-full py-4 bg-yellow-500 text-white text-lg rounded-lg shadow-md hover:bg-yellow-600 transition-all">Subscribe Now</button>
    </div>
  </section>
);

// Brands Section Component
const BrandsSection = () => (
  <section className="py-16 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-8">Brands We Carry</h2>
    <div className="flex overflow-x-auto space-x-12">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="w-32 flex-shrink-0">
          <img src="https://via.placeholder.com/150" alt={`Brand ${index + 1}`} className="w-full object-contain" />
        </div>
      ))}
    </div>
  </section>
);

// Home Page Component
const Home = () => (
  <>
    <HeroSection />

    <section id="products" className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductCard image="https://via.placeholder.com/300" title="Gadget 1" description="A brief description of the product goes here." link="#" />
        <ProductCard image="https://via.placeholder.com/300" title="Gadget 2" description="A brief description of the product goes here." link="#" />
        <ProductCard image="https://via.placeholder.com/300" title="Gadget 3" description="A brief description of the product goes here." link="#" />
        <ProductCard image="https://via.placeholder.com/300" title="Gadget 4" description="A brief description of the product goes here." link="#" />
      </div>
    </section>

    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Are Saying</h2>
      <div className="flex overflow-x-auto space-x-6">
        <TestimonialCard image="https://via.placeholder.com/50" name="John Doe" role="Tech Enthusiast" quote="TechSphere has completely changed the way I shop for tech! Their products are top-notch and delivery is quick." />
        <TestimonialCard image="https://via.placeholder.com/50" name="Jane Smith" role="Product Designer" quote="I love shopping at TechSphere. The range of products is amazing, and the quality is second to none!" />
        <TestimonialCard image="https://via.placeholder.com/50" name="Alex Williams" role="Entrepreneur" quote="Amazing customer service and a vast collection of gadgets. My go-to place for all things tech!" />
      </div>
    </section>

    <NewsletterSection />

    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Top Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        <CategoryCard icon={Smartphone} title="Smartphones" color="text-blue-600" />
        <CategoryCard icon={Laptop} title="Laptops" color="text-green-600" />
        <CategoryCard icon={Headphones} title="Headphones" color="text-red-600" />
        <CategoryCard icon={Camera} title="Cameras" color="text-purple-600" />
      </div>
    </section>

    <BrandsSection />
  </>
);

export default Home;
