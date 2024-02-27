import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  changeEmail,
  changePassword,
  setUserRole,
  getAllUsers,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
import { requireSuperAdmin } from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/changeEmail", auth, changeEmail);
router.post("/changePassword", auth, changePassword);
// New routes for admin functionality
router.post("/setUserRole", auth, requireSuperAdmin, setUserRole);
router.get("/allUsers", auth, requireSuperAdmin, getAllUsers);
export default router;
