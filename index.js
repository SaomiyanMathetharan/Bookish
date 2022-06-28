import log4js from 'log4js';
import express from 'express';
import pgPromise from "pg-promise";
import API from "./api.js";

log4js.configure( {
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'warn'}
    }
})

let api = new API();

var app = express();
const port = 3000

app.listen(port, () => {
    console.log("Server running on port" + port)
})

app.get("/", async (req, res) => {
    api.getAllBooks()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
})
