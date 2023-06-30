const {selectedDeletedComment} = require('../models/comment.models');

exports.deletedComment = (req, res, next) => {
    const {comment_id} = req.params
selectedDeletedComment(comment_id).then((data)=>{
    res.status(204).send({comment: data})
}).catch((err) => {
    next(err)
})
}