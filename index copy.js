// COPY OF BACKEND FILE

const db = require("./database");
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");

const app = express();

app.use(express.json());

// http://localhost:2000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});

// http://localhost:2000/books
app.get("/books", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});

// http://localhost:2000/book-isbn/12345Two
app.get("/book-isbn/:isbn", (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook.length===0) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
});

// http://localhost:2000/book-category/programming
app.get("/book-category/:category", (req, res) => {
    // // console.log(req.params);
    const {category} = req.params;
    // // console.log(isbn);
    const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    // // console.log(getSpecificBook);
    // // console.log(getSpecificBook.length);
    if(getSpecificBooks.length===0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

// http://localhost:2000/authors
app.get("/authors", (req, res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});

// http://localhost:2000/author/1
app.get("/author/:id", (req, res) => {
    // console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    // console.log(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    // console.log(getSpecificAuthor);
    // console.log(getSpecificAuthor.length);
    if(getSpecificAuthor.length===0) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor[0]);
});

// http://localhost:2000/author/12345Two
app.get("/author/:isbn", (req, res) => {
   
});

// http://localhost:2000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

// http://localhost:2000/publications-isbn/12345Two
app.get("/publications-isbn/:isbn", (req, res) => {
    // console.log(req.params);
    let {isbn} = req.params;
    // console.log(isbn);
    const getSpecificPublication = db.publications.filter((publication) => publication.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificPublication.length===0) {
        return res.json({"error": `No Publication found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificPublication[0]);
});



//http://localhost:2000/book
app.post("/book", (req,res) => {
    //console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);
});

//http://localhost:2000/author
app.post("/author", (req,res) => {
    //console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors);
});

// http://localhost:2000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book) => {
        if(book.ISBN === isbn) {
            console.log({...book, ...req.body})
            return {...book, ...req.body};
        }
        return book;
    })
    return res.json(db.books);
});

// http://localhost:2000/author-update/1
app.put("/author-update/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const {id} = req.params;
    db.authors.forEach((author) => {
        if(author.ID === id) {
            console.log({...author, ...req.body})
            return {...author, ...req.body};
        }
        return author;
    })
    return res.json(db.authors);
});

// http://localhost:2000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const {id} = req.params;
    db.publications.forEach((publication) => {
        if(publication.ID === id) {
            console.log({...publication, ...req.body})
            return {...publication, ...req.body};
        }
        return publication;
    })
    return res.json(db.publications);
});


// http://localhost:2000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req, res)  => {
    console.log(req.params);
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) =>  book.ISBN!==isbn); 
    console.log(filteredBooks);
    db.books = filteredBooks;
    return res.json(db.books);
});

// http://localhost:2000/author-delete/1
app.delete("/author-delete/:id", (req, res) => {
    console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    const filteredAuthors = db.authors.filter((author) =>  author.ID!==id); 
    console.log(filteredAuthors);
    db.authors = filteredAuthors;
    return res.json(db.authors);
});

// http://localhost:2000/publication-delete/1
app.delete("/publication-delete/:id", (req, res) => {
    console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    const filteredPublications = db.publications.filter((publication) =>  publication.ID!==id); 
    console.log(filteredPublications);
    db.publications = filteredPublications;
    return res.json(db.publications);
});

// http://localhost:2000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req, res) => {
    console.log(req.params);
    let {isbn, id} = req.params;
    id = Number(id);
    db.books.forEach((book) =>  {
        if(book.ISBN === isbn) {
            if(!book.authors.includes(id)) {
                return;
            }
            book.authors = book.authors.filter((author) => author!==id);
            return book;
        }
        return book;
    }); 
    return res.json(db.books);
});

// http://localhost:2000/author-book-delete/1/12345Two
app.delete("/author-book-delete/:id/:books", (req, res) => {
    console.log(req.params);
    let {id, books} = req.params;
    
    id = Number(id);
    db.authors.forEach((author) =>  {
        if(author.ID === id) {
            if(!author.books.includes(books)) {
                return;
            }
            author.books = author.books.filter((book) => book!==books);
            return author;
        }
        return author;
    }); 
    return res.json(db.authors);
});


app.listen(2000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});