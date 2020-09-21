import React, { useState } from "react";
import app from "../../Firebase";
import firebase from "../../Firebase";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

export const SignUp = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const writeUserData = (userId, name, email) => {
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        name: name,
        email: email,
      });
  };

  const handleAccountCreation = async (event) => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name.value,
      });
      if (user != null) {
        let name = user.displayName;
        let email = user.email;
        let uid = user.uid;
        writeUserData(uid, name, email);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        Create An Account
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create An Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAccountCreation}>
            <Form.Label>
              Email
              <Form.Control name="email" type="email" placeholder="Email" />
            </Form.Label>
            <Form.Label>
              Password
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Label>
            <Form.Label>
              Display Name
              <Form.Control
                name="name"
                type="text"
                placeholder="Display Name"
              />
            </Form.Label>
            <br />
            <Button type="submit">Sign Up</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
