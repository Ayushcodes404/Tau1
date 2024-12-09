import axios from 'axios';

const STABILITY_API_KEY = 'YOUR_STABILITY_API_KEY'; // Replace with your actual API key
const API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
      }
    );

    // Convert base64 to URL
    const base64Image = response.data.artifacts[0].base64;
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error('Image generation error:', error);
    throw new Error('Failed to generate image');
  }
};