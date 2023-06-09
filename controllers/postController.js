const Post = require("../models/postModel")

exports.getAllPosts = async (req, res, next) => {
    try{
        const posts = await Post.find()
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "failed to fetch data"
        })
    }
};

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: "failed to fetch data"
        })
    }
}


exports.createPost = async (req, res, next) => {
    try {
        const { title, body } = req.body;

        const newPost = new Post({
          title,
          body,
        });

        // save Assets in the database
        await newPost.save(); //async

        return res.status(201).json({
          status: true,
          message: "Successfully saved",
          data: newPost,
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "failed to fetch data",
            error: error
        })
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: "failed to fetch data"
        })
    }
}


exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
        });
    } catch (e) {
        res.status(400).json({
            status: "failed to fetch data"
        })
    }
}