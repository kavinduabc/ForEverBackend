import express from "express"
import { rejisterUser, userLogin, viewUser } from "../controller/userController.js";

const userRouter = express.Router();
userRouter.post("/",rejisterUser);
userRouter.post("/login",userLogin);
userRouter.get("/",viewUser);

export default userRouter;