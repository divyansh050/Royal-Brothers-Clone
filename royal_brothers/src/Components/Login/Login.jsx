import React from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";

export const Login = () => {


  const [captcha, setCaptcha] = React.useState(false);

  const handleCaptcha = () => {
    setCaptcha(true);
  }


  return (
    <div className="login">
      <p className="head">Rent . Ride . Explore</p>

      <div className="box">
        <div className="flex">
          <p>LOGIN</p>
          <p>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              SIGN UP
            </Link>
          </p>
        </div>

        <p className="ph">Phone</p>
        <div className="phone">
          <input type="number" placeholder="+91" />
          <input type="number" />
        </div>

        <input className="inp" type="password" placeholder="Password" />

        <div className="forget">
          <div>
            <input type="checkbox" /> Remember password?
          </div>
          <a href="##">Forgot password?</a>
        </div>

        {/* catcha work is pending */}

        <ReCAPTCHA sitekey="Your client site key" onChange={handleCaptcha} />

        <button className="btn loginbutton">Login with Password</button>
        <p>OR</p>
        <button className="loginbutton">Login with OTP</button>
      </div>
    </div>
  );
}
