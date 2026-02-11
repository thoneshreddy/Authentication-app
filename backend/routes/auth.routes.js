import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

/* USER PROFILE */
router.get("/profile", protect, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

/* ADMIN ONLY */
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.user.name,
  });
});
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
