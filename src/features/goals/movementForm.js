import React from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {
  movementRepetitionsChanged,
  currentRepetitionsChanged,
  movementWeightChanged,
  movementHeightChanged,
  currentHeightChanged,
  weightChanged,
  weightedChecked,
  weightedUnchecked,
  current1RMChanged,
  goal1RMChanged,
  doubleRepsChanged,
  doubleGoalChanged,
  doublesChecked,
  doublesUnchecked,
  hSPURepsChanged,
  hSPUGoalChanged,
  hSPUChecked,
  hSPUUnchecked,
  goalDistanceChanged,
  currentTimeChanged,
  goalTimeChanged,
} from "./goalsSlice";
import { useDispatch, useSelector } from "react-redux";

export const MovementForm = ({ goal }) => {
  const unit = useSelector((state) => state.goals.unit);
  const dispatch = useDispatch();
  let content;

  const goalDistanceChange = (e) => {
    let goalDistance = e.target.value;
    let goalName = e.target.name;
    dispatch(goalDistanceChanged({ goalName, goalDistance }));
  };
  const timeChange = (e) => {
    let currentTime = e.target.value;
    let goalName = e.target.name;
    dispatch(currentTimeChanged({ goalName, currentTime }));
  };
  const goalTimeChange = (e) => {
    let goalTime = e.target.value;
    let goalName = e.target.name;
    dispatch(goalTimeChanged({ goalName, goalTime }));
  };
  const currentHeightChange = (e) => {
    let currentHeight = e.target.value;
    let goalName = e.target.name;
    dispatch(currentHeightChanged({ goalName, currentHeight }));
  };
  const handleHeightChange = (e) => {
    let goalHeight = e.target.value;
    let goalName = e.target.name;
    dispatch(movementHeightChanged({ goalName, goalHeight }));
  };
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
  const goalDoubleChange = (e) => {
    let goalDouble = e.target.value;
    let goalName = e.target.name;
    dispatch(doubleGoalChanged({ goalName, goalDouble }));
  };
  const doubleRepChange = (e) => {
    let doubleReps = e.target.value;
    let goalName = e.target.name;
    dispatch(doubleRepsChanged({ goalName, doubleReps }));
  };
  const hSPURepChange = (e) => {
    let hSPUReps = e.target.value;
    let goalName = e.target.name;
    dispatch(hSPURepsChanged({ goalName, hSPUReps }));
  };
  const goalHSPUChange = (e) => {
    let goalHSPU = e.target.value;
    let goalName = e.target.name;
    dispatch(hSPUGoalChanged({ goalName, goalHSPU }));
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

  const DoubleForm = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Current Consecutive Doubles</Form.Label>
          <Form.Control
            value={goal.doubleReps}
            name={goal.goalName}
            onChange={doubleRepChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal Consecutive Doubles</Form.Label>
          <Form.Control
            value={goal.goalDouble}
            name={goal.goalName}
            onChange={goalDoubleChange}
            as="select"
          >
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  };

  const HSPUForm = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Current HSPU</Form.Label>
          <Form.Control
            value={goal.hSPUReps}
            name={goal.goalName}
            onChange={hSPURepChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal HSPU</Form.Label>
          <Form.Control
            value={goal.goalHSPU}
            name={goal.goalName}
            onChange={goalHSPUChange}
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
  if (goal.double === true) {
    content = <DoubleForm />;
  }
  if (goal.hSPU === true) {
    content = <HSPUForm />;
  }
  const handleWeighted = (e) => {
    if (e.target.checked) {
      dispatch(weightedChecked(goal.goalName));
    } else {
      dispatch(weightedUnchecked(goal.goalName));
    }
  };
  const handleDoubles = (e) => {
    if (e.target.checked) {
      dispatch(doublesChecked(goal.goalName));
    } else {
      dispatch(doublesUnchecked(goal.goalName));
    }
  };
  const handleHSPU = (e) => {
    if (e.target.checked) {
      dispatch(hSPUChecked(goal.goalName));
    } else {
      dispatch(hSPUUnchecked(goal.goalName));
    }
  };

  let numbers = [];
  let options;
  let i;

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
  if (goal.goalName === "Handstand") {
    let timeOptions = numbers.map((number) => (
      <option key={number} value={number}>
        {number}sec
      </option>
    ));
    return (
      <Form>
        <h6>Handstand</h6>
        <Form.Group>
          <Form.Label>Current Achievable Time</Form.Label>
          <Form.Control
            value={goal.currentTime}
            name={goal.goalName}
            onChange={timeChange}
            as="select"
          >
            {timeOptions}
          </Form.Control>
          <Form.Label>Goal Time</Form.Label>
          <Form.Control
            value={goal.goalTime}
            name={goal.goalName}
            onChange={goalTimeChange}
            as="select"
          >
            {timeOptions}sec
          </Form.Control>
          <Form.Check
            onChange={handleHSPU}
            name="HSPU"
            type="checkbox"
            label="HSPU"
            checked={goal.hSPU}
          />
          {content}
        </Form.Group>
      </Form>
    );
  }
  if (goal.goalName === "Jump Rope") {
    return (
      <Form>
        <h6>Jump Rope</h6>
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
            onChange={handleDoubles}
            name="Doubles"
            type="checkbox"
            label="Doubles"
            checked={goal.double}
          />
          {content}
        </Form.Group>
      </Form>
    );
  }
  if (goal.goalName === "Push Up" || goal.goalName === "Sit Up") {
    return (
      <Form>
        <h6>{goal.goalName} </h6>
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
  if (
    goal.goalName === "Squat" ||
    goal.goalName === "Bench Press" ||
    goal.goalName === "Deadlift" ||
    goal.goalName === "Snatch" ||
    goal.goalName === "Clean and Jerk" ||
    goal.goalName === "Turkish Get Up"
  ) {
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
        <h6>{goal.goalName}</h6>
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
      </Form>
    );
  }
  if (goal.goalName === "Box Jump") {
    if (unit === "Metric") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}cm
        </option>
      ));
    } else if (unit === "Imperial") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}"
        </option>
      ));
    }
    return (
      <Form>
        <h6>{goal.goalName} </h6>
        <Form.Group>
          <Form.Label>Current Achievable Height</Form.Label>
          <Form.Control
            value={goal.currentHeight}
            name={goal.goalName}
            onChange={currentHeightChange}
            as="select"
          >
            {options}
          </Form.Control>
          <Form.Label>Goal Height</Form.Label>
          <Form.Control
            value={goal.goalHeight}
            name={goal.goalName}
            onChange={handleHeightChange}
            as="select"
          >
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
  if (
    goal.goalName === "Running" ||
    goal.goalName === "Rowing" ||
    goal.goalName === "Cycling" ||
    goal.goalName === "Swimming"
  ) {
    if (unit === "Metric") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number}km
        </option>
      ));
    } else if (unit === "Imperial") {
      options = numbers.map((number) => (
        <option key={number} value={number}>
          {number} mi
        </option>
      ));
    }
    let timeOptions;
    timeOptions = numbers.map((number) => (
      <option key={number} value={number}>
        {number} min
      </option>
    ));
    return (
      <Form>
        <h6>{goal.goalName} </h6>
        <Form.Group>
          <Col>
            <Form.Label>
              Distance Goal
              <Form.Control
                value={goal.goalDistance}
                name={goal.goalName}
                onChange={goalDistanceChange}
                as="select"
              >
                {options}
              </Form.Control>
            </Form.Label>
          </Col>
          <Col>
            <Form.Label>
              Current Time
              <Form.Control
                value={goal.currentTime}
                name={goal.goalName}
                onChange={timeChange}
                as="select"
              >
                {timeOptions}
              </Form.Control>
            </Form.Label>
          </Col>
          <Col>
            <Form.Label>
              Goal Time
              <Form.Control
                value={goal.goalTime}
                name={goal.goalName}
                onChange={goalTimeChange}
                as="select"
              >
                {timeOptions}
              </Form.Control>
            </Form.Label>
          </Col>
        </Form.Group>
      </Form>
    );
  }
};
