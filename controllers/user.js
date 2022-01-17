const status  = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models, db } = require('../models/index');

exports.signup = async (req, res) => {
    try {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(req.body.password)) {
            return res.status(status.UNAUTHORIZED).json({ error: 'password not secure'});
        }
        const email = await models.employee.findOne({
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
        const employee = models.employee.build({ 
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
        const user = await models.employee.findOne({
            where: {
              email: req.body.email
            }
          });
        if (!user) {
            return res.status(status.UNAUTHORIZED).json({ error: 'Utilisateur non trouvé!'});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(status.UNAUTHORIZED).json({ error: 'mot de passe incorrect!'});
        } 
        return res.status(status.OK).json({
            userId: user.id,
            isAdminer: user.is_adminer,
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


exports.modifyLogin = async (req, res) => {
    try {
        if (req.body.email) {
            const email = await models.employee.findOne({
                where: {
                  email: req.body.email
                }
              });
            if (email) {
                return res.status(status.UNAUTHORIZED).json({ error: 'identifiant non disponible!'});
            }
        }
        const user = await models.employee.findOne({
          where: {
            id: req.params.id
          }
        });
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashPassword;
        } 
        await user.save();
        return res.status(status.OK).json({ message: 'Objet modifié!'})
    } catch (error) {
        return res.status(status.NOT_FOUND).json({ error });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        await models.employee.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.status(status.OK).json({ message: 'profil supprimé!' });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error })
    }
};