import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';
import './RegisterUser.css';

const RegisterUser = () => {

  const [lostFoundUser, setlostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setlostFoundUser({ ...lostFoundUser, [name]: value });
  };

  const createNewUser = (event) => {
    event.preventDefault();

    if (lostFoundUser.password === confirmPassword) {
      registerNewUser(lostFoundUser).then((response) => {
        alert("User registered successfully! Please login.");
        navigate('/');
      });
    }
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (lostFoundUser.password.length < 5 || lostFoundUser.password.length > 10) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    }

    if (lostFoundUser.password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!lostFoundUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }

    if (!lostFoundUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(lostFoundUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }

    if (!lostFoundUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      createNewUser(event);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="form-container">
        <div className="form-card">
          <h2 className="text-center">New User Registration</h2>

          <form>
            <div className="form-group">
              <label>User Name:</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className="form-control"
                value={lostFoundUser.username}
                onChange={onChangeHandler}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control"
                value={lostFoundUser.password}
                onChange={onChangeHandler}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label>Retype Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <div className="form-group">
              <label>Personal Name:</label>
              <input
                type="text"
                name="personalName"
                placeholder="Enter Full Name"
                className="form-control"
                value={lostFoundUser.personalName}
                onChange={onChangeHandler}
              />
              {errors.personalName && <p className="error">{errors.personalName}</p>}
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control"
                value={lostFoundUser.email}
                onChange={onChangeHandler}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Select Role:</label>
              <input
                list="types"
                name="role"
                className="form-control"
                placeholder="Choose Role"
                value={lostFoundUser.role}
                onChange={onChangeHandler}
              />
              <datalist id="types">
                <option value="Student" />
                <option value="Admin" />
              </datalist>
              {errors.role && <p className="error">{errors.role}</p>}
            </div>

            <button className="btn-submit" onClick={handleValidation}>
              Submit
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
