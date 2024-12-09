import React from 'react';
import { PageProps } from '../types';

export const MemoriesPage: React.FC<PageProps> = ({ setPage }) => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h2 className="text-3xl font-bold text-center mb-8">Your Memories</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">B&W to Color Conversion</h3>
        <p className="text-gray-600 mb-4">Transform your old black and white photos into vibrant colored memories.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Convert Photos
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Memory Pitar</h3>
        <p className="text-gray-600 mb-4">Create beautiful digital albums and slideshows of your cherished memories.</p>
        <a href='localhost:3000'><button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create Album
        </button></a>
      </div>
    </div>
  </div>
);

export default MemoriesPage;