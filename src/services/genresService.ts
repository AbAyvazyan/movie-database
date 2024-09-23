import { pool } from "../utils/dbUtils";

interface Genre {
    genreName: string;
}

export const getAllGenres = async (): Promise<any[]> => {
    const result = await pool.query('SELECT * FROM Genres');
    return result.rows;
};

export const createGenre = async (genre: Genre): Promise<any> => {
    const { genreName } = genre;
    const result = await pool.query(
        'INSERT INTO Genres (genreName) VALUES ($1) RETURNING *',
        [genreName]
    );
    return result.rows[0];
};

export const updateGenre = async (id: number, genre: Genre): Promise<any> => {
    const { genreName } = genre;
    const result = await pool.query(
        'UPDATE Genres SET genreName = $1 WHERE GenreID = $2 RETURNING *',
        [genreName, id]
    );
    return result.rows[0];
};

export const deleteGenre = async (id: number): Promise<any> => {
    const result = await pool.query('DELETE FROM Genres WHERE GenreID = $1 RETURNING *', [id]);
    return result.rows[0];
};
