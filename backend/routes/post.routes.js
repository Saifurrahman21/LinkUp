import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createPost } from "../controllers/post.Controllers.js";

const postRouter = express.Router();

postRouter.post("/create", isAuth, upload.single("image"), createPost);

postRouter.get("/getpost", isAuth, getPost);

export default postRouter;
