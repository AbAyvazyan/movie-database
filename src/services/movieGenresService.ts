import { pool } from "../utils/dbUtils";

interface MovieGenre {
    movieId: number;
    genreId: number;
}

export const createMovieGenre = async (movieGenre: MovieGenre): Promise<any> => {
    const { movieId, genreId } = movieGenre;
    const result = await pool.query(
        'INSERT INTO MovieGenres (MovieID, GenreID) VALUES ($1, $2) RETURNING *',
        [movieId, genreId]
    );
    return result.rows[0];
};

export const deleteMovieGenre = async (movieId: number, genreId: number): Promise<void> => {
    await pool.query(
        'DELETE FROM MovieGenres WHERE MovieID = $1 AND GenreID = $2',
        [movieId, genreId]
    );
};

export const getMovieGenres = async (): Promise<any[]> => {
    const result = await pool.query('SELECT * FROM MovieGenres');
    return result.rows;
};
