import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
    if (newQuantity === 0) {
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - EliteStore</title>
          <meta name="description" content="Your shopping cart is currently empty. Browse our premium products and add items to your cart." />
        </Helmet>

        <div className="min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto" />
                <h1 className="text-3xl font-bold text-white">Your Cart is Empty</h1>
                <p className="text-xl text-gray-300">
                  Looks like you haven't added any items to your cart yet.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="btn-primary">
                    Start Shopping
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({items.length} items) - EliteStore</title>
        <meta name="description" content="Review your selected items and proceed to checkout. Secure shopping with fast delivery at EliteStore." />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/products" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Shopping <span className="gradient-text">Cart</span>
              </h1>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                >
                  Clear Cart
                </Button>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-32 md:h-32 flex-shrink-0">
                          <img 
                            className="w-full h-32 object-cover rounded-lg" 
                            alt={item.name}
                           src="https://images.unsplash.com/photo-1586678761373-60c055ec8266" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                              <p className="text-gray-400 text-sm">{item.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-blue-400">${item.price}</p>
                              {item.originalPrice && (
                                <p className="text-sm text-gray-400 line-through">${item.originalPrice}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center text-white font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-semibold text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id, item.name)}
                                className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="glass-effect border-white/10 sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className="text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between text-lg font-bold text-white">
                        <span>Total</span>
                        <span className="text-blue-400">${(getCartTotal() * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link to="/checkout" className="block">
                      <Button size="lg" className="w-full btn-primary">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link to="/products" className="block">
                      <Button variant="outline" size="lg" className="w-full border-white/20 text-white hover:bg-white/10">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center text-sm text-gray-400">
                    <p>🔒 Secure checkout with SSL encryption</p>
                    <p>📦 Free shipping on orders over $50</p>
                    <p>↩️ 30-day return policy</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;