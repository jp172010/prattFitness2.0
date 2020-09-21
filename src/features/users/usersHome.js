import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth.js";
import "../../app/Landing";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Home.css";
import { GoalDropdown } from "../goals/goalDropdown";
import firebase from "../../Firebase";
import { useDispatch } from "react-redux";
import { userSignIn } from "./usersSlice";

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const user = firebase.auth().currentUser;
  const dispatch = useDispatch();
  const [goals, setGoals] = useState([]);
  let name = user.displayName;
  let email = user.email;
  let photoUrl = user.photoURL;
  let emailVerified = user.emailVerified;
  let uid = user.uid;

  useEffect(() => {
    const itemsRef = firebase.database().ref("goals/" + uid);
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          type: items[item].type,
          goals: items[item].goals,
        });
      }
      setGoals(newState);
    });
  }, []);

  const removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/goals/${uid}/${itemId}`);
    itemRef.remove();
  };

  if (!currentUser) {
    return <Redirect to="./Landing" />;
  }

  dispatch(userSignIn({ name, email, photoUrl, emailVerified, uid }));

  return (
    <Container fluid id="homeContainer">
      <Row className="justify-content-md-center">
        <Col />
        <Col xs={12} md={5} id="messages">
          <div className="homeRow1">
            <h1>Goals</h1>
          </div>
          <GoalDropdown />
          {goals.map((item) => {
            return (
              <Container key={item.id} className="goal">
                <Row className="justify-content-md-center">
                  <Col xs={12}>
                    <h4>{item.type}</h4>
                  </Col>
                  <Col xs={6}>
                    <ul>
                      {item.goals.map((item) => {
                        return (
                          <li key={item.goalName}>
                            <Container>
                              <Row>
                                <Col xs={6}>{item.goalName}</Col>
                                <Col xs={6}>{item.goal}</Col>
                              </Row>
                            </Container>
                          </li>
                        );
                      })}
                    </ul>
                  </Col>
                  <Col xs={6}>
                    <Button onClick={() => removeItem(item.id)}>Delete</Button>
                  </Col>
                </Row>
              </Container>
            );
          })}
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
