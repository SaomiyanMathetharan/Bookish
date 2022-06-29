CREATE TABLE users (
                       username VARCHAR (50) PRIMARY KEY UNIQUE,
                       first_name VARCHAR (50),
                       last_name VARCHAR (50),
                       email VARCHAR (50) UNIQUE NOT NULL,
                       hashedPassword VARCHAR (32) NOT NULL
);

CREATE TABLE books (
                       bookID INTEGER PRIMARY KEY UNIQUE,
                       isbn VARCHAR (13) NOT NULL,
                       bookTitle VARCHAR (100) NOT NULL,
                       author VARCHAR (100) NOT NULL,
                       genre VARCHAR (50)
);

CREATE TABLE copiesOfBook (
                              barcodeNumber VARCHAR(13) PRIMARY KEY UNIQUE,
                              bookid INTEGER NOT NULL,
                              CONSTRAINT copiesOfBook_fkey FOREIGN KEY (bookid) REFERENCES books
);

CREATE TABLE loans (
                       loanid INTEGER PRIMARY KEY UNIQUE,
                       dueDate DATE NOT NULL,
                       loanStatus VARCHAR (50) NOT NULL,
                       barcodeNumber VARCHAR (13) NOT NULL,
                       username VARCHAR (50) NOT NULL,
                       CONSTRAINT barcode_fkey FOREIGN KEY (barcodeNumber) REFERENCES copiesOfBook,
                       CONSTRAINT username_fkey FOREIGN KEY (username) REFERENCES users

);

GRANT SELECT, INSERT, UPDATE on ALL TABLES IN SCHEMA public TO bookish;

INSERT INTO users VALUES ('SaoMat', 'Saomiyan', 'Mathetharan', 'sao@sao.com', 'deb1536f480475f7d593219aa1afd74c');
INSERT INTO users VALUES ('RebWoo','Bex', 'Wood', 'bex@bex.com', 'c8a93833472c9fbf4ee5b0192543a5ae');
INSERT INTO books VALUES (1, '9780333791035', 'The Great Gatsby', 'Fitzgerald');
INSERT INTO books VALUES (2, '9780007525492', 'The Hobbit', 'JRR Tolkien');
INSERT INTO copiesofbook VALUES ('1234567890', 1);
INSERT INTO loans VALUES (1, date '2022-06-28', 'BORROWED', '1234567890', 'SaoMat');
