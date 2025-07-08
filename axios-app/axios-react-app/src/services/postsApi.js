import api from './api';

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Add more API functions as needed