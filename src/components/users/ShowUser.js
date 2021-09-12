import React from 'react';
import { connect } from 'react-redux';
//import Home from '../../Home'
//import Navbar from '../../Navbar';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function ShowUser(props) {


    return (
        <div>
            <button>Logout</button>
        </div>
    )

}


const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        // books: state.books.books
    };
};
export default connect(mapStateToProps)(ShowUser);