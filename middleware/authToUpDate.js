const status  = require('http-status');
const { models } = require('../models/index');

module.exports = async (req, res, next) => {
    try {
        const userToUpDate = Number(req.params.id);
        if (req.userId === userToUpDate) {
            next();
        } else {
            throw 'pas authorisé pour cet utilisateur!'; 
        }
    } catch (error) {
        res.status(status.UNAUTHORIZED).json({ error: error || 'Requête non authentifiée' })
    }
};