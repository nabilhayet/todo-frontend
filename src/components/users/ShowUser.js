import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import App from '../../App';
import todosReducer from '../../reducers/todosReducer';

//import Home from '../../Home'
//import Navbar from '../../Navbar';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class ShowUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            gotUser: false,
            message: "",
            logoutMessage: "",
            currentUser: [],
            islogout: false,
            name: "",
            gotTodo: false,
            todo_id: ""
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/users/${this.props.match.params.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(r => {
                    if (r.error) {
                        this.setState({
                            message: "You don't have access"
                        })
                    } else {
                        this.setState({
                            gotUser: true,
                            id: r.user.id
                        })
                    }

                })
        } else {
            this.setState({
                message: "You don't have access"
            })
        }
    }

    handleLogout = (event) => {
        event.preventDefault()
        localStorage.removeItem("token")
        this.setState({
            logoutMessage: "You have successfully logged out!",
            islogout: true
        })

    }

    createButton = () => {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
                <button onClick={this.addTodo}>New</button>
            </div>
        )
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const todo = { name: this.state.name, id: this.state.id }
        this.props.addTodo(todo)
        this.setState({
            gotTodo: true,
            todo_id: todo.id
        })
    }

    render() {
        <h1>My To-Do List</h1>
        const findUser = this.state.gotUser
        const isLogout = this.state.islogout
        return (
            <div>
                <div>
                    {findUser ? this.createButton() : this.state.message}
                    {isLogout ? <Redirect to={`/users/login`} /> : ""}
                </div>
                <div>
                    <form onSubmit={event => this.handleSubmit(event)}>
                        <p>
                            <input type="text" id="name" onChange={event => this.handleChange(event)}
                                value={this.state.name} required />
                        </p>
                        <input type="submit" class="btn" />
                    </form>
                </div>
            </div>

        );
    }
};



const mapDispatchToProps = dispatch => {
    return {
        addTodo: todo => { dispatch(addTodo(todo)) }
    }
}
const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);
