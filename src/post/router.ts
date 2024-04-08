import { Router } from "express";
import { PostCollection } from "./collection";

const postCollection = new PostCollection();
const postRouter = Router();

postRouter.post("/create", postCollection.Create);

export default postRouter;
