'use client'
import { useState } from 'react';
import { Send, ArrowLeft, User, Package, CheckCheck } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    from: 'John Doe',
    regarding: 'Blue Water Bottle',
    preview: 'Sure! I left it with the barista. Just mention my name - John.',
    time: '1/20/2024',
    unread: false,
    status: 'active'
  },
  {
    id: 2,
    from: 'Mike Johnson',
    regarding: 'Black Backpack',
    preview: 'I found your backpack at the gym. When can you pick it up?',
    time: '1/19/2024',
    unread: true,
    status: 'active'
  },
  {
    id: 3,
    from: 'Lisa Chen',
    regarding: 'iPhone 13',
    preview: 'Your phone is at the lost and found desk.',
    time: '1/18/2024',
    unread: false,
    status: 'resolved'
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 'user123',
    senderName: 'John Doe',
    message: 'Hi! I found your water bottle at the coffee shop on 5th street.',
    timestamp: '2024-01-20T10:30:00Z',
    isOwner: false,
    read: true
  },
  {
    id: 2,
    senderId: 'owner456',
    senderName: 'You',
    message: 'Thank you so much! I was looking everywhere for it. Can I pick it up from there?',
    timestamp: '2024-01-20T10:35:00Z',
    isOwner: true,
    read: true
  },
  {
    id: 3,
    senderId: 'user123',
    senderName: 'John Doe',
    message: 'Sure! I left it with the barista. Just mention my name - John.',
    timestamp: '2024-01-20T10:40:00Z',
    isOwner: false,
    read: true
  }
];

// Individual Message Component
const MessageBubble = ({ message, isOwner }) => {
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${isOwner ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isOwner 
          ? 'bg-blue-500 text-white rounded-br-md' 
          : 'bg-gray-100 text-gray-800 rounded-bl-md'
      }`}>
        <p className="text-xs leading-relaxed">{message.message}</p>
        <div className={`flex items-center justify-end mt-2 ${
          isOwner ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">{formatMessageTime(message.timestamp)}</span>
          {isOwner && message.read && (
            <CheckCheck className="w-3 h-3 ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

// Message Input Component
const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "This conversation is resolved" : "Type your message..."}
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
        />
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Chat Window Component
const ChatWindow = ({ conversation, messages = [], onSendMessage, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center space-x-3">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{conversation.regarding}</h3>
            <p className="text-sm text-gray-500">with {conversation.from}</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No messages yet</p>
            <p className="text-sm">Start the conversation by sending a message</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} isOwner={msg.isOwner} />
          ))
        )}
      </div>

      {/* Message Input */}
      <MessageInput 
        onSendMessage={onSendMessage} 
        disabled={conversation.status === 'resolved'}
      />
    </div>
  );
};

export default function Message() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(mockMessages);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // In a real app, you'd fetch messages for this conversation here
  };

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: currentMessages.length + 1,
      senderId: 'current-user',
      senderName: 'You',
      message: messageText,
      timestamp: new Date().toISOString(),
      isOwner: true,
      read: false
    };
    setCurrentMessages([...currentMessages, newMessage]);
  };

  const handleBackToInbox = () => {
    setSelectedConversation(null);
  };

  // If a conversation is selected, show the chat window
  if (selectedConversation) {
    return (
      <div className="h-screen max-h-[600px] bg-white">
        <ChatWindow
          conversation={selectedConversation}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onBack={handleBackToInbox}
        />
      </div>
    );
  }

  // Show inbox list matching your existing design
  return (
    <div>
      <h1 className="text-xl p-5 font-bold mb-6">Return Requests</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {mockConversations.map((message, idx) => (
          <div 
            key={idx} 
            className={`p-4 border-b border-gray-100 last:border-0 flex cursor-pointer hover:bg-gray-50 ${message.unread ? 'bg-blue-50' : ''}`}
            onClick={() => handleSelectConversation(message)}
          >
            <div className="mr-4 bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center">
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