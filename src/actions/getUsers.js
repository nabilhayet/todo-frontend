export function getUsers() {
    return (dispatch) => {
        dispatch({ type: 'START_ADDING_USERS' });
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => dispatch({ type: 'GET_USERS', users: data }));
    };
};