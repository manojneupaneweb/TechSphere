
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Productcard from "../../components/productcard.jsx";

const ProductbrandShow = () => {
    const { brand } = useParams();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/v1/category/${brand}`);
            setProducts(Array.isArray(response.data) ? response.data : []);
            console.log("response", response.data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [brand]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    console.log("products", products);

    return <Productcard products={products} brand={brand} />;
};

export default ProductbrandShow;