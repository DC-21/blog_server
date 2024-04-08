import { Router } from "express";
import { UserCollection } from "./collection";

const userCollection = new UserCollection();
const userRouter = Router();

userRouter.post("/signup", userCollection.Register);
userRouter.post("/signin", userCollection.Login);

export default userRouter;
