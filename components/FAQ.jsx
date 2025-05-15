import React from 'react'

export default function FAQ() {
  return (
     <section className="py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">How do the QR codes work?</h3>
                    <p className="text-gray-600">When someone scans your QR code with their smartphone, they'll be directed to a page with the information you've chosen to share and instructions on how to contact you or claim the reward.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Is my personal information safe?</h3>
                    <p className="text-gray-600">Absolutely. Your contact information is never directly visible on the QR code. We use a secure messaging system that allows people to contact you without seeing your personal details until you choose to share them.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Do I have to offer a reward?</h3>
                    <p className="text-gray-600">No, rewards are optional. However, offering even a small reward significantly increases the chances that your item will be returned to you.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">How do I attach the QR codes to my items?</h3>
                    <p className="text-gray-600">You can print the QR codes yourself on adhesive paper, or order our premium waterproof, durable stickers and tags that can be attached to various surfaces and materials.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Can I use this for my business equipment?</h3>
                    <p className="text-gray-600">Yes! Our Business plan is designed specifically for companies that want to protect their equipment and assets. You can manage multiple items and have team members access the dashboard.</p>
                </div>
            </div>
        </div>
    </section>
  )
}
