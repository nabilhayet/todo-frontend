import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router';
//import App from '../../App';
//import Home from '../../Home'
//import Navbar from '../../Navbar';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class ShowUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            gotUser: false,
            message: ""
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(user => {
                if (user.status === 'error') {
                    this.setState({
                        message: "You don't have access"
                    })
                } else {
                    this.setState({
                        id: user.id,
                        gotUser: true
                    })
                }

            })
    }


    //  handleLogout = () => {
    //      "Hahah"
    //  }

    render() {
        const findUser = this.state.gotUser
        return (
            <div>
                {findUser ? <button>Logout</button> : this.state.message}
            </div>

        )
    }
}



const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        // books: state.books.books
    };
};
export default connect(mapStateToProps)(ShowUser);