import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import CircumferenceGoalChecked from "./circumferenceGoalChecked";
import { useSelector } from "react-redux";
import { WeightGoalChecked } from "./weightGoalChecked";
import { BodyFatGoalChecked } from "./bodyFatGoalChecked";
import { MovementGoalChecked } from "./movementGoalChecked";
import {DietGoalChecked} from "./dietGoalChecked"

export const GoalDropdown = () => {
  let circumference;
  let weight;
  let bodyFat;
  let movement;
  let diet;
  const goals = useSelector((state) => state.users.goals);
  const circumferenceIndex = goals.findIndex(
    (goal) => goal.type === "Circumference"
  );
  const movementIndex = goals.findIndex((goal) => goal.type === "Movement");
  const bodyFatIndex = goals.findIndex((goal) => goal.type === "BodyFat");
  const dietIndex = goals.findIndex((goal) => goal.type === "Diet");
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
  if (movementIndex === -1) {
    movement = <MovementGoalChecked />;
  }
  if (dietIndex === -1) {
    diet = <DietGoalChecked />;
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
        {movement}
        {diet}
        <Form>
          <Form.Group controlId="formBasicCheckbox">
          </Form.Group>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GoalDropdown;
