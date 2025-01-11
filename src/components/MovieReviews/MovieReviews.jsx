import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/api";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovieReviews(movieId)
            .then(setReviews)
            .catch((err) => setError(err.message));
    }, [movieId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (reviews.length === 0) {
        return <p>No reviews available.</p>;
    }

    return (
        <ul>
            {reviews.map(({ id, author, content }) => (
                <li key={id}>
                    <p><strong>Author: {author}</strong></p>
                    <p>{content}</p>
                </li>
            ))}
        </ul>
    );
}

