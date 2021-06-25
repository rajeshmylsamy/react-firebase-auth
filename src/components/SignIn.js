import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Link, useHistory } from "react-router-dom";


export default function SignIn() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const phoneRef = useRef();

	const { currentUser, signin } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signin(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch (e) {
			console.log(e)
			setError(e.message);
		}
		setLoading(false);
	}

	async function handleSubmitForPhone(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		history.push("/signinwithotp");
	}
//  +919066224825  //  +918220363505
	return (		
		<div>
			
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign In</h2>
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
						<Button className="w-100 mt-2" type="submit" disabled={loading}>
							SignIn
						</Button>
						<div className="w-100 text-center mt-2">
							Forgot Password? <Link to="/forgotpassword"> Click here</Link>
						</div>
						<div className="w-100 text-center mt-2">or</div>
					</Form>
					
					<Form onSubmit={handleSubmitForPhone}>
						<Button className="w-100 mt-2" type="submit" disabled={loading}>
							SignIn With OTP
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't have account? <Link to="/signup"> Sign Up</Link>
			</div>
		</div>
	);
}
