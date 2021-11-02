import express from "express";
const router = express.Router();
import {
  getWorks,
  getWorkById,
  deleteWork,
  createWork,
  updateWork,
} from "../controllers/workController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getWorks).post(protect, admin, createWork);
router
  .route("/:id")
  .get(getWorkById)
  .delete(protect, admin, deleteWork)
  .put(protect, admin, updateWork);

export default router;
