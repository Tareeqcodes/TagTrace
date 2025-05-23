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
  Clock,
  FileText
} from 'lucide-react';

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState('Personal');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Mock data - replace with real data from your API
  const subscriptionData = {
    plan: 'Personal',
    status: 'active',
    price: 9.99,
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
      itemLimit: 10,
      features: ['10 Items', 'Basic QR Codes', 'Standard Support'],
      icon: Shield,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      name: 'Personal',
      price: 9.99,
      period: 'month',
      itemLimit: 100,
      features: ['100 Items', 'Advanced QR Codes', 'Priority Support', 'Analytics'],
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      popular: true
    },
    {
      name: 'Premium',
      price: 19.99,
      period: 'month',
      itemLimit: 1000,
      features: ['1000 Items', 'Custom Branding', '24/7 Support', 'Advanced Analytics', 'API Access'],
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
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

  const CancelModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <AlertTriangle className="text-red-500 mr-3" size={24} />
          <h3 className="text-lg font-semibold">Cancel Subscription</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
        </p>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCancelModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Keep Subscription
          </button>
          <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Choose Your Plan</h3>
          <button onClick={() => setShowUpgradeModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.name} className={`border rounded-lg p-4 relative ${plan.popular ? 'border-blue-500' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
                  </div>
                )}
                <div className={`w-10 h-10 rounded-lg ${plan.bgColor} flex items-center justify-center mb-3`}>
                  <IconComponent className={plan.color} size={20} />
                </div>
                <h4 className="font-semibold mb-2">{plan.name}</h4>
                <p className="text-2xl font-bold mb-1">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">{plan.itemLimit} items included</p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="text-green-500 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-2 px-4 rounded-lg ${
                    currentPlan === plan.name 
                      ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={currentPlan === plan.name}
                >
                  {currentPlan === plan.name ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

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

      {/* Usage Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Items Created</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-2">
                <FileText size={20} />
              </div>
            </div>
            <div className="mt-2">
              <div className="bg-white bg-opacity-20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{width: '23%'}}></div>
              </div>
              <p className="text-xs text-blue-100 mt-1">23 of {subscriptionData.itemLimit} used</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">QR Scans</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-2">
                <Zap size={20} />
              </div>
            </div>
            <p className="text-xs text-green-100 mt-3">+12% from last month</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Days Left</p>
                <p className="text-2xl font-bold">31</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-2">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-xs text-purple-100 mt-3">Until next billing</p>
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
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.name} className={`border rounded-lg p-6 relative ${currentPlan === plan.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
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
                <p className="text-gray-600 mb-4">{plan.itemLimit} items included</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {currentPlan === plan.name && (
                  <div className="bg-blue-100 text-blue-800 text-sm py-2 px-3 rounded-lg text-center font-medium">
                    Current Plan
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showCancelModal && <CancelModal />}
      {showUpgradeModal && <UpgradeModal />}
    </div>
  );
};

export default Subscription;