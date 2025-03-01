import React, { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    highlights: "",
    warranty: "",
    payment_options: "",
    return_policy: "",
    description: "",
    specifications: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", product);
  };

  const addSpecification = () => {
    setProduct((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { topic: "", feature: "" }],
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...product.specifications];
    updatedSpecifications[index][field] = value;
    setProduct((prev) => ({ ...prev, specifications: updatedSpecifications }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg  ">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Product Name", name: "name", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Warranty", name: "warranty", type: "text" },
          { label: "Payment Options", name: "payment_options", type: "text" },
          { label: "Return Policy", name: "return_policy", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input type={type} name={name} value={product[name]} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
        ))}

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
          <button type="button" onClick={addSpecification} className="border border-black p-1 text-sm rounded-md mt-2">Add Specification</button>
          {product.specifications.map((spec, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 mt-2">
              <input type="text" placeholder="Topic" value={spec.topic} onChange={(e) => handleSpecificationChange(index, "topic", e.target.value)} className="border p-2 rounded-md w-full" />
              <input type="text" placeholder="Feature" value={spec.feature} onChange={(e) => handleSpecificationChange(index, "feature", e.target.value)} className="border p-2 rounded-md w-full" />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
          {product.image && <img src={URL.createObjectURL(product.image)} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
