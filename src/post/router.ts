import { Router } from "express";
import { PostCollection } from "./collection";
import { authorization } from "../middleware/authorization";

const postCollection = new PostCollection();
const postRouter = Router();

postRouter.post("/create", authorization, postCollection.Create);
postRouter.get("/", authorization, postCollection.getPosts);

export default postRouter;
