import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { follower } from "../models/follower.model.js"
import {ApiError} from "../utils/ApiError.js"
 
import {asyncHandler} from "../utils/asyncHandler.js"


const togglefollower = asyncHandler(async (req, res) => {
    const {ProfileId} = req.params
    // TODO: toggle follower
})

// controller to return subscriber list of a Profile
const getUserProfileFollower = asyncHandler(async (req, res) => {
    const {ProfileId} = req.params
})

// controller to return Profile list to which user has Followed
const getFollowedProfiles = asyncHandler(async (req, res) => {
    const { followedId } = req.params
})

export {
    togglefollower,
    getUserProfileFollower,
    getFollowedProfiles
}