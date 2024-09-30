const sql = require('mysql2/promise');
const dbconf = require('../database/connection');

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