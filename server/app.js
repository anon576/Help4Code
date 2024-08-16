import express from 'express'
import bodyparser from 'body-parser'
import cors from "cors";
import AuthRouter from './Routers/AuthRouter.js';



const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


app.use((req,res,next)=>{
    console.log(req.method)
    console.log(req.url)
    next()
})

app.use(cors({
    origin: '*', // Replace with your React app's URL
    credentials: true,
}));



app.use("/auth",AuthRouter)



app.listen(5000,"0.0.0.0")
