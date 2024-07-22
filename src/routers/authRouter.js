import { Router  } from "express"
import { loginUser, resgisterUser } from "../controllers/authController.js"


const router = Router()


//  Auth  router 
router.post('/register' , resgisterUser) 
router.post('/loginUser' , loginUser) 
 

// // User routes
// app.get('/api/users', getUsers);
// app.get('/api/users/:id', getUserById);
// app.post('/api/users', createUser);
// app.put('/api/users/:id', updateUser);
// app.delete('/api/users/:id', deleteUser);


// // Post routes
// app.get('/api/posts', getPosts);
// app.get('/api/posts/:id', getPostById);
// app.post('/api/posts', createPost);
// app.put('/api/posts/:id', updatePost);
// app.delete('/api/posts/:id', deletePost);


// // Comment routes
// app.get('/api/comments', getComments);
// app.get('/api/comments/:id', getCommentById);
// app.post('/api/comments', createComment);
// app.put('/api/comments/:id', updateComment);
// app.delete('/api/comments/:id', deleteComment);


// // Notification routes
// app.get('/api/notifications', getNotifications);
// app.get('/api/notifications/:id', getNotificationById);
// app.post('/api/notifications', createNotification);
// app.put('/api/notifications/:id', updateNotification);
// app.delete('/api/notifications/:id', deleteNotification);





export {router}