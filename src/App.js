import "./App.css";
import { fetchMovies, fetchMovieData } from "./services/movieService";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import WatchList from "./components/watchlist/WatchList";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";

function App() {
  // return destructured array from `useState()` hook
  // 1st item in dest. array is `movies`, which will store an array of movie data return from a call to the relative API endpoint
  // 2nd item is a function that can be used to change the state of `movies` variable, `setMovies`; when the state of `movies` is changed, the component is re-rendered by React
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // function that handles Http GET request to an endpoint that returns an array of movie data
  // once the movie data successfully returns, this code that changes the state of the `movies` array is executed
  const getMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      alert("An error occurred while fetching movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const data = await fetchMovieData(movieId);
      setMovie(data);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Failed to fetch movie data:", error);
      alert(
        "An error occurred while fetching movie data. Please try again later."
      );
    }
  };

  // implement `useEffect()` hook, so that the `getMovies()` function is executed when the app component first loads
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              path="/"
              element={<Home movies={movies} />}
            ></Route>
            <Route
              path="/watchlist"
              element={<WatchList movies={movies} />}
            ></Route>
            <Route
              path="/Trailer/:ytTrailerId"
              element={<Trailer />}
            ></Route>
            <Route
              path="/Reviews/:movieId"
              element={
                <Reviews
                  getMovieData={getMovieData}
                  movie={movie}
                  reviews={reviews}
                  setReviews={setReviews}
                />
              }
            ></Route>
            <Route
              path="*"
              element={<NotFound />}
            ></Route>
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
