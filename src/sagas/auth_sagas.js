import axios from 'axios'

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* userLoggedInSaga(action) {
	
	const res = yield axios.post(`${process.env.REACT_APP_API}/create-update-user`, {}, {
		headers: {
			authtoken: action.payload.token
		}
	}) 

					
	const payload = {
		name: res.data.name,
		email: res.data.email,
		token: action.payload.token,
		role: res.data.role,
		_id: res.data._id
	}
						

	yield put({type:'LOGGED_IN_USER', payload})
}

export function* watchUserLoggedIn () {
	yield takeLatest('LOGGED_IN_USER_SAGA', userLoggedInSaga)
}
// get current user when page reload

function* getLoggedInUserSaga(action) {
	const res = yield axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
		headers: {
			authtoken: action.payload.token
		}
	}) 

					
	const payload = {
		name: res.data.name,
		email: res.data.email,
		token: action.payload.token,
		role: res.data.role,
		_id: res.data._id
	}
						

	yield put({type:'LOGGED_IN_USER', payload})
}

export function* watchGetLoggedInUser(){
	yield takeLatest('GET_LOGGED_IN_USER_SAGA', getLoggedInUserSaga)
}