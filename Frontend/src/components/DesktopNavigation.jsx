import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const DesktopNavigation = () => {
  const categories = [
    {
      name: "Laptops",
      featured: {
        title: "Featured Laptops",
        description:
          "Discover our top-rated laptops with the latest technology and exceptional performance.",
        link: "/category/laptop/featured",
      },
      subcategories: [
        {
          name: "HP",
          description: "High-performance laptops for gaming",
          link: "/category/laptop/hp"
        },
        {
          name: "Dell",
          description: "Reliable laptops for professionals",
          link: "/category/laptop/dell"
        },
        {
          name: "Lenovo",
          description: "Thin and light with long battery life",
          link: "/category/laptop/lenovo"
        },
        {
          name: "Asus",
          description: "Affordable laptops with great features",
          link: "/category/laptop/asus"
        },
        {
          name: "Apple (MacBooks)",
          description: "Premium laptops with macOS and sleek design",
          link: "/category/laptop/apple"
        }
      ]

    },
    {
      name: "Smartphones",
      subcategories: [
        { name: "Apple iPhones", description: "Latest iPhones with cutting-edge features", link: "/category/Smartphone/apple" },
        { name: "Samsung Galaxy", description: "Innovative Android Smartphone", link: "/category/Smartphone/samsung" },
        { name: "Google Pixel", description: "Pure Android with great cameras", link: "/category/Smartphone/google" },
        { name: "Xiaomi", description: "Feature-rich at competitive prices", link: "/category/Smartphone/xiaomi" },
        { name: "OnePlus", description: "Performance-focused devices", link: "/category/Smartphone/oneplus" },
        { name: "Budget Phones", description: "Affordable Smartphone", link: "/category/Smartphone/budget" },
      ],
    },
    {
      name: "Accessories",
      subcategories: [
        { name: "Headphones", description: "Wireless and wired headphones", link: "/category/accessories/headphones" },
        { name: "Cases & Covers", description: "Protection for your devices", link: "/category/accessories/cases" },
        { name: "Chargers & Cables", description: "Fast charging solutions", link: "/category/accessories/chargers" },
        { name: "Storage Devices", description: "External drives and memory cards", link: "/category/accessories/storage" },
        { name: "Keyboards & Mice", description: "Ergonomic peripherals", link: "/category/accessories/keyboards" },
        { name: "Speakers", description: "Bluetooth and wired speakers", link: "/category/accessories/speakers" },
      ],
    },
  ];

  return (
    <nav className="hidden md:block pb-1">
      <ul className="flex space-x-8">
        {categories.map((category) => (
          <li key={category.name} className="group relative">
            <button className="flex items-center py-3 font-medium hover:text-[#8a0106] transition-colors">
              {category.name}
              <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
            </button>
            <div className="absolute left-0 top-full w-[600px] bg-white shadow-lg rounded-md overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
              <div className={`grid ${category.featured ? "grid-cols-3" : "grid-cols-2"} gap-0`}>
                {category.featured && (
                  <div className="col-span-1 bg-gradient-to-b from-[#8a0106]/20 to-[#8a0106]/60 p-6 flex flex-col justify-end h-full">
                    <div className="mt-4 mb-2 text-lg font-medium text-white">
                      Featured {category.name}
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      {category.featured.description}
                    </p>
                    <Link
                      to={category.featured.link}
                      className="mt-4 text-white text-sm font-medium hover:underline"
                    >
                      View All Featured
                    </Link>
                  </div>
                )}
                <div className={`p-4 ${category.featured ? "col-span-2" : "col-span-2"}`}>
                  <div className="grid grid-cols-2 gap-2">
                    {category.subcategories.map((subcat) => (
                      <Link
                        key={subcat.name}
                        to={subcat.link}
                        className="block p-3 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-sm">{subcat.name}</div>
                        <p className="text-xs text-gray-500 mt-1">{subcat.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}

      </ul>
    </nav>
  );
};

export default DesktopNavigation;
