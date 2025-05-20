import { useEffect, useState } from 'react';
import { FaStar, FaChevronRight } from 'react-icons/fa';
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
            setLoading(false);

        } catch (error) {
            console.log('Error fetching data', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loading />
            </div>
        );
    }

    const handleCartList = async (product) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            toast.error('Please login to add items to cart!');
            return;
        }
        await CartList(product);
        redirect('/cartlist');
    };

    let specifications = [];
    if (product && product.specifications) {
        try {
            const parsedSpecs = JSON.parse(product.specifications);
            console.log("parsedSpecs", parsedSpecs);

            if (Array.isArray(parsedSpecs)) {
                specifications = parsedSpecs
                    .filter(spec => spec.topic && spec.feature)                    
                    .map(spec => ({
                        topic: spec.topic.trim(),
                        feature: spec.feature.trim()
                    }));

            } else {
                specifications = [];
            }
            console.log("specifications :", specifications);
        } catch (error) {
            console.error("Error parsing specifications:", error);
            specifications = [];
        }
    }

    // Format features with commas into list
    const formatFeatures = (features) => {
        return features.split(',').map((item, index) => (
            <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {item.trim()}
            </span>
        ));
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>Home</span>
                <FaChevronRight className="mx-2 text-xs" />
                <span>Products</span>
                <FaChevronRight className="mx-2 text-xs" />
                <span className="text-gray-700 font-medium">{product && product.name}</span>
            </div>

            {/* Main Product Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {product && product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-auto max-h-[500px] object-contain p-6"
                            />
                        )}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product && product.name}</h1>

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
                        <div className="text-3xl font-bold text-red-600 mb-2">
                            {product && product.price !== undefined ? (
                                <>
                                    रु {product.price.toLocaleString()}
                                    {product.originalPrice && (
                                        <span className="text-gray-500 text-lg line-through ml-2">
                                            रु {product.originalPrice.toLocaleString()}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span>Price not available</span>
                            )}
                        </div>
                        <div className={`text-sm font-medium ${product && product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 mb-8"
                        onClick={() => handleCartList(product)}
                    >
                        Add to Cart
                    </button>

                    {/* Key Specifications */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Key Specifications</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {specifications.slice(0, 6).map((spec, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-500">{spec.topic}</h3>
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
                    <nav className="flex space-x-8">
                        {['Specifications', 'Description', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-300 ${activeTab === tab
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

                <div className="mt-8">
                    {/* Specifications Tab */}
                    {activeTab === "Specifications" && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Full Specifications</h3>
                                <div className="space-y-4">
                                    {specifications.map((spec, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-0">
                                            <div className="text-gray-500 font-medium">{spec.topic}</div>
                                            <div className="md:col-span-2 text-gray-800">
                                                {spec.topic === 'Headphone Features' ?
                                                    <div className="flex flex-wrap gap-2">
                                                        {formatFeatures(spec.feature)}
                                                    </div> :
                                                    spec.feature}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description Tab */}
                    {activeTab === "Description" && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Product Description</h3>
                                <div className="prose max-w-none text-gray-700">
                                    {product.description}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === "Reviews" && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                                {product.reviews && product.reviews.length > 0 ? (
                                    <div className="space-y-6">
                                        {product.reviews.map((review, index) => (
                                            <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
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
                                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
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