import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Productcard from "../../components/productcard.jsx";

const ProductsShow = () => {
  const { category, brandname } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/category/${category}/${brandname}`);
        setProducts(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, brandname]); // <-- FIXED: added brandname here

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <Productcard products={products} find={category} />;
};

export default ProductsShow;
