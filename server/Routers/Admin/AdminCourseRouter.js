import express from 'express'
import multer from 'multer';
import AdminCourseHandler from '../../Handlers/Admin/AdminCourseHandler.js'



const upload = multer(); // Multer setup

const AdminCourseRouter = express.Router();



AdminCourseRouter.post("/add_course", upload.single('course_img'), AdminCourseHandler.addCourse)
AdminCourseRouter.post("/add_course_chapter", AdminCourseHandler.addCourseChapter)
AdminCourseRouter.get("/get_chapter", AdminCourseHandler.fetchCourseChapter);
AdminCourseRouter.put("/update_course_chapter", AdminCourseHandler.updateCourseChapter)
AdminCourseRouter.delete("/delete_course_chapter/:chapter_id", AdminCourseHandler.deleteCourseChapter)


export default AdminCourseRouter;