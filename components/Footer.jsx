import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaQrcode } from 'react-icons/fa';


export default function Footer() {
  return (
    <section className='bg-gray-800 text-white py-12'>
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                        <FaQrcode className="text-blue-400 text-2xl mr-2" />
                        <h3 className="text-2xl font-bold text-white">TagTrace</h3>
                    </div>
                    <p className="text-gray-400">The smart way to protect your belongings and get them back if lost.</p>
                    <div className="flex space-x-4 mt-6">
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaInstagram />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                    </ul>
                </div>
                </div>
                </div>
              
    </section>
  )
}
