INSERT INTO genres (name) VALUES
('drama'), ('comedy'), ('scifi'), ('fantasy'), ('action'), ('triller');

INSERT INTO movies (name, year, genre_id) VALUES
('Inception', 2010, 4), 
('The Terminator', 1984, 3),
('Tropic Thunder', 2008, 2),
('Borat', 2006, 2),
('Interstellar', 2014, 1),
('Joker', 2019, 1);

INSERT INTO users (username, name, password, year_of_birth) VALUES
('hande', 'Hanna Hamalainen', 'qwerty123', 1986),
('lizzy', 'Lisa Simpson', 'abcdef', 1991),
('boss', 'Ben Bossy', 'salasana', 1981);
