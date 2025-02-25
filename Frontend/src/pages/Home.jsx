import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"; // Importing icons for arrows
import laptops from "../assets/image/laptops.jpeg";
import laptops2 from "../assets/image/laptops-slide2.jpeg";
import laptops3 from "../assets/image/laptops3.jpg";
import mobiles from "../assets/image/mobiles.jpeg";
import mobiles2 from "../assets/image/mobiles2.jpg";

const images = [laptops, laptops2, laptops3, mobiles, mobiles2];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]); // Runs on index change

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center text-white transition-all duration-700 -z-10"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInUp">
          Welcome to TechSphere
        </h1>
        <p className="text-xl md:text-2xl mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          Find the latest tech gadgets and accessories here!
        </p>
        <a
          href="#products"
          className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"
        >
          Explore Now
        </a>
      </div>

      {/* Left Arrow */}
      <button
        className="absolute left-4 md:left-10 z-20 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-all"
        onClick={prevSlide}
      >
        <ChevronLeft size={30} className="text-white" />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-4 md:right-10 z-20 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-all"
        onClick={nextSlide}
      >
        <ChevronRight size={30} className="text-white" />
      </button>
    </section>
  );
};

const NewlyLaunchedProducts = () => {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/300",
      title: "UltraBook Pro X",
      description: "The thinnest and lightest laptop with unmatched performance.",
      link: "#",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300",
      title: "Quantum Phone Z",
      description: "A revolutionary smartphone with AI-powered features.",
      link: "#",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300",
      title: "Nova Watch 3",
      description: "A smartwatch with advanced health monitoring and fitness tracking.",
      link: "#",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300",
      title: "PixelPad Pro",
      description: "A high-performance tablet for work and entertainment.",
      link: "#",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Newly Launched Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <a
                  href={product.link}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShopByBrand = () => (
  <section className="py-16 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Shop by Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <a href="#">
              <img
                src="https://via.placeholder.com/150"
                alt={`Brand ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);
const Product=()=>{
  return(
    <section id="products" className="py-16 bg-gray-100">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductCard
          image="https://via.placeholder.com/300"
          title="Gadget 1"
          description="A brief description of the product goes here."
          link="#"
        />
        <ProductCard
          image="https://via.placeholder.com/300"
          title="Gadget 2"
          description="A brief description of the product goes here."
          link="#"
        />
        <ProductCard
          image="https://via.placeholder.com/300"
          title="Gadget 3"
          description="A brief description of the product goes here."
          link="#"
        />
        <ProductCard
          image="https://via.placeholder.com/300"
          title="Gadget 4"
          description="A brief description of the product goes here."
          link="#"
        />
      </div>
    </div>
  </section>
  )
}
const ProductCard = ({ image, title, description, link }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all">
    <img src={image} alt={title} className="w-full h-56 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a href={link} className="text-blue-600 hover:text-blue-800">
        Learn More
      </a>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, testimonial, image }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
    <div className="flex items-center mb-6">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-gray-800 italic">"{testimonial}"</p>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: "John Doe",
      role: "Tech Enthusiast",
      testimonial: "TechSphere has the best gadgets at unbeatable prices!",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "Software Developer",
      testimonial: "I love the quality and variety of products available here.",
      image: "https://via.placeholder.com/150",
    },
    // Add more testimonials
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Are Saying</h2>
        <div className="relative">
          <div className="flex justify-center">
            <TestimonialCard {...testimonials[currentIndex]} />
          </div>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-all"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={30} className="text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-all"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={30} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 3-5 business days within the US.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping times vary by location.",
    },
    {
      question: "What is your return policy?",
      answer: "You can return products within 30 days of purchase for a full refund.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="text-blue-600">
                  {activeIndex === index ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </span>
              </button>
              {activeIndex === index && (
                <div
                  id={`faq-${index}`}
                  className="p-6 pt-0 text-gray-700"
                  aria-hidden={activeIndex !== index}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => (
  <section className="py-16 bg-blue-600 text-white text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Stay Updated with TechSphere
      </h2>
      <p className="text-lg md:text-xl mb-8">
        Subscribe to our newsletter for the latest tech news, gadgets, and exclusive offers.
      </p>
      <div className="max-w-md mx-auto">
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Enter your email to subscribe"
            className="w-full p-4 text-lg rounded-lg border-2 border-white bg-transparent placeholder-white focus:outline-none focus:border-yellow-500"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-8 bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-800 transition-all"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Home = () => (
  <>
    <HeroSection />
    <NewlyLaunchedProducts/>
    <ShopByBrand />
   <Product/>
    <Testimonials />
    <FAQSection />
    <NewsletterSection />
  </>
);

export default Home;