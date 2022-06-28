import Book from "./models/book.js";
import pgPromise from "pg-promise";

export default class API {

    constructor() {
        const pgp = pgPromise({schema: "public"});
        this.db = pgp('postgres://bookish:bookish@localhost:5432/bookish');
    }

    getAllBooks() {
        return this.db.any('SELECT * FROM books')
            .then ((data)=>{
                return data.map(book => this.createBook(book))
            })
    }

    createBook(book){
        return new Book(book.bookid, book.isbn, book.booktitle, book.author, book.genre);
    }
}
