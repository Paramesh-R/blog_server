const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String },
    content: { type: Object },
    coverImage: { type: String, default: "https://loremflickr.com/900/400/tech" },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    lastmodifiedAt: { type: Date, default: () => Date.now() },
    viewCount: { type: Number, default: 0 },
    tags: [String],
    mentions: [String],
    comments: [{
        comment: String,
        created: { type: Date, default: () => Date.now() },
        postedBy: String
    }]

})

module.exports = mongoose.model('Post', postSchema)