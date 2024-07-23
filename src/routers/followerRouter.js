import { Router } from 'express';
import {
    togglefollower,
   getUserProfileFollower,
   getFollowedProfiles
} from "../controllers/followerController.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .get(getFollowedProfiles)
    .post(togglefollower);

router.route("/u/:subscriberId").get(getUserProfileFollower);

export default router