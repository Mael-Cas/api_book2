const mysql = require('mysql2');
const dbconfig = require('./connection');


const connection = mysql.createConnection(dbconfig);

// Tester la connexion
connection.connect(function(err) {
    if (err) {
        console.error('Erreur de connexion :', err);
        return;
    }
    console.log('Connexion réussie à la base de données MySQL');

    // Fermer la connexion proprement
    connection.end();
});
