import express from 'express'
import AuthHandlers from '../Handlers/AuthHandler.js'

const AuthRouter = express.Router()

AuthRouter.post("/otp",AuthHandlers.sendOTP)
AuthRouter.post("/user",AuthHandlers.signUp)


export default AuthRouter