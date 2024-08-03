import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page: number = 1) => {
  console.log("page", page);
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return { results: [], total_pages: 0 };
  }
};

export const searchMovies = async (query: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const getMovieCredits = async (movieId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return null;
  }
};

export const getRelatedMovies = async (movieId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/similar`, {
      params: {
        api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching related movies:", error);
    return [];
  }
};
