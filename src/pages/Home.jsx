import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_KEY = '25131d6b9753528e5fdfbacc1d982378';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${API_KEY}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
      setError('');
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full"
              />
              <div className="px-2 py-1">
                <h3 className="text-sm font-bold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
