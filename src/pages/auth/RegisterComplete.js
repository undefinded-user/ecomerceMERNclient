import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { auth } from '../../firebase.js'

import { toast } from 'react-toastify'
const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setError] = useState([]);
	const [isEmailFilled, setIsEmailFilled] = useState(window.localStorage.getItem('emailForSignIn'))
	
	const user = useSelector((state)=>state.user)

	const isPasswordValid = () => {
		
		return (
			password !== confirmPassword? 
			{error: {message: 'Check your password confirmation'}} :
			password.length < 6?
			{error: {message : 'Password should be at least 6 characters'}} :
			true
		)
		
	}

	useEffect(()=>{
		user&&user.token&&history.push('/')
		// Get the email if available. This should be available if the user completes
		// the flow on the same device where they started it.
		setEmail(window.localStorage.getItem('emailForSignIn'));
	 	if (!window.localStorage.getItem('emailForSignIn')) {
		    // User opened the link on a different device. To prevent session fixation
		    // attacks, ask the user to provide the associated email again. For example:
	    	toast.info('Please provide your email for confirmation');
	  	}
	}, [user])
	

	const handleSubmit = async (e) => {
		e.preventDefault()
		//  Confirm the link is a sign-in with email link.
		if (auth.isSignInWithEmailLink(window.location.href)) {
			try {
				if(isPasswordValid() === true){
					
				  	const result = await auth.signInWithEmailLink(email, window.location.href);
			      	// You can access the new user via result.user
			      	// Additional user info profile not available via:
			     	// result.additionalUserInfo.profile == null
			     	// You can check if the user is new or existing:
			    	// result.additionalUserInfo.isNewUser
			    	if(result.user.emailVerified){
			    		window.localStorage.removeItem('emailForSignIn')
				    	let user = auth.currentUser
				    	await user.updatePassword(password)
				    	const userIdToken = await user.getIdTokenResult()
				    	console.log('user', user, 'idTokenResult', userIdToken)
				    	// redux store

				    	// redirect
				    	history.push('/')
			    	}
			    	
				} else {
		    		toast.error(isPasswordValid().error.message)
				}

		      
			 } catch(error) {
			  	setError([...errors, error])
			  	toast.error(error.message)
			 }
		}
				  
		    

	}

	
	const RegisterCompleteForm = () => {

		return(		
			<form onSubmit={handleSubmit}>
				<input 
					type='email'
					className='form-control' 
					id='email'
					value={email}
					onChange={(e) =>setEmail(e.target.value)}
					placeholder='Email'
					disabled={isEmailFilled}
					autoFocus={!isEmailFilled}
				/>
				<br />
				{console.log(!isEmailFilled)}
				<input 
					type='password'
					className='form-control' 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
					autoFocus={isEmailFilled}
				/>
				<input 
					type='password'
					className='form-control' 
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder='Confirm Password'
				/>
				<br />
				<button type='sybmit' className="btn btn-raised">
						Complete
				</button>
			</form>
		)  	
	}

	return(
		<div className="container p-5">
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h1>Comlete registration</h1>
					{RegisterCompleteForm()}
				</div>
			</div>
		</div>
	)
}

export default RegisterComplete