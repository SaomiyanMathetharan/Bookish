import Book from "./models/book.js";
import pgPromise from "pg-promise";
import md5 from "md5-hash";

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

    //doRequest = (path) =>
    createBook (book){
        return new Book(book.bookid, book.isbn, book.booktitle, book.author, book.genre);
    }

    checkDetails = (details) => {
        return this.addHashedPasswordToDetails(details).then(this.checkForPassword)
    }

    checkForPassword = (details) => {
        return this.db.any('SELECT * FROM users WHERE username = $1 AND hashedpassword = $2', [details.username, details.password])
            .then((data) => {
                if(data.length === 0) {
                    console.log(details.password)
                    throw "Incorrect credentials"
                }
                    return details;
            })
    }

    addHashedPasswordToDetails = (details) => {
        details.password = md5.default(details.password);
        return Promise.resolve(details);
    }
}
