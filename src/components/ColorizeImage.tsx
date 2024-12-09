import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { colorizeImage } from '../services/colorization';

interface ColorizeImageProps {
  onClose: () => void;
}

const ColorizeImage: React.FC<ColorizeImageProps> = ({ onClose }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        setError(null);
        setOriginalImage(URL.createObjectURL(file));
        await processImage(file);
      } catch (err) {
        setError('Error processing image. Please try again.');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    multiple: false
  });

  const processImage = async (file: File) => {
    setIsProcessing(true);
    try {
      const colorizedUrl = await colorizeImage(file);
      setColorizedImage(colorizedUrl);
    } catch (err) {
      setError('Failed to colorize image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = async () => {
    if (colorizedImage) {
      try {
        const response = await fetch(colorizedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'colorized-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        setError('Failed to download image. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-retro-primary">Convert B&W to Color</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {!originalImage ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-retro-primary bg-retro-secondary/10' : 'border-gray-300'}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-retro-primary" />
            <p className="text-lg mb-2">Drag & drop your B&W image here</p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-retro-primary">Original Image</h3>
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-retro-primary">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-retro-primary">Colorized Image</h3>
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-retro-primary">
                {isProcessing ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <Loader className="w-8 h-8 mx-auto mb-2 animate-spin text-retro-primary" />
                      <p className="text-sm text-gray-500">Processing image...</p>
                    </div>
                  </div>
                ) : colorizedImage ? (
                  <img
                    src={colorizedImage}
                    alt="Colorized"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Skeleton className="w-full h-full" />
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => {
              setOriginalImage(null);
              setColorizedImage(null);
              setError(null);
            }}
            className="px-4 py-2 text-retro-primary hover:bg-retro-secondary/10 rounded-lg"
          >
            Reset
          </button>
          {colorizedImage && (
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-retro-primary text-white rounded-lg hover:bg-retro-accent transition-colors"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorizeImage;