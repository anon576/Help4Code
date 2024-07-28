import React, { useState } from 'react';
import { FaAngleDown, FaBars, FaXmark } from "react-icons/fa6";
import "../../style/nav-bar.css"
import logo from "../../images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Header = (props) => {

  const isUserSignedIn = !!localStorage.getItem('token')

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  let handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const GoToRegister = () => {
    navigate('/signup')
    handleMenu()
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    // navigate('/login')
}


  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={logo} alt="" />
        <span className="name"><Link to="/" style={{color:'black'}}>Help4Code</Link></span>
      </div>
      <ul className='nav-links'>
        <li><Link to="/">Home</Link></li>
        <div className="sub-links">
          <li><Link to="/about">Tutorials</Link><span className='drop-icon'><FaAngleDown /></span></li>
          <div className="sub-links-options">
            <li><Link to="#">C Tutorials</Link></li>
            <li><Link to="#">C++ Tutorials</Link></li>
            <li><Link to="/about#projects">Java Tutorials</Link></li>
            <li><Link to="#">HTML CSS Tutorials</Link></li>
            <li><Link to="#">Ajax Tutorials</Link></li>
            <li><Link to="#">J2EE Tutorials</Link></li>
            <li><Link to="#">SQL Tutorials</Link></li>
            <li><Link to="#">JQuery Tutorials</Link></li>
      
          </div>
        </div>

        <div className="sub-links">
          <li><Link to="/courses">Programs</Link><span className='drop-icon'><FaAngleDown /></span></li>
          <div className="sub-links-options">
            <li><Link to="#">C Programs</Link></li>
            <li><Link to="#">C++ Programs</Link></li>
            <li><Link to="#">Java Programs</Link></li>
            <li><Link to="#">HTML & CSS</Link></li>
            <li><Link to="#">Python Programs</Link></li>
            <li><Link to="#">Oracle Program</Link></li>
            <li><Link to="#">C# Program</Link></li>
          </div>
        </div>

        <div className="sub-links">
          <li><Link to="/services">Services</Link><span className='drop-icon'><FaAngleDown /></span></li>
          <div className="sub-links-options">
            <li><Link to="#">Web development</Link></li>
            <li><Link to="#">App Development</Link></li>
            <li><Link to="#">Software Development</Link></li>
            <li><Link to="#">ERP Software</Link></li>
            <li><Link to="#">Api Services</Link></li>
            <li><Link to="#">Courses</Link></li>
            <li><Link to="#">Training</Link></li>
          </div>
        </div>

        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <ul className='nav-buttons'>
        {isUserSignedIn ? (
          " "
        ) : (
          <>
            <li className='button login-button' onClick={() => props.trigger(true)}>Log In</li>
            <li className='button login-button' onClick={() => navigate('/signup')}>Sign Up</li>
          </>
        )}
        <li className='menu-bar' onClick={handleMenu}><FaBars /></li>
      </ul>

      <div className={`slider ${showMenu ? 'open-slider' : null}`}>
        <ul className='slider-content'>
          <div className='nav-buttons slider-btn'>
            {isUserSignedIn ? (
              " "
            ) : (
              <>
                <li className='button' onClick={() => props.trigger(true)}>Login</li>
                <li className='button' onClick={GoToRegister}>SignUp</li>
              </>
            )}
            <li className='menu-cross' onClick={handleMenu}><FaXmark /></li>
          </div>
          <Link to="/" onClick={handleMenu}>Home</Link>
          <Link to="/about" onClick={handleMenu}>About</Link>
          <Link to="#" onClick={handleMenu}>Tutorials</Link>
          <Link to="#" onClick={handleMenu}>Programs</Link>
          <Link to="#" onClick={handleMenu}>Interview Question</Link>
          <Link to="#" onClick={handleMenu}>Technical Question</Link>
          <Link to="/services" onClick={handleMenu}>Services</Link>
          <Link to="/contact" onClick={handleMenu}>Contact</Link>
          {/* <div className="theme">
            <input type="checkbox" id='theme' />
            <label htmlFor="theme" className='theme-button'>Theme<span className='drop-theme'><FaAngleDown /></span></label>
            <div className="collapsible-content">
              <Link>Light</Link>
              <Link>Dark</Link>
            </div>
          </div> */}
          {isUserSignedIn ? (
            <Link to="/profile" onClick={handleMenu}>profile</Link>
          ) : ""}

          <Link to="#">Faq's</Link>

          {isUserSignedIn ? (
            <Link className='logout' onClick={handleSignOut}>logout</Link>
          ) : ""}

        </ul>

      </div>
      <div className={`nav-over-lay ${showMenu ? 'open-nav-over-lay' : null}`} onClick={handleMenu} ></div>
    </div>
  );
};

export default Header;