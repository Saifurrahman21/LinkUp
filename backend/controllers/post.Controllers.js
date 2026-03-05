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
    const post = await Post.find()
      .populate("author", "firstName lastName profileImage headline")
      .populate("comment.user", "firstName lastName profileImage headline")
      .sort({ createdAt: -1 });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "getpost error" });
  }
};

export const like = async (req, res) => {
  try {
    let postId = req.params.id;
    let userId = req.userId;
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "post not found" });
    }
    if (post.like.includes(userId)) {
      post.like = post.like.filter((id) => id != userId);
    }
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "like error" });
  }
};

export const comment = async (req, res) => {
  try {
    let postId = req.params.id;
    let userId = req.userId;
    let { content } = req.body;

    let post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comment: {
            content,
            user: userId,
          },
        },
      },
      { new: true },
    ).populate("comment.user", "firstName lastname profileImage headline");

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "comment error" });
  }
};
