import md5 from "md5-hash";
import log4js from "log4js";
import jwt from "jsonwebtoken";
import { books, copiesofbook, loans, users } from './database/database.js';

const logger = log4js.getLogger('api.js');

export default class API {

    constructor() {
    }

    getAllBooks() {
        logger.info('Getting list books from database');
        return books.findAll()
            .then ((data)=>{
                return data.map(book => this.createBook(book))
            })
    }

    createBook (book){
        logger.trace('Creating book object with details: ' + book);
        return book.dataValues;
    }

    fetchUser = (usernameObj) => {
        return users.findOne({where: {username: usernameObj.username}});
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
        return users.findOne({where: {username: details.username, hashedpassword: details.password}})
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
