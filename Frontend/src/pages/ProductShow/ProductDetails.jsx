import { useEffect, useState } from 'react';
import { FaStar, FaChevronRight, FaShoppingCart } from 'react-icons/fa';
import { redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import { CartList } from '../../utils/Cart.utils.js';

function ProductDetails() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Specifications");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/v1/product/product/${id}`);
            setProduct(response.data.data);
        } catch (error) {
            toast.error('Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleCartList = async (product) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            toast.error('Please login to add items to cart!');
            return;
        }
        await CartList(product);
        redirect('/cartlist');
    };

    const parseSpecifications = () => {
        if (!product?.specifications) return [];
        
        try {
            let parsed = JSON.parse(product.specifications);
            if (typeof parsed === "string") parsed = JSON.parse(parsed);
            
            return Array.isArray(parsed)
                ? parsed.map(spec => ({
                    topic: spec.topic?.trim(),
                    feature: spec.feature?.trim(),
                })).filter(spec => spec.topic && spec.feature)
                : [];
        } catch {
            return [];
        }
    };

    const specifications = parseSpecifications();

    const formatFeatures = (features) => {
        return features.split(',').map((item, index) => (
            <span 
                key={index} 
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition hover:bg-gray-200"
            >
                {item.trim()}
            </span>
        ));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loading />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
                    <p className="text-gray-500 mt-2">We couldn't load the product details</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6 md:mb-8">
                <a href="/" className="hover:text-red-600 transition">Home</a>
                <FaChevronRight className="mx-2 text-xs" />
                <a href="/products" className="hover:text-red-600 transition">Products</a>
                <FaChevronRight className="mx-2 text-xs" />
                <span className="text-gray-700 font-medium truncate max-w-xs">{product.name}</span>
            </nav>

            {/* Main Product Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition duration-300">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto max-h-[500px] object-contain p-6 md:p-8"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-product.png';
                            }}
                        />
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar key={star} className="w-5 h-5" />
                            ))}
                        </div>
                        <span className="text-gray-600 text-sm">(24 reviews)</span>
                    </div>

                    {/* Price and Stock */}
                    <div className="mb-6">
                        <div className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
                            रु {product.price?.toLocaleString() || 'N/A'}
                            {product.originalPrice && (
                                <span className="text-gray-500 text-lg line-through ml-2">
                                    रु {product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        <div className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-8"
                        onClick={() => handleCartList(product)}
                        disabled={product.stock <= 0}
                    >
                        <FaShoppingCart />
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>

                    {/* Key Specifications */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Key Specifications</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {specifications.slice(0, 6).map((spec, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-red-200 transition"
                                >
                                    <h3 className="text-sm font-semibold text-gray-500 mb-1">{spec.topic}</h3>
                                    <p className="text-base font-medium text-gray-800">
                                        {spec.topic === 'Headphone Features' ?
                                            formatFeatures(spec.feature) :
                                            spec.feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs Section */}
            <div className="mt-12">
                <div className="border-b border-gray-200">
                    <nav className="flex flex-wrap gap-4 sm:gap-8">
                        {['Specifications', 'Description', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${activeTab === tab
                                    ? 'border-red-600 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-6">
                    {/* Specifications Tab */}
                    {activeTab === "Specifications" && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Full Specifications</h3>
                                <div className="space-y-4">
                                    {specifications.length > 0 ? (
                                        specifications.map((spec, index) => (
                                            <div 
                                                key={index} 
                                                className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition px-2 rounded"
                                            >
                                                <div className="text-gray-500 font-medium">{spec.topic}</div>
                                                <div className="md:col-span-2 text-gray-800">
                                                    {spec.topic === 'Headphone Features' ?
                                                        <div className="flex flex-wrap gap-2">
                                                            {formatFeatures(spec.feature)}
                                                        </div> :
                                                        spec.feature}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 py-4">No specifications available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description Tab */}
                    {activeTab === "Description" && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Product Description</h3>
                                <div className="prose max-w-none text-gray-700">
                                    {product.description || 'No description available'}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === "Reviews" && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                                {product.reviews?.length > 0 ? (
                                    <div className="space-y-6">
                                        {product.reviews.map((review, index) => (
                                            <div 
                                                key={index} 
                                                className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 transition px-4 py-3 rounded-lg"
                                            >
                                                <div className="flex items-center mb-3">
                                                    <div className="flex text-yellow-400 mr-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <FaStar key={star} className="w-4 h-4" />
                                                        ))}
                                                    </div>
                                                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                                                    <span className="text-gray-500 text-sm ml-auto">
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-4">No reviews yet</p>
                                        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition">
                                            Be the first to review
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;