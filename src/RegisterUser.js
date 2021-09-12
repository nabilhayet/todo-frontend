import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import addUser from '../src/actions/users'

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
            message: ""
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.registerUser(event)
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
                debugger
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
                    <p>
                        <label>Email</label>
                        <br></br>
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            placeholder="user@rapptrlabs.com"
                            value={this.state.email} required
                        />

                    </p>
                    <p>
                        <label>Password</label>
                        <br></br>
                        <input
                            type="password"
                            name="password"
                            onChange={event => this.handleChange(event)}
                            placeholder="Must be at least 4 characters"
                            value={this.state.password} required />
                    </p>
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