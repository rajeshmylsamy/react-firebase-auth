import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [currentPhone, setCurrentPhone] = useState();
	const [confirmationResult, setConfirmationResult] = useState();

	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return new firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	function signin(email, password) {
		return new firebase.auth().signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return new firebase.auth().signOut();
	}

	function forgotPassword(email) {
		return new firebase.auth().sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	function signinWithPhone(phoneNumber, recaptchaVerifier) {		
		firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
			.then((confirmResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				console.log("SMS sent")
				setCurrentPhone(phoneNumber);
				setConfirmationResult(confirmResult);
			}).catch(e => {
				console.log("error in handle submit " + e)
			});
	}
	//+919066224825  //  +918220363505

	function verifyOTPCode(otpCode) {
		return confirmationResult.confirm(otpCode);
	}

	useEffect(() => {
		console.log("Triggering useEffect() inside AuthContext ")			
		const unsubsribe = new firebase.auth().onAuthStateChanged((user) => {
			console.log(user)
			console.log("Running onAuthStateChanged function inside useEffect()")			
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	const value = {
		currentUser,
		currentPhone,
		signup,
		signin,
		logout,
		forgotPassword,
		updateEmail,
		updatePassword,
		signinWithPhone,
		verifyOTPCode,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
