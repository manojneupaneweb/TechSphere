import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/v1/category/getallcategory');
      console.log('response',response.data);
      setCategories(response.data);
      
    } catch (error) {
      toast.error("Error fetching categories!");
    }
  };

  // ✅ Add or Update Category
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editCategoryId) {
        await axios.put(`/api/v1/category/updatecategory/${editCategoryId}`, { name: categoryName });
        toast.success("Category updated successfully!");
      } else {
        await axios.post("/api/v1/category/addcategory", { name: categoryName });
        toast.success("Category added successfully!");
      }

      setCategoryName("");
      setEditCategoryId(null);
      fetchCategories();
    } catch (error) {
      toast.error("Error adding/updating category.");
    }
    setLoading(false);
  };

  // ✅ Add or Update Subcategory
  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!parentId) {
      toast.warn("Please select a parent category!");
      setLoading(false);
      return;
    }

    try {
      if (editSubCategoryId) {
        await axios.put(`/api/v1/category/updatesubcategory/${editSubCategoryId}`, {
          name: subCategoryName,
          parentId,
        });
        toast.success("Subcategory updated successfully!");
      } else {
        await axios.post("/api/v1/category/addsubcategory", { name: subCategoryName, parentId });
        toast.success("Subcategory added successfully!");
      }

      setSubCategoryName("");
      setParentId("");
      setEditSubCategoryId(null);
      fetchCategories();
    } catch (error) {
      toast.error("Error adding/updating subcategory.");
    }
    setLoading(false);
  };

  // ✅ Delete Category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`/api/v1/category/deletecategory/${id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error("Error deleting category.");
    }
  };

  // ✅ Edit Category (Fill Form)
  const handleEditCategory = (category) => {
    setEditCategoryId(category._id);
    setCategoryName(category.name);
  };

  // ✅ Edit Subcategory (Fill Form)
  const handleEditSubCategory = (subCategory) => {
    setEditSubCategoryId(subCategory._id);
    setSubCategoryName(subCategory.name);
    setParentId(subCategory.parentId);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Manage Categories</h1>
        <ToastContainer />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add/Edit Category */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">
              {editCategoryId ? "Edit Category" : "Add New Category"}
            </h2>
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
                {loading ? "Processing..." : editCategoryId ? "Update Category" : "Add Category"}
              </button>
            </form>
          </div>

          {/* Add/Edit Subcategory */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">
              {editSubCategoryId ? "Edit Subcategory" : "Add Subcategory"}
            </h2>
            <form onSubmit={handleSubCategorySubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Parent Category</label>
                <select className="w-full p-2 border border-gray-300 rounded" value={parentId} onChange={(e) => setParentId(e.target.value)} required>
                  <option value="">Select Parent Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Subcategory Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded font-bold" disabled={loading}>
                {loading ? "Processing..." : editSubCategoryId ? "Update Subcategory" : "Add Subcategory"}
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
                  <button className="text-blue-500 mr-3" onClick={() => handleEditCategory(category)}>
                    Edit
                  </button>
                  <button className="text-red-500" onClick={() => handleDeleteCategory(category._id)}>
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
