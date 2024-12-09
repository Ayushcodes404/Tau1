import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-gray-600">Made with</span>
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-600">for seniors</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Senior Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;