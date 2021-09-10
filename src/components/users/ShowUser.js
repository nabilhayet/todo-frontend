import React from 'react';
import { connect } from 'react-redux';

function ShowUser(props) {
    return (
        <div>
            Welcome User!
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