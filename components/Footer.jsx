import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiTag, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-2 rounded-lg mr-3">
                <span className='text-white text-xl font-bold'>TT</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tagtrace
              </h3>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              The smart way to protect your belongings and get them back if lost. 
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center">
                <FiMail className="mr-3 text-blue-400" />
                <span>support@tagtrace.com</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="mr-3 text-blue-400" />
                <span>+234 9124498160</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-3 text-blue-400" />
                <span>Kano, NG</span>
              </div>
            </div>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal & Support</h4>
            <nav className="space-y-3">
              <Link 
                href="/privacy"
                target="_blank"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                target="_blank"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Social Media Links */}
           <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="group bg-gray-700 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="group bg-gray-700 hover:bg-blue-400 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="group bg-gray-700 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="group bg-gray-700 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} className="text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container justify-center text-center mx-auto py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} Tagtrace. All rights reserved.</p>
          </div>
        </div>
      </div>

        
    </footer>
  );
}