import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import firebase from "../../Firebase";
import {
  currentBodyFatChanged,
  bodyFatContentChanged,
  handleGoalClose,
} from "./goalsSlice";

export const BodyFatGoalChecked = () => {
  const goals = useSelector((state) => state.goals.bodyFat);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleBodyFatChange = (e) => {
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
      goals.goalBodyFat === undefined ||
      goals.goalBodyFat === "0" ||
      goals.currentBodyFat === undefined ||
      goals.currentBodyFat === "0"
    ) {
      alert("Please Select A Percentage More Than 0");
    } else {
      try {
        const user = firebase.auth().currentUser;
        let userId = user.uid;
        firebase
          .database()
          .ref("users/" + userId + "/goals/BodyFat")
          .set({
            type: "Body Fat",
            currentGoal: goals.currentBodyFat,
            newGoal: goals.goalBodyFat,
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

  for (i = 0; i < 100; i++) {
    numbers.push(i);
  }
    options = numbers.map((number) => (
      <option key={number} value={number}>
        {number}%
      </option>
    ));
  

  const handleCurrentChange = (e) => {
    let currentGoal = e.target.value;
    dispatch(currentBodyFatChanged({ currentGoal }));
  };

  const handleContentChange = (e) => {
    let goal = e.target.value;
    dispatch(bodyFatContentChanged({ goal }));
  };

  return (
    <div>
      <Form>
        <Form.Check
          onChange={handleBodyFatChange}
          name="Body Fat"
          type="checkbox"
          label="Body Fat"
        />
      </Form>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Your Goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Current Body Fat</Form.Label>
              <Form.Control
                value={goals.currentGoal}
                name={goals.goalName}
                onChange={handleCurrentChange}
                as="select"
              >
                {options}
              </Form.Control>
              <Form.Label>Goal Body Fat</Form.Label>
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
