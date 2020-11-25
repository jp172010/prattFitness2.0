import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoalDropdown } from "../goals/goalDropdown";
import { GoalArea } from "../users/goalArea.js";
import "./userGoals.css";

export const UserGoals = () => {
  return (
    <Container fluid id="progressContainer">
      <Row className="justify-content-md-center">
        <Col xs={12}>
          <div className="goals">Overall Progress Goals/Distance from goal</div>
        </Col>
      </Row>
      <Container className="justify-content-md-center">
        <Row>
          <h1>Goals</h1>
        </Row>
        <Row>
          <GoalDropdown />
        </Row>
        <Col className="overflow-auto">
          <GoalArea />
        </Col>
      </Container>
    </Container>
  );
};
