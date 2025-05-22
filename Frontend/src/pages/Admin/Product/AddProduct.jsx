import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {
  const initialProductState = {
    name: "",
    price: "",
    warranty: "",
    stock: "",
    category: "",
    brand: "",
    return_policy: "",
    description: "",
    specifications: [],
    image: null,
    imagePreview: null,
  };

  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/v1/category/getallcategory');
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching categories!");
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/v1/product/getallbrand'); 
      setBrands(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      toast.error("Error fetching brands!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProduct((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      console.log("Please upload a valid image file.");
    }
  };

  useEffect(() => {
    return () => {
      if (product.imagePreview) {
        URL.revokeObjectURL(product.imagePreview);
      }
    };
  }, [product.imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("warranty", product.warranty);
    formData.append("stock", product.stock);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("return_policy", product.return_policy);
    formData.append("description", product.description);
    formData.append("specifications", JSON.stringify(product.specifications));
    if (product.image) {
      formData.append("image", product.image);
    }
    

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Authorization token is missing.");
        return;
      }

      await axios.post("/api/v1/product/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Product Added!");
      setProduct(initialProductState);
    } catch (error) {
      toast.error("Error adding product.");
      console.error("Error submitting product:", error);
      setError(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const addSpecification = () => {
    setProduct((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { topic: "", feature: "" }],
    }));
  };

  const removeSpecification = (index) => {
    setProduct((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...product.specifications];
    updatedSpecifications[index][field] = value;
    setProduct((prev) => ({ ...prev, specifications: updatedSpecifications }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 font-semibold">
        {/* BASIC INPUT FIELDS */}
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded " required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <select name="warranty" value={product.warranty} onChange={handleChange} className="w-full p-2 border rounded" required>
  <option value="">Select Warranty</option>
  <option value="No Warranty">No Warranty</option>
  <option value="7 Days">7 Days</option>
  <option value="15 Days">15 Days</option>
  <option value="1 Month">1 Month</option>
  <option value="6 Months">6 Months</option>
  <option value="1 Year">1 Year</option>
</select>

<input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required />

<select name="return_policy" value={product.return_policy} onChange={handleChange} className="w-full p-2 border rounded" required>
  <option value="">Select Return Policy</option>
  <option value="No Return">No Return</option>
  <option value="Return within 7 Days">Return within 7 Days</option>
  <option value="Return within 15 Days">Return within 15 Days</option>
  <option value="Return within 30 Days">Return within 30 Days</option>
</select>


        {/* CATEGORY */}
        <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        {/* BRAND */}
        <select name="brand" value={product.brand} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.name}>{brand.name}</option>
          ))}
        </select>

        {/* DESCRIPTION */}
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" rows="3" required />

        {/* IMAGE UPLOAD */}
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" required />
        {product.imagePreview && <img src={product.imagePreview} alt="Preview" className="h-40 mt-2 rounded" />}

        {/* SPECIFICATIONS */}
        <div>
          <label className="block font-medium mb-1">Specifications</label>
          {product.specifications.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input type="text" placeholder="Topic" value={spec.topic} onChange={(e) => handleSpecificationChange(index, "topic", e.target.value)} className="w-1/2 p-2 border rounded" />
              <input type="text" placeholder="Feature" value={spec.feature} onChange={(e) => handleSpecificationChange(index, "feature", e.target.value)} className="w-1/2 p-2 border rounded" />
              <button type="button" onClick={() => removeSpecification(index)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={addSpecification} className="text-blue-600">+ Add Spec</button>
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
