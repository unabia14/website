import React, { createContext, useContext, useState, useEffect } from 'react';

const EmailContext = createContext();

const emailTemplates = [
  {
    id: 1,
    subject: "🎉 Welcome to Our Amazing Store!",
    content: "Welcome to our family! We're thrilled to have you join us. Get ready for exclusive deals, new product launches, and insider tips!",
    delay: 0, // Immediate
    type: "welcome"
  },
  {
    id: 2,
    subject: "🛍️ Here's Your Exclusive 15% Off Code!",
    content: "Thanks for signing up! Use code WELCOME15 for 15% off your first purchase. Valid for the next 7 days!",
    delay: 1, // 1 day
    type: "discount"
  },
  {
    id: 3,
    subject: "✨ Discover Our Best-Selling Products",
    content: "Check out what everyone's talking about! Our top-rated products are flying off the shelves. Don't miss out!",
    delay: 3, // 3 days
    type: "product_showcase"
  },
  {
    id: 4,
    subject: "💡 Pro Tips: Getting the Most Out of Your Purchase",
    content: "Here are some insider tips to maximize your experience with our products. Plus, see what other customers are saying!",
    delay: 5, // 5 days
    type: "tips"
  },
  {
    id: 5,
    subject: "🔥 Flash Sale Alert - 24 Hours Only!",
    content: "URGENT: Our biggest sale of the month is happening NOW! Up to 50% off selected items. Sale ends in 24 hours!",
    delay: 7, // 1 week
    type: "flash_sale"
  },
  {
    id: 6,
    subject: "📦 Don't Forget - Your Cart is Waiting!",
    content: "You left some amazing items in your cart! Complete your purchase now and get free shipping on orders over $50.",
    delay: 10, // 10 days
    type: "cart_reminder"
  },
  {
    id: 7,
    subject: "🌟 Customer Spotlight & Success Stories",
    content: "See how other customers are loving their purchases! Read real reviews and get inspired by their stories.",
    delay: 14, // 2 weeks
    type: "social_proof"
  },
  {
    id: 8,
    subject: "🎁 Surprise! Here's Something Special for You",
    content: "We appreciate your loyalty! Here's an exclusive gift just for being an awesome customer. No purchase necessary!",
    delay: 21, // 3 weeks
    type: "loyalty_gift"
  },
  {
    id: 9,
    subject: "📈 Your Personalized Product Recommendations",
    content: "Based on your interests, we think you'll love these handpicked products. Curated just for you!",
    delay: 28, // 4 weeks
    type: "recommendations"
  },
  {
    id: 10,
    subject: "💎 VIP Access: Be the First to Know!",
    content: "Congratulations! You're now part of our VIP community. Get early access to new products and exclusive member-only deals!",
    delay: 35, // 5 weeks
    type: "vip_access"
  }
];

export const EmailProvider = ({ children }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [emailSequences, setEmailSequences] = useState([]);

  useEffect(() => {
    const savedSubscribers = localStorage.getItem('email_subscribers');
    const savedSequences = localStorage.getItem('email_sequences');
    
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers));
    }
    
    if (savedSequences) {
      setEmailSequences(JSON.parse(savedSequences));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('email_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('email_sequences', JSON.stringify(emailSequences));
  }, [emailSequences]);

  const addSubscriber = (email, name = '') => {
    const newSubscriber = {
      id: Date.now(),
      email,
      name,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };

    setSubscribers(prev => [...prev, newSubscriber]);
    
    // Create email sequence for new subscriber
    const sequence = emailTemplates.map(template => ({
      id: `${newSubscriber.id}_${template.id}`,
      subscriberId: newSubscriber.id,
      templateId: template.id,
      subject: template.subject,
      content: template.content,
      scheduledFor: new Date(Date.now() + template.delay * 24 * 60 * 60 * 1000).toISOString(),
      status: 'scheduled',
      type: template.type
    }));

    setEmailSequences(prev => [...prev, ...sequence]);
    
    return newSubscriber;
  };

  const getSubscriberEmails = (subscriberId) => {
    return emailSequences.filter(email => email.subscriberId === subscriberId);
  };

  const markEmailAsSent = (emailId) => {
    setEmailSequences(prev => 
      prev.map(email => 
        email.id === emailId 
          ? { ...email, status: 'sent', sentAt: new Date().toISOString() }
          : email
      )
    );
  };

  const getEmailStats = () => {
    const totalSubscribers = subscribers.length;
    const totalEmails = emailSequences.length;
    const sentEmails = emailSequences.filter(email => email.status === 'sent').length;
    const scheduledEmails = emailSequences.filter(email => email.status === 'scheduled').length;
    
    return {
      totalSubscribers,
      totalEmails,
      sentEmails,
      scheduledEmails
    };
  };

  return (
    <EmailContext.Provider value={{
      subscribers,
      emailSequences,
      emailTemplates,
      addSubscriber,
      getSubscriberEmails,
      markEmailAsSent,
      getEmailStats
    }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};