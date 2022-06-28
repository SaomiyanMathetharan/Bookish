import log4js from 'log4js';
import express from 'express';
import pgPromise from "pg-promise";
import Book from "./models/book.js";

log4js.configure( {
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'warn'}
    }
})
const pgp = pgPromise({schema: "public"})
const db = pgp('postgres://bookish:bookish@localhost:5432/bookish');

function getAllBooks(){
    let catalogue = []
    return db.any('SELECT * FROM books')
        .then ((data)=>{
            for(let book of data){
                catalogue = addBookToCatalogue(book, catalogue)
            }
            return catalogue;
        })
}

function addBookToCatalogue(book, catalogue){
    catalogue.push(new Book(book.bookid, book.isbn, book.booktitle, book.author, book.genre));
    return catalogue;
}


var app = express();
const port = 3000

app.listen(port, () => {
    console.log("Server running on port" + port)
})

app.get("/", async (req, res) => {
    getAllBooks()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
})

