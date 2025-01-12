import { useParams, useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    const previousLocationRef = useRef(location.state?.from ?? '/movies');

    useEffect(() => {
        fetchMovieDetails(movieId)
            .then(setMovie)
            .catch((err) => setError(err.message));
    }, [movieId]);

    const handleGoBack = () => {
        navigate(previousLocationRef.current); 
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!movie) {
        return <p>Loading...</p>;
    }

    const { title, overview, genres, poster_path, popularity } = movie;

    return (
        <main>
            <button onClick={handleGoBack}>Go Back</button>
            <div className={css.movieDetails}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    width="300"
                />
                <div className={css.detailsContainer}>
                    <h1>{title}</h1>
                    <p>Popularity: {popularity}</p>
                    <h2>Overview</h2>
                    <p>{overview}</p>
                    <h2>Genres</h2>
                    <ul className={css.genreList}>
                        {genres.map((genre) => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <nav className={css.navigation}>
                <Link to={`/movies/${movieId}/cast`}>Cast</Link> | 
                <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </nav>
            <Outlet />
        </main>
    );
}

