import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import App from '../../App';
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
            islogout: false
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
                <button onClick={this.addTodo}>Add Todo</button>
            </div>
        )
    }

    render() {
        const findUser = this.state.gotUser
        const isLogout = this.state.islogout
        return (
            <div>
                {findUser ? this.createButton() : this.state.message}
                {isLogout ? <Redirect to={`/users/login`} /> : ""}
            </div>

        );
    }
};



const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        // books: state.books.books
    };
};
export default connect(mapStateToProps)(ShowUser);


// const configobj = {
    //     method: 'DELETE',
    //     credentials: "include",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'

    //     }
    // }

    // fetch("http://localhost:3000/logout", configobj)
    //     .then(res => res.json())
    //     .then(r => {
    //         if (r.status === 'ok') {
    //             this.setState({
    //                 logoutMessage: "You have successfully logged out"
    //             })

    //         } else {
    //             this.setState({
    //                 logoutMessage: "Something went wrong!"
    //             })
    //         }
    //     })