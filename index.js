const db = require("./database");
console.log(db.books);
console.log(db.authors);
console.log(db.publications);

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
})

app.get("/", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
})

app.listen(2000, () => {
    console.log("My Express app is running");
});