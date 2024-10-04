import axios from "axios";
import { API_KEY, BASE_URL } from "./config";

// Mendapatkan film top rated
export const getMovieTopRated = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan film yang sedang tayang di bioskop
export const getMovieNowPlaying = async (
  genreId,
  page = 1,
  itemsPerPage = 20
) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        page,
        // Jika genreId tidak null, tambahkan filter genre
        ...(genreId && { with_genres: genreId }),
      },
    });
    return response.data; // Kembalikan seluruh respons
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan film populer
export const getMoviePopular = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan film yang akan datang
export const getMovieUpcoming = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan film yang sedang trending
export const getMovieTrending = async (timeWindow = "day") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/${timeWindow}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan detail film berdasarkan movie_id
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan pemain dan kru dari sebuah film
export const getMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan ulasan untuk sebuah film
export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan pemain dan kru dari sebuah film
export const getPopularPeople = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/person/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan film yang mirip dengan film tertentu
export const getSimilarMovies = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/similar`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Mendapatkan trailer dan video lain untuk sebuah film
export const getMovieVideos = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getRequestToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/authentication/token/new`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.request_token;
  } catch (error) {
    console.log("Error getting request token:", error);
  }
};

// Login menggunakan username, password, dan request token
export const login = async (username, password, requestToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/token/validate_with_login`,
      {
        username: username,
        password: password,
        request_token: requestToken,
      },
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data.request_token;
  } catch (error) {
    console.log("Error logging in:", error);
  }
};

// Membuat session ID setelah login
export const createSession = async (requestToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/session/new`,
      {
        request_token: requestToken,
      },
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data.session_id;
  } catch (error) {
    console.log("Error creating session:", error);
  }
};

// Contoh penggunaan login
export const authenticateUser = async (username, password) => {
  try {
    const requestToken = await getRequestToken();
    const validatedToken = await login(username, password, requestToken);
    const sessionId = await createSession(validatedToken);
    return sessionId; // Session ID ini dapat digunakan untuk autentikasi pengguna
  } catch (error) {
    console.log("Error during authentication:", error);
  }
};

export const getUserDetails = async (sessionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/account`, {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
