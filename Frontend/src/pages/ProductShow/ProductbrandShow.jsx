import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/productcard.jsx";

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const content = params.get("content");

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/search?query=${encodeURIComponent(content)}`);
      setProducts(response.data.products || response.data); // adjust based on your API response
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (content) {
      fetchProducts();
    } else {
      setLoading(false);
      setProducts([]);
      setError(null);
    }
  }, [content]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <ProductCard products={products} find={content} />;
};

export default Search;
