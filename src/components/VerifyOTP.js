import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Link, useHistory } from "react-router-dom";


export default function VerifyOTP() {
	const otpRef = useRef();

	const { currentPhone, verifyOTPCode,currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleVerifyOTP(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			console.log("otp " + otpRef.current.value);
			await verifyOTPCode(otpRef.current.value); 
			history.push("/");
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
					<h2 className="text-center mb-4">Verify OTP</h2>
					{currentPhone && <Alert variant="success"> 	Enter OTP sent to the phone {currentPhone} </Alert>}				 
					{error && <Alert variant="danger">{error} </Alert>}					
					<Form onSubmit={handleVerifyOTP}>
						<Form.Group>
							<Form.Label>OTP Code</Form.Label>
							<Form.Control type="number" ref={otpRef} required />
						</Form.Group>
						<Button className="w-100 mt-2" type="submit" disabled={loading}>
							Sign In
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
