import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const {Client} = pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Connection error', err.stack));

// Middleware, joka käsittelee JSON-dataa
app.use(express.json());


// 1. Adding new movie genres
app.post('/genres', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await client.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Adding new movies
app.post('/movies', async (req, res) => {
  const { name, year, genre_id } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO movies (name, year, genre_id) VALUES ($1, $2, $3) RETURNING *',
      [name, year, genre_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Registering user
app.post('/users', async (req, res) => {
  const { name, username, password, year_of_birth } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO users (name, username, password, year_of_birth) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, username, password, year_of_birth]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Getting movie by id
app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM movies WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Removing movie by id
app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully', movie: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Getting all movies with pagination
app.get('/movies', async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  try {
    const result = await client.query('SELECT * FROM movies LIMIT $1 OFFSET $2', [limit, offset]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Getting movies by keyword
app.get('/movies/search', async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await client.query(
      'SELECT * FROM movies WHERE name ILIKE $1',
      [`%${keyword}%`]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Adding movie review
app.post('/reviews', async (req, res) => {
  const { username, stars, text, movie_id } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO reviews (username, stars, text, movie_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, stars, text, movie_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Adding favorite movies for user
app.post('/favorite_movies', async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO favorite_movies (user_id, movie_id) VALUES ($1, $2) RETURNING *',
      [user_id, movie_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. Getting favorite movies by username
app.get('/favorite_movies/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await client.query(
      'SELECT movies.* FROM favorite_movies ' +
      'JOIN users ON favorite_movies.user_id = users.id ' +
      'JOIN movies ON favorite_movies.movie_id = movies.id ' +
      'WHERE users.username = $1',
      [username]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3001, () => {
  console.log('Server running on port 3001');
});
