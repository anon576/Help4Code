import { hash } from 'bcrypt';
import pool from '../Database/Database.js'
import Utils from '../Utils/Utils.js'
class AuthHandlers{

    static sendOTP=async(req,res)=>{
        try{
            const {email,val} = req.body;
            if(email==null){
                return res.status(404).json({
                    "message":"Email not found"
                })
            }
            const otp = Utils.generateOtp();
            Utils.sendMail(email,val,otp)
            return res.status(200).json({
                "message":"OTP sent successfully",
                "otp":otp
            })
        }catch(e){
            res.status(500).json({
                "message":"Internal Server Error"
            })
        }
    }

    static signUp = async (req,res)=>{
        try{
            const {email,name,password} = req.body;
            if(email == null || name == null || password == null){
                return res.status(404).json({
                    "message":"All feild required"
                })
            }

            const [user] =await pool.query(`SELECT * FROM User where email = ?`,[email]);
            if(user.length){
                return res.status(409).json({
                    "message":"User alredy exist wiht same email"
                })
            }
            
            const hash_password = await Utils.passwordEncrypt(password)
            const [new_user] =await pool.query(`INSERT INTO User (email, name, password ) values(?,?,?)`,[email,name,hash_password])
            const token = Utils.generateToken(new_user.insertId)
            console.log(token)
            return res.status(201).json({
                "message":"user created",
                "token":token
            })
        }catch(e){
            console.log(e)
            res.status(500).json({
                "message":"Internal Server Error"
            })
        }
    }

    // static login = (req,res)=>{
    //     try {
    //         const {email,password} = req.body;
    //         if(email)
    //     } catch (error) {
            
    //     }
    // }
}


export default AuthHandlers