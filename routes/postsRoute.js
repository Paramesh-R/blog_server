const express = require('express')
const router = express.Router();


// Controller Imports
const { getAllPost,  viewPost,
    createNewPost, updatePost, deletePost,
    // createUpdatePost, getMyPosts,
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





// <===============================================>
// <====================LEGACY CODES===============>
// <===============================================>
// const Post = require('../models/postModel')
/*
router.get('/mypost', async (req, res) => {
    console.log("===== ===== =====>GET MY POSTS(START)<===== ===== =====")
    const username = req.body.username;
    console.log("Extracting posts of ", username)
    await Post.find({ author: username }).sort({ createdAt: -1 })
    .then(result => { res.status(200).send(result) })
    .catch(err => console.log("Error: Get All Post Error", err))
    console.log("===== ===== =====>GET MY POSTS(END)<===== ===== =====")
}) */


// <===============================================>
// <===============================================>



