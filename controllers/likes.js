const File = require('../models/file');
let i;

function addLike(req, res, next) {
  File
    .findById(req.params.id)
    .exec()
    .then(file => {
      req.body.likedBy = req.user.userId;

      if (file.likes.length > 0) {
        for (i = 0; i < file.likes.length; i++ ) {
          if (String(file.likes[i].likedBy) === String(req.user.userId)) {
            file.likes[i].remove();
            file.save();
            return res.status(200).json({ file });
          }
        }
      } else if (file.likes.length === 0 ) {
        file.likes.push(req.body);
        file.save();
        return res.status(200).json({ file });
      }
    })
    .catch(next);
}

module.exports = {
  new: addLike
};