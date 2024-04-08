import { Router } from "express";
import { PostCollection } from "./collection";

const postCollection = new PostCollection();
const postRouter = Router();

postRouter.post("/create", postCollection.Create);
postRouter.get("/", postCollection.getPosts);

export default postRouter;
