import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import firebase from "../../Firebase";
import {
  dietGoalChecked,
  dietGoalUnchecked,
  handleGoalClose,
} from "./goalsSlice";
import { DietForm } from "./dietForm";

export const DietGoalChecked = () => {
  const goals = useSelector((state) => state.goals.dietGoals);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let content;

  const handleDietChange = (e) => {
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
      dispatch(dietGoalChecked({ goalName }));
    } else {
      dispatch(dietGoalUnchecked(e.target.name));
    }
  };

  const sendGoal = async () => {
    try {
        console.log(goals)
      const user = firebase.auth().currentUser;
      let userId = user.uid;
      firebase
        .database()
        .ref("users/" + userId + "/goals/Diet")
        .set({
          type: "Diet",
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
      <DietForm key={goal.goalName} goal={goal} />
    ));
  }

  return (
    <div>
      <Form>
        <Form.Check
          onChange={handleDietChange}
          name="Diet"
          type="checkbox"
          label="Diet"
        />
      </Form>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Your Goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>
              What Would You Like To Track?
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  onChange={handleGoalChange}
                  name="Calories"
                  type="checkbox"
                  label="Calories"
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Macros"
                  type="checkbox"
                  label="Macros"
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