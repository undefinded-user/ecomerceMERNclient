import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase.js'
import { useDispatch } from 'react-redux'

import Home from './pages/Home.js'
import Login from './pages/auth/Login.js'
import Register from './pages/auth/Register.js'
import RegisterComplete from './pages/auth/RegisterComplete.js'
import ForgotPassword from './pages/auth/ForgotPassword.js'
import Header from './components/nav/Header'

 
function App() {
  const dispatch = useDispatch()
  // check firebase auth state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: 'GET_LOGGED_IN_USER_SAGA',
          payload: {
            token : idTokenResult.token
          }
        })
      }
    })
    return () =>unsubscribe()
  }, [])
  return (
    <>
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/register/complete' component={RegisterComplete}/>
        <Route exact path='/forgot/password' component={ForgotPassword}/>
      </Switch>
    </>
  )
}

export default App;
