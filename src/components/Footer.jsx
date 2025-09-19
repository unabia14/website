import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-slate-900/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold gradient-text">EliteStore</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premium destination for quality products and exceptional shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Quick Links</span>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Products
              </Link>
              <Link to="/signup" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Sign Up
              </Link>
              <Link to="/email-dashboard" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Email Dashboard
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Customer Service</span>
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400 text-sm">Help Center</span>
              <span className="text-gray-400 text-sm">Returns & Exchanges</span>
              <span className="text-gray-400 text-sm">Shipping Info</span>
              <span className="text-gray-400 text-sm">Size Guide</span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Contact Us</span>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@elitestore.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123 Commerce St, City, State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 EliteStore. All rights reserved. Built with ❤️ by Angel.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;