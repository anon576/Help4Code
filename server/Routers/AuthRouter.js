import express from 'express'
import AuthHandlers from '../Handlers/AuthHandler.js'

const AuthRouter = express.Router()

AuthRouter.post("/otp",AuthHandlers.sendOTP)
AuthRouter.post("/user",AuthHandlers.signUp)
AuthRouter.post("/login",AuthHandlers.login)
AuthRouter.post("/forget_password",AuthHandlers.forgetPassword)
export default AuthRouter