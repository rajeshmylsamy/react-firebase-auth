import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Password not match");
		}

		setError("");
		setLoading(true);

		const promises = [];
		if (passwordRef.current.value !== "") {
			promises.push(updatePassword(passwordRef.current.value));
		}
		Promise.all(promises)
			.then(() => {
				history.push("/");
			})
			.catch(() => {
				setError("Failed to update data");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Password</h2>
					{/* {currentUser && currentUser.email} */}
					{error && <Alert variant="danger">{error} </Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								ref={passwordRef}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type="password"
								ref={passwordConfirmRef}
								required
							/>
						</Form.Group>
						<Button className="w-100 mt-2" type="submit" disabled={loading}>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/">Cancel</Link>
			</div>
		</div>
	);
}
