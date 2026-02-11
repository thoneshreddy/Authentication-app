import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser
} from "../controllers/admin.controller.js";

const router = express.Router();

/* ADMIN ROUTES */
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
