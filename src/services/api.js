import axios from 'axios';

// The PRD requested using dummyjson.com to mock job data
const BASE_URL = 'https://dummyjson.com/products';

export const fetchMockJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=5`);
    
    // Transforming the dummy product data into our Job Application model
    return response.data.products.map(product => ({
      id: crypto.randomUUID(),
      company: product.brand || 'Mock Company Inc.',
      role: product.title,
      location: 'Remote',
      salary: product.price * 1000, // Make it look like a salary
      platform: 'LinkedIn',
      status: ['Applied', 'Interviewing', 'Rejected'][Math.floor(Math.random() * 3)],
      appliedDate: new Date().toISOString().split('T')[0],
      notes: product.description,
      bookmarked: false
    }));
  } catch (error) {
    console.error("Error fetching mock jobs:", error);
    return [];
  }
};