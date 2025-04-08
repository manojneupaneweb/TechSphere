import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

function ProductDetails() {
    const [esewa, setEsewa] = useState(null);


    const handelpayment = (product) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
        form.target = '_blank';

        const amount = 100;
        const tax_amount = 10;
        const total_amount = amount + tax_amount;

        const data = {
            "amount": "100",
            "failure_url": "https://developer.esewa.com.np/failure",
            "product_delivery_charge": "0",
            "product_service_charge": "0",
            "product_code": "EPAYTEST",
            "signature": "i94zsd3oXF6ZsSr/kGqT4sSzYQzjj1W/waxjWyRwaME=",
            "signed_field_names": "total_amount,transaction_uuid,product_code",
            "success_url": "https://developer.esewa.com.np/success",
            "tax_amount": "10",
            "total_amount": "110",
            "transaction_uuid": "241028"
        };

        for (let key in data) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    };



    const { id } = useParams(); // Get the product id from the URL params

    const [activeTab, setActiveTab] = useState("Specifications");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    // Function to fetch the product details from the server
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/v1/product/product/${id}`);
            setProduct(response.data.message);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching data', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(); // Fetch product when the component mounts
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loading />
            </div>
        );
    }

    // Check if specifications is a string, then parse it to an object
    let specifications = [];
    if (product.specifications) {
        try {
            specifications = JSON.parse(product.specifications);
        } catch (error) {
            console.error("Error parsing specifications:", error);
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-10 sm:px-12 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                {/* Image Section */}
                <div className="h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-full md:w-1/2 px-4 md:px-10">
                    <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
                    <p className="text-yellow-500 flex gap-1 mt-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="text-2xl font-bold text-gray-800">Price:
                            <span className="text-red-600 ml-4">रु {product.price}</span>
                        </h2>
                        <h3 className="text-green-600 font-bold">In Stock: {product.stock}</h3>
                    </div>

                    <div className="flex items-center mt-6">
                        <span className="text-xl font-semibold mr-4">Qty:</span>
                        <button className="bg-red-700 text-white font-bold px-4 py-2 rounded-full">-</button>
                        <span className="text-xl mx-4">1</span>
                        <button className="bg-red-700 text-white font-bold px-4 py-2 rounded-full">+</button>
                    </div>

                    <button
                        className="bg-red-700 text-white font-bold py-3 px-12 rounded-lg mt-8 transition hover:bg-blue-800"
                        onClick={handelpayment(product)}
                    >
                        Buy Now
                    </button>


                    {/* Key Specification Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800">Key Specifications</h2>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            {Array.isArray(specifications) && specifications.length > 0 ? (
                                specifications.map((spec, index) => (
                                    <li key={index} className="text-sm text-gray-700">
                                        <strong>{spec.topic}:</strong> {spec.feature}
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm text-gray-700">No specifications available.</p>
                            )}
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
                                {Array.isArray(specifications) && specifications.length > 0 ? (
                                    specifications.map((spec, index) => (
                                        <li key={index} className="text-lg text-gray-700">
                                            <strong>{spec.topic}:</strong> {spec.feature}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-lg text-gray-700">No specifications available.</p>
                                )}
                            </ul>
                        </div>
                    )}

                    {activeTab === "Description" && (
                        <div>
                            <h3 className="text-xl font-semibold">Product Description</h3>
                            <p className="text-lg text-gray-700 mt-3">{product.description}</p>
                        </div>
                    )}

                    {activeTab === "Reviews" && (
                        <div>
                            <h3 className="text-xl font-semibold">Customer Reviews</h3>
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="mt-3 space-y-3">
                                    {product.reviews.map((review, index) => (
                                        <p key={index} className="text-lg text-gray-700">
                                            <strong>{review.name}:</strong> {review.comment}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-lg text-gray-700">No reviews yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
