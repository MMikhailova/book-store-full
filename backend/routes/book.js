import express from 'express';
const router = express.Router();

import bookControllers from '../controllers/book.js';
import verifyToken from '../middleware/verifyToken.js';

// routes
router.get('/', bookControllers.getBooks);
router.get('/get-book/:id', bookControllers.getBook);
router.get(
    '/get-user-books/:user_id',
    verifyToken,
    bookControllers.getUserBooks
);
router.post('/add-book', verifyToken, bookControllers.addBook);
router.put('/update-book/:id', verifyToken, bookControllers.updateBook);
router.delete('/delete-book/:id', verifyToken, bookControllers.deleteBook);

export default router;
