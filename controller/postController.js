const Post = require('../models/postModel')

const ITEMS_PER_PAGE = 9;

// Get All Post Newest to Oldest
const getAllPost = async (req, res) => {
    const page = req.query.page || 1;
    // Put all your query params here
    console.log("Get post with DB Query")
    console.log(req.query)


    const author_query = req.query.author ? { 'author': req.query.author } : {};
    console.log(author_query);

    try {
        const skip = (page - 1) * ITEMS_PER_PAGE  //Page 2: (1*5 =>5)
        const count = await Post.count(author_query)
        const pageCount = Math.ceil(count / ITEMS_PER_PAGE) || 1;

        const items = await Post.find(author_query).sort({ createdAt: -1 }).limit(ITEMS_PER_PAGE).skip(skip)
        // TEST
        console.log("\n count:", count,
            // "\n items:", items.length,
            "\n pageCount:", pageCount,
        )

        // return {
        /* pagination: {
            count,
            pageCount
        }, */
        res.status(200).send({ page, items, count, pageCount })
        // }


    } catch (err) {
        console.log(err);
        res.send(err)
    }



    // Old Method to get all post
    // await Post.find({}).sort({ createdAt: -1 })
    //     .then(result => { res.status(200).send(result) })
    //     .catch(err => console.log("Error: Get All Post Error", err))
}


// Get POST based in _Id
const viewPost = async (req, res) => {
    const filter = { _id: req.params.id };
    await Post.findOneAndUpdate(                                    //referred from mongoose
        filter,
        { $inc: { "viewCount": 1 } },
        { returnOriginal: false }
    )
        .then((result) => {
            res.json(result);
            console.log("view post result sent. Result: " + result)
        })
        .catch((err) => res.send("ERROR View Post: " + err))
}


const createNewPost = async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save()
        .then(result => {
            res.status(201).json({
                status: 'success',
                success: true,
                data: result,
                message: "Post created successfully",
                type: "Success",
            })
        })
        .catch(err => console.log("Error Creating New Blog-Post: ", err))
}


const updatePost = async (req, res) => {
    console.log("Entered Update Post Function")
    console.log(req.params.id)
    const filter = { _id: req.params.id };
    const update = req.body;
    console.log(req.body)
    await Post.findOneAndUpdate(filter, update, { returnOriginal: false }) //referred from mongoose
        .then((result) => res.send({ message: "Content updated successfully", result }))
        .catch((err) => res.send(err))


}


const deletePost = async (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(result => res.status(200).send({ success: true, data: result, message: "Post deleted successfully", type: "success" }))
        .catch(err => console.log('Error while deleting post: ', err))
}


// Comments
const comment = async (req, res) => {
    console.log("Enter comment\n", req.body, "\n", req.params.id)

    const filter = { _id: req.params.id };
    const commentData = req.body;
    console.log(req.body)
    await Post.findOneAndUpdate(
        filter,
        {
            $push: {
                comments: commentData
            },
            $inc: {
                viewCount: -1
            }
        },

        { returnOriginal: false }) //referred from mongoose
        .then((result) => res.send({ message: "Comment added successfully", result }))
        .catch((err) => res.send(err))


}
const unComment = (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { comments: { _id: comment._id } } },
        { new: true }
    ).exec((err, result) => {
        if (err) { return res.status(400).json({ error: err }) }
        else { res.json(result) }
    })
}

module.exports = {
    getAllPost,
    // getMyPosts,
    createNewPost, updatePost, viewPost,
    // createUpdatePost,
    deletePost,
    comment, unComment,
}

//<=========================================================================================> 
//<=============================== LEGACY CODES ============================================> 
//<=========================================================================================> 

// Get My Post Newest to Oldest
const getMyPosts = async (req, res) => {
    /* console.log("===== ===== =====>GET MY POSTS(START)<===== ===== =====")
     const username = req.body.username;
     console.log("Extracting posts of ", username)
     await Post.find({ author: username }).sort({ createdAt: -1 })
         .then(result => { res.status(200).send(result) })
         .catch(err => console.log("Error: Get All Post Error", err))
     console.log("===== ===== =====>GET MY POSTS(END)<===== ===== =====")
     */
}
const createUpdatePost = async (req, res) => {
    // let id = req.params.id ? req.params.id : null;

    // console.log(id)
    // Post.findById(id)
    //     .then(post => {
    //         if (post) {
    //             // if POST with id exist
    //             const postFields = {}
    //             // put new data in appropriate fields
    //             if (req.body.title) postFields.title = req.body.title;
    //             if (req.body.content) postFields.content = req.body.content;
    //             // and update POST with new data
    //             Post.findOneAndUpdate({ _id: id }, { $set: postFields }, { new: true })
    //                 .then(result => {
    //                     res.status(201).send({
    //                         success: true,
    //                         data: result,
    //                         message: `Blog Post updated successfully.Id: ${id}`,
    //                         type: "success",
    //                     })
    //                 })
    //                 .catch(err => console.log("Error while updating BlogPost ->", err));
    //         } else {
    //             // if post with id DOESN'T Exist -> <New POST>
    //             const newPost = new Post(req.body);
    //             newPost.save()
    //                 .then(result => {
    //                     res.status(201).send({
    //                         success: true,
    //                         data: result,
    //                         message: "Post created successfully",
    //                         type: "Success",
    //                     })
    //                 })
    //                 .catch(err => console.log("Error Creating New BlogPost: ", err))
    //         }
    //     })
    //     .catch(err => console.log("Post Add Error: ", err))
}

// Update function
/*  await Post.findByIdAndUpdate(
         req.params.id,
         {
             title: req.body.title,
         },
         function (err, result) {
             if (err) { res.send(err) }
             else { res.send(result) }
         }
     ) */

/* Post.findByIdAndUpdate */

// Post.findByIdAndUpdate(
//     req.params.id,
//     {
//         title: req.body.title,
//         content: req.body.content
//     }
// )
//     .then(post => {
//         if (!post) {
//             return res.status(404).send({
//                 message: "Post Not Found with id " + req.params.id
//             })
//         }
//         res.status(201).send({
//             success: true,
//             data: post,
//             message: "Post Updated successfully",
//             type: "Success",
//         })
//     })
//     .catch(err => console.log("Error Updating Post: ", err))
// console.log("Exit Update Post Function")

// <=========================================================================================>
// <=========================================================================================>
