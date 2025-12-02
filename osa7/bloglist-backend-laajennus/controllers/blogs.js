const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const body = request.body;
    const user = request.user;

    if (!user) {
      return response
        .status(400)
        .json({ error: "userId missing or not valid" });
    }

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes,
    });

    const savedBlog = await blog.save();

    const freshUser = await User.findById(user._id);
    freshUser.blogs = freshUser.blogs.concat(savedBlog._id);
    await freshUser.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    if (blog.user.toString() !== user.id) {
      return response
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const likes = request.body.likes;

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }

    blog.likes = likes;

    const updatedBlog = await blog.save();
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id/comments", async (request, response, next) => {
  try {
    const comments = await Comment.find({ blog: request.params.id });

    response.json(comments);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const blogId = request.params.id;

    const comment = new Comment({
      blog: blogId,
      text: request.body.text,
    });

    const newComment = await comment.save();
    response.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
