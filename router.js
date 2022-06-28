import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    getAllBooks()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
})
