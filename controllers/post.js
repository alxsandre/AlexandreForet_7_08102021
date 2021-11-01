const status  = require('http-status');
const db = require('../models/index');
const fs = require('fs');

exports.createPost = async (req, res) => {
  const dateCreated = new Date;
  try { 
    const post = db.post.build({ 
      date_created: dateCreated,
      ...req.body 
    });
    await post.save();
    return res.status(status.CREATED).json({ message: 'objet enregistré !'});
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error })
  }
};

exports.modifyPost = async (req, res) => {
  const dateCreated = new Date;
  try {
    const post = await db.post.findOne({
      where: {
        id: req.params.id
      }
    });
    post.content = req.body.content;
    post.date_updated = dateCreated;
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
    const posts = await db.post.findAll();
    return res.status(status.OK).json(posts);
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error });
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

exports.modifySauce = async (req, res, next) => {
    try {
      if (req.file) {
        const sauceObject = {...JSON.parse(req.body.sauce), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
        const sauce =  await Sauce.findOne({ _id: req.params.id })
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
          await Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
          return res.status(status.OK).json({ message: 'Objet modifié!'})
        });
      } else {
        await Sauce.updateOne({ _id: req.params.id }, { ...req.body , _id: req.params.id})
        return res.status(status.OK).json({ message: 'Objet modifié!'})
      }
    } catch (error) {
      return res.status(status.NOT_FOUND).json({ error });
    };
  };

exports.deleteSauce = async (req, res, next) => {
  try {
    const sauce =  await Sauce.findOne({ _id: req.params.id })
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, async () => {
      await Sauce.deleteOne({ _id: req.params.id });
      return res.status(status.OK).json({ message: 'Objet supprimé !' });
    });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ error })
  }
};

exports.getOneSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id })
    return res.status(status.OK).json(sauce);
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error })
  }
};

exports.getAllSauces = async (req, res, next) => {
  try { 
    const sauces = await Sauce.find();
    return res.status(status.OK).json(sauces);
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ error });
  }
};
*/
