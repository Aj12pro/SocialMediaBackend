import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErros.js";
import { Notification } from "../models/user.model.js";
import { Comment } from "../models/user.model.js";
import { Post } from "../models/user.model.js";
import mongoose from "mongoose";



// Create a new notification
const createNotification = asyncHandler(async (req, res) => {
    const { type, referenceId } = req.body;
    const userId = req.user._id; // Access the user ID from req.user
  
    if (!type || !referenceId) {
      throw new ApiError(400, "Type and referenceId are required");
    }
  
    const notification = await Notification.create({
      userId,
      type,
      referenceId,
    });
  
    if (!notification) {
      throw new ApiError(500, "Something went wrong while creating the notification");
    }
  
    return res.status(201).json({
      status: 201,
      data: notification,
      message: "Notification created successfully"
    });
  });


 
  
  // Get notifications for a user
  const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Access the user ID from req.user
  
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }); // Sort by most recent notifications
  
    return res.status(200).json({
      status: 200,
      data: notifications,
      message: "Notifications retrieved successfully"
    });
  });
  



 
// Mark a notification as read
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    throw new ApiError(400, "Invalid notification ID");
  }

  const notification = await Notification.findById(notificationId);
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  notification.read = true;
  await notification.save();

  return res.status(200).json({
    status: 200,
    data: notification,
    message: "Notification marked as read"
  });
});


 
 


  export {
    createNotification,
    getNotifications,
    markNotificationAsRead,
    

  }

