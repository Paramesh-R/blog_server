const express = require('express')
const router = express.Router();


// Controller Imports
const { getAllPost,  viewPost,
    createNewPost, updatePost, deletePost,
    comment, unComment } = require('../controller/postController')


// Blog Post Route Handler
router.get('/', getAllPost)
router.get('/:id', viewPost)
router.post('/', createNewPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)


// Comments Route
router.put('/:id/comment', comment)
router.put('/uncomment', unComment)

// Exports
module.exports = router;


