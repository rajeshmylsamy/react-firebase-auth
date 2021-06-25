import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Link, useHistory } from "react-router-dom";

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Password not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					{/* {currentUser && currentUser.email} */}
					{error && <Alert variant="danger">{error} </Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>
						<Button className="w-100 mt-2" type="submit" disabled={loading}>
							SignUp
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have account? <Link to="/signin">Log In</Link>
			</div>
		</div>
	);
}
