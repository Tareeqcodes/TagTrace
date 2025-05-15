import React from 'react'

export default function How() {
  return (
     <section id="how-it-works" className="bg-gray-100 py-15">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How TagTrace Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-3">Register Your Items</h3>
                    <p className="text-gray-600">Add your items to your dashboard with descriptions, photos, and set a reward amount if you wish.</p>
                </div>
                <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-3">Generate QR Codes</h3>
                    <p className="text-gray-600">Create unique QR codes for each item that link to your secure lost item page.</p>
                </div>
                <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-3">Apply to Your Items</h3>
                    <p className="text-gray-600">Print and attach the QR codes to your valuables using our durable stickers or tags.</p>
                </div>
                <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                    <h3 className="text-xl font-semibold mb-3">Get Items Returned</h3>
                    <p className="text-gray-600">When someone finds your item, they scan the QR code and contact you securely through our platform.</p>
                </div>
            </div>
            <div className="mt-16 text-center" id="demo">
                <h3 className="text-2xl font-semibold mb-6">See It In Action</h3>
                <div className="video-container bg-gray-800 shadow-2xl">
                    <video controls className="mx-auto">
                        <source src="/2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    </section>
  )
}
