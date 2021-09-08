import './App.css';
import Home from './Home';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import Navbar from './Navbar';



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Component } from 'react';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/login" component={LoginUser} />
          <Route exact path="/users/register" component={RegisterUser} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
