import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'
import rootSagas from '../sagas'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const middlewareEnhancer = applyMiddleware(sagaMiddleware)
const enhancers = composeWithDevTools(middlewareEnhancer)
export const store = createStore(rootReducer, enhancers)

sagaMiddleware.run(rootSagas)

