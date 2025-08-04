const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiService {
  async analyzeImage(imageFile) {
    // Mock response for demo purposes - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Delicious Burger",
          summary: "A mouth-watering beef burger with fresh lettuce, tomatoes, and cheese on a sesame seed bun. Perfect for a satisfying meal!"
        });
      }, 2000);
    });

    // Uncomment below when you have a backend API
    /*
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_BASE_URL}/analyze-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image. Please try again.');
    }
    */
  }

  async generateImage(prompt) {
    // Mock response for demo purposes - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          imageUrl: `https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop`
        });
      }, 3000);
    });

    // Uncomment below when you have a backend API
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image. Please try again.');
    }
    */
  }

  async healthCheck() {
    // Mock health check - replace with actual API call
    return true;

    // Uncomment below when you have a backend API
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
    */
  }
}

export const apiService = new ApiService();