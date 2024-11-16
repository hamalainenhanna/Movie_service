
CREATE TABLE genres ( 
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  year_of_birth INT
);

CREATE TABLE movies (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  year INT,
  genre_id INT,
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE reviews (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  stars INT NOT NULL CHECK (stars >= 1 AND stars <= 5),
  text TEXT,
  movie_id INT,
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE favorite_movies (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT,
  movie_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

