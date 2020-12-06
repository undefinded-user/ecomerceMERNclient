import { all } from 'redux-saga/effects'
import { watchUserLoggedIn, watchGetLoggedInUser } from './auth_sagas.js'

export default function* rootSagas() {
	yield all([
			watchUserLoggedIn(),
			watchGetLoggedInUser()
		])
}