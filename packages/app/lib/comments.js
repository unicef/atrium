const Comment = require('../models/Comment')

exports.createNewComment = async comment => {
  const newComment = new Comment({
    ...comment,
    date: Date.now()
  })
  const savedComment = await newComment.save()
  return savedComment
}
