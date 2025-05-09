import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiShoppingCart,
    FiHeart,
    FiStar,
    FiChevronLeft,
    FiChevronRight,
    FiFilter
} from 'react-icons/fi';

function ProductCard({ products, find }) {
    console.log("products", products);

    const [priceRange, setPriceRange] = useState({
        min: 1000,
        max: 100000
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [wishlist, setWishlist] = useState([]);
    const [sortOption, setSortOption] = useState('featured');
    const productsPerPage = 9;

    const filteredProducts = products.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'price-low-high':
                return a.price - b.price;
            case 'price-high-low':
                return b.price - a.price;
            case 'name-a-z':
                return a.name.localeCompare(b.name);
            case 'name-z-a':
                return b.name.localeCompare(a.name);
            case 'rating-high-low':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange(prev => ({
            ...prev,
            [name]: parseInt(value)
        }));
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

    return (
        <div className="min-h-screen bg-gray-50 px-5 md:px-20 lg:px-32 py-8">
            <nav className="flex items-center text-sm mb-8">
                <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</Link>
                {find && (
                    <>
                        <FiChevronRight className="mx-2 text-gray-400" />
                        <span className="capitalize text-gray-700 font-medium">{find}</span>
                    </>
                )}
            </nav>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-1/4 w-full bg-white rounded-lg shadow-sm p-6 h-fit sticky top-8">
                    <h2 className="font-bold text-xl mb-6 text-gray-800 border-b pb-3 flex items-center">
                        <FiFilter className="mr-2" /> Filters
                    </h2>

                    <div className="mb-8">
                        <h3 className="font-semibold text-gray-700 mb-4">Price Range</h3>
                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                            <span>रु {priceRange.min.toLocaleString()}</span>
                            <span>रु {priceRange.max.toLocaleString()}</span>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="500"
                                name="min"
                                value={priceRange.min}
                                onChange={handlePriceChange}
                                className="w-full accent-red-600"
                            />
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="500"
                                name="max"
                                value={priceRange.max}
                                onChange={handlePriceChange}
                                className="w-full accent-red-600"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-4">Customer Ratings</h3>
                        <div className="space-y-2">
                            {[4, 3, 2, 1].map(rating => (
                                <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="rounded text-red-600" />
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`}
                                                fill={i < rating ? 'currentColor' : 'none'}
                                            />
                                        ))}
                                        <span className="ml-1 text-gray-600 text-sm">& Up</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="md:w-3/4 w-full">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800 capitalize">
                            {find || 'All Products'}
                            <span className="font-normal text-sm text-gray-500 ml-3">
                                {products.length} {products.length === 1 ? 'Product' : 'Products'}
                            </span>
                        </h1>

                        <div className="flex items-center">
                            <label htmlFor="sort" className="text-gray-600 mr-2">Sort By:</label>
                            <select
                                id="sort"
                                value={sortOption}
                                onChange={handleSortChange}
                                className="border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                                <option value="name-a-z">Name: A-Z</option>
                                <option value="name-z-a">Name: Z-A</option>
                                <option value="rating-high-low">Rating: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="text-gray-400 text-5xl mb-4">😕</div>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
                                >
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-60 object-cover"
                                        />
                                        <button
                                            onClick={() => toggleWishlist(product.id)}
                                            className={`absolute top-3 right-3 p-2 rounded-full ${wishlist.includes(product.id) ? 'text-red-600' : 'text-gray-300'} bg-white bg-opacity-80 hover:text-red-600 transition-colors`}
                                        >
                                            <FiHeart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                                        </button>
                                    </div>

                                    <div className="p-4 flex-grow flex flex-col">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h2>
                                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>

                                        <div className="mt-auto">
                                            <p className="text-red-700 text-xl font-bold mb-3">रु {product.price.toLocaleString()}</p>
                                            <div className="flex items-center justify-between text-sm mb-4">
                                                <div className="flex items-center">
                                                    <div className="flex items-center mr-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FiStar
                                                                key={i}
                                                                className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} w-3 h-3`}
                                                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-600">{product.rating}</span>
                                                </div>
                                                <span className="text-gray-500">{product.reviewCount} reviews</span>
                                            </div>

                                            <button className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors">
                                                <FiShoppingCart />
                                                <span>Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-10 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50"
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
                                                className={`p-2 rounded border ${currentPage === page ? 'bg-red-600 text-white' : 'bg-white text-gray-700'} hover:bg-gray-50`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (
                                        (page === currentPage - 2 && page !== 1) ||
                                        (page === currentPage + 2 && page !== totalPages)
                                    ) {
                                        return <span key={page} className="px-2">...</span>;
                                    }
                                    return null;
                                })}
                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                                >
                                    <FiChevronRight />
                                </button>
                            </nav>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default ProductCard;
