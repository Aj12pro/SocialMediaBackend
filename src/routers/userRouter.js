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
import { createPost,   updatePost , deletePost, getPost, getPostsByUserId } from "../controllers/userPostControllers.js";
import { createComment  , getComments, updateComment , deleteComment} from "../controllers/commentController.js";
import { createNotification , getNotifications , markNotificationAsRead   } from "../controllers/notificationController.js";
 
 


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
routers.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

 



 



// For the Post Routes 
 
routers.post('/createPost', verifyJWT,  upload.fields([{ name: 'image', maxCount: 1 }]), createPost); 
routers.get('/getPosts/:postId', verifyJWT, getPost);
routers.get('/getPostsById/:userId', verifyJWT, getPostsByUserId);
routers.put('/updatePosts/:postId', verifyJWT, upload.fields([{ name: 'image', maxCount: 1 }]), updatePost);
routers.delete('/deletePosts/:postId', verifyJWT, deletePost);


 

// Routes for the comments 

routers.post('/comments/:postId', verifyJWT,  createComment);
routers.get('/getComment/:postId', verifyJWT,  getComments);
routers.put('/comments/:commentId'  , verifyJWT, updateComment); 
routers.delete('/:commentId', verifyJWT,  deleteComment ); 



//  Routes for the Notification
// Create a new notification (requires authentication)
routers.post('/notifications', verifyJWT, createNotification);

// Get all notifications for the authenticated user (requires authentication)
routers.get('/getNotifications', verifyJWT, getNotifications);

// Mark a specific notification as read (requires authentication)
routers.patch('/updateNotifications/:notificationId/read', verifyJWT, markNotificationAsRead);

 

 


export default routers