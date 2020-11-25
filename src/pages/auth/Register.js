import React, { useState } from 'react'

import { auth } from '../../firebase.js'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
	const [email, setEmail] = useState('');
	const [errors, setError] = useState([]);

	const handleSubmit =  async (e) => {
		e.preventDefault();
		const actionCodeSettings = {
		  // URL you want to redirect back to. The domain (www.example.com) for this
		  // URL must be in the authorized domains list in the Firebase Console.
		  url: 'https://localhost:3000/register/finish',
		  // This must be true.
		  handleCodeInApp: true
		}

		try {
			console.log(1)
			await auth.sendSignInLinkToEmail(email, actionCodeSettings)
			toast(`Email is sent to ${email}. Click to complete your registration.`)
			console.log(2)
			// Save the email locally so you don't need to ask the user for it again
			window.localStorage.setItem('emailForSignIn', email);
			setEmail('')
		} catch (error) {
			setError([...errors, error])
			console.log(error)
		}
		
	}

	const handleChange = (e) => {
		const { value } = e.target
		setEmail(value)
	}

	const registerForm = () => {

		return(		
			<form onSubmit={handleSubmit}>
				<input 
					type='email'
					className='form-control' 
					id='email'
					value={email}
					onChange={handleChange}
					placeholder='Email'
					autoFocus
				/>
				<button type='submit' className="btn btn-raised">
						Register{email? ' / ' + email : ''}
				</button>
			</form>
		)  	
	}

	return(
		<div className="container p-5">
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h1>Register</h1>
					< ToastContainer />
					{registerForm()}
				</div>
			</div>
		</div>
	)
}

export default Register