

import { Post } from "../models/user.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiErros.js"
 
 
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
 


 

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  // const userId = req.user._id; // Assuming you have a middleware to set req.user

  if (!content?.trim()) {
    throw new ApiError(400, "Content is required");
  }

  const imageLocalPath = req.files?.image?.[0]?.path;
  console.log( "imagePath" , imageLocalPath)

  let image = null;
  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath);
  }

  const post = await Post.create({
 
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
 

  return res.status(201).json(new ApiResponse(201, createdPost, "Post created successfully"));
});

 

  
 
  
export {createPost}