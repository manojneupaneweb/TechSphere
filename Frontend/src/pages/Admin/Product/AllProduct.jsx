import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Filter, Download, MoreHorizontal, Edit, Trash2, Eye, Check, X } from "lucide-react"

// Sample product data
const products = [
    {
        id: "PROD-001",
        name: "Premium Ultrabook Pro X1",
        category: "Laptops",
        price: 1299.99,
        stock: 15,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: true,
    },
    {
        id: "PROD-002",
        name: "Wireless Noise-Cancelling Headphones",
        category: "Audio",
        price: 249.99,
        stock: 32,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: false,
    },
    {
        id: "PROD-003",
        name: "Smart Fitness Watch",
        category: "Wearables",
        price: 179.99,
        stock: 5,
        status: "Low Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: true,
    },
    {
        id: "PROD-004",
        name: "4K Smart TV 55-inch",
        category: "TVs",
        price: 699.99,
        stock: 18,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: false,
    },
    {
        id: "PROD-005",
        name: "Gaming Console Pro",
        category: "Gaming",
        price: 499.99,
        stock: 0,
        status: "Out of Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: true,
    },
    {
        id: "PROD-006",
        name: "Bluetooth Portable Speaker",
        category: "Audio",
        price: 79.99,
        stock: 42,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: false,
    },
    {
        id: "PROD-007",
        name: "Professional DSLR Camera",
        category: "Cameras",
        price: 1499.99,
        stock: 7,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: true,
    },
    {
        id: "PROD-008",
        name: "Mechanical Gaming Keyboard",
        category: "Accessories",
        price: 129.99,
        stock: 25,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: false,
    },
    {
        id: "PROD-009",
        name: "Wireless Gaming Mouse",
        category: "Accessories",
        price: 89.99,
        stock: 3,
        status: "Low Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: false,
    },
    {
        id: "PROD-010",
        name: "External SSD 1TB",
        category: "Storage",
        price: 149.99,
        stock: 22,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
        featured: false,
    },
]

function AllProduct() {
    const [selectedProducts, setSelectedProducts] = useState();

    const toggleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([])
        } else {
            setSelectedProducts(products.map((product) => product.id))
        }
    }

    const toggleSelectProduct = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId))
        } else {
            setSelectedProducts([...selectedProducts, productId])
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-800"
            case "Low Stock":
                return "bg-yellow-100 text-yellow-800"
            case "Out of Stock":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">Manage your product inventory, pricing, and details.</p>
                </div>
                <div className="flex items-center  gap-5">
                    <button asChild className="bg-[#8a0106] hover:bg-[#6d0105] text-white p-3 rounded-lg">
                        <Link href="/admin/products/new">
                            Add Product
                        </Link>
                    </button>
                    <button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </button>
                </div>
            </div>


            <div className="rounded-md border">
                <table className="w-full border-collapse">
                    {/* Table Head */}
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="w-12">
                                <input
                                    type="checkbox"
                                    // checked={selectedProducts.length === products.length && products.length > 0}
                                    onChange={toggleSelectAll}
                                    aria-label="Select all products"
                                />
                            </th>
                            <th className="mx-20">ID</th>
                            <th>Product</th>
                            <th>Category</th> 
                            <th className="text-right">Price</th>
                            <th className="text-center">Stock</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Featured</th>
                            <th className="w-12">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b">
                                <td className="w-12 text-center">
                                    <input
                                        type="checkbox"
                                        // checked={selectedProducts.includes(product.id)}
                                        // onChange={() => toggleSelectProduct(product.id)}
                                        aria-label={`Select ${product.name}`}
                                    />
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
                                <td className="text-right">${product.price.toFixed(2)}</td>
                                <td className="text-center">{product.stock}</td>
                                <td className="text-center">
                                    {/* <Badge className={getStatusColor(product.status)}>{product.status}</Badge> */}
                                </td>
                                <td className="text-center">
                                    {product.featured ? (
                                        <Check className="mx-auto h-5 w-5 text-green-600" />
                                    ) : (
                                        <X className="mx-auto h-5 w-5 text-gray-400" />
                                    )}
                                </td>
                                <td className="text-center">
                                    {/* Actions (Edit, Delete, etc.) */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default AllProduct