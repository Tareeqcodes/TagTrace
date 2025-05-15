'use client'
import { User } from 'lucide-react';

export default function Message() {
    const messages = [
    { from: "Anonymous Finder", regarding: "Backpack", preview: "Hello, I found your backpack at...", time: "Yesterday", unread: true },
    { from: "John Doe", regarding: "MacBook Pro", preview: "I think I might have seen your...", time: "May 13", unread: false },
    { from: "Support Team", regarding: "Account", preview: "Thank you for registering with TagTrace...", time: "May 10", unread: false }
  ];
  
    return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Messages & Return Requests</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              {messages.map((message, idx) => (
                <div key={idx} className={`p-4 border-b border-gray-100 last:border-0 flex cursor-pointer hover:bg-gray-50 ${message.unread ? 'bg-blue-50' : ''}`}>
                  <div className="mr-4 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium">{message.from}</h3>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">Re: {message.regarding}</div>
                    <div className="text-sm text-gray-500 truncate">{message.preview}</div>
                  </div>
                  {message.unread && <div className="ml-2 w-2 h-2 rounded-full bg-blue-500 self-center"></div>}
                </div>
              ))}
            </div>
          </div>
        );
}
