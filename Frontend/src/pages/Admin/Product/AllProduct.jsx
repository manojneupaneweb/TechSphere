import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Check, X } from "lucide-react";
import Loading from "../../../components/Loading.jsx";
import axios from "axios";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AllProduct = async () => {
      try {
        const response = await axios.get("/api/v1/product/getallproducts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProducts(response.data.products); // make sure response shape matches
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    AllProduct();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Products</h2>
              <p className="text-muted-foreground">
                Manage your product inventory, pricing, and details.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <button className="bg-[#8a0106] hover:bg-[#6d0105] text-white p-3 rounded-lg">
                <Link to="/admin/addproduct">Add Product</Link>
              </button>
              <button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="w-12"></th>
                  <th className="mx-20">ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th className="text-center">Brand</th>
                  <th className="text-right">Price</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Featured</th>
                  <th className="w-12">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="w-12 text-center">
                      <input type="checkbox" aria-label={`Select ${product.name}`} />
                    </td>
                    <td className="font-medium">{product.id}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md border bg-gray-50 p-1">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td className="text-center">{product.brand}</td>
                    <td className="text-right">${product.price.toFixed(2)}</td>
                    <td className="text-center">{product.stock}</td>
                    <td className="text-center">{/* You can add status here */}</td>
                    <td className="text-center">
                      {product.featured ? (
                        <Check className="mx-auto h-5 w-5 text-green-600" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-400" />
                      )}
                    </td>
                    <td className="text-center">{/* Actions here */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default AllProduct;
