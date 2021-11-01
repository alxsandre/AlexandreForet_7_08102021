const status  = require('http-status');
const db = require('../models/index');
const fs = require('fs');

exports.createComment = async (req, res) => {
  try { 
    const comment = db.comment.build({ 
      ...req.body 
    });
    await comment.save();
    return res.status(status.CREATED).json({ message: 'objet enregistré !'});
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error })
  }
};

exports.modifyComment = async (req, res) => {
  try {
    const comment = await db.comment.findOne({
      where: {
        id: req.params.id
      }
    });
    comment.content = req.body.content;
    await comment.save();
    return res.status(status.OK).json({ message: 'Objet modifié!'})
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error });
  };
};

exports.getAllComments = async (req, res) => {
    try {
      const comments = await db.comment.findAll({
        where: {
          post_id: req.params.id
        }
      });
      return res.status(status.OK).json(comments);
    } catch (error) {
      return res.status(status.BAD_REQUEST).json({ error });
    }
};

exports.deleteComment = async (req, res) => {
    try {
      const comment = await db.comment.findOne({
        where: {
          id: req.params.id
        }
      });
      await comment.destroy();
      return res.status(status.OK).json({ message: 'Objet supprimé !' });
    } catch (error) {
      return res.status(status.INTERNAL_SERVER_ERROR).json({ error })
    }
};