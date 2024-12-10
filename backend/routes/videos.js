import express from "express";
import { getVideos, getVideo } from "../controllers/videoController.js";

const router = express.Router();
router.get("/", getVideos);
router.get("/:id", getVideo);

export default router;
