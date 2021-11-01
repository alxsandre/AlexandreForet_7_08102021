const status  = require('http-status');
const db = require('../models/index');
const fs = require('fs');

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
        model: db.employee
      }
    });
    return res.status(status.OK).json(posts);
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await db.post.findOne({
      where: {
        id: req.params.id
      }
    });
    await post.destroy();
    return res.status(status.OK).json({ message: 'Objet supprimé !' });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ error })
  }
};
/*
exports.modifyLike = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    let likes = sauce.likes;
    let dislikes = sauce.dislikes;
    const userId = req.body.userId;
    let usersLiked = sauce.usersLiked;
    let usersDisliked = sauce.usersDisliked;
    const userAlreadyLiked = usersLiked.includes(userId);
    const userAlreadyDisliked = usersDisliked.includes(userId);
    if ((req.body.like === 1 && userAlreadyLiked) || (req.body.like === -1 && userAlreadyDisliked)) { 
      return res.status(status.METHOD_NOT_ALLOWED).json({ message: 'interdit!!!'});
    }
    if (req.body.like === 1 && !userAlreadyLiked) {
      likes++;
      usersLiked = [...usersLiked, userId];
      if (userAlreadyDisliked) {
        dislikes--;
        usersDisliked = usersDisliked.filter(usersId => usersId !== userId);
      }
    } else if (!req.body.like) {
      if (userAlreadyLiked) {
        likes--;
        usersLiked = usersLiked.filter(usersId => usersId !== userId);
      } else if (userAlreadyDisliked) {
        dislikes--;
        usersDisliked = usersDisliked.filter(usersId => usersId !== userId);
      } else {
        return res.status(status.METHOD_NOT_ALLOWED).json({ message: 'interdit!!!'});
      }
    } else if (req.body.like === -1 && !userAlreadyDisliked) {
        dislikes++;
        usersDisliked = [...usersDisliked, userId];
        if (userAlreadyLiked) {
          likes--;
          usersLiked = usersLiked.filter(usersId => usersId !== userId);
        }
    };
    await Sauce.updateOne({ _id: req.params.id }, { likes, dislikes,  usersLiked, usersDisliked, _id: req.params.id})
    return res.status(status.OK).json({ message: 'Objet modifié!'});
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error });
  };
};

*/
