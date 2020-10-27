import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import CircumferenceGoalChecked from "./circumferenceGoalChecked";
import { useSelector } from "react-redux";
import { WeightGoalChecked } from "./weightGoalChecked";
import {BodyFatGoalChecked} from "./bodyFatGoalChecked"

export const GoalDropdown = () => {
  let circumference;
  let weight;
  let bodyFat;
  const goals = useSelector((state) => state.users.goals);
  const circumferenceIndex = goals.findIndex(
    (goal) => goal.type === "Circumference"
  );
  const bodyFatIndex = goals.findIndex(
    (goal) => goal.type === "BodyFat"
  );
  const weightIndex = goals.findIndex((goal) => goal.type === "Weight");
  if (circumferenceIndex === -1) {
    circumference = <CircumferenceGoalChecked />;
  }
  if (weightIndex === -1) {
    weight = <WeightGoalChecked />;
  }
  if (bodyFatIndex === -1) {
    bodyFat = <BodyFatGoalChecked />;
  }
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Pick A Goal To Set
      </Dropdown.Toggle>
      <Dropdown.Menu rootCloseEvent="click" id="filterMenu">
        {circumference}
        {weight}
        {bodyFat}
        <Form>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check name="movement" type="checkbox" label="Movement" />
            <Form.Check name="dietary" type="checkbox" label="Dietary" />
          </Form.Group>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GoalDropdown;
