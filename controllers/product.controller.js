const Post = require("../models/product.model");
const fs = require("fs");
module.exports = class API {
    //fetch all post
    static async fetchAllProduct(req, res) {
            try {
                const posts = await Post.find();
                res.status(200).json(posts);
            } catch (err) {
                res.status(404).json({ message: err.message });
            }
        }
        // fetch post by id
    static async fetchProductByID(req, res) {
            const id = req.params.id;
            try {
                const post = await Post.findById(id);
                res.status(200).json(post);
            } catch (err) {
                res.status(404).json({ message: err.message });
            }
        }
        // create post
    static async createProduct(req, res) {
            const post = req.body;
            const imagename = req.file.filename;
            post.image = imagename;
            try {
                await Post.create(post);
                res.status(201).json({ message: "post create successfull!" });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
        // update a post
    static async updateProduct(req, res) {
            const id = req.params.id;
            let new_image = "";
            if (req.file) {
                new_image = req.file.filename;
                try {
                    fs.unlinkSync("./uploads/" + req.body.old_image);
                } catch (err) {
                    console.log(err);
                }
            } else {
                new_image = req.body.old_image;
            }
            const newPost = req.body;
            newPost.image = new_image;

            try {
                await Post.findByIdAndUpdate(id, newPost);
                res.status(200).json({ message: "update successfull!" });
            } catch (err) {
                res.status(404).json({ message: err.message });
            }
        }
        // delete a post
    static async deleteProduct(req, res) {
        const id = req.params.id; //lay id
        try {
            const result = await Post.findByIdAndDelete(id);
            if (result.image != "") {
                try {
                    //xóa hinh anh trong upload
                    fs.unlinkSync("./uploads/" + result.image);
                } catch (err) {
                    // console.log(err);
                }
            }
            res.status(200).json({ message: "delete successfull!" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};