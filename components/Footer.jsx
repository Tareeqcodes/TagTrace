import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiTag } from 'react-icons/fi'


export default function Footer() {
  return (
    <footer className="bg-gray-800 hidden md:block text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-sm">
            <div className="flex items-center mb-3">
              <FiTag className="text-blue-400 text-md mr-2" />
              <h3 className="text-sm font-bold text-white">Tagtrace</h3>
            </div>
            <p className="text-gray-400 text-sm">The smart way to protect your belongings and get them back if lost.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:items-center">
            <div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</a></li>
              </ul>
            </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition p-2 bg-gray-700 rounded-full">
                  <FaFacebookF size={16} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition p-2 bg-gray-700 rounded-full">
                  <FaTwitter size={16} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition p-2 bg-gray-700 rounded-full">
                  <FaInstagram size={16} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition p-2 bg-gray-700 rounded-full">
                  <FaLinkedinIn size={16} />
                </a>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
}