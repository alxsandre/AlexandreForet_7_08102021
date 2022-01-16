const jwt = require('jsonwebtoken');
const status  = require('http-status');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        if (userId) {
            req.userId = userId;
            next();
        } else {
            throw 'User ID non valable !'; 
        }
    } catch (error) {
        res.status(status.UNAUTHORIZED).json({ error: error || 'Requête non authentifiée' })
    }
};