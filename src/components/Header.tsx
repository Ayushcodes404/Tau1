import React from 'react';
import { Volume2, VolumeX, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  audioEnabled,
  setAudioEnabled,
  setCurrentPage
}) => {
  const { t } = useTranslation();

  return (
    <header className="bg-retro-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-retro-primary hover:text-retro-accent transition-colors"
            >
              <Home className="w-6 h-6" />
              <span className="text-xl">{t('app.home')}</span>
            </button>
            <div className="flex flex-col">
              <h1 className="text-3xl text-retro-primary font-bold">{t('app.title')}</h1>
              <p className="text-sm text-retro-primary">{t('app.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-2 rounded-full hover:bg-retro-secondary border border-retro-primary"
              aria-label={audioEnabled ? 'Disable audio' : 'Enable audio'}
            >
              {audioEnabled ? (
                <Volume2 className="w-6 h-6 text-retro-primary" />
              ) : (
                <VolumeX className="w-6 h-6 text-retro-primary" />
              )}
            </button>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;