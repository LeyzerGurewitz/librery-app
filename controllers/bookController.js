var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetAllBookByIdUser, addBook, editBook, deleteBook } from "../services/bookService.js";
export const getAllBookUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!userId) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const arrBooks = yield GetAllBookByIdUser(userId);
        res.status(200).json({ Books: arrBooks });
    }
    catch (error) {
        res.status(500).json({ error: "Encountered a problem, check if you entered the correct id" });
    }
});
export const addABookByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookName, userId } = req.body;
        if (!bookName || !userId) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const book = yield addBook(userId, bookName);
        if (!book) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        res.status(200).json({ UserId: userId, Book: book });
    }
    catch (error) {
        res.status(500).json({ error: "The server encountered a problem" });
    }
});
export const editBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, updatedData } = req.body;
        const bookId = req.params.bookId;
        if (!userId || !updatedData || !bookId) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const book = yield editBook(userId, updatedData, bookId);
        if (!book) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        res.status(200).json({ UserId: userId, Book: book });
    }
    catch (error) {
        res.status(500).json({ error: "The server encountered a problem" });
    }
});
export const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const bookId = req.params.bookId;
        if (!userId || !bookId) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const book = yield deleteBook(bookId, userId);
        if (!book) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        res.status(200).json({ UserId: userId, "The book has been deleted": book });
    }
    catch (error) {
        res.status(500).json({ error: "The server encountered a problem" });
    }
});
