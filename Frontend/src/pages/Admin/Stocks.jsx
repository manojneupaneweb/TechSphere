import { useState, useEffect } from 'react';
import axios from 'axios';
import 'chartjs-chart-box-and-violin-plot';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {
  FiBarChart2 as ChartBarIcon,
  FiBox as CubeIcon,
  FiTag as TagIcon,
  FiRepeat as ArrowsRightLeftIcon,
  FiChevronDown as ChevronDownIcon,
  FiChevronUp as ChevronUpIcon
} from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Stocks() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          axios.get("/api/v1/product/getallproducts", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get("/api/v1/category/getallcategory", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get("/api/v1/product/getallbrand", {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
        ]);
        
        setProducts(productsRes.data.data || []);
        setCategories(categoriesRes.data || []);
        setBrands(brandsRes.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const topProducts = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 8);

  const categoryStock = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category._id);
    const totalStock = categoryProducts.reduce((sum, p) => sum + p.stock, 0);
    return {
      name: category.name,
      stock: totalStock
    };
  }).sort((a, b) => b.stock - a.stock).slice(0, 6);

  const brandStock = brands.map(brand => {
    const brandProducts = products.filter(p => p.brand === brand._id);
    const totalStock = brandProducts.reduce((sum, p) => sum + p.stock, 0);
    return {
      name: brand.name,
      stock: totalStock
    };
  }).sort((a, b) => b.stock - a.stock).slice(0, 6);

  // Calculate summary statistics
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const averageStock = products.length > 0 ? totalStock / products.length : 0;
  const maxStock = products.length > 0 ? Math.max(...products.map(p => p.stock)) : 0;

  // Chart data configurations
  const barChartData = {
    labels: topProducts.map(p => p.name.substring(0, 15) + (p.name.length > 15 ? '...' : '')),
    datasets: [
      {
        label: 'Stock Quantity',
        data: topProducts.map(p => p.stock),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const categoryChartData = {
    labels: categoryStock.map(c => c.name.substring(0, 12) + (c.name.length > 12 ? '...' : '')),
    datasets: [
      {
        label: 'Stock by Category',
        data: categoryStock.map(c => c.stock),
        backgroundColor: 'rgba(124, 58, 237, 0.7)',
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 1,
      },
    ],
  };

  const brandChartData = {
    labels: brandStock.map(b => b.name.substring(0, 12) + (b.name.length > 12 ? '...' : '')),
    datasets: [
      {
        label: 'Stock by Brand',
        data: brandStock.map(b => b.stock),
        backgroundColor: 'rgba(236, 72, 153, 0.7)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          precision: 0
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Stock Analysis Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm">Inventory stock levels and distribution</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Stock</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{totalStock.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <CubeIcon className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Avg. Stock</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{averageStock.toFixed(1)}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <ArrowsRightLeftIcon className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Max Stock</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{maxStock.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <ChartBarIcon className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Products</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{products.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
                <TagIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Products Section */}
        <div className="bg-white rounded-lg shadow-xs border border-gray-100 mb-4 overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('overview')}
          >
            <h2 className="font-semibold text-gray-800">Top Products by Stock</h2>
            {expandedSection === 'overview' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
          {expandedSection === 'overview' && (
            <div className="p-4 border-t border-gray-100">
              <div className="h-64">
                <Bar data={barChartData} options={options} />
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {topProducts.slice(0, 4).map((product, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <CubeIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.stock.toLocaleString()} units</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category and Brand Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Category Section */}
          <div className="bg-white rounded-lg shadow-xs border border-gray-100 overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('categories')}
            >
              <h2 className="font-semibold text-gray-800">Stock by Category</h2>
              {expandedSection === 'categories' ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            {expandedSection === 'categories' && (
              <div className="p-4 border-t border-gray-100">
                <div className="h-56">
                  <Bar data={categoryChartData} options={options} />
                </div>
                <div className="mt-3 space-y-2">
                  {categoryStock.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24">
                        <p className="text-xs font-medium text-gray-700 truncate">{category.name}</p>
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-600 h-1.5 rounded-full" 
                            style={{ width: `${(category.stock / totalStock) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-900">
                        {((category.stock / totalStock) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Brand Section */}
          <div className="bg-white rounded-lg shadow-xs border border-gray-100 overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('brands')}
            >
              <h2 className="font-semibold text-gray-800">Stock by Brand</h2>
              {expandedSection === 'brands' ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            {expandedSection === 'brands' && (
              <div className="p-4 border-t border-gray-100">
                <div className="h-56">
                  <Bar data={brandChartData} options={options} />
                </div>
                <div className="mt-3 space-y-2">
                  {brandStock.map((brand, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24">
                        <p className="text-xs font-medium text-gray-700 truncate">{brand.name}</p>
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-pink-600 h-1.5 rounded-full" 
                            style={{ width: `${(brand.stock / totalStock) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-900">
                        {((brand.stock / totalStock) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stock Trend Section */}
        <div className="bg-white rounded-lg shadow-xs border border-gray-100 mb-4 overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('trend')}
          >
            <h2 className="font-semibold text-gray-800">Stock Trend</h2>
            {expandedSection === 'trend' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
          {expandedSection === 'trend' && (
            <div className="p-4 border-t border-gray-100">
              <div className="h-64">
                <Line 
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                      {
                        label: 'Stock Movement',
                        data: [1200, 1900, 1500, 2000, 2200, 2500],
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.3,
                        fill: true
                      }
                    ]
                  }} 
                  options={{
                    ...options,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }} 
                />
              </div>
            </div>
          )}
        </div>

        {/* Recent Stock Updates */}
        <div className="bg-white rounded-lg shadow-xs border border-gray-100 overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('updates')}
          >
            <h2 className="font-semibold text-gray-800">Recent Stock Updates</h2>
            {expandedSection === 'updates' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
          {expandedSection === 'updates' && (
            <div className="border-t border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topProducts.slice(0, 5).map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <CubeIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{product.name}</div>
                              <div className="text-xs text-gray-500">{categories.find(c => c._id === product.category)?.name || 'N/A'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {product.stock.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {product.stock > 100 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              High
                            </span>
                          ) : product.stock > 20 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Medium
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Low
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stocks;