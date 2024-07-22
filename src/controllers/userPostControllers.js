

import { Post } from "../models/user.model.js";
import mongoose from "mongoose";

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiErros.js"
 
 
import {uploadOnCloudinary} from "../utils/cloudinary.js"
 
 


//   For  the create post 

const createPost = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User is not authenticated");
  }

  const userId = req.user._id; // Access the user ID from req.user
  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Content is required");
  }

  const imageLocalPath = req.files?.image?.[0]?.path;
  console.log("Image Path:", imageLocalPath); // Debugging

  let image = null;
  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath);
  }

  const post = await Post.create({
    userId,
    content,
    image: image?.url || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (!post) {
    throw new ApiError(500, "Something went wrong while creating the post");
  }

  const createdPost = await Post.findById(post._id)
    .populate('userId', '-password -refreshToken')
    .populate('comments') // Populate comments if needed
    .populate('likes', '-password -refreshToken'); // Populate likes if needed

  return res.status(201).json({
    status: 201,
    data: createdPost,
    message: "Post created successfully"
  });
});


//  for the Get 

const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params; // Retrieve post ID from request parameters

  console.log("Received postId:", postId); // Debugging

  // Validate ObjectId
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  // Find the post
  const post = await Post.findById(postId)
    .populate('userId', '-password -refreshToken')
    .populate('comments') // Populate comments if needed
    .populate('likes', '-password -refreshToken'); // Populate likes if needed

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res.status(200).json({
    status: 200,
    data: post,
    message: "Post retrieved successfully"
  });
});



//  For the Post by userId 

const getPostsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params; // Retrieve user ID from request parameters

  console.log("Received userId:", userId); // Debugging

  // Validate ObjectId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  // Find posts by userId
  const posts = await Post.find({ userId })
    .populate('userId', '-password -refreshToken')
    .populate('comments') // Populate comments if needed
    .populate('likes', '-password -refreshToken'); // Populate likes if needed

  if (!posts || posts.length === 0) {
    throw new ApiError(404, "No posts found for this user");
  }

  return res.status(200).json({
    status: 200,
    data: posts,
    message: "Posts retrieved successfully"
  });
});




//  For the delete 

const deletePost = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User is not authenticated");
  }

  const userId = req.user._id; // Access the user ID from req.user
  const { postId } = req.params; // Retrieve post ID from request parameters

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  // Find the post to delete
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Ensure the post belongs to the user
  if (post.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  // Delete the post
  await Post.findByIdAndDelete(postId);

  return res.status(200).json({
    status: 200,
    message: "Post deleted successfully"
  });
});

 



//  for the update post 

const updatePost = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User is not authenticated");
  }

  const userId = req.user._id; // Access the user ID from req.user
  const { postId } = req.params; // Retrieve post ID from request parameters

  // Debugging
  console.log("Received postId:", postId);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  // Find the post to update
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Ensure the post belongs to the user
  if (post.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this post");
  }

  // Handle image update
  const imageLocalPath = req.files?.image?.[0]?.path;
  let image = post.image;

  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath);
  }

  // Update the post
  post.content = req.body.content || post.content;
  post.image = image?.url || post.image;
  post.updatedAt = new Date();

  const updatedPost = await post.save();

  if (!updatedPost) {
    throw new ApiError(500, "Something went wrong while updating the post");
  }

  const populatedPost = await Post.findById(updatedPost._id)
    .populate('userId', '-password -refreshToken')
    .populate('comments') // Populate comments if needed
    .populate('likes', '-password -refreshToken'); // Populate likes if needed

  return res.status(200).json({
    status: 200,
    data: populatedPost,
    message: "Post updated successfully"
  });
});

 

  
 
  
export {
  createPost ,
   updatePost,
   deletePost,
   getPost,
   getPostsByUserId
    
}