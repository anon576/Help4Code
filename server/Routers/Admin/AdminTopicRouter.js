import express from 'express'
import AdminTopicHandler from '../../Handlers/Admin/AdminTopicHandler.js'

const AdminTopicRouter = express.Router()

AdminTopicRouter.get("/get_topics",AdminTopicHandler.fetchTopics)
AdminTopicRouter.post("/add_topic",AdminTopicHandler.AddTopic)
AdminTopicRouter.put("/update_topic",AdminTopicHandler.updateTopic)

export default AdminTopicRouter