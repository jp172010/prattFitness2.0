import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../Auth";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import app from "../../Firebase.js";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const canLogin =
    [email, password].every(Boolean);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const loginClicked = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    if (canLogin) {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
      } catch (err) {
        console.error("Failed to login: ", err);
      }
    }
  };

  return (
    <Container fluid id="mainLogin">
      <Row>
        <Col xs={12} id="videoLogin">
          <h1>Video</h1>
        </Col>
      </Row>

      <Row id="memberLoginRow" className="justify-content-md-center">
        <Col />
        <Col xs={12} md={4}>
          <div id="loginDiv">
            <h3>Member Login</h3>
            <Form onSubmit={loginClicked}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={onEmailChanged}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={onPasswordChanged}
                />
              </Form.Group>

              <Button variant="warning" type="submit" disabled={!canLogin}>
                Log in
              </Button>
            </Form>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};
