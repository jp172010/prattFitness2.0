import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../Firebase";
import {
  dietGoalChecked,
  dietGoalUnchecked,
  handleGoalClose,
} from "./goalsSlice";
import { deleteGoal, fetchGoals } from "../users/usersSlice";
import { DietForm } from "./dietForm";

export const UpdateDietGoal = () => {
  let content;
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.users.goals);
  const dietGoals = useSelector((state) => state.goals.dietGoals);
  const [show, setShow] = useState(false);
  const [checkedMacros, setMacrosChecked] = useState(false);
  const [checkedCalories, setCaloriesChecked] = useState(false);
  const myIndex = goals.findIndex((goal) => goal.type === "Diet");

  useEffect(() => {
    commenceCheck();
  });

  const checkChecked = (id) => {
    switch (id) {
      case "Macros":
        setMacrosChecked(true);
        break;
      case "Calories":
        setCaloriesChecked(true);
        break;
      default:
        alert("Something Went Wrong!");
    }
  };

  const commenceCheck = () => {
    let execute = false;
    if (!execute) {
      return dietGoals.map((goal) => {
        let goalName = goal.goalName;
        checkChecked(goalName);
      });
    }
  };

  if (dietGoals.length > 0) {
    content = dietGoals.map((goal) => (
      <DietForm key={goal.goalName} goal={goal} />
    ));
  }

  const handleShow = async () => {
    for (let i = 0; i < goals[myIndex].goals.length; i++) {
      let items = goals[myIndex].goals[i];
      let goalName = items.goalName;
      let fatGoal = items.fatGoal;
      let carbGoal = items.carbGoal;
      let proteinGoal = items.proteinGoal;
      let calorieGoal = items.calorieGoal;
      dispatch(
        dietGoalChecked({
          goalName,
          fatGoal,
          carbGoal,
          proteinGoal,
          calorieGoal,
        })
      );
    }
    setShow(true);
  };

  const handleGoalChange = async (e) => {
    if (!e.target.checked) {
      try {
        dispatch(dietGoalUnchecked(e.target.name));
        dispatch(deleteGoal(e.target.name));
        const user = firebase.auth().currentUser;
        let userId = user.uid;
        firebase
          .database()
          .ref("users/" + userId + "/goals/Diet")
          .set({
            type: "Diet",
            goals: dietGoals,
          });
        if (dietGoals.length === 0) {
          handleClose();
        }
        switch (e.target.name) {
          case "Macros":
            setMacrosChecked(false);
            break;
          case "Calories":
            setCaloriesChecked(false);
            break;
          default:
            alert("Something Went Wrong!");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      let goalName = e.target.name;
      dispatch(dietGoalChecked({ goalName }));
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
    if (dietGoals.length === 0) {
      dispatch(deleteGoal("Diet"));
      removeItem("Diet");
    } else {
      try {
        const user = firebase.auth().currentUser;
        let userId = user.uid;
        let newState;
        firebase
          .database()
          .ref("users/" + userId + "/goals/Diet")
          .set({
            type: "Diet",
            goals: dietGoals,
          });
        newState = {
          type: "Diet",
          goals: dietGoals,
        };
        dispatch(deleteGoal("Diet"));
        dispatch(fetchGoals(newState));
      } catch (err) {
        console.error("Failed to save goal: ", err);
      } finally {
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setMacrosChecked(false);
    setCaloriesChecked(false);
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
              What Would You Like To Measure?
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  onChange={handleGoalChange}
                  name="Macros"
                  type="checkbox"
                  label="Macros"
                  checked={checkedMacros}
                />
                <Form.Check
                  onChange={handleGoalChange}
                  name="Calories"
                  type="checkbox"
                  label="Calories"
                  checked={checkedCalories}
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