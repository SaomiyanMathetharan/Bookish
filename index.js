import log4js from 'log4js';
import express from 'express';
import pgPromise from "pg-promise";

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
db.any('SELECT * FROM loans')
    .then((data) => {
        console.log('DATA:', data)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    })
/*
var app = express();
const port = 3000

app.listen(port, () => {
    console.log("Server running on port" + port)
})

app.get("/", async (req, res) => {

}) */