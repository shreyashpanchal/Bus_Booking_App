import React, { useState } from "react";
import { Form, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import "../resourses/auth.css";
import EmailCheck from "../validators/emailValidation";
import PasswordCheck from "../validators/passwordValidation";
import PhoneCheck from "../validators/phoneValidation";
import { axiosInstance } from "../helpers/axiosInstance";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onFinish = async (values) => {
    const { email, phone, password } = values;
    values.gender = values.gender == 1 ? "Male" : "Female";
    if (!EmailCheck(email)) {
      message.info("Enter valid email address");
      return;
    }
    if (!PasswordCheck(password)) {
      message.info(
        "Password should consist of min length 8,atleast contain one uppercase,lowercase,digit and special char"
      );
      return;
    }
    if (!PhoneCheck(phone)) {
      message.info("Enter valid phone number");
      return;
    }
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
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
        <h1 className="text-lg">Register</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <input required type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input required type="text" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input required type="password" />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group onChange={onChange} value={value}>
              <Radio defaultValue={true} value={1}>
                Male
              </Radio>
              <Radio value={2}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Mobile Number" name="phone">
            <input required type="number" />
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/login">Click Here To Login</Link>
            <button className="secondary-btn" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
