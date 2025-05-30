import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";

function UpdateProduct() {
    const { id } = useParams();

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
        fetchPreProduct();
        // eslint-disable-next-line
    }, []);

    const fetchPreProduct = async () => {
        try {
            const response = await axios.get(`/api/v1/product/product/${id}`);
            const data = response.data.data;
            setProduct({
                name: data.name || "",
                price: data.price || "",
                warranty: data.warranty || "",
                stock: data.stock || "",
                category: data.category || "",
                brand: data.brand || "",
                return_policy: data.return_policy || "",
                description: data.description || "",
                specifications: Array.isArray(data.specifications) ? data.specifications : [],
                image: null,
                imagePreview: data.image ? data.image : null, // If you want to show existing image
            });
        } catch (error) {
            toast.error("Error fetching product!");
        }
    };

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
            toast.error("Please upload a valid image file.");
        }
    };

    useEffect(() => {
        return () => {
            if (product.imagePreview && typeof product.imagePreview === "string" && product.image) {
                URL.revokeObjectURL(product.imagePreview);
            }
        };
        // eslint-disable-next-line
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

            await axios.put(`/api/v1/product/editproduct/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.success("Product Updated!");
            // Optionally, refetch product or redirect
        } catch (error) {
            toast.error("Error updating product.");
            setError(error.response?.data?.message || "Failed to update product.");
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
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* BASIC INPUT FIELDS */}
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
                <input type="text" name="warranty" value={product.warranty} onChange={handleChange} placeholder="Warranty" className="w-full p-2 border rounded" required />
                <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required />
                <input type="text" name="return_policy" value={product.return_policy} onChange={handleChange} placeholder="Return Policy" className="w-full p-2 border rounded" required />

                {/* CATEGORY */}
                <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id || cat._id || cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                {/* BRAND */}
                <select name="brand" value={product.brand} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id || brand._id || brand.name} value={brand.name}>{brand.name}</option>
                    ))}
                </select>

                {/* DESCRIPTION */}
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" rows="3" required />

                {/* IMAGE UPLOAD */}
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                {product.imagePreview && (
                    <img
                        src={typeof product.imagePreview === "string" ? product.imagePreview : URL.createObjectURL(product.imagePreview)}
                        alt="Preview"
                        className="h-40 mt-2 rounded"
                    />
                )}

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
                    {loading ? "Updating..." : "Update Product"}
                </button>

                {error && <p className="text-red-500">{error}</p>}
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateProduct;
