import React from 'react';
import { Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-retro-secondary py-16 border-b-4 border-retro-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-retro-light rounded-full flex items-center justify-center border-4 border-retro-primary shadow-retro">
            <Heart className="w-10 h-10 text-retro-primary" />
          </div>
          <h1 className="text-5xl text-retro-primary mb-4">
            Welcome to Senior Connect
          </h1>
          <p className="text-xl text-retro-dark max-w-2xl mx-auto">
            Your friendly companion for staying connected, healthy, and active. 
            Explore our features designed specially for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;