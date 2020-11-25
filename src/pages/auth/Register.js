import React, { useState } from 'react'

const Register = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = () => {

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
			</form>
		)  	
	}

	return(
		<div className="container p-5">
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h1>Register</h1>
					{registerForm()}
					<button type='sybmit' className="btn btn-raised">
						Register{email? ' / ' + email : ''}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Register