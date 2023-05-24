import React from "react";
import "../resourses/global.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import Profilepic from "../profile.png";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button, message } from "antd";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
const PersonalProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const deleteProfile = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/delete-by-id");
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      {
        dispatch(HideLoading());
        message.error(err.message);
      }
    }
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={Profilepic}
                    alt="Avatar"
                    className="my-4"
                    style={{ width: "100px", cursor: "pointer" }}
                    fluid
                  />
                  <br />
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <MDBCardText>{user?.isAdmin ? "Admin" : "User"}</MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="10" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {user.email}
                        </MDBCardText>
                      </MDBCol>
                      <MDBRow />
                      <MDBCol size="10" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {user.phone}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="10" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted">
                          {user.gender}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <Button danger type="primary" onClick={deleteProfile}>
                        Delete Account
                      </Button>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default PersonalProfile;
