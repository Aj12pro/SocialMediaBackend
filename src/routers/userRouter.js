import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory, 
    updateAccountDetails
} from "../controllers/userDataControllers.js";
import {upload} from "../middlware/multerMiddleware.js"
import { verifyJWT } from "../middlware/authMiddleware.js";
import { createPost } from "../controllers/userPostControllers.js";
import { authMiddleware } from "../middlware/authMiddleware.js";
 


const routers = Router()

routers.route("/registers").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

routers.route("/login").post(loginUser)

//secured routes
routers.route("/logout").post(verifyJWT,  logoutUser)
  routers.route("/refresh-token").post(refreshAccessToken)
routers.route("/change-password").post(verifyJWT, changeCurrentPassword)
routers.route("/current-user").get(verifyJWT, getCurrentUser)
routers.route("/update-account").patch(verifyJWT, updateAccountDetails)

routers.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)



 



// For the Post Routes 
routers.route("/createPost").post(createPost)
routers.post('/posts',   upload.single('image'), createPost);


export default routers