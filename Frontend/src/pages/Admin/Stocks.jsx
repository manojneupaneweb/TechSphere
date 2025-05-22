import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Skeleton,
    Avatar,
    Stack,
    Tabs,
    Tab,
    IconButton,
    Tooltip,
    Divider,
    useTheme,
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from 'recharts';
import {
    Inventory,
    Category,
    BrandingWatermark,
    Star,
    ShowChart,
    PieChart as PieChartIcon,
    BarChart as BarChartIcon,
    Refresh,
} from '@mui/icons-material';

// Color palette
const COLORS = [
    '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E',
    '#F97316', '#F59E0B', '#10B981', '#14B8A6',
    '#0EA5E9', '#3B82F6'
];

function Stocks() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();

    const accessToken = localStorage.getItem("accessToken");

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
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
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    // Data processing
    const getCategoryData = () => {
        const categoryMap = {};
        products.forEach(product => {
            if (!categoryMap[product.category]) {
                categoryMap[product.category] = {
                    count: 0,
                    totalStock: 0,
                    totalRevenue: 0,
                    topProducts: []
                };
            }
            categoryMap[product.category].count++;
            categoryMap[product.category].totalStock += product.stock || 0;
            categoryMap[product.category].totalRevenue += (product.price || 0) * (product.stock || 0);
            categoryMap[product.category].topProducts.push(product);
            categoryMap[product.category].topProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
            if (categoryMap[product.category].topProducts.length > 3) {
                categoryMap[product.category].topProducts.pop();
            }
        });
        return Object.entries(categoryMap)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 10);
    };

    const getBrandData = () => {
        const brandMap = {};
        products.forEach(product => {
            if (!brandMap[product.brand]) {
                brandMap[product.brand] = {
                    count: 0,
                    totalValue: 0,
                };
            }
            brandMap[product.brand].count++;
            brandMap[product.brand].totalValue += (product.price || 0) * (product.stock || 0);
        });
        return Object.entries(brandMap)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 10);
    };

    const getRecentProducts = () => {
        return [...products]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
    };

    const getStockStatus = () => {
        const lowStock = products.filter(p => p.stock < 20).length;
        const mediumStock = products.filter(p => p.stock >= 20 && p.stock < 100).length;
        const highStock = products.filter(p => p.stock >= 100).length;
        return [
            { name: 'Low Stock', value: lowStock, color: '#F43F5E' },
            { name: 'Medium Stock', value: mediumStock, color: '#F59E0B' },
            { name: 'High Stock', value: highStock, color: '#10B981' }
        ];
    };

    const categoryData = getCategoryData();
    const brandData = getBrandData();
    const recentProducts = getRecentProducts();
    const stockStatus = getStockStatus();

    const handleRefresh = () => fetchData();
    const handleTabChange = (event, newValue) => setTabValue(newValue);

    if (loading && !products.length) {
        return (
            <Box sx={{ p: 3 }}>
                <Skeleton variant="rectangular" width="100%" height={400} />
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item}>
                            <Skeleton variant="rectangular" width="100%" height={200} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" flexDirection="column">
                <Typography color="error" variant="h6" sx={{ mb: 2 }}>Error: {error}</Typography>
                <IconButton onClick={fetchData} color="primary">
                    <Refresh />
                    <Typography sx={{ ml: 1 }}>Retry</Typography>
                </IconButton>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #6366F1 30%, #8B5CF6 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Product Analytics
                </Typography>
                <Tooltip title="Refresh data">
                    <IconButton onClick={handleRefresh} color="primary" sx={{
                        backgroundColor: theme.palette.primary.light,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff'
                        }
                    }}>
                        <Refresh />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                        color: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'
                    }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Total Products</Typography>
                                    <Typography variant="h3" sx={{ mt: 1, fontWeight: 'bold' }}>
                                        {products.length.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Avatar sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    width: 48,
                                    height: 48
                                }}>
                                    <Inventory fontSize="medium" />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
                        color: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)'
                    }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Total Categories</Typography>
                                    <Typography variant="h3" sx={{ mt: 1, fontWeight: 'bold' }}>
                                        {categories.length.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Avatar sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    width: 48,
                                    height: 48
                                }}>
                                    <Category fontSize="medium" />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
                        color: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                    }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Total Brands</Typography>
                                    <Typography variant="h3" sx={{ mt: 1, fontWeight: 'bold' }}>
                                        {brands.length.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Avatar sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    width: 48,
                                    height: 48
                                }}>
                                    <BrandingWatermark fontSize="medium" />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 3,
                    '& .MuiTabs-indicator': {
                        height: 4,
                        borderRadius: '4px 4px 0 0'
                    }
                }}
            >
                <Tab label="Overview" icon={<ShowChart />} iconPosition="start" />
                <Tab label="Categories" icon={<Category />} iconPosition="start" />
                <Tab label="Brands" icon={<BrandingWatermark />} iconPosition="start" />
                <Tab label="Stock Analysis" icon={<Inventory />} iconPosition="start" />
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ mb: 4 }}>
                {tabValue === 0 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <BarChartIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="h6">Products by Category</Typography>
                                    </Box>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={categoryData.map(([name, data]) => ({ name, products: data.count }))}
                                            layout="vertical"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                            <XAxis type="number" />
                                            <YAxis dataKey="name" type="category" width={100} />
                                            <RechartsTooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: theme.shadows[3],
                                                    border: 'none'
                                                }}
                                            />
                                            <Bar
                                                dataKey="products"
                                                fill={theme.palette.primary.main}
                                                radius={[0, 4, 4, 0]}
                                                name="Products"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <PieChartIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="h6">Stock Status</Typography>
                                    </Box>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={stockStatus}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {stockStatus.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: theme.shadows[3],
                                                    border: 'none'
                                                }}
                                            />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2}>Recently Added Products</Typography>
                                    <Grid container spacing={2}>
                                        {recentProducts.map((product) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                                <Card sx={{
                                                    height: '100%',
                                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: theme.shadows[6]
                                                    }
                                                }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="160"
                                                        image={product.image}
                                                        alt={product.name}
                                                        sx={{
                                                            objectFit: 'contain',
                                                            p: 2,
                                                            backgroundColor: theme.palette.grey[50]
                                                        }}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                                                            {product.name}
                                                        </Typography>
                                                        <Box display="flex" alignItems="center" mb={1}>
                                                            <Star color="warning" fontSize="small" />
                                                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                                                                {product.ratings || 'No ratings'}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="h6" color="primary">
                                                            ₹{product.price?.toLocaleString()}
                                                        </Typography>
                                                        <Chip
                                                            label={`Stock: ${product.stock}`}
                                                            size="small"
                                                            color={product.stock > 100 ? 'success' : product.stock > 20 ? 'warning' : 'error'}
                                                            sx={{ mt: 1 }}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                {tabValue === 1 && (
                    <Box>
                        <Typography variant="h6" mb={2}>Categories Analysis (Top {categoryData.length})</Typography>
                        <Grid container spacing={3}>
                            {categoryData.map(([category, data]) => (
                                <Grid item xs={12} key={category}>
                                    <Card sx={{ borderRadius: 2 }}>
                                        <CardContent>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                    {category}
                                                </Typography>
                                                <Stack direction="row" spacing={1}>
                                                    <Chip
                                                        label={`${data.count} products`}
                                                        color="primary"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                    <Chip
                                                        label={`${data.totalStock} in stock`}
                                                        color="secondary"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                    <Chip
                                                        label={`₹${data.totalRevenue.toLocaleString()} value`}
                                                        color="success"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Stack>
                                            </Box>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography variant="subtitle1" gutterBottom>
                                                Top Products in {category}
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {data.topProducts.map(product => (
                                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                                        <Card sx={{
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            transition: 'transform 0.3s',
                                                            '&:hover': {
                                                                transform: 'scale(1.02)'
                                                            }
                                                        }}>
                                                            <CardMedia
                                                                component="img"
                                                                height="140"
                                                                image={product.image}
                                                                alt={product.name}
                                                                sx={{
                                                                    objectFit: 'contain',
                                                                    p: 1,
                                                                    backgroundColor: theme.palette.grey[50]
                                                                }}
                                                            />
                                                            <CardContent sx={{ flexGrow: 1 }}>
                                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                                    {product.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary" sx={{
                                                                    mb: 1,
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    {product.description}
                                                                </Typography>
                                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                                    <Typography variant="h6" color="primary">
                                                                        ₹{product.price?.toLocaleString()}
                                                                    </Typography>
                                                                    <Chip
                                                                        label={`Stock: ${product.stock}`}
                                                                        size="small"
                                                                        color={product.stock > 100 ? 'success' : 'warning'}
                                                                    />
                                                                </Box>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {tabValue === 2 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2}>Brand Distribution</Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={brandData.map(([name, data]) => ({ name, value: data.count }))}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={120}
                                                fill="#8884d8"
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {brandData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: theme.shadows[3],
                                                    border: 'none'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2}>Brand Value</Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart
                                            data={brandData.map(([name, data]) => ({
                                                name,
                                                value: data.totalValue / 1000
                                            }))}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <RechartsTooltip
                                                formatter={(value) => [`₹${(value * 1000).toLocaleString()}`, 'Value']}
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: theme.shadows[3],
                                                    border: 'none'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#6366F1"
                                                fill="#6366F1"
                                                fillOpacity={0.2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2}>Top Brands</Typography>
                                    <Grid container spacing={2}>
                                        {brandData.slice(0, 6).map(([brand, data], index) => (
                                            <Grid item xs={12} sm={6} md={4} key={brand}>
                                                <Card sx={{
                                                    height: '100%',
                                                    borderLeft: `4px solid ${COLORS[index % COLORS.length]}`,
                                                    transition: 'transform 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)'
                                                    }
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle1" gutterBottom>
                                                            {brand}
                                                        </Typography>
                                                        <Box display="flex" justifyContent="space-between">
                                                            <Typography variant="body2">
                                                                {data.count} products
                                                            </Typography>
                                                            <Typography variant="body2" color="primary">
                                                                ₹{(data.totalValue / 1000).toLocaleString()}K value
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                {tabValue === 3 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2}>Stock Overview</Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={[
                                                { name: 'Low Stock', value: stockStatus[0].value, color: '#F43F5E' },
                                                { name: 'Medium Stock', value: stockStatus[1].value, color: '#F59E0B' },
                                                { name: 'High Stock', value: stockStatus[2].value, color: '#10B981' }
                                            ]}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <RechartsTooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: theme.shadows[3],
                                                    border: 'none'
                                                }}
                                            />
                                            <Bar dataKey="value" name="Products">
                                                <Cell fill="#F43F5E" />
                                                <Cell fill="#F59E0B" />
                                                <Cell fill="#10B981" />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2}>Low Stock Products</Typography>
                                    <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                                        {products
                                            .filter(p => p.stock < 20)
                                            .sort((a, b) => a.stock - b.stock)
                                            .slice(0, 10)
                                            .map(product => (
                                                <Box
                                                    key={product.id}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        py: 2,
                                                        borderBottom: `1px solid ${theme.palette.divider}`
                                                    }}
                                                >
                                                    <Avatar
                                                        src={product.image}
                                                        variant="rounded"
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                            mr: 2,
                                                            backgroundColor: theme.palette.grey[100]
                                                        }}
                                                    />
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography variant="subtitle2">{product.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {product.category}
                                                        </Typography>
                                                    </Box>
                                                    <Chip
                                                        label={`Stock: ${product.stock}`}
                                                        color="error"
                                                        size="small"
                                                    />
                                                </Box>
                                            ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
}

export default Stocks;
