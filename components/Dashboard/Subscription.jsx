'use client'
import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  Check, 
  X, 
  Download, 
  AlertTriangle,
  Crown,
  Star,
  Zap,
  Shield,
} from 'lucide-react';

const Subscription = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Mock data - replace with real data from your API
  const subscriptionData = {
    plan: 'Personal',
    status: 'active',
    price: 20,
    billingPeriod: 'monthly',
    renewalDate: '2025-06-22',
    itemLimit: 100,
    trialEndsAt: null,
    paymentMethod: '**** **** **** 4242'
  };

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
       features: [
        'Up to 3 tagged items',
        'Basic QR code generator', 
        'Email notifications only',
        'Standard scan tracking',
        'Basic dashboard access'
      ],
      icon: Shield,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      name: 'Premium',
      price: 20,
      period: 'Year',
      features: [
        'Unlimited tagged items',
        'Trace Studio Pro access',
        'Custom QR code designs & themes',
        'SMS + Email notifications',
        'Advanced analytics & reports',
        'Priority customer support',
        'Bulk QR code generation',
        'Lost item recovery assistance'
      ],
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      popular: true
    },
  ];

  const invoices = [
    { id: 'INV-001', date: '2025-05-22', amount: 9.99, status: 'paid', plan: 'Personal' },
    { id: 'INV-002', date: '2025-04-22', amount: 9.99, status: 'paid', plan: 'Personal' },
    { id: 'INV-003', date: '2025-03-22', amount: 9.99, status: 'paid', plan: 'Personal' },
    { id: 'INV-004', date: '2025-02-22', amount: 9.99, status: 'paid', plan: 'Personal' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      trial: 'bg-blue-100 text-blue-800',
      past_due: 'bg-yellow-100 text-yellow-800'
    };
    
    return badges[status] || 'bg-gray-100 text-gray-800';
  };


  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Current Subscription Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Current Subscription</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(subscriptionData.status)}`}>
            {subscriptionData.status.charAt(0).toUpperCase() + subscriptionData.status.slice(1)}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                <Star className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{subscriptionData.plan} Plan</h3>
                <p className="text-gray-600">
                  ${subscriptionData.price}/{subscriptionData.billingPeriod}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="text-gray-400 mr-3" size={16} />
                <span className="text-sm text-gray-600">
                  Next billing: {formatDate(subscriptionData.renewalDate)}
                </span>
              </div>
              <div className="flex items-center">
                <Zap className="text-gray-400 mr-3" size={16} />
                <span className="text-sm text-gray-600">
                  {subscriptionData.itemLimit} items included
                </span>
              </div>
              <div className="flex items-center">
                <CreditCard className="text-gray-400 mr-3" size={16} />
                <span className="text-sm text-gray-600">
                  Payment method: {subscriptionData.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Change Plan
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Update Payment Method
            </button>
            <button 
              onClick={() => setShowCancelModal(true)}
              className="w-full text-red-600 py-2 px-4 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Billing History</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{invoice.id}</td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(invoice.date)}</td>
                  <td className="py-3 px-4 text-gray-600">{invoice.plan}</td>
                  <td className="py-3 px-4 font-medium">${invoice.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.name} className={`border rounded-lg p-6 relative $`}>
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className={`w-12 h-12 rounded-lg ${plan.bgColor} flex items-center justify-center mb-4`}>
                  <IconComponent className={plan.color} size={24} />
                </div>
                <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                <p className="text-3xl font-bold mb-1">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.name && (
                  <div className="bg-blue-100 text-blue-800 text-sm py-2 px-3 rounded-lg text-center font-medium">
                    Current Plan
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Subscription;