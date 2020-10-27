import React, { useContext, useEffect } from "react";
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
import { handleGoalClose } from "../goals/goalsSlice";
import { userSignIn, fetchGoals, deleteGoal } from "./usersSlice";
import { UpdateCircumferenceGoal } from "../goals/updateCircumferenceGoal.js";
import { UpdateWeightGoal } from "../goals/updateWeightGoal";
import { UpdateBodyFatGoal } from "../goals/updateBodyFatGoal";

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
    const goalsRef = firebase
      .database()
      .ref("users/" + uid + "/goals");
    goalsRef.on("value", (snapshot) => {
      let item = snapshot.val();
      if (item !== null) {
        for(let items in item){
          if(item[items].type === "Circumference"){
            newState = {
              
              type: item[items].type,
              goals: item[items].goals,
              unit: item[items].unit,
            };
            if (newState !== undefined) {
              dispatch(fetchGoals(newState));
            }
          }else if(item[items].type === "Weight"){
            newState = {
              
              type: item[items].type,
              goals: item[items].newGoal,
              current: item[items].currentGoal,
              unit: item[items].unit,
            };
            if (newState !== undefined) {
              dispatch(fetchGoals(newState));
            }
          }else if(item[items].type === "BodyFat"){
            newState = {
              
              type: item[items].type,
              goals: item[items].newGoal,
              current: item[items].currentGoal,
            };
            if (newState !== undefined) {
              dispatch(fetchGoals(newState));
            }
          }
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

  const removeItem = async (itemId) => {
    const itemRef = firebase.database().ref(`users/${uid}/goals/${itemId}`);
    itemRef.remove();
    dispatch(deleteGoal(itemId));
    dispatch(handleGoalClose());
  };

  if (goals.length >= 1) {
    goalArea = goals.map((item) => {
      if (item.unit === "Metric" && item.type === "Circumference") {
        unit = "cm";
      } else if (item.unit === "Imperial" && item.type === "Circumference") {
        unit = '"';
      } else if (item.unit === "Metric" && item.type === "Weight") {
        unit = "kg";
      } else if (item.unit === "Imperial" && item.type === "Weight") {
        unit = "lb";
      }
      if (item.type === "Circumference") {
        return (
          <Container key={item.goals.id} className="goal">
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <h3>{item.type}</h3>
              </Col>
              <Col xs={6}>
                <ul>
                  {item.goals.map((item) => {
                    const currentGoalNumber = parseInt(item.currentGoal);
                    const goalNumber = parseInt(item.goal);
                    const numberToGoal = goalNumber - currentGoalNumber;
                    return (
                      <li key={item.id}>
                        <Container key={item.goalName}>
                          <Row>
                            <Col xs={12}>
                              <h5>{item.goalName}</h5>
                            </Col>
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
                            <Col>
                              Remaining: &nbsp;
                              <span style={{ color: "red" }}>
                                {numberToGoal}
                                {unit}
                              </span>
                            </Col>
                          </Row>
                        </Container>
                      </li>
                    );
                  })}
                </ul>
              </Col>
              <Col xs={6}>
                <UpdateCircumferenceGoal />
              </Col>
              <Col xs={6} />
              <Col xs={6}>
                <Button variant="danger" onClick={() => removeItem(item.type)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        );
      }
      if (item.type === "Weight") {
        const currentGoalNumber = parseInt(item.current);
        const goalNumber = parseInt(item.goals);
        const numberToGoal = goalNumber - currentGoalNumber;
        return (
          <Container key={item.id} className="goal">
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <h3>{item.type}</h3>
              </Col>
              <Col>
                <Row>
                  <Col xs={12}>{item.goalName}</Col>
                  <Col>
                    Current: &nbsp;
                    {item.current}
                    {unit}
                  </Col>
                  <Col>
                    Goal: &nbsp;
                    {item.goals}
                    {unit}
                  </Col>
                  <Col>
                    Remaining: &nbsp;
                    <span style={{ color: "red" }}>
                      {numberToGoal}
                      {unit}
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col xs={7}>
                <UpdateWeightGoal />
              </Col>
              <Col xs={5} />
              <Button variant="danger" onClick={() => removeItem(item.type)}>
                Delete
              </Button>
            </Row>
          </Container>
        );
      }
      if (item.type === "BodyFat") {
        const currentGoalNumber = parseInt(item.current);
        const goalNumber = parseInt(item.goals);
        const numberToGoal = goalNumber - currentGoalNumber;
        return (
          <Container key={item.id} className="goal">
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <h3>{item.type}</h3>
              </Col>
              <Col>
                <Row>
                  <Col xs={12}>{item.goalName}</Col>
                  <Col>
                    Current: &nbsp;
                    {item.current}
                    %
                  </Col>
                  <Col>
                    Goal: &nbsp;
                    {item.goals}
                    %
                  </Col>
                  Remaining: &nbsp;
                  <span style={{ color: "red" }}>
                      {numberToGoal}
                      %
                    </span>
                </Row>
              </Col>
              <Col xs={7}>
                <UpdateBodyFatGoal />
              </Col>
              <Col xs={5} />
              <Button variant="danger" onClick={() => removeItem(item.type)}>
                Delete
              </Button>
            </Row>
          </Container>
        );
      }
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
