import log4js from 'log4js';
import express from 'express';
import {findBookByTitle, findBookByAuthor, getAllBooks, getAuthenticationToken} from "./api.js";
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

configurePassport()

const app = express();
app.use(passport.initialize());
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    logger.info('App initialised, listening on port ' + port);
    console.log("Server running on port " + port)
})

app.get('/books', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        getAllBooks()
            .then((result) => res.send(result))
            .catch((error) => {
                console.log(error);
                res.status(500).send(error);
        });
});

app.get('/findBookByTitle', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        findBookByTitle(req.query.booktitle)
            .then((result) => res.send(result))
            .catch((error) => {
                console.log(error);
                res.status(500).send(error);
            });
    });

app.get('/findBookByAuthor', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        findBookByAuthor(req.query.author)
            .then((result) => res.send(result))
            .catch((error) => {
                console.log(error);
                res.status(500).send(error);
            });
    });

app.get("/login", (req, res) => {
    getAuthenticationToken(req.body).then((tokenObject) => res.json(tokenObject));
})