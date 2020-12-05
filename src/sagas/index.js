import { all } from 'redux-saga/effects'
import { watchUserLoggedIn } from './user_sagas.js'

export default function* rootSagas() {
	yield all([
			watchUserLoggedIn()
		])
}