import React from 'react';
import { PageProps } from '../types';

export const HealthPage: React.FC<PageProps> = ({ setPage }) => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h2 className="text-3xl font-bold text-center mb-8">Health & Wellness</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Reminders</h3>
        <p className="text-gray-600 mb-4">Set reminders for medications, exercises, and health check-ups.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Set Reminders
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Yoga Sessions</h3>
        <p className="text-gray-600 mb-4">Join live or recorded yoga sessions tailored for seniors.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Join Session
        </button>
      </div>
    </div>
  </div>
);

export default HealthPage;