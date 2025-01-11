import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    useEffect(() => {
        if (!query) return;

        searchMovies(query)
            .then((results) => {
                setMovies(results);
                setError(null);
            })
            .catch((err) => setError(err.message));
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const searchQuery = form.elements.query.value.trim();

        if (!searchQuery) {
            setMovies([]);
            setSearchParams({});
            return;
        }

        setSearchParams({ query: searchQuery });
        form.reset();
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text" name="query" placeholder="Search movies..." />
                <button type="submit">Search</button>
            </form>
            {error && <p>Error: {error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
            {movies.length === 0 && query && !error && (
                <p>No movies found for &quot;{query}&quot;</p>
            )}
        </main>
    );
}
