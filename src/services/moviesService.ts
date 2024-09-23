import { pool } from "../utils/dbUtils";

interface Movie {
    title: string;
    releaseYear: number;
    directorId: number;
}

export const getMovies = async (): Promise<any[]> => {
    const result = await pool.query('SELECT * FROM Movies');
    return result.rows;
};

export const createMovie = async (movie: Movie): Promise<any> => {
    const { title, releaseYear, directorId } = movie;
    const result = await pool.query(
        'INSERT INTO Movies (title, releaseYear, directorId) VALUES ($1, $2, $3) RETURNING *',
        [title, releaseYear, directorId]
    );
    return result.rows[0];
};

export const updateMovie = async (id: number, movie: Movie): Promise<any> => {
    const { title, releaseYear, directorId } = movie;
    const result = await pool.query(
        'UPDATE Movies SET title = $1, releaseYear = $2, directorId = $3 WHERE movieId = $4 RETURNING *',
        [title, releaseYear, directorId, id]
    );
    return result.rows[0];
};

export const deleteMovie = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM Movies WHERE movieId = $1', [id]);
};
