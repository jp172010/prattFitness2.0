import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import firebase from "../../Firebase";
import {
  handleUnitChange,
  movementGoalChecked,
  movementGoalUnchecked,
  handleGoalClose,
} from "./goalsSlice";
import { MovementForm } from "./movementForm";

export const MovementGoalChecked = () => {
  const unit = useSelector((state) => state.goals.unit);
  const goals = useSelector((state) => state.goals.movementGoals);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let content = [];

  const handleMovementChange = (e) => {
    if (e.target.checked) {
      setShow(true);
      e.target.checked = false;
    }
  };

  const handleClose = () => {
    setShow(false);
    dispatch(handleGoalClose());
  };

  const handleGoalChange = (e) => {
    if (e.target.checked) {
      let goalName = e.target.name;
      dispatch(movementGoalChecked({ goalName }));
    } else {
      dispatch(movementGoalUnchecked(e.target.name));
    }
  };
  const handleUnit = (e) => {
    let name = e.target.value;
    dispatch(handleUnitChange(name));
  };

  const sendGoal = async () => {
    try {
      console.log(goals)
      const user = firebase.auth().currentUser;
      let userId = user.uid;
      firebase
        .database()
        .ref("users/" + userId + "/goals/Movement")
        .set({
          type: "Movement",
          goals: goals,
          unit: unit,
        });
    } catch (err) {
      console.error("Failed to save goal: ", err);
    } finally {
      handleClose();
    }
  };

  if (goals.length >= 1) {
    content.push(goals.map((goal) => (
      <MovementForm key={goal.goalName} goal={goal} />
    )));
  }

  return (
    <div>
      <Form>
        <Form.Check
          onChange={handleMovementChange}
          name="Movement"
          type="checkbox"
          label="Movement"
        />
      </Form>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Your Goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Control value={unit} onChange={handleUnit} as="select">
            <option value="Metric" name="Metric">
              Metric
            </option>
            <option value="Imperial" name="Imperial">
              Imperial
            </option>
          </Form.Control>
            <Form.Label>
              What Movements Would You Like To Measure?
              <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                  onChange={handleGoalChange}
                  name="Pull Up"
                  type="checkbox"
                  label="Pull Up"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Push Up"
                  type="checkbox"
                  label="Push Up"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Sit Up"
                  type="checkbox"
                  label="Sit Up"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Squat"
                  type="checkbox"
                  label="Squats"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Bench Press"
                  type="checkbox"
                  label="Bench Press"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Deadlift"
                  type="checkbox"
                  label="Deadlift"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Snatch"
                  type="checkbox"
                  label="Snatch"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Clean and Jerk"
                  type="checkbox"
                  label="Clean and Jerk"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Handstand"
                  type="checkbox"
                  label="Handstand"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Turkish Get Up"
                  type="checkbox"
                  label="Turkish Get Up"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Box Jump"
                  type="checkbox"
                  label="Box Jump"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Jump Rope"
                  type="checkbox"
                  label="Jump Rope"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Running"
                  type="checkbox"
                  label="Running"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Rowing"
                  type="checkbox"
                  label="Rowing"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Cycling"
                  type="checkbox"
                  label="Cycling"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Swimming"
                  type="checkbox"
                  label="Swimming"
                />
              </Form.Group>
            </Form.Label>
          </Form>
        </Modal.Body>
        {content}
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
