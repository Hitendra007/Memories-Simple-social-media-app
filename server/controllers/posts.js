import mongoose from "mongoose";
import PostMessage from "../models/PostMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createPost = (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(201).json({ message: error.message })
    }
}
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send('No post with that id') }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost)
}
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.deleteOne({ _id: id });

    res.json({ message: "Post deleted successfully." });
}
export const likePost = async(req,res)=>{
    const {id}= req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true})
    res.json(updatePost)
}