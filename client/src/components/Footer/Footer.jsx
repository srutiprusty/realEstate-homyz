import React from "react";
import "./Footer.css";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./logo.png" alt="" width={120} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>
        <div className="flexColCenter f-mid">
          <span className="primaryText" style={{color:"aliceblue"}}>Reach out to us</span>
         
          
          
          
          <div className='social-icons'>
          
          
            <Link to='https://www.linkedin.com/in/sruti-prusty-995882258'>
            <FaFacebookSquare id='face-logo' />
            </Link>
            <Link to='https://www.linkedin.com/in/sruti-prusty-995882258'>
          <FaInstagram id='insta-logo'/>
            </Link>
        
          <Link to='https://www.linkedin.com/in/sruti-prusty-995882258'>
          <FaLinkedin id='linkedin-logo' />
            </Link>
          
          </div>
        </div>
        

        <div className="flexColStart f-right">
          <span className="primaryText" style={{color:"aliceblue"}}>Information</span>
          <span className="secondaryText">15th Lane , IRC Nayapali , BBSR</span>
           <div className="flexCenter f-menu">
           <NavLink to="/properties">Properties</NavLink>
            <span>Services</span>
            <span>Product</span>
            <span>About Us</span> 
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default Footer;
