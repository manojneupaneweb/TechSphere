import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]); // New state for brands
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState(""); // New state for brand name
  const [subCategoryName, setSubCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchBrands(); // Fetch brands on component mount
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
      const response = await axios.get('/api/v1/category/getallbrand'); // Add API endpoint to fetch brands
      setBrands(response.data);
    } catch (error) {
      toast.error("Error fetching brands!");
    }
  };

  // Add Brand
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/v1/category/addbrand", { name: brandName }); // Add brand API call
      toast.success("Brand added successfully!");
      setBrandName("");
      fetchBrands();
    } catch (error) {
      toast.error("Error adding brand.");
    }
    setLoading(false);
  };

  // Add or Update Category (No edit functionality for categories now)
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/v1/category/addcategory", { name: categoryName });
      toast.success("Category added successfully!");
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      toast.error("Error adding category.");
    }
    setLoading(false);
  };

  // Add or Update Subcategory
  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!parentId) {
      toast.warn("Please select a parent category!");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/v1/category/addsubcategory", { name: subCategoryName, parentId });
      toast.success("Subcategory added successfully!");
      setSubCategoryName("");
      setParentId("");
      fetchCategories();
    } catch (error) {
      toast.error("Error adding subcategory.");
    }
    setLoading(false);
  };

  // Delete Category
  const handleDeleteCategory = async (id, categoryName) => {
    if (!window.confirm(`Are you sure you want to delete ${categoryName} category?`)) return;

    try {
      await axios.delete(`/api/v1/category/deletecategory/:${id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error("Error deleting category.");
    }
  };

  // Delete Brand
  const handleDeleteBrand = async (id, brandName) => {
    if (!window.confirm(`Are you sure you want to delete ${brandName} brand?`)) return;

    try {
      await axios.delete(`/api/v1/category/deletebrand/:${id}`); 
      toast.success("Brand deleted successfully!");
      fetchBrands();
    } catch (error) {
      toast.error("Error deleting brand.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Manage Categories & Brands</h1>
        <ToastContainer />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Category */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleCategorySubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Category Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded font-bold" disabled={loading}>
                {loading ? "Processing..." : "Add Category"}
              </button>
            </form>
          </div>

          {/* Add Brand */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Add New Brand</h2>
            <form onSubmit={handleBrandSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Brand Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded font-bold" disabled={loading}>
                {loading ? "Processing..." : "Add Brand"}
              </button>
            </form>
          </div>
        </div>

        {/* Display Categories */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-3">Existing Categories</h2>
          <ul className="list-disc pl-5">
            {categories.map((category) => (
              <li key={category._id} className="mb-2 flex justify-between">
                <span className="font-semibold">{category.name}</span>
                <div>
                  <button className="text-red-500" onClick={() => handleDeleteCategory(category._id, category.name)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Display Brands */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-3">Existing Brands</h2>
          <ul className="list-disc pl-5">
            {brands.map((brand) => (
              <li key={brand._id} className="mb-2 flex justify-between">
                <span className="font-semibold">{brand.name}</span>
                <div>
                  <button className="text-red-500" onClick={() => handleDeleteBrand(brand.id, brand.name)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
