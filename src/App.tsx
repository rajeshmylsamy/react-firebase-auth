import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import logo from "./logo.svg";

import "./App.css";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import SignInWithOTP from "./components/SignInWithOTP";
import VerifyOTP from "./components/VerifyOTP";

function App() {
	return (
		<Container
			className="d-flex align-items-centre justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute path="/" exact={true} component={Dashboard} />
							<PrivateRoute path="/updateprofile" component={UpdateProfile} />
							<Route path="/forgotpassword" component={ForgotPassword} />
							<Route path="/signup" component={Signup} />
							<Route path="/signin" component={SignIn} />
							<Route path="/signinwithotp" component={SignInWithOTP} />
							<Route path="/verifyotp" component={VerifyOTP} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
