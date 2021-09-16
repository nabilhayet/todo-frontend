export default function usersReducer(state = { users: [] }, action) {
    // let idx;
    switch (action.type) {
        case 'START_ADDING_USERS':
            return { ...state, users: [...state.users] }
        case "ADD_USER":
            return { ...state, users: [...state.users, action.user] }
        default:
            return state;
    }
}