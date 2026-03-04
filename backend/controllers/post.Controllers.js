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

export const getPost = async (req, res) => {
  try {
    const post = await Post.find().populate(
      "author",
      "firstName lastName profileImage headline",
    );
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "getpost error" });
  }
};
