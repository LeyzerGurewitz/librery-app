var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readUsersFromFile, writeUsersToFile } from "../DAL/jsonUser.js";
import axios from "axios";
const BOOK_URL = "https://freetestapi.com/api/v1/books?search=";
export const GetAllBookByIdUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error("No id found");
    }
    const users = yield readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    if (!user) {
        throw new Error("No user found");
    }
    return user.books;
});
export const addBook = (userId, BookName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error("No id found");
    }
    const users = yield readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    if (!user) {
        throw new Error("No user found");
    }
    const response = yield axios.get(`${BOOK_URL}${BookName}`);
    const data = response.data;
    if (!data) {
        throw new Error("No user found");
    }
    const newBook = {
        id: data[0].id,
        title: data[0].title,
        author: data[0].author,
    };
    if (!newBook) {
        throw new Error("No user found");
    }
    user.books = user.books ? [...user.books, newBook] : [newBook];
    yield writeUsersToFile(users);
    return newBook;
});
export const editBook = (userId, updatedData, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!updatedData.title || !updatedData.author) {
        throw new Error("One thing is missing");
    }
    const users = yield readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    if (!user) {
        throw new Error("No user found");
    }
    const book = user.books.find(b => b.id == bookId);
    if (!book) {
        throw new Error("No book found");
    }
    book.id = updatedData.id;
    book.title = updatedData.title;
    book.author = updatedData.author;
    yield writeUsersToFile(users);
    return book;
});
export const deleteBook = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    if (!user) {
        throw new Error("No user found");
    }
    const book = user.books.find(b => b.id == bookId);
    if (!book) {
        throw new Error("No book found");
    }
    const index = user.books.findIndex(b => b.id == bookId);
    if (index === -1) {
        throw new Error("No index found");
    }
    user.books.splice(index, 1);
    yield writeUsersToFile(users);
    return book;
});
