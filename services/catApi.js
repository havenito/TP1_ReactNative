const API_KEY = 'live_9RlMyhZcY88iX0QYmk3MBD5dXTT3aUKSlDsnaaSiaRQxmDSAX0zGY8U3KiXSwjg8';
const URL = 'https://api.thecatapi.com/v1';

export const getCatImages = async (limit = 20) => {
  try {
    const response = await fetch(`${URL}/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    throw error;
  }
};
