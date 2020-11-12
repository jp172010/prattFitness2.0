import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../Firebase";
import {
  movementGoalChecked,
  movementGoalUnchecked,
  handleGoalClose,
  handleUnitChange,
} from "./goalsSlice";
import { deleteGoal, fetchGoals } from "../users/usersSlice";
import { MovementForm } from "./movementForm";

export const UpdateMovementGoal = () => {
  let content;
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.goals.unit);
  const goals = useSelector((state) => state.users.goals);
  const movementGoals = useSelector((state) => state.goals.movementGoals);
  const [show, setShow] = useState(false);
  const [checkedPullUp, setPullUpChecked] = useState(false);
  const [checkedPushUp, setPushUpChecked] = useState(false);
  const [checkedSitUp, setSitUpChecked] = useState(false);
  const [checkedSquat, setSquatChecked] = useState(false);
  const [checkedBenchPress, setBenchPressChecked] = useState(false);
  const [checkedDeadlift, setDeadliftChecked] = useState(false);
  const [checkedSnatch, setSnatchChecked] = useState(false);
  const [checkedCleanAndJerk, setCleanAndJerkChecked] = useState(false);
  const [checkedHandstand, setHandstandChecked] = useState(false);
  const [checkedTurkishGetUp, setTurkishGetUpChecked] = useState(false);
  const [checkedBoxJump, setBoxJumpChecked] = useState(false);
  const [checkedJumpRope, setJumpRopeChecked] = useState(false);
  const [checkedRunning, setRunningChecked] = useState(false);
  const [checkedRowing, setRowingChecked] = useState(false);
  const [checkedCycling, setCyclingChecked] = useState(false);
  const [checkedSwimming, setSwimmingChecked] = useState(false);
  const myIndex = goals.findIndex((goal) => goal.type === "Movement");

  useEffect(() => {
    commenceCheck();
  });

  const checkChecked = (id) => {
    switch (id) {
      case "Pull Up":
        setPullUpChecked(true);
        break;
      case "Push Up":
        setPushUpChecked(true);
        break;
      case "Sit Up":
        setSitUpChecked(true);
        break;
      case "Squat":
        setSquatChecked(true);
        break;
      case "Bench Press":
        setBenchPressChecked(true);
        break;
      case "Deadlift":
        setDeadliftChecked(true);
        break;
      case "Snatch":
        setSnatchChecked(true);
        break;
      case "Clean and Jerk":
        setCleanAndJerkChecked(true);
        break;
      case "Handstand":
        setHandstandChecked(true);
        break;
      case "Turkish Get Up":
        setTurkishGetUpChecked(true);
        break;
      case "Box Jump":
        setBoxJumpChecked(true);
        break;
      case "Jump Rope":
        setJumpRopeChecked(true);
        break;
      case "Running":
        setRunningChecked(true);
        break;
      case "Rowing":
        setRowingChecked(true);
        break;
      case "Cycling":
        setCyclingChecked(true);
        break;
      case "Swimming":
        setSwimmingChecked(true);
        break;
      default:
        alert("Something Went Wrong!");
    }
  };

  const commenceCheck = () => {
    let execute = false;
    if (!execute) {
      return movementGoals.map((goal) => {
        let goalName = goal.goalName;
        checkChecked(goalName);
      });
    }
  };

  if (movementGoals.length > 0) {
    content = movementGoals.map((goal) => (
      <MovementForm key={goal.goalName} goal={goal} />
    ));
  }

  const handleShow = async () => {
    let movementUnit = goals[myIndex].unit;
    dispatch(handleUnitChange(movementUnit));
    for (let i = 0; i < goals[myIndex].goals.length; i++) {
      let items = goals[myIndex].goals[i];
      let goalName = items.goalName;
      let goalRepetitions = items.goalRepetitions;
      let currentRepetitions = items.currentRepetitions;
      let weighted = items.weighted;
      let currentWeight = items.currentWeight;
      let goalWeight = items.goalWeight;
      let goal1RM = items.goal1RM;
      let current1RM = items.current1RM;
      let double = items.double;
      let doubleReps = items.doubleReps;
      let goalDouble = items.goalDouble;
      let goalTime = items.goalTime;
      let currentTime = items.currentTime;
      let goalDistance = items.goalDistance;
      dispatch(
        movementGoalChecked({
          goalName,
          currentRepetitions,
          goalRepetitions,
          weighted,
          currentWeight,
          goalWeight,
          goal1RM,
          current1RM,
          double,
          doubleReps,
          goalDouble,
          goalTime,
          currentTime,
          goalDistance,
        })
      );
    }
    setShow(true);
  };

  const handleGoalChange = async (e) => {
    if (!e.target.checked) {
      try {
        dispatch(movementGoalUnchecked(e.target.name));
        dispatch(deleteGoal(e.target.name));
        const user = firebase.auth().currentUser;
        let userId = user.uid;
        firebase
          .database()
          .ref("users/" + userId + "/goals/Movement")
          .set({
            type: "Movement",
            unit: unit,
            goals: movementGoals,
          });
        if (movementGoals.length === 0) {
          handleClose();
        }
        switch (e.target.name) {
          case "Pull Up":
            setPullUpChecked(false);
            break;
          case "Push Up":
            setPushUpChecked(false);
            break;
          case "Sit Up":
            setSitUpChecked(false);
            break;
          case "Squat":
            setSquatChecked(false);
            break;
          case "Bench Press":
            setBenchPressChecked(false);
            break;
          case "Deadlift":
            setDeadliftChecked(false);
            break;
          case "Snatch":
            setSnatchChecked(false);
            break;
          case "Clean and Jerk":
            setCleanAndJerkChecked(false);
            break;
          case "Handstand":
            setHandstandChecked(false);
            break;
          case "Turkish Get Up":
            setTurkishGetUpChecked(false);
            break;
          case "Box Jump":
            setBoxJumpChecked(false);
            break;
          case "Jump Rope":
            setJumpRopeChecked(false);
            break;
          case "Running":
            setRunningChecked(false);
            break;
          case "Rowing":
            setRowingChecked(false);
            break;
          case "Cycling":
            setCyclingChecked(false);
            break;
          case "Swimming":
            setSwimmingChecked(false);
            break;
          default:
            alert("Something Went Wrong!");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      let goalName = e.target.name;
      dispatch(movementGoalChecked({ goalName }));
      checkChecked(goalName);
    }
  };

  const removeItem = async (itemId) => {
    const itemRef = firebase.database().ref(`users/${uid}/goals/${itemId}`);
    itemRef.remove();
    dispatch(deleteGoal(itemId));
    dispatch(handleGoalClose());
  };

  const sendGoal = async () => {
    if (movementGoals.length === 0) {
      dispatch(deleteGoal("Movement"));
      removeItem("Movement");
    } else {
      for (let items in movementGoals) {
        if (
          movementGoals[items].goalRepetitions === "" ||
          movementGoals[items].goalRepetitions === "0"
        ) {
          alert("Please Select A Length More Than 0");
          return;
        }
      }
      try {
        const user = firebase.auth().currentUser;
        let userId = user.uid;
        let newState;
        firebase
          .database()
          .ref("users/" + userId + "/goals/Movement")
          .set({
            type: "Movement",
            unit: unit,
            goals: movementGoals,
          });
        newState = {
          type: "Movement",
          goals: movementGoals,
          unit: unit,
        };
        dispatch(deleteGoal("Movement"));
        dispatch(fetchGoals(newState));
      } catch (err) {
        console.error("Failed to save goal: ", err);
      } finally {
        handleClose();
      }
    }
  };
  const handleUnit = (e) => {
    let name = e.target.value;
    dispatch(handleUnitChange(name));
  };

  const handleClose = () => {
    setShow(false);
    setPullUpChecked(false);
    setPushUpChecked(false);
    setSitUpChecked(false);
    setSquatChecked(false);
    setBenchPressChecked(false);
    setDeadliftChecked(false);
    setSnatchChecked(false);
    setCleanAndJerkChecked(false);
    setHandstandChecked(false);
    setTurkishGetUpChecked(false);
    setBoxJumpChecked(false);
    setJumpRopeChecked(false);
    setRunningChecked(false);
    setRowingChecked(false);
    setCyclingChecked(false);
    setSwimmingChecked(false);
    dispatch(handleGoalClose());
  };

  return (
    <div>
      <Button variant="warning" onClick={handleShow} name="Update">
        Update
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>
              What Movements Would You Like To Measure?
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  onChange={handleGoalChange}
                  name="Pull Up"
                  type="checkbox"
                  label="Pull Up"
                  checked={checkedPullUp}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Push Up"
                  type="checkbox"
                  label="Push Up"
                  checked={checkedPushUp}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Sit Up"
                  type="checkbox"
                  label="Sit Up"
                  checked={checkedSitUp}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Squat"
                  type="checkbox"
                  label="Squat"
                  checked={checkedSquat}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Bench Press"
                  type="checkbox"
                  label="Bench Press"
                  checked={checkedBenchPress}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Deadlift"
                  type="checkbox"
                  label="Deadlift"
                  checked={checkedDeadlift}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Snatch"
                  type="checkbox"
                  label="Snatch"
                  checked={checkedSnatch}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Clean and Jerk"
                  type="checkbox"
                  label="Clean and Jerk"
                  checked={checkedCleanAndJerk}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Handstand"
                  type="checkbox"
                  label="Handstand"
                  checked={checkedHandstand}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Turkish Get Up"
                  type="checkbox"
                  label="Turkish Get Up"
                  checked={checkedTurkishGetUp}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Box Jump"
                  type="checkbox"
                  label="Box Jump"
                  checked={checkedBoxJump}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Jump Rope"
                  type="checkbox"
                  label="Jump Rope"
                  checked={checkedJumpRope}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Running"
                  type="checkbox"
                  label="Running"
                  checked={checkedRunning}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Rowing"
                  type="checkbox"
                  label="Rowing"
                  checked={checkedRowing}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Cycling"
                  type="checkbox"
                  label="Cycling"
                  checked={checkedCycling}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Swimming"
                  type="checkbox"
                  label="Swimming"
                  checked={checkedSwimming}
                />
              </Form.Group>
            </Form.Label>
            <Form.Label>
              Choose Unit of Measurement
              <Form.Control value={unit} onChange={handleUnit} as="select">
                <option value="Metric" name="Metric">
                  Metric
                </option>
                <option value="Imperial" name="Imperial">
                  Imperial
                </option>
              </Form.Control>
            </Form.Label>
          </Form>
        </Modal.Body>
        {content}
        <Modal.Footer>
          <Button variant="warning" onClick={sendGoal}>
            Update Goal
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
