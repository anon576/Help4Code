import React from 'react'
import { FaInstagram, FaXTwitter, FaDiscord, FaLinkedin, FaGithub, FaMobileScreen, FaEnvelope, FaMessage, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import "../../style/footer.css"
import logo from '../../images/logo.png'


const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-content">
                <div className="footer-col-2">
                    <div className="footer-heading-1">
                        <img src={logo} alt="" />
                        <h2>Help4Code</h2>
                    </div>

                    <div className="footer-description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae optio, ad facere ipsum at repellendus id ab. Quod, voluptas!</p>
                    </div>
                </div>

                <div className="footer-col-2">
                    <div className="footer-heading">
                        <h2>Stay <span>Connected</span></h2>
                    </div>

                    <div className="social-links">
                        <Link to="#"><FaInstagram /><span>Instagram</span></Link>
                        <Link to="#"><FaXTwitter /><span>X/Twitter</span></Link>
                        <Link to="#"><FaYoutube /><span>Youtube</span></Link>
                        <Link to="#"><FaLinkedin /><span>LinkedIN</span></Link>
                        <Link to="#"><FaWhatsapp /><span>WhatsApp Chennel</span></Link>
                    </div>
                </div>

                <div className="footer-col-2">
                    <div className="footer-heading">
                        <h2>Contact <span>information</span></h2>
                    </div>

                    <div className="footer-contact-info">
                        <Link to="#"><FaMobileScreen /><span>9999999999</span></Link>
                        <Link to="#"><FaEnvelope /><span>sample@gmail.com</span></Link>
                        <Link to="/contact"><FaMessage /><span>Contact US</span></Link>
                    </div>
                </div>

                <div className="footer-contact">
                    <div className="footer-heading">
                        <h2>Contact <span>Us</span></h2>
                    </div>
                    <form action="" className='footer-contact-form'>
                        <input type="text" placeholder='Name' required/>
                        <input type="email" placeholder='E-mail' required/>
                        <textarea name="" id="" cols="30" rows="10" placeholder='Message' required></textarea>
                        <input type="submit" className='contact-button' />
                    </form>
                </div>

              

            </div>

            <div className="footer-copy-right">
                <p>Copyright &#169; 2023 All Right Reserved.</p>
            </div>

        </div>
    )
}

export default Footer
