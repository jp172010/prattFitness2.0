import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import CircumferenceGoalChecked from "./circumferenceGoalChecked";

export const GoalDropdown = () => {
  
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Pick A Goal To Set
      </Dropdown.Toggle>

      <Dropdown.Menu rootCloseEvent='click' id="filterMenu">
      <CircumferenceGoalChecked />
        <Form>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check name="weight" type="checkbox" label="Weight" />            <Form.Check name="bodyFat" type="checkbox" label="Body Fat %" />
            <Form.Check name="movement" type="checkbox" label="Movement" />
            <Form.Check name="dietary" type="checkbox" label="Dietary" />
            <Form.Check name="life" type="checkbox" label="Life" />
          </Form.Group>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GoalDropdown;
