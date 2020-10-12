import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../Firebase";
import {
  circumferenceGoalChecked,
  circumferenceGoalUnchecked,
  handleGoalClose,
  handleUnitChange,
} from "./goalsSlice";
import { deleteGoal } from "../users/usersSlice";
import { CircumferenceForm } from "./circumferenceForm";

export const UpdateCircumferenceGoal = ({ id }) => {
  let content;
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.goals.unit);
  const goals = useSelector((state) => state.users.goals);
  const circumferenceGoals = useSelector(
    (state) => state.goals.circumferenceGoals
  );
  const [show, setShow] = useState(false);
  const [checkedNeck, setNeckChecked] = useState(false);
  const [checkedChest, setChestChecked] = useState(false);
  const [checkedBicep, setBicepChecked] = useState(false);
  const [checkedForearm, setForearmChecked] = useState(false);
  const [checkedWaist, setWaistChecked] = useState(false);
  const [checkedThigh, setThighChecked] = useState(false);
  const [checkedCalf, setCalfChecked] = useState(false);
  const myIndex = goals.findIndex((goal) => goal.id === "Circumference");

  useEffect(() => {
    commenceCheck();
  });

  const checkChecked = (id) => {
    switch (id) {
      case "Neck":
        console.log("success");
        setNeckChecked(true);
        break;
      case "Chest":
        setChestChecked(true);
        break;
      case "Bicep":
        setBicepChecked(true);
        break;
      case "Forearm":
        setForearmChecked(true);
        break;
      case "Waist":
        setWaistChecked(true);
        break;
      case "Thigh":
        setThighChecked(true);
        break;
      case "Calf":
        setCalfChecked(true);
        break;
      default:
        alert("Something Went Wrong!");
    }
  };

  const commenceCheck = () => {
    let execute = false;
    console.log(execute);
    if (!execute) {
      return circumferenceGoals.map((goal) => {
        console.log(goal);
        let goalName = goal.goalName;
        checkChecked(goalName);
      });
    }
  };

  if (circumferenceGoals.length > 0) {
    content = circumferenceGoals.map((goal) => (
      <CircumferenceForm key={goal.goalName} goal={goal} unit={unit} />
    ));
  }

  const handleShow = async () => {
    let circumferenceUnit = goals[myIndex].unit;
    dispatch(handleUnitChange(circumferenceUnit));
    for (let i = 0; i < goals[myIndex].goals.length; i++) {
      let items = goals[myIndex].goals[i];
      let goalName = items.goalName;
      let goal = items.goal;
      let currentGoal = items.currentGoal;
      console.log(goalName, goal, currentGoal);
      dispatch(circumferenceGoalChecked({ goalName, goal, currentGoal }));
    }
    setShow(true);
  };

  const handleUnit = (e) => {
    let name = e.target.value;
    dispatch(handleUnitChange(name));
  };

  const handleGoalChange = async (e) => {
    if (!e.target.checked) {
      try {
        dispatch(circumferenceGoalUnchecked(e.target.name));
        dispatch(deleteGoal(e.target.name));
        const user = firebase.auth().currentUser;
        let userId = user.uid;
        firebase
          .database()
          .ref("users/" + userId + "/goals/Circumference")
          .set({
            type: "Circumference",
            unit: unit,
            goals: circumferenceGoals,
          });
        if (circumferenceGoals.length === 0) {
          handleClose();
        }
        switch (e.target.name) {
          case "Neck":
            setNeckChecked(false);
            break;
          case "Chest":
            setChestChecked(false);
            break;
          case "Bicep":
            setBicepChecked(false);
            break;
          case "Forearm":
            setForearmChecked(false);
            break;
          case "Waist":
            setWaistChecked(false);
            break;
          case "Thigh":
            setThighChecked(false);
            break;
          case "Calf":
            setCalfChecked(false);
            break;
          default:
            alert("Something Went Wrong!");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      let goalName = e.target.name;
      let goal = "";
      let currentGoal = "";
      dispatch(circumferenceGoalChecked({ goalName, goal, currentGoal }));
      checkChecked(goalName);
    }
  };

  const sendGoal = () => {
    try {
      const user = firebase.auth().currentUser;
      let userId = user.uid;
      firebase
        .database()
        .ref("users/" + userId + "/goals/Circumference")
        .set({
          type: "Circumference",
          unit: unit,
          goals: circumferenceGoals,
        });
      dispatch(deleteGoal(id));
      dispatch(handleGoalClose());
    } catch (err) {
      console.error("Failed to save goal: ", err);
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    setShow(false);
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
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Choose Unit of Length</Form.Label>
              <Form.Control value={unit} onChange={handleUnit} as="select">
                <option value="Metric" name="Metric">
                  Metric
                </option>
                <option value="Imperial" name="Imperial">
                  Imperial
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Label>
              What Body Parts Would You Like To Measure?
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  onChange={handleGoalChange}
                  name="Neck"
                  type="checkbox"
                  label="Neck"
                  checked={checkedNeck}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Chest"
                  type="checkbox"
                  label="Chest"
                  checked={checkedChest}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Bicep"
                  type="checkbox"
                  label="Bicep"
                  checked={checkedBicep}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Forearm"
                  type="checkbox"
                  label="Forearm"
                  checked={checkedForearm}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Waist"
                  type="checkbox"
                  label="Waist"
                  checked={checkedWaist}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Thigh"
                  type="checkbox"
                  label="Thigh"
                  checked={checkedThigh}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Calf"
                  type="checkbox"
                  label="Calf"
                  checked={checkedCalf}
                />
              </Form.Group>
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
