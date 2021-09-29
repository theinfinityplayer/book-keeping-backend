// MAIN BACKEND FILE
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

const express = require("express");
const app = express();
app.use(express.json());

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://akash_shukla:akashshukla506@cluster0.uu9ix.mongodb.net/book-company?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://nikhil_agarwal:p5nfHZEoRnTA2VGb@cluster0.arwlh.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const bcollection = client.db("book-company").collection("books").findOne({ISBN: "1234Three"});
//     bcollection.then((data)=>console.log(data)).catch((err)=>console.log(err));
// });
// client.close();


// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE:");
//     databasesList.databases.forEach(db=>console.log(db.name));
// }
// async function main() {
//     const uri = "mongodb+srv://nikhil_agarwal:p5nfHZEoRnTA2VGb@cluster0.arwlh.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN: "1234Three"});
//         console.log(result);
//         // await listDatabases(client);
//     }
//     catch(err) {
//         console.log(err);
//     }
//     finally {
//         await client.close();
//     }
// }
// main();


// http://localhost:2000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});

// http://localhost:2000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// http://localhost:2000/book-isbn/1234Three
app.get("/book-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    // console.log(getSpecificBook);
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
});

// http://localhost:2000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    // console.log(req.params);
    const {category} = req.params;
    // console.log(isbn);
    const getSpecificBooks = await BookModel.find({category:category});
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBooks.length===0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

// http://localhost:2000/authors
app.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// http://localhost:2000/author-id/1
app.get("/author-id/:id", async (req, res) => {
    // console.log(req.params);
    const {id} = req.params;
    // console.log(id);
    const getSpecificAuthor = await AuthorModel.findOne({id: id});
    // console.log(getSpecificAuthor);
    if(getSpecificAuthor===null) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:2000/author-isbn/12One
app.get("/author-isbn/:isbn", async (req, res) => {
   // console.log(req.params);
   const {isbn} = req.params;
   // console.log(isbn);
   const getSpecificAuthors = await AuthorModel.find({books:isbn});
   // console.log(getSpecificAuthors);
   // console.log(getSpecificAuthors.length);
   if(getSpecificAuthors.length===0) {
       return res.json({"error": `No Authors found for the book of ${isbn}`});
   }
   return res.json(getSpecificAuthors);
});

// http://localhost:2000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

// http://localhost:2000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {
   
});



// http://localhost:2000/book
app.post("/book", async (req, res) => {
    // console.log(req.body);
    const addNewBook = await BookModel.create(req.body);
    return res.json( {bookAdded: addNewBook, message: "Book was added !!!"} );
});

// http://localhost:2000/author
app.post("/author", async (req, res) => {
    // console.log(req.body);
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json( {authorAdded: addNewAuthor, message: "Author was added !!!"} );
});

// http://localhost:2000/publication
app.post("/publication", (req, res) => {
});



// http://localhost:2000/book-update/123Two
app.put("/book-update/:isbn", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new: true});
    return res.json( {bookUpdated: updateBook, message: "Book was updated !!!"} );
});

// http://localhost:2000/author-update/1
app.put("/author-update/:id", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {id} = req.params;
    const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, req.body, {new: true});
    return res.json( {authorUpdated: updateAuthor, message: "Author was updated !!!"} );
});

// http://localhost:2000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
});


// http://localhost:2000/book-delete/12345ONE
app.delete("/book-delete/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN: isbn});
    return res.json( {bookDeleted: deleteBook, message: "Book was Deleted !!!"} );
});

// http://localhost:2000/book-author-delete/12One/1
app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
    // console.log(req.params);
    const {isbn, id} = req.params;
    let getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    else {
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new: true});
        return res.json( {bookUpdated: updateBook, message: "Author was Deleted from the Book !!!"} );
    }
});

// http://localhost:2000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", (req, res) => {
});

// http://localhost:2000/author-delete/12345ONE
app.delete("/author-delete/:id", (req, res) => {
});

// http://localhost:2000/publication-delete/12345ONE
app.delete("/publication-delete/:id", (req, res) => {
});

app.listen(2000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});