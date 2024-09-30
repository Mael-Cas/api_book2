const express = require('express');
const UserRouter = require('./routes/User');
const BookRouter = require('./routes/Book');
const FavoritesRouter = require('./routes/Favorite');


const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/books', BookRouter);
app.use('/api/favorites', FavoritesRouter);
app.use('/api/users', UserRouter);

module.exports = app;
