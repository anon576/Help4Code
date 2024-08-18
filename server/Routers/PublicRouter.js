import express from 'express'
import PublicHandler from '../Handlers/PublicHandler.js'

const PublicRouter = express.Router()


PublicRouter.get("/get_course",PublicHandler.fetchCourse)




export default PublicRouter;