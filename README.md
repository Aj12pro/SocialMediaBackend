 

 

# Social Media Backend

## Overview

This project is a social media application built with Node.js, Express, and MongoDB. It includes features for managing users, posts, comments, notifications, and friendships.

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Models](#models)
   - [User](#user)
   - [Post](#post)
   - [Comment](#comment)
   - [Notification](#notification)
   - [Friend](#friend)
4. [Controllers](#controllers)
   - [User](#user-controllers)
   - [Post](#post-controllers)
   - [Comment](#comment-controllers)
   - [Notification](#notification-controllers)
   - [Friend](#friend-controllers)
5. [Routes](#routes)
   - [User Routes](#user-routes)
   - [Post Routes](#post-routes)
   - [Comment Routes](#comment-routes)
   - [Notification Routes](#notification-routes)
   - [Friend Routes](#friend-routes)
6. [Usage](#usage)
7. [API Documentation](#api-documentation)
8. [Contributing](#contributing)
9. [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone  https://github.com/Aj12pro/SocialMediaBackend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Bcloud_Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file:

   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

## Project Structure

- **`/models`**: Mongoose schemas and models.
- **`/controllers`**: Business logic and request handling.
- **`/routes`**: API routes.
- **`/middleware`**: Middleware for authentication and error handling.
- **`/utils`**: Utility functions and classes.

## Models

### User

```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: String,
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

### Post

```javascript
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  image: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

### Comment

```javascript
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

### Notification

```javascript
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  referenceId: mongoose.Schema.Types.ObjectId,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
```

### Friend

```javascript
const friendSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'blocked'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

## Controllers

### User Controllers

- **Create User**
- **Get User**
- **Update User**
- **Delete User**

### Post Controllers

- **Create Post**
- **Get Post**
- **Update Post**
- **Delete Post**
- **Get Posts by User**

### Comment Controllers

- **Create Comment**
- **Get Comment**
- **Update Comment**
- **Delete Comment**
- **Get Comments by Post**

### Notification Controllers

- **Create Notification**
- **Get Notifications**
- **Mark Notification as Read**
- **Delete Notification**

### Friend Controllers

- **Add Friend**
- **Accept Friend Request**
- **Reject Friend Request**
- **Delete Friend**

## Routes

### User Routes

- **POST** `/api/users`: Create a new user
- **GET** `/api/users/:id`: Retrieve a user
- **PUT** `/api/users/:id`: Update a user
- **DELETE** `/api/users/:id`: Delete a user

### Post Routes

- **POST** `/api/posts`: Create a new post
- **GET** `/api/posts/:postId`: Retrieve a post
- **PUT** `/api/posts/:postId`: Update a post
- **DELETE** `/api/posts/:postId`: Delete a post
- **GET** `/api/posts/user/:userId`: Retrieve posts by user

### Comment Routes

- **POST** `/api/comments`: Create a new comment
- **GET** `/api/comments/:commentId`: Retrieve a comment
- **PUT** `/api/comments/:commentId`: Update a comment
- **DELETE** `/api/comments/:commentId`: Delete a comment
- **GET** `/api/comments/post/:postId`: Retrieve comments by post

### Notification Routes

- **POST** `/api/notifications`: Create a new notification
- **GET** `/api/notifications/:userId`: Retrieve notifications by user
- **PUT** `/api/notifications/:notificationId/read`: Mark notification as read
- **DELETE** `/api/notifications/:notificationId`: Delete a notification

### Friend Routes

- **POST** `/api/friends/:userId`: Add a friend
- **PUT** `/api/friends/:userId/accept`: Accept a friend request
- **PUT** `/api/friends/:userId/reject`: Reject a friend request
- **DELETE** `/api/friends/:userId`: Delete a friend

## Usage

1. **Creating a User:** Send a POST request to `/api/users` with the required user data.
2. **Creating a Post:** Send a POST request to `/api/posts` with the post content and optionally an image.
3. **Adding a Comment:** Send a POST request to `/api/comments` with the comment data.
4. **Creating a Notification:** Send a POST request to `/api/notifications` with the notification details.
5. **Adding a Friend:** Send a POST request to `/api/friends/:userId` with the user ID of the friend.

## API Documentation

For detailed API documentation, refer to [API Documentation](https://your-api-docs-url).

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request. Make sure to follow the coding standards and write tests for your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This `README.md` provides a comprehensive overview of your project's structure, models, controllers, and routes, helping both developers and users understand how to interact with the system.
