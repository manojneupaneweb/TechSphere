import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FaMobileAlt,
  FaClock,
  FaHeadphonesAlt,
  FaBatteryFull,
  FaShieldAlt,
  FaPlug,
  FaLaptop,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import laptops from "../assets/image/laptops.jpeg";
import laptops2 from "../assets/image/laptops-slide2.jpeg";
import laptops3 from "../assets/image/laptops3.jpg";
import mobiles from "../assets/image/mobiles.jpeg";
import mobiles2 from "../assets/image/mobiles2.jpg";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import fatchByCategory from "../utils/Fatch";
import { CartList, handelcartcount } from "../utils/Cart.utils";
import CustomerReviews from "../components/CustomerReviews";
import { NewsletterSection } from "../components/Newsletter";
import { FAQSection } from "../components/FAQ";

const images = [laptops, laptops2, laptops3, mobiles, mobiles2];

const handleCartList = async (product) => {
  await CartList(product);
  handelcartcount();
};

// Hero Section
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section
      className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-4 md:px-12">
        <h1 className="text-3xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInUp">
          Welcome to TechSphere
        </h1>
        <p className="text-lg md:text-2xl mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          Find the latest tech gadgets and accessories here!
        </p>
        <a
          href="#explore"
          className="bg-blue-600 px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"
        >
          Explore Now
        </a>
      </div>
      <button
        className="absolute left-4 md:left-10 z-20 bg-black/50 p-3 rounded-full hover:bg-black/80 transition"
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
        aria-label="Previous Slide"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        className="absolute right-4 md:right-10 z-20 bg-black/50 p-3 rounded-full hover:bg-black/80 transition"
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }
        aria-label="Next Slide"
      >
        <ChevronRight size={30} />
      </button>
    </section>
  );
};

// New Arrivals
const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fatchByCategory("Newproducts");
      setProducts(response.data);
    } catch {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-12 px-2 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" id="explore">
            New Arrivals
          </h2>
          <p className="text-lg text-gray-600">
            Discover our latest collection of trending gadgets and must-have tech. Be the first to experience innovation!
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            No products available at the moment.
          </div>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-6 no-scrollbar">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-contain p-4 bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <a href={`/product/${product.id}`} className="group">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-red-700 transition">
                      {product.name.length > 28
                        ? `${product.name.slice(0, 25)}...`
                        : product.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.description.length > 30
                      ? `${product.description.slice(0, 30)}...`
                      : product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-red-700">
                      रु {product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.round(product.ratings)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.ratings})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCartList(product)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-700 to-pink-600 hover:from-red-800 hover:to-pink-700 text-white py-2 px-4 rounded-lg transition font-semibold shadow-md group-hover:scale-105"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Product List Section (Reusable)
const ProductList = ({ title, category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const allproduct = async () => {
      try {
        const response = await fatchByCategory(category);
        setProducts(response.data);
      } catch {
        setProducts([]);
      }
    };
    allproduct();
  }, [category]);

  // Section content based on title
  let sectionSubtitle = "";
  let sectionContent = "";
  if (title === "Best Selling Smartphones") {
    sectionSubtitle = "Top Picks for You";
    sectionContent =
      "Browse our best-selling smartphones, handpicked for performance, style, and value. Upgrade your mobile experience today!";
  } else if (title === "Best Selling Laptops") {
    sectionSubtitle = "Power Meets Portability";
    sectionContent =
      "Explore our most popular laptops, perfect for work, play, and everything in between. Find your next productivity partner!";
  } else if (title === "Accessories") {
    sectionSubtitle = "Enhance Your Tech";
    sectionContent =
      "Complete your setup with our wide range of accessories. From cases to chargers, we've got you covered!";
  }

  return (
    <section className="py-12 px-2 md:px-20 bg-white">
      <div className="container mx-auto px-2 md:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {sectionSubtitle && (
            <p className="text-lg text-gray-700 mt-1 font-semibold">{sectionSubtitle}</p>
          )}
          {sectionContent && (
            <p className="text-gray-500 mt-1">{sectionContent}</p>
          )}
        </div>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth p-3">
          {products.length === 0 ? (
            <div>No Product available in {title}.</div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="w-72 md:w-80 bg-white shadow-lg rounded-lg p-3 relative border-2 border-gray-200 flex-shrink-0 group"
              >
                <div className="w-full flex justify-center items-center relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="border h-56 object-cover rounded group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <a href={`/product/${product.id}`}>
                    <h3 className="font-medium mb-1 group-hover:text-red-700 transition">
                      {product.name.length > 28
                        ? product.name.slice(0, 30) + "..."
                        : product.name}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description.length > 30
                      ? product.description.slice(0, 30) + "..."
                      : product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-red-700 py-3">
                      रु {product.price}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs ${
                            i < Math.round(product.ratings)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.ratings})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCartList(product)}
                    className="bg-gradient-to-r from-red-800 to-pink-700 w-full text-white py-2 rounded-md mt-2 hover:from-red-900 hover:to-pink-800 transition font-semibold shadow-md group-hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
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

