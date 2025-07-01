import express from 'express';
import Book from '../models/Books.js';

const routes = express.Router();

routes.post('/home', async (req, res) => {
  try {
    const { book, author, description, stars } = req.body;

    if (!book || !author || !description || !stars) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBook = await Book.create({ book, author, description, stars });

    res.status(201).json({
      message: 'Book saved to MongoDB!',
      data: newBook
    });

  } catch (error) {
    console.error('Error saving book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


routes.get('/home', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

routes.delete("/home/:id", async (req, res) => {
  try {
    const BooksDeleted = await Book.findByIdAndDelete(req.params.id);
    res.json(BooksDeleted);
  } catch (error) {
    res.json({ error: error });
  }
});

routes.put("/home/:id", async (req, res) => {
  try {
    const favoriteBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(favoriteBook);  
  } catch (error) {
    res.json({ error: error });  
  }
});





export default routes;