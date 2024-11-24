import express from 'express';

const app = express();

// Middleware, joka käsittelee JSON-dataa
// app.use(express.json());


// Adding movie genres
app.post('/genres', (req, res) => {
  res.json({ message: "Movie genre added" });
});

// Adding new movies
app.post('/movies', (req, res) => {
  res.json({ message: "Movie added" });
});

// Registering user 
app.post('/users', (req, res) => {
  res.json({ message: "User registered" });
});

// Getting movie by id
app.get('/movies/:id', (req, res) => {
  res.json({ message: "Movie fetched by id" });
});

// Removing movie by id
app.delete('/movies/:id', (req, res) => {
  res.json({ message: "Movie deleted by id" });
});

// Getting all movies
app.get('/movies', (req, res) => {
  res.json({ message: "All movies fetched" });
});

// Getting movies by keyword
app.get('/movies/search', (req, res) => {
  res.json({ message: "Movies fetched by keyword" });
});

// Adding movie review
app.post('/reviews', (req, res) => {
  res.json({ message: "Review added successfully" });
});

// Adding favorite movies for user
app.post('/favorite_movies', (req, res) => {
  res.json({ message: "Favorite movie added" });
});

// Getting favorite movies by username
app.get('/favorite_movies/:username', (req, res) => {
  res.json({ message: "Favorite movies fetched for user" });
});



app.listen(3001, () => {
  console.log('Server running on port 3001');
});
