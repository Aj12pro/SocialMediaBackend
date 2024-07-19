import { Router  } from "express"
import { loginUser, resgisterUser } from "../controllers/userController.js"


const router = Router()


//  Register router 
router.post('/register' , resgisterUser) 
router.post('/loginUser' , loginUser) 

export {router}