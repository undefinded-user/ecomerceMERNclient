import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home.js'
import Login from './pages/auth/Login.js'
import Register from './pages/auth/Register.js'

 
function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
    </Switch>
  )
}

export default App;
