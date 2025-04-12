import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const ProductShow = () => {
    const { category, brandname } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState(1000);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`/api/v1/category/${category}/${brandname}`);
                console.log('Product data:', response.data.message);
                // const obj = JSON.parse(response.data.message);  



                setProducts(response.data);
            } catch (err) {
                console.error("Failed to load products:", err);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [category, brandname]);

    if (loading) return <Loading />;

    const filtered = products.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filtered.length / productsPerPage);

    return (
        <div className="px-5 md:px-20 lg:px-44 py-5">
            {/* Breadcrumb */}
            <div className="text-sm mb-5">
                <Link to="/" className="text-blue-600">Home</Link>
                <span className="mx-1">{">>"}</span>
                <span className="capitalize text-red-700">{category}</span>
                {brandname && (
                    <>
                        <span className="mx-1">{">>"}</span>
                        <span className="capitalize text-red-700">{brandname}</span>
                    </>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Sidebar Filter */}
                <aside className="md:w-1/4 w-full">
                    <h2 className="font-bold text-xl mb-3">Filters</h2>
                    <div className="mb-6">
                        <label className="font-semibold block mb-1">Price Range</label>
                        <div className="flex justify-between text-sm mb-2">
                            <span>रु {minPrice}</span>
                            <span>रु {maxPrice}</span>
                        </div>
                        <input
                            type="range"
                            min={1000}
                            max={100000}
                            step={500}
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            className="w-full mb-2"
                        />
                        <input
                            type="range"
                            min={1000}
                            max={100000}
                            step={500}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </aside>

                {/* Products Section */}
                <section className="md:w-3/4 w-full">
                    <h1 className="text-2xl font-bold capitalize mb-4">{brandname || category}
                        <span className="font-normal text-sm text-gray-500 ml-2">
                            Total - {products.length} Products
                        </span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.length === 0 ? (
    <div className="text-center text-gray-500">No products found.</div>
  ) : (
    products.map((product) => (
      <div
        key={product.id}
        className="border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-md"
        />
        <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500 text-sm">
          {product.description?.slice(0, 100)}...
        </p>
        <p className="text-red-700 text-xl font-bold mt-2">रु {product.price}</p>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>⭐ {product.rating}</span>
          <span>{product.reviewCount} reviews</span>
        </div>
        <button className="mt-auto bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition">
          Add to Cart
        </button>
      </div>
    ))
  )}
</div>

                    <div>

                    </div>
                    <div>{products.id}</div>

                    {/* Pagination */}
                    {filtered.length > productsPerPage && (
                        <div className="mt-6 flex justify-center space-x-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 rounded border ${currentPage === index + 1
                                        ? "bg-red-700 text-white"
                                        : "bg-white text-black"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProductShow;
