import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import addTodo from '../../actions/todos';
import deleteTodo from '../../actions/deleteTodo';
import updateTodo from '../../actions/updateTodo';
import clearTodo from '../../actions/clearTodo';

const link = {
    width: '100px',
    padding: '12px',
    margin: '20px 50px 6px',
    background: 'yellow',
    color: 'black',
    display: 'inline-block'
}
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
            count: 1,
            currentTodos: [],
            createNewTodoForm: false,
            search: "",
            searchedTodo: false,
            todoDelete: false,
            updateTodo: false,
            t_id: "",
            t_name: "",
            t_user: "",
            nameError: ""
        }
    }
    componentDidMount() {
        this.setState({
            ...this.state, currentTodos: this.props.todos
        })
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
                    }
                    else {
                        this.setState({
                            gotUser: true,
                            id: r.user.id
                        })
                    }
                })
        }
        else {
            this.setState({
                message: "You don't have access"
            })
        }
    }
    handleLogout = (event) => {
        event.preventDefault()
        localStorage.removeItem("token")
        this.props.clearTodo()
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
    handleSearchClear = () => {
        this.setState({
            ...this.state, currentTodos: this.props.todos, message: '', search: '', searchedTodo: false
        })
    }
    onChange(event) {
        this.setState({
            search: event.target.value
        })
    }
    onClick(event) {
        if (this.state.search !== '') {
            const searchBook = this.props.todos.filter((todo) => todo.name === this.state.search)
            if (searchBook.length !== 0) {
                this.setState({
                    ...this.state, currentTodos: searchBook, searchedTodo: true
                })
            }
            else {
                this.setState({
                    ...this.state, message: 'No Match'
                })
            }
        }
    }
    createButton = () => {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
                <button onClick={this.addTodoForm}>New</button>
                <button onClick={this.handleSearchClear}>Clear</button>
                <input type="text" placeholder="search" value={this.state.search} onChange={(event) => this.onChange(event)} />
                <button onClick={(event) => this.onClick(event)}>Search</button>
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
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                count: this.state.count + 1
            })
            const todo = { id: this.state.count, name: this.state.name, user_id: this.state.id }
            this.props.addTodo(todo)
            this.setState({
                gotTodo: true,
                todo_id: this.state.count,
                name: ""
            })
        }
    }
    validate = () => {
        let nameError = "";
        if (this.state.name.length < 1 || this.state.name.length > 25) {
            nameError = "Todo must be at least 1 character or less then 25 characters!"
        }
        if (nameError) {
            this.setState({ nameError });
            return false;
        } else {
            return true;
        }
    }
    handleUpdateTodo = (event) => {
        event.preventDefault()
        const todo = { id: this.state.t_id, name: this.state.t_name, user_id: this.state.t_user }
        this.props.updateTodo(todo)
        this.setState({
            t_name: ""
        })
    }
    handleOnChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    addUpdateTodoForm = (event) => {
        const todo = this.props.todos.filter(t => t.id == event.target.id)
        this.setState({
            t_id: todo[0].id,
            t_name: todo[0].name,
            t_user: todo[0].user_id,
            updateTodo: true
        });
    }
    handleDeleteTodo = (event) => {
        event.preventDefault()
        this.props.deleteTodo(event.target.id)
    }
    render() {
        const todoForm = this.state.createNewTodoForm
        const findUser = this.state.gotUser
        const isLogout = this.state.islogout
        const gotTodo = this.state.gotTodo
        const searchTodo = this.state.searchedTodo
        const todoDelete = this.state.todoDelete
        const todoUpdate = this.state.updateTodo
        const getAllTodos = this.props.todos.filter((todo) => todo.user_id === this.state.id)
        const AllTodos = getAllTodos.map((todo) => {
            return (
                <div class="todo">
                    <li key={todo.id}>{todo.name}</li>
                    <button id={todo.id} onClick={this.addUpdateTodoForm}>Update</button>
                    <button id={todo.id} onClick={this.handleDeleteTodo}>Delete</button>
                </div>
            )
        })

        const filterTodos = this.state.currentTodos.map((todo) => {
            return (
                <div class="todo">
                    <li key={todo.id}>{todo.name}</li>
                </div>
            )
        })
        return (
            <div>
                <h1>My To-Do List</h1>
                <div>
                    {findUser ? this.createButton() : this.state.message}
                    {isLogout ? <Redirect to={`/users/login`} /> : ""}
                    {todoForm ? <form onSubmit={event => this.handleSubmit(event)}>
                        <p><input type="text" id="name" onChange={event => this.handleChange(event)} value={this.state.name} />
                            {this.state.nameError ? <div style={{ fontSize: 10, color: "red" }}>{this.state.nameError}</div> : null}
                        </p>
                        <input type="submit" class="btn" /></form> : ""}
                    {searchTodo ? filterTodos : AllTodos}
                    {todoUpdate ? <form onSubmit={event => this.handleUpdateTodo(event)} >
                        <p><input type="text"
                            id="t_name"
                            onChange={event => this.handleOnChange(event)}
                            value={this.state.t_name} required />
                        </p>
                        <input type="submit" class="btn" />
                    </form > : ""}
                </div>
            </div>

        );
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addTodo: todo => { dispatch(addTodo(todo)) },
        clearTodo: () => { dispatch(clearTodo()) },
        deleteTodo: id => { dispatch(deleteTodo(id)) },
        updateTodo: todo => { dispatch(updateTodo(todo)) }
    }
}
const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);