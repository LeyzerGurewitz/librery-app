import express, {Router} from 'express';
import {getAllBookUser, addABookByName, editBookById, deleteBookById} from '../controllers/bookController.js'
const router: Router = express.Router();

router.route('/:userId').get(getAllBookUser);
router.route('/post').post(addABookByName);
router.route('/edit/:bookId').put(editBookById);
router.route('/delete/:bookId').delete(deleteBookById);
export default router