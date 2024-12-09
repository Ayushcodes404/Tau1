import React, { useState } from 'react';
import { Smartphone, Camera, Heart, Activity } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';
import VoiceControl from './components/VoiceControl';
import LearnPage from './components/LearnPage';
import MemoriesPage from './components/MemoriesPage';
import HealthPage from './components/HealthPage';
import ActivitiesPage from './components/ActivitiesPage';
import { Feature } from './types';

const App: React.FC = () => {  
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [language, setLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState('home');

  const features: Feature[] = [
    {
      title: "Learn Basic Mobile Operations",
      description: "Learn how to use your smartphone step by step: calling, texting, WhatsApp, and more!",
      icon: Smartphone,
      buttonText: "Start Learning",
      path: "learn"
    },
    {
      title: "Revisit Your Memories",
      description: "View and organize your photos, convert B&W photos to color, and create memory albums.",
      icon: Camera,
      buttonText: "Open Album",
      path: "memories"
    },
    {
      title: "Health and Wellness",
      description: "Set health reminders and join virtual yoga sessions for a healthier lifestyle.",
      icon: Heart,
      buttonText: "Health & Wellness",
      path: "health"
    },
    {
      title: "Activities",
      description: "Join fun activities like laughter club, pottery classes, and social gatherings.",
      icon: Activity,
      buttonText: "Join Activities",
      path: "activities"
    }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={feature.title}
                    {...feature}
                    onClick={() => setCurrentPage(feature.path)}
                    delay={index * 0.2}
                  />
                ))}
              </div>
            </main>
          </>
        );
      case 'learn':
        return <LearnPage setPage={setCurrentPage} />;
      case 'memories':
        return <MemoriesPage setPage={setCurrentPage} />;
      case 'health':
        return <HealthPage setPage={setCurrentPage} />;
      case 'activities':
        return <ActivitiesPage setPage={setCurrentPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="border-b-4 border-retro-primary">
        <Header 
          audioEnabled={audioEnabled}
          setAudioEnabled={setAudioEnabled}
          language={language}
          setLanguage={setLanguage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <VoiceControl setCurrentPage={setCurrentPage} />
      {renderContent()}
      <Footer />
    </div>
  );
};

export default App;