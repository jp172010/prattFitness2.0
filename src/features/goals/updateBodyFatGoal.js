import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../Firebase";
import {
  currentBodyFatChanged,
  bodyFatContentChanged,
  handleGoalClose,
} from "./goalsSlice";
import { deleteGoal } from "../users/usersSlice";

export const UpdateBodyFatGoal = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const goals = useSelector((state) => state.goals.bodyFat);
  const userGoals = useSelector((state) => state.users.goals);
  const myIndex = userGoals.findIndex((goal) => goal.type === "BodyFat");
  let numbers = [];
  let options;
  let i;

  for (i = 0; i < 400; i++) {
    numbers.push(i);
  }
  options = numbers.map((number) => (
    <option key={number} value={number}>
      {number}%
    </option>
  ));

  const handleShow = async () => {
    let currentGoal = userGoals[myIndex].current;
    let goal = userGoals[myIndex].goals;
    dispatch(currentBodyFatChanged({ currentGoal }));
    dispatch(bodyFatContentChanged({ goal }));
    setShow(true);
  };

  const handleCurrentChange = (e) => {
    let currentGoal = e.target.value;
    dispatch(currentBodyFatChanged({ currentGoal }));
  };

  const handleContentChange = (e) => {
    let goal = e.target.value;
    dispatch(bodyFatContentChanged({ goal }));
  };

  const sendGoal = async () => {
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
        dispatch(deleteGoal("BodyFat"));
        firebase
          .database()
          .ref("users/" + userId + "/goals/BodyFat")
          .set({
            type: "BodyFat",
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
          <Modal.Title>Set Your Goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Current Body Fat</Form.Label>
              <Form.Control
                value={goals.currentBodyFat}
                onChange={handleCurrentChange}
                as="select"
              >
                {options}
              </Form.Control>
              <Form.Label>Goal Body Fat</Form.Label>
              <Form.Control
                value={goals.goalBodyFat}
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
