import pool from '../Database/Database.js'
import Utils from '../Utils/Utils.js'
class AuthHandlers{

    static sendOTP = async (req, res) => {
        try {
            const { email, val } = req.body;
            console.log(email,val)
            if (!email) {
                return res.status(404).json({
                    message: "Email not found"
                });
            }
    
            const otp = Utils.generateOtp();
            console.log(otp);
    
            // Store the OTP in the user's session or database, or proceed with sending it as needed
            Utils.sendMail(email, val, otp);
            const hash_otp =await Utils.hashOtp(otp)
            console.log(hash_otp)
            return res.status(200).json({
                message: "OTP sent successfully",
                otp:hash_otp// Sending OTP in response (for demo, should be removed in production)
            });
        } catch (e) {
            res.status(500).json({
                message: "Internal Server Error"
            });
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
            const hash_password = await Utils.hashOtp(password)
            const [user] =await pool.query(`SELECT * FROM User where email = ?`,[email]);
            if(user.length){
                return res.status(409).json({
                    "message":"User alredy exist wiht same email"
                })
            }
         
            const [new_user] =await pool.query(`INSERT INTO User (email, name, password ) values(?,?,?)`,[email,name,hash_password])
            const token = Utils.generateToken(new_user.insertId)
            console.log(token)
            return res.status(201).json({
                "message":"Account Created Successfully",
                "token":token
            })
        }catch(e){
            console.log(e)
            res.status(500).json({
                "message":"Internal Server Error"
            })
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required."
                });
            }
    
            const [user] = await pool.query(`SELECT * FROM User WHERE email = ?`, [email]);
    
            if (user.length === 0) {
                return res.status(404).json({
                    message: "User not found."
                });
            }
            const hash_password =await Utils.hashOtp(password)
            
            if (!(hash_password == user[0].password)) {
                return res.status(401).json({
                    message: "Invalid credentials."
                });
            }
    
            const token = Utils.generateToken({ userId: user[0].user_id });
            return res.status(200).json({
                message: "Login successful.",
                token: token
            });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal Server Error."
            });
        }
    }

    static forgetPassword = async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Check if all required fields are provided
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required"
                });
            }
    
            // Hash the new password
            const hashedPassword = await Utils.hashOtp(password);
    
            // Update the user's password in the database
            const [result] = await pool.query(
                `UPDATE User SET password = ? WHERE email = ?`,
                [hashedPassword, email]
            );
    
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            // Generate a new token for the user
            const [user] = await pool.query(`SELECT user_id FROM User WHERE email = ?`, [email]);
            const token = Utils.generateToken(user[0].user_id);
    
            return res.status(200).json({
                message: "Password reset successful",
                token: token
            });
        } catch (error) {
            console.error("Error during password reset:", error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };
    
    
}


export default AuthHandlers