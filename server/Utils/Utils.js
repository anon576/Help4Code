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

    static hashOtp = async (otp) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(otp);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    };
}


export default Utils
