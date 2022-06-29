import log4js from 'log4js';
import express from 'express';
import API from "./api.js";
import { question } from "readline-sync";
import axios from "axios";
import passport from "passport";
import configurePassport from "./config/passport.js";

log4js.configure( {
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'warn'}
    }
})

const logger = log4js.getLogger('index.js');

const api = new API();

configurePassport(passport, api)

const app = express();
app.use(passport.initialize());
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    logger.info('App initialised, listening on port ' + port);
    console.log("Server running on port " + port)
})

app.get("/", async (req, res) => {
    logger.info("Get request for / received, sending catalogue");
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

//const username = question("Enter username:");
//const password = question("Enter password:");
/*
const data = await axios.post('http://localhost:3000/details', {
    username: username, password: password
}).then(res=>res.data);
console.log(data);
*/
const details = {
    username: 'RebWoo', password: 'thisIsHashed'
}

//console.log(await api.checkDetails(details).catch((error) => console.log(error)))


app.post("/login", (req, res) => {
    api.getAuthenticationToken(req.body).then((tokenObject) => res.json(tokenObject));
})
