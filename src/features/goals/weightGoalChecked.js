import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import firebase from "../../Firebase";
import {
  currentWeightChanged,
  weightContentChanged,
  handleGoalClose,
  handleUnitChange,
} from "./goalsSlice";

export const WeightGoalChecked = () => {
  const unit = useSelector((state) => state.goals.unit);
  const goals = useSelector((state) => state.goals.weight);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleUnit = (e) => {
    let name = e.target.value;
    dispatch(handleUnitChange(name));
  };

  const handleWeightChange = (e) => {
    if (e.target.checked) {
      setShow(true);
      e.target.checked = false;
    }
  };

  const handleClose = () => {
    setShow(false);
    dispatch(handleGoalClose());
  };

  const sendGoal = () => {
    console.log(goals);
    if (
      goals.goalWeight === undefined ||
      goals.goalWeight === "0" ||
      goals.currentWeight === undefined ||
      goals.currentWeight === "0"
    ) {
      alert("Please Select A Weight More Than 0");
    } else {
      try {
        const user = firebase.auth().currentUser;
        let userId = user.uid;
        firebase
          .database()
          .ref("users/" + userId + "/goals/Weight")
          .set({
            type: "Weight",
            unit: unit,
            currentGoal: goals.currentWeight,
            newGoal: goals.goalWeight,
          });
      } catch (err) {
        console.error("Failed to save goal: ", err);
      } finally {
        handleClose();
      }
    }
  };

  let numbers = [];
  let options;
  let i;

  for (i = 0; i < 400; i++) {
    numbers.push(i);
  }
  if (unit === "Metric") {
    options = numbers.map((number) => (
      <option key={number} value={number}>
        {number}kg
      </option>
    ));
  } else {
    options = numbers.map((number) => (
      <option key={number} value={number}>
        {number}lbs
      </option>
    ));
  }

  const handleCurrentChange = (e) => {
    let currentGoal = e.target.value;
    dispatch(currentWeightChanged({ currentGoal }));
  };

  const handleContentChange = (e) => {
    let goal = e.target.value;
    dispatch(weightContentChanged({ goal }));
  };

  return (
    <div>
      <Form>
        <Form.Check
          onChange={handleWeightChange}
          name="Weight"
          type="checkbox"
          label="Weight"
        />
      </Form>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Your Goals</Modal.Title>
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
            <Form.Group>
              <Form.Label>Current Weight</Form.Label>
              <Form.Control
                value={goals.currentGoal}
                name={goals.goalName}
                onChange={handleCurrentChange}
                as="select"
              >
                {options}
              </Form.Control>
              <Form.Label>Goal Weight</Form.Label>
              <Form.Control
                value={goals.goal}
                name={goals.goalName}
                onChange={handleContentChange}
                as="select"
              >
                {options}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={sendGoal}>Add Goal</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
