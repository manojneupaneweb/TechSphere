import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {
  const initialProductState = {
    name: "",
    price: "",
    highlights: "",
    warranty: "",
    stock: "",
    category: "",
    return_policy: "",
    description: "",
    specifications: [],
    image: null,
    imagePreview: null,
  };

  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error feedback
  const [categories, setCategories] = useState([]);  // To store categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/v1/category/getallcategory');
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories!");
      }
    };
    fetchCategories();
  }, []);

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
    formData.append("highlights", product.highlights);
    formData.append("warranty", product.warranty);
    formData.append("stock", product.stock);  // Added stock
    formData.append("category", product.category);// Added product
    formData.append("return_policy", product.return_policy);
    formData.append("description", product.description);
    formData.append("specifications", JSON.stringify(product.specifications)); // Ensure this is stringified
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Authorization token is missing.");
        return;
      }
      const response = await axios.post("/api/v1/product/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Add Product !");
      setProduct(initialProductState);
    } catch (error) {
      toast.error("Error! ",error.message);
      console.error("Error submitting product:", error);
      setError(error.response?.data?.message || "Failed to add product. Please try again.");
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

  //all categoty 
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/v1/category/getallcategory');
      console.log('response', response.data);
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching categories!");

    }
  };

  return (
    
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[{ label: "Product Name", name: "name", type: "text" },
        { label: "Price", name: "price", type: "number", min: "0" },
        { label: "Warranty", name: "warranty", type: "text" },
        { label: "Return Policy", name: "return_policy", type: "text" }].map(({ label, name, type, min }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input type={type} name={name} value={product[name]} onChange={handleChange} className="w-full p-2 border rounded-md" required min={min} />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded-md" min="0" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded-md" required>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Highlights</label>
          <textarea name="highlights" value={product.highlights} onChange={handleChange} className="w-full p-2 border rounded-md" rows="3" required></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded-md" rows="4" required></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Specifications</label>
          <button type="button" onClick={addSpecification} className="border border-black p-1 text-sm rounded-md mt-2">
            Add Specification
          </button>
          {product.specifications.map((spec, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 mt-2">
              <input type="text" placeholder="Topic" value={spec.topic} onChange={(e) => handleSpecificationChange(index, "topic", e.target.value)} className="border p-2 rounded-md w-full" />
              <input type="text" placeholder="Feature" value={spec.feature} onChange={(e) => handleSpecificationChange(index, "feature", e.target.value)} className="border p-2 rounded-md w-full" />
              <button type="button" onClick={() => removeSpecification(index)} className="bg-red-500 text-white p-1 rounded-md">X</button>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-md" accept="image/*" />
          {product.imagePreview && <img src={product.imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>} {/* Error message */}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
