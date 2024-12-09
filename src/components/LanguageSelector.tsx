import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'gu', name: 'ગુજરાતી' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-retro-secondary border border-retro-primary">
        <Globe className="w-6 h-6 text-retro-primary" />
        <span className="capitalize text-retro-primary">
          {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
        <div className="py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => i18n.changeLanguage(language.code)}
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-retro-light ${
                i18n.language === language.code ? 'bg-retro-secondary' : ''
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;