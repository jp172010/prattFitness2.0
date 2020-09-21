import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import firebase from "../../Firebase";
import {
  circumferenceGoalChecked,
  circumferenceGoalUnchecked,
  circumferenceContentChanged,
  handleGoalClose,
  handleUnitChange,
} from "./goalsSlice";

const CircumferenceGoalChecked = () => {
  const unit = useSelector((state) => state.goals.unit);
  const goals = useSelector((state) => state.goals.circumferenceGoals);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let content;

  const handleUnit = (e) => {
    let name = e.target.value;
    dispatch(handleUnitChange(name));
  };

  const handleCircumferenceChange = (e) => {
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
      dispatch(circumferenceGoalChecked({ goalName, goal }));
    } else {
      dispatch(circumferenceGoalUnchecked(e.target.name));
    }
  };

  const handleContentChange = (e) => {
    let goal = e.target.value;
    let goalName = e.target.name;
    dispatch(circumferenceContentChanged({ goalName, goal }));
  };

  const sendGoal = () => {
    try {
      const user = firebase.auth().currentUser;
      let userId = user.uid;
      firebase
        .database()
        .ref("goals/" + userId)
        .set({
          circumferenceGoal: {
            type: "circumference",
            unit: unit,
            goals: goals,
          },
        });
    } catch (err) {
      console.error("Failed to save goal: ", err);
    } finally {
      handleClose();
    }
  };

  const CircumferenceForm = ({ goal }) => {
    let numbers = [];
    let options;
    let i;

    for (i = 0; i < 100; i++) {
      numbers.push(i);
    }
    if (unit === "Metric") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}cm
        </option>
      ));
    } else {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}"
        </option>
      ));
    }

    return (
      <Form>
        <Form.Group>
          <Form.Label>{goal.goalName}</Form.Label>
          <Form.Control
            value={goal.goal}
            name={goal.goalName}
            onChange={handleContentChange}
            as="select"
          >
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  };

  if (goals.length >= 1) {
    content = goals.map((goal) => (
      <CircumferenceForm key={goal.goalName} goal={goal} />
    ));
  }

  return (
    <div>
      <Form>
        <Form.Check
          onChange={handleCircumferenceChange}
          name="circumference"
          type="checkbox"
          label="Circumference"
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
export default CircumferenceGoalChecked;
