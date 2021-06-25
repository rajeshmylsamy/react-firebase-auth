import { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
	const [error, setError] = useState();
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	async function handleLogout() {
		setError("");
		try {
			await logout();
			history.pushState("/login");
		} catch (e) {
			console.log(e)
			setError("Failed to logout");
		}
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="w-100 text-center mt-2 "> Profile </h2>
					{error && <Alert variant="danger">{error} </Alert>}				
					{currentUser.email && <strong>Email : {currentUser.email} </strong> }
					{currentUser.phoneNumber && <strong>Phone : {currentUser.phoneNumber} </strong>}

					<Link to="/updateprofile" className="btn btn-primary w-100 mt-2">
						UpdatePassword
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button onClick={handleLogout}>Log Out</Button>
			</div>
		</div>
	);
}