// Shop By Category
const ShopByCategory = () => {
  const scrollContainerRef = useRef();

  const scroll = (offset) => {
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const categories = [
    {
      icon: <FaMobileAlt />,
      title: "Smartphones",
      color: "text-blue-500",
      link: "/category/smartphones",
      desc: "Explore the latest smartphones from top brands.",
    },
    {
      icon: <FaClock />,
      title: "Smartwatches",
      color: "text-gray-700",
      link: "/category/smartwatches",
      desc: "Track your fitness and style with the latest smartwatches.",
    },
    {
      icon: <FaHeadphonesAlt />,
      title: "Headphones",
      color: "text-purple-600",
      link: "/category/headphones",
      desc: "Discover high-quality headphones for every taste.",
    },
    {
      icon: <FaBatteryFull />,
      title: "Power Banks",
      color: "text-green-500",
      link: "/category/powerbanks",
      desc: "Stay powered up with the latest power banks.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Screen Protectors",
      color: "text-yellow-500",
      link: "/category/screen-protectors",
      desc: "Protect your devices with durable screen protectors.",
    },
    {
      icon: <FaPlug />,
      title: "Chargers",
      color: "text-orange-600",
      link: "/category/chargers",
      desc: "Find fast and reliable chargers for all your devices.",
    },
    {
      icon: <FaLaptop />,
      title: "Cases",
      color: "text-gray-800",
      link: "/category/cases",
      desc: "Protect your devices with stylish and durable cases.",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          Shop by Category
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8">
          Find products by category and discover the perfect tech for your needs. Click on a category to explore more!
        </p>
        <div className="relative">
          <button
            onClick={() => scroll(-300)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition"
            aria-label="Scroll Left"
          >
            <ChevronLeft />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 py-4 no-scrollbar scrollbar-hide"
          >
            {categories.map(({ icon, title, color, link, desc }, idx) => (
              <div
                key={idx}
                className="bg-white p-6 shadow-xl rounded-xl text-center min-w-[220px] hover:scale-105 transition-transform duration-300"
              >
                <p className={`text-4xl ${color} mb-4`}>{icon}</p>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{desc}</p>
                <a href={link} className="text-red-700 font-bold hover:underline">
                  View All
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(300)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition"
            aria-label="Scroll Right"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

// Shop By Brand
const ShopByBrand = () => {
  const BrandImages = {
    google:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911",
    apple:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/758px-Apple_logo_grey.svg.png?20220821122206",
    samsung:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1200px-Samsung_Logo.svg.png",
    huawei:
      "https://images.seeklogo.com/logo-png/6/1/huawei-logo-png_seeklogo-68529.png",
    xiaomi:
      "https://w7.pngwing.com/pngs/368/356/png-transparent-xiaomi-logo-icon-thumbnail.png",
    oppo:
      "https://www.eternityx.com/wp-content/uploads/2022/04/OPPO%E5%B9%BF%E4%B8%9C%E7%A7%BB%E5%8A%A8%E9%80%9A%E4%BF%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8-Logo.png",
    vivo: "https://banner2.cleanpng.com/20180412/ysq/avfhqtek8.webp",
    oneplus:
      "https://www.logoshape.com/wp-content/uploads/2024/09/oneplus-logo-vector_logoshape.png",
    realme:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Realme_logo.png/1200px-Realme_logo.png?20211207130551",
    asus:
      "https://icon-icons.com/icons2/2699/PNG/512/asus_logo_icon_168565.png",
    nokia:
      "https://banner2.cleanpng.com/20181118/gfy/kisspng-nokia-microsoft-lumia-logo-brand-font-android-nokia-fo-1713921207564.webp",
  };

  return (
    <section className="py-12 bg-gray-100 px-4 md:px-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-2">Shop by Brands</h2>
        <p className="text-lg text-gray-700 mb-8">
          Choose from the most trusted brands in tech. Click a logo to see all products from your favorite brand!
        </p>
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth justify-between items-center gap-6">
          {Object.entries(BrandImages).map(([brand, image], idx) => (
            <div key={idx} className="flex flex-col items-center">
              <a href={`/brand/${brand}`}>
                <img
                  src={image}
                  alt={brand}
                  className="w-10 md:w-16 h-auto object-contain cursor-pointer rounded-lg hover:scale-110 transition-transform"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Accessories Section
const Accessories = () => (
  <ProductList title="Accessories" category="Accessories" />
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1200);
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
      <ProductList title="Best Selling Smartphones" category="Smartphone" />
      <ProductList title="Best Selling Laptops" category="Laptop" />
      <ShopByCategory />
      <Accessories />
      <NewsletterSection />
      <CustomerReviews />
      <ToastContainer />

    </>
  );
};

export default Home;
