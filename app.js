const express = require('express');
const morgan = require('morgan');
const UserRouter = require('./routes/User');
const BookRouter = require('./routes/Book');
const FavoritesRouter = require('./routes/Favorite');


const app = express();
app.use(morgan('combined'));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Retourner un statut 200 pour les requêtes prévol
    }
    next();
});


app.use('/api/books', BookRouter);
app.use('/api/favorites', FavoritesRouter);
app.use('/api/users', UserRouter);

module.exports = app;
