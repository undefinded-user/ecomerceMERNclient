import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {Route} from 'react-router-dom'
import LoadingToRedirect from './LoadingToRedirect'
import axios from 'axios'

const AdminRoute = ({children, ...rest}) => {
	const user = useSelector((state) => state.user)
	const [ok, setOk] = useState(false)
	useEffect(()=>{
		try{
			user&&user.token&&axios.post(`${process.env.REACT_APP_API}/current-admin`, {}, {
				headers: {
					authtoken : user.token
				}
			})
			.then((res) => {
				console.log('CURRENT ADMIN RESPONSE', res)
				setOk(true)
			})
			.catch((error) => {
				console.log('CURRENT ADMIN ROUTE ERROR', error)
				setOk(false)
			})
		} catch(error){

		}
		
	}, [user])

	return ok? <Route {...rest} render={()=>children} /> : <LoadingToRedirect />
}

export default AdminRoute