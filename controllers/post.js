const status  = require('http-status');
const { models, db} = require('../models/index');
const { getAllComments } = require('./comment');
const { sequelize } = require('sequelize');

exports.createPost = async (req, res) => {
  try { 
    const post = models.post.build({ 
      ...req.body 
    });
    await post.save();
    return res.status(status.CREATED).json({ message: 'objet enregistré !'});
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error })
  }
};

exports.modifyPost = async (req, res) => {
  try {
    const post = await models.post.findOne({
      where: {
        id: req.params.id
      }
    });
    const postToManipulate = post.get({ plain: true });
    if (req.userId === postToManipulate.employee_id) {
      post.content = req.body.content;
      await post.save();
      return res.status(status.OK).json({ message: 'Objet modifié!'})
    } else {
        throw 'pas authorisé pour cet utilisateur!'; 
    }
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error });
  };
};

exports.getOnePost = async (req, res) => {
  try {
    const post = await models.post.findOne({
      where: {
        id: req.params.id
      }
    });
    return res.status(status.OK).json(post);
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error })
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await models.post.findAll({
      include: [{
        model: models.employee,
        attributes: ['last_name', 'first_name', 'photo']
      }, {
        model: models.like
      }, {
        model: models.comment,
        attributes: ['id']
      }]
    });
    return res.status(status.OK).json(posts);
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await models.post.findOne({
      where: {
        id: req.params.id
      }
    });
    const postToManipulate = post.get({ plain: true });
    if (req.userId === postToManipulate.employee_id || req.userIsAdminer) {
      await post.destroy();
      return res.status(status.OK).json({ message: 'post supprimé!' });
    } else {
        throw 'pas authorisé pour cet utilisateur!'; 
    }
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ error })
  }
};
