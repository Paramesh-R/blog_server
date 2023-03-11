const express = require('express')
const router = express.Router()


const Post = require('../models/postModel')
const mongoose = require('mongoose');


//delete existing comment from blog
router.delete('/:comment_id', (req, res) => {
    console.log("<================= Delete Comment API =================>")
    console.log(req.body.blog_id)
    console.log(req.body.comment_id)
    const filter = { _id: req.body.blog_id };
    Post.findOneAndUpdate(                                    //referred from mongoose
        filter,
        {
            $pull: {
                comments: { _id: req.body.comment_id }
            },
            $inc: {
                viewCount: -1
            }
        },
        { new: true }
    ).then((result) => {
        res.json(result);
        console.log("Comment Deleted. Result: " + result)
    })
        .catch((err) => res.send("ERROR Delete comment from  Post: " + err))


}
);


//update existing comment from blog
router.put('/:comment_id', (req, res) => {
    console.log("<================= Update Comment API =================>")
    console.log(req.body.blog_id)
    console.log(req.body.comment_id)

    const filter = { _id: req.body.blog_id, "comments._id": req.body.comment_id };


    Post.findOneAndUpdate(
        filter,
        {
            $set: {
                "comments.$.comment": req.body.value
            },
            $inc: {
                viewCount: -1
            }

        }/* , { new: true } */
    ).then((result) => {
        res.json(result);
        console.log("Comment updated. Result: " + result)
    })
        .catch((err) => res.send("ERROR update comment from  Post: " + err))


}
);

// Exports
module.exports = router;
