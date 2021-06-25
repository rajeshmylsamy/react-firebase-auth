import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Link, useHistory } from "react-router-dom";
import firebase from "../firebase";


export default function SignInWithOTP() {
	const otpRef = useRef();
	const phoneRef = useRef();

	const { signinWithPhone } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [currentPhone, setCurrentPhone] = useState();
	const [confirmationResult, setConfirmationResult] = useState();
	const history = useHistory();		

	async function handleSendOTP(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			console.log("phoneNumber " + phoneRef.current.value);
			await signinWithPhone(phoneRef.current.value);
			history.push("/verifyotp");
		} catch (e) {
			console.log("error in handle submit " + e)
			setError(e.message);
		}
		setLoading(false);
	}
//  +919066224825  //  +918220363505
	
	return (		
		<div>			
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign In With OTP</h2>
					{error && <Alert variant="danger">{error} </Alert>}					
					<Form onSubmit={handleSendOTP}>
						<Form.Group>
							<Form.Label>Phone</Form.Label>
							<Form.Control type="phone" ref={phoneRef} required />
						</Form.Group>
						<Button className="w-100 mt-2" type="submit" disabled={loading}>
							Send OTP
						</Button>
					</Form>				
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
			  Back to SignIn? <Link to="/signin"> Sign In</Link>
			</div>
		</div>
	);
}
