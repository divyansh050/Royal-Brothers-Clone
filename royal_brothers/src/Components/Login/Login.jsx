import React from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../Redux/Login/action";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export const Login = () => {

  const bikeScheduleDetails = JSON.parse(
    localStorage.getItem("bikeScheduleDetails") || false
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [captcha, setCaptcha] = React.useState(false);

  const [userDetails, setUserDetails] = React.useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log(userDetails);

    // login flow complete, connect redux, isAuth and token store remaining

    axios
      .post("https://royal-brothers.herokuapp.com/login", userDetails)
      .then((res) => {
        console.log(res.data);
        alert("Login Successful");

        dispatch(loginSuccess(res.data));
        localStorage.setItem("userDetailsRoyalBrothers", JSON.stringify(res.data));

        
        setUserDetails({
          phone: "",
          password: "",
        });

        if (!bikeScheduleDetails){
          navigate("/");
          return
        }
        
        navigate("/product");
      })
      .catch((err) => {
        console.log(err);
        alert("Login Failed");
        dispatch(loginFailure());
      });
  };

  const handleCaptcha = () => {
    setCaptcha(true);
  };

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
          <input
            value={userDetails.phone}
            type="number"
            onChange={handleChange}
            name="phone"
          />
        </div>

        <input
          value={userDetails.password}
          onChange={handleChange}
          name="password"
          className="inp"
          type="password"
          placeholder="Password"
        />

        <div className="forget">
          <div>
            <input type="checkbox" /> Remember password?
          </div>
          <a href="##">Forgot password?</a>
        </div>

        {/* catcha work is pending */}

        {/* <ReCAPTCHA
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "-12px",
          }}
          sitekey="Your client site key"
          onChange={handleCaptcha}
        /> */}

        <button onClick={handleSubmit} className="btn loginbutton">
          Login with Password
        </button>
        <p style={{ margin: "20px" }}>OR</p>
        <button className="loginbutton">Login with OTP</button>
      </div>
    </div>
  );
};
