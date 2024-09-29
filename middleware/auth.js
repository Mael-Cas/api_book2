const jwt = require('jsonwebtoken')

exports.Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'TOKEN');
        const userId = decoded.id;
        req.auth = {
            userId: userId,
        };
        next();
    }catch (error){
        res.status(401).send({error})
    }
}


exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit : Admin requis' });
    }
    next(); // Si l'utilisateur est admin, on passe au middleware suivant
};

// Middleware pour les routes utilisateur
exports.user = (req, res, next) => {
    if (req.user.role !== 'user' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit : Utilisateur requis' });
    }
    next(); // Si l'utilisateur est user ou admin, on passe au middleware suivant
};