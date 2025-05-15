'use client';

import { useState } from 'react';
import { Home, Package, QrCode, Clock, MessageCircle, Settings } from 'lucide-react';
import Main from '@/components/Dashboard/Main';
import Items from '@/components/Dashboard/Items';
import CreateQr from '@/components/Dashboard/CreateQr';
import Scan from '@/components/Dashboard/Scan';
import Message from '@/components/Dashboard/Message';
import Setting from '@/components/Dashboard/Setting';

const tabs = [
  { label: 'Dashboard', value: 'main', icon: Home },
  { label: 'My-items', value: 'items', icon: Package },
  { label: 'Create-tag', value: 'create', icon: QrCode },
  { label: 'Scan-logs', value: 'logs', icon: Clock },
  { label: 'Messages', value: 'messages', icon: MessageCircle },
  { label: 'Settings', value: 'settings', icon: Settings },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('main');

  return (
    <section className="flex h-screen">
      <nav className="flex flex-col w-56 bg-white border-r border-gray-200 pt-3 pl-9 pr-3 mt-6 space-y-5 ">
        {tabs.map(({ label, value, icon: Icon }) => (
          <div key={value} 
           onClick={() => setActiveTab(value)}
          className={`flex items-center py-3 px-4 cursor-pointer rounded-lg mb-1 space-x-2 ${
            activeTab === 'label'? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
          }`} 
           >
            
            <Icon />
            <button className="text-left">{label}</button>
          </div>
        ))}
      </nav>
      <div className="flex-1 p-6 mt-4">
        {activeTab === 'main' && <Main />}
        { activeTab === 'items' && <Items />}
        { activeTab == 'create' && <CreateQr />}
        { activeTab == 'logs' && <Scan />}
        { activeTab == 'messages' && <Message />}
        { activeTab == 'settings' && <Setting />}
      </div>
    </section>
  );
}
