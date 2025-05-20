import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Productcard from "../../components/productcard.jsx";

const ProductsShow = () => {
    const { category, brandname } = useParams();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/v1/category/${category}/${brandname}`);
            setProducts(Array.isArray(response.data) ? response.data : []);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    console.log("products", products);

    return <Productcard products={products} find={category} />;
};

export default ProductsShow;