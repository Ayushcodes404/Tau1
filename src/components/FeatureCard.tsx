import React from 'react';
import { Feature } from '../types';

interface FeatureCardProps extends Feature {
  onClick: () => void;
  delay: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  buttonText,
  onClick,
  delay
}) => (
  <div 
    className="bg-retro-light rounded-lg border-2 border-retro-primary p-6 shadow-retro hover:shadow-retro-lg transition-all duration-300"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center justify-center w-12 h-12 bg-retro-secondary rounded-full mb-4 border border-retro-primary">
      <Icon className="w-6 h-6 text-retro-primary" />
    </div>
    <h3 className="text-2xl text-retro-primary mb-2">{title}</h3>
    <p className="text-retro-dark mb-4">{description}</p>
    <button
      onClick={onClick}
      className="w-full bg-retro-primary text-retro-light px-4 py-2 rounded border-2 border-retro-dark hover:bg-retro-accent transition-colors shadow-retro hover:shadow-retro-lg"
    >
      {buttonText}
    </button>
  </div>
);

export default FeatureCard;