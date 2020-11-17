import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "./images/PFLogoClear.png";
import Button from "react-bootstrap/Button";
import app from "../Firebase.js";
import { AuthContext } from "../Auth.js";
import "./TopNav.css";
import { SignUp } from "../features/users/userSignUp";
import { userSignOut } from "../features/users/usersSlice";
import firebase from "../Firebase";
import { useDispatch } from "react-redux";

export const TopNav = () => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  if (!currentUser)
    return (
      <Navbar expand="lg" bg="primary" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container id="navbarContainer" fluid>
            <Row className="justify-content-md-center" id="navbarRow">
              <Col xs={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }}>
                <Nav>
                  <Navbar.Brand href="./">
                    <img
                      src={Logo}
                      height="100vh"
                      className="d-inline-block align-top"
                      alt=" "
                    />
                  </Navbar.Brand>
                </Nav>
              </Col>
              <Col xs={12} md={10}>
                <Button id="loginButton" href="./Login" variant="warning">
                  Login
                </Button>
                <SignUp />
              </Col>
              <Col xs={12} md={2}>
                <Nav>
                  <NavDropdown title="Tools">
                    <NavDropdown.Item href="./Login">
                      Member Login
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Build A Workout
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">Find A Trainer</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    );

  const handleLogOut = () => {
    const user = firebase.auth().currentUser;
    let uid = user.uid;
    dispatch(userSignOut(uid));
    app.auth().signOut();
  };

  return (
    <Navbar expand="lg" bg="warning" variant="light">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container id="navbarContainer" fluid>
          <Row className="justify-content-md-center" id="navbarRow">
            <Col xs={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }}>
              <Nav>
                <Navbar.Brand href="./">
                  <img
                    src={Logo}
                    height="100vh"
                    className="d-inline-block align-top"
                    alt=" "
                  />
                </Navbar.Brand>
              </Nav>
            </Col>
            <Col xs={12} md={10}>
              {/* <Account/> */}
              <Button id="signOutButton" onClick={handleLogOut}>
                Sign Out
              </Button>
            </Col>
            <Col xs={12} md={2}>
              <Nav>
                <NavDropdown title="Tools" id="topNavbar-dropdown">
                  <NavDropdown.Item href="#">Find A Trainer</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Design A Workout</NavDropdown.Item>
                  <NavDropdown.Item href="#">Exercise Library</NavDropdown.Item>
                  <NavDropdown.Item href="./UserGoals">
                    Track Your Progress
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};
