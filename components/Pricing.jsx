import { FaCheck } from 'react-icons/fa';


export default function Pricing() {
  return (
     <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing Plans</h2>
            <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">Choose the plan that fits your needs. All plans include our core features with no hidden fees.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 items-center px-2 md:px-10 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-105">
                    <div className="p-8 border-b border-gray-200">
                        <h3 className="text-xl font-bold mb-2">Basic</h3>
                        <div className="text-4xl font-bold mb-4">$2<span className="text-lg text-gray-500">/month</span></div>
                        <p className="text-gray-600">Perfect for individuals with a few important items.</p>
                    </div>
                    <div className="p-8">
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Up to 5 items</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Basic QR code design</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Email notifications</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Web dashboard</span>
                            </li>
                        </ul>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 mt-8 font-medium">Choose Basic</button>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-blue-500 transform transition-transform duration-300 hover:scale-105 -mt-4">
                    <div className="bg-blue-500 text-white py-2 text-center text-sm font-medium">
                        MOST POPULAR
                    </div>
                    <div className="p-8 border-b border-gray-200">
                        <h3 className="text-xl font-bold mb-2">Premium</h3>
                        <div className="text-4xl font-bold mb-4">$5<span className="text-lg text-gray-500">/Year</span></div>
                        <p className="text-gray-600">Great for families or people with many valuables.</p>
                    </div>
                    <div className="p-8">
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Up to 20 items</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Custom QR designs</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>SMS + Email notifications</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>10 free premium stickers</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Unlimited items</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Branded QR codes</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheck className="text-green-500 mr-2" />
                                <span>Team accounts</span>
                            </li>
                        </ul>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 mt-8 font-medium">Choose Premium</button>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}
