import axios from 'axios';

const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true
});

export const fetchBreeds = async () => {
  try {
    const response = await api.get('/dogs/breeds');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch breeds:', error);
    throw error;
  }
};

export const searchDogs = async (params = {}) => {
  try {
    const response = await api.get('/dogs/search', {
      params: {
        ...params,
        size: params.size || 25
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search dogs:', error);
    throw error;
  }
};

export const fetchDogDetails = async (dogIds) => {
  try {
    const response = await api.post('/dogs', {
      body: dogIds
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dog details:', error);
    throw error;
  }
};

export const findMatch = async (dogIds) => {
  try {
    const response = await api.post('/dogs/match', {
      body: dogIds
    });
    return response.data.match;
  } catch (error) {
    console.error('Failed to find match:', error);
    throw error;
  }
};