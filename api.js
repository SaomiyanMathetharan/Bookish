import md5 from "md5-hash";
import log4js from "log4js";
import jwt from "jsonwebtoken";
import { books, copiesofbook, loans, users } from './database/database.js';

const logger = log4js.getLogger('api.js');

export function getAllBooks() {
    logger.info('Getting list books from database');
    return books.findAll()
        .then ((data)=>{
            return data.map(createBook)
        })
}

function createBook (book){
    logger.trace('Creating book object with details: ' + book);
    return book.dataValues;
}

export function findBookByTitle(bookTitle) {
    logger.info('Getting list books with title: '+bookTitle);
    return books.findAll({where: {booktitle: bookTitle}})
        .then ((data)=>{
            return data.map(createBook)
        })
}

export function findBookByAuthor(author) {
    logger.info('Getting list books with author: '+author);
    return books.findAll({where: {author: author}})
        .then ((data)=>{
            return data.map(createBook)
        })
}

export function countCopiesOfBook(details) {
    logger.info('Getting number of copies of books with title: '+details.title+' and author: '+details.author);
    return books.count({where: {author: details.author, booktitle: details.title}})
        .then((count) => {return {numberOfCopies: count}});
}

export function fetchUser(usernameObj)  {
    return users.findOne({where: {username: usernameObj.username}});
}

export function getAuthenticationToken(details) {
    return checkDetails(details)
        .then(generateAuthenticationToken)
        .then((authToken) => {return {token: authToken}})
}

function generateAuthenticationToken(details) {
    return jwt.sign({username: details.username}, "secretBookishKey");
}

function checkDetails(details) {
    logger.info("Checking credentials")
    return addHashedPasswordToDetails(details).then(checkCredentials)
}

function checkCredentials(details) {
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

function addHashedPasswordToDetails(details) {
    details.password = md5.default(details.password);
    logger.info("Successfully hashed password");
    return Promise.resolve(details);
}
