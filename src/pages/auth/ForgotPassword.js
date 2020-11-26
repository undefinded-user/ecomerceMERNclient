import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { auth } from '../../firebase.js'

import { toast } from 'react-toastify'

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState('')
 	const user = useSelector((state) => state.user)

 	useEffect(()=>{
 		user&&user.token&&history.push('/')
 	}, [user])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		const actionCodeSettings = {
		  // URL you want to redirect back to. The domain (www.example.com) for this
		  // URL must be in the authorized domains list in the Firebase Console.
		  url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
		  // This must be true.
		  handleCodeInApp: true
		}

		try{
			await auth.sendPasswordResetEmail(email, actionCodeSettings)
			toast.success('Check your email for password reset link')
			setEmail('')
			setIsLoading(false)
		} catch(error){
			toast.error(error.message)
			setIsLoading(false)
		}
		
		
	}

	const forgotPasswordForm = () => {
		return(
			<form onSubmit={handleSubmit}>
				<input type='email'
					   placeholder='Please, enter your email'
					   className='form-control'
					   value={email}
					   onChange={(e)=>setEmail(e.target.value)}
					   autoFocus
					   
				/>
				<br />
				<Button 
					type='danger'
					onClick={handleSubmit}
					shape='round'>Send reset link</Button>
			</form>
		)
	}

	return(
		<div clasName='container'>
			<div className='row p-5'>
				<div className='col-md-6 offset-md-3'>
					{isLoading? <h4>Loading<LoadingOutlined /></h4> : <h4>Forgot password</h4>}
					{
						forgotPasswordForm()
					}
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword

