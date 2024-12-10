import { Request, Response } from "express";
import Course from "../models/courseModel";

/* GET COURSES BY CATEGORY */
export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;

  try {
    const courses =
      category && category !== "all"
        ? await Course.scan("category").eq(category).exec()
        : await Course.scan().exec();

    res.json({ message: "Courses retrieved successfully", data: courses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving courses", error });
    console.log(error);
    return;
  }
};

/* GET SINGLE COURSE */
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  try {
    const course = await Course.get(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.json({ message: "Course retrieved successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving course", error });
    console.log(error);
    return;
  }
};

// export const getCourse = async (req: Request, res: Response): Promise<void> => {
//   try {
//   res.json({ message: "success" });
//   } catch (error) {
//     res.status(500).json({ message: "Error", error });
//   }
// };
