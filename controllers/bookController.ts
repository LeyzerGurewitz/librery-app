import { Request, Response } from "express";
import {  GetAllBookByIdUser, addBook, editBook, deleteBook } from "../services/bookService.js";
import { Book, userNamePassword } from "../models/types.js";
import { responseEncoding } from "axios";

export const getAllBookUser = async (req:Request, res:Response): Promise<void> => {
    try{
        const userId = req.params.userId;
        if(!userId){
            res.status(400).json({ error: "Username and password are required." });
            return;              
        }
        const arrBooks = await GetAllBookByIdUser(userId);
        res.status(200).json({ Books: arrBooks });       
    }
    catch(error: any){
        res.status(500).json({error: "Encountered a problem, check if you entered the correct id"})
    }

}

export const addABookByName = async (req:Request, res:Response): Promise<void> => {
    try{
        const {bookName, userId} = req.body;
        if (!bookName || !userId) {
            res.status(400).json({ error: "No userId or book name" });
            return;
          }
        const book: Book | void = await addBook(userId, bookName);  
        if(!book){
            res.status(400).json({ error: "The book in question was not found" });
            return;
        }
        res.status(200).json({UserId: userId ,Book: book });      

    }
    catch(error: any){
        res.status(500).json({error: "The server encountered a problem"})
    }
}

export const editBookById = async (req:Request, res:Response): Promise<void> => {
    try{
        const{userId, updatedData} = req.body;
        const bookId:string = req.params.bookId
        if(!userId || !updatedData || !bookId){
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const book: Book | void = await editBook(userId, updatedData, bookId);  
        if(!book){
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        res.status(200).json({UserId: userId ,Book: book });      

    }
    catch(error: any){
        res.status(500).json({error: "The server encountered a problem"})
    }
    
}

export const deleteBookById = async (req:Request, res:Response): Promise<void> => {
    try{
        const userId = req.body.userId;
        const bookId = req.params.bookId;
        if(!userId || !bookId){
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const book: Book | void = await deleteBook(bookId, userId);  
        if(!book){
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        res.status(200).json({UserId: userId ,"The book has been deleted": book });      

    }
    catch(error: any){
        res.status(500).json({error: "The server encountered a problem"})
    }
}