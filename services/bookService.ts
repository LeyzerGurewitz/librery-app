import { User, Book } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readUsersFromFile, writeUsersToFile } from "../DAL/jsonUser.js"
import bcrypt from "bcrypt"
import { error } from "console";
import axios from "axios";
const BOOK_URL: string = "https://freetestapi.com/api/v1/books?search="

export const GetAllBookByIdUser = async (userId: string): Promise<Book[] | void> =>{
    if(!userId){
        throw new Error("No id found")
    }
    const users: User[] = await readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    if(!user){
        throw new Error("No user found")
    }
    return user.books;


}

export const addBook = async (userId: string, BookName: string): Promise<Book | void> => {
    if(!userId){
        throw new Error("No id found")
    }

    const users: User[] = await readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    if(!user){
        throw new Error("No user found")
    }
    const response = await axios.get(`${BOOK_URL}${BookName}`)
    const data = response.data
    if(!data){
        throw new Error("No user found")
    }
    const newBook: Book = {
        id: data[0].id,
        title: data[0].title,
        author: data[0].author,
    }
    if(!newBook){
        throw new Error("No user found")
    }
    user.books = user.books ? [...user.books, newBook] : [newBook];
    await writeUsersToFile(users)
    return newBook;
}  


export const editBook = async (userId:string, updatedData:Book, bookId:string): Promise<Book | void> =>{
    if(!updatedData.title || !updatedData.author){
        throw new Error("One thing is missing")
    }
    const users: User[] = await readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    if(!user){
        throw new Error("No user found")
    }
    const book = user.books.find(b => b.id == bookId);
    if(!book){
        throw new Error("No book found")
    }
    book.id = updatedData.id;
    book.title = updatedData.title;
    book.author = updatedData.author;
    await writeUsersToFile(users);
    return book;
}

export const deleteBook = async  (bookId:string, userId:string): Promise<Book| void> => {
    const users: User[] = await readUsersFromFile();
    const user: User | void = users.find((u) => u.id === userId);
    if(!user){
        throw new Error("No user found")
    }
    const book = user.books.find(b => b.id == bookId);
    if(!book){
        throw new Error("No book found")
    }
    const index = user.books.findIndex(b => b.id == bookId)
    if(index === -1){
        throw new Error("No index found")
    }
    user.books.splice(index, 1)
    await writeUsersToFile(users);
    return book;
}