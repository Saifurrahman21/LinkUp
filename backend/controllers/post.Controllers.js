import Post from "../models/post.model.js";
import uploadCloudinary from "../config/cloudinary.js";
export const createPost = async (req, res) => {
  try {
    let { description } = req.body;
    let newPost;
    if (req.file) {
      let image = await uploadCloudinary(req.file.path);
      newPost = await Post.create({
        authoer: req.userId,
        description,
        image,
      });
    } else {
      newPost = await Post.create({
        authoer: req.userId,
        description,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: `create post error ${error}` });
  }
};
