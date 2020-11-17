import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import "./userGoals.css";

export const UserGoals = () => {
  return (
    <Container fluid id="progressContainer">
      <Row>
          <Col md={1}/>
        <Col xs={12} md={4}>
          <div className="goals">Overall Progress Goals/Distance from goal</div>
        </Col>
        <Col md={2}/>
        <Col xs={12} md={4}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select Goal Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Body Weight</Dropdown.Item>
              <Dropdown.Item>Body Fat</Dropdown.Item>
              <Dropdown.Item>Circumference</Dropdown.Item>
              <Dropdown.Item>Movement</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="goals">Specific Goal Area</div>
        </Col>
      </Row>
    </Container>
  );
};