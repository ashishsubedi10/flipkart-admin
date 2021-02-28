import { Route, Switch } from 'react-router-dom'
import Home from './Containers/Home'
import Signin from './Containers/Signin'
import Signup from './Containers/Signup'
import PrivateRoute from './Components/HOC/privateRoute'
import './App.css';
import { getAllCategory, getInitialData, isUserLoggedIn } from './actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Products from './Containers/Products'
import Orders from './Containers/Orders'
import Category from './Containers/Category'

function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    dispatch(getInitialData())

  }, [])
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
