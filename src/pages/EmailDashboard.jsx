import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Users, 
  Calendar, 
  Send, 
  Clock, 
  CheckCircle,
  Eye,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEmail } from '@/contexts/EmailContext';
import { toast } from '@/components/ui/use-toast';

const EmailDashboard = () => {
  const { 
    subscribers, 
    emailSequences, 
    emailTemplates, 
    getEmailStats, 
    markEmailAsSent 
  } = useEmail();
  
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  
  const stats = getEmailStats();

  const filteredEmails = emailSequences.filter(email => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'scheduled') return email.status === 'scheduled';
    if (selectedFilter === 'sent') return email.status === 'sent';
    return true;
  });

  const handleSendEmail = (emailId) => {
    markEmailAsSent(emailId);
    toast({
      title: "Email sent!",
      description: "The email has been marked as sent successfully.",
    });
  };

  const handlePreviewEmail = (email) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getEmailTypeColor = (type) => {
    const colors = {
      welcome: 'bg-green-500/20 text-green-400',
      discount: 'bg-blue-500/20 text-blue-400',
      product_showcase: 'bg-purple-500/20 text-purple-400',
      tips: 'bg-yellow-500/20 text-yellow-400',
      flash_sale: 'bg-red-500/20 text-red-400',
      cart_reminder: 'bg-orange-500/20 text-orange-400',
      social_proof: 'bg-pink-500/20 text-pink-400',
      loyalty_gift: 'bg-indigo-500/20 text-indigo-400',
      recommendations: 'bg-teal-500/20 text-teal-400',
      vip_access: 'bg-violet-500/20 text-violet-400'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Email Dashboard - EliteStore | Automated Email Management</title>
        <meta name="description" content="Manage your automated email sequences, track subscriber engagement, and monitor email campaign performance with EliteStore's email dashboard." />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  Email <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Manage your automated email sequences and subscriber engagement
                </p>
              </div>
              <Link to="/signup">
                <Button className="btn-primary">
                  <Users className="h-4 w-4 mr-2" />
                  Add Subscribers
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="glass-effect border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Subscribers</p>
                    <p className="text-2xl font-bold text-white">{stats.totalSubscribers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Emails</p>
                    <p className="text-2xl font-bold text-white">{stats.totalEmails}</p>
                  </div>
                  <Mail className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Emails Sent</p>
                    <p className="text-2xl font-bold text-white">{stats.sentEmails}</p>
                  </div>
                  <Send className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Scheduled</p>
                    <p className="text-2xl font-bold text-white">{stats.scheduledEmails}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Email Sequences */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Email Sequences
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <select
                          value={selectedFilter}
                          onChange={(e) => setSelectedFilter(e.target.value)}
                          className="bg-slate-800 border border-white/20 rounded-md px-3 py-1 text-white text-sm"
                        >
                          <option value="all">All Emails</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="sent">Sent</option>
                        </select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredEmails.length === 0 ? (
                      <div className="text-center py-8">
                        <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No emails found</p>
                        <p className="text-sm text-gray-500">Sign up some subscribers to see email sequences</p>
                      </div>
                    ) : (
                      filteredEmails.map((email, index) => (
                        <motion.div
                          key={email.id}
                          initial={{ opacity: 0, y:20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="border-b border-white/10 pb-4 last:border-b-0"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center space-x-2">
                                <Badge className={getEmailTypeColor(email.type)}>{email.type.replace('_', ' ')}</Badge>
                                <p className="font-semibold text-white">{email.subject}</p>
                              </div>
                              <p className="text-sm text-gray-400">
                                To: {subscribers.find(s => s.id === email.subscriberId)?.email || 'N/A'}
                              </p>
                            </div>
                            <div className="flex-shrink-0 space-y-1 text-left md:text-right">
                              {email.status === 'scheduled' ? (
                                <div className="flex items-center space-x-2 text-yellow-400">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-sm">Scheduled: {formatDate(email.scheduledFor)}</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2 text-green-400">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-sm">Sent: {formatDate(email.sentAt)}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePreviewEmail(email)}
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <Eye className="h-4 w-4 mr-1" /> Preview
                              </Button>
                              {email.status === 'scheduled' && (
                                <Button
                                  size="sm"
                                  onClick={() => handleSendEmail(email.id)}
                                  className="btn-primary"
                                >
                                  <Send className="h-4 w-4 mr-1" /> Send Now
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Subscribers List */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass-effect border-white/10 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Subscribers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {subscribers.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No subscribers yet</p>
                        <p className="text-sm text-gray-500">New signups will appear here</p>
                      </div>
                    ) : (
                      subscribers.map((subscriber, index) => (
                        <motion.div
                          key={subscriber.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-white">{subscriber.name || 'Anonymous'}</p>
                            <p className="text-sm text-gray-400">{subscriber.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Subscribed:</p>
                            <p className="text-xs text-gray-400">{formatDate(subscriber.subscribedAt)}</p>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailDashboard;
