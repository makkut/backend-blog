import express from "express";
import { QualityModel } from "../models/quality.model.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await QualityModel.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({ message: "Sever error" });
  }
});
export default router;
