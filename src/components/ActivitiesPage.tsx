import React from 'react';
import { PageProps, Activity } from '../types';

const activities: Activity[] = [
  {
    title: 'Laughter Club',
    description: 'Join our daily laughter therapy sessions for better mental and physical health.',
    image: 'https://images.unsplash.com/photo-1517242027094-631f8c218a0f?auto=format&fit=crop&w=500'
  },
  {
    title: 'Pottery Classes',
    description: 'Learn the art of pottery making in our beginner-friendly classes.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=500'
  },
  {
    title: 'Book Club',
    description: 'Connect with fellow readers and discuss interesting books together.',
    image: 'https://images.unsplash.com/photo-1526721940322-10fb6e3ae94a?auto=format&fit=crop&w=500'
  }
];

export const ActivitiesPage: React.FC<PageProps> = ({ setPage }) => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h2 className="text-3xl font-bold text-center mb-8">Activities</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {activities.map((activity) => (
        <div key={activity.title} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">{activity.title}</h3>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Join Activity
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActivitiesPage;