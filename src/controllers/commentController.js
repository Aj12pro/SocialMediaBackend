import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErros.js";
import { Comment } from "../models/user.model.js";
import { Post } from "../models/user.model.js";
import mongoose from "mongoose";


// Create a comment
const createComment = asyncHandler(async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user._id; // Access the user ID from req.user
  
    if (!content?.trim()) {
      throw new ApiError(400, "Content is required");
    }
  
    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new ApiError(400, "Invalid post ID");
    }
  
    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
  
    // Create the comment
    const comment = await Comment.create({
      postId,
      userId,
      content,
    });
  
    if (!comment) {
      throw new ApiError(500, "Something went wrong while creating the comment");
    }
  
    return res.status(201).json({
      status: 201,
      data: comment,
      message: "Comment created successfully"
    });
  });




//  Get Comment 

const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params; // Extract postId from request parameters

  // Validate postId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Fetch comments for the post
  const comments = await Comment.find({ postId });

  if (!comments) {
    throw new ApiError(500, "Something went wrong while retrieving comments");
  }

  return res.status(200).json({
    status: 200,
    data: comments,
    message: "Comments retrieved successfully"
  });
});




//  update comment 

 
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params; // Retrieve comment ID from request parameters
    const { content } = req.body;
    const userId = req.user._id; // Access the user ID from req.user
  
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new ApiError(400, "Invalid comment ID");
    }
  
    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }
  
    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not authorized to update this comment");
    }
  
    // Update the comment
    comment.content = content;
    comment.updatedAt = new Date();
    await comment.save();
  
    return res.status(200).json({
      status: 200,
      data: comment,
      message: "Comment updated successfully"
    });
  });


// delete comment 

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params; // Get the comment ID from the request parameters
  const userId = req.user._id; // Access the user ID from req.user

  // Validate commentId
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new ApiError(400, "Invalid comment ID");
  }

  // Check if the comment exists
  const comment = await Comment.findById(commentId);
  if (!comment) {
      throw new ApiError(404, "Comment not found");
  }

  // Optionally check if the user is authorized to delete the comment
  if (comment.userId.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not authorized to delete this comment");
  }

  // Delete the comment
  const result = await Comment.findByIdAndDelete(commentId);
  if (!result) {
      throw new ApiError(500, "Something went wrong while deleting the comment");
  }

  return res.status(200).json({
      status: 200,
      message: "Comment deleted successfully"
  });
});

  


  export { 
    createComment ,
    updateComment ,
    getComments,
    deleteComment

  }