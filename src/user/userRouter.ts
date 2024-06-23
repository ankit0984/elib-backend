import Router  from "express";
import {createUser } from "./Registration/userController";
import {loginUser} from "./Login/loginController";

const userRouter = Router();

userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)




export default userRouter;