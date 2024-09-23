import express from 'express';
import bodyParser from 'body-parser';

import directorRoutes from './routes/directors';
import actorRoutes from './routes/actors';
import genreRoutes from './routes/genres';
import movieRoutes from './routes/movies';
import ratingRoutes from './routes/ratings';
import movieGenresRoutes from './routes/movieGenres';
const app = express();

app.use(bodyParser.json());

const apiRouter = express.Router();
apiRouter.use('/directors', directorRoutes);
apiRouter.use('/actors', actorRoutes);
apiRouter.use('/genres', genreRoutes);
apiRouter.use('/movies', movieRoutes);
apiRouter.use('/ratings', ratingRoutes);
apiRouter.use('/movie-genres', movieGenresRoutes);

// Use the base route
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
