const sql = require('mysql2/promise');
const dbconf = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.GetAllUser = async (req, res, next) => {

    try {

        const connection = await sql.createConnection(dbconf)
        const [row] = await connection.execute('SELECT * FROM users');
        await connection.end();
        res.status(200).json(row);

    }catch (err){
        console.log(err)
        res.status(400).send({err});
    }

}

exports.GetOneUser = async (req, res, next) => {

    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:'missing information'});
    }

    try {

        const connection = await sql.createConnection(dbconf)
        const [row] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        await connection.end();
        res.status(200).json(row);

    }catch (err){
        res.status(400).send({error: err});
    }



}

exports.CreateUser = async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.role;




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
        }catch (error){
            res.status(400).json({message:error});
        }



    }


}

exports.UpdateUser = async (req, res, next) => {

    const id = req.params.id;
    const {email, password , username, role} = req.body;
    if (!username || !email || !password || !role ||!id) {
        return res.status(400).send('Missing information');
    }else{

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

            res.status(200).send('User updated successfully');

        }catch (err){
            res.status(400).send({error: err});
        }


    }



}
exports.DeleteUser = async (req, res, next) => {

    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:'missing information'});
    }

    try {

        const connection = await sql.createConnection(dbconf)
        const [result] = await connection.execute('DELETE FROM users WHERE user_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User deleted successfully');

    }catch (err){
        res.status(400).send({error: err});
    }


}

exports.LoginUser = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).send('Missing information');
    }


    try {
        const connection = await sql.createConnection(dbconf);
        const [result] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);


        await connection.end();

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




    }catch (error){
        res.status(400).json({error})
    }

}
