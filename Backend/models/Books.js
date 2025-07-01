import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  book: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  stars: { type: Number, required: true },
  favorite: { type: Boolean, default: false  }
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);
export default Book;
