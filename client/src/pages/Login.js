import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resourses/auth.css";
import EmailCheck from "../validators/emailValidation";
import PasswordCheck from "../validators/passwordValidation";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { email, password } = values;

    if (!EmailCheck(email)) {
      message.info("Invalid email address");
      return;
    }
    if (!PasswordCheck(password)) {
      message.info(
        "Password should consist of min length 8,atleast contain one uppercase,lowercase,digit and special char"
      );
      return;
    }
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-400 card p-3">
        <h1 className="text-lg">Login</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <input required type="text" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input required type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/register">Click Here To Register</Link>
            <button className="secondary-btn" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
