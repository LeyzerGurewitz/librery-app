import express from 'express';
import { getAllBookUser, addABookByName, editBookById, deleteBookById } from '../controllers/bookController.js';
const router = express.Router();
router.route('/:userId').get(getAllBookUser);
router.route('/post').post(addABookByName);
router.route('/edit/:bookId').put(editBookById);
router.route('/delete/:bookId').delete(deleteBookById);
export default router;
