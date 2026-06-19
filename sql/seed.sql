INSERT INTO users (name, email, password, role)
VALUES (
    'Admin',
    'admin@example.com',
    '$2a$10$X7npxbA3w0N.b8hX06D9cOb8Rz2/r3dC1rW5.8tZ.rW6gQn5Q1hKa', --admin123
    'admin'
);

INSERT INTO books (title, author, isbn, quantity)
VALUES
    ('Clean Code', 'Robert C. Martin', '9780132350884', 5),
    ('The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 3);