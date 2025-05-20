import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiStar, 
  FiChevronLeft, 
  FiChevronRight, 
  FiFilter,
  FiEye,
  FiZoomIn,
  FiZoomOut
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const ImageZoom = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in"
      onClick={toggleZoom}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isZoomed && setPosition({ x: 0, y: 0 })}
      ref={imgRef}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-60 object-contain transition-transform duration-300 ${isZoomed ? 'cursor-zoom-out' : ''}`}
        style={{
          transform: isZoomed 
            ? `scale(2) translate(${-position.x/1.5}%, ${-position.y/1.5}%)` 
            : 'scale(1)',
          transformOrigin: `${position.x}% ${position.y}%`
        }}
      />
      {!isZoomed ? (
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
          <FiZoomIn className="text-gray-600" />
        </div>
      ) : (
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
          <FiZoomOut className="text-gray-600" />
        </div>
      )}
    </div>
  );
};

function ProductCard({ products, find }) {
  const [priceRange, setPriceRange] = useState({ min: 1000, max: 100000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [quickView, setQuickView] = useState(null);
  const productsPerPage = 9;

  const filteredProducts = products
    .filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high': return a.price - b.price;
      case 'price-high-low': return b.price - a.price;
      case 'name-a-z': return a.name.localeCompare(b.name);
      case 'name-z-a': return b.name.localeCompare(a.name);
      case 'rating-high-low': return (b.rating || 0) - (a.rating || 0);
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      default: return 0;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: parseInt(value) }));
    setCurrentPage(1);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</Link>
        {find && (
          <>
            <FiChevronRight className="mx-2 text-gray-400" />
            <span className="capitalize text-gray-700 font-medium">{find}</span>
          </>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4 w-full bg-white rounded-xl shadow-sm p-6 h-fit sticky top-8 transition-all duration-300">
          <h2 className="font-bold text-xl mb-6 text-gray-800 border-b pb-3 flex items-center">
            <FiFilter className="mr-2" /> Filters
          </h2>

          {/* Single-line Price Range Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">Price Range</h3>
            <div className="flex items-center justify-between gap-4">
              <input
                type="number"
                min="1000"
                max="100000"
                step="500"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="1000"
                max="100000"
                step="500"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Ratings Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">Customer Ratings</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="rounded text-red-600 focus:ring-red-500 group-hover:ring-2 group-hover:ring-red-200" 
                  />
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4 transition-colors`}
                        fill={i < rating ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-1 text-gray-600 text-sm group-hover:text-gray-800 transition-colors">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Categories</h3>
            <div className="space-y-2">
              {[...new Set(products.map(p => p.category))].slice(0, 5).map(category => (
                <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="rounded text-red-600 focus:ring-red-500 group-hover:ring-2 group-hover:ring-red-200" 
                  />
                  <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <section className="lg:w-3/4 w-full">
          {/* Header with title and sort */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {find || 'All Products'}
              <span className="font-normal text-sm text-gray-500 ml-3">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>
            </h1>

            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-600 mr-2">Sort By:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A-Z</option>
                <option value="name-z-a">Name: Z-A</option>
                <option value="rating-high-low">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm p-12 text-center"
            >
              <div className="text-gray-400 text-5xl mb-4">😕</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your price range.</p>
              <button 
                onClick={() => setPriceRange({ min: 1000, max: 100000 })}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <ImageZoom src={product.image} alt={product.name} />
                    
                    {/* Badges */}
                    {product.stock < 10 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Low Stock
                      </div>
                    )}
                    {new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-2 rounded-full ${wishlist.includes(product.id) ? 'text-red-600' : 'text-gray-300'} bg-white shadow-md hover:text-red-600 transition-colors`}
                      >
                        <FiHeart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => setQuickView(product)}
                        className="p-2 rounded-full text-gray-300 bg-white shadow-md hover:text-gray-700 transition-colors"
                      >
                        <FiEye />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>
                    
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-red-600 transition-colors">
                      {product.name}
                    </h2>
                    
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-auto">
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`}
                              fill={i < Math.floor(product.rating || 0) ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">
                          {product.rating || 'No ratings'} ({product.reviewCount || 0} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-red-700 text-xl font-bold">
                            रु {product.price.toLocaleString()}
                          </p>
                          {product.originalPrice && (
                            <p className="text-gray-400 text-sm line-through">
                              रु {product.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          product.stock > 50 ? 'bg-green-100 text-green-800' : 
                          product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 50 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Add to Cart */}
                      <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <FiChevronLeft />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`p-2 px-4 rounded-lg border ${
                          currentPage === page 
                            ? 'bg-red-600 text-white border-red-600' 
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        } transition-colors`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    (page === currentPage - 2 && page !== 1) ||
                    (page === currentPage + 2 && page !== totalPages)
                  ) {
                    return <span key={page} className="px-2 text-gray-500">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <FiChevronRight />
                </button>
              </nav>
            </div>
          )}
        </section>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{quickView.name}</h2>
                <button 
                  onClick={() => setQuickView(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <ImageZoom src={quickView.image} alt={quickView.name} />
                </div>
                
                <div>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {quickView.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${i < Math.floor(quickView.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} w-5 h-5`}
                          fill={i < Math.floor(quickView.rating || 0) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {quickView.rating || 'No ratings'} ({quickView.reviewCount || 0} reviews)
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-red-700 text-3xl font-bold mb-1">
                      रु {quickView.price.toLocaleString()}
                    </p>
                    {quickView.originalPrice && (
                      <p className="text-gray-400 text-sm line-through">
                        रु {quickView.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-6">{quickView.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Specifications</h3>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {quickView.specifications?.map((spec, i) => (
                        <li key={i} className="flex">
                          <span className="text-gray-500 font-medium mr-2">{spec.key}:</span>
                          <span>{spec.value}</span>
                        </li>
                      )) || <li>No specifications available</li>}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                      <FiShoppingCart />
                      <span>Add to Cart</span>
                    </button>
                    <button 
                      onClick={() => toggleWishlist(quickView.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-300 shadow-md ${
                        wishlist.includes(quickView.id)
                          ? 'bg-white text-red-600 border border-red-600 hover:bg-red-50'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <FiHeart fill={wishlist.includes(quickView.id) ? 'currentColor' : 'none'} />
                      <span>{wishlist.includes(quickView.id) ? 'Saved' : 'Wishlist'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;