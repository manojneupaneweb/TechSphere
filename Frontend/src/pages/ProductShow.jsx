import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = [
    {
        id: 1,
        name: "iPhone 12 Pro Max",
        price: 12000,
        description: "A powerful smartphone with a new chipset",
        image: "https://sabkophone.com/wp-content/uploads/2024/01/iphone-12-pro-max-pacific-blue-sabko-phone-768x768.jpg",
        rating: 4.5,
        reviewCount: 1000,
    },
    {
        id: 2,
        name: "Samsung Galaxy S21 Ultra",
        price: 11000,
        description: "A powerful smartphone with a new chipset",
        image: "https://images.samsung.com/is/image/samsung/p6pim/africa_en/sm-g998bzsgxfe/gallery/africa-en-galaxy-s21-ultra-5g-g988-371048-sm-g998bzsgxfe-414591354?$624_624_PNG$",
        rating: 4.2,
        reviewCount: 2000,
    },
    {
        id: 3,
        name: "Google Pixel 5",
        price: 90000,
        description: "A powerful smartphone with a new chipset",
        image: "https://i5.walmartimages.com/seo/Google-Pixel-5-128GB-8GB-Dual-SIM-Factory-Unlocked-6-in-5G-Phone-Sorta-Sage_4ed3d808-90b3-4e90-9b97-641accca8565.c8ef3aed7d37bfd736c30089a9d9f491.jpeg",
        rating: 4.3,
        reviewCount: 3000,
    },
];

function ProductShow() {
    const { catagory, brandname } = useParams();
    const [minPrice, setMinPrice] = useState(1000);
    const [maxPrice, setMaxPrice] = useState(100000);

    return (
        <div className="px-5 md:px-20 lg:px-44 py-5">
            <div>
                <p>
                    <Link to="/">Home</Link>
                    <span> {">"} {catagory}{" >"}</span>
                    <Link to={`/${catagory}/${brandname}`} className="text-red-700"> {brandname}</Link>
                </p>
            </div>

            <div className="flex flex-col md:flex-row my-10 gap-10">
                {/* Filter Section */}
                <div className="w-full md:w-1/4">
                    <h1 className="font-bold text-xl">Filters</h1>
                    <div className="my-5">
                        <p className="font-bold">Price Range</p>
                        <div className="flex justify-between my-3">
                            <span>{minPrice}</span>
                            <span>{maxPrice}</span>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="100"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full"
                            />

                        </div>
                    </div>
                </div>

                {/* Product Listing Section */}
                <div className="w-full md:w-3/4">
                    <h1 className="font-bold text-2xl capitalize">{brandname}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                        {ProductDetails.filter(product => product.price >= minPrice && product.price <= maxPrice).map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col p-5 border border-gray-300 rounded-lg shadow-md"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-56 object-cover rounded-md"
                                />
                                <h2 className="text-lg font-bold my-1">{product.name}</h2>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="font-bold text-xl text-red-700 py-3">रु {product.price}</p>
                                <div className="flex justify-between text-xl py-2">
                                    <p className="text-gray-700">Rating: {product.rating}</p>
                                    <p className="text-gray-700">Reviews: {product.reviewCount}</p>
                                </div>
                                <button className="bg-red-800 text-white py-2 rounded-md">Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductShow;
