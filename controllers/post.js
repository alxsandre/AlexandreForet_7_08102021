const status  = require('http-status');
const db = require('../models/index');
const { getAllComments } = require('./comment');
const { sequelize } = require('sequelize');

exports.createPost = async (req, res) => {
  try { 
    const post = db.post.build({ 
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
    const post = await db.post.findOne({
      where: {
        id: req.params.id
      }
    });
    post.content = req.body.content;
    await post.save();
    return res.status(status.OK).json({ message: 'Objet modifié!'})
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error });
  };
};

exports.getOnePost = async (req, res) => {
  try {
    const post = await db.post.findOne({
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
    db.post.belongsTo(db.employee, {foreignKey: 'employee_id'});
    const posts = await db.post.findAll({
      include: {
        model: db.employee,
        attributes: ['last_name', 'first_name', 'photo']
      }
    });
    return res.status(status.OK).json(posts);
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const comment = await db.comment.findOne({
      where: {
        post_id: req.params.id,
      }
    });
    const post = await db.comment.findOne({
      where: {
        id: req.params.id,
      }
    });
    if (comment) {
      await db.comment.destroy({
        where: {
          post_id: req.params.id,
        }
      });
      await db.post.destroy({
        where: {
          id: req.params.id,
        }
      });
      return res.status(status.OK).json({ message: 'post et ses commentaires supprimés !' });
    } else if (post) {
      await db.post.destroy({
        where: {
          id: req.params.id,
        }
      });
      return res.status(status.OK).json({ message: 'post supprimé!' });
    } else {
      return res.status(status.OK).json({ message: 'post déjà supprimé!' });
    }
   
    /*
    db.post.hasMany(db.comment);
    db.comment.belongsTo(db.post);
    const post = await db.post.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: db.comment,
        where: {
          post_id: req.params.id
        }
      },
      raw: true,
      nest: true
    });
    */
    /*
    if (post.comments) {
      const comments = await db.comment.findAll({
        where: {
          post_id: req.params.id,
        }
      });
      return res.status(status.OK).json(comments);
    }
    */
    //await post.destroy();
    //return res.status(status.OK).json({ message: 'Objet supprimé !' });
    //return res.status(status.OK).json(post);
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ error })
  }
};
