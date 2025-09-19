import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { EmailProvider } from '@/contexts/EmailContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import SignupPage from '@/pages/SignupPage';
import EmailDashboard from '@/pages/EmailDashboard';

function App() {
  return (
    <Router>
      <EmailProvider>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
            <Header />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/email-dashboard" element={<EmailDashboard />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </CartProvider>
      </EmailProvider>
    </Router>
  );
}

export default App;