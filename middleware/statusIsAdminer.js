const status  = require('http-status');
const { models } = require('../models/index');

module.exports = async (req, res, next) => {
    try {
        const user = await models.employee.findOne({
            where: {
                id: req.userId
            }
        });
        const userToManipulate = user.get({ plain: true });
        req.userIsAdminer = userToManipulate.is_adminer;
        next();
    } catch (error) {
        res.status(status.UNAUTHORIZED).json({ error: error || 'Requête non authentifiée' })
    }
};