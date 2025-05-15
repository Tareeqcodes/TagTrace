import { FaStar } from 'react-icons/fa';


export default function Tesmonials() {
  return (
     <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                       <div className="flex text-yellow-500">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                             </div>
                    </div>
                    <p className="text-gray-600 mb-6">"I lost my laptop at the airport and got it back the next day thanks to TagTrace! The person who found it scanned the QR code and contacted me right away."</p>
                    <div className="flex items-center">
                        <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                            <span className="font-bold">JM</span>
                        </div>
                        <div>
                            <h4 className="font-semibold">James Miller</h4>
                            <p className="text-gray-500 text-sm">Software Engineer</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <div className="text-yellow-400 flex">
                            <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">"As a mother of three kids who constantly lose things, TagTrace has been a game-changer. I've labeled everything from lunchboxes to jackets and we've had multiple items returned!"</p>
                    <div className="flex items-center">
                        <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                            <span className="font-bold">SP</span>
                        </div>
                        <div>
                            <h4 className="font-semibold">Sarah Peterson</h4>
                            <p className="text-gray-500 text-sm">Parent & Teacher</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <div className="text-yellow-400 flex">
                            <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">"We use TagTrace for all our company equipment. It's saved us thousands in replacement costs and the dashboard makes it easy to manage everything."</p>
                    <div className="flex items-center">
                        <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                            <span className="font-bold">MJ</span>
                        </div>
                        <div>
                            <h4 className="font-semibold">Michael Johnson</h4>
                            <p className="text-gray-500 text-sm">IT Manager</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
