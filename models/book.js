/*
- PK: bookID
- ISBN
- bookTitle
- author
- genre
*/

export default class Book {
    constructor(bookID, ISBN, title, author, genre) {
        this.id = bookID;
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.genre = genre;
    }

    static getBookFromID(bookID) {

    }
}