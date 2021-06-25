import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Link } from "react-router-dom";

export default function ForgotPassword() {
	const emailRef = useRef();
	const [message, setMessage] = useState();
	const { forgotPassword } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await forgotPassword(emailRef.current.value);
			setMessage(
				"check your inbox for password reset instructions to proceed further"
			);
		} catch {
			setError("Failed to Reset Password");
		}
		setLoading(false);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Password Reset</h2>
					{/* {currentUser && currentUser.email} */}
					{message && <Alert variant="success">{message} </Alert>}
					{error && <Alert variant="danger">{error} </Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Button className="w-100 mt-2" type="submit" disabled={loading}>
							Reset
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Back to SignIn? <Link to="/signin">Log In</Link>
			</div>
		</div>
	);
}
