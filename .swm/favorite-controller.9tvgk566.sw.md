---
title: Favorite Controller
---
# Introduction

This document will walk you through the implementation of the Favorite Controller feature.

The feature allows users to manage their favorite books. We will cover:

1. Retrieving all favorites.
2. Retrieving a specific favorite.
3. Creating a new favorite.
4. Updating an existing favorite.
5. Deleting a favorite.

# Retrieving all favorites

<SwmSnippet path="/controllers/Favorite.js" line="4">

---

We start by defining the <SwmToken path="/controllers/Favorite.js" pos="4:2:2" line-data="exports.GetAllFavorites = async (req, res, next) =&gt; {">`GetAllFavorites`</SwmToken> function. This function retrieves all favorite entries from the database.

```
exports.GetAllFavorites = async (req, res, next) => {

    try{

        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('SELECT * FROM favorites');
        await connection.end();
        return res.status(200).json(result);

    }catch(error){
        return res.status(500).json({error})
    }

}
```

---

</SwmSnippet>

# Retrieving a specific favorite

<SwmSnippet path="/controllers/Favorite.js" line="19">

---

Next, we define the <SwmToken path="/controllers/Favorite.js" pos="19:2:2" line-data="exports.GetOneFavorite = async (req, res, next) =&gt; {">`GetOneFavorite`</SwmToken> function. This function retrieves a specific favorite entry based on the user ID provided in the request parameters.

```
exports.GetOneFavorite = async (req, res, next) => {

    const user_id = req.params.id;

    if(!user_id){
        return res.status(404).send({error: 'Missing information'});
    }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Favorite.js" line="26">

---

The database query to fetch the specific favorite is executed here:

```

    try{
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('SELECT books.* FROM books JOIN favorites ON books.book_id = favorites.book_id WHERE favorites.user_id = ?',[user_id]);
        await connection.end();
        return res.status(200).json(result);
    }catch (error){
        return res.status(400).json({message:error});
    }
```

---

</SwmSnippet>

# Creating a new favorite

<SwmSnippet path="/controllers/Favorite.js" line="38">

---

The <SwmToken path="/controllers/Favorite.js" pos="38:2:2" line-data="exports.CreateFavorite = async (req, res, next) =&gt; {">`CreateFavorite`</SwmToken> function allows users to add a new favorite book. It checks for the presence of <SwmToken path="/controllers/Favorite.js" pos="40:4:4" line-data="    const {user_id, book_id} = req.body;">`user_id`</SwmToken> and <SwmToken path="/controllers/Favorite.js" pos="40:7:7" line-data="    const {user_id, book_id} = req.body;">`book_id`</SwmToken> in the request body.

```
exports.CreateFavorite = async (req, res, next) => {

    const {user_id, book_id} = req.body;

    if(!user_id || !book_id){
        return res.status(400).json({message:'missing information'})
    }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Favorite.js" line="45">

---

The database insertion logic is handled here:

```

    try {
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('INSERT INTO favorites (user_id, book_id) VALUES (? , ?)', [user_id, book_id]);
        await connection.end();
        return res.status(200).json(result);
    }catch (error){
        return res.status(400).json({message:error});
    }
```

---

</SwmSnippet>

# Updating an existing favorite

<SwmSnippet path="/controllers/Favorite.js" line="57">

---

The <SwmToken path="/controllers/Favorite.js" pos="57:2:2" line-data="exports.UpdateFavorite = async (req, res, next) =&gt; {">`UpdateFavorite`</SwmToken> function updates an existing favorite entry. It requires <SwmToken path="/controllers/Favorite.js" pos="59:5:5" line-data="    const { user_id, book_id } = req.body;">`user_id`</SwmToken>, <SwmToken path="/controllers/Favorite.js" pos="59:8:8" line-data="    const { user_id, book_id } = req.body;">`book_id`</SwmToken>, and <SwmToken path="/controllers/Favorite.js" pos="58:3:3" line-data="    const id = req.params.id;">`id`</SwmToken> to be present.

```
exports.UpdateFavorite = async (req, res, next) => {
    const id = req.params.id;
    const { user_id, book_id } = req.body;

    if(!user_id || !book_id || !id){
        return res.status(400).json({message:'missing information'})
    }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Favorite.js" line="64">

---

The database update operation is performed here:

```

    try {
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('UPDATE favorites SET user_id = ?, book_id = ? WHERE favorite_id = ?',[user_id, book_id, id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }
```

---

</SwmSnippet>

# Deleting a favorite

<SwmSnippet path="/controllers/Favorite.js" line="83">

---

Finally, the <SwmToken path="/controllers/Favorite.js" pos="83:2:2" line-data="exports.DeleteFavorite = async (req, res, next) =&gt; {">`DeleteFavorite`</SwmToken> function removes a favorite entry. It checks for the presence of <SwmToken path="/controllers/Favorite.js" pos="85:3:3" line-data="    const book_id = req.params.id;">`book_id`</SwmToken> in the request parameters and <SwmToken path="/controllers/Favorite.js" pos="86:3:3" line-data="    const user_id = req.auth.userId;">`user_id`</SwmToken> from the authenticated user.

```
exports.DeleteFavorite = async (req, res, next) => {

    const book_id = req.params.id;
    const user_id = req.auth.userId;

    if(!book_id || !user_id){
        return res.status(400).json({message:'missing information'});
    }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Favorite.js" line="91">

---

The database deletion logic is executed here:

```

    try {

        const connection = await sql.createConnection(dbconf)
        const [result] = await connection.execute('DELETE FROM favorites WHERE book_id = ? AND user_id = ?', [book_id, user_id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Favorite.js" line="101">

---

The response handling for successful deletion is done here:

```

        return res.status(200).send('Utilisateur supprimé');

    }catch (err){
        return res.status(400).send({error: err});
    }

```

---

</SwmSnippet>

This concludes the walkthrough of the Favorite Controller feature. Each function is designed to handle specific CRUD operations related to user favorites, ensuring data integrity and proper error handling.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXBpX2Jvb2syJTNBJTNBTWFlbC1DYXM=" repo-name="api_book2"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
