import express from "express";
import { ProfessionModel } from "../models/profession.model.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await ProfessionModel.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({ message: "Sever error" });
  }
});
export default router;
