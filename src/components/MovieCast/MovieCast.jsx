import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../services/api";

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovieCast(movieId)
            .then(setCast)
            .catch((err) => setError(err.message));
    }, [movieId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (cast.length === 0) {
        return <p>No cast information available.</p>;
    }

    return (
        <ul>
            {cast.map(({ id, name, character, profile_path }) => (
                <li key={id}>
                    {profile_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                            alt={name}
                            width="100"
                        />
                    )}
                    <p><strong>{name}</strong></p>
                    <p>Character: {character}</p>
                </li>
            ))}
        </ul>
    );
}
