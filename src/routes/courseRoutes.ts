import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getUploadVideoUrl,
  listCourses,
  updateCourse,
} from "../controllers/courseController";
import { requireAuth } from "@clerk/express";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get("/", listCourses);
router.post("/", requireAuth(), createCourse);
router.put("/:courseId", requireAuth(), upload.single("image"), updateCourse);
router.delete("/:courseId", requireAuth(), deleteCourse);
router.get("/:courseId", getCourse);

router.post(
  "/:courseId/sections/:sectionId/chapters/:chapterId/get-upload-url",
  requireAuth(),
  getUploadVideoUrl
);

export default router;
