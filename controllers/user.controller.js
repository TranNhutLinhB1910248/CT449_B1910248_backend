const Post = require("../models/user.model");
module.exports = class API {
    //fetch all post
    static async fetchAllUser(req, res) {
            try {
                const posts = await Post.find();
                res.status(200).json(posts);
            } catch (err) {
                res.status(404).json({ message: err.message });
            }
        }
        // fetch post by id
    static async fetchUserByID(req, res) {
            const id = req.params.id;
            try {
                const post = await Post.findById(id);
                res.status(200).json(post);
            } catch (err) {
                res.status(404).json({ message: err.message });
            }
        }
        // create post
    static async createUser(req, res) {
            const post = req.body;
            try {
                await Post.create(post);
                res.status(201).json({ message: "post create successfull!" });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
        // update a post
    static async updateUser(req, res) {
            const id = req.params.id;
            const newPost = req.body;
            try {
                await Post.findByIdAndUpdate(id, newPost);
                res.status(200).json({ message: "update successfull!" });
            } catch (err) {
                res.status(404).json({ message: err.message });
            }
        }
        // delete a post
    static async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            res.status(200).json({ message: "delete successfull!" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};