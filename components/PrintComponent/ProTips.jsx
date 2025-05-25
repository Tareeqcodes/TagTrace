'use client'
import React from 'react';
import { Sparkles } from 'lucide-react';

const ProTips = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
      <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
        <Sparkles className="h-5 w-5 mr-2" />
        Pro Tips
      </h4>
      <ul className="space-y-2 text-sm text-amber-800">
        <li>• Use high-quality paper for better durability</li>
        <li>• Test scan before mass printing</li>
        <li>• Keep QR codes clean and unobstructed</li>
        <li>• Consider laminating for outdoor use</li>
      </ul>
    </div>
  );
};

export default ProTips;