'use client'
import { useState, useEffect } from "react";
import { databases, Query, ID } from "@/config/appwrite";
import { useAuth } from "@/context/Authcontext";
import { motion, AnimatePresence } from "framer-motion";

const db = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
const cll = process.env.NEXT_PUBLIC_APPWRITE_USERS_ID

export default function Setting() {
  const { user } =useAuth();
   const [docId, setDocId] = useState(null)
    const [success, setSuccess] = useState("");
     const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    userId: "",
  })

  useEffect( () => {
    if (!user || !user.email) return;
    const fetchData = async () => {
      try {
        
         const response = await databases.listDocuments(
          db,
          cll,
          [Query.equal("userId", user.$id)]
         )
        if( response.total > 0 ){
          const doc = response.documents[0]
          setDocId(doc.$id)
          setFormData({
            name: doc.name || "",
            email: doc.email || "",
            phone: doc.phone || "",
            userId: doc.userId || "",
          })
        } else{
          setFormData({
            ...formData,
            email: user.email,
            name: user.name,
            userId: user.$id,
          })
        }
      } catch (err) {
        console.error("Error fetching user data", err)
        setError('Error occurs while fetching data')
      }
    }
    fetchData();
  },[user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSave = async () => {

    setError("");
    setSuccess("");
    setLoading(true);
    
    const payload = {
      ...formData,
      userId: user.$id,
    }
      if (!formData.phone) {
      setError("Please enter your phone number");
      setLoading(false);
      return;
    }
    try {
      if (docId) {
        await databases.updateDocument(db, cll, docId, payload)
      } else {
        await databases.createDocument(db, cll, ID.unique(), payload)
      }
     setSuccess("Saved successfully")
    } catch (err) {
      console.error("Error saving user data", err)
      setError("Something went wrong while saving")
    }
  }
    
   return (
          <div>
            <h1 className="text-2xl p-5 font-bold mb-3">Settings</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-5 p-6">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                     className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" 
                     name="email"
                     value={user.email}
                     readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg" />
                     <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" 
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    className="w-full p-2 border border-gray-300 rounded-lg"/>
                  </div>
                   <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-green-50 text-green-600 rounded-lg text-sm"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>
                  <div className="mt-6">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">Save Changes</button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails when your items are scanned</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-email" className="sr-only" checked readOnly />
                        <label htmlFor="toggle-email" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive text messages for urgent alerts</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-sms" className="sr-only" readOnly />
                        <label htmlFor="toggle-sms" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transition-transform"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Anonymous Contact Form</p>
                        <p className="text-sm text-gray-500">Allow finders to contact you anonymously</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-anon" className="sr-only" checked readOnly />
                        <label htmlFor="toggle-anon" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Updates</p>
                        <p className="text-sm text-gray-500">Receive product news and updates</p>
                      </div> 
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-updates" className="sr-only" readOnly />
                        <label htmlFor="toggle-updates" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transition-transform"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
}
