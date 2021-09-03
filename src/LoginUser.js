import React, { Component } from 'react'
//import { Redirect } from 'react-router-dom'
//import { connect } from 'react-redux'
//import axios from 'axios'


class LoginUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const user = { email: this.state.email, password: this.state.password }
        this.loginUser(user)
    }


    loginUser = (user) => {
        const configobj = {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }
        fetch('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', configobj)
            .then(response => response.json())
            .then(user => {
                this.setState({
                    email: user.email

                })
            })
    };


    render() {
        return (
            <div>
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
            </div>
        );
    }
};

/* const mapDispatchToProps = dispatch => {
    return {
        addAuthor: author => { dispatch(addAuthor(author)) }
    }
}
export default connect(null, mapDispatchToProps)(CreateAuthor)

*/

export default LoginUser;