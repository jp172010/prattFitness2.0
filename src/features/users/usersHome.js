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
import { UpdateCircumferenceGoal } from "../goals/updateCircumferenceGoal";
import { UpdateWeightGoal } from "../goals/updateWeightGoal";
import { UpdateBodyFatGoal } from "../goals/updateBodyFatGoal";
import { UpdateMovementGoal } from "../goals/updateMovementGoal";

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
  let content;

  useEffect(() => {
    const goalsRef = firebase.database().ref("users/" + uid + "/goals");
    goalsRef.on("value", (snapshot) => {
      let item = snapshot.val();
      if (item !== null) {
        for (let items in item) {
          if (item[items].type === "Circumference") {
            newState = {
              type: item[items].type,
              goals: item[items].goals,
              unit: item[items].unit,
            };
            if (newState !== undefined) {
              dispatch(fetchGoals(newState));
            }
          } else if (item[items].type === "Weight") {
            newState = {
              type: item[items].type,
              goals: item[items].newGoal,
              current: item[items].currentGoal,
              unit: item[items].unit,
            };
            if (newState !== undefined) {
              dispatch(fetchGoals(newState));
            }
          } else if (item[items].type === "BodyFat") {
            newState = {
              type: item[items].type,
              goals: item[items].newGoal,
              current: item[items].currentGoal,
            };
            if (newState !== undefined) {
              dispatch(fetchGoals(newState));
            }
          } else if (item[items].type === "Movement") {
            newState = {
              type: item[items].type,
              goals: item[items].goals,
              unit: item[items].unit,
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
      if (item.unit === "Metric" && item.type === "Weight") {
        unit = "kg";
      } else if (item.unit === "Imperial" && item.type === "Weight") {
        unit = "lbs";
      } 
      if (item.type === "Circumference") {
        if (item.unit === "Metric") {
          unit = "cm";
        } else {
          unit = '"';
        }
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
                        <Col xs={12}>
                              <h5>{item.goalName}</h5>
                            </Col>
                          <Row>
                            <Col>Current:</Col>
                            <Col>Goal:</Col>
                            <Col>Remaining:</Col>
                          </Row>
                          <Row>
                            <Col>
                              <span style={{ color: "white" }}>
                                {item.currentGoal}
                                {unit}
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "white" }}>
                                {item.goal}
                                {unit}
                              </span>
                            </Col>
                            <Col>
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
      if (item.type === "Movement") {
        return (
          <Container key={item.goals.id} className="goal">
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <h3>{item.type}</h3>
              </Col>
              <Col xs={6}>
                <ul>
                  {item.goals.map((items) => {
                    if (
                      item.unit === "Metric" &&
                      (items.goalName === "Running" ||
                        items.goalName === "Rowing" ||
                        items.goalName === "Cycling" ||
                        items.goalName === "Swimming")
                    ) {
                      unit = "km";
                    } else if (
                      item.unit === "Imperial" &&
                      (items.goalName === "Running" ||
                        items.goalName === "Rowing" ||
                        items.goalName === "Cycling" ||
                        items.goalName === "Swimming")
                    ) {
                      unit = "mi";
                    } else if (item.unit === "Metric") {
                      unit = "kg";
                    } else if (item.unit === "Imperial") {
                      unit = "lbs"
                    }
                    const goalTime = parseInt(items.goalTime);
                    const currentTime = parseInt(items.currentTime);
                    const currentHeight = parseInt(items.currentHeight);
                    const goalHeight = parseInt(items.goalHeight);
                    const currentOneRepMax = parseInt(items.current1RM);
                    const goalOneRepMax = parseInt(items.goal1RM);
                    const currentGoalNumber = parseInt(items.currentRepetitions);
                    const goalNumber = parseInt(items.goalRepetitions);
                    const toTimeGoal = goalTime - currentTime;
                    const toHeightGoal = goalHeight - currentHeight;
                    const toGoal = goalOneRepMax - currentOneRepMax;
                    const numberToGoal = goalNumber - currentGoalNumber;
                    if (items.double) {
                      const doubleReps = parseInt(items.doubleReps);
                      const goalDouble = parseInt(items.goalDouble);
                      const toGoal = goalDouble - doubleReps;
                      content = (
                        <Container>
                          <Row>
                            <Col>Current Doubles:</Col>
                            <Col>Goal:</Col>
                            <Col>Remaining:</Col>
                          </Row>
                          <Row>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.doubleReps}
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.goalDouble}
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "red" }}>{toGoal}</span>
                            </Col>
                          </Row>
                        </Container>
                      );
                    }
                    if (items.weighted) {
                      const currentWeight = parseInt(items.currentWeight);
                      const goalWeight = parseInt(items.goalWeight);
                      const toGoal = goalWeight - currentWeight;
                      content = (
                        <Container>
                          <Row>
                            <Col>Current Weight:</Col>
                            <Col>Goal:</Col>
                            <Col>Remaining:</Col>
                          </Row>
                          <Row>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.currentWeight}
                                {unit}
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.goalWeight}
                                {unit}
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "red" }}>
                                {toGoal}
                                {unit}
                              </span>
                            </Col>
                          </Row>
                        </Container>
                      );
                    }
                    if (
                      items.goalName === "Pull Up" ||
                      items.goalName === "Jump Rope"
                    ) {
                      return (
                        <li key={items.id}>
                          <Container key={items.goalName}>
                            <Col xs={12}>
                              <h5>{items.goalName}</h5>
                            </Col>
                            <Row>
                              <Col>Current Reps:</Col>
                              <Col>Goal:</Col>
                              <Col>Remaining:</Col>
                            </Row>
                            <Row>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.currentRepetitions}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.goalRepetitions}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "red" }}>
                                  {numberToGoal}
                                </span>
                              </Col>
                              {content}
                            </Row>
                          </Container>
                        </li>
                      );
                    }
                    if (
                      items.goalName === "Push Up" ||
                      items.goalName === "Sit Up"
                    ) {
                      return (
                        <li key={items.id}>
                          <Container key={items.goalName}>
                            <Col xs={12}>
                              <h5>{items.goalName}</h5>
                            </Col>
                            <Row>
                              <Col>Current Reps:</Col>
                              <Col>Goal:</Col>
                              <Col>Remaining:</Col>
                            </Row>
                            <Row>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.currentRepetitions}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.goalRepetitions}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "red" }}>
                                  {numberToGoal}
                                </span>
                              </Col>
                            </Row>
                          </Container>
                        </li>
                      );
                    }
                    if (items.goalName === "Box Jump") {
                      return (
                        <li key={items.id}>
                          <Container key={items.goalName}>
                            <Col xs={12}>
                              <h5>{items.goalName}</h5>
                            </Col>
                            <Row>
                              <Col>Current Height:</Col>
                              <Col>Goal:</Col>
                              <Col>Remaining:</Col>
                            </Row>
                            <Row>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.currentHeight}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.goalHeight}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "red" }}>
                                  {toHeightGoal}
                                </span>
                              </Col>
                            </Row>
                          </Container>
                        </li>
                      );
                    }
                    if (
                      items.goalName === "Running" ||
                      items.goalName === "Rowing" ||
                      items.goalName === "Cycling" ||
                      items.goalName === "Swimming"
                    ) {
                      return (
                        <li key={items.id}>
                          <Container key={items.goalName}>
                            <Col xs={12}>
                              <h5>{items.goalName}</h5>
                            </Col>
                            <Row>
                              <Col xs={3}>Distance Goal:</Col>
                              <Col xs={3}>Current Time:</Col>
                              <Col xs={3}>Goal Time:</Col>
                              <Col xs={3}>Remaining:</Col>
                            </Row>
                            <Row>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.goalDistance}
                                  {unit}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.currentTime}
                                  min
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.goalTime}
                                  min
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "red" }}>
                                  {toTimeGoal}
                                  min
                                </span>
                              </Col>
                            </Row>
                          </Container>
                        </li>
                      );
                    }
                    if (
                      items.goalName === "Squat" ||
                      items.goalName === "Bench Press" ||
                      items.goalName === "Deadlift" ||
                      items.goalName === "Snatch" ||
                      items.goalName === "Clean and Jerk" ||
                      items.goalName === "Turkish Get Up"
                    ) {
                      return (
                        <li key={items.id}>
                          <Container key={items.goalName}>
                            <Col xs={12}>
                              <h5>{items.goalName}</h5>
                            </Col>
                            <Row>
                              <Col>1RM:</Col>
                              <Col>Goal:</Col>
                              <Col>Remaining:</Col>
                            </Row>
                            <Row>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.current1RM}
                                  {unit}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "white" }}>
                                  {items.goal1RM}
                                  {unit}
                                </span>
                              </Col>
                              <Col>
                                <span style={{ color: "red" }}>
                                  {toGoal}
                                  {unit}
                                </span>
                              </Col>
                            </Row>
                          </Container>
                        </li>
                      );
                    }
                  })}
                </ul>
              </Col>
              <Col xs={6}>
                <UpdateMovementGoal />
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
        if (item.unit === "Metric") {
          unit = "kg";
        } else {
          unit = "lbs";
        }
        const currentGoalNumber = parseInt(item.current);
        const goalNumber = parseInt(item.goals);
        const numberToGoal = goalNumber - currentGoalNumber;
        return (
          <Container key={item.id} className="goal">
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <h3>{item.type}</h3>
              </Col>
              <Col xs={6}>
                <Col xs={12}>{item.goalName}</Col>
                <Row>
                  <Col>Current:</Col>
                  <Col>Goal:</Col>
                  <Col>Remaining:</Col>
                </Row>
                <Row>
                  <Col>
                    <span style={{ color: "white" }}>
                      {item.current}
                      {unit}
                    </span>
                  </Col>
                  <Col>
                    <span style={{ color: "white" }}>
                      {item.goals}
                      {unit}
                    </span>
                  </Col>
                  <Col>
                    <span style={{ color: "red" }}>
                      {numberToGoal}
                      {unit}
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <UpdateWeightGoal />
              </Col>
              <Col xs={6} />
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
              <Col xs={6}>
                <Col xs={12}>{item.goalName}</Col>
                <Row>
                  <Col>Current:</Col>
                  <Col>Goal:</Col>
                  <Col>Remaining:</Col>
                </Row>
                <Row>
                  <Col>
                    <span style={{ color: "white" }}>{item.current}%</span>
                  </Col>
                  <Col>
                    <span style={{ color: "white" }}>{item.goals}%</span>
                  </Col>
                  <Col>
                    <span style={{ color: "red" }}>{numberToGoal}%</span>
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <UpdateBodyFatGoal />
              </Col>
              <Col xs={6} />
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
