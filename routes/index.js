import express from "express";
import profession from "./profession.routes.js";
import qualitis from "./quality.routes.js";
import auth from "./auth.routes.js";
import user from "./user.routes.js";
import comment from "./comment.routes.js";

const router = express.Router({ mergeParams: true });

router.use("/auth", auth);
router.use("/comment", comment);
router.use("/quality", qualitis);
router.use("/profession", profession);
router.use("/user", user);

export default router;
