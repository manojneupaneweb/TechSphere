import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Link } from "lucide-react";
import { FaMobileAlt, FaClock, FaHeadphonesAlt, FaBatteryFull, FaShieldAlt, FaPlug, FaLaptop, FaHeart } from 'react-icons/fa';
import laptops from "../assets/image/laptops.jpeg";
import laptops2 from "../assets/image/laptops-slide2.jpeg";
import laptops3 from "../assets/image/laptops3.jpg";
import mobiles from "../assets/image/mobiles.jpeg";
import mobiles2 from "../assets/image/mobiles2.jpg";
import Loading from "../components/Loading";
import { toast, ToastContainer } from 'react-toastify';
import { MobileProducts } from "../data";
import axios from "axios";
import { CartList, Wishlist } from "../utils/Cart.utils";
import fatchByCategory from "../utils/Fatch";
import CustomerReviews from "../components/CustomerReviews";
import { NewsletterSection } from "../components/Newsletter";
import { FAQSection } from "../components/FAQ";

const images = [laptops, laptops2, laptops3, mobiles, mobiles2];
const handleCartList = async (product) => {
  await CartList(product);
};

const SmartphoneProducts = () => {
  const [products, setProducts] = useState([]);

  const allproduct = async () => {
    try {
      const response = await fatchByCategory('Smartphone');
      setProducts(response.data);
    } catch (error) {
      console.log('error fetching products:', error);
    }
  };

  useEffect(() => {
    allproduct();
  }, []);

  return (
    <section className="py-16 px-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl mb-6 font-bold">Best Selling Smartphones</h2>

        <div className="flex space-x-4 overflow-x-scroll no-scrollbar scroll-smooth p-3">
          {products && products.length === 0 ? (
            <div>No Product available in Smartphones.</div>
          ) : (
            products?.map((product) => (
              <div key={product.id} className=" w-80 bg-white shadow-lg rounded-lg p-3 relative border-2 border-gray-200">
                <div className="w-full flex justify-center items-center">

                  {/* <button
                    aria-label="Toggle Wishlist"
                    className="absolute top-1 right-9 text-xl cursor-pointer"
                    onClick={() => Wishlist(product)}
                  >
                    <FaHeart className="text-red-800" />
                  </button> */}

                  <img src={product.image} alt={product.name} className=" border  h-56 object-cover" />
                </div>

                <div className="p-2">
                  <a href={`/product/${product.id}`}>
                    <h3 className="font-medium mb-1">
                      {product.name.length > 28 ? product.name?.slice(0, 30) + '...' : product.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description.length > 30 ? product.description?.slice(0, 30) + '...' : product.description}
                  </p>
                  <div className=" flex justify-between items-center">

                    <p className=" text-lg text-red-700 py-3">रु {product.price}</p>
                    <p className="text-lg text-red-700 py-3">
                      ⭐{"⭐".repeat(Math.round(product.ratings))} ({product.ratings})
                    </p>

                  </div>

                  <button onClick={() => handleCartList(product)} className="bg-red-800 w-full text-white py-2 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
const NewProducts = () => {
  const [products, setProducts] = useState([]);

  const allproduct = async () => {
    try {
      const response = await fatchByCategory('Newproducts');
      setProducts(response.data);
    } catch (error) {
      console.log('error fetching products:', error);
    }
  };

  useEffect(() => {
    allproduct();
  }, []);

  return (
    <section className="py-10 px-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl mb-3 font-bold" id="explore">New Arrivals</h2>

        <div className="flex space-x-4 overflow-x-scroll no-scrollbar scroll-smooth p-3">
          {products && products.length === 0 ? (
            <div>No Product available in Smartphones.</div>
          ) : (
            products?.map((product) => (
              <div key={product.id} className=" w-72 bg-white shadow-lg rounded-lg p-3 relative border-2 border-gray-200">
                <div className="w-full flex justify-center items-center">

                  {/* <button
                    aria-label="Toggle Wishlist"
                    className="absolute top-1 right-9 text-xl cursor-pointer"
                    onClick={() => Wishlist(product)}
                  >
                    <FaHeart className="text-red-800" />
                  </button> */}

                  <img src={product.image} alt={product.name} className=" border  h-56 object-cover" />
                </div>

                <div className="p-2">
                  <a href={`/product/${product.id}`}>
                    <h3 className="font-medium mb-1">
                      {product.name.length > 28 ? product.name?.slice(0, 25) + '...' : product.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-600 ">
                    {product.description.length > 30 ? product.description?.slice(0, 30) + '...' : product.description}
                  </p>
                  <div className=" flex justify-between items-center">

                    <p className=" text-lg text-red-700 py-3">रु {product.price}</p>
                    <p className="text-lg text-red-700 py-3">
                      ⭐{"⭐".repeat(Math.round(product.ratings))} ({product.ratings})
                    </p>

                  </div>

                  <button onClick={() => handleCartList(product)} className="bg-red-800 w-full text-white py-2 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const LaptopProducts = () => {
  const [products, setProducts] = useState([]);

  const allproduct = async () => {
    try {
      const response = await fatchByCategory('Laptop');
      setProducts(response.data);
    } catch (error) {
      console.log('error fetching products:', error);
    }
  };

  useEffect(() => {
    allproduct();
  }, []);

  return (
    <section className="py-16 bg-white px-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold   mb-8">Best Selling Laptops</h2>

        <div className="flex space-x-4 overflow-x-scroll no-scrollbar scroll-smooth p-3">
          {products && products.length === 0 ? (
            <div>No Product available in Laptops.</div>
          ) : (
            products?.map((product) => (
              <div key={product.id} className=" w-80 bg-white shadow-lg rounded-lg p-3 relative border-2 border-gray-200">
                <div className="w-full flex justify-center items-center">

                  {/* <button
                    aria-label="Toggle Wishlist"
                    className="absolute top-1 right-9 text-xl cursor-pointer"
                    onClick={() => Wishlist(product)}
                  >
                    <FaHeart className="text-red-800" />
                  </button> */}

                  <img src={product.image} alt={product.name} className=" border  h-56 object-cover" />
                </div>

                <div className="p-2">
                  <a href={`/product/${product.id}`}>
                    <h3 className="font-medium mb-1">
                      {product.name.length > 28 ? product.name?.slice(0, 30) + '...' : product.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description.length > 30 ? product.description?.slice(0, 30) + '...' : product.description}
                  </p>
                  <div className=" flex justify-between items-center">

                    <p className=" text-lg text-red-700 py-3">रु {product.price}</p>
                    <p className="text-lg text-red-700 py-3">
                      ⭐{"⭐".repeat(Math.round(product.ratings))} ({product.ratings})
                    </p>

                  </div>

                  <button onClick={() => handleCartList(product)} className="bg-red-800 w-full text-white py-2 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

const Accessories = () => {
  const [products, setProducts] = useState([]);

  const allproduct = async () => {
    try {
      const response = await fatchByCategory('Accessories');
      setProducts(response.data);
    } catch (error) {
      console.log('error fetching products:', error);
    }
  };

  useEffect(() => {
    allproduct();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8"> Accessories  </h2>

        <div className="flex space-x-4 overflow-x-scroll no-scrollbar scroll-smooth p-3">
          {products && products.length === 0 ? (
            <div>No Product available in Accessories.</div>
          ) : (
            products?.map((product) => (
              <div key={product.id} className=" w-72 bg-white shadow-lg rounded-lg p-3 relative border-2 border-gray-200">
                <div className="w-full flex justify-center items-center">

                  <button
                    aria-label="Toggle Wishlist"
                    className="absolute top-1 right-9 text-xl cursor-pointer"
                    onClick={() => Wishlist(product)}
                  >
                    <FaHeart className="text-red-800" />
                  </button>

                  <img src={product.image} alt={product.name} className=" border  h-56 object-cover" />
                </div>

                <div className="p-2">
                  <a href={`/product/${product.id}`}>
                    <h2 className="text-lg font-bold my-1">{product.name?.slice(0, 50)}...</h2>
                  </a>
                  <p className="text-gray-600">
                    {product.description?.slice(0, 50)}...
                  </p>

                  <p className="font-bold text-xl text-red-700 py-3">रु {product.price}</p>

                  <button onClick={() => handleCartList(product)} className="bg-red-800 w-full text-white py-2 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

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
      className="relative h-[80vh]  flex items-center justify-center text-white transition-all duration-700 -z-10"
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
          href="#explore"
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


const ShopByCategory = () => {
  const scrollContainerRef = useRef();

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-300">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Shop by Category
        </h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            &#8592;
          </button>

          {/* Category Grid */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 py-4 no-scrollbar scrollbar-hide"
          >
            {[
              { icon: <FaMobileAlt />, title: "Smartphones", color: "text-blue-500", link: "/category/smartphones", desc: "Explore the latest smartphones from top brands." },
              { icon: <FaClock />, title: "Smartwatches", color: "text-gray-700", link: "/category/smartwatches", desc: "Track your fitness and style with the latest smartwatches." },
              { icon: <FaHeadphonesAlt />, title: "Headphones", color: "text-purple-600", link: "/category/headphones", desc: "Discover high-quality headphones for every taste." },
              { icon: <FaBatteryFull />, title: "Power Banks", color: "text-green-500", link: "/category/powerbanks", desc: "Stay powered up with the latest power banks." },
              { icon: <FaShieldAlt />, title: "Screen Protectors", color: "text-yellow-500", link: "/category/screen-protectors", desc: "Protect your devices with durable screen protectors." },
              { icon: <FaPlug />, title: "Chargers", color: "text-orange-600", link: "/category/chargers", desc: "Find fast and reliable chargers for all your devices." },
              { icon: <FaLaptop />, title: "Cases", color: "text-gray-800", link: "/category/cases", desc: "Protect your devices with stylish and durable cases." },
            ].map(({ icon, title, color, link, desc }, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-xl rounded-xl text-center min-w-[220px] hover:scale-105 transition-transform duration-300"
              >
                <p className={`text-4xl ${color} mb-4 text-center`}>{icon}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{desc}</p>
                <a href={link} className="text-red-700 font-bold hover:underline">
                  View All
                </a>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};


const ShopByBrand = () => {
  const BrandImages = {
    google: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911",
    apple: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/758px-Apple_logo_grey.svg.png?20220821122206",
    samsung: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1200px-Samsung_Logo.svg.png",
    huawei: "https://images.seeklogo.com/logo-png/6/1/huawei-logo-png_seeklogo-68529.png",
    xiaomi: "https://w7.pngwing.com/pngs/368/356/png-transparent-xiaomi-logo-icon-thumbnail.png",
    oppo: "https://www.eternityx.com/wp-content/uploads/2022/04/OPPO%E5%B9%BF%E4%B8%9C%E7%A7%BB%E5%8A%A8%E9%80%9A%E4%BF%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8-Logo.png",
    vivo: "https://banner2.cleanpng.com/20180412/ysq/avfhqtek8.webp",
    oneplus: "https://www.logoshape.com/wp-content/uploads/2024/09/oneplus-logo-vector_logoshape.png",
    realme: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Realme_logo.png/1200px-Realme_logo.png?20211207130551",
    asus: "https://icon-icons.com/icons2/2699/PNG/512/asus_logo_icon_168565.png",
    nokia: "https://banner2.cleanpng.com/20181118/gfy/kisspng-nokia-microsoft-lumia-logo-brand-font-android-nokia-fo-1713921207564.webp",
  };

  return (
    <section className="py-16 bg-gray-100 px-4 md:px-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Shop by Brands</h2>
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth justify-between items-center gap-6">
          {Object.entries(BrandImages).map(([brand, image], index) => (
            <div key={index} className="flex flex-col items-center">
              <a href={`/brand/${brand}`}>

                <img
                  src={image}
                  alt={brand}
                  className="w-10 md:w-10 lg:w-16 h-auto object-contain cursor-pointer rounded-lg"
                />
              </a>
              {/* <span className="mt-2 text-gray-700 capitalize">{brand}</span> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};






const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">

        <Loading />
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <NewProducts />
      <ShopByBrand />
      <SmartphoneProducts />
      <LaptopProducts />
      <ShopByCategory />
      <Accessories />
      <NewsletterSection />
      <CustomerReviews />
      <ToastContainer />
    </>
  );
};


export default Home;