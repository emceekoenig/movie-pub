import api from "../api/axiosConfig";

export const fetchMovies = async () => {
  const response = await api.get("/api/v1/movies");
  return response.data;
};

export const fetchMovieData = async (movieId) => {
  const response = await api.get(`/api/v1/movies/${movieId}`);
  return response.data;
};
