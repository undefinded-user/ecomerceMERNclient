import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { auth, googleAuthProvider } from '../../firebase.js'

import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'antd'
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'

const axios = require('axios')

const Login = ({history}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setError] = useState([]);

	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	useEffect(()=>{
		user&&user.token&&history.push('/')
	}, [user])

	const isFormValid = () => {
		return email&&password.length>5
	}

	const handleSubmit =  async (e) => {
		e.preventDefault()
		setLoading(true)
		//chek form validationn
		if(isFormValid()){
			// try to get user from firebase
			try{
				const result = await auth.signInWithEmailAndPassword(email, password)
				if(result.user){
					const { user } = result
					const idTokenResult = await user.getIdTokenResult()
					// save user to redux store
					const res = await axios.post(`${process.env.REACT_APP_API}/create-update-user`, {}, {
						headers: {
							authtoken: idTokenResult.token
						}
					}) 

					dispatch({
						type: 'LOGGED_IN_USER',
						payload: {
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id
						}
						
						
					})
					// redirect to home page
					history.push('/')
				}
			} catch (error) {
				//display error from firebase
				toast.error(error.message)
				setLoading(false)
			}
		} else {
			//display message that form is not valid
			toast.error('Form is not valid')
		}
	}

	const handleSignUpWithGoogle = async (e) => {
		e.preventDefault();
		try{
			const result = await auth.signInWithPopup(googleAuthProvider)
			const { user } = result
			const idTokenResult = await user.getIdTokenResult()
			const res = await axios.post(`${process.env.REACT_APP_API}/create-update-user`, {}, {
				headers: {
					authtoken: idTokenResult.token
				}
			})

			dispatch({
				type: 'LOGGED_IN_USER',
				payload: {
					name: res.data.name,
					email: res.data.email,
					token: idTokenResult.token,
					role: res.data.role,
					_id: res.data._id
				}
			})
				
			history.push('/')
		} catch (error) {
			toast.error(error.message)
		}
	}

	const loginForm = () => {

		return(		
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input 
					type='email'
					className='form-control' 
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
					autoFocus
					/>
					<input 
						type='password'
						className='form-control' 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Your password'
					/>
					<br />
					<Button onClick={handleSubmit}
							className='mb-3'
							type='primary'
							block
							shape='round'
							size='large'
							disabled={!isFormValid()}
							loading={loading}
							icon={< MailOutlined />}
					>
							Login with email/password
					</Button>
					<Button onClick={handleSignUpWithGoogle}
							className='mb-3'
							block
							shape='round'
							size='large'
							loading={loading}
							icon={<GoogleOutlined />}
					>
							Login with Google
					</Button>
					<Link to='forgot/password' className='float-right text-danger' >
						Forgot password
					</Link>
				</div>			
			</form>
		)  	
	}

	return(
		<div className="container p-5">
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					{loading?<h1>Loading...</h1> : <h1>Login</h1>}
					{loginForm()} 
				</div>
			</div>
		</div>
	)
}

export default Login