import React, { useState } from 'react'

import { auth } from '../../firebase.js'

import { toast } from 'react-toastify'

const Register = ({history}) => {
	const [email, setEmail] = useState('');
	const [errors, setError] = useState([]);

	const handleSubmit =  async (e) => {
		e.preventDefault()
		const actionCodeSettings = {
		  // URL you want to redirect back to. The domain (www.example.com) for this
		  // URL must be in the authorized domains list in the Firebase Console.
		  url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
		  // This must be true.
		  handleCodeInApp: true
		}

		try {
			await auth.sendSignInLinkToEmail(email, actionCodeSettings)
			toast.success(`Email is sent to ${email}. Click to complete your registration.`)
			// Save the email locally so you don't need to ask the user for it again
			window.localStorage.setItem('emailForSignIn', email);
			setEmail('')
		} catch (error) {
			console.log(error)
			setError([...errors, error])
			toast.error(error.message)
			history.push('/login')
		}
		
	}

	const registerForm = () => {

		return(		
			<form onSubmit={handleSubmit}>
				<input 
					type='email'
					className='form-control' 
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
					{registerForm()}
				</div>
			</div>
		</div>
	)
}

export default Register