import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  fatGoalChanged,
  carbGoalChanged,
  proteinGoalChanged,
  calorieGoalChanged,
} from "./goalsSlice";

export const DietForm = ({ goal }) => {
  const dispatch = useDispatch();

  const fatGoalChange = (e) => {
    let fatGoal = e.target.value;
    let goalName = e.target.name;
    dispatch(fatGoalChanged({ goalName, fatGoal }));
  };
  const carbGoalChange = (e) => {
    let carbGoal = e.target.value;
    let goalName = e.target.name;
    dispatch(carbGoalChanged({ goalName, carbGoal }));
  };
  const proteinGoalChange = (e) => {
    let proteinGoal = e.target.value;
    let goalName = e.target.name;
    dispatch(proteinGoalChanged({ goalName, proteinGoal }));
  };
  const calorieGoalChange = (e) => {
    let calorieGoal = e.target.value;
    let goalName = e.target.name;
    dispatch(calorieGoalChanged({ goalName, calorieGoal }));
  };

  let numbers = [];
  let calNumbers = [];
  let calOptions;
  let options;
  let i;
  let j;
  for (i = 0; i < 100; i++) {
    numbers.push(i);
  }
  for (j = 0; j < 15000; j = j + 50) {
    calNumbers.push(j);
  }
  calOptions = calNumbers.map((number) => (
    <option key={number} value={number}>
      {number}kcal
    </option>
  ));
  options = numbers.map((number) => (
    <option key={number} value={number}>
      {number}%
    </option>
  ));

  if (goal.goalName === "Macros") {
    return (
      <Form>
        <h6>Macros</h6>
        <Form.Group>
          <Form.Label>
            Fat
            <Form.Control
              value={goal.fatGoal}
              name={goal.goalName}
              onChange={fatGoalChange}
              as="select"
            >
              {options}
            </Form.Control>
          </Form.Label>
          <Form.Label>
            Carbs
            <Form.Control
              value={goal.carbGoal}
              name={goal.goalName}
              onChange={carbGoalChange}
              as="select"
            >
              {options}
            </Form.Control>
          </Form.Label>
          <Form.Label>
            Protein
            <Form.Control
              value={goal.proteinGoal}
              name={goal.goalName}
              onChange={proteinGoalChange}
              as="select"
            >
              {options}
            </Form.Control>
          </Form.Label>
        </Form.Group>
      </Form>
    );
  }
  if (goal.goalName === "Calories") {
    return (
      <Form>
        <h6>Calories</h6>
        <Form.Group>
          <Form.Label>
            Daily Goal
            <Form.Control
              value={goal.calorieGoal}
              name={goal.goalName}
              onChange={calorieGoalChange}
              as="select"
            >
              {calOptions}
            </Form.Control>
          </Form.Label>
        </Form.Group>
      </Form>
    );
  }
};
