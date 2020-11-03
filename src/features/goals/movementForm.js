import React from "react";
import { Form } from "react-bootstrap";
import {
  movementRepetitionsChanged,
  currentRepetitionsChanged,
  movementWeightChanged,
  weightChanged,
  weightedChecked,
  weightedUnchecked,
  handleUnitChange,
  current1RMChanged,
  goal1RMChanged,
} from "./goalsSlice";
import { useDispatch, useSelector } from "react-redux";

export const MovementForm = ({ goal }) => {
  const unit = useSelector((state) => state.goals.unit);
  const dispatch = useDispatch();
  let content;

  const handleRepetitionChange = (e) => {
    let goalRepetitions = e.target.value;
    let goalName = e.target.name;
    dispatch(movementRepetitionsChanged({ goalName, goalRepetitions }));
  };
  const goalWeightChange = (e) => {
    let goalWeight = e.target.value;
    let goalName = e.target.name;
    dispatch(movementWeightChanged({ goalName, goalWeight }));
  };
  const currentWeightChange = (e) => {
    let currentWeight = e.target.value;
    let goalName = e.target.name;
    dispatch(weightChanged({ goalName, currentWeight }));
  };
  const currentRepetitionChange = (e) => {
    let currentRepetitions = e.target.value;
    let goalName = e.target.name;
    dispatch(currentRepetitionsChanged({ goalName, currentRepetitions }));
  };
  const current1RMChange = (e) => {
    let current1RM = e.target.value;
    let goalName = e.target.name;
    dispatch(current1RMChanged({ goalName, current1RM }));
  };
  const goal1RMChange = (e) => {
    let goal1RM = e.target.value;
    let goalName = e.target.name;
    dispatch(goal1RMChanged({ goalName, goal1RM }));
  };
  const handleUnit = (e) => {
    let name = e.target.value;
    dispatch(handleUnitChange(name));
  };

  const WeightedForm = () => {
    if (unit === "Metric") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}kg
        </option>
      ));
    } else if (unit === "Imperial") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}lbs
        </option>
      ));
    }

    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Choose Unit of Measurement</Form.Label>
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
          <Form.Label>Current Achievable Weight</Form.Label>
          <Form.Control
            value={goal.currentWeight}
            name={goal.goalName}
            onChange={currentWeightChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal Weight</Form.Label>
          <Form.Control
            value={goal.goalWeight}
            name={goal.goalName}
            onChange={goalWeightChange}
            as="select"
          >
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  };

  if (goal.weighted === true) {
    content = <WeightedForm />;
  }

  const handleWeighted = (e) => {
    if (e.target.checked) {
      dispatch(weightedChecked(goal.goalName));
    } else {
      dispatch(weightedUnchecked(goal.goalName));
    }
  };

  let numbers = [];
  let reps = [];
  let repOptions;
  let options;
  let i;

  for (i = 0; i < 100; i++) {
   reps.push(i);
  }
  repOptions = reps.map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  for (i = 0; i < 1000; i++) {
    numbers.push(i);
  }
  options = numbers.map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));
  if (goal.goalName === "Pull Up") {
    return (
      <Form>
        <h6>Pull Up</h6>
        <Form.Group>
          <Form.Label>Current Achievable Reps</Form.Label>
          <Form.Control
            value={goal.currentRepetitions}
            name={goal.goalName}
            onChange={currentRepetitionChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal Reps</Form.Label>
          <Form.Control
            value={goal.goalRepetitions}
            name={goal.goalName}
            onChange={handleRepetitionChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Check
            onChange={handleWeighted}
            name="Weighted"
            type="checkbox"
            label="Weighted"
            checked={goal.weighted}
          />
          {content}
        </Form.Group>
      </Form>
    );
  }
  if (goal.goalName === "Push Up") {
    return (
      <Form>
        <h6>Push Up</h6>
        <Form.Group>
          <Form.Label>Current Achievable Reps</Form.Label>
          <Form.Control
            value={goal.currentRepetitions}
            name={goal.goalName}
            onChange={currentRepetitionChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal Reps</Form.Label>
          <Form.Control
            value={goal.goalRepetitions}
            name={goal.goalName}
            onChange={handleRepetitionChange}
            as="select"
          >
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
  if (goal.goalName === "Sit Up") {
    return (
      <Form>
        <h6>Sit Up</h6>
        <Form.Group>
          <Form.Label>Current Achievable Reps</Form.Label>
          <Form.Control
            value={goal.currentRepetitions}
            name={goal.goalName}
            onChange={currentRepetitionChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal Reps</Form.Label>
          <Form.Control
            value={goal.goalRepetitions}
            name={goal.goalName}
            onChange={handleRepetitionChange}
            as="select"
          >
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
  if (goal.goalName === "Squat") {
    if (unit === "Metric") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}kg
        </option>
      ));
    } else if (unit === "Imperial") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}lbs
        </option>
      ));
    }
    return (
      <Form>
        <h6>Squat</h6>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Choose Unit of Measurement</Form.Label>
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
          <Form.Label>Current One Rep Max</Form.Label>
          <Form.Control
            value={goal.current1RM}
            name={goal.goalName}
            onChange={current1RMChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal One Rep Max</Form.Label>
          <Form.Control
            value={goal.goal1RM}
            name={goal.goalName}
            onChange={goal1RMChange}
            as="select"
          >
            {options}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Weight</Form.Label>
          <Form.Control
            value={goal.currentWeight}
            name={goal.goalName}
            onChange={currentWeightChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Current Reps</Form.Label>
          <Form.Control
            value={goal.currentRepetitions}
            name={goal.goalName}
            onChange={currentRepetitionChange}
            as="select"
          >
            {repOptions}
          </Form.Control>
          <Form.Label>Goal Reps</Form.Label>
          <Form.Control
            value={goal.goalRepetitions}
            name={goal.goalName}
            onChange={handleRepetitionChange}
            as="select"
          >
            {repOptions}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
};
