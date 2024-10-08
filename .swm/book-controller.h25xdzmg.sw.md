---
title: Book controller
---
# Introduction

This document will walk you through the implementation of the Book controller feature.

The feature provides CRUD operations for managing books in the database.

We will cover:

1. Fetching all books.
2. Fetching a single book by ID.
3. Creating a new book.
4. Updating an existing book.
5. Deleting a book by ID.

# Fetching all books

<SwmSnippet path="/controllers/Book.js" line="4">

---

The <SwmToken path="/controllers/Book.js" pos="4:2:2" line-data="exports.GetAllBook = async (req, res, next) =&gt; {">`GetAllBook`</SwmToken> function retrieves all books from the database. It establishes a connection, executes a query to fetch all records from the <SwmToken path="/controllers/Book.js" pos="8:22:22" line-data="        const [row] = await connection.execute(&#39;SELECT * FROM books&#39;);">`books`</SwmToken> table, and returns the result as a JSON response.

```
exports.GetAllBook = async (req, res, next) => {

    try {
        const connection = await sql.createConnection(dbconf);
        const [row] = await connection.execute('SELECT * FROM books');
        await connection.end();
        res.status(200).json(row);
    }catch (err){
        res.status(500).send({})
    }

}
```

---

</SwmSnippet>

# Fetching a single book by ID

<SwmSnippet path="/controllers/Book.js" line="17">

---

The <SwmToken path="/controllers/Book.js" pos="17:2:2" line-data="exports.GetOneBook = async (req, res, next) =&gt; {">`GetOneBook`</SwmToken> function retrieves a single book based on the provided ID. It first checks if the ID is present in the request parameters. If not, it returns a 404 error. Otherwise, it fetches the book from the database and returns it as a JSON response.

```
exports.GetOneBook = async (req, res, next) => {
    const id = req.params.id;

    try {
        if(!id){
            return res.status(404).send({error: 'Missing information'});
        }

        const connection = await sql.createConnection(dbconf)
        const [row] = await connection.execute('SELECT * FROM books WHERE book_id = ?', [id]);
        await connection.end();
        res.status(200).json(row);

    }catch (err){
        res.status(400).send({error: err});
    }


}
```

---

</SwmSnippet>

# Creating a new book

<SwmSnippet path="/controllers/Book.js" line="37">

---

The <SwmToken path="/controllers/Book.js" pos="37:2:2" line-data="exports.CreateBook = async (req, res, next) =&gt; {">`CreateBook`</SwmToken> function adds a new book to the database. It validates the required fields from the request body. If any field is missing, it returns a 400 error. Otherwise, it inserts the new book into the database and returns a success message.

```
exports.CreateBook = async (req, res, next) => {
    const { title, author, cover_image, category, summary, isbn, price } = req.body;



    if(!title || !author || !cover_image || !category || !summary || !isbn){
        res.status(400).json({message:"missing information"});
    }else{
        try {
            const connection = await sql.createConnection(dbconf);
            const [result] = await connection.execute(
                'INSERT INTO books (title, author, cover_image, category, summary, isbn, price) VALUES( ?, ?, ?, ?, ?, ?, ?)',
                [title, author, cover_image, category, summary, isbn, price]
            )

            await connection.end();
            res.status(200).json({message:"book created successfully."});
        }catch (error){
            res.status(400).json({message:error});
        }



    }


}
```

---

</SwmSnippet>

# Updating an existing book

<SwmSnippet path="/controllers/Book.js" line="65">

---

The <SwmToken path="/controllers/Book.js" pos="65:2:2" line-data="exports.UpdateBook = async (req, res, next) =&gt; {">`UpdateBook`</SwmToken> function updates an existing book based on the provided ID. It validates the required fields and the ID from the request body. If any field or the ID is missing, it returns a 400 error. Otherwise, it updates the book in the database and returns a success message. If no rows are affected, it returns a 404 error indicating the book was not found.

```
exports.UpdateBook = async (req, res, next) => {

    const id = req.params.id;
    const { title, author, cover_image, category, summary , isbn, price} = req.body;



    if(!title || !author || !cover_image || !category || !summary || !isbn || !id){
        res.status(400).json({message:"missing information"});
    }else{
        try {
            const connection = await sql.createConnection(dbconf);
            const [result] = await connection.execute(
                'UPDATE books SET title = ?, author = ?, cover_image = ?, category = ?, summary = ?, isbn = ?, price = ? WHERE book_id = ?',
                [title, author, cover_image, category, summary, isbn, price, id]
            );


            await connection.end();
            if (result.affectedRows === 0) {
                return res.status(404).send('User not found');
            }
            res.status(200).json({message:"Book updated successfully."});
        }catch (error){
            res.status(400).json({message:error});
        }



    }

}
```

---

</SwmSnippet>

# Deleting a book by ID

<SwmSnippet path="/controllers/Book.js" line="97">

---

The <SwmToken path="/controllers/Book.js" pos="97:2:2" line-data="exports.DeleteBook = async (req, res, next) =&gt; {">`DeleteBook`</SwmToken> function deletes a book based on the provided ID. It checks if the ID is present in the request parameters. If not, it returns a 400 error. Otherwise, it deletes the book from the database and returns a success message. If no rows are affected, it returns a 404 error indicating the book was not found.

```
exports.DeleteBook = async (req, res, next) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).json({message:"missing information"});
    }

    try {

        const connection = await sql.createConnection(dbconf)
        const [result] = await connection.execute('DELETE FROM books WHERE book_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        res.status(200).send('Utilisateur supprimé');

    }catch (err){
        res.status(400).send({error: err});
    }
}
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXBpX2Jvb2syJTNBJTNBTWFlbC1DYXM=" repo-name="api_book2"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
