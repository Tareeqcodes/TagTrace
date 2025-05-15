import { FaQrcode, FaShieldAlt, FaGift, FaTachometerAlt, FaBell, FaPrint  } from 'react-icons/fa';


export default function Features() {
  return (
     <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
                    <p className="text-gray-600">of lost items with TagTrace codes get returned to their owners</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
                    <p className="text-gray-600">happy users protecting their valuables</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-4xl font-bold text-blue-600 mb-2">$250k+</div>
                    <p className="text-gray-600">worth of items recovered by our community</p>
                </div>
            </div>
        </div>
        <div className="py-20">
             <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Why Choose TagTrace?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <FaQrcode />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Custom QR Codes</h3>
                    <p className="text-gray-600">Generate unique QR codes for each of your items that link to your contact details and reward information.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <FaShieldAlt />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Privacy Protection</h3>
                    <p className="text-gray-600">Share only the information you want. Your personal details are never exposed directly on the QR code.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <FaGift />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Custom Rewards</h3>
                    <p className="text-gray-600">Set custom rewards for each item to incentivize returns. Motivate finders to return your belongings.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <FaTachometerAlt />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Easy Dashboard</h3>
                    <p className="text-gray-600">Manage all your registered items in one place. Update item details and rewards at any time.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <FaBell />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Instant Notifications</h3>
                    <p className="text-gray-600">Get notified immediately when someone scans your QR code so you know your item has been found.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <FaPrint />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Durable Labels</h3>
                    <p className="text-gray-600">Print your QR codes on waterproof, durable labels that stick to almost any surface and last for years.</p>
                </div>
            </div>
        </div>
        </div>
    </section>
  )
}
