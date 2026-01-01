import {getAllPosts, createPost, deletePost, updatePost} from "../controller/postsController.js";
import express from 'express'
const route= express.Router();

route.get('/', getAllPosts);
route.post('/', createPost);
route.delete('/:id', deletePost);
route.put('/:id', updatePost);

export default route;