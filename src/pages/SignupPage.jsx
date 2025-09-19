import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, User, ArrowLeft, Check, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEmail } from '@/contexts/EmailContext';
import { toast } from '@/components/ui/use-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addSubscriber } = useEmail();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      addSubscriber(formData.email, formData.name);
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Welcome to EliteStore! 🎉",
        description: "You've successfully signed up for our newsletter. Check your email for exclusive offers!",
      });
    }, 1000);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Discounts",
      description: "Get 15% off your first order and access to member-only sales"
    },
    {
      icon: Mail,
      title: "Early Access",
      description: "Be the first to know about new products and limited releases"
    },
    {
      icon: User,
      title: "Personalized Recommendations",
      description: "Receive curated product suggestions based on your preferences"
    }
  ];

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Welcome to EliteStore! - Newsletter Signup Success</title>
          <meta name="description" content="Thank you for joining EliteStore! You'll receive exclusive offers, early access to new products, and personalized recommendations." />
        </Helmet>

        <div className="min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  Welcome to <span className="gradient-text">EliteStore</span>!
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Thank you for joining our community! You'll start receiving our automated email sequence with exclusive offers, product updates, and insider tips.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-white/10 h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                        <p className="text-gray-400 text-sm">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="btn-primary">
                    Start Shopping
                  </Button>
                </Link>
                <Link to="/email-dashboard">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    View Email Dashboard
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
        <title>Join Our Newsletter - EliteStore | Exclusive Offers & Updates</title>
        <meta name="description" content="Sign up for EliteStore newsletter and get exclusive discounts, early access to new products, and personalized recommendations delivered to your inbox." />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="text-center space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Join Our <span className="gradient-text">Newsletter</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get exclusive access to deals, new products, and insider tips delivered straight to your inbox
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl text-white text-center">
                    Start Your Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-white/20 text-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-white/20 text-white"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary text-lg py-6"
                    >
                      {isSubmitting ? (
                        <>Signing Up...</>
                      ) : (
                        <>
                          <Mail className="h-5 w-5 mr-2" />
                          Join Newsletter & Get 15% Off
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-gray-400 text-center">
                      By signing up, you agree to receive marketing emails from EliteStore. 
                      You can unsubscribe at any time.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">
                  What You'll Get
                </h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">
                  🎯 Automated Email Sequence
                </h3>
                <p className="text-gray-300 mb-4">
                  Once you sign up, you'll receive a carefully crafted 10-email sequence over 5 weeks, including:
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Welcome message with instant 15% discount</li>
                  <li>• Product showcases and recommendations</li>
                  <li>• Exclusive flash sales and member-only deals</li>
                  <li>• Tips and guides for getting the most from your purchases</li>
                  <li>• VIP access to new product launches</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;