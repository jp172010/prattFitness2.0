import React, { useContext } from "react";
import { AuthContext } from "../../Auth.js";
import "../../app/Landing";
import { Redirect } from "react-router";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Home.css";
import { GoalDropdown } from "../goals/goalDropdown";
import { GoalArea } from "../users/goalArea"
import firebase from "../../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "./usersSlice";

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const user = firebase.auth().currentUser;
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.users.goals);
  let name;
  let email;
  let photoUrl;
  let emailVerified;
  let uid;

  if (!currentUser) {
    return <Redirect to="./Landing" />;
  }

  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;
  dispatch(userSignIn({ name, email, photoUrl, emailVerified, uid }));

  return (
    <Container fluid id="homeContainer">
      <Row className="justify-content-md-center">
        <Col />
        <Col xs={12} md={5} id="messages" className="overflow-auto">
          <div className="homeRow1">
            <h1>Goals</h1>
          </div>
          <GoalDropdown />
          <GoalArea />
        </Col>
        <Col />
        <Col xs={12} md={5} id="workout">
          <div className="homeRow1">
            <h1>Todays Workout</h1>
          </div>
        </Col>
        <Col />
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} id="calendar">
          <div>
            <h1>Calendar</h1>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} md={5} id="recentWorkouts">
          <div>
            <h1>Messages</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
