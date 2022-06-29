import { Sequelize } from 'sequelize';
import book from "../models/book.js";
import bookCopy from "../models/bookCopy.js";
import loan from "../models/loan.js"
import user from "../models/user.js";

const sequelize = new Sequelize('postgres://bookish:bookish@localhost:5432/bookish', {define: {timestamps: false, freezeTableName: true}});

export const books = sequelize.define('books', book);

export const copiesofbook = sequelize.define('copiesofbook', bookCopy);

export const loans = sequelize.define('loans', loan);

export const users = sequelize.define('users', user);