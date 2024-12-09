import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, Loader, Download } from 'lucide-react';
import { generateImage } from '../services/imageGeneration';

interface VoiceImageGeneratorProps {
  onClose: () => void;
}

const VoiceImageGenerator: React.FC<VoiceImageGeneratorProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setPrompt(transcript);
    }
  }, [transcript]);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please provide a prompt first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
          <p className="text-red-600">
            Your browser doesn't support speech recognition.
            Please try using a modern browser like Chrome.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-retro-primary">Voice Image Generator</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleListening}
              className={`p-4 rounded-full ${
                isListening ? 'bg-retro-primary' : 'bg-gray-200'
              } transition-colors`}
            >
              {isListening ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <MicOff className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Speak or type your image description here..."
                className="w-full p-3 border-2 border-retro-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-retro-accent"
                rows={3}
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`w-full py-3 rounded-lg ${
              isGenerating || !prompt
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-retro-primary text-white hover:bg-retro-accent'
            } transition-colors`}
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </button>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {(isGenerating || generatedImage) && (
            <div className="border-2 border-retro-primary rounded-lg p-4">
              <h3 className="font-semibold text-retro-primary mb-4">Generated Image</h3>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                {isGenerating ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <Loader className="w-8 h-8 mx-auto mb-2 animate-spin text-retro-primary" />
                      <p className="text-sm text-gray-500">Creating your image...</p>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <>
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={downloadImage}
                      className="absolute bottom-4 right-4 bg-retro-primary text-white p-2 rounded-full hover:bg-retro-accent transition-colors"
                    >
                      <Download className="w-6 h-6" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceImageGenerator;