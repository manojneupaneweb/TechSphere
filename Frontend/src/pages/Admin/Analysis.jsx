import { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import { FiBox, FiTag, FiLayers, FiTrendingUp, FiDollarSign, FiPieChart, FiBarChart2, FiCalendar } from 'react-icons/fi'
import { motion } from 'framer-motion'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

const Analysis = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        
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
        ])
        
        setProducts(productsRes.data.data || [])
        setCategories(categoriesRes.data || [])
        setBrands(brandsRes.data.data || [])
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper functions for data processing
  const getProductsByCategory = () => {
    const categoryCounts = {}
    
    categories.forEach(category => {
      const count = products.filter(p => p.category === category._id).length
      categoryCounts[category.name] = count
    })
    
    return categoryCounts
  }

  const getProductsByBrand = () => {
    const brandCounts = {}
    
    brands.forEach(brand => {
      const count = products.filter(p => p.brand === brand._id).length
      brandCounts[brand.name] = count
    })
    
    return brandCounts
  }

  const getRecentlyAddedProducts = () => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }

  const getLast30DaysProducts = () => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    return products.filter(p => new Date(p.createdAt) >= thirtyDaysAgo)
  }

  const getHighestPriceProductsByCategory = () => {
    const result = {}
    
    categories.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category._id)
      if (categoryProducts.length > 0) {
        const maxPriceProduct = categoryProducts.reduce((prev, current) => 
          (prev.price > current.price) ? prev : current
        )
        result[category.name] = maxPriceProduct.price
      }
    })
    
    return result
  }

  const getHighestPriceProductsByBrand = () => {
    const result = {}
    
    brands.forEach(brand => {
      const brandProducts = products.filter(p => p.brand === brand._id)
      if (brandProducts.length > 0) {
        const maxPriceProduct = brandProducts.reduce((prev, current) => 
          (prev.price > current.price) ? prev : current
        )
        result[brand.name] = maxPriceProduct.price
      }
    })
    
    return result
  }

  const getAveragePriceByCategory = () => {
    const result = {}
    
    categories.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category._id)
      if (categoryProducts.length > 0) {
        const total = categoryProducts.reduce((sum, product) => sum + product.price, 0)
        result[category.name] = total / categoryProducts.length
      }
    })
    
    return result
  }

  const getTotalValueByCategory = () => {
    const result = {}
    
    categories.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category._id)
      if (categoryProducts.length > 0) {
        result[category.name] = categoryProducts.reduce((sum, product) => sum + product.price, 0)
      }
    })
    
    return result
  }

  const getProductsAddedPerDayLast30Days = () => {
    const result = {}
    const today = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const count = products.filter(p => {
        const productDate = new Date(p.createdAt).toISOString().split('T')[0]
        return productDate === dateStr
      }).length
      
      result[dateStr] = count
    }
    
    return result
  }

  // Prepare data for charts
  const productsByCategory = getProductsByCategory()
  const productsByBrand = getProductsByBrand()
  const recentlyAddedProducts = getRecentlyAddedProducts()
  const last30DaysProducts = getLast30DaysProducts()
  const highestPriceByCategory = getHighestPriceProductsByCategory()
  const highestPriceByBrand = getHighestPriceProductsByBrand()
  const averagePriceByCategory = getAveragePriceByCategory()
  const totalValueByCategory = getTotalValueByCategory()
  const productsAddedPerDay = getProductsAddedPerDayLast30Days()

  // Chart data configurations
  const categoryDistributionData = {
    labels: Object.keys(productsByCategory),
    datasets: [
      {
        label: 'Products by Category',
        data: Object.values(productsByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const brandDistributionData = {
    labels: Object.keys(productsByBrand),
    datasets: [
      {
        label: 'Products by Brand',
        data: Object.values(productsByBrand),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const highestPriceCategoryData = {
    labels: Object.keys(highestPriceByCategory),
    datasets: [
      {
        label: 'Highest Price by Category',
        data: Object.values(highestPriceByCategory),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const dailyAddedProductsData = {
    labels: Object.keys(productsAddedPerDay),
    datasets: [
      {
        label: 'Products Added Daily (Last 30 Days)',
        data: Object.values(productsAddedPerDay),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  }

  const totalValueCategoryData = {
    labels: Object.keys(totalValueByCategory),
    datasets: [
      {
        label: 'Total Value by Category',
        data: Object.values(totalValueByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive analysis of your product catalog</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiBox className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
              <p className="text-2xl font-bold text-gray-800">{products.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiTag className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Categories</h3>
              <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FiLayers className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Brands</h3>
              <p className="text-2xl font-bold text-gray-800">{brands.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Products by Category */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Products by Category</h2>
            <FiPieChart className="text-gray-500" />
          </div>
          <div className="h-64">
            <Pie data={categoryDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>

        {/* Products by Brand */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Products by Brand</h2>
            <FiBarChart2 className="text-gray-500" />
          </div>
          <div className="h-64">
            <Doughnut data={brandDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>
      </div>

      {/* Recent Products and Highest Price */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recently Added Products */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recently Added Products</h2>
            <FiCalendar className="text-gray-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentlyAddedProducts.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find(c => c._id === product.category)?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Highest Price by Category */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Highest Price by Category</h2>
            <FiDollarSign className="text-gray-500" />
          </div>
          <div className="h-64">
            <Bar data={highestPriceCategoryData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>
      </div>

      {/* 30 Days Analysis */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Products Added in Last 30 Days</h2>
            <FiTrendingUp className="text-gray-500" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <p className="text-3xl font-bold text-gray-800">{last30DaysProducts.length}</p>
              <p className="text-gray-600">Total products added</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 font-medium">
                {((last30DaysProducts.length / products.length) * 100).toFixed(1)}% of total products
              </p>
            </div>
          </div>
          <div className="h-64">
            <Line data={dailyAddedProductsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>
      </div>

      {/* Additional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Total Value by Category */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Total Value by Category</h2>
            <FiDollarSign className="text-gray-500" />
          </div>
          <div className="h-64">
            <Bar data={totalValueCategoryData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>

        {/* Category/Brand Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Category vs Brand Distribution</h2>
            <FiPieChart className="text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Top Categories</h3>
              <ul className="space-y-2">
                {Object.entries(productsByCategory)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([category, count], index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: categoryDistributionData.datasets[0].backgroundColor[index] }}></span>
                      <span className="text-gray-700">{category}:</span>
                      <span className="ml-auto font-medium">{count}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Top Brands</h3>
              <ul className="space-y-2">
                {Object.entries(productsByBrand)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([brand, count], index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: brandDistributionData.datasets[0].backgroundColor[index] }}></span>
                      <span className="text-gray-700">{brand}:</span>
                      <span className="ml-auto font-medium">{count}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Average Price by Category */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Price by Category</h3>
          <ul className="space-y-3">
            {Object.entries(averagePriceByCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([category, avgPrice], index) => (
                <li key={index} className="flex items-center">
                  <span className="text-gray-700 flex-grow">{category}</span>
                  <span className="font-medium">${avgPrice.toFixed(2)}</span>
                </li>
              ))}
          </ul>
        </motion.div>

        {/* Highest Price by Brand */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Highest Price by Brand</h3>
          <ul className="space-y-3">
            {Object.entries(highestPriceByBrand)
              .sort((a, b) => b[1] - a[1])
              .map(([brand, price], index) => (
                <li key={index} className="flex items-center">
                  <span className="text-gray-700 flex-grow">{brand}</span>
                  <span className="font-medium">${price}</span>
                </li>
              ))}
          </ul>
        </motion.div>

        {/* Category with Most Products */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category with Most Products</h3>
          {Object.entries(productsByCategory)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 1)
            .map(([category, count], index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold text-blue-600 mb-2">{category}</p>
                <p className="text-gray-600">{count} products ({((count / products.length) * 100).toFixed(1)}% of total)</p>
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Analysis