import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const KeySpecification = {
    Model: "iPad Pro 11-Inch 256GB",
    Display: "11-inch Ultra Retina XDR OLED display with a resolution of 2420 x 1668 pixels at 264 ppi, supporting ProMotion technology with adaptive refresh rates from 10Hz to 120Hz",
    CPU: "Apple M4 chip with a 9-core CPU (3 performance cores and 6 efficiency cores) and a 10-core GPU.",
    RAM: "8GB",
    Storage: "256GB",
    Battery: "Li-Po 8160 mAh",
};

function ProductDetails() {
    const [activeTab, setActiveTab] = useState("Specifications");
    const { catagory,brandname } = useParams();
    return (
        <>
        <div className="max-w-screen-xl mx-auto px-6 py-10 sm:px-12 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                {/* Image Section */}
                <div className="h-full">
                    <img
                        src="https://itti.com.np/_next/image?url=https%3A%2F%2Fadmin.itti.com.np%2Fstorage%2Fproduct%2Fapple-ipad-pro-11-inch-256gb-wifi-2024-m4%2Fdfe0399c-83c6-4ce3-9144-94970f4bdc20.webp&w=1920&q=75" 
                        alt="iPad Pro"
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-full md:w-1/2 px-4 md:px-10">
                    <h1 className="text-3xl font-semibold text-gray-800">Apple | iPad Pro 11-Inch 256GB WiFi 2024 - M4</h1>
                    <p className="text-yellow-500 flex gap-1 mt-2">
                        <FaStar /><FaStar /><FaStar />
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="text-2xl font-bold text-gray-800">Price: 
                            <span className="text-red-600 ml-4">रु 1,65,000</span>
                        </h2>
                        <h3 className="text-green-600 font-bold">In Stock</h3>
                    </div>

                    <div className="flex items-center mt-6">
                        <span className="text-xl font-semibold mr-4">Qty:</span>
                        <button className="bg-red-700 text-white font-bold px-4 py-2 rounded-full">-</button>
                        <span className="text-xl mx-4">1</span>
                        <button className="bg-red-700 text-white font-bold px-4 py-2 rounded-full">+</button>
                    </div>

                    <button className="bg-blue-700 text-white font-bold py-3 px-12 rounded-lg mt-8 transition hover:bg-blue-800">
                        Add to Cart
                    </button>

                    {/* Key Specification Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800">Key Specifications</h2>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            {Object.entries(KeySpecification).map(([key, value]) => (
                                <li key={key} className="text-sm text-gray-700">
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Product Tabs Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
                <div className="flex gap-8">
                    <div 
                        className={`cursor-pointer font-semibold text-lg ${activeTab === 'Specifications' ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
                        onClick={() => setActiveTab("Specifications")}
                    >
                        Specifications
                    </div>
                    <div 
                        className={`cursor-pointer font-semibold text-lg ${activeTab === 'Description' ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
                        onClick={() => setActiveTab("Description")}
                    >
                        Description
                    </div>
                    <div 
                        className={`cursor-pointer font-semibold text-lg ${activeTab === 'Reviews' ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
                        onClick={() => setActiveTab("Reviews")}
                    >
                        Reviews
                    </div>
                </div>

                {/* Dynamic Content Based on Active Tab */}
                <div className="mt-6">
                    {activeTab === "Specifications" && (
                        <div>
                            <h3 className="text-xl font-semibold">Specifications</h3>
                            <ul className="list-disc pl-6 mt-3 space-y-2">
                                {Object.entries(KeySpecification).map(([key, value]) => (
                                    <li key={key} className="text-lg text-gray-700">
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "Description" && (
                        <div>
                            <h3 className="text-xl font-semibold">Product Description</h3>
                            <p className="text-lg text-gray-700 mt-3">
                                The iPad Pro 11-Inch is designed for the ultimate portable experience, featuring the powerful Apple M4 chip, a stunning Ultra Retina XDR OLED display, and the largest storage options.
                            </p>
                        </div>
                    )}

                    {activeTab === "Reviews" && (
                        <div>
                            <h3 className="text-xl font-semibold">Customer Reviews</h3>
                            <div className="mt-3 space-y-3">
                                <p className="text-lg text-gray-700"><strong>John Doe:</strong> Amazing tablet, super fast and the display is gorgeous!</p>
                                <p className="text-lg text-gray-700"><strong>Jane Smith:</strong> Worth every penny. Great performance for work and entertainment.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>

    );
}

export default ProductDetails;
