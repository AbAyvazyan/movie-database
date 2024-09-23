import { pool } from "../utils/dbUtils";

interface Rating {
    movieId: number;
    rating: number;
}

export const getRatings = async (): Promise<any[]> => {
    const result = await pool.query('SELECT * FROM Ratings');
    return result.rows;
};

export const createRating = async (rating: Rating): Promise<any> => {
    const { movieId, rating: rate } = rating;
    const result = await pool.query(
        'INSERT INTO Ratings (movieId, rating) VALUES ($1, $2) RETURNING *',
        [movieId, rate]
    );
    return result.rows[0];
};

export const deleteRating = async (movieId: number): Promise<void> => {
    await pool.query('DELETE FROM Ratings WHERE movieId = $1', [movieId]);
};
