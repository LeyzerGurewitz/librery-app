import { User, Book } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readUsersFromFile, writeUsersToFile } from "../DAL/jsonUser.js"
import bcrypt from "bcrypt"
import axios from "axios";
import { error } from "console";

export const registerUser = async (userName: string,password: string): Promise<string> => {
  const users: User[] = await readUsersFromFile();
  const existingUser = users.find((u) => u.userName === userName);

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUserId: string = uuidv4();
  
  const newUser: User = {
    id: newUserId ,
    userName,
    password: hashedPassword,
    books: [],
  };
  users.push(newUser)
  await writeUsersToFile(users);
  return newUserId;
};

export const authenticateUser = async (userName: string, password: string): Promise<string> => {
  const users: User[] = await readUsersFromFile();
  const userFind = users.find((u) => u.userName === userName);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }

  const passwordMatch = bcrypt.compareSync(password, userFind.password);

  if (!passwordMatch) {
    throw new Error("Invalid username or password.");
  }

  return userFind.id? userFind.id : ''; // just for typescript not to be mad
};



