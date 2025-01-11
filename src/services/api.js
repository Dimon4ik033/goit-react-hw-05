import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDcyOGNjMDE1MGI3YTM0YWMzZjM1NDY5MjZkMjYyOCIsIm5iZiI6MTczNjQzMTcwNi43NjQsInN1YiI6IjY3N2ZkODVhMDQ0YjZjYTY3NjRlOGZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Q-eaH50IbqltfXTkgQqL9CcqZEMfTnwSP6_W6WLP3o';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: API_TOKEN,
    },
});

export const fetchTrendingMovies = async () => {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await api.get('/search/movie', {
        params: { query, include_adoult: false, language: 'en-US', page: 1 },
    });
    return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
};

export const fetchMovieCast = async (movieId) => {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
    const response = await api.get(`/movie/${movieId}/reviews`);
    return response.data.results;
};