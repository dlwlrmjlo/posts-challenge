import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
});

export const postService = {
    getAll: () => api.get('/posts'),
    create: (data: { name: string; description: string }) => api.post('/posts', data),
    delete: (id: number) => api.delete(`/posts/${id}`),
};
