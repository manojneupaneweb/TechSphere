import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productcard";

const Search = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const content = params.get("content");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/v1/product/search/${content}`);
                console.log(response.data.message);
                setProducts(response.data.message);
            } catch (err) {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [content, location.state]);

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    return <ProductCard products={products} find={content} />;
};

export default Search;