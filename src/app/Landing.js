import React, { useContext } from "react";
import { Redirect } from "react-router";
import "./Landing.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../Auth.js";

export const Landing = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid id="main">
      <Row>
        <Col xs={12} id="video">
          <h1>Video</h1>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col />
        <Col xs={12} md={4} id="guest">
          <div>
            <h1 id="guestCol">Enter As Guest</h1>
            <div className="guestItemsDiv">
              <h4 className="guestItem">Access to "Find A Trainer"</h4>
              <h4 className="guestItem">Access to "Build A Workout"</h4>
              <br />
              <br />
              <br />
              <br />
            </div>
            {/* <Button href="./FindTrainer" variant="warning">Enter</Button> */}
          </div>
        </Col>

        <Col md={2} />

        <Col xs={12} md={4} id="createAnAccountCol">
          <div>
            <h1 id="createAnAccount">Create An Account</h1>
            <div className="guestItemsDiv">
              <h4 className="guestItem">Access to "Find A Trainer"</h4>
              <h4 className="guestItem">Access to "Exercise Library"</h4>
              <h4 className="guestItem">Access to "Build A Workout"</h4>
              <h4 className="guestItem">Access to "Track Your Progress"</h4>
            </div>
            {/* <SignUp /> */}
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};
