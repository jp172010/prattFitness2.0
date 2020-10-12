import React from "react";
import { Form } from "react-bootstrap";
import {
  circumferenceContentChanged,
  currentCircumferenceChanged,
} from "./goalsSlice";
import { useDispatch } from "react-redux";

export const CircumferenceForm = ({ goal, unit }) => {
  const dispatch = useDispatch();

  const handleContentChange = (e) => {
    let goal = e.target.value;
    let goalName = e.target.name;
    dispatch(circumferenceContentChanged({ goalName, goal }));
  };

  const handleCurrentChange = (e) => {
    let currentGoal = e.target.value;
    let goalName = e.target.name;
    dispatch(currentCircumferenceChanged({ goalName, currentGoal }));
  };

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
      <h6>{goal.goalName}</h6>
      <Form.Group>
        <Form.Label>Current Measurement</Form.Label>
        <Form.Control
          value={goal.currentGoal}
          name={goal.goalName}
          onChange={handleCurrentChange}
          as="select"
        >
          {options}
        </Form.Control>
        <Form.Label>Goal Measurement</Form.Label>
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
