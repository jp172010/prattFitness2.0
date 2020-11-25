import React, { useEffect } from "react";
import "../../app/Landing";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import firebase from "../../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { handleGoalClose } from "../goals/goalsSlice";
import { fetchGoals, deleteGoal } from "./usersSlice";
import { UpdateCircumferenceGoal } from "../goals/updateCircumferenceGoal";
import { UpdateWeightGoal } from "../goals/updateWeightGoal";
import { UpdateBodyFatGoal } from "../goals/updateBodyFatGoal";
import { UpdateMovementGoal } from "../goals/updateMovementGoal";
import { UpdateDietGoal } from "../goals/updateDietGoal";

export const GoalArea = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.users.goals);
  const user = firebase.auth().currentUser;
  let uid = user.uid;
  let newState;
  let unit;
  let content;
  let goalArea;

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
          } else if (item[items].type === "Body Fat") {
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
          } else if (item[items].type === "Diet") {
            newState = {
              type: item[items].type,
              goals: item[items].goals,
            };
            if (newState !== undefined) {
              dispatch(fetchGoals(newState));
            }
          }
        }
      }
    });
  }, []);
  const removeItem = async (itemId) => {
    const itemRef = firebase.database().ref(`users/${uid}/goals/${itemId}`);
    itemRef.remove();
    dispatch(deleteGoal(itemId));
    dispatch(handleGoalClose());
  };
  const removeBodyFat = async (itemId) => {
    const itemRef = firebase.database().ref(`users/${uid}/goals/${itemId}`);
    itemRef.remove();
    dispatch(deleteGoal("Body Fat"));
    dispatch(handleGoalClose());
  };
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
    if (item.type === "Diet") {
      return (
        <Container key={item.goals.id} className="goal">
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <h3>{item.type}</h3>
            </Col>
            <Col xs={6}>
              <ul>
                {item.goals.map((items) => {
                  if (items.goalName === "Macros") {
                    return (
                      <li key={items.id}>
                        <Container key={items.goalName}>
                          <Col xs={12}>
                            <h5>{items.goalName}</h5>
                          </Col>
                          <Row>
                            <Col>Fat Goal:</Col>
                            <Col>Carb Goal:</Col>
                            <Col>Protein Goal:</Col>
                          </Row>
                          <Row>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.fatGoal}%
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.carbGoal}%
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.proteinGoal}%
                              </span>
                            </Col>
                          </Row>
                        </Container>
                      </li>
                    );
                  }
                  if (items.goalName === "Calories") {
                    return (
                      <li key={items.id}>
                        <Container key={items.goalName}>
                          <Col xs={12}>
                            <h5>{items.goalName}</h5>
                          </Col>
                          <Row>
                            <Col>Calorie Goal:</Col>
                          </Row>
                          <Row>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.calorieGoal}kcal
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
              <UpdateDietGoal />
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
                    unit = "lbs";
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
                  if (items.hSPU) {
                    const hSPUReps = parseInt(items.hSPUReps);
                    const goalHSPU = parseInt(items.goalHSPU);
                    const toGoal = goalHSPU - hSPUReps;
                    content = (
                      <Container>
                        <Row>
                          <Col>Current HSPU:</Col>
                          <Col>Goal:</Col>
                          <Col>Remaining:</Col>
                        </Row>
                        <Row>
                          <Col>
                            <span style={{ color: "white" }}>
                              {items.hSPUReps}
                            </span>
                          </Col>
                          <Col>
                            <span style={{ color: "white" }}>
                              {items.goalHSPU}
                            </span>
                          </Col>
                          <Col>
                            <span style={{ color: "red" }}>{toGoal}</span>
                          </Col>
                        </Row>
                      </Container>
                    );
                  }
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
                  if (items.goalName === "Handstand") {
                    return (
                      <li key={items.id}>
                        <Container key={items.goalName}>
                          <Col xs={12}>
                            <h5>{items.goalName}</h5>
                          </Col>
                          <Row>
                            <Col>Current Time:</Col>
                            <Col>Goal:</Col>
                            <Col>Remaining:</Col>
                          </Row>
                          <Row>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.currentTime}sec
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "white" }}>
                                {items.goalTime}sec
                              </span>
                            </Col>
                            <Col>
                              <span style={{ color: "red" }}>
                                {toTimeGoal}sec
                              </span>
                            </Col>
                            {content}
                          </Row>
                        </Container>
                      </li>
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
    if (item.type === "Body Fat") {
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
            <Button variant="danger" onClick={() => removeBodyFat("BodyFat")}>
              Delete
            </Button>
          </Row>
        </Container>
      );
    }
  });
 return (
     <Container>
         {goalArea}
     </Container>
 )
};
