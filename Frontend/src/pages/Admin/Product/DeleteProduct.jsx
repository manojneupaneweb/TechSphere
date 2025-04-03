import React, { useEffect, useState } from 'react';

const ShowAllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Replace with your API endpoint
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <h1>All Products</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <p>Price: ${product.price}</p>
                            <p>{product.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ShowAllProducts;