import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/Loading.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 10;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("/api/v1/product/getallproducts", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/v1/product/deleteproduct/${selectedProduct.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      toast.success(`Deleted product: ${selectedProduct.name}`);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setShowDeletePopup(false);
      setSelectedProduct(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          {/* Delete Confirmation Popup */}
          {showDeletePopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
                <h2 className="text-xl font-semibold mb-4">
                  Are you sure you want to delete this product?
                </h2>
                <p className="mb-4">{selectedProduct?.name}</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleCancelDelete}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Products{" "}
                <span className="font-sans text-sm font-semibold">
                  (Total {products.length} Products)
                </span>
              </h2>
              <p className="text-muted-foreground">
                Manage your product inventory, pricing, and details.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/admin/add-product">
                <button className="bg-[#8a0106] hover:bg-[#6d0105] text-white p-3 rounded-lg">
                  Add Product
                </button>
              </Link>
              
            </div>
          </div>

          <div className="rounded-lg border shadow-sm overflow-x-auto overflow-scroll">
            <table className="w-full border-collapse min-w-[900px] text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3">S.N</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-center">Brand</th>
                  <th className="px-4 py-3 text-center">Price</th>
                  <th className="px-4 py-3 text-center">Stock</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {(currentPage - 1) * productsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md border bg-white p-1">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <span className="font-medium text-gray-800">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="text-center px-4 py-3">{product.brand}</td>
                    <td className="text-center px-4 py-3">
                      रु. {Number(product.price).toLocaleString()}
                    </td>
                    <td className="text-center px-4 py-3">{product.stock}</td>
                    <td className="text-center px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.status
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.status ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td className="text-center px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/updateproduct/${product.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length > productsPerPage && (
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-[#8a0106] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AllProduct;