import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import addUser from '../src/actions/users'
import { FaLock, FaUser } from "react-icons/fa"
import './App.css';

//import { Redirect } from 'react-router-dom'
//import { connect } from 'react-redux'
//import axios from 'axios'


class RegisterUser extends Component {
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
            this.registerUser(event)
        }
        this.setState({
            email: "",
            password: ""
        })

    }

    validate = () => {
        let emailError = "";
        let passwordError = "";

        if (!this.state.email.includes('@')) {
            emailError = 'Invalid email address'
        }
        if (!this.state.email) {
            emailError = "Email can't be blank!"
        }
        if (this.state.email.length > 50) {
            emailError = "Email length is too long!"
        }
        if (this.state.password.length < 4 || this.state.password.length > 16) {
            passwordError = "Password is invalid!"
        }
        if (!this.state.password) {
            passwordError = "Password can't be blank!"
        }


        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }

        return true;
    }


    registerUser = (event) => {
        let registerBody = {}
        registerBody = {
            email: this.state.email,
            password: this.state.password
        }
        const configobj = {
            method: 'POST',
            body: JSON.stringify(registerBody),

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }
        }
        fetch('http://localhost:3000/users', configobj)
            .then(response => response.json())
            .then(user => {
                if (user.status === 'error') {
                    this.setState({
                        message: "Invalid email or password"
                    })
                } else {
                    this.props.addUser(user)
                    this.setState({
                        id: user.id,
                        gotUser: true
                    })
                }

            })
    };




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
                            value={this.state.password} />
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



const mapDispatchToProps = dispatch => {
    return {
        addUser: user => { dispatch(addUser(user)) }
    }
}

export default connect(null, mapDispatchToProps)(RegisterUser);