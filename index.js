import log4js from 'log4js';
import express from 'express';
import pgPromise from "pg-promise";
import API from "./api.js";
import { question } from "readline-sync";
import axios from "axios";

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
app.use(express.json())
const port = 3000

app.listen(port, () => {
    console.log("Server running on port " + port)
})

app.get("/", async (req, res) => {
    api.getAllBooks()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
})

app.post("/details", (req, res) => {
    res.json(req.body);
})

const username = question("Enter username:");
const password = question("Enter password:");
const data = await axios.post('http://localhost:3000/details', {
    username: username, password: password
}).then(res=>res.data);
console.log(data);


api.checkForUser({
    username: 'SaoMat', password: 'thisIsHashed'
})

