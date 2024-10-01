const sql = require('mysql2/promise');
const dbconf = require('../database/connection');

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

exports.GetOneFavorite = async (req, res, next) => {

    const user_id = req.params.id;

    if(!user_id){
        return res.status(404).send({error: 'Missing information'});
    }

    try{
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('SELECT books.* FROM books JOIN favorites ON books.book_id = favorites.book_id WHERE favorites.user_id = ?',[user_id]);
        await connection.end();
        return res.status(200).json(result);
    }catch (error){
        return res.status(400).json({message:error});
    }

}

exports.CreateFavorite = async (req, res, next) => {

    const {user_id, book_id} = req.body;

    if(!user_id || !book_id){
        return res.status(400).json({message:'missing information'})
    }

    try {
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('INSERT INTO favorites (user_id, book_id) VALUES (? , ?)', [user_id, book_id]);
        await connection.end();
        return res.status(200).json(result);
    }catch (error){
        return res.status(400).json({message:error});
    }

}

exports.UpdateFavorite = async (req, res, next) => {
    const id = req.params.id;
    const { user_id, book_id } = req.body;

    if(!user_id || !book_id || !id){
        return res.status(400).json({message:'missing information'})
    }

    try {
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('UPDATE favorites SET user_id = ?, book_id = ? WHERE favorite_id = ?',[user_id, book_id, id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        return res.status(200).json(result);
    }catch (error){
        return res.status(400).json({message:error});
    }




}
exports.DeleteFavorite = async (req, res, next) => {

    const book_id = req.params.id;
    const user_id = req.auth.userId;

    if(!book_id || !user_id){
        return res.status(400).json({message:'missing information'});
    }

    try {

        const connection = await sql.createConnection(dbconf)
        const [result] = await connection.execute('DELETE FROM favorites WHERE book_id = ? AND user_id = ?', [book_id, user_id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        return res.status(200).send('Utilisateur supprimé');

    }catch (err){
        return res.status(400).send({error: err});
    }


}
