import express from 'express'
import CourseHandler from '../Handlers/CourseHandler.js'

const CourseRouter = express.Router()

CourseRouter.get("/get_sidebar_content/:course_id",CourseHandler.fetchSideBarContect)
CourseRouter.post("/get_content",CourseHandler.fetchContent)


export default CourseRouter