import { useState } from "react";
import { Star, Trash2, ShoppingCart, Heart, Share2, AlertCircle } from "lucide-react";

// Mock wishlist data
const initialWishlistItems = [
  {
    id: "prod-001",
    slug: "premium-ultrabook-pro-x1",
    name: "Premium Ultrabook Pro X1",
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    specs: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch 4K Display",
  },
  {
    id: "prod-002",
    slug: "wireless-noise-cancelling-headphones",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    specs: "Bluetooth 5.0, 30-hour battery life, Active Noise Cancellation",
  },
  {
    id: "prod-003",
    slug: "smart-fitness-watch",
    name: "Smart Fitness Watch",
    price: 179.99,
    originalPrice: 199.99,
    discount: 10,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviewCount: 112,
    inStock: false,
    specs: "Heart rate monitor, GPS, 7-day battery life, Water resistant",
  },
  {
    id: "prod-004",
    slug: "4k-smart-tv",
    name: "4K Smart TV 55-inch",
    price: 699.99,
    originalPrice: 799.99,
    discount: 13,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviewCount: 76,
    inStock: true,
    specs: "4K UHD, HDR10+, Smart TV with voice control, 3 HDMI ports",
  },
  {
    id: "prod-005",
    slug: "gaming-console-pro",
    name: "Gaming Console Pro",
    price: 499.99,
    originalPrice: 499.99,
    discount: 0,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    specs: "8K gaming, 1TB SSD, Ray tracing, 120fps gameplay",
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const addToCart = (id) => {
    alert(`Added ${wishlistItems.find((item) => item.id === id)?.name} to cart`);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const shareWishlist = () => {
    alert("Wishlist share link copied to clipboard!");
  };

  const showConfirmation = (title, description, action) => {
    setModalContent({
      title,
      description,
      action
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-20">


      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <a href="/" className="hover:text-[#8a0106]">
              Home
            </a>
            <span className="mx-2">/</span>
            <span>Wishlist</span>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Add items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <a 
              href="/" 
              className="inline-block bg-[#8a0106] hover:bg-[#6d0105] text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
              </p>
              <div className="flex space-x-3">
                <button
                  className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50"
                  onClick={() =>
                    showConfirmation(
                      "Clear your wishlist?",
                      "This will remove all items from your wishlist. This action cannot be undone.",
                      clearWishlist
                    )
                  }
                >
                  Clear Wishlist
                </button>
                <button 
                  className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50 flex items-center"
                  onClick={shareWishlist}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-48 h-48">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-contain p-4 w-full h-full"
                      />
                      {item.discount > 0 && (
                        <span className="absolute top-4 left-4 bg-[#8a0106] text-white text-xs px-2 py-1 rounded">
                          {item.discount}% OFF
                        </span>
                      )}
                    </div>

                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex-1">
                        <a
                          href={`/product/${item.slug}`}
                          className="text-lg font-medium hover:text-[#8a0106] transition-colors"
                        >
                          {item.name}
                        </a>

                        <div className="flex items-center mt-1 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">({item.reviewCount})</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">{item.specs}</p>

                        <div className="flex items-center">
                          <span className="text-lg font-bold text-[#8a0106]">${item.price.toFixed(2)}</span>
                          {item.originalPrice > item.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {!item.inStock && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Out of Stock
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          className="bg-[#8a0106] hover:bg-[#6d0105] text-white px-4 py-2 rounded flex items-center"
                          onClick={() => addToCart(item.id)}
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </button>

                        <button
                          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 flex items-center"
                          onClick={() =>
                            showConfirmation(
                              "Remove from wishlist?",
                              `This will remove ${item.name} from your wishlist. You can add it back later if you change your mind.`,
                              () => removeFromWishlist(item.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </button>

                        <a
                          href={`/product/${item.slug}`}
                          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 inline-block"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Recently Viewed</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <a 
                    key={item} 
                    href={`/product/recently-viewed-${item}`} 
                    className="group block"
                  >
                    <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                      <img
                        src={`/placeholder.svg?height=100&width=100`}
                        alt={`Recently Viewed Item ${item}`}
                        className="object-contain p-2 w-full h-full"
                      />
                    </div>
                    <h3 className="text-sm font-medium truncate group-hover:text-[#8a0106] transition-colors">
                      Recently Viewed Product {item}
                    </h3>
                    <p className="text-sm text-[#8a0106] font-medium">$199.99</p>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-2">{modalContent.title}</h3>
            <p className="text-gray-600 mb-4">{modalContent.description}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                onClick={() => {
                  modalContent.action();
                  setShowModal(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}