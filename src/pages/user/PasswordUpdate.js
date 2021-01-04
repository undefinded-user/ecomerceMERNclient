import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const PasswordUpdate = () => {
	const [prevPassword, setPrevPassword] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const isPasswordValid = () => {
		
		return (
			password !== confirmPassword? 
			{error:{message: 'Check your password confirmation'}} :
			password.length < 6?
			{error: {message : 'Password should be at least 6 characters'}} :
			true
		)
		
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		try{
			const { email } = await auth.currentUser
			// check previose password
			await auth.signInWithEmailAndPassword(email, prevPassword)
			if(isPasswordValid() === true) {
				await auth.currentUser.updatePassword(password)
				toast.success("Password updated")
				setIsLoading(false)
				setPrevPassword('')
				setPassword('')
				setConfirmPassword('')

			} else {
				toast.error(isPasswordValid().error.message)
			}

		} catch(error) {
			setIsLoading(false)
			toast.error(error.message)
		}
	}

	const passwordUpdateForm = () => {
		return(
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input 
					className='form-control'
					type='password'
					value={prevPassword}
					onChange={(e)=>setPrevPassword(e.target.value)}
					placeholder='last password'
					disablde={isLoading}
					/>
					<br />
					<input 
					className='form-control'
					type='password'
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
					placeholder='new password'
					disabled={isLoading}
					/>
					<input 
					className='form-control'
					type='password'
					value={confirmPassword}
					onChange={(e)=>setConfirmPassword(e.target.value)}
					placeholder='password confirmation'
					disabled={isLoading}
					/>
					<button disabled={!password||!prevPassword||!confirmPassword||isLoading} className='btn btn-primary'>Submit</button>
				</div>
			</form>	
		)
	}
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col'>
					{isLoading? <h4>Loading...</h4> : <h1>Password Update</h1>}
					{passwordUpdateForm()}					
				</div>
			</div>
		</div>
	)
}

export default PasswordUpdate
