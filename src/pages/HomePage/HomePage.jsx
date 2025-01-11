import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrendingMovies()
            .then(setMovies)
            .catch((err) => setError(err.message));
    }, []);

    return (
        <main>
            <h1>Trending Today</h1>
            {error && <p>Error: {error}</p>}
            <MovieList movies={movies} />
        </main>
    );
}