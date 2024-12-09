import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff } from 'lucide-react';

interface VoiceControlProps {
  setCurrentPage: (page: string) => void;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ setCurrentPage }) => {
  const [isListening, setIsListening] = useState(false);

  const commands = [
    {
      command: ['go to *', 'open *', 'show *'],
      callback: (page: string) => {
        const pageMap: { [key: string]: string } = {
          home: 'home',
          learning: 'learn',
          memories: 'memories',
          health: 'health',
          activities: 'activities',
        };
        const normalizedPage = page.toLowerCase();
        if (pageMap[normalizedPage]) {
          setCurrentPage(pageMap[normalizedPage]);
        }
      },
    },
  ];

  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
      <button
        onClick={toggleListening}
        className={`p-4 rounded-full shadow-lg ${
          isListening ? 'bg-retro-primary' : 'bg-gray-400'
        } text-white transition-colors duration-200`}
      >
        {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
      </button>
      {isListening && (
        <div className="bg-white p-2 rounded-lg shadow-lg text-sm">
          {transcript || 'Listening...'}
        </div>
      )}
    </div>
  );
};

export default VoiceControl;