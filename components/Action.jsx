import React from 'react'

export default function Action() {
  return (
    <section id="signup" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to stop losing your stuff?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">Join thousands of happy users who have recovered their valuable items with TagTrace.</p>
            
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Start Your Free Trial Today</h3>
                <p className="text-gray-600 mb-6">No credit card required. 14-day free trial with all premium features.</p>
                <form className="space-y-4">
                    <div>
                        <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                        <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">Create Free Account</button>
                </form>
                <p className="text-gray-500 text-sm mt-4">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
        </div>
    </section>
  )
}
