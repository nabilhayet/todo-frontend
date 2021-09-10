import './App.css';
import Home from './Home';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import Navbar from './Navbar';

//import CreateUser from './components/users/CreateUser';
import ShowUser from './components/users/ShowUser'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from './actions/getUsers';
// import { getTodos } from './actions/getTodos';

class App extends Component {
  fetchEverything = () => {
    this.props.getUsers();
    // this.props.getTodos();
  }

  componentDidMount() {
    this.fetchEverything()
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/login" component={LoginUser} />
            <Route exact path="/users/register" component={RegisterUser} />
            <Route exact path='/users/:id' render={routerProps => <ShowUser {...routerProps} />} />
          </Switch>
        </div>
      </Router >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    // todos: state.todos
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    //  getTodos: () => { dispatch(getTodos()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
