const status  = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');

exports.signup = async (req, res) => {
    try {
        const email = await db.employee.findOne({
            where: {
              email: req.body.email
            }
          });
        if (email) {
            return res.status(status.UNAUTHORIZED).json({ error: 'email déjà utilisée!'});
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const dataEmployee = req.body;
        dataEmployee.password = hashPassword;
        const employee = db.employee.build({ 
            ...dataEmployee
        });
        await employee.save();
        return res.status(status.CREATED).json({ message: 'objet enregistré !'});
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({ error })
    }
};

exports.login = async (req, res) => {
    try {
        const user = await db.employee.findOne({
            where: {
              email: req.body.email
            }
          });
        if (!user) {
            res.status(status.UNAUTHORIZED).json({ error: 'Utilisateur non trouvé!'});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(status.UNAUTHORIZED).json({ error: 'mot de passe incorrect!'});
        } 
        res.status(status.OK).json({
            userId: user.id,
            token: jwt.sign(
                { userId: user.id },
                process.env.TOKEN,
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({ error })
    }
};
