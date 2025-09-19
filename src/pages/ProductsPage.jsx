import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Products - EliteStore | Premium Quality Products</title>
        <meta name="description" content="Browse our extensive collection of premium products. From electronics to beauty, find everything you need at EliteStore with fast shipping and great prices." />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-gray-300">
              Discover our curated collection of premium products
            </p>
          </motion.div>

          {/* Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "btn-primary" : "border-white/20 text-white hover:bg-white/10"}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-800 border border-white/20 rounded-md px-3 py-2 text-white text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? "btn-primary" : "border-white/20 text-white hover:bg-white/10"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? "btn-primary" : "border-white/20 text-white hover:bg-white/10"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Products Grid/List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
            }
          >
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                {viewMode === 'grid' ? (
                  <Link to={`/product/${product.id}`}>
                    <Card className="glass-effect border-white/10 product-card overflow-hidden group h-full">
                      <div className="relative">
                        <img 
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                          alt={product.name}
                         src="https://images.unsplash.com/photo-1632065509860-4fbcfc89ed7c" />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500">
                            {product.badge}
                          </Badge>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                            {product.description}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-blue-400">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-300">{product.rating}</span>
                            </div>
                          </div>
                          <Button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={!product.inStock}
                            className="w-full btn-primary"
                            size="sm"
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Link to={`/product/${product.id}`}>
                    <Card className="glass-effect border-white/10 hover:border-blue-400/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative md:w-48 md:h-32 flex-shrink-0">
                            <img 
                              className="w-full h-32 md:h-full object-cover rounded-lg" 
                              alt={product.name}
                             src="https://images.unsplash.com/photo-1632065509860-4fbcfc89ed7c" />
                            {product.badge && (
                              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-blue-400">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-400">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-300">{product.rating}</span>
                                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                              </div>
                              <Button
                                onClick={(e) => handleAddToCart(product, e)}
                                disabled={!product.inStock}
                                className="btn-primary"
                                size="sm"
                              >
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          {filteredAndSortedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-400">No products found in this category.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;