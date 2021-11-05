const status  = require('http-status');
const db = require('../models/index');

exports.modifyLike = async (req, res) => {
  try {
    const like = await db.like.findOne({
      where: {
        employee_id: req.params.userId
      }
    });
    if (like) {
      await db.like.destroy({
        where: {
          employee_id: req.params.userId
        }
      });
      return res.status(status.OK).json({ message: 'Like supprimé!'});
    } else {
      const like = db.like.build({ 
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