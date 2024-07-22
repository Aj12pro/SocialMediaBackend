import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
 
const app = express()



//   Here are some middleware  to  

// Enable CORS (Cross-Origin Resource Sharing) middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow requests from specified origin (or '*')
    credentials: true // Allow sending cookies along with the request
}));


 
// Parse incoming JSON requests with a payload limit of 16kb
app.use(express.json({ limit: "16kb" }));
 

// Parse incoming URL-encoded form data with a payload limit of 16kb
app.use(express.urlencoded({ limit: "16kb" }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Parse cookies attached to incoming requests
app.use(cookieParser());

import {router} from "./routers/authRouter.js"
import routers from "./routers/userRouter.js";


// For the router declaration 

app.use("/api/v1" , router)
app.use("/api/v2" , routers)



export { app }