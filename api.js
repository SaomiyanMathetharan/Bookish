import Book from "./models/book.js";
import pgPromise from "pg-promise";
import md5 from "md5-hash";
import log4js from "log4js";
import jwt from "jsonwebtoken"
import {Sequelize} from "sequelize";
import { book, BookCopy, Loan, User } from './database/database.js';

const logger = log4js.getLogger('api.js');

export default class API {

    constructor() {
        const pgp = pgPromise({schema: "public"});
        this.db = pgp('postgres://bookish:bookish@localhost:5432/bookish');
        //this.db = new Sequelize('postgres://bookish:bookish@localhost:5432/bookish')
    }

    getAllBooks() {
        logger.info('Getting list books from database');
        return book.findAll()
            .then ((data)=>{
                return data.map(book => this.createBook(book))
            })
    }

    //doRequest = (path) =>
    createBook (book){
        logger.trace('Creating book object with details: ' + book);
        return book.dataValues;
    }

    fetchUser = (usernameObj) => {
        return this.db.any('SELECT * FROM users WHERE username = $1', usernameObj.username);
    }

    getAuthenticationToken = (details) => {
        return this.checkDetails(details)
            .then(this.generateAuthenticationToken)
            .then((authToken) => {return {token: authToken}})
    }

    generateAuthenticationToken = (details) => {
        return jwt.sign({username: details.username}, "secretBookishKey");
    }

    checkDetails = (details) => {
        logger.info("Checking credentials")
        return this.addHashedPasswordToDetails(details).then(this.checkCredentials)
    }

    checkCredentials = (details) => {
        return this.db.any('SELECT * FROM users WHERE username = $1 AND hashedpassword = $2', [details.username, details.password])
            .then((data) => {
                if(data.length === 0) {
                    logger.warn("Incorrect credentials supplied")
                    console.log(details.password)
                    throw "Incorrect credentials"
                }
                    return details;
            })
    }

    addHashedPasswordToDetails = (details) => {
        details.password = md5.default(details.password);
        logger.info("Successfully hashed password");
        return Promise.resolve(details);
    }
}
