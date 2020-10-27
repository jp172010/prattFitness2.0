import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import firebase from "../../Firebase";
import {
  movementGoalChecked,
  movementGoalUnchecked,
  handleGoalClose,
  handleUnitChange,
} from "./goalsSlice";
import { MovementForm } from "./movementForm";

const MovementGoalChecked = () => {
  const unit = useSelector((state) => state.goals.unit);
  const goals = useSelector((state) => state.goals.movementGoals);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let content;

  const handleUnit = (e) => {
    let name = e.target.value;
    dispatch(handleUnitChange(name));
  };

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
      let goal = "";
      let currentGoal = "";
      dispatch(movementGoalChecked({ goalName, goal, currentGoal }));
    } else {
      dispatch(movementGoalUnchecked(e.target.name));
    }
  };

  const sendGoal = async () => {
    for (let items in goals) {
      if (
        goals[items].goal === "" ||
        goals[items].goal === "0" ||
        goals[items].currentGoal === "" ||
        goals[items].currentGoal === "0"
      ) {
        alert("Please Select A Length More Than 0");
        return
      }
    }
    try {
      const user = firebase.auth().currentUser;
      let userId = user.uid;
      firebase
        .database()
        .ref("users/" + userId + "/goals/Movement")
        .set({
          type: "Movement",
          unit: unit,
          goals: goals,
        });
    } catch (err) {
      console.error("Failed to save goal: ", err);
    } finally {
      handleClose();
    }
  };

  if (goals.length >= 1) {
    content = goals.map((goal) => (
      <MovementForm key={goal.goalName} goal={goal} unit={unit} />
    ));
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
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Chest"
                  type="checkbox"
                  label="Chest"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Bicep"
                  type="checkbox"
                  label="Bicep"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Forearm"
                  type="checkbox"
                  label="Forearm"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Waist"
                  type="checkbox"
                  label="Waist"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Thigh"
                  type="checkbox"
                  label="Thigh"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Calf"
                  type="checkbox"
                  label="Calf"
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
export default MovementGoalChecked;