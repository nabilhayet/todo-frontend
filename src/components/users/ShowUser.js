import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import App from '../../App';
import addTodo from '../../actions/todos';
import getTodos from '../../actions/getTodos';
import deleteTodo from '../../actions/deleteTodo';
import updateTodo from '../../actions/updateTodo';

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
            todo_id: "",
            count: 0,
            currentTodos: [],
            createNewTodoForm: false
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

    addTodoForm = (event) => {
        this.setState({
            createNewTodoForm: true
        })
    }

    createButton = () => {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
                <button onClick={this.addTodoForm}>New</button>
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
        this.setState({
            count: this.state.count += 1
        })
        const todo = { id: this.state.count, name: this.state.name, user_id: this.state.id }
        this.props.addTodo(todo)
        this.setState({
            gotTodo: true,
            todo_id: this.state.count,
            name: ""
        })

    }

    render() {
        const todoForm = this.state.createNewTodoForm
        const findUser = this.state.gotUser
        const isLogout = this.state.islogout
        const gotTodo = this.state.gotTodo
        const getAllTodos = this.props.todos.filter((todo) => todo.user_id === this.state.id)
        const AllTodos = getAllTodos.map((todo) => {
            return (
                <li key={todo.id}>{todo.name}</li>
            )
        })
        return (
            <div>
                <h1>My To-Do List</h1>
                <div>
                    {findUser ? this.createButton() : this.state.message}
                    {isLogout ? <Redirect to={`/users/login`} /> : ""}
                    {todoForm ? <form onSubmit={event => this.handleSubmit(event)}>
                        <p><input type="text" id="name" onChange={event => this.handleChange(event)} value={this.state.name} required /></p>
                        <input type="submit" class="btn" /></form> : ""}
                    {AllTodos}
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
