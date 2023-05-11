const express = require('express');
const app = express();

const books = [];

// Serve static files from the public directory
app.use(express.static('public'));

// Return the current collection of books as a JSON array
app.get('/books', (req, res) => {
    res.json(books);
});

// Add a new book to the collection
app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    // Generate a unique ID for the book
    const id = Math.floor(Math.random() * 1000);

    // Add the book to the collection
    const book = { id, title, author, publishedDate };
    books.push(book);

    // Return the new book as a JSON object
    res.json(book);
});

// Delete a book from the collection
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        // Remove the book from the collection
        books.splice(index, 1);

        // Return a success message
        res.json({ message: 'Book successfully deleted' });
    } else {
        // Return an error message
        res.status(404).json({ message: 'Book not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
