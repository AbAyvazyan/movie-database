CREATE TABLE Directors (
  DirectorID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Nationality VARCHAR(255),
  DOB DATE
);

CREATE TABLE Actors (
  ActorID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Nationality VARCHAR(255),
  DOB DATE
);

CREATE TABLE Genres (
  GenreID SERIAL PRIMARY KEY,
  GenreName VARCHAR(255) NOT NULL
);

CREATE TABLE Movies (
  MovieID SERIAL PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  ReleaseYear INT,
  DirectorID INT REFERENCES Directors(DirectorID)
);

CREATE TABLE Ratings (
  MovieID INT REFERENCES Movies(MovieID),
  Rating DECIMAL(3, 2),
  PRIMARY KEY (MovieID)
);

CREATE TABLE MovieGenres (
  MovieID INT REFERENCES Movies(MovieID),
  GenreID INT REFERENCES Genres(GenreID),
  PRIMARY KEY (MovieID, GenreID)
);
