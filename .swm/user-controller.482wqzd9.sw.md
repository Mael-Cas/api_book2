---
title: User Controller
---
# Introduction

This document will walk you through the implementation of the User Controller feature.

The feature provides CRUD operations and login functionality for user management.

We will cover:

1. Fetching all users.
2. Fetching a single user by ID.
3. Creating a new user.
4. Updating an existing user.
5. Deleting a user.
6. User login.

# Fetching all users

<SwmSnippet path="/controllers/User.js" line="7">

---

The <SwmToken path="/controllers/User.js" pos="7:2:2" line-data="exports.GetAllUser = async (req, res, next) =&gt; {">`GetAllUser`</SwmToken> function retrieves all users from the database. It establishes a connection, executes a query to fetch all users, and returns the result as a JSON response.

```
exports.GetAllUser = async (req, res, next) => {

    try {

        const connection = await sql.createConnection(dbconf)
        const [row] = await connection.execute('SELECT * FROM users');
        await connection.end();
        res.status(200).json(row);
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="15">

---

Error handling is implemented to catch and log any errors that occur during the database operation.

```

    }catch (err){
        console.log(err)
        res.status(400).send({err});
    }

}
```

---

</SwmSnippet>

# Fetching a single user by ID

<SwmSnippet path="controllers/User.js" line="23">

---

The <SwmToken path="/controllers/User.js" pos="23:2:2" line-data="exports.GetOneUser = async (req, res, next) =&gt; {">`GetOneUser`</SwmToken> function retrieves a user by their ID. It first checks if the ID is provided, then queries the database for the user with the specified ID and returns the result.

```
exports.GetOneUser = async (req, res, next) => {

    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:'missing information'});
    }

```

---

</SwmSnippet>

<SwmSnippet path="controllers/User.js" line="30">

---

The database query is executed, and the result is returned as a JSON response. Error handling is also included.

```
    try {

        const connection = await sql.createConnection(dbconf)
        const [row] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        await connection.end();
        res.status(200).json(row);

    }catch (err){
        res.status(400).send({error: err});
    }
```

---

</SwmSnippet>

# Creating a new user

<SwmSnippet path="/controllers/User.js" line="45">

---

The <SwmToken path="/controllers/User.js" pos="45:2:2" line-data="exports.CreateUser = async (req, res, next) =&gt; {">`CreateUser`</SwmToken> function handles the creation of a new user. It extracts user details from the request body, validates them, hashes the password, and inserts the new user into the database.

```
exports.CreateUser = async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.role;

```

---

</SwmSnippet>

<SwmSnippet path="controllers/User.js" line="55">

---

If any required information is missing, it returns a 400 status with an error message. Otherwise, it proceeds with the database insertion.

```
    if(!username || !email || !password || !role){
        res.status(400).json({message:"missing information"});
    }else{
        try {
            const hashPassword = bcrypt.hashSync(password, 10);
            const connection = await sql.createConnection(dbconf);
            const [result] = await connection.execute(
                'INSERT INTO users (username, email, password, role) VALUES( ?, ?, ?, ?)',
                [username, email, hashPassword, role]
            )

            await connection.end();
            res.status(200).json({message:"User created successfully."});
```

---

</SwmSnippet>

<SwmSnippet path="controllers/User.js" line="68">

---

After successfully inserting the user, the connection is closed, and a success message is returned. Error handling is also included.

```
        }catch (error){
            res.status(400).json({message:error});
        }

```

---

</SwmSnippet>

# Updating an existing user

<SwmSnippet path="/controllers/User.js" line="79">

---

The <SwmToken path="/controllers/User.js" pos="79:2:2" line-data="exports.UpdateUser = async (req, res, next) =&gt; {">`UpdateUser`</SwmToken> function updates an existing user's details. It extracts the user ID and new details from the request, validates them, and updates the user in the database.

```
exports.UpdateUser = async (req, res, next) => {

    const id = req.params.id;
    const {email, password , username, role} = req.body;
    if (!username || !email || !password || !role ||!id) {
        return res.status(400).send('Missing information');
    }else{
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="86">

---

The database update query is executed, and the connection is closed. If no rows are affected, it returns a 404 status indicating the user was not found.

```

        try {

            const connection = await sql.createConnection(dbconf)
            const [result] = await connection.execute(
                'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE user_id = ?',
                [username, email, password, role, id]
            );
            await connection.end();
            if (result.affectedRows === 0) {
                return res.status(404).send('User not found');
            }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="98">

---

A success message is returned upon successful update. Error handling is also included.

```

            res.status(200).send('User updated successfully');

        }catch (err){
            res.status(400).send({error: err});
        }

```

---

</SwmSnippet>

# Deleting a user

<SwmSnippet path="/controllers/User.js" line="111">

---

The <SwmToken path="/controllers/User.js" pos="111:2:2" line-data="exports.DeleteUser = async (req, res, next) =&gt; {">`DeleteUser`</SwmToken> function deletes a user by their ID. It checks if the ID is provided, then deletes the user from the database.

```
exports.DeleteUser = async (req, res, next) => {

    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:'missing information'});
    }

    try {
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="119">

---

The database delete query is executed, and the connection is closed. If no rows are affected, it returns a 404 status indicating the user was not found.

```

        const connection = await sql.createConnection(dbconf)
        const [result] = await connection.execute('DELETE FROM users WHERE user_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="127">

---

A success message is returned upon successful deletion. Error handling is also included.

```

        res.status(200).send('User deleted successfully');

    }catch (err){
        res.status(400).send({error: err});
    }

```

---

</SwmSnippet>

# User login

<SwmSnippet path="/controllers/User.js" line="137">

---

The <SwmToken path="/controllers/User.js" pos="137:2:2" line-data="exports.LoginUser = async (req, res, next) =&gt; {">`LoginUser`</SwmToken> function handles user authentication. It extracts the email and password from the request body, validates them, and checks the credentials against the database.

```
exports.LoginUser = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).send('Missing information');
    }

```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="144">

---

The database query is executed, and the connection is closed. If the user is not found, it returns a 404 status.

```

    try {
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);


        await connection.end();
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="151">

---

Password comparison is done using bcrypt. If valid, a JWT token is generated and returned. Error handling is also included.

```

        if(!result){
            res.status(404).json({message:"user not found"});
        }
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if(!valid){
                    res.status(401).json({message: 'Invalid email or password'});
                }else{
                    res.status(201).json({
                        userId: result[0].user_id,
			role: result[0].role,
                        token: jwt.sign({userId: result[0].user_id, roles:result[0].role}, 'TOKEN', {expiresIn: '24h'})
                    });
                }
            })
            .catch(error => res.status(500).json({error}));
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="168">

---

Any errors during the process are caught and returned as a JSON response.

```




    }catch (error){
        res.status(400).json({error})
    }
```

---

</SwmSnippet>

# Conclusion

This document covered the implementation of the User Controller feature, detailing the design decisions and main points of each function. The feature provides comprehensive user management capabilities, including fetching, creating, updating, deleting, and authenticating users.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXBpX2Jvb2syJTNBJTNBTWFlbC1DYXM=" repo-name="api_book2"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
