import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createPortfolio,
  deletePortfolio,
  getPortfolio,
  getPortfolios,
  getPortfoliosBySearch,
  getPortfoliosByUser,
  updatePortfolio,
} from "../controllers/portfolio.js";
router.get("/search", getPortfoliosBySearch);
router.get("/", getPortfolios);
router.get("/:id", getPortfolio);
import { requireAdmin } from "../middleware/auth.js";

router.post("/", auth, requireAdmin, createPortfolio);
router.delete("/:id", auth, requireAdmin, deletePortfolio);
router.patch("/:id", auth, requireAdmin, updatePortfolio);
router.get("/userPortfolios/:id", auth, getPortfoliosByUser);

export default router;
