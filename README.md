![GitHub Repo stars](https://img.shields.io/github/stars/nabilhayet/Restaurant) ![GitHub forks](https://img.shields.io/github/forks/nabilhayet/Restaurant) ![GitHub followers](https://img.shields.io/github/followers/nabilhayet) ![Bitbucket open issues](https://img.shields.io/bitbucket/issues/nabilhayet/Restaurant)                                          
                                        <h1>:bomb: Todo :bomb: </h1>
                                                      
This project lets a user add a new todo. Before creating a todo a user needs to logged in and only registered users can sign in. After creating a todo, a user can see all the existing todos. Updating or deleting a todo option available to the user. At the end, all todos are cleared when the user logs out of the profile.

<a href="https://www.youtube.com/watch?v=fk75oqqnAgo">Demo</a>
<a href="https://github.com/nabilhayet/todo-backend-api">Backend</a>

Table of Contents
- [Features](#features)
- [Tech-Stack](#tech-stack)
- [Installing](#installing)
- [Challenges](#challenges)
- [Future-Implementation](#future-implementation)
- [Code-Snippet](#code-snippet)
                               
## Features
<ul>
 <li>Full CRUD capabilities for todos such as</li>
 <li>Add a new todo</li>
 <li>View all existing todos on this application</li>
 <li>Edit/Delete the todos</li>
 <li>Registering option for a user</li>
 <li>View profile after log in</li>
 <li>Clear todos after log out</li>
 <li>Search a todo by it's name</li>
</ul>

## Login
![Login](https://user-images.githubusercontent.com/33500404/133952223-82f82b5f-953e-4a8b-936a-7017183e1354.gif)

## Add Todo
![Add_todo](https://user-images.githubusercontent.com/33500404/133952241-d239545c-96b0-4ef5-b628-29d0d9252881.gif)

## Edit Todo
![Update_todo](https://user-images.githubusercontent.com/33500404/133952257-bcd8f215-b06d-48d7-a7c8-639c37e48678.gif)

## Delete Todo
![Delete_todo](https://user-images.githubusercontent.com/33500404/133952276-b9fc6da3-195a-433b-a9d5-82f350992ee0.gif)

## Search Todo
![Search_todo](https://user-images.githubusercontent.com/33500404/133952288-0e1ed262-1fa0-425d-a659-dd233f8878a4.gif)

## Logout
![Logout](https://user-images.githubusercontent.com/33500404/133952297-fa99f443-f70e-4a87-8dce-db3581961b54.gif)

## Tech-Stack
<p>This web app makes use of the following:</p>

* react
*	java-script
*	html
*	css

## Installing
<ul>
<li> Clone this repo to your local machine git clone <this-repo-url></li>
<li> run npm install to install required dependencies</li>
<li> run npm start to start the browser.</li>
</ul>
        
## Challenges
<ul>
<li> Implementing redux state with react</li>
<li> Whenever a user logged out, the todos weren't removed automatically</li>
<li> Implementing validations for login form</li>
<li> Re-render the dom after performing an operation</li>
</ul>

## Future-Implementation
<ul>
<li> Add bootstrap to make the UI more appealing</li>
<li> Connecting backend for todos</li>
<li> Create separate components for each function</li>
</ul> 

## Code-Snippet 

```
class App extends Component {
  fetchEverything = () => {
    this.props.getUsers();
  }

  componentDidMount() {
    this.fetchEverything();
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
    users: state.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => { dispatch(getUsers()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

```

```
 const rootReducer = combineReducers({
  users: usersReducer,
  todos: todosReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
export default rootReducer;

```

```
class LoginUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            id: "",
            gotUser: false,
            message: "",
            emailError: "",
            passwordError: ""
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const isValid = this.validate();
        if (isValid) {
            this.loginUser(event)
        }
        this.setState({
            email: "",
            password: ""
        })


    }

```

```
loginUser = (event) => {
        let loginBody = {}
        loginBody = {
            email: this.state.email,
            password: this.state.password
        }
        const configobj = {
            method: 'POST',
            body: JSON.stringify(loginBody),

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }
        }
        fetch('http://localhost:3000/user/login', configobj)
            .then(response => response.json())
            .then(user => {
                if (user.status === 'error') {
                    this.setState({
                        message: "Wrong email or password"
                    })

                } else {
                    if (user.jwt !== undefined) {
                        localStorage.setItem("token", user.jwt)
                        this.setState({
                            id: user.user.id,
                            gotUser: true
                        })
                    }
                    else {
                        this.setState({
                            message: "You Don't have access"
                        })
                    }
                }

            })
    };
```

```
 render() {
        const renderUser = this.state.gotUser
        return (
            <div>
                {renderUser ? <Redirect to={`/users/${this.state.id}`} /> : this.state.message}
                <h1>Rapptr Labs</h1>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <div class="form-input">
                        <label>Email</label>
                        <span class="icon"><FaUser /></span>
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            placeholder="user@rapptrlabs.com"
                            value={this.state.email}
                        />
                        {this.state.emailError ? <div style={{ fontSize: 10, color: "red" }}>{this.state.emailError}</div> : null}
                    </div>
                    <div class="form-input">
                        <label>Password</label>
                        <span class="icon"><FaLock /></span>
                        <input
                            type="password"
                            name="password"
                            onChange={event => this.handleChange(event)}
                            placeholder="Must be at least 4 characters"
                            value={this.state.password}
                        />
                        {this.state.passwordError ? <div style={{ fontSize: 10, color: "red" }}>{this.state.passwordError}</div> : null}
                    </div>
                    <input type="submit" class="btn" />
                </form>
                {this.state.gotUser && (
                    <Redirect to={`/users/${this.state.id}`} />
                )}
            </div>
        );
    }
};
``` 


