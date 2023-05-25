import express from "express";
import auth from "../middleware/auth.middleware.js";
import { CommentModel } from "../models/comment.model.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await CommentModel.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (e) {
      res.status(500).json({ message: "Server errror" });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await CommentModel.create({
        ...req.body,
        pageId: req.user._id,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (error) {
      res.status(500).json({ message: "Sever error" });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedCommen = await CommentModel.findById(commentId);

    if (removedCommen.userId.toString() === req.user._id) {
      await removedCommen.remove();
      return res.send(null);
    } else {
      res.status(401).json({
        message: "Unazhorized",
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Sever error" });
  }
});

export default router;
