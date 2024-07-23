import mongoose, {Schema} from "mongoose"

const followerSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },
    profile: {
        type: Schema.Types.ObjectId, // one to whom 'follower' is following
        ref: "User"
    }
}, {timestamps: true})



export const Follower = mongoose.model("Subscription", followerSchema)