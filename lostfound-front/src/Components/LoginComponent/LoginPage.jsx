import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // using camelCase for setter is conventional
  const [flag, setFlag] = useState(true); // true => no invalid-credentials message

  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    // hide invalid credentials message while user types
    if (!flag) setFlag(true);
  };

  const validateLogin = async () => {
    try {
      const response = await validateUser(loginData.username, loginData.password);
      const role = String(response?.data ?? "");

      if (role === "Admin") {
        navigate("/AdminMenu");
        return;
      } else if (role === "Student") {
        navigate("/StudentMenu");
        return;
      } else {
        // invalid credentials (call setter correctly)
        setFlag(false);
        return;
      }
    } catch (err) {
      // If API errors (network, server), we can also show message
      console.error("Login error:", err);
      setFlag(false);
    }
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) validateLogin();
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="img.jpg" alt="logo" className="login-logo" />
        <h2 className="login-title">Welcome back!</h2>

        <form className="login-form" onSubmit={handleValidation}>
          <div className="input-box">
            <i className="fa fa-envelope icon"></i>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={loginData.username}
              onChange={onChangeHandler}
            />
          </div>
          {errors.username && <p className="error-text">{errors.username}</p>}

          <div className="input-box">
            <i className="fa fa-lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={onChangeHandler}
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>

        <a
         href="#" 
         className="forgot-link" 
         onClick={
          (e) => e.preventDefault()
          }>
          Forgot password?
        </a>

        {/* show invalid credentials message when flag is false */}
        {!flag && (
          <p className="error-text" style={{ marginTop: "10px" }}>
            Invalid userId or password
          </p>
        )}

        <p className="register-text">
          Don’t have an account?{" "}
          <span className="register-link" onClick={() => navigate("/Register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
