import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
class Utils {
    static raeson = [
        {
            "Subject":"OTP for Registration",
            "Body":"Your OTP for the registration"
        },
        {
            "Subject":"OTP for reseting password",
            "Body":"Your OTP for the reseting password"
        }
    ]
    static passwordEncrypt = async (password) => {
        const hash_password = await bcrypt.hash(password, 10);
        return hash_password
    }

    static generateToken = (payload)=>{
        return jwt.sign(payload,process.env.JWT_TOKEN)
    }

    static vefigyToken = (token)=>{
        return jwt.verify(token,process.env.JWT_TOKEN)
    }

    static sendMail = async (email,val,otp)=>{
        const res = Utils.raeson[val];
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        console.log(otp)
        const mail_option = {
            from:process.env.EMAIL,
            to: email,
            subject:res['subject'],
            test:res['body']+otp
        }
        transporter.sendMail(mail_option,(error,info)=>{
            if(error){
                console.log("Error sending mail"+error)
            }else{
                console.log("Mail sended successfully")
            }
        });
    }

    static generateOtp=()=>{
        return Math.floor(100000+Math.random()*900000).toString();
    }
}


export default Utils
