import axios from 'axios';

const DEEPAI_API_KEY = 'YOUR_DEEPAI_API_KEY'; // Replace with your actual API key

export const colorizeImage = async (imageFile: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('https://api.deepai.org/api/colorizer', formData, {
      headers: {
        'api-key': DEEPAI_API_KEY,
      },
    });

    return response.data.output_url;
  } catch (error) {
    console.error('Colorization error:', error);
    throw new Error('Failed to colorize image');
  }
};