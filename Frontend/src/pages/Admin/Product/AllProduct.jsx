import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Check, X, Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/Loading.jsx";
import axios from "axios";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  let count = 1 ;
  const productsPerPage = 10;

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Products{" "}
                <span className="font-sans text-sm font-semibold">
                  ( Total {products.length} Product)
                </span>
              </h2>
              <p className="text-muted-foreground">
                Manage your product inventory, pricing, and details.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/admin/addproduct">
                <button className="bg-[#8a0106] hover:bg-[#6d0105] text-white p-3 rounded-lg">
                  Add Product
                </button>
              </Link>
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700">
                <Download className="h-4 w-4" />
                Export
              </button>
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
                {currentProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {count++}

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
                      रु. {Number(product.price)}
                    </td>
                    <td className="text-center px-4 py-3">{product.stock}</td>
                    <td className="text-center px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status
                          ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {product.status ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td className="text-center px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <Link to={`/admin/updateproduct/${product.id}`} className="text-blue-600 hover:text-blue-800">
                          <Pencil size={16} />
                        </Link>
                        <button className="text-red-600 hover:text-red-800">
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
                    className={`px-3 py-1 rounded-md ${currentPage === index + 1
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
