const status  = require('http-status');
const { db, models } = require('../models/index');

exports.modifyLike = async (req, res) => {
  try {
    const like = await models.like.findOne({
      where: {
        employee_id: req.params.userId,
        post_id: req.params.postId
      }
    });
    if (like) {
      await models.like.destroy({
        where: {
          employee_id: req.params.userId,
          post_id: req.params.postId
        }
      });
      return res.status(status.OK).json({ message: 'Like supprimé!'});
    } else {
      const like = models.like.build({ 
        employee_id: req.params.userId,
        post_id: req.params.postId
      });
      await like.save();
      return res.status(status.CREATED).json({ message: 'like enregistré !'});
    }
  } catch (error) {
    return res.status(status.NOT_FOUND).json({ error });
  };
};