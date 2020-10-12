import React, { useContext, useEffect} from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { handleGoalClose } from "../goals/goalsSlice"
import { userSignIn, fetchGoals, deleteGoal } from "./usersSlice";
import { UpdateCircumferenceGoal } from "../goals/updateCircumferenceGoal.js";

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
  let goalArea;
  let newState;
  let unit;

  useEffect(() => {
    const itemsRef = firebase.database().ref("users/" + uid + "/goals/");
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      for (let item in items) {
        newState = {
          id: item,
          type: items[item].type,
          goals: items[item].goals,
          unit: items[item].unit,
        };
        if (newState !== undefined) {
          dispatch(fetchGoals(newState));
        }
      }
    });
  }, []);

  if (!currentUser) {
    return <Redirect to="./Landing" />;
  }

  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;
  dispatch(userSignIn({ name, email, photoUrl, emailVerified, uid }));

  const removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`users/${uid}/goals/${itemId}`);
    itemRef.remove();
    dispatch(deleteGoal(itemId));
    dispatch(handleGoalClose());
  };

  if (goals.length >= 1) {
    goalArea = goals.map((item) => {
      if (item.unit === "Metric") {
        unit = "cm";
      } else if (item.unit === "Imperial") {
        unit = '"';
      }

      return (
        <Container key={item.goals.id} className="goal">
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <h4>{item.type}</h4>
            </Col>
            <Col xs={6}>
              <ul>
                {item.goals.map((item) => {
                  return (
                    <li key={item.id}>
                      <Container key={item.goalName}>
                        <Row>
                          <Col xs={12}>{item.goalName}</Col>
                          <Col>
                            Current: &nbsp;
                            {item.currentGoal}
                            {unit}
                          </Col>
                          <Col>
                            Goal: &nbsp;
                            {item.goal}
                            {unit}
                          </Col>
                        </Row>
                      </Container>
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col xs={6}>
              <UpdateCircumferenceGoal id={item.id}/>
            </Col>
            <Col xs={6} />
            <Col xs={6}>
              <Button variant="danger" onClick={() => removeItem(item.id)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      );
    });
  }

  return (
    <Container fluid id="homeContainer">
      <Row className="justify-content-md-center">
        <Col />
        <Col xs={12} md={5} id="messages" className="overflow-auto">
          <div className="homeRow1">
            <h1>Goals</h1>
          </div>
          <GoalDropdown />
          {goalArea}
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
